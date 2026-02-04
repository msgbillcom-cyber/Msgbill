// components/invoice/PaymentLinkButton.tsx
"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { createPaymentLink, RazorpayPaymentLinkRequest } from "@/lib/razorpay";

interface PaymentLinkButtonProps {
    invoice: {
        id: string;
        invoice_number: string;
        grand_total: number;
        payment_link_url?: string;
    };
    client: {
        name: string;
        phone?: string;
        email?: string;
    };
    onLinkCreated?: (paymentLinkUrl: string) => void;
    compact?: boolean;
}

export default function PaymentLinkButton({
    invoice,
    client,
    onLinkCreated,
    compact = false,
}: PaymentLinkButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateLink = async () => {
        setError("");
        setLoading(true);

        try {
            const request: RazorpayPaymentLinkRequest = {
                amount: invoice.grand_total,
                currency: "INR",
                description: `Invoice ${invoice.invoice_number}`,
                customer: {
                    name: client.name,
                    contact: client.phone,
                    email: client.email,
                },
                notify: {
                    sms: !!client.phone,
                    email: !!client.email,
                    whatsapp: false,
                },
                reference_id: invoice.id,
            };

            const paymentLink = await createPaymentLink(request);
            onLinkCreated?.(paymentLink.short_url);
        } catch (err: any) {
            setError(err.message || "Failed to generate payment link");
        } finally {
            setLoading(false);
        }
    };

    if (invoice.payment_link_url) {
        return (
            <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 bg-success-50 border border-success-200 rounded-lg">
                    <svg
                        className="w-5 h-5 text-success-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-success-900">
                            Payment Link Created
                        </p>
                        <a
                            href={invoice.payment_link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-success-600 hover:underline flex items-center gap-1"
                        >
                            {invoice.payment_link_url}
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Button
                type="button"
                onClick={handleGenerateLink}
                isLoading={loading}
                variant={compact ? "outline" : "primary"}
                size={compact ? "sm" : "md"}
                className={compact ? "" : "w-full"}
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
                Generate Razorpay Payment Link
            </Button>

            {error && (
                <p className="text-sm text-error-600 flex items-center gap-1">
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}

            {!client.phone && !client.email && (
                <p className="text-xs text-warning-600">
                    ⚠️ Client has no phone or email. Add contact details for
                    automatic notifications.
                </p>
            )}
        </div>
    );
}
