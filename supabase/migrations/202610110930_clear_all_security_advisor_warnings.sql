-- ==============================================================================
-- MSGBILL SUPABASE SECURITY ADVISOR FULL RESOLUTION
-- Clears the remaining 18 warnings:
-- 1. Function Search Path Mutable on public.is_org_member
-- 2. "Public Can Execute SECURITY DEFINER Function" (REVOKE EXECUTE FROM PUBLIC, anon)
-- 3. "Signed-In Users Can Execute SECURITY DEFINER Function" (Restrict internal triggers & functions)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Fix Mutable Search Path on public.is_org_member (any signature)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' AND p.proname = 'is_org_member'
    LOOP
        EXECUTE format('ALTER FUNCTION public.%I(%s) SET search_path = public, pg_temp;', r.proname, r.args);
    END LOOP;
END $$;


-- ------------------------------------------------------------------------------
-- 2. Revoke Dangerous Public & Anon Execution from ALL Security Definer Functions
-- In Postgres, functions are callable by PUBLIC by default. Revoking from PUBLIC and anon
-- completely removes the "Public Can Execute SECURITY DEFINER Function" warnings.
-- ------------------------------------------------------------------------------

DO $$
DECLARE
    sec_def_func RECORD;
BEGIN
    FOR sec_def_func IN 
        SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' 
          AND p.prosecdef = true
    LOOP
        -- Revoke execution from PUBLIC and anon role
        EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%I(%s) FROM PUBLIC, anon;', sec_def_func.proname, sec_def_func.args);
    END LOOP;
END $$;


-- ------------------------------------------------------------------------------
-- 3. Lock Down Internal Trigger & Admin-Only Functions from Authenticated Users
-- The following functions should NEVER be called directly over client RPC:
-- - handle_new_user (auth trigger)
-- - enforce_usage_limits (table trigger)
-- - update_usage_counts (table trigger)
-- - rls_auto_enable (internal helper)
-- - deduct_org_stock (called only by server API route via service_role)
-- ------------------------------------------------------------------------------

-- Trigger functions: only Postgres/trigger engine needs to run them
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') THEN
        REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'enforce_usage_limits') THEN
        REVOKE EXECUTE ON FUNCTION public.enforce_usage_limits() FROM authenticated;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_usage_counts') THEN
        REVOKE EXECUTE ON FUNCTION public.update_usage_counts() FROM authenticated;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'rls_auto_enable') THEN
        REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
    END IF;
END $$;

-- Stock deduction: only server API route (service_role) executes it
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' AND p.proname IN ('deduct_org_stock', 'deduct_product_stock')
    LOOP
        EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%I(%s) FROM authenticated;', r.proname, r.args);
        EXECUTE format('GRANT EXECUTE ON FUNCTION public.%I(%s) TO service_role;', r.proname, r.args);
    END LOOP;
END $$;


-- ------------------------------------------------------------------------------
-- 4. Explicitly Grant Client RPC Functions only to Authenticated Users
-- Functions that our Next.js dashboard specifically calls:
-- - get_next_invoice_number(org_uuid)
-- - peek_next_invoice_number(org_uuid)
-- - is_org_member
-- ------------------------------------------------------------------------------

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public' AND p.proname IN ('get_next_invoice_number', 'peek_next_invoice_number', 'is_org_member')
    LOOP
        EXECUTE format('GRANT EXECUTE ON FUNCTION public.%I(%s) TO authenticated, service_role;', r.proname, r.args);
    END LOOP;
END $$;
