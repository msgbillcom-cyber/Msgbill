// components/ui/Select.tsx - Enhanced Select with State Options
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { INDIAN_STATES } from "@/lib/gst";

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    options?: Array<{ label: string; value: string }>;
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            fullWidth,
            options,
            placeholder,
            children,
            ...props
        },
        ref,
    ) => {
        const id = props.id || props.name;

        return (
            <div className={cn("space-y-1.5", fullWidth && "w-full")}>
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-secondary-700"
                    >
                        {label}
                        {props.required && (
                            <span className="text-error-500 ml-1">*</span>
                        )}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-lg border text-secondary-900",
                        "bg-white focus:outline-none focus:ring-2 transition-all",
                        "disabled:bg-secondary-100 disabled:cursor-not-allowed",
                        error
                            ? "border-error-500 focus:ring-error-200"
                            : "border-secondary-300 focus:border-primary-500 focus:ring-primary-200",
                        className,
                    )}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options
                        ? (
                            options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))
                        )
                        : children}
                </select>
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
                {helperText && !error && (
                    <p className="text-sm text-secondary-500">{helperText}</p>
                )}
            </div>
        );
    },
);

Select.displayName = "Select";

export default Select;

// State Dropdown Component
export interface StateSelectProps extends Omit<SelectProps, "children"> {
    placeholder?: string;
}

export const StateSelect = React.forwardRef<
    HTMLSelectElement,
    StateSelectProps
>(
    ({ placeholder = "Select State", ...props }, ref) => {
        return (
            <Select ref={ref} {...props}>
                <option value="">{placeholder}</option>
                {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </Select>
        );
    },
);

StateSelect.displayName = "StateSelect";
