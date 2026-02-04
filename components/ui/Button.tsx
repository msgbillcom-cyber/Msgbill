import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            children,
            ...props
        },
        ref,
    ) => {
        const variantStyles = {
            primary:
                "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md disabled:bg-primary-300",
            secondary:
                "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 disabled:bg-secondary-50 disabled:text-secondary-400",
            outline:
                "border-2 border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 disabled:border-secondary-200 disabled:text-secondary-400",
            ghost:
                "bg-transparent text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 disabled:text-secondary-400",
            destructive:
                "bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-sm hover:shadow-md disabled:bg-error-300",
        };

        const sizeStyles = {
            sm: "h-8 px-3 text-sm gap-1.5",
            md: "h-10 px-4 text-base gap-2",
            lg: "h-12 px-6 text-lg gap-2.5",
            icon: "h-10 w-10 p-0",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center rounded-lg font-medium",
                    "transition-all duration-200 ease-in-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
                    // Variant styles
                    variantStyles[variant],
                    // Size styles
                    sizeStyles[size],
                    // Full width
                    fullWidth && "w-full",
                    className,
                )}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && (
                    <span className="inline-flex">{leftIcon}</span>
                )}
                {children}
                {!isLoading && rightIcon && (
                    <span className="inline-flex">{rightIcon}</span>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
