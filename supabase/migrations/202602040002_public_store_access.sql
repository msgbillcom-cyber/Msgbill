-- Allow public read access to products for the Storefront
create policy "Public can view products" 
on public.products 
for select 
using (true);

-- Allow public read access to specific organization details for the Storefront
-- Note: We only want to expose public details like name, logo, etc.
-- However, RLS applies to the whole row. We should be careful.
-- For now, we allow select on organizations for everyone, but the API/Frontend should only request safe fields.
create policy "Public can view organizations" 
on public.organizations 
for select 
using (true);
