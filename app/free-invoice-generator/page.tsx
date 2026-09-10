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
};

export default function FreeInvoiceGeneratorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MsgBill Free Invoice Generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
        },
        "description": "Free instant GST invoice and bill maker for Indian businesses. Download PDF or send on WhatsApp.",
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-secondary-950">
            <Navbar />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                        Create compliant GST invoices, cash memos, and receipts in seconds. Download a print-ready PDF or share with your client directly over WhatsApp.
                    </p>
                </div>

                <FreeInvoiceGenerator />

                {/* Educational SEO & FAQ Section for AdSense Ranking */}
                <section className="max-w-4xl mx-auto mt-20 space-y-12 text-secondary-800 dark:text-secondary-200">
                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-6">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            How to Create a GST Invoice Online with MsgBill
                        </h2>
                        <ol className="list-decimal pl-6 space-y-3 text-sm text-secondary-600 dark:text-secondary-400">
                            <li><strong>Enter Your Business Details:</strong> Fill in your company name, contact phone, email, and GSTIN (if registered).</li>
                            <li><strong>Add Customer Information:</strong> Type your client's name, billing address, and contact number.</li>
                            <li><strong>Add Itemized Products/Services:</strong> Add line items with quantity, rate, and applicable GST rate (0%, 5%, 12%, 18%, or 28%).</li>
                            <li><strong>Choose GST Type:</strong> Select Intra-State (CGST + SGST) if selling within your state, or Inter-State (IGST) for other states.</li>
                            <li><strong>Download PDF or Send via WhatsApp:</strong> Click "Download PDF" to save or "Send to WhatsApp" to dispatch the invoice instantly.</li>
                        </ol>
                    </div>

                    <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-6">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Frequently Asked Questions (FAQ)
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">Is this invoice generator really 100% free?</h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">Yes! You can create and download unlimited bills and invoices without signing up or entering credit card details.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">Does the downloaded invoice have a watermark?</h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">No. The generated PDF is completely clean, professional, and ready to hand over to clients or auditors.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary-900 dark:text-white">Why should I create a free MsgBill account?</h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mt-1">Creating a free account removes all advertising, automatically saves your invoices in cloud storage for 1 year, and enables automated payment reminders via WhatsApp.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
