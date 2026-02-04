import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "rectangular" | "circular" | "text";
    width?: string | number;
    height?: string | number;
}

const Skeleton = ({
    className,
    variant = "rectangular",
    width,
    height,
    style,
    ...props
}: SkeletonProps) => {
    return (
        <div
            className={cn(
                "animate-pulse bg-secondary-200 dark:bg-secondary-800",
                variant === "circular" && "rounded-full",
                variant === "text" && "h-4 w-3/4 rounded-sm",
                variant === "rectangular" && "rounded-md",
                className,
            )}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
                ...style,
            }}
            {...props}
        />
    );
};

export default Skeleton;
