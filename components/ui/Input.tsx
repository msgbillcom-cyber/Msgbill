import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            id,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const inputId = id || `input-${generatedId}`;

        return (
            <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
                    >
                        {label}
                        {props.required && (
                            <span className="text-error-500 ml-1">*</span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        id={inputId}
                        ref={ref}
                        type={type}
                        disabled={disabled}
                        className={cn(
                            // Base styles
                            "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm",
                            "transition-colors duration-200",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "placeholder:text-secondary-400",
                            // Focus styles
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            // Disabled styles
                            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary-50",
                            // Icon padding
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            // Error styles
                            error
                                ? "border-error-500 focus-visible:ring-error-500"
                                : "border-input focus-visible:ring-ring",
                            className,
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {(error || helperText) && (
                    <p
                        className={cn(
                            "text-xs",
                            error ? "text-error-500" : "text-secondary-500",
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
