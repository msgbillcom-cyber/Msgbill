import React from "react";
import { createClient } from "@supabase/supabase-js";
import { formatCurrency, formatDate } from "@/lib/utils";
import GSTCalculator from "@/components/invoice/GSTCalculator";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicInvoiceClient from "@/components/invoice/PublicInvoiceClient";

// Initialize Supabase Admin Client for Server-Side Fetching
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

interface Props {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// 1. Generate Metadata for WhatsApp Link Previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: invoice } = await supabaseAdmin
        .from("invoices")
        .select("invoice_number, grand_total, organizations(name, logo_url)")
        .eq("id", params.id)
        .neq("status", "draft")
        .neq("status", "cancelled")
        .single();

    if (!invoice) {
        return {
            title: "Invoice Not Found | MsgBill",
            robots: { index: false, follow: false },
        };
    }

    const companyName = Array.isArray(invoice.organizations) 
        ? invoice.organizations[0]?.name 
        : (invoice.organizations as any)?.name || "Business";
    
    const logoUrl = Array.isArray(invoice.organizations)
        ? invoice.organizations[0]?.logo_url
        : (invoice.organizations as any)?.logo_url;

    const amount = formatCurrency(invoice.grand_total);

    return {
        title: `Invoice ${invoice.invoice_number} from ${companyName}`,
        description: `View and pay invoice for ${amount}. Powered by MsgBill.`,
        // Private customer invoices must never be indexed by search engines.
        robots: { index: false, follow: false },
        openGraph: {
            title: `Invoice ${invoice.invoice_number} from ${companyName}`,
            description: `Total Amount: ${amount}`,
            images: logoUrl ? [logoUrl] : [], // Use organization logo if available
        },
    };
}

// 2. Server Component
export default async function PublicInvoicePage({ params, searchParams }: Props) {
    // Fetch Data on Server
    const { data: invoice } = await supabaseAdmin
        .from("invoices")
        .select(`
            id,
            invoice_number,
            issue_date,
            due_date,
            status,
            currency,
            subtotal,
            tax_total,
            grand_total,
            notes,
            terms,
            is_gst_invoice,
            cgst_amount,
            sgst_amount,
            igst_amount,
            place_of_supply,
            payment_link_url,
            paid_at,
            org_id,
            clients (name, email, phone, address, gstin, billing_state)
        `)
        .eq("id", params.id)
        .neq("status", "draft")
        .neq("status", "cancelled")
        .single();

    if (!invoice) {
        // Return a real HTTP 404 (renders app/not-found.tsx) instead of a 200 "not found" page.
        notFound();
    }

    // Fetch related data
    const { data: items } = await supabaseAdmin
        .from("invoice_items")
        .select("*")
        .eq("invoice_id", params.id);

    const { data: organization } = await supabaseAdmin
        .from("organizations")
        .select("id, name, logo_url, address, gstin, upi_id, upi_qr_url, bank_name, bank_account_number, bank_ifsc_code")
        .eq("id", invoice.org_id)
        .single();

    const actuallyPaid = invoice.status === "paid" || Boolean(invoice.paid_at);
    const paymentSuccess =
        actuallyPaid && (
            searchParams?.payment === 'success' ||
            (Array.isArray(searchParams?.payment) && searchParams.payment.includes('success'))
        );

    return (
        <PublicInvoiceClient 
            invoice={invoice} 
            items={items || []} 
            organization={organization}
            paymentSuccess={paymentSuccess}
        />
    );
}
