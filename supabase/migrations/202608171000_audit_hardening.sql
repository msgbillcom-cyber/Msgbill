-- Audit hardening: RLS, indexes, numbering peek, atomic stock, payment uniqueness

-- 1. Indexes
CREATE INDEX IF NOT EXISTS idx_invoices_org_created ON public.invoices (org_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_org_status ON public.invoices (org_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices (org_id, due_date);
CREATE INDEX IF NOT EXISTS idx_clients_org ON public.clients (org_id);
CREATE INDEX IF NOT EXISTS idx_products_org ON public.products (org_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_transaction_id
  ON public.payments (transaction_id)
  WHERE transaction_id IS NOT NULL AND transaction_id <> '';

-- 2. Subscription expiry
ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS subscription_expires_at timestamptz;

-- 3. Public store: do not expose full organization rows
DROP POLICY IF EXISTS "Public can view organizations" ON public.organizations;
DROP POLICY IF EXISTS "Public can view products" ON public.products;

CREATE OR REPLACE VIEW public.storefront_orgs AS
SELECT id, name, logo_url, address
FROM public.organizations;

ALTER VIEW public.storefront_orgs SET (security_invoker = false);


DROP POLICY IF EXISTS "Anon can view in-stock store products" ON public.products;

CREATE POLICY "Public can view in-stock store products"
ON public.products
FOR SELECT
USING (stock_quantity > 0);

-- 4. Membership: cannot join arbitrary orgs (onboarding uses service role)
DROP POLICY IF EXISTS "Users can insert own organization memberships" ON public.organization_members;
DROP POLICY IF EXISTS "Users can update own organization memberships" ON public.organization_members;

-- 5. Peek next invoice number without incrementing
CREATE OR REPLACE FUNCTION public.peek_next_invoice_number(org_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

    IF prefix IS NULL THEN
        RETURN NULL;
    END IF;

    RETURN prefix || LPAD(next_count::TEXT, 4, '0');
END;
$$;

GRANT EXECUTE ON FUNCTION public.peek_next_invoice_number(UUID) TO authenticated;

-- 6. Atomic stock deduct scoped to org
CREATE OR REPLACE FUNCTION public.deduct_org_stock(p_id uuid, p_quantity numeric, p_org uuid)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_qty numeric;
BEGIN
    IF p_quantity IS NULL OR p_quantity <= 0 THEN
        RAISE EXCEPTION 'Invalid quantity';
    END IF;

    UPDATE public.products
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_id
      AND org_id = p_org
      AND stock_quantity >= p_quantity
    RETURNING stock_quantity INTO new_qty;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient stock or product not found';
    END IF;

    RETURN new_qty;
END;
$$;

GRANT EXECUTE ON FUNCTION public.deduct_org_stock(uuid, numeric, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.deduct_org_stock(uuid, numeric, uuid) TO authenticated;
