-- MsgBill: Cost Optimization & Data Retention Policies
-- Goal: Stay on Supabase FREE tier 5-10x longer by managing data efficiently

-- 1. Add subscription tier tracking to organizations
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'enterprise'));

-- 2. Add invoice retention date (when invoice will be auto-archived)
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS archive_eligible_at TIMESTAMP WITH TIME ZONE;

-- 3. Create function to calculate archive date based on subscription
CREATE OR REPLACE FUNCTION set_invoice_archive_date()
RETURNS TRIGGER AS $$
DECLARE
    org_tier VARCHAR(20);
    retention_months INTEGER;
BEGIN
    -- Get organization's subscription tier
    SELECT subscription_tier INTO org_tier
    FROM public.organizations
    WHERE id = NEW.org_id;
    
    -- Set retention based on tier
    retention_months := CASE org_tier
        WHEN 'free' THEN 6      -- 6 months for free users
        WHEN 'starter' THEN 12  -- 1 year for starter
        WHEN 'pro' THEN 36      -- 3 years for pro
        WHEN 'enterprise' THEN 120  -- 10 years for enterprise
        ELSE 6                  -- Default to 6 months
    END;
    
    -- Set archive eligible date
    NEW.archive_eligible_at := NEW.created_at + (retention_months || ' months')::INTERVAL;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger to auto-set archive date on invoice creation
DROP TRIGGER IF EXISTS trigger_set_archive_date ON public.invoices;
CREATE TRIGGER trigger_set_archive_date
    BEFORE INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION set_invoice_archive_date();

-- 5. Create archive table for storing compressed old invoices
CREATE TABLE IF NOT EXISTS public.invoice_archives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    original_invoice_id UUID NOT NULL,
    invoice_data JSONB NOT NULL, -- Compressed invoice + items
    archived_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL -- Original creation date
);

-- 6. Index for fast archive lookups
CREATE INDEX IF NOT EXISTS idx_invoice_archives_org ON public.invoice_archives(org_id);
CREATE INDEX IF NOT EXISTS idx_invoice_archives_created ON public.invoice_archives(created_at);

-- 7. Function to archive old invoices
CREATE OR REPLACE FUNCTION archive_old_invoices()
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER := 0;
    invoice_record RECORD;
BEGIN
    -- Find invoices eligible for archiving
    FOR invoice_record IN 
        SELECT i.id, i.org_id, i.created_at,
               row_to_json(i.*) as invoice_json,
               jsonb_agg(row_to_json(items.*)) as items_json
        FROM public.invoices i
        LEFT JOIN public.invoice_items items ON items.invoice_id = i.id
        WHERE i.archive_eligible_at <= NOW()
        AND i.status != 'draft' -- Don't archive drafts
        AND i.org_id IN (
            SELECT id FROM public.organizations 
            WHERE subscription_tier = 'free' -- Only free tier
        )
        GROUP BY i.id
    LOOP
        -- Insert into archive
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
        
        -- Delete original invoice (cascade deletes items)
        DELETE FROM public.invoices WHERE id = invoice_record.id;
        
        archived_count := archived_count + 1;
    END LOOP;
    
    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- 8. Function to get upcoming archive warnings (for notifications)
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
        i.id as invoice_id,
        i.invoice_number,
        c.name as client_name,
        EXTRACT(DAY FROM (i.archive_eligible_at - NOW()))::INTEGER as archive_in_days
    FROM public.invoices i
    LEFT JOIN public.clients c ON c.id = i.client_id
    WHERE i.archive_eligible_at BETWEEN NOW() AND NOW() + (days_before || ' days')::INTERVAL
    AND EXISTS (
        SELECT 1 FROM public.organizations o 
        WHERE o.id = i.org_id AND o.subscription_tier = 'free'
    )
    ORDER BY i.archive_eligible_at ASC;
END;
$$ LANGUAGE plpgsql;

-- 9. Function to restore archived invoice (for upgrades)
CREATE OR REPLACE FUNCTION restore_archived_invoice(archived_id UUID)
RETURNS UUID AS $$
DECLARE
    new_invoice_id UUID;
    archive_data JSONB;
BEGIN
    -- Get archived data
    SELECT invoice_data INTO archive_data
    FROM public.invoice_archives
    WHERE id = archived_id;
    
    IF archive_data IS NULL THEN
        RAISE EXCEPTION 'Archive not found';
    END IF;
    
    -- Restore invoice (would need full implementation)
    -- For now, just return the data
    RAISE NOTICE 'Invoice data: %', archive_data;
    
    RETURN archived_id;
END;
$$ LANGUAGE plpgsql;

-- 10. Enable RLS on archive table
ALTER TABLE public.invoice_archives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their archived invoices" ON public.invoice_archives
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.org_id = invoice_archives.org_id 
            AND m.user_id = auth.uid()
        )
    );

-- 11. Create helper view for invoice status with archive info
CREATE OR REPLACE VIEW invoice_retention_status AS
SELECT 
    i.id,
    i.invoice_number,
    i.org_id,
    o.subscription_tier,
    i.created_at,
    i.archive_eligible_at,
    EXTRACT(DAY FROM (i.archive_eligible_at - NOW()))::INTEGER as days_until_archive,
    CASE 
        WHEN i.archive_eligible_at <= NOW() THEN 'eligible_for_archive'
        WHEN i.archive_eligible_at <= NOW() + INTERVAL '7 days' THEN 'archive_warning'
        ELSE 'active'
    END as retention_status
FROM public.invoices i
JOIN public.organizations o ON o.id = i.org_id;

-- 12. Comment documentation
COMMENT ON COLUMN organizations.subscription_tier IS 'User subscription tier: free (6mo retention), starter (1yr), pro (3yr), enterprise (10yr)';
COMMENT ON COLUMN invoices.archive_eligible_at IS 'Date when invoice becomes eligible for archiving based on subscription tier';
COMMENT ON TABLE invoice_archives IS 'Compressed storage for old invoices from free tier users';
COMMENT ON FUNCTION archive_old_invoices() IS 'Archives invoices past retention period. Returns count of archived invoices. Run via cron daily.';
COMMENT ON FUNCTION get_archive_warnings(INTEGER) IS 'Get invoices approaching archive date for sending user notifications';

-- 13. Initial data migration: Set archive dates for existing invoices
UPDATE public.invoices 
SET archive_eligible_at = created_at + INTERVAL '6 months'
WHERE archive_eligible_at IS NULL;

-- USAGE INSTRUCTIONS:
-- 
-- To manually run archiving:
--   SELECT archive_old_invoices();
--
-- To set up daily cron (requires pg_cron extension):
--   SELECT cron.schedule('daily-archive', '0 3 * * *', 'SELECT archive_old_invoices();');
--
-- To get warnings for notifications:
--   SELECT * FROM get_archive_warnings(7); -- 7 days before
--
-- To check retention status:
--   SELECT * FROM invoice_retention_status WHERE org_id = 'xxx';
