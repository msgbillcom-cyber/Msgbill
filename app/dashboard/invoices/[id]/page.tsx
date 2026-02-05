"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card, {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateInvoicePDF } from "@/lib/pdf";
import { createRazorpayPaymentLink } from "@/lib/razorpay";
import WhatsAppShareButton from "@/components/invoice/WhatsAppShareButton";
import PaymentLinkButton from "@/components/invoice/PaymentLinkButton";
import GSTCalculator from "@/components/invoice/GSTCalculator";
import RecordPaymentModal from "@/components/invoice/RecordPaymentModal";

export default function InvoiceDetailPage() {
    const { id } = useParams();
    const { profile } = useAuth();
    const supabase = createClientSideClient();
    const { addToast } = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [generatingLink, setGeneratingLink] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [invoice, setInvoice] = useState<any>(null);
    const [items, setItems] = useState<any[]>([]);

    const fetchInvoice = async () => {
        setLoading(true);
        try {
            const { data: inv, error: invError } = await supabase
                .from("invoices")
                .select("*, clients (*)")
                .eq("id", id)
                .single();

            if (invError) throw invError;
            setInvoice(inv);

            const { data: its, error: itsError } = await supabase
                .from("invoice_items")
                .select("*")
                .eq("invoice_id", id);

            if (itsError) throw itsError;
            setItems(its || []);
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
            router.push("/dashboard/invoices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchInvoice();
    }, [id]);

    const handleDownload = async () => {
        if (!invoice || !profile) return;
        setDownloading(true);
        try {
            const doc = await generateInvoicePDF({
                invoice,
                client: invoice.clients,
                organization: profile,
                items,
            });

            doc.save(`Invoice_${invoice.invoice_number}.pdf`);

            const pdfBlob = doc.output("blob");
            const fileName = `${profile.org_id}/${invoice.id}.pdf`;

            await supabase.storage
                .from("invoices")
                .upload(fileName, pdfBlob, {
                    upsert: true,
                    contentType: "application/pdf",
                });

            addToast({
                title: "Saved",
                type: "success",
                message: "PDF archived to cloud storage.",
            });
        } catch (error: any) {
            addToast({
                title: "Error",
                type: "error",
                message: "Failed to generate PDF.",
            });
        } finally {
            setDownloading(false);
        }
    };

    const markAsSent = async () => {
        try {
            await supabase
                .from("invoices")
                .update({
                    status: "sent",
                    sent_at: new Date().toISOString(),
                })
                .eq("id", id);
            fetchInvoice();
        } catch (e) {
            console.error("Failed to update sent status");
        }
    };

    const handleWhatsAppSend = () => {
        if (!invoice) return;
        const paymentInfo = invoice.payment_link_url
            ? `\n\nPay Now: ${invoice.payment_link_url}`
            : "";
        const message =
            `Hi ${invoice.clients?.name},\n\nHope you're doing well. Here is the invoice *${invoice.invoice_number}* for *${
                formatCurrency(invoice.grand_total)
            }*.\n\nDue Date: ${
                formatDate(invoice.due_date)
            }${paymentInfo}\n\nThanks,\n${profile.company_name}`;
        const whatsappUrl = `https://wa.me/${
            invoice.clients?.phone?.replace(/\D/g, "")
        }?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        markAsSent();
    };

    const handleEmailSend = async () => {
        setSendingEmail(true);
        try {
            // Simulate Edge Function call
            await new Promise((r) => setTimeout(r, 1500));
            addToast({
                title: "Email Sent",
                type: "success",
                message: `Invoice sent to ${invoice.clients?.email}`,
            });
            markAsSent();
        } catch (error: any) {
            addToast({
                title: "Error",
                type: "error",
                message: "Failed to send email.",
            });
        } finally {
            setSendingEmail(false);
        }
    };

    const handleGeneratePaymentLink = async () => {
        setGeneratingLink(true);
        try {
            const link = await createRazorpayPaymentLink(
                invoice,
                invoice.clients,
            );

            const { error } = await supabase
                .from("invoices")
                .update({
                    payment_link_id: link.id,
                    payment_link_url: link.short_url,
                    payment_status: "created",
                })
                .eq("id", id);

            if (error) throw error;
            addToast({
                title: "Success",
                type: "success",
                message: "Razorpay Payment link generated!",
            });
            fetchInvoice();
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setGeneratingLink(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading invoice...</div>;
    }

    const getPaymentLink = () => {
        if (invoice.payment_link_url) return invoice.payment_link_url;
        
        // Fallback to UPI link if configured
        if (profile?.upi_id) {
             const upiParams = new URLSearchParams({
                pa: profile.upi_id,
                pn: profile.company_name || profile.name,
                am: invoice.grand_total.toString(),
                tr: invoice.invoice_number,
                tn: `Invoice ${invoice.invoice_number}`,
                cu: "INR"
            });
            return `upi://pay?${upiParams.toString()}`;
        }
        return undefined;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
            <PageHeader
                title={`Invoice ${invoice.invoice_number}`}
                description="View, manage, and share this invoice."
                action={
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => router.back()}>
                            Back
                        </Button>
                        <WhatsAppShareButton
                            invoice={{
                                ...invoice,
                                client: invoice.clients,
                            }}
                            businessName={profile?.company_name || profile?.name}
                            paymentLink={getPaymentLink()}
                            onShareComplete={() => {
                                addToast({
                                    title: "Shared",
                                    type: "success",
                                    message: "Invoice shared on WhatsApp",
                                });
                            }}
                        />
                         <Button
                            variant="ghost"
                            onClick={handleEmailSend}
                            isLoading={sendingEmail}
                            leftIcon={<span>📧</span>}
                        >
                            Email
                        </Button>
                        <Button
                            onClick={handleDownload}
                            isLoading={downloading}
                            leftIcon={<span>📥</span>}
                        >
                            PDF
                        </Button>
                        {invoice.status !== "paid" && (
                            <Button
                                onClick={() => setIsPaymentModalOpen(true)}
                                variant="primary"
                                leftIcon={<span>💰</span>}
                            >
                                Mark Paid
                            </Button>
                        )}
                    </div>
                }
            />

            {invoice && (
                <RecordPaymentModal
                    invoice={invoice}
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    onSuccess={fetchInvoice}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="pt-8">
                            <div className="flex justify-between mb-8">
                                <div>
                                    {profile.logo_url && (
                                        <div className="mb-4">
                                            <img
                                                src={profile.logo_url}
                                                alt={profile.company_name}
                                                className="h-16 w-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-secondary-900">
                                        {profile.company_name}
                                    </h3>
                                    <p className="text-sm text-secondary-500 max-w-xs">
                                        {profile.address}
                                    </p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <Badge
                                        variant={invoice.status === "paid"
                                            ? "success"
                                            : "secondary"}
                                        size="lg"
                                        dot
                                    >
                                        {invoice.status.toUpperCase()}
                                    </Badge>
                                    {invoice.sent_at && (
                                        <span className="text-[10px] text-secondary-500 font-medium">
                                            Sent on{" "}
                                            {formatDate(invoice.sent_at)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8 border-t border-b py-6">
                                <div>
                                    <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-2">
                                        Billed To
                                    </p>
                                    <h4 className="font-bold text-sm">
                                        {invoice.clients?.name}
                                    </h4>
                                    <p className="text-xs text-secondary-500">
                                        {invoice.clients?.address}
                                    </p>
                                    <p className="text-xs text-secondary-500">
                                        {invoice.clients?.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-2">
                                        Payment Details
                                    </p>
                                    <p className="text-xs text-secondary-900 font-medium">
                                        {profile.bank_name}
                                    </p>
                                    <p className="text-xs text-secondary-500">
                                        A/C: {profile.account_number}
                                    </p>
                                    <p className="text-xs text-secondary-500">
                                        IFSC: {profile.ifsc_code}
                                    </p>
                                </div>
                            </div>

                            <Table headers={["Description", "Qty", "Rate", "Total"]}>
                                {items.map((item, index) => (
                                    <tr key={index} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                                        <td className="p-4">{item.description}</td>
                                        <td className="p-4">{item.quantity}</td>
                                        <td className="p-4">{formatCurrency(item.rate)}</td>
                                        <td className="p-4">{formatCurrency(item.quantity * item.rate)}</td>
                                    </tr>
                                ))}
                            </Table>
                        </CardContent>
                    </Card>

                    {/* WhatsApp Share & Payment Actions */}
                    <Card className="border-[#25D366]/20 bg-gradient-to-br from-[#25D366]/5 to-transparent">
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center gap-2">
                                <svg
                                    className="w-4 h-4 text-[#25D366]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Share & Collect Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* WhatsApp Share */}
                            <WhatsAppShareButton
                                invoice={{
                                    id: invoice.id,
                                    invoice_number: invoice.invoice_number,
                                    grand_total: invoice.grand_total,
                                    due_date: invoice.due_date,
                                    client: invoice.clients,
                                }}
                                businessName={profile?.company_name ||
                                    "MsgBill"}
                                paymentLink={invoice.payment_link_url}
                                upiId={profile?.upi_id}
                                onShareComplete={() => {
                                    addToast({
                                        title: "Shared!",
                                        type: "success",
                                        message: "Invoice shared via WhatsApp",
                                    });
                                }}
                            />

                            {/* Payment Link Generation - Disabled for now as per launch plan */}
                            {/* <PaymentLinkButton
                                invoice={invoice}
                                client={invoice.clients}
                                onLinkCreated={(url) => {
                                    setInvoice({
                                        ...invoice,
                                        payment_link_url: url,
                                    });
                                    addToast({
                                        title: "Success!",
                                        type: "success",
                                        message: "Payment link created",
                                    });
                                }}
                            /> */}
                        </CardContent>
                    </Card>

                    {/* GST Breakdown (if GST invoice) */}
                    {invoice.is_gst_invoice && profile?.state &&
                        invoice.clients?.state && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    GST Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <GSTCalculator
                                    subtotal={invoice.subtotal || 0}
                                    taxRate={18}
                                    businessState={profile.state}
                                    clientState={invoice.clients.state}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="bg-gradient-to-br from-primary-600 to-primary-500 text-white border-none">
                        <CardHeader>
                            <CardTitle className="text-white text-sm">
                                Amount Due
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-xs opacity-70">
                                <span>Subtotal</span>
                                <span>{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            {invoice.tax_total > 0 && (
                                <div className="flex justify-between text-xs opacity-70">
                                    <span>Tax</span>
                                    <span>
                                        +{formatCurrency(invoice.tax_total)}
                                    </span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                <span className="text-2xl font-black">
                                    {formatCurrency(invoice.grand_total)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs">
                                Invoice Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-secondary-500">
                                    Status:
                                </span>
                                <Badge
                                    variant={invoice.status === "paid"
                                        ? "success"
                                        : "secondary"}
                                    size="sm"
                                >
                                    {invoice.status}
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary-500">
                                    Issue Date:
                                </span>
                                <span>{formatDate(invoice.issue_date)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary-500">
                                    Due Date:
                                </span>
                                <span>{formatDate(invoice.due_date)}</span>
                            </div>
                            {invoice.payment_link_url && (
                                <div className="pt-2 border-t">
                                    <span className="text-secondary-500">
                                        Payment Link:
                                    </span>
                                    <a
                                        href={invoice.payment_link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline text-xs break-all block mt-1"
                                    >
                                        {invoice.payment_link_url}
                                    </a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
