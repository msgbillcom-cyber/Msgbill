import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FreeInvoiceGenerator from "@/components/generator/FreeInvoiceGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "WhatsApp Invoice Generator & Free GST Bill Maker (No Login) | MsgBill",
    description:
        "Create and send bills on WhatsApp in 10 seconds. Free WhatsApp invoice generator and online GST bill maker for Indian businesses, shops, and freelancers. Download PDF with dynamic UPI QR code. No signup required.",
    keywords: [
        "whatsapp invoice generator",
        "whatsapp bill generator",
        "whatsapp billing system",
        "free invoice generator india",
        "online bill maker no login",
        "free gst invoice generator",
        "whatsapp bill maker",
        "cash memo maker free",
        "receipt generator online",
        "send invoice on whatsapp",
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
        "@type": "SoftwareApplication",
        name: "MsgBill Free GST Invoice & WhatsApp Bill Maker",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android, iOS, Windows, macOS",
        url: "https://msgbill.com/free-invoice-generator",
        offers: [
            {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                name: "Free Instant Invoice Generator"
            },
            {
                "@type": "Offer",
                price: "499",
                priceCurrency: "INR",
                name: "MsgBill Pro (Annual)",
                description: "Unlimited invoices, 1-year cloud history, customer directory and 1-tap WhatsApp UPI collection."
            }
        ],
        description:
            "Instant GST invoice and cash memo generator for Indian businesses. Download clean PDFs with dynamic UPI QR code or share directly via WhatsApp with zero login required.",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "128"
        },
        areaServed: { "@type": "Country", name: "India" },
    };

    const howToJsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Create and Send a GST Bill on WhatsApp",
        description: "Step-by-step tutorial for Indian small businesses to create a compliant GST invoice and dispatch it on WhatsApp in 30 seconds.",
        step: [
            {
                "@type": "HowToStep",
                name: "Enter Business Details",
                text: "Provide your business name, mobile number, and optional GSTIN."
            },
            {
                "@type": "HowToStep",
                name: "Add Client Information",
                text: "Type customer name and mobile number to auto-populate the WhatsApp recipient."
            },
            {
                "@type": "HowToStep",
                name: "Add Items & GST Slabs",
                text: "Input items with quantity, rates, and select applicable GST slabs (0%, 5%, 12%, 18%, 28%)."
            },
            {
                "@type": "HowToStep",
                name: "Download PDF or Tap Share via WhatsApp",
                text: "Instantly download a clean GST invoice PDF or tap Share to WhatsApp to send a pre-filled UPI link and PDF directly to your buyer."
            }
        ]
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How do I create a GST invoice on WhatsApp for free?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Open the MsgBill Free Invoice Generator on any phone or PC, enter your business details and items, choose intra-state (CGST+SGST) or inter-state (IGST), and tap 'Share to WhatsApp'. The system creates a pre-formatted message with a 1-tap UPI payment link and clean PDF.",
                },
            },
            {
                "@type": "Question",
                name: "Is this invoice generator really 100% free?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can create and download unlimited GST bills and invoices without signing up or entering a credit card. MsgBill Pro is available at ₹499/year for cloud history, customer directory, and ad-free experience.",
                },
            },
            {
                "@type": "Question",
                name: "Does the downloaded invoice have a watermark?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All PDFs are 100% clean, professional, and ready to send to clients with no intrusive watermarks.",
                },
            },
            {
                "@type": "Question",
                name: "Can I collect payments directly via UPI?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Simply input your UPI ID (e.g. yourname@okhdfcbank). MsgBill embeds an instant 1-tap UPI deep link in the WhatsApp message and prints a dynamic QR code on the invoice with 0% transaction fees.",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
