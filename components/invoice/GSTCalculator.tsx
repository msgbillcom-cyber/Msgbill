// components/invoice/GSTCalculator.tsx
"use client";

import React, { useEffect } from "react";
import { calculateGST, GST_RATES } from "@/lib/gst";
import { formatCurrency } from "@/lib/utils";

interface GSTCalculatorProps {
    subtotal: number;
    taxRate?: number;
    businessState: string;
    clientState: string;
    onChange?: (calculation: {
        cgst: number;
        sgst: number;
        igst: number;
        totalTax: number;
        grandTotal: number;
    }) => void;
}

export default function GSTCalculator({
    subtotal,
    taxRate = GST_RATES.STANDARD,
    businessState,
    clientState,
    onChange,
}: GSTCalculatorProps) {
    const calculation = calculateGST(
        subtotal,
        taxRate,
        businessState,
        clientState,
    );

    useEffect(() => {
        onChange?.(calculation);
    }, [subtotal, taxRate, businessState, clientState]);

    return (
        <div className="space-y-3 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-secondary-700">
                    Subtotal:
                </span>
                <span className="text-secondary-900">
                    {formatCurrency(calculation.subtotal)}
                </span>
            </div>

            {calculation.isInterstate
                ? (
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-secondary-700">
                            IGST ({taxRate}%):
                            <span className="ml-1 text-xs text-secondary-500">
                                (Inter-state)
                            </span>
                        </span>
                        <span className="text-secondary-900">
                            {formatCurrency(calculation.igst)}
                        </span>
                    </div>
                )
                : (
                    <>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-secondary-700">
                                CGST ({taxRate / 2}%):
                            </span>
                            <span className="text-secondary-900">
                                {formatCurrency(calculation.cgst)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-secondary-700">
                                SGST ({taxRate / 2}%):
                            </span>
                            <span className="text-secondary-900">
                                {formatCurrency(calculation.sgst)}
                            </span>
                        </div>
                    </>
                )}

            <div className="pt-2 border-t border-secondary-300">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-secondary-900">
                        Grand Total:
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                        {formatCurrency(calculation.grandTotal)}
                    </span>
                </div>
            </div>

            <div className="pt-2 text-xs text-secondary-600">
                {calculation.isInterstate
                    ? (
                        <div className="flex items-start gap-1">
                            <svg
                                className="w-4 h-4 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                Inter-state supply: IGST applicable as business
                                and client are in different states
                            </span>
                        </div>
                    )
                    : (
                        <div className="flex items-start gap-1">
                            <svg
                                className="w-4 h-4 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                Intra-state supply: CGST + SGST applicable as
                                business and client are in the same state
                            </span>
                        </div>
                    )}
            </div>
        </div>
    );
}
