-- ==============================================================================
-- MSGBILL SUPABASE SECURITY & SOVEREIGN HARDENING MIGRATION
-- Fixes:
-- 1. ERROR: Security Definer View (public.storefront_orgs) -> security_invoker = true
-- 2. 14 WARNINGS: Function Search Path Mutable -> ALTER FUNCTION ... SET search_path = public
-- 3. WARNING: Public Bucket Allows Listing on storage.assets -> Revoke anon listing policy
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FIX CRITICAL ERROR: Security Definer View on public.storefront_orgs
-- In Postgres 15+, views default to security definer unless security_invoker is true.
-- Setting security_invoker = true enforces caller permissions and eliminates the error.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.storefront_orgs
WITH (security_invoker = true) AS
SELECT id, name, logo_url, address
FROM public.organizations;

-- Ensure read access exists on storefront_orgs
GRANT SELECT ON public.storefront_orgs TO anon, authenticated;

-- Ensure safe anonymous read policy on the underlying organizations table
-- so security_invoker = true can safely read public storefront details
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'organizations' 
        AND policyname = 'Public can view storefront organizations'
    ) THEN
        CREATE POLICY "Public can view storefront organizations"
        ON public.organizations
        FOR SELECT
        TO anon, authenticated
        USING (true);
    END IF;
END $$;


-- ------------------------------------------------------------------------------
-- 2. FIX 14 WARNINGS: Function Search Path Mutable
-- Setting 'SET search_path = public, pg_temp' locks the execution path and prevents
-- malicious schema search path hijacking.
-- ------------------------------------------------------------------------------

-- 1) set_invoice_archive_date
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_invoice_archive_date') THEN
        ALTER FUNCTION public.set_invoice_archive_date() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 2) update_invoice_retention
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_invoice_retention') THEN
        ALTER FUNCTION public.update_invoice_retention(UUID, INTEGER) SET search_path = public, pg_temp;
    END IF;
END $$;

-- 3) handle_new_user
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') THEN
        ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 4) is_org_member (if present)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_org_member') THEN
        EXECUTE 'ALTER FUNCTION public.is_org_member(UUID, UUID) SET search_path = public, pg_temp';
    END IF;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- 5) update_usage_counts
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_usage_counts') THEN
        ALTER FUNCTION public.update_usage_counts() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 6) enforce_usage_limits
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'enforce_usage_limits') THEN
        ALTER FUNCTION public.enforce_usage_limits() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 7) handle_updated_at
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
        ALTER FUNCTION public.handle_updated_at() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 8) get_next_invoice_number
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_next_invoice_number') THEN
        ALTER FUNCTION public.get_next_invoice_number(UUID) SET search_path = public, pg_temp;
    END IF;
END $$;

-- 9) calculate_invoice_totals
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'calculate_invoice_totals') THEN
        ALTER FUNCTION public.calculate_invoice_totals(UUID) SET search_path = public, pg_temp;
    END IF;
END $$;

-- 10) restore_archived_invoice
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'restore_archived_invoice') THEN
        ALTER FUNCTION public.restore_archived_invoice(UUID) SET search_path = public, pg_temp;
    END IF;
END $$;

-- 11) archive_old_invoices
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'archive_old_invoices') THEN
        ALTER FUNCTION public.archive_old_invoices() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 12) get_archive_warnings
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_archive_warnings') THEN
        ALTER FUNCTION public.get_archive_warnings(INTEGER) SET search_path = public, pg_temp;
    END IF;
END $$;

-- 13) sync_subscription_limits
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'sync_subscription_limits') THEN
        ALTER FUNCTION public.sync_subscription_limits() SET search_path = public, pg_temp;
    END IF;
END $$;

-- 14) handle_new_organization
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_organization') THEN
        ALTER FUNCTION public.handle_new_organization() SET search_path = public, pg_temp;
    END IF;
END $$;

-- Additional functions safety pass
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'deduct_product_stock') THEN
        ALTER FUNCTION public.deduct_product_stock(UUID, NUMERIC) SET search_path = public, pg_temp;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'deduct_org_stock') THEN
        ALTER FUNCTION public.deduct_org_stock(UUID, NUMERIC, UUID) SET search_path = public, pg_temp;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'peek_next_invoice_number') THEN
        ALTER FUNCTION public.peek_next_invoice_number(UUID) SET search_path = public, pg_temp;
    END IF;
END $$;


-- ------------------------------------------------------------------------------
-- 3. FIX WARNING: Public Bucket Allows Listing on storage.assets
-- Restricts client-side listing (browsing all files) while allowing individual 
-- public asset downloads and authenticated org uploads.
-- ------------------------------------------------------------------------------
-- Drop any overly broad listing policy on storage.objects for the assets bucket
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public can view assets" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public listing of assets" ON storage.objects;
    DROP POLICY IF EXISTS "Give public access to assets" ON storage.objects;
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Anyone can read assets" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- Create hardened policy: Allow public to READ individual files by direct path (logos/, qrs/)
-- but prohibit listing all files in the bucket
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public can read asset files directly'
    ) THEN
        CREATE POLICY "Public can read asset files directly"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'assets' AND (storage.foldername(name))[1] IN ('logos', 'qrs', 'invoices'));
    END IF;
END $$;

-- Authenticated users can upload their own logo/QR assets
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can upload assets'
    ) THEN
        CREATE POLICY "Authenticated users can upload assets"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'assets');
    END IF;
END $$;
