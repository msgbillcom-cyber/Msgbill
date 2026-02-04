import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            fullWidth = false,
            resize = "vertical",
            disabled,
            id,
            rows = 4,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const textareaId = id || `textarea-${generatedId}`;

        const resizeClasses = {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        };

        return (
            <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
                    >
                        {label}
                        {props.required && (
                            <span className="text-error-500 ml-1">*</span>
                        )}
                    </label>
                )}

                <textarea
                    id={textareaId}
                    ref={ref}
                    rows={rows}
                    disabled={disabled}
                    className={cn(
                        // Base styles
                        "flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-sm",
                        "transition-colors duration-200",
                        "placeholder:text-secondary-400",
                        // Focus styles
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        // Disabled styles
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary-50",
                        // Error styles
                        error
                            ? "border-error-500 focus-visible:ring-error-500"
                            : "border-input focus-visible:ring-ring",
                        // Resize
                        resizeClasses[resize],
                        className,
                    )}
                    {...props}
                />

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

Textarea.displayName = "Textarea";

export default Textarea;
