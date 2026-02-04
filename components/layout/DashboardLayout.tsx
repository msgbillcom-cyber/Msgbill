"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Sidebar, { SidebarSection } from "./Sidebar";

export interface DashboardLayoutProps {
    children: React.ReactNode;
    sections: SidebarSection[];
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    onSignOut?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    sections,
    user,
    onSignOut,
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-white dark:bg-secondary-800 border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
                <div className="flex items-center gap-2 relative w-48 h-16">
                    <Image
                        src="/logo-final.png"
                        alt="MsgBill"
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 -mr-2 text-secondary-600"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </header>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform lg:relative lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <Sidebar
                    sections={sections}
                    user={user}
                    collapsed={sidebarCollapsed}
                    onCollapse={setSidebarCollapsed}
                    onSignOut={onSignOut}
                />
            </div>

            <main
                className={cn(
                    "flex-1 transition-all duration-300",
                    !sidebarCollapsed && "lg:ml-64",
                    sidebarCollapsed && "lg:ml-20",
                )}
            >
                <div className="min-h-screen p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
