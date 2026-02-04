"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Add import for Next.js Image component
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Avatar from "../ui/Avatar";

export interface SidebarLink {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string | number;
}

export interface SidebarSection {
    title?: string;
    links: SidebarLink[];
}

export interface SidebarProps {
    sections: SidebarSection[];
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    onSignOut?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    sections,
    user,
    collapsed = false,
    onCollapse,
    onSignOut,
}) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

    const handleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse?.(newState);
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white dark:bg-secondary-900 border-r border-border",
                "transition-all duration-300 ease-in-out z-40",
                "flex flex-col",
                isCollapsed ? "w-20" : "w-64",
            )}
        >
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-between px-4 border-b border-border">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 group w-full"
                >
                    <div
                        className={cn(
                            "relative transition-all duration-300",
                            isCollapsed ? "w-10 h-10" : "w-56 h-20",
                        )}
                    >
                        <Image
                            src="/logo-final.png"
                            alt="MsgBill"
                            fill
                            className={cn(
                                "object-contain transition-all",
                                isCollapsed ? "object-center" : "object-left",
                            )}
                            priority
                        />
                    </div>
                </Link>

                {!isCollapsed && (
                    <button
                        onClick={handleCollapse}
                        className="p-1.5 rounded-lg hover:bg-secondary-100 transition-colors"
                        aria-label="Collapse sidebar"
                    >
                        <svg
                            className="w-5 h-5 text-secondary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 overflow-x-hidden">
                {sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="mb-6">
                        {section.title && !isCollapsed && (
                            <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider px-3 mb-2">
                                {section.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                            "group relative",
                                            isActive
                                                ? "bg-primary-50 text-primary-600 font-medium"
                                                : "text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex-shrink-0 transition-transform group-hover:scale-110",
                                                isActive && "text-primary-600",
                                            )}
                                        >
                                            {link.icon}
                                        </span>
                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1 text-sm">
                                                    {link.label}
                                                </span>
                                                {link.badge && (
                                                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {!isCollapsed && (
                    <div className="mt-8 px-3">
                        <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-4 text-white shadow-glow-lg animate-scale-in">
                            <h4 className="text-sm font-bold mb-1">
                                Go Unlimited ✨
                            </h4>
                            <p className="text-[11px] opacity-80 mb-3 leading-tight">
                                Get unlimited invoices, clients, and premium
                                templates.
                            </p>
                            <Link href="/dashboard/settings/billing">
                                <button className="w-full py-2 bg-white text-primary-600 text-xs font-bold rounded-lg hover:bg-secondary-50 transition-colors shadow-sm">
                                    Upgrade to Pro
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* User Section */}
            {user && (
                <div className="p-4 border-t border-border space-y-2">
                    <Link
                        href="/dashboard/settings/profile"
                        className={cn(
                            "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-100 transition-colors cursor-pointer",
                            isCollapsed && "justify-center",
                        )}
                    >
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            fallback={user.name}
                            size="md"
                            status="online"
                        />
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-secondary-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-secondary-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        )}
                    </Link>

                    {/* Logout Button */}
                    {onSignOut && (
                        <button
                            onClick={() => {
                                console.log("🔴 LOGOUT BUTTON CLICKED!");
                                console.log(
                                    "onSignOut function exists:",
                                    typeof onSignOut,
                                );
                                onSignOut();
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 p-2 rounded-lg hover:bg-error-50 text-error-600 hover:text-error-700 transition-colors group",
                                isCollapsed && "justify-center",
                            )}
                            title="Sign Out"
                        >
                            <svg
                                className="w-5 h-5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            {!isCollapsed && (
                                <span className="text-sm font-medium">
                                    Sign Out
                                </span>
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Collapse Button (when collapsed) */}
            {isCollapsed && (
                <div className="p-3 border-t border-border">
                    <button
                        onClick={handleCollapse}
                        className="w-full p-2 rounded-lg hover:bg-secondary-100 transition-colors flex items-center justify-center"
                        aria-label="Expand sidebar"
                    >
                        <svg
                            className="w-5 h-5 text-secondary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
