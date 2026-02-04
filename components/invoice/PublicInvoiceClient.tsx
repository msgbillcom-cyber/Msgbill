"use client";

import React, { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateInvoicePDF } from "@/lib/pdf";
import { generateInvoiceMessage, shareViaWhatsApp } from "@/lib/whatsapp";
import GSTCalculator from "@/components/invoice/GSTCalculator";
import Link from "next/link";

interface PublicInvoiceClientProps {
    invoice: any;
    items: any[];
    organization: any;
}

export default function PublicInvoiceClient({
    invoice,
    items,
    organization,
}: PublicInvoiceClientProps) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!invoice || !organization) return;
        setDownloading(true);
        try {
            const doc = await generateInvoicePDF({
                invoice,
                client: invoice.clients,
                organization: organization,
                items,
            });
            doc.save(`Invoice_${invoice.invoice_number}.pdf`);
        } catch (error: any) {
            console.error("PDF Generation failed");
        } finally {
            setDownloading(false);
        }
    };

    const handleWhatsAppShare = () => {
        if (!invoice || !invoice.clients?.phone || !organization) return;

        const invoiceUrl = `${window.location.origin}/invoice/${invoice.id}`;
        const message = generateInvoiceMessage({
            invoiceNumber: invoice.invoice_number,
            clientName: invoice.clients.name,
            amount: formatCurrency(invoice.grand_total),
            dueDate: formatDate(invoice.due_date),
            invoiceUrl,
            businessName: organization.name || organization.company_name || "MsgBill",
            paymentLink: invoice.payment_link_url,
        });

        shareViaWhatsApp(invoice.clients.phone, message);
    };

    return (
        <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Public Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        {organization?.logo_url ? (
                            <img
                                src={organization.logo_url}
                                alt={organization.company_name}
                                className="h-10 w-auto object-contain rounded-md"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg">
                                <span className="text-white font-black text-sm">
                                    {(organization?.name || organization?.company_name || "IE")
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </span>
                            </div>
                        )}
                        <span className="text-xl font-bold text-secondary-900 tracking-tight">
                            {organization?.name || organization?.company_name || "MsgBill"}
                        </span>
                        {/* Branding Badge */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden md:flex items-center gap-1.5 ml-2 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 px-2.5 py-1 rounded-full transition-all border border-primary-200 group"
                        >
                            <span className="text-[10px] font-semibold text-primary-700 tracking-wide uppercase">
                                by MsgBill
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {invoice.clients?.phone && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleWhatsAppShare}
                                className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-0"
                            >
                                <svg
                                    className="w-4 h-4 mr-1.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Share
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            isLoading={downloading}
                        >
                            📥 Download
                        </Button>
                        {invoice.payment_link_url && invoice.status !== "paid" && (
                            <Button
                                size="sm"
                                onClick={() =>
                                    window.open(invoice.payment_link_url, "_blank")}
                                className="bg-gradient-to-r from-primary-600 to-primary-500 shadow-glow hover-scale"
                            >
                                💳 Pay Now
                            </Button>
                        )}
                    </div>
                </div>

                <Card className="border-none shadow-2xl overflow-hidden">
                    {/* Status Banner */}
                    <div
                        className={`p-4 text-center text-sm font-bold tracking-tight uppercase border-b ${
                            invoice.status === "paid"
                                ? "bg-success-50 text-success-700"
                                : "bg-primary-50 text-primary-700"
                        }`}
                    >
                        {invoice.status === "paid"
                            ? "✓ This invoice has been paid"
                            : `Due on ${formatDate(invoice.due_date)}`}
                    </div>

                    <CardContent className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-secondary-900">
                                    Invoice
                                </h2>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-secondary-400 uppercase">
                                        From
                                    </p>
                                    {organization?.logo_url && (
                                        <div className="mb-4">
                                            <img
                                                src={organization.logo_url}
                                                alt={organization.company_name}
                                                className="h-16 w-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">
                                        {organization?.company_name}
                                    </h3>
                                    <p className="text-sm text-secondary-500 max-w-xs">
                                        {organization?.address}
                                    </p>
                                    <p className="text-sm font-medium mt-2">
                                        GSTIN: {organization?.gstin || "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-sm font-bold text-secondary-400 uppercase">
                                    Invoice #
                                </p>
                                <p className="text-2xl font-black text-secondary-900">
                                    {invoice.invoice_number}
                                </p>
                                <p className="text-sm text-secondary-500 pt-2">
                                    Issued on {formatDate(invoice.issue_date)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-secondary-50/50 rounded-2xl p-8 mb-12 border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">
                                        Bill To
                                    </p>
                                    <h4 className="font-bold">
                                        {invoice.clients?.name}
                                    </h4>
                                    <p className="text-sm text-secondary-500 max-w-xs">
                                        {invoice.clients?.address}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {invoice.clients?.email}
                                    </p>
                                </div>
                                <div className="space-y-1 md:text-right">
                                    <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">
                                        Payment Methods
                                    </p>
                                    <p className="text-sm text-secondary-900 font-medium">
                                        {organization?.bank_name}
                                    </p>
                                    <p className="text-xs text-secondary-500">
                                        A/C: {organization?.account_number}
                                    </p>
                                    <p className="text-xs text-secondary-500">
                                        IFSC: {organization?.ifsc_code}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Table className="mb-12" headers={["Description", "Quantity", "Price", "Total"]}>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                                    <td className="p-4">{item.description}</td>
                                    <td className="p-4 text-center">{item.quantity}</td>
                                    <td className="p-4 text-right">{formatCurrency(item.rate)}</td>
                                    <td className="p-4 text-right font-bold">{formatCurrency(item.quantity * item.rate)}</td>
                                </tr>
                            ))}
                        </Table>

                        {/* GST Breakdown for GST Invoices */}
                        {invoice.is_gst_invoice &&
                            organization?.state &&
                            invoice.clients?.state && (
                                <div className="my-8 p-6 bg-secondary-50 rounded-xl border border-secondary-200">
                                    <h3 className="text-sm font-bold text-secondary-700 mb-4">
                                        Tax Breakdown
                                    </h3>
                                    <GSTCalculator
                                        subtotal={invoice.subtotal || 0}
                                        taxRate={18}
                                        businessState={organization.state}
                                        clientState={invoice.clients.state}
                                    />
                                </div>
                            )}

                        <div className="flex flex-col items-end gap-3 pt-8 border-t">
                            <div className="flex justify-between w-full md:w-64">
                                <span className="text-secondary-500 font-medium">
                                    Subtotal
                                </span>
                                <span className="font-bold">
                                    {formatCurrency(invoice.subtotal)}
                                </span>
                            </div>
                            {invoice.tax_total > 0 && (
                                <div className="flex justify-between w-full md:w-64">
                                    <span className="text-secondary-500 font-medium">
                                        Tax Total
                                    </span>
                                    <span className="font-bold text-primary-600">
                                        +{formatCurrency(invoice.tax_total)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between w-full md:w-64 pt-4 border-t-2 border-secondary-900 items-center">
                                <span className="text-lg font-black uppercase text-secondary-900 tracking-tighter">
                                    Grand Total
                                </span>
                                <span className="text-3xl font-black text-primary-600">
                                    {formatCurrency(invoice.grand_total)}
                                </span>
                            </div>
                        </div>

                        {invoice.notes && (
                            <div className="mt-16 pt-8 border-t border-dashed">
                                <p className="text-xs font-bold text-secondary-400 uppercase mb-2">
                                    Notes
                                </p>
                                <p className="text-sm text-secondary-600 italic leading-relaxed">
                                    {invoice.notes}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Powered by Footer */}
                <div className="text-center pt-8 border-t border-secondary-200/50">
                    <Link href="/" target="_blank" className="inline-block group">
                        <p className="text-xs font-semibold text-secondary-400 tracking-widest uppercase flex items-center justify-center gap-2 group-hover:text-primary-600 transition-colors">
                            <span className="w-8 h-px bg-secondary-200 group-hover:bg-primary-200 transition-colors" />
                            Powered by MsgBill
                            <span className="w-8 h-px bg-secondary-200 group-hover:bg-primary-200 transition-colors" />
                        </p>
                    </Link>
                    <p className="text-sm text-secondary-500 max-w-sm mx-auto mt-2">
                        Create professional invoices for your business in seconds.
                    </p>
                    <Link href="/auth/signup">
                        <Button variant="outline" size="sm">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
