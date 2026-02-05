// components/invoice/GSTCategorySelect.tsx
"use client";

import React from "react";
import { GST_CATEGORIES, getGSTRateForCategory } from "@/lib/gst";

interface GSTCategorySelectProps {
    value: string;
    onChange: (value: string) => void;
    onRateChange?: (rate: number) => void;
    label?: string;
    required?: boolean;
}

export default function GSTCategorySelect({
    value,
    onChange,
    onRateChange,
    label = "Item Category",
    required = false,
}: GSTCategorySelectProps) {
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        onChange(selectedCategory);

        // Notify parent of tax rate change
        if (onRateChange && selectedCategory) {
            const rate = getGSTRateForCategory(selectedCategory);
            onRateChange(rate);
        }
    };

    // Group categories by tax rate
    const categoriesByRate = Object.entries(GST_CATEGORIES).reduce(
        (acc, [key, category]: any) => {
            const rate = category.rate;
            if (!acc[rate]) {
                acc[rate] = [];
            }
            acc[rate].push({ key, ...category });
            return acc;
        },
        {} as Record<number, any[]>
    );

    const rateLabels: Record<number, string> = {
        0: "0% GST - Exempted & Essential",
        5: "5% GST - Reduced Rate",
        12: "12% GST - Reduced Services",
        18: "18% GST - Standard Rate",
        28: "28% GST - Luxury Items",
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                value={value}
                onChange={handleCategoryChange}
                required={required}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-secondary-900"
            >
                <option value="">Select a category...</option>

                {Object.entries(rateLabels)
                    .sort(([rateA], [rateB]) => Number(rateA) - Number(rateB))
                    .map(([rate, label]) => (
                        <optgroup key={rate} label={label}>
                            {categoriesByRate[Number(rate)]?.map((category) => (
                                <option
                                    key={category.key}
                                    value={category.name}
                                    title={category.description}
                                >
                                    {category.name} - {category.description}
                                </option>
                            ))}
                        </optgroup>
                    ))}
            </select>

            {value && (
                <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <div className="text-sm font-medium text-primary-900">
                        {value}
                    </div>
                    <div className="text-sm text-primary-700 mt-1">
                        GST Rate: <strong>{getGSTRateForCategory(value)}%</strong>
                    </div>
                    {Object.entries(GST_CATEGORIES).map(([key, category]: any) => {
                        if (category.name === value) {
                            return (
                                <div
                                    key={key}
                                    className="text-xs text-primary-600 mt-2"
                                >
                                    {category.description}
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}
