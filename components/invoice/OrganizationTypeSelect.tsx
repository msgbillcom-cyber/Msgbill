// components/invoice/OrganizationTypeSelect.tsx
"use client";

import React from "react";
import { ORGANIZATION_TYPES } from "@/lib/gst";

interface OrganizationTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
    showDescription?: boolean;
}

export default function OrganizationTypeSelect({
    value,
    onChange,
    label = "Organization Type",
    required = false,
    showDescription = true,
}: OrganizationTypeSelectProps) {
    const selectedType = Object.entries(ORGANIZATION_TYPES).find(
        ([key, type]) => key === value
    );

    const getGSTStatusColor = (status: string) => {
        switch (status) {
            case "exempt":
                return "bg-green-100 text-green-800 border-green-300";
            case "applicable":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "conditional":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getGSTStatusLabel = (status: string) => {
        switch (status) {
            case "exempt":
                return "🟢 GST Exempt";
            case "applicable":
                return "🔵 GST Applicable";
            case "conditional":
                return "🟡 GST Conditional";
            default:
                return "GST Status Unknown";
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full px-3 py-2 bg-white border rounded-lg border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-900"
            >
                <option value="">Select organization type...</option>
                {Object.entries(ORGANIZATION_TYPES).map(([key, type]: any) => (
                    <option key={key} value={key}>
                        {type.name} - {getGSTStatusLabel(type.gstRate)}
                    </option>
                ))}
            </select>

            {value && selectedType && showDescription && (
                <div
                    className={`mt-2 p-3 border rounded-lg ${getGSTStatusColor(
                        selectedType[1].gstRate
                    )}`}
                >
                    <div className="font-medium">{selectedType[1].name}</div>
                    <div className="mt-1 text-sm">
                        {selectedType[1].gstRate === "exempt" && (
                            <>
                                <p>✓ GST exemption applicable</p>
                                <p className="mt-1 text-xs">
                                    No GST will be charged on invoices. Ensure you have
                                    valid GST exemption documentation.
                                </p>
                            </>
                        )}
                        {selectedType[1].gstRate === "applicable" && (
                            <>
                                <p>✓ GST is mandatory</p>
                                <p className="mt-1 text-xs">
                                    Apply appropriate GST rates (0%, 5%, 12%, 18%, 28%)
                                    based on item category.
                                </p>
                            </>
                        )}
                        {selectedType[1].gstRate === "conditional" && (
                            <>
                                <p>⚠ GST is conditional</p>
                                <p className="mt-1 text-xs">
                                    GST applicability depends on turnover. File GST
                                    returns if turnover exceeds ₹40 lakh.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
