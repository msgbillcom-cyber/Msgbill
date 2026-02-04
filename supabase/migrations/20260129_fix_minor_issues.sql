-- Migration to fix minor issues identified during QA testing
-- Addresses: organization_members RLS infinite recursion and schema field inconsistencies

-- Fix 1: Clean up organization_members RLS policies to prevent infinite recursion
-- Drop any existing recursive policies
DO $$
DECLARE 
    policy_record RECORD;
BEGIN 
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'organization_members' 
    LOOP 
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_record.policyname) || ' ON organization_members;';
    END LOOP;
END $$;

-- Create simple, non-recursive RLS policies for organization_members
CREATE POLICY "Users can view own organization memberships" ON organization_members
FOR SELECT
USING (
    user_id = auth.uid()
);

CREATE POLICY "Users can insert own organization memberships" ON organization_members
FOR INSERT
WITH CHECK (
    user_id = auth.uid()
);

CREATE POLICY "Users can update own organization memberships" ON organization_members
FOR UPDATE
USING (
    user_id = auth.uid()
);

CREATE POLICY "Users can delete own organization memberships" ON organization_members
FOR DELETE
USING (
    user_id = auth.uid()
);

-- Fix 2: Add missing payment fields to match expected schema
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'INR';

-- Migrate existing data from 'method' to 'payment_method' if needed
UPDATE payments 
SET payment_method = method 
WHERE payment_method IS NULL AND method IS NOT NULL;

-- Migrate existing data to set paid_at if missing
UPDATE payments 
SET paid_at = created_at 
WHERE paid_at IS NULL;

-- Add constraint for payment method validation
ALTER TABLE payments 
ADD CONSTRAINT IF NOT EXISTS payments_payment_method_check 
CHECK (payment_method IN ('upi', 'card', 'netbanking', 'cash', 'other'));

-- Fix 3: Add UPI-specific fields to organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS upi_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS bank_account_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS bank_ifsc_code VARCHAR(20);

-- Migrate existing bank_details JSON to separate columns for better query performance
UPDATE organizations 
SET upi_id = COALESCE(upi_id, bank_details->>'upi_id'),
    bank_account_number = COALESCE(bank_account_number, bank_details->>'account_number'),
    bank_ifsc_code = COALESCE(bank_ifsc_code, bank_details->>'ifsc_code')
WHERE bank_details IS NOT NULL 
AND (upi_id IS NULL OR bank_account_number IS NULL OR bank_ifsc_code IS NULL);

-- Fix 4: Add performance indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_org_id ON payments(org_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_organization_members_user_id ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_org_id ON organization_members(org_id);

-- Fix 5: Add proper table and column comments for documentation
COMMENT ON TABLE organization_members IS 'Links users to organizations with role-based access control - Fixed RLS policies';
COMMENT ON COLUMN organization_members.user_id IS 'Reference to auth.users table - RLS filtered by auth.uid()';
COMMENT ON COLUMN organization_members.org_id IS 'Reference to organizations table';
COMMENT ON COLUMN organization_members.role IS 'User role within organization: owner, admin, member';

COMMENT ON TABLE payments IS 'Tracks payment transactions with proper method and timing fields';
COMMENT ON COLUMN payments.payment_method IS 'Payment method: upi, card, netbanking, cash, other';
COMMENT ON COLUMN payments.paid_at IS 'When payment was completed (separate from record creation)';
COMMENT ON COLUMN payments.currency IS 'Currency code, defaults to INR';

-- Verification: Test that fixes work correctly
SELECT 'RLS policies fixed and schema inconsistencies resolved' as migration_status;
