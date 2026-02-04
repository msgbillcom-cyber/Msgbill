-- Create expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view expenses for their organization" ON public.expenses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.org_id = expenses.org_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert expenses for their organization" ON public.expenses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.org_id = expenses.org_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update expenses for their organization" ON public.expenses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.org_id = expenses.org_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete expenses for their organization" ON public.expenses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.org_id = expenses.org_id AND m.user_id = auth.uid()
        )
    );

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_expenses_org_date ON public.expenses(org_id, date);
