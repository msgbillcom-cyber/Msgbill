import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    status?: "online" | "offline" | "away" | "busy";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, size = "md", status, ...props }, ref) => {
        const [imageError, setImageError] = React.useState(false);

        const sizeStyles = {
            xs: "h-6 w-6 text-xs",
            sm: "h-8 w-8 text-sm",
            md: "h-10 w-10 text-base",
            lg: "h-12 w-12 text-lg",
            xl: "h-16 w-16 text-xl",
            "2xl": "h-20 w-20 text-2xl",
        };

        const statusStyles = {
            online: "bg-success-500",
            offline: "bg-secondary-400",
            away: "bg-warning-500",
            busy: "bg-error-500",
        };

        const statusSizes = {
            xs: "h-1.5 w-1.5",
            sm: "h-2 w-2",
            md: "h-2.5 w-2.5",
            lg: "h-3 w-3",
            xl: "h-3.5 w-3.5",
            "2xl": "h-4 w-4",
        };

        const getFallbackText = () => {
            if (fallback) return fallback;
            if (alt) {
                return alt
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
            }
            return "?";
        };

        return (
            <div
                ref={ref}
                className={cn("relative inline-block", className)}
                {...props}
            >
                <div
                    className={cn(
                        "relative flex items-center justify-center rounded-full overflow-hidden",
                        "bg-gradient-to-br from-primary-400 to-primary-600",
                        "text-white font-semibold",
                        sizeStyles[size],
                    )}
                >
                    {src && !imageError
                        ? (
                            <img
                                src={src}
                                alt={alt || "Avatar"}
                                className="h-full w-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        )
                        : <span>{getFallbackText()}</span>}
                </div>

                {status && (
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 block rounded-full border-2 border-white",
                            statusStyles[status],
                            statusSizes[size],
                        )}
                        aria-label={`Status: ${status}`}
                    />
                )}
            </div>
        );
    },
);

Avatar.displayName = "Avatar";

export default Avatar;
