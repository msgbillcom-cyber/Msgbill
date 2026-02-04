-- Enforce usage limits and automate tracking
-- This ensures that the business logic is protected at the database level

-- 1. Function to update usage counts automatically
CREATE OR REPLACE FUNCTION public.update_usage_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF (TG_TABLE_NAME = 'invoices') THEN
            UPDATE public.usage_limits 
            SET invoices_created = invoices_created + 1,
                updated_at = now()
            WHERE org_id = NEW.org_id;
        ELSIF (TG_TABLE_NAME = 'clients') THEN
            UPDATE public.usage_limits 
            SET clients_created = clients_created + 1,
                updated_at = now()
            WHERE org_id = NEW.org_id;
        END IF;
    ELSIF (TG_OP = 'DELETE') THEN
        IF (TG_TABLE_NAME = 'invoices') THEN
            UPDATE public.usage_limits 
            SET invoices_created = GREATEST(0, invoices_created - 1),
                updated_at = now()
            WHERE org_id = OLD.org_id;
        ELSIF (TG_TABLE_NAME = 'clients') THEN
            UPDATE public.usage_limits 
            SET clients_created = GREATEST(0, clients_created - 1),
                updated_at = now()
            WHERE org_id = OLD.org_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 2. Triggers for usage tracking
DROP TRIGGER IF EXISTS tr_invoice_usage_tracking ON public.invoices;
CREATE TRIGGER tr_invoice_usage_tracking
    AFTER INSERT OR DELETE ON public.invoices
    FOR EACH ROW EXECUTE PROCEDURE public.update_usage_counts();

DROP TRIGGER IF EXISTS tr_client_usage_tracking ON public.clients;
CREATE TRIGGER tr_client_usage_tracking
    AFTER INSERT OR DELETE ON public.clients
    FOR EACH ROW EXECUTE PROCEDURE public.update_usage_counts();

-- 3. Function to enforce limits on insert
CREATE OR REPLACE FUNCTION public.enforce_usage_limits()
RETURNS TRIGGER AS $$
DECLARE
    current_limit_record RECORD;
BEGIN
    -- Get current usage and limits
    SELECT * INTO current_limit_record 
    FROM public.usage_limits 
    WHERE org_id = NEW.org_id;

    IF NOT FOUND THEN
        -- If no limit record exists, allow for now (should be created on onboarding)
        RETURN NEW;
    END IF;

    -- Check Invoices Limit
    IF (TG_TABLE_NAME = 'invoices') THEN
        IF (current_limit_record.invoices_created >= current_limit_record.max_invoices) THEN
            RAISE EXCEPTION 'Invoice limit reached. Please upgrade your plan.';
        END IF;
    END IF;

    -- Check Clients Limit
    IF (TG_TABLE_NAME = 'clients') THEN
        IF (current_limit_record.clients_created >= current_limit_record.max_clients) THEN
            RAISE EXCEPTION 'Client limit reached. Please upgrade your plan.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Triggers for limit enforcement
DROP TRIGGER IF EXISTS tr_enforce_invoice_limit ON public.invoices;
CREATE TRIGGER tr_enforce_invoice_limit
    BEFORE INSERT ON public.invoices
    FOR EACH ROW EXECUTE PROCEDURE public.enforce_usage_limits();

DROP TRIGGER IF EXISTS tr_enforce_client_limit ON public.clients;
CREATE TRIGGER tr_enforce_client_limit
    BEFORE INSERT ON public.clients
    FOR EACH ROW EXECUTE PROCEDURE public.enforce_usage_limits();

-- 5. Sync existing counts (One-time migration)
UPDATE public.usage_limits ul
SET invoices_created = (SELECT count(*) FROM public.invoices i WHERE i.org_id = ul.org_id),
    clients_created = (SELECT count(*) FROM public.clients c WHERE c.org_id = ul.org_id);
