// components/invoice/WhatsAppShareButton.tsx
"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import {
    generateInvoiceMessage,
    shareViaWhatsApp,
    validatePhone,
} from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";

interface WhatsAppShareButtonProps {
    invoice: {
        id: string;
        invoice_number: string;
        grand_total: number;
        due_date: string;
        client: {
            name: string;
            phone?: string;
        };
    };
    businessName: string;
    paymentLink?: string;
    onShareComplete?: () => void;
}

export default function WhatsAppShareButton({
    invoice,
    businessName,
    paymentLink,
    onShareComplete,
}: WhatsAppShareButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleShare = async () => {
        setError("");

        // Validate phone number
        if (!invoice.client.phone) {
            setError("Client phone number is missing");
            return;
        }

        const phoneValidation = validatePhone(invoice.client.phone);
        if (!phoneValidation.valid) {
            setError(phoneValidation.error || "Invalid phone number");
            return;
        }

        setLoading(true);

        try {
            // Generate invoice URL
            const invoiceUrl =
                `${window.location.origin}/invoice/${invoice.id}`;

            // Generate WhatsApp message
            const message = generateInvoiceMessage({
                invoiceNumber: invoice.invoice_number,
                clientName: invoice.client.name,
                amount: formatCurrency(invoice.grand_total),
                dueDate: new Date(invoice.due_date).toLocaleDateString("en-IN"),
                invoiceUrl,
                businessName,
                paymentLink,
            });

            // Open WhatsApp
            shareViaWhatsApp(invoice.client.phone, message);

            // Track share event (call API to record in share_history)
            await fetch("/api/invoices/track-share", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invoiceId: invoice.id,
                    shareType: "whatsapp",
                    recipient: invoice.client.phone,
                }),
            });

            onShareComplete?.();
        } catch (err: any) {
            setError(err.message || "Failed to share via WhatsApp");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <Button
                onClick={handleShare}
                isLoading={loading}
                disabled={!invoice.client.phone}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover-scale ripple w-full sm:w-auto"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Share via WhatsApp
            </Button>

            {error && <p className="text-sm text-error-600">{error}</p>}

            {!invoice.client.phone && (
                <p className="text-sm text-warning-600">
                    ⚠️ Add client's WhatsApp number to enable sharing
                </p>
            )}
        </div>
    );
}
