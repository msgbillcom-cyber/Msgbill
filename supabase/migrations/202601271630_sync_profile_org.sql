-- Add organization_id column to profiles if missing and link to actual company details
-- This is to ensure profiles table can store organization info directly for simplicity in this MVP
alter table public.profiles add column company_name text;
alter table public.profiles add column address text;
alter table public.profiles add column gstin text;
alter table public.profiles add column bank_name text;
alter table public.profiles add column account_number text;
alter table public.profiles add column ifsc_code text;
alter table public.profiles add column org_id uuid references public.organizations(id);
