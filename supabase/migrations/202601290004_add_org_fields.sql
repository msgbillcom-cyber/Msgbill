-- Add missing branding and bank fields to organizations table
-- This ensures the organizations table can store all business profile details

ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS upi_qr_url text,
ADD COLUMN IF NOT EXISTS bank_name text;

-- Add comments for documentation
COMMENT ON COLUMN public.organizations.upi_qr_url IS 'URL to the UPI QR code image';
COMMENT ON COLUMN public.organizations.bank_name IS 'Name of the bank';
