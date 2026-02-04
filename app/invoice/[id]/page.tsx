import React from "react";
import { createClient } from "@supabase/supabase-js";
import { formatCurrency, formatDate } from "@/lib/utils";
import GSTCalculator from "@/components/invoice/GSTCalculator";
import Link from "next/link";
import { Metadata } from "next";
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
}

// 1. Generate Metadata for WhatsApp Link Previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: invoice } = await supabaseAdmin
        .from("invoices")
        .select("invoice_number, grand_total, organizations(company_name, logo_url)")
        .eq("id", params.id)
        .single();

    if (!invoice) {
        return {
            title: "Invoice Not Found | MsgBill",
        };
    }

    const companyName = Array.isArray(invoice.organizations) 
        ? invoice.organizations[0]?.company_name 
        : (invoice.organizations as any)?.company_name || "Business";
    
    const logoUrl = Array.isArray(invoice.organizations)
        ? invoice.organizations[0]?.logo_url
        : (invoice.organizations as any)?.logo_url;

    const amount = formatCurrency(invoice.grand_total);

    return {
        title: `Invoice ${invoice.invoice_number} from ${companyName}`,
        description: `View and pay invoice for ${amount}. Powered by MsgBill.`,
        openGraph: {
            title: `Invoice ${invoice.invoice_number} from ${companyName}`,
            description: `Total Amount: ${amount}`,
            images: logoUrl ? [logoUrl] : [], // Use organization logo if available
        },
    };
}

// 2. Server Component
export default async function PublicInvoicePage({ params }: Props) {
    // Fetch Data on Server
    const { data: invoice } = await supabaseAdmin
        .from("invoices")
        .select("*, clients (*)")
        .eq("id", params.id)
        .single();

    if (!invoice) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-50">
                <div className="max-w-md w-full text-center p-12 bg-white rounded-xl shadow-lg">
                    <span className="text-6xl mb-6 block">🚫</span>
                    <h1 className="text-2xl font-bold mb-2">Invoice Not Found</h1>
                    <p className="text-secondary-500 mb-8">
                        This invoice might have been deleted or the link is incorrect.
                    </p>
                    <Link href="/" className="text-primary-600 hover:underline">
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    // Fetch related data
    const { data: items } = await supabaseAdmin
        .from("invoice_items")
        .select("*")
        .eq("invoice_id", params.id);

    const { data: organization } = await supabaseAdmin
        .from("organizations")
        .select("*")
        .eq("id", invoice.org_id)
        .single();

    // Pass data to Client Component for interactivity (Download, Pay)
    return (
        <PublicInvoiceClient 
            invoice={invoice} 
            items={items || []} 
            organization={organization} 
        />
    );
}
