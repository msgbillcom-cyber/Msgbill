import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    size?: "sm" | "md" | "lg";
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, label, size = "md", id, ...props }, ref) => {
        const generatedId = React.useId();
        const switchId = id || `switch-${generatedId}`;

        const sizeStyles = {
            sm: {
                track: "w-8 h-4.5",
                thumb: "w-3.5 h-3.5",
                translate: "peer-checked:translate-x-3.5",
            },
            md: {
                track: "w-11 h-6",
                thumb: "w-5 h-5",
                translate: "peer-checked:translate-x-5",
            },
            lg: {
                track: "w-14 h-8",
                thumb: "w-6.5 h-6.5",
                translate: "peer-checked:translate-x-6",
            },
        };

        const config = sizeStyles[size];

        return (
            <label
                htmlFor={switchId}
                className={cn(
                    "flex items-center gap-3 cursor-pointer group select-none",
                    props.disabled && "cursor-not-allowed opacity-50",
                    className,
                )}
            >
                <div className="relative inline-flex items-center">
                    <input
                        type="checkbox"
                        id={switchId}
                        ref={ref}
                        className="peer sr-only"
                        {...props}
                    />
                    <div
                        className={cn(
                            "rounded-full transition-colors duration-200 bg-secondary-200 dark:bg-secondary-700",
                            "peer-checked:bg-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                            config.track,
                        )}
                    />
                    <div
                        className={cn(
                            "absolute left-0.5 top-0.5 bg-white dark:bg-white rounded-full transition-transform duration-200 shadow-sm",
                            config.thumb,
                            config.translate,
                        )}
                    />
                </div>
                {label && (
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                        {label}
                    </span>
                )}
            </label>
        );
    },
);

Switch.displayName = "Switch";

export default Switch;
