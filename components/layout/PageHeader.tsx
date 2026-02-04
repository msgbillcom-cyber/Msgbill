import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    action,
    breadcrumbs,
}) => {
    return (
        <div className="mb-8">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm text-secondary-600 mb-3">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <svg
                                    className="w-4 h-4 text-secondary-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}
                            {crumb.href
                                ? (
                                    <a
                                        href={crumb.href}
                                        className="hover:text-primary-600 transition-colors"
                                    >
                                        {crumb.label}
                                    </a>
                                )
                                : (
                                    <span className="text-secondary-900 font-medium">
                                        {crumb.label}
                                    </span>
                                )}
                        </React.Fragment>
                    ))}
                </nav>
            )}

            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-base text-secondary-600 dark:text-secondary-400 max-w-3xl">
                            {description}
                        </p>
                    )}
                </div>

                {action && <div className="flex-shrink-0">{action}</div>}
            </div>
        </div>
    );
};

export default PageHeader;
