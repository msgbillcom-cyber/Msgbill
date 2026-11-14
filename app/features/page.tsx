import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bill & Invoice Features | WhatsApp Bill Maker | MsgBill",
    description: "Create bill and invoice on WhatsApp with GST, UPI payment links, and instant sharing. WhatsApp bill maker features for Indian businesses.",
    keywords: ["bill on whatsapp", "invoice on whatsapp", "whatsapp bill maker", "whatsapp invoice maker", "invoice features"],
    alternates: {
        canonical: "https://msgbill.com/features",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "MsgBill",
        url: "https://msgbill.com/features",
        title: "Bill & Invoice Features | WhatsApp Bill Maker | MsgBill",
        description: "Create bill and invoice on WhatsApp with GST, UPI payment links, and instant sharing. WhatsApp bill maker features for Indian businesses.",
        images: ["/logo-final.png"],
    },
};

const businessTools = [
    {
        title: "Inventory with automatic stock deduction",
        desc: "Save your products with price, unit, GST rate and stock quantity. When you add a saved product to an invoice, the price and GST rate fill in, and the sold quantity is deducted from stock when the invoice is saved.",
    },
    {
        title: "WhatsApp store link",
        desc: "Share one link to a simple online catalogue of your in-stock products. Customers add items to a cart and WhatsApp opens with the full order written out, ready to send to you, so you can confirm it and raise the invoice.",
    },
    {
        title: "Collection desk for overdue invoices",
        desc: "See every unpaid invoice that is past its due date, the total amount overdue and how many days late each one is. One tap prepares a WhatsApp reminder in a friendly, firm or urgent tone with the invoice link and your UPI ID.",
    },
    {
        title: "Expenses and profit & loss",
        desc: "Record business expenses alongside your invoices. The reports page shows total revenue, total expenses, net profit, profit margin and a month-by-month breakdown, so you know where the business stands without a spreadsheet.",
    },
];

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
                "Saved GSTIN & state",
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
                                        "Ready-made WhatsApp reminders for overdue invoices in a friendly, firm or urgent tone.",
                                },
                                {
                                    title: "PDF Downloads",
                                    desc:
                                        "Download any invoice as a PDF for your records, your accountant or a printout.",
                                },
                                {
                                    title: "Mobile Friendly",
                                    desc:
                                        "Access and create invoices on any device.",
                                },
                                {
                                    title: "Real Support",
                                    desc:
                                        "Help from the MsgBill team on WhatsApp (+91 9148868413) or at support@msgbill.com.",
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

                    {/* Business tools */}
                    <div className="mt-32 pt-24 border-t">
                        <h2 className="text-3xl font-bold text-center mb-6">
                            Tools for running the business, not just billing
                        </h2>
                        <p className="text-lg text-secondary-600 text-center max-w-3xl mx-auto mb-16">
                            Sending the invoice is only half the job. These tools help you keep stock right, take orders and actually collect the money.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {businessTools.map((tool) => (
                                <Card key={tool.title} className="bg-secondary-50 border-none">
                                    <CardContent className="pt-6">
                                        <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                                        <p className="text-secondary-600 text-sm leading-relaxed">{tool.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* How GST works in MsgBill */}
                    <div className="mt-32 pt-24 border-t max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold text-center">
                            How MsgBill handles GST
                        </h2>
                        <p className="text-secondary-600 leading-relaxed">
                            You enter your business state and GSTIN once. For each invoice, MsgBill compares your state with your client&apos;s state. If both are the same, the GST on each line is split equally into CGST and SGST; if they are different, the full rate is charged as IGST and the client&apos;s state is recorded as the place of supply. Each line item can carry its own HSN or SAC code and GST rate, so a bill that mixes goods and services stays correct.
                        </p>
                        <p className="text-secondary-600 leading-relaxed">
                            Not registered under GST yet? Turn GST off for the invoice and MsgBill produces a clean bill without any tax lines. MsgBill calculates and presents tax based on the details you enter; please confirm the right rate for your goods or services with your Chartered Accountant. Our{" "}
                            <Link href="/blog/gst-invoice-guide" className="text-primary-600 font-semibold hover:underline">
                                GST invoice format guide
                            </Link>{" "}
                            explains every mandatory field.
                        </p>
                        <p className="text-secondary-600 leading-relaxed">
                            The free plan includes 20 invoices and up to 5 saved clients. Pro is ₹499 for a full year and removes both limits.{" "}
                            <Link href="/pricing" className="text-primary-600 font-semibold hover:underline">
                                Compare plans
                            </Link>
                            .
                        </p>
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
                                Start Free – 20 Invoices Included
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
