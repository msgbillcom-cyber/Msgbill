-- Migration to fix Profile RLS and enable Google OAuth Signup
-- Addresses the "stuck on onboarding" issue for new Google users

-- 1. Enable INSERT for profiles so users can create their own profile during signup
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON public.profiles
        FOR INSERT
        WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- 2. Ensure users can also manage their own profile completely
-- (Already handled by select/update, but adding this for completeness if needed)
-- CREATE POLICY "Users can manage own profile" ON public.profiles
-- FOR ALL USING (auth.uid() = id);

-- 3. Automatic Usage Limits Creation for new organizations
CREATE OR REPLACE FUNCTION public.handle_new_organization()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usage_limits (org_id, plan_type, invoices_created, clients_created, max_invoices, max_clients)
    VALUES (NEW.id, 'free', 0, 0, 20, 5)
    ON CONFLICT (org_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'tr_create_usage_limits'
    ) THEN
        CREATE TRIGGER tr_create_usage_limits
        AFTER INSERT ON public.organizations
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_organization();
    END IF;
END $$;

-- 4. Add index for faster profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_onboarded ON public.profiles(onboarded);

COMMENT ON TABLE public.profiles IS 'User profiles with RLS enabled for secure self-management and OAuth signup support';
COMMENT ON FUNCTION public.handle_new_organization() IS 'Automatically initializes usage limits for new organizations';

