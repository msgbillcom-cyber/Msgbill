-- Migration to add tax per item to invoice_items
alter table public.invoice_items add column tax_percent numeric(5,2) default 0.00;
alter table public.invoices add column is_gst_enabled boolean default true;
