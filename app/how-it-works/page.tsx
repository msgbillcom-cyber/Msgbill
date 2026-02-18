import React from "react";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Create Bill & Invoice on WhatsApp | MsgBill",
    description: "Learn how to create bill and invoice on WhatsApp in 5 simple steps. WhatsApp bill maker & WhatsApp invoice maker for Indian businesses. Free to start.",
    keywords: ["bill on whatsapp", "invoice on whatsapp", "whatsapp bill maker", "whatsapp invoice maker", "how to send invoice on whatsapp"],
};

export default function HowItWorks() {
    const steps = [
        {
            title: "Login",
            desc: "Secure sign-in to your MsgBill account.",
            src: "/logo/how%20it%20works/1.png",
            fallback: "/artifacts/login_page_premium_1769528183310.png",
        },
        {
            title: "Onboarding",
            desc: "Add business info, GSTIN, and banking once.",
            src: "/logo/how%20it%20works/2.png",
            fallback: "/artifacts/onboarding_business_profile.svg",
        },
        {
            title: "Add Client",
            desc: "Save client details to auto-fill invoices.",
            src: "/logo/how%20it%20works/3.png",
            fallback: "/artifacts/clients_add_modal.svg",
        },
        {
            title: "Create Invoice",
            desc: "Enter items and auto-calculate GST totals.",
            src: "/logo/how%20it%20works/4.png",
            fallback: "/artifacts/gst_auto_calculator_1769540067994.png",
        },
        {
            title: "Share via WhatsApp",
            desc: "Send the invoice link and get paid faster.",
            src: "/logo/how%20it%20works/5.png",
            fallback: "/artifacts/whatsapp_invoice_share_1769540045907.png",
        },
    ];

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container-wide">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-6xl font-black mb-6">
                            How it works
                        </h1>
                        <p className="text-xl text-secondary-600">
                            Real screenshots that show the exact flow your customers will follow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((s, idx) => (
                            <div key={idx} className="glass-card rounded-2xl p-4 hover-lift transition-smooth">
                                <div className="aspect-video w-full overflow-hidden rounded-xl border border-secondary-200 bg-white">
                                    <img
                                        src={s.src}
                                        alt={s.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-lg font-semibold">{s.title}</h3>
                                    </div>
                                    <p className="text-secondary-600 mt-2">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 max-w-2xl mx-auto text-center">
                        <Card className="bg-primary-600 text-white p-12 border-none shadow-glow">
                            <CardContent className="space-y-8">
                                <h2 className="text-3xl font-bold">Ready to send your first invoice?</h2>
                                <p className="text-primary-100">Start free and upgrade anytime.</p>
                                <Link href="/auth/signup">
                                    <Button variant="secondary" size="lg" className="w-full text-primary-900 font-bold">
                                        Sign up free
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
