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

    const steps = [
        {
            number: "01",
            title: "Create Invoice",
            description: "Add client details and line items in under a minute.",
        },
        {
            number: "02",
            title: "Share on WhatsApp",
            description:
                "Instantly send invoice to client's WhatsApp with payment link.",
        },
        {
            number: "03",
            title: "Get Paid Fast",
            description:
                "Client scans QR code and pays instantly — money in your account.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "MsgBill",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
        },
        "description": "WhatsApp Invoicing Software for Indian Businesses",
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
                    id="screenshots"
                    className="py-24 lg:py-32 bg-secondary-900"
                >
                    <div className="container-wide">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                                See MsgBill in{" "}
                                <span className="gradient-text-green">
                                    Action
                                </span>
                            </h2>
                            <p className="text-lg lg:text-xl text-secondary-400">
                                Real screenshots from the MsgBill app. No
                                mockups, no fake interfaces.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Login Page Screenshot */}
                            <div className="glass-card p-6 rounded-2xl hover-lift transition-smooth">
                                <div className="mb-4 p-4 bg-primary-500/10 rounded-xl">
                                    <img
                                        src="/artifacts/login_page_premium_1769528183310.png"
                                        alt="Secure Login & Dashboard"
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    🔐 Secure Login
                                </h3>
                                <p className="text-secondary-400">
                                    Secure and seamless access to your complete
                                    business dashboard and analytics
                                </p>
                            </div>

                            {/* GST Calculator Screenshot */}
                            <div className="glass-card p-6 rounded-2xl hover-lift transition-smooth">
                                <div className="mb-4 p-4 bg-primary-500/10 rounded-xl">
                                    <img
                                        src="/artifacts/gst_auto_calculator_1769540067994.png"
                                        alt="Automatic GST Calculation"
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    📋 Smart GST Calculator
                                </h3>
                                <p className="text-secondary-400">
                                    Auto-calculates CGST/SGST or IGST based on
                                    state selection
                                </p>
                            </div>

                            {/* Payment Link Screenshot */}
                            <div className="glass-card p-6 rounded-2xl hover-lift transition-smooth">
                                <div className="mb-4 p-4 bg-success-500/10 rounded-xl overflow-hidden relative group">
                                    {/* CSS Mockup of UPI Payment Interface */}
                                    <div className="bg-white rounded-lg shadow-md border border-secondary-100 p-4 w-full aspect-[4/3] flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-success-500">
                                        </div>
                                        <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">🛍️</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] text-secondary-400 uppercase font-bold">
                                                Total Amount
                                            </p>
                                            <p className="text-xl font-black text-secondary-900">
                                                ₹11,800
                                            </p>
                                        </div>
                                        <div className="w-24 h-24 bg-white border-2 border-dashed border-secondary-200 rounded-lg flex items-center justify-center relative">
                                            {/* QR Pattern */}
                                            <div className="w-20 h-20 bg-secondary-900 opacity-10 pattern-dots">
                                            </div>
                                            <span className="absolute text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm border border-secondary-100">
                                                UPI QR
                                            </span>
                                        </div>
                                        <div className="w-full bg-success-500 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            Pay via UPI
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    💳 Instant Payment Links
                                </h3>
                                <p className="text-secondary-400">
                                    Generate UPI payment links in seconds, share
                                    and get paid
                                </p>
                            </div>
                        </div>

                        {/* Trust Signal */}
                        <div className="mt-16 text-center">
                            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full">
                                <span className="text-2xl">🔒</span>
                                <p className="text-sm text-secondary-400">
                                    <span className="font-bold text-white">
                                        100% Made for India
                                    </span>{" "}
                                    • Data stored securely in Indian servers •
                                    Verified Security
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section
                    id="how-it-works"
                    className="py-24 lg:py-32 bg-secondary-900 text-white"
                >
                    <div className="container-wide">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                    Simple process, <br />
                                    <span className="text-primary-400">
                                        significant results
                                    </span>
                                </h2>
                                <p className="text-lg text-secondary-400 mb-12">
                                    MsgBill is built to be intuitive. No complex
                                    manuals or hours of training required.
                                </p>
                                <div className="space-y-8">
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-6">
                                            <span className="text-2xl font-black text-primary-500/30">
                                                {step.number}
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-2">
                                                    {step.title}
                                                </h4>
                                                <p className="text-secondary-400">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-video bg-secondary-800 rounded-2xl overflow-hidden shadow-2xl border border-secondary-700 flex items-center justify-center">
                                    <span className="text-primary-400 text-lg font-mono">
                                        Invoice Preview Animation Area
                                    </span>
                                </div>
                                {/* Decorative dots */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl" />
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl" />
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
