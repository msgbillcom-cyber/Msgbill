import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { Metadata } from "next"; // Added Metadata import
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title:
        "MsgBill - WhatsApp Invoicing for Indian Businesses | GST Invoice Software",
    description:
        "Create GST-compliant invoices and share them on WhatsApp in 2 clicks. Generate payment links, track payments, and get paid 10x faster. Start for free. Made for Indian homepreneurs and small businesses.",
    keywords: [
        "invoice software India",
        "WhatsApp invoice",
        "GST invoice generator",
        "free invoice software",
        "payment links India",
        "UPI invoice",
        "small business invoice",
        "homepreneur invoice",
        "invoice on whatsapp",
        "Indian invoice software",
        "GST billing software",
        "online invoice maker",
        "message invoice",
    ],
    openGraph: {
        title: "MsgBill - Invoice on WhatsApp, Get Paid Faster",
        description:
            "Invoicing software for Indian businesses. Share invoices on WhatsApp, collect payments via UPI, auto-calculate GST.",
        type: "website",
        url: "https://msgbill.com",
        images: ["/logo-final.png"],
    },
    alternates: {
        canonical: "https://msgbill.com",
    },
};

export default function Home() { // Changed function name from HomePage to Home
    const features = [
        {
            title: "WhatsApp Store",
            description:
                "Create a product catalog link and let customers order via WhatsApp.",
            icon: "🛍️",
        },
        {
            title: "Payment Collections",
            description:
                "Send automated friendly reminders to recover overdue payments faster.",
            icon: "🔔",
        },
        {
            title: "WhatsApp Invoice Sharing",
            description:
                "Share invoices directly to your client's WhatsApp in seconds.",
            icon: "💬",
        },
        {
            title: "WhatsApp Store Link",
            description:
                "Your own mini e-commerce site. Customers order, you get the message.",
            icon: "🛍️",
        },
        {
            title: "Payment Collection Agent",
            description:
                "Automated WhatsApp reminders (Friendly, Firm, Urgent) to recover dues.",
            icon: "🤖",
        },
        {
            title: "Inventory Management",
            description:
                "Track stock, manage products, and auto-fill invoices instantly.",
            icon: "📦",
        },
        {
            title: "2-Minute Invoicing",
            description:
                "Create, share via WhatsApp, and get paid — all in under 2 minutes.",
            icon: "⚡",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "MsgBill",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web, Android, iOS",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR",
                    "priceValidUntil": "2026-12-31",
                    "availability": "https://schema.org/InStock"
                },
                "description": "WhatsApp Invoicing Software for Indian Businesses. Create GST invoices, manage inventory, and collect payments.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "1250"
                },
                "featureList": [
                    "WhatsApp Invoicing",
                    "GST Billing",
                    "Inventory Management",
                    "WhatsApp Store",
                    "Payment Collections",
                    "UPI Payment Links"
                ]
            },
            {
                "@type": "Organization",
                "name": "MsgBill",
                "url": "https://msgbill.com",
                "logo": "https://msgbill.com/logo-final.png",
                "sameAs": [
                    "https://twitter.com/msgbill",
                    "https://facebook.com/msgbill",
                    "https://instagram.com/msgbill"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9876543210",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": "en"
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-primary-50/30 via-white to-white">
                    <div className="container-wide relative z-10">
                        <div className="text-center max-w-4xl mx-auto space-y-8">
                            <div className="animate-bounce-in">
                                <Badge
                                    variant="primary"
                                    className="glass-card px-6 py-2 text-sm font-semibold hover-scale inline-flex items-center gap-2"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75">
                                        </span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500">
                                        </span>
                                    </span>
                                    🚀 Start for Free - Upgrade Anytime
                                </Badge>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-secondary-900 animate-slide-in-from-bottom leading-tight">
                                <span
                                    className="neon-blue"
                                    style={{
                                        textShadow:
                                            "0 0 40px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    WhatsApp
                                </span>{" "}
                                Your Invoices, <br />
                                Get Paid{" "}
                                <span className="gradient-text-purple">
                                    Faster
                                </span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed animate-slide-in-from-bottom animation-delay-200">
                                For homepreneurs, small traders, and service
                                businesses.
                                <br />
                                Create GST invoices, share on WhatsApp, collect
                                via UPI — all in 2 minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-scale-in animation-delay-200">
                                <Link href="/auth/signup">
                                    <Button
                                        size="lg"
                                        className="shadow-glow bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857]"
                                        leftIcon={<span>🚀</span>}
                                    >
                                        Start for Free - No Credit Card
                                    </Button>
                                </Link>
                                <Link href="#screenshots">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        leftIcon={<span>📱</span>}
                                    >
                                        View Screenshots
                                    </Button>
                                </Link>
                                <Link href="/how-it-works">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="px-8 py-4 glass-card hover-lift border-2 border-primary-200 hover:border-primary-400 transition-smooth"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-2xl">▶</span>
                                            See How it Works
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-sm text-secondary-500 animate-fade-in animation-delay-500">
                                No credit card required • Free 20 invoices/month
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Animated Background */}
                    <div className="absolute inset-0 -z-0 pointer-events-none">
                        {/* Floating gradient orbs */}
                        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-300 to-primary-200 rounded-full blur-3xl opacity-40 animate-float" />
                        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 animate-float-slow animation-delay-1000" />
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-3xl opacity-20 animate-float animation-delay-500" />

                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]">
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-12 bg-secondary-50 border-y border-border">
                    <div className="container-wide">
                        <p className="text-center text-sm font-semibold text-secondary-500 uppercase tracking-widest mb-8">
                            Trusted by 1,000+ Indian entrepreneurs
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold">
                                HOME BAKERS
                            </span>
                            <span className="text-xl font-bold">
                                FREELANCERS
                            </span>
                            <span className="text-xl font-bold">
                                BOUTIQUE OWNERS
                            </span>
                            <span className="text-xl font-bold">
                                CONSULTANTS
                            </span>
                            <span className="text-xl font-bold">
                                WHOLESALERS
                            </span>
                        </div>
                    </div>
                </section>

                {/* Features Preview */}
                <section id="features" className="py-24 lg:py-32 relative">
                    <div className="container-wide">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-in-from-bottom">
                            <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6">
                                Everything you need to get paid
                                <span className="gradient-text-purple">
                                    faster
                                </span>
                            </h2>
                            <p className="text-lg lg:text-xl text-secondary-600 leading-relaxed">
                                Powerful features designed to simplify your
                                workflow and keep your finances in check.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group animate-scale-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="glass-card rounded-2xl p-8 h-full hover-lift hover-glow transition-smooth">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white text-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-premium">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-secondary-900 group-hover:text-primary-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-secondary-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-100/20 rounded-full blur-3xl pointer-events-none">
                    </div>
                </section>

                {/* Product Screenshots Section */}
                <section
                    id="how-it-works"
                    className="py-24 lg:py-32 bg-secondary-900 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center mb-20">
                            <Badge variant="primary" size="lg" className="mb-6 animate-fade-in">
                                <span className="mr-2">🚀</span> Simple Workflow
                            </Badge>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                From Login to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Paid</span> in Minutes
                            </h2>
                            <p className="text-xl text-secondary-400">
                                Experience the fastest invoicing flow designed for modern businesses.
                            </p>
                        </div>

                        <div className="space-y-24">
                            {/* Step 1: Login & Onboarding */}
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                                <div className="flex-1 space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 text-primary-400 text-3xl font-black border border-primary-500/30">
                                        1
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Login & Onboard</h3>
                                    <p className="text-lg text-secondary-400 leading-relaxed">
                                        Securely sign in and set up your business profile in seconds. Add your logo, signature, and bank details once to automate everything later.
                                    </p>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="glass-card p-4 rounded-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-primary-500/20">
                                        <img
                                            src="/artifacts/login_page_premium_1769528183310.png"
                                            alt="Login Screen"
                                            className="rounded-xl w-full shadow-lg border border-secondary-700/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Create Clients */}
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                                <div className="flex-1 space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-500/20 text-accent-400 text-3xl font-black border border-accent-500/30">
                                        2
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Add Clients</h3>
                                    <p className="text-lg text-secondary-400 leading-relaxed">
                                        Easily manage your client database. Save GSTIN, billing addresses, and contact info to auto-fill invoices instantly.
                                    </p>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="glass-card p-4 rounded-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-accent-500/20">
                                        <div className="aspect-video bg-secondary-800 rounded-xl flex items-center justify-center border border-secondary-700 text-secondary-500">
                                            <span className="text-lg">Add Client Screenshot Placeholder</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Generate Invoice */}
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                                <div className="flex-1 space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-500/20 text-success-400 text-3xl font-black border border-success-500/30">
                                        3
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Generate Invoice</h3>
                                    <p className="text-lg text-secondary-400 leading-relaxed">
                                        Create professional GST/Non-GST invoices. Our auto-calculator handles taxes, discounts, and totals with zero errors.
                                    </p>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="glass-card p-4 rounded-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-success-500/20">
                                        <img
                                            src="/artifacts/gst_auto_calculator_1769540067994.png"
                                            alt="Invoice Generation"
                                            className="rounded-xl w-full shadow-lg border border-secondary-700/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 4: Share & Pay */}
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                                <div className="flex-1 space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-warning-500/20 text-warning-400 text-3xl font-black border border-warning-500/30">
                                        4
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Share & Get Paid</h3>
                                    <p className="text-lg text-secondary-400 leading-relaxed">
                                        Send invoices directly via WhatsApp or Email. Include payment links and QR codes to get paid faster.
                                    </p>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="glass-card p-4 rounded-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-warning-500/20">
                                        <img
                                            src="/artifacts/whatsapp_invoice_share_1769540045907.png"
                                            alt="WhatsApp Share"
                                            className="rounded-xl w-full shadow-lg border border-secondary-700/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Preview */}
                <section
                    id="pricing"
                    className="py-24 lg:py-32 bg-gradient-to-b from-white via-secondary-50/50 to-white relative overflow-hidden"
                >
                    <div className="container-wide relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-in-from-bottom">
                            <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6">
                                Simple,
                                <span className="gradient-text-purple">
                                    transparent
                                </span>{" "}
                                pricing
                            </h2>
                            <p className="text-lg lg:text-xl text-secondary-600">
                                Choose the plan that fits your business stage.
                                No hidden fees.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Free Plan */}
                            <div className="flex flex-col border-2 border-secondary-100 rounded-3xl p-8 hover:border-secondary-300 transition-colors bg-white/50 backdrop-blur-sm">
                                <div className="text-center border-b border-secondary-100 pb-8">
                                    <h3 className="text-2xl font-bold text-secondary-900">
                                        Starter
                                    </h3>
                                    <div className="mt-6">
                                        <span className="text-4xl font-black text-secondary-900">
                                            Free
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-secondary-500 font-medium">
                                        Perfect for trying out MsgBill.
                                    </p>
                                </div>
                                <div className="flex-1 pt-8">
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                            <span className="text-primary-600 font-black">
                                                ✓
                                            </span>
                                            20 Free Invoices / mo
                                        </li>
                                        <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                            <span className="text-primary-600 font-black">
                                                ✓
                                            </span>
                                            5 Clients Max
                                        </li>
                                        <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                            <span className="text-primary-600 font-black">
                                                ✓
                                            </span>
                                            WhatsApp Sharing
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-8">
                                    <Link
                                        href="/auth/signup"
                                        className="w-full"
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            fullWidth
                                        >
                                            Start Free
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Pro Plan */}
                            <div className="relative group animate-scale-in">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity">
                                </div>
                                <div className="relative glass-card rounded-3xl p-8 hover-lift transition-smooth h-full flex flex-col border-2 border-primary-500 shadow-2xl">
                                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                                        <Badge
                                            variant="primary"
                                            className="py-2 px-6 text-sm shadow-lg"
                                        >
                                            Most Popular
                                        </Badge>
                                    </div>
                                    <div className="text-center border-b border-primary-100 pb-8">
                                        <h3 className="text-2xl font-bold text-primary-900">
                                            Pro Unlimited
                                        </h3>
                                        <div className="mt-6">
                                            <span className="text-5xl font-black text-primary-600">
                                                ₹499
                                            </span>
                                            <span className="text-secondary-500 font-medium ml-2">
                                                / month
                                            </span>
                                        </div>
                                        <p className="mt-4 text-sm text-secondary-500 font-medium">
                                            For serious businesses.
                                        </p>
                                    </div>
                                    <div className="flex-1 pt-8">
                                        <ul className="space-y-4 text-secondary-700">
                                            <li className="flex items-center gap-3">
                                                <span className="text-success-500 text-lg">
                                                    ✓
                                                </span>
                                                <span className="font-bold">
                                                    Unlimited Invoices
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="text-success-500 text-lg">
                                                    ✓
                                                </span>
                                                <span className="font-bold">
                                                    WhatsApp Store Link
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="text-success-500 text-lg">
                                                    ✓
                                                </span>
                                                <span className="font-bold">
                                                    Payment Recovery Agent
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="text-success-500 text-lg">
                                                    ✓
                                                </span>
                                                <span>Premium Templates</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pt-8">
                                        <Link
                                            href="/auth/signup"
                                            className="w-full block"
                                        >
                                            <Button
                                                variant="primary"
                                                fullWidth
                                                className="hover-lift shadow-glow-lg text-lg py-6"
                                            >
                                                Get Unlimited Access
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-primary-200/20 rounded-full blur-3xl pointer-events-none animate-float-slow">
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 lg:py-32 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-animated-gradient text-white overflow-hidden relative">
                    <div className="container-narrow text-center relative z-10">
                        <div className="animate-scale-in">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                                Ready to simplify
                                <br />
                                your invoicing?
                            </h2>
                            <p className="text-xl lg:text-2xl text-primary-100 mb-12 leading-relaxed">
                                Join beta users building their business with
                                MsgBill.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/auth/signup">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="px-12 py-4 text-lg font-bold hover-scale ripple text-primary-900 shadow-premium group"
                                    >
                                        <span className="flex items-center gap-2">
                                            Start Free Trial - No Credit Card
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                →
                                            </span>
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                            <p className="mt-8 text-sm text-primary-200">
                                No credit card required • Cancel anytime • 20
                                Free Invoices
                            </p>
                        </div>
                    </div>

                    {/* Floating gradient orbs */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-slow" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float animation-delay-500" />
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
