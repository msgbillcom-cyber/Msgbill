-- INVOICE EASE: DATABASE SCHEMA & MIGRATIONS

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ORGANIZATIONS
create table public.organizations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    logo_url text,
    address text,
    gstin text,
    bank_details jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PROFILES (Extends Auth Users)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    avatar_url text,
    onboarded boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORGANIZATION MEMBERS (Multi-tenant mapping)
create type public.org_role as enum ('owner', 'admin', 'member');

create table public.organization_members (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    role org_role default 'member' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(org_id, user_id)
);

-- 5. CLIENTS
create table public.clients (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    name text not null,
    email text,
    phone text,
    address text,
    gstin text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. INVOICES
create type public.invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');

create table public.invoices (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    client_id uuid references public.clients(id) on delete set null not null,
    invoice_number text not null,
    issue_date date default current_date not null,
    due_date date not null,
    status invoice_status default 'draft' not null,
    currency text default 'INR' not null,
    subtotal numeric(12,2) default 0.00 not null,
    tax_total numeric(12,2) default 0.00 not null,
    grand_total numeric(12,2) default 0.00 not null,
    notes text,
    terms text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(org_id, invoice_number)
);

-- 7. INVOICE ITEMS
create table public.invoice_items (
    id uuid primary key default uuid_generate_v4(),
    invoice_id uuid references public.invoices(id) on delete cascade not null,
    description text not null,
    quantity numeric(12,2) default 1.00 not null,
    rate numeric(12,2) default 0.00 not null,
    amount numeric(12,2) generated always as (quantity * rate) stored,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. PAYMENTS
create type public.payment_method as enum ('upi', 'bank_transfer', 'cash', 'card', 'razorpay');

create table public.payments (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade not null,
    invoice_id uuid references public.invoices(id) on delete cascade not null,
    amount numeric(12,2) not null,
    payment_date timestamp with time zone default timezone('utc'::text, now()) not null,
    method payment_method not null,
    transaction_id text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. USAGE LIMITS
create table public.usage_limits (
    id uuid primary key default uuid_generate_v4(),
    org_id uuid references public.organizations(id) on delete cascade unique not null,
    plan_type text default 'free' not null,
    invoices_created int default 0 not null,
    clients_created int default 0 not null,
    max_invoices int default 3 not null,
    max_clients int default 2 not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. ROW LEVEL SECURITY (RLS) policies

-- Enable RLS on all tables
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.usage_limits enable row level security;

-- PROFILES: Users can only see/update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ORGANIZATIONS: Access via organization_members mapping
create policy "Members can view their organization" on public.organizations
    for select using (
        exists (
            select 1 from public.organization_members
            where org_id = organizations.id and user_id = auth.uid()
        )
    );

create policy "Owners can update their organization" on public.organizations
    for update using (
        exists (
            select 1 from public.organization_members
            where org_id = organizations.id and user_id = auth.uid() and role in ('owner', 'admin')
        )
    );

-- ORGANIZATION MEMBERS: Users can see fellow members
create policy "Members can see other members in same org" on public.organization_members
    for select using (
        exists (
            select 1 from public.organization_members as m
            where m.org_id = organization_members.org_id and m.user_id = auth.uid()
        )
    );

-- CLIENTS
create policy "Users can manage clients in their org" on public.clients
    for all using (
        exists (
            select 1 from public.organization_members
            where org_id = clients.org_id and user_id = auth.uid()
        )
    );

-- INVOICES
create policy "Users can manage invoices in their org" on public.invoices
    for all using (
        exists (
            select 1 from public.organization_members
            where org_id = invoices.org_id and user_id = auth.uid()
        )
    );

-- INVOICE ITEMS (via invoice relationship)
create policy "Users can manage items of their invoices" on public.invoice_items
    for all using (
        exists (
            select 1 from public.invoices i
            join public.organization_members m on i.org_id = m.org_id
            where i.id = invoice_items.invoice_id and m.user_id = auth.uid()
        )
    );

-- PAYMENTS
create policy "Users can manage payments in their org" on public.payments
    for all using (
        exists (
            select 1 from public.organization_members
            where org_id = payments.org_id and user_id = auth.uid()
        )
    );

-- USAGE LIMITS
create policy "Users can view their org limits" on public.usage_limits
    for select using (
        exists (
            select 1 from public.organization_members
            where org_id = usage_limits.org_id and user_id = auth.uid()
        )
    );

-- 11. AUTOMATIC UPDATED_AT TRIGGER
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger tr_organizations_updated_at before update on public.organizations for each row execute procedure public.handle_updated_at();
create trigger tr_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger tr_clients_updated_at before update on public.clients for each row execute procedure public.handle_updated_at();
create trigger tr_invoices_updated_at before update on public.invoices for each row execute procedure public.handle_updated_at();
