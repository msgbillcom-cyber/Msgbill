-- MsgBill: Paid users = 1 year retention, then auto-delete old invoices
-- Free users = 6 months. All tiers are archived when past archive_eligible_at.

-- 1. Retention: paid users (starter, pro, enterprise) = 12 months; free = 6 months
CREATE OR REPLACE FUNCTION set_invoice_archive_date()
RETURNS TRIGGER AS $$
DECLARE
    org_tier VARCHAR(20);
    retention_months INTEGER;
BEGIN
    SELECT subscription_tier INTO org_tier
    FROM public.organizations
    WHERE id = NEW.org_id;

    retention_months := CASE org_tier
        WHEN 'free' THEN 6
        WHEN 'starter' THEN 12
        WHEN 'pro' THEN 12
        WHEN 'enterprise' THEN 12
        ELSE 6
    END;

    NEW.archive_eligible_at := NEW.created_at + (retention_months || ' months')::INTERVAL;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Archive old invoices for ALL tiers (not just free) when past retention
CREATE OR REPLACE FUNCTION archive_old_invoices()
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER := 0;
    invoice_record RECORD;
BEGIN
    FOR invoice_record IN
        SELECT i.id, i.org_id, i.created_at,
               row_to_json(i.*) as invoice_json,
               jsonb_agg(row_to_json(items.*)) as items_json
        FROM public.invoices i
        LEFT JOIN public.invoice_items items ON items.invoice_id = i.id
        WHERE i.archive_eligible_at <= NOW()
        AND i.status != 'draft'
        GROUP BY i.id
    LOOP
        INSERT INTO public.invoice_archives (org_id, original_invoice_id, invoice_data, created_at)
        VALUES (
            invoice_record.org_id,
            invoice_record.id,
            jsonb_build_object(
                'invoice', invoice_record.invoice_json,
                'items', invoice_record.items_json
            ),
            invoice_record.created_at
        );
        DELETE FROM public.invoices WHERE id = invoice_record.id;
        archived_count := archived_count + 1;
    END LOOP;
    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- 3. Warnings for all tiers (free and paid) before archive
CREATE OR REPLACE FUNCTION get_archive_warnings(days_before INTEGER DEFAULT 7)
RETURNS TABLE (
    org_id UUID,
    invoice_id UUID,
    invoice_number TEXT,
    client_name TEXT,
    archive_in_days INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        i.org_id,
        i.id AS invoice_id,
        i.invoice_number,
        c.name AS client_name,
        EXTRACT(DAY FROM (i.archive_eligible_at - NOW()))::INTEGER AS archive_in_days
    FROM public.invoices i
    LEFT JOIN public.clients c ON c.id = i.client_id
    WHERE i.archive_eligible_at BETWEEN NOW() AND NOW() + (days_before || ' days')::INTERVAL
    ORDER BY i.archive_eligible_at ASC;
END;
$$ LANGUAGE plpgsql;

-- 4. RPC: recalculate archive dates when subscription tier changes (e.g. upgrade to paid)
CREATE OR REPLACE FUNCTION update_invoice_retention(org_uuid UUID, retention_months INTEGER)
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE public.invoices
    SET archive_eligible_at = created_at + (retention_months || ' months')::INTERVAL
    WHERE org_id = org_uuid;
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- 5. Backfill: paid orgs get 1 year from created_at for existing invoices
UPDATE public.invoices i
SET archive_eligible_at = i.created_at + INTERVAL '12 months'
FROM public.organizations o
WHERE i.org_id = o.id
  AND o.subscription_tier IN ('starter', 'pro', 'enterprise');

COMMENT ON FUNCTION set_invoice_archive_date() IS 'Free=6mo, paid (starter/pro/enterprise)=1yr retention';
COMMENT ON FUNCTION archive_old_invoices() IS 'Archives invoices past retention for all tiers. Run daily via cron.';
COMMENT ON FUNCTION update_invoice_retention(UUID, INTEGER) IS 'Recalc archive_eligible_at for org when tier changes';
