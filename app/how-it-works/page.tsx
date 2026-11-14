import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Create Bill & Invoice on WhatsApp | MsgBill",
    description: "Learn how to create bill and invoice on WhatsApp in 5 simple steps. WhatsApp bill maker & WhatsApp invoice maker for Indian businesses. Free to start.",
    keywords: ["bill on whatsapp", "invoice on whatsapp", "whatsapp bill maker", "whatsapp invoice maker", "how to send invoice on whatsapp"],
    alternates: {
        canonical: "https://msgbill.com/how-it-works",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "MsgBill",
        url: "https://msgbill.com/how-it-works",
        title: "How to Create Bill & Invoice on WhatsApp | MsgBill",
        description: "Learn how to create bill and invoice on WhatsApp in 5 simple steps. WhatsApp bill maker & WhatsApp invoice maker for Indian businesses. Free to start.",
        images: ["/logo-final.png"],
    },
};

const stepDetails = [
    {
        title: "1. Sign in securely",
        body: "Create an account with your email or Google and sign in. Your invoices, clients and products are saved to your account, so you can start a bill on your phone at the shop and finish it on a laptop at home. If you only need one quick bill, the free invoice generator works without any login.",
    },
    {
        title: "2. Set up your business once",
        body: "During onboarding you add your business name, logo, address, state, GSTIN (if you are registered) and UPI ID. Bank details can be added in profile settings. MsgBill uses your state to decide how GST is split, and shows your payment details on every invoice so customers always know how to pay you. You can change any of this later.",
    },
    {
        title: "3. Save your clients",
        body: "Add a client's name, phone number, address, state and GSTIN once. Next time you start an invoice, pick the client from the list and their details fill in automatically. The free plan stores up to 5 clients; Pro removes the limit.",
    },
    {
        title: "4. Create the invoice",
        body: "Add line items with description, quantity, rate and GST rate, or pick a saved product from your inventory. MsgBill calculates the subtotal, tax and grand total as you type. If your client is in the same state, tax is split into CGST and SGST; if they are in another state, IGST is applied. You can also switch GST off for a simple non-GST bill. Set an invoice date and a due date so overdue tracking works later.",
    },
    {
        title: "5. Share on WhatsApp and get paid",
        body: "Tap share and MsgBill prepares a WhatsApp message with the invoice number, amount, due date and a link to the online invoice. Your customer opens the link, sees a clean invoice with your UPI details, and pays from the same phone. If you use Razorpay, you can also attach a payment link.",
    },
];

const faqs = [
    {
        q: "Does my customer need to install anything?",
        a: "No. Your customer only needs WhatsApp and a browser. The invoice link opens a web page that shows the full bill and how to pay; nothing to download or sign up for.",
    },
    {
        q: "What happens after the invoice is paid?",
        a: "When a payment comes in through a Razorpay link, the invoice can be updated automatically. For cash, UPI or bank transfers you receive directly, open the invoice and record the payment with the method used. Paid invoices drop out of your overdue list.",
    },
    {
        q: "How do I follow up on late payments?",
        a: "The Collection page lists every invoice that is past its due date, with the number of days late. Tap Remind, choose a friendly, firm or urgent tone, and WhatsApp opens with a ready-made message that you can review before sending.",
    },
    {
        q: "Can I try it without creating an account?",
        a: "Yes. The free invoice generator lets you fill in your business and client details, add items with HSN/SAC codes and GST, download a PDF and share it on WhatsApp without logging in.",
    },
];

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
                            Real screenshots of the five steps from sign-in to a paid invoice. Most businesses send their first WhatsApp invoice within a few minutes of signing up.
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

                    <section className="mt-24 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-4">
                            Each step, explained
                        </h2>
                        <p className="text-secondary-600 text-center mb-12">
                            MsgBill is built for shops, freelancers and service businesses that already talk to customers on WhatsApp. Here is what happens at every step, and why.
                        </p>
                        <div className="space-y-6">
                            {stepDetails.map((step) => (
                                <div key={step.title} className="glass-card rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                    <p className="text-secondary-600 leading-relaxed">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Common questions
                        </h2>
                        <div className="space-y-8">
                            {faqs.map((item) => (
                                <div key={item.q}>
                                    <h3 className="text-xl font-bold mb-2">{item.q}</h3>
                                    <p className="text-secondary-600 leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-secondary-600 text-center mt-10">
                            Want to see it before signing up?{" "}
                            <Link href="/free-invoice-generator" className="text-primary-600 font-semibold hover:underline">
                                Try the free invoice generator
                            </Link>{" "}
                            or read our{" "}
                            <Link href="/blog/whatsapp-invoice-guide" className="text-primary-600 font-semibold hover:underline">
                                guide to sending invoices on WhatsApp
                            </Link>
                            .
                        </p>
                    </section>

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
            <Footer />
        </div>
    );
}
