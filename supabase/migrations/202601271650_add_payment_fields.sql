-- Add payment link fields to invoices (Safely)
alter table public.invoices add column if not exists payment_link_id text;
alter table public.invoices add column if not exists payment_link_url text;
alter table public.invoices add column if not exists payment_status text default 'pending';
