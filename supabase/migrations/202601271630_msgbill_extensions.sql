-- MsgBill: GST & Payment Extensions to Existing Schema

-- 1. Add GST & Payment fields to ORGANIZATIONS
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS gstin VARCHAR(15),
ADD COLUMN IF NOT EXISTS gst_registered BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS state VARCHAR(50),
ADD COLUMN IF NOT EXISTS pan VARCHAR(10);

-- 2. Add GST fields to CLIENTS
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS gstin VARCHAR(15),
ADD COLUMN IF NOT EXISTS billing_state VARCHAR(50),
ADD COLUMN IF NOT EXISTS pan VARCHAR(10);

-- 3. Add GST & Payment fields to INVOICES
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS is_gst_invoice BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS cgst_amount NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS sgst_amount NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS igst_amount NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS place_of_supply VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_link_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_link_url TEXT,
ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS whatsapp_shared_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;

-- 4. Add HSN code to INVOICE_ITEMS
ALTER TABLE public.invoice_items 
ADD COLUMN IF NOT EXISTS hsn_code VARCHAR(8),
ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(10,2) DEFAULT 0;

-- 5. Create SHARE_HISTORY table
CREATE TABLE IF NOT EXISTS public.share_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
    share_type VARCHAR(20) NOT NULL CHECK (share_type IN ('whatsapp', 'email', 'sms', 'link')),
    recipient VARCHAR(255),
    shared_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_invoices_payment_link ON public.invoices(payment_link_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_share_history_invoice ON public.share_history(invoice_id);

-- 7. Enable RLS on new table
ALTER TABLE public.share_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view share history of their invoices" ON public.share_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.invoices i
            JOIN public.organization_members m ON i.org_id = m.org_id
            WHERE i.id = share_history.invoice_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert share history for their invoices" ON public.share_history
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.invoices i
            JOIN public.organization_members m ON i.org_id = m.org_id
            WHERE i.id = share_history.invoice_id AND m.user_id = auth.uid()
        )
    );

-- 8. Function to calculate invoice totals with GST
CREATE OR REPLACE FUNCTION calculate_invoice_totals(invoice_uuid UUID)
RETURNS VOID AS $$
DECLARE
    v_subtotal NUMERIC(12,2);
    v_tax_total NUMERIC(12,2);
    v_cgst NUMERIC(10,2);
    v_sgst NUMERIC(10,2);
    v_igst NUMERIC(10,2);
BEGIN
    -- Calculate subtotal from items
    SELECT COALESCE(SUM(quantity * rate), 0) INTO v_subtotal
    FROM public.invoice_items
    WHERE invoice_id = invoice_uuid;
    
    -- Get GST amounts
    SELECT COALESCE(cgst_amount, 0), COALESCE(sgst_amount, 0), COALESCE(igst_amount, 0)
    INTO v_cgst, v_sgst, v_igst
    FROM public.invoices
    WHERE id = invoice_uuid;
    
    v_tax_total := v_cgst + v_sgst + v_igst;
    
    -- Update invoice
    UPDATE public.invoices
    SET subtotal = v_subtotal,
        tax_total = v_tax_total,
        grand_total = v_subtotal + v_tax_total,
        updated_at = now()
    WHERE id = invoice_uuid;
END;
$$ LANGUAGE plpgsql;
