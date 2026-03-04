import React from "react";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bill & Invoice Features | WhatsApp Bill Maker | MsgBill",
    description: "Create bill and invoice on WhatsApp with GST, UPI payment links, and instant sharing. WhatsApp bill maker features for Indian businesses.",
    keywords: ["bill on whatsapp", "invoice on whatsapp", "whatsapp bill maker", "whatsapp invoice maker", "invoice features"],
};

export default function FeaturesPage() {
    const detailedFeatures = [
        {
            title: "Dynamic Invoice Editor",
            description:
                "Easily add items, calculate taxes, and apply discounts in real-time. What you see is exactly what your client gets.",
            details: [
                "Real-time calculations",
                "Tax & Discount support",
                "Currency selection",
                "Auto-incrementing IDs",
            ],
            bg: "bg-primary-50",
        },
        {
            title: "Smart Client Management",
            description:
                "Directory for all your clients. Store billing addresses, contact details, and view payment history globally.",
            details: [
                "Client history tracking",
                "Billing address management",
                "Contact shortcuts",
                "Quick import/export",
            ],
            bg: "bg-secondary-50",
        },
        {
            title: "Instant UPI Payments",
            description:
                "Get paid instantly with dynamic UPI QR codes. Add your banking details and start collecting payments with zero fees.",
            details: [
                "Dynamic UPI QR generation",
                "Zero transaction fees",
                "Direct bank settlement",
                "Works with GPay, PhonePe, Paytm",
            ],
            bg: "bg-success-50",
        },
        {
            title: "Professional PDF Generation",
            description:
                "High-quality PDF invoices generated instantly. Choose from multiple professional templates.",
            details: [
                "Branded templates",
                "Instant PDF download",
                "Customized footers",
                "Mobile-optimized PDF views",
            ],
            bg: "bg-warning-50",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container-wide">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6">
                            Powerful features for{" "}
                            <span className="gradient-text">
                                every professional
                            </span>
                        </h1>
                        <p className="text-xl text-secondary-600">
                            Everything you need to handle billing like a pro,
                            without the complexity of traditional accounting
                            software.
                        </p>
                    </div>

                    <div className="space-y-20">
                        {detailedFeatures.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col md:flex-row gap-12 items-center ${
                                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                <div className="flex-1 space-y-6">
                                    <h2 className="text-3xl font-bold text-secondary-900">
                                        {feature.title}
                                    </h2>
                                    <p className="text-lg text-secondary-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {feature.details.map((detail, dIdx) => (
                                            <li
                                                key={dIdx}
                                                className="flex items-center gap-2 text-sm font-medium text-secondary-700"
                                            >
                                                <span className="text-primary-600">
                                                    ✓
                                                </span>{" "}
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div
                                    className={`flex-1 w-full aspect-square rounded-3xl ${feature.bg} flex items-center justify-center p-12`}
                                >
                                    <div className="w-full h-full bg-white/40 rounded-2xl border border-white/60 shadow-lg backdrop-blur-md flex items-center justify-center">
                                        <span className="text-6xl">
                                            {idx === 0
                                                ? "📝"
                                                : idx === 1
                                                ? "👤"
                                                : idx === 2
                                                ? "💳"
                                                : "📄"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feature Grid Section */}
                    <div className="mt-32 pt-24 border-t">
                        <h2 className="text-3xl font-bold text-center mb-16 underline decoration-primary-300 decoration-4">
                            More than just invoices
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Tax Compliance",
                                    desc:
                                        "Pre-defined GST/VAT settings for Indian compliance.",
                                },
                                {
                                    title: "Payment Reminders",
                                    desc:
                                        "Coming soon: Automated follow-ups for unpaid invoices.",
                                },
                                {
                                    title: "Data Export",
                                    desc:
                                        "Download your data in CSV for bookkeeping.",
                                },
                                {
                                    title: "Mobile Friendly",
                                    desc:
                                        "Access and create invoices on any device.",
                                },
                                {
                                    title: "Instant Support",
                                    desc:
                                        "Help whenever you need it via chat or email.",
                                },
                                {
                                    title: "Security & Retention",
                                    desc:
                                        "Your data is encrypted, backed up daily, and invoices are kept safely for up to 1 year (plan-based).",
                                },
                            ].map((item, i) => (
                                <Card
                                    key={i}
                                    className="bg-secondary-50 border-none"
                                >
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-secondary-600 text-sm">
                                            {item.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="mt-32 text-center bg-primary-50 rounded-3xl py-20 px-6">
                        <h2 className="text-3xl font-bold mb-6">
                            Experience the power of MsgBill
                        </h2>
                        <Link href="/auth/signup">
                            <Button
                                size="lg"
                                className="shadow-lg hover:scale-105 transition-transform"
                            >
                                Start Free Trial – Create 10 Invoices
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
