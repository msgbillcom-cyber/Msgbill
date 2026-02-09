-- Create Products Table
create table public.products (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    name text not null,
    price numeric(12,2) default 0.00 not null,
    unit text default 'Item',
    gst_rate numeric(5,2) default 0.00,
    stock_quantity numeric(12,2) default 0.00 not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- RLS Policy: Users can manage products in their org
create policy "Users can manage products in their org" on public.products
    for all using (
        exists (
            select 1 from public.organization_members
            where org_id = products.org_id and user_id = auth.uid()
        )
    );

-- Trigger for updated_at
create trigger tr_products_updated_at before update on public.products for each row execute procedure public.handle_updated_at();
