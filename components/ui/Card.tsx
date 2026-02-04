import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, padding = "md", children, ...props }, ref) => {
        const paddingStyles = {
            none: "",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-lg border bg-card text-card-foreground shadow-sm",
                    "transition-all duration-200",
                    hover &&
                        "hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
                    paddingStyles[padding],
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    divider?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, divider = false, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex flex-col space-y-1.5",
                divider && "pb-4 border-b border-border",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    ),
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    >
        {children}
    </h3>
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    >
        {children}
    </p>
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props}>
        {children}
    </div>
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    >
        {children}
    </div>
));

CardFooter.displayName = "CardFooter";

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};

export default Card;
