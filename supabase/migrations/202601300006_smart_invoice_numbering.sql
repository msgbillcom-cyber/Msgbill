-- Smart Invoice Numbering Migration
-- Adds sequential numbering support per organization

-- 1. Add counters to organizations table
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS invoice_prefix VARCHAR(10) DEFAULT 'INV-',
ADD COLUMN IF NOT EXISTS invoice_counter INTEGER DEFAULT 0;

-- 2. Function to get next invoice number (Atomic increment)
CREATE OR REPLACE FUNCTION public.get_next_invoice_number(org_uuid UUID)
RETURNS TEXT AS $$
DECLARE
    next_count INTEGER;
    prefix TEXT;
    next_number TEXT;
BEGIN
    -- Update and return the new counter value atomically
    UPDATE public.organizations
    SET invoice_counter = invoice_counter + 1
    WHERE id = org_uuid
    RETURNING invoice_counter, invoice_prefix INTO next_count, prefix;
    
    -- Format: INV-0001, INV-0002, etc.
    -- Pad with zeros to 4 digits
    next_number := prefix || LPAD(next_count::TEXT, 4, '0');
    
    RETURN next_number;
END;
$$ LANGUAGE plpgsql;

-- 3. Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_next_invoice_number(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_next_invoice_number(UUID) TO service_role;

-- 4. Create RLS policy update if needed (Users can update their own org counter via the function? 
-- The function uses "SECURITY DEFINER" if we want to bypass RLS, or we rely on the existing update policy)
-- Let's make the function SECURITY DEFINER to ensure it works even if the user only has partial update rights
CREATE OR REPLACE FUNCTION public.get_next_invoice_number(org_uuid UUID)
RETURNS TEXT AS $$
DECLARE
    next_count INTEGER;
    prefix TEXT;
    next_number TEXT;
BEGIN
    -- Verify user belongs to org (Security check)
    IF NOT EXISTS (
        SELECT 1 FROM public.organization_members 
        WHERE org_id = org_uuid AND user_id = auth.uid()
    ) AND auth.uid() IS NOT NULL THEN -- Allow if service role (auth.uid is null) or check membership
        RAISE EXCEPTION 'Access denied';
    END IF;

    UPDATE public.organizations
    SET invoice_counter = COALESCE(invoice_counter, 0) + 1
    WHERE id = org_uuid
    RETURNING invoice_counter, COALESCE(invoice_prefix, 'INV-') INTO next_count, prefix;
    
    next_number := prefix || LPAD(next_count::TEXT, 4, '0');
    
    RETURN next_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
