-- Function to safely deduct stock
create or replace function deduct_product_stock(p_id uuid, quantity numeric)
returns void
language plpgsql
security definer
as $$
begin
  update public.products
  set stock_quantity = stock_quantity - quantity
  where id = p_id;
end;
$$;
