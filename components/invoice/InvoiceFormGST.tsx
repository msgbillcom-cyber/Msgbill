// components/invoice/InvoiceFormGST.tsx
"use client";

import React from "react";
import Switch from "@/components/ui/Switch";
import { StateSelect } from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { validateGSTIN } from "@/lib/gst";

interface InvoiceFormGSTProps {
    isGstEnabled: boolean;
    onGstToggle: (enabled: boolean) => void;
    businessState: string;
    onBusinessStateChange: (state: string) => void;
    businessGstin: string;
    onBusinessGstinChange: (gstin: string) => void;
    clientState: string;
    onClientStateChange: (state: string) => void;
    clientGstin?: string;
    onClientGstinChange?: (gstin: string) => void;
}

export default function InvoiceFormGST({
    isGstEnabled,
    onGstToggle,
    businessState,
    onBusinessStateChange,
    businessGstin,
    onBusinessGstinChange,
    clientState,
    onClientStateChange,
    clientGstin,
    onClientGstinChange,
}: InvoiceFormGSTProps) {
    const [gstinError, setGstinError] = React.useState("");

    const handleGstinChange = (value: string) => {
        onBusinessGstinChange(value);
        if (value) {
            const validation = validateGSTIN(value);
            setGstinError(validation.valid ? "" : validation.error || "");
        } else {
            setGstinError("");
        }
    };

    return (
        <div className="space-y-6 p-6 bg-secondary-50/50 rounded-xl border border-secondary-200">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-secondary-900">
                        GST Invoice
                    </h3>
                    <p className="text-sm text-secondary-600">
                        Enable to create GST-compliant invoices
                    </p>
                </div>
                <Switch
                    checked={isGstEnabled}
                    onChange={(e) => onGstToggle(e.target.checked)}
                />
            </div>

            {isGstEnabled && (
                <div className="space-y-4 pt-4 border-t border-secondary-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StateSelect
                            label="Your Business State"
                            value={businessState}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => onBusinessStateChange(e.target.value)}
                            required
                            placeholder="Select your state"
                        />
                        <Input
                            label="Your GSTIN"
                            value={businessGstin}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleGstinChange(e.target.value)}
                            placeholder="22AAAAA0000A1Z5"
                            maxLength={15}
                            error={gstinError}
                            helperText={!gstinError
                                ? "15-character GST Identification Number"
                                : undefined}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StateSelect
                            label="Client's Billing State"
                            value={clientState}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => onClientStateChange(e.target.value)}
                            required
                            placeholder="Select client's state"
                        />
                        {onClientGstinChange && (
                            <Input
                                label="Client's GSTIN (Optional)"
                                value={clientGstin || ""}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => onClientGstinChange(e.target.value)}
                                placeholder="22AAAAA0000A1Z5"
                                maxLength={15}
                                helperText="Optional for B2C transactions"
                            />
                        )}
                    </div>

                    {businessState && clientState && (
                        <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                            <p className="text-sm font-medium text-primary-900 flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {businessState === clientState
                                    ? (
                                        <>
                                            Intra-state supply: CGST + SGST will
                                            be applied
                                        </>
                                    )
                                    : (
                                        <>
                                            Inter-state supply: IGST will be
                                            applied
                                        </>
                                    )}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
