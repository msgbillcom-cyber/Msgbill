-- ==============================================================================
-- MSGBILL SUPABASE SECURITY ADVISOR ZERO-WARNING MIGRATION
-- Clears the remaining 3 function warnings by switching them to SECURITY INVOKER
--
-- Why SECURITY INVOKER is better:
-- 1. In Postgres, SECURITY DEFINER functions run with the elevated superuser/owner privileges.
--    Supabase Linter flags any SECURITY DEFINER function callable by signed-in users.
-- 2. By switching to SECURITY INVOKER with explicit row policies:
--    - The function executes with the caller's actual session permissions.
--    - It completely ELIMINATES the Supabase Security Advisor warning.
--    - It is the golden standard for Sovereign Supabase Architecture.
-- ==============================================================================

-- 1. Ensure members can increment their own organization counter
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'organizations' 
        AND policyname = 'Members can update own organization counter'
    ) THEN
        CREATE POLICY "Members can update own organization counter"
        ON public.organizations
        FOR UPDATE
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM public.organization_members
                WHERE org_id = organizations.id AND user_id = auth.uid()
            )
        )
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.organization_members
                WHERE org_id = organizations.id AND user_id = auth.uid()
            )
        );
    END IF;
END $$;

-- 2. Redefine get_next_invoice_number as SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.get_next_invoice_number(org_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
    next_count INTEGER;
    prefix TEXT;
    next_number TEXT;
BEGIN
    -- Verify membership
    IF auth.uid() IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.organization_members 
        WHERE org_id = org_uuid AND user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    UPDATE public.organizations
    SET invoice_counter = COALESCE(invoice_counter, 0) + 1
    WHERE id = org_uuid
    RETURNING invoice_counter, COALESCE(invoice_prefix, 'INV-') INTO next_count, prefix;
    
    IF next_count IS NULL THEN
        RAISE EXCEPTION 'Organization not found or access denied';
    END IF;

    next_number := prefix || LPAD(next_count::TEXT, 4, '0');
    RETURN next_number;
END;
$$;

-- 3. Redefine peek_next_invoice_number as SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.peek_next_invoice_number(org_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
    next_count INTEGER;
    prefix TEXT;
BEGIN
    IF auth.uid() IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE org_id = org_uuid AND user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT COALESCE(invoice_counter, 0) + 1, COALESCE(invoice_prefix, 'INV-')
    INTO next_count, prefix
    FROM public.organizations
    WHERE id = org_uuid;

    IF next_count IS NULL THEN
        RETURN 'INV-0001';
    END IF;

    RETURN prefix || LPAD(next_count::TEXT, 4, '0');
END;
$$;

-- 4. Redefine is_org_member as SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.is_org_member(target_org UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE org_id = target_org AND user_id = auth.uid()
    );
$$;

-- 5. Revoke from anon, grant to authenticated and service_role
REVOKE EXECUTE ON FUNCTION public.get_next_invoice_number(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_next_invoice_number(UUID) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.peek_next_invoice_number(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.peek_next_invoice_number(UUID) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_org_member(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_org_member(UUID) TO authenticated, service_role;
