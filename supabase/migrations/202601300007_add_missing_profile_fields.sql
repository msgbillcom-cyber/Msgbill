-- Migration to add missing fields to profiles table
-- Ensures compatibility with onboarding API and resolves profile creation errors

-- 1. Add email column (Critical for AuthProvider and API)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email text;

-- 2. Add remaining missing legacy fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS upi_id text,
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS upi_qr_url text;

-- 3. Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 4. Update comments
COMMENT ON COLUMN public.profiles.email IS 'User email address synced from auth.users';
COMMENT ON COLUMN public.profiles.state IS 'Business state (Legacy support)';
COMMENT ON COLUMN public.profiles.upi_id IS 'UPI ID for payments (Legacy support)';
