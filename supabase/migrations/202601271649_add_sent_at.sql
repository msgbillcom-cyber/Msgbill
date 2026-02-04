-- Add sent_at column to track delivery status
alter table public.invoices add column sent_at timestamp with time zone;

-- Update status to allow 'sent' transition
-- Note: status enum already includes 'sent' from initial schema
