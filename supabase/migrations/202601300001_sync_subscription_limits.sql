-- Sync usage limits with organization subscription tier
-- This ensures that when a user upgrades/downgrades, their database limits are updated accordingly

CREATE OR REPLACE FUNCTION public.sync_subscription_limits()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update if subscription_tier has changed
    IF (OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier) THEN
        
        -- PRO Plan
        IF (NEW.subscription_tier = 'pro') THEN
            UPDATE public.usage_limits
            SET plan_type = 'pro',
                max_invoices = 2147483647, -- Max Integer (effectively unlimited)
                max_clients = 2147483647
            WHERE org_id = NEW.id;
            
        -- FREE Plan (or any other)
        ELSE
            UPDATE public.usage_limits
            SET plan_type = 'free',
                max_invoices = 20,
                max_clients = 5
            WHERE org_id = NEW.id;
        END IF;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to watch for subscription changes
DROP TRIGGER IF EXISTS tr_sync_subscription_limits ON public.organizations;
CREATE TRIGGER tr_sync_subscription_limits
    AFTER UPDATE OF subscription_tier ON public.organizations
    FOR EACH ROW
    EXECUTE PROCEDURE public.sync_subscription_limits();

-- Run a one-time sync for existing organizations to ensure consistency
DO $$
DECLARE
    org RECORD;
BEGIN
    FOR org IN SELECT * FROM public.organizations LOOP
        IF (org.subscription_tier = 'pro') THEN
            UPDATE public.usage_limits
            SET plan_type = 'pro',
                max_invoices = 2147483647,
                max_clients = 2147483647
            WHERE org_id = org.id;
        ELSE
            UPDATE public.usage_limits
            SET plan_type = 'free',
                max_invoices = 20,
                max_clients = 5
            WHERE org_id = org.id;
        END IF;
    END LOOP;
END $$;
