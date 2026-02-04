import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?:
        | "default"
        | "primary"
        | "success"
        | "warning"
        | "error"
        | "secondary";
    size?: "sm" | "md" | "lg";
    dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            dot = false,
            children,
            ...props
        },
        ref,
    ) => {
        const variantStyles = {
            default: "bg-secondary-100 text-secondary-700 border-secondary-200",
            primary: "bg-primary-100 text-primary-700 border-primary-200",
            success: "bg-success-100 text-success-700 border-success-200",
            warning: "bg-warning-100 text-warning-700 border-warning-200",
            error: "bg-error-100 text-error-700 border-error-200",
            secondary:
                "bg-secondary-200 text-secondary-800 border-secondary-300",
        };

        const sizeStyles = {
            sm: "text-xs px-2 py-0.5 gap-1",
            md: "text-sm px-2.5 py-1 gap-1.5",
            lg: "text-base px-3 py-1.5 gap-2",
        };

        const dotStyles = {
            default: "bg-secondary-500",
            primary: "bg-primary-500",
            success: "bg-success-500",
            warning: "bg-warning-500",
            error: "bg-error-500",
            secondary: "bg-secondary-600",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full border font-medium",
                    "transition-colors duration-200",
                    variantStyles[variant],
                    sizeStyles[size],
                    className,
                )}
                {...props}
            >
                {dot && (
                    <span
                        className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            dotStyles[variant],
                        )}
                    />
                )}
                {children}
            </div>
        );
    },
);

Badge.displayName = "Badge";

export default Badge;
