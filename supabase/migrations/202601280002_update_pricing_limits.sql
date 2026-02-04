-- Update usage limits to match new pricing strategy (Safely)
DO $$ 
BEGIN
    -- Update defaults for future rows
    ALTER TABLE public.usage_limits ALTER COLUMN max_invoices SET DEFAULT 10;
    ALTER TABLE public.usage_limits ALTER COLUMN max_clients SET DEFAULT 5;

    -- Update existing free tier limits
    UPDATE public.usage_limits 
    SET max_invoices = 10, max_clients = 5
    WHERE plan_type = 'free';
END $$;
