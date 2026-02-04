-- Ensure all banking and UPI fields exist in organizations table
-- This complements previous migrations to guarantee profile updates work

ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS upi_id text,
ADD COLUMN IF NOT EXISTS bank_account_number text,
ADD COLUMN IF NOT EXISTS bank_ifsc_code text;

-- Add comments
COMMENT ON COLUMN public.organizations.upi_id IS 'UPI ID for payments (e.g. user@bank)';
COMMENT ON COLUMN public.organizations.bank_account_number IS 'Bank Account Number';
COMMENT ON COLUMN public.organizations.bank_ifsc_code IS 'Bank IFSC Code';
