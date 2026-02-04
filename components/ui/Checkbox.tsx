import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const generatedId = React.useId();
        const checkboxId = id || `checkbox-${generatedId}`;

        return (
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "flex items-center gap-2 cursor-pointer group",
                        props.disabled && "cursor-not-allowed opacity-50",
                        className,
                    )}
                >
                    <div className="relative flex items-center justify-center">
                        <input
                            type="checkbox"
                            id={checkboxId}
                            ref={ref}
                            className="peer sr-only"
                            {...props}
                        />
                        <div
                            className={cn(
                                "w-5 h-5 border-2 rounded transition-all duration-200",
                                "border-secondary-300 bg-white dark:bg-secondary-800",
                                "peer-checked:bg-primary-600 peer-checked:border-primary-600",
                                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                                error &&
                                    "border-error-500 peer-checked:bg-error-500 peer-checked:border-error-500",
                            )}
                        />
                        <svg
                            className="absolute w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    {label && (
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300 group-hover:text-secondary-900 transition-colors">
                            {label}
                        </span>
                    )}
                </label>
                {error && <p className="text-xs text-error-500">{error}</p>}
            </div>
        );
    },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
