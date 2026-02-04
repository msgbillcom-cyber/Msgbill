create table if not exists public.products (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    name text not null,
    description text,
    price numeric(12,2) default 0.00 not null,
    stock_quantity numeric(12,2) default 0.00 not null,
    unit text default 'pcs',
    gst_rate numeric(5,2) default 0.00,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Policies
create policy "Users can manage products in their org" on public.products
    for all using (
        exists (
            select 1 from public.organization_members
            where org_id = products.org_id and user_id = auth.uid()
        )
    );
