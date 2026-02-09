-- Add share tracking columns to invoices
alter table public.invoices 
add column if not exists whatsapp_shared_at timestamp with time zone,
add column if not exists email_sent_at timestamp with time zone;

-- Create share_history table
create table if not exists public.share_history (
    id uuid primary key default uuid_generate_v4(),
    invoice_id uuid references public.invoices(id) on delete cascade not null,
    share_type text not null check (share_type in ('whatsapp', 'email', 'link')),
    recipient text,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.share_history enable row level security;

-- Policy: Users can view share history for invoices in their org
create policy "Users can view share history of their org" on public.share_history
    for select using (
        exists (
            select 1 from public.invoices i
            join public.organization_members m on i.org_id = m.org_id
            where i.id = share_history.invoice_id and m.user_id = auth.uid()
        )
    );

create policy "Users can insert share history for their org" on public.share_history
    for insert with check (
        exists (
            select 1 from public.invoices i
            join public.organization_members m on i.org_id = m.org_id
            where i.id = share_history.invoice_id and m.user_id = auth.uid()
        )
    );
