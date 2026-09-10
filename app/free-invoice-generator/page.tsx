import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FreeInvoiceGenerator from "@/components/generator/FreeInvoiceGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Invoice Generator India | Online GST Bill Maker (No Login) | MsgBill",
    description:
        "Create free GST invoices & bills online in 10 seconds without logging in. Download professional PDF or share directly on WhatsApp with UPI payment details. 100% free tool for Indian businesses, freelancers & shops.",
    keywords: [
        "free invoice generator india",
        "online bill maker no login",
        "free gst invoice generator",
        "whatsapp bill maker",
        "cash memo maker free",
        "receipt generator online",
        "freelancer bill maker india",
        "free invoicing tool",
    ],
    openGraph: {
        title: "Free GST Invoice Generator (No Sign Up Needed) | MsgBill",
        description: "Create and download GST-compliant invoices in seconds. Share on WhatsApp with UPI link.",
        type: "website",
        url: "https://msgbill.com/free-invoice-generator",
    },
    alternates: {
        canonical: "https://msgbill.com/free-invoice-generator",
    },
};

export default function FreeInvoiceGeneratorPage() {
    const webAppJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "MsgBill Free Invoice Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android, iOS",
        url: "https://msgbill.com/free-invoice-generator",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
        },
        description:
            "Free instant GST invoice and bill maker for Indian businesses. Download PDF or send on WhatsApp. No login required.",
        areaServed: { "@type": "Country", name: "India" },
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Is this invoice generator really 100% free?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can create and download GST bills and invoices without signing up or entering a credit card. Ads may appear on the free tool page; a free MsgBill account removes ads and saves invoices for 1 year.",
                },
            },
            {
                "@type": "Question",
                name: "Does the downloaded invoice have a watermark?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. The PDF is clean and suitable to share with clients. Always verify GSTIN, HSN/SAC, and tax rates for your own compliance.",
                },
            },
            {
                "@type": "Question",
                name: "Can I send the bill on WhatsApp?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Use Send to WhatsApp to open a pre-filled message with bill totals. For cloud history and payment reminders, create a free MsgBill account.",
                },
            },
            {
                "@type": "Question",
                name: "Is this a valid GST tax invoice?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The tool helps you create a GST-style invoice with CGST/SGST or IGST. Legal validity depends on your registration, consecutive numbering, and Rule 46 fields. This is not tax advice.",
                },
            },
        ],
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-secondary-950">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto mb-8 text-center space-y-3">
                    <span className="text-xs font-black tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        100% FREE • NO SIGN UP REQUIRED
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-secondary-900 dark:text-white tracking-tight">
                        Free GST Invoice & Bill Generator
                    </h1>
                    <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                        Create compliant GST invoices, cash memos, and receipts in seconds. Download a print-ready PDF or share with your client directly over WhatsApp — no login.
                    </p>
                </div>

                <FreeInvoiceGenerator />

                <section className="max-w-4xl mx-auto mt-20 space-y-12 text-secondary-800 dark:text-secondary-200">
                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-6">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            How to Create a GST Invoice Online with MsgBill
                        </h2>
                        <ol className="list-decimal pl-6 space-y-3 text-sm text-secondary-600 dark:text-secondary-400">
                            <li>
                                <strong>Enter your business details:</strong> company name, phone, email, and GSTIN if registered.
                            </li>
                            <li>
                                <strong>Add customer information:</strong> client name, billing address, and contact number.
                            </li>
                            <li>
                                <strong>Add line items:</strong> quantity, rate, and GST slab (0%, 5%, 12%, 18%, or 28%).
                            </li>
                            <li>
                                <strong>Choose tax type:</strong> Intra-State (CGST + SGST) or Inter-State (IGST).
                            </li>
                            <li>
                                <strong>Download PDF or Send via WhatsApp:</strong> share instantly without installing an app.
                            </li>
                        </ol>
                    </div>

                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-4 text-sm text-secondary-600 dark:text-secondary-400">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Who This Free Bill Maker Is For
                        </h2>
                        <p>
                            Built for Indian kirana shops, coaching classes, freelancers, salons, electricians, clinics issuing receipts, and homepreneurs who need a clean bill on the phone — without buying desktop software first.
                        </p>
                        <p>
                            Guests keep using this page forever. When you outgrow one-off PDFs, a free MsgBill account stores invoices for a year, removes ads, and unlocks WhatsApp payment reminders. Pro is ₹499/year for unlimited invoices.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-4 text-sm text-secondary-600 dark:text-secondary-400">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            CGST, SGST & IGST — Quick Rules
                        </h2>
                        <p>
                            Same state supply usually means CGST + SGST (half the rate each). Different state supply usually means IGST at the full rate. Place of supply and registration status decide which applies — confirm with your CA for edge cases.
                        </p>
                        <p>
                            Unregistered sellers may still issue a commercial bill or cash memo. GST tax invoices with GSTIN are for registered persons under the CGST Rules (including Rule 46 mandatory fields).
                        </p>
                    </div>

                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-6">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Frequently Asked Questions (FAQ)
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">
                                    Is this invoice generator really 100% free?
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                                    Yes. Create and download without signup. Ads may appear on this public tool; accounts are ad-free.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">
                                    Does the downloaded invoice have a watermark?
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                                    No. The PDF is clean. You remain responsible for GST compliance on the numbers you enter.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">
                                    Can I send the bill on WhatsApp?
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                                    Yes — one tap opens WhatsApp with a summary. Cloud history and reminders need a free account.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">
                                    Why create a free MsgBill account?
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                                    Ad-free dashboard, invoices saved for 1 year, clients list, and payment reminders. No credit card for free tier.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-primary-200 bg-primary-50 dark:bg-primary-950/40 p-6 text-center space-y-3">
                        <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                            Want an ad-free experience and save your invoices for 1 year?
                        </p>
                        <a
                            href="/auth/signup"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700"
                        >
                            Sign Up Free — No Credit Card Required
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
