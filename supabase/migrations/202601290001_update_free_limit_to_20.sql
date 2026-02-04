-- Update usage limits to match new pricing strategy (20 invoices for free tier)
DO $$ 
BEGIN
    -- Update defaults for future rows
    ALTER TABLE public.usage_limits ALTER COLUMN max_invoices SET DEFAULT 20;

    -- Update existing free tier limits
    UPDATE public.usage_limits 
    SET max_invoices = 20
    WHERE plan_type = 'free';
END $$;
