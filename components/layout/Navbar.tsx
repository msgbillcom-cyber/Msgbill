"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";

export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarProps {
    logo?: React.ReactNode;
    links?: NavLink[];
    ctaText?: string;
    ctaHref?: string;
}

const Navbar: React.FC<NavbarProps> = ({
    logo,
    links = [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
    ],
    ctaText = "Get Started",
    ctaHref = "/auth/signup",
}) => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        let ticking = false;

        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl shadow-md"
                    : "bg-transparent",
            )}
        >
            <div className="container-wide">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center">
                            <Image
                                src="/logo-final.png"
                                alt="MsgBill"
                                width={400}
                                height={100}
                                className="w-auto h-16 md:h-20 object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600",
                                    pathname === link.href
                                        ? "text-primary-600"
                                        : "text-secondary-700 dark:text-secondary-300",
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/auth/login">
                            <Button variant="ghost" size="md">
                                Sign In
                            </Button>
                        </Link>
                        <Link href={ctaHref}>
                            <Button variant="primary" size="md">
                                {ctaText}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen
                                ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                )
                                : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-20 left-0 right-0 bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-border animate-slide-in-from-top">
                        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "text-base font-medium px-4 py-3 rounded-lg transition-colors",
                                        pathname === link.href
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-secondary-700 hover:bg-secondary-100",
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-border">
                                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" size="lg" fullWidth>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={ctaHref} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" size="lg" fullWidth>
                                        {ctaText}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
