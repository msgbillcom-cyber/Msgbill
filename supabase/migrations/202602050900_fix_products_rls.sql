-- Fix RLS policy for products to allow insert/update with check

-- Drop existing policy if present
DROP POLICY IF EXISTS "Users can manage products in their org" ON public.products;

-- Recreate policy with WITH CHECK for inserts/updates
CREATE POLICY "Users can manage products in their org" ON public.products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE org_id = products.org_id AND user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE org_id = products.org_id AND user_id = auth.uid()
        )
    );
