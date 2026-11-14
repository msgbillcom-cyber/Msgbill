import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card, {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | Bill & Invoice on WhatsApp | MsgBill",
    description: "Free bill and invoice on WhatsApp. Start with 20 free invoices. Pro at ₹499/year – unlimited invoices, full year. No credit card for free tier.",
    keywords: ["bill on whatsapp price", "invoice on whatsapp free", "whatsapp bill maker pricing", "499 year invoicing"],
    alternates: {
        canonical: "https://msgbill.com/pricing",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "MsgBill",
        url: "https://msgbill.com/pricing",
        title: "Pricing | Bill & Invoice on WhatsApp | MsgBill",
        description: "Free bill and invoice on WhatsApp. Start with 20 free invoices. Pro at ₹499/year – unlimited invoices, full year. No credit card for free tier.",
        images: ["/logo-final.png"],
    },
};

const comparisonRows = [
    { label: "Invoices", free: "20 in total", pro: "Unlimited" },
    { label: "Saved clients", free: "Up to 5", pro: "Unlimited" },
    { label: "GST invoices (CGST/SGST/IGST)", free: "Included", pro: "Included" },
    { label: "WhatsApp sharing & invoice link", free: "Included", pro: "Included" },
    { label: "UPI details & payment links on invoices", free: "Included", pro: "Included" },
    { label: "Invoice history kept in your dashboard", free: "6 months", pro: "12 months" },
    { label: "PDF templates", free: "Basic", pro: "Premium" },
    { label: "Price", free: "₹0", pro: "₹499 per year" },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Is MsgBill Pro ₹499 per month or per year?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "₹499 is for the full year, one payment. There is no ₹10 yearly plan. Free tier is 20 invoices total.",
            },
        },
        {
            "@type": "Question",
            name: "How do I pay for MsgBill Pro?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Upgrade inside the app. Payment is via Razorpay (UPI, cards). The amount charged for Pro is ₹499, not ₹10.",
            },
        },
    ],
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container-wide">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6">
                            Simple Pricing for{" "}
                            <span className="gradient-text">Growing Business</span>
                        </h1>
                        <p className="text-xl text-secondary-600">
                                    Start for free. Pro at just ₹499/year. No hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
                        {/* Free Plan */}
                        <Card className="flex flex-col border-2 border-secondary-100 hover:border-secondary-300 transition-colors">
                            <CardHeader className="p-8 text-center border-b bg-secondary-50/50">
                                <CardTitle className="text-2xl font-bold text-secondary-900">
                                    Starter
                                </CardTitle>
                                <div className="mt-6">
                                    <span className="text-4xl font-black text-secondary-900">
                                        Free
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-secondary-500 font-medium">
                                    Perfect for trying out MsgBill.
                                </p>
                            </CardHeader>
                            <CardContent className="p-8 flex-1 bg-white">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                        <span className="text-primary-600 font-black">✓</span>
                                        20 Free Invoices
                                    </li>
                                    <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                        <span className="text-primary-600 font-black">✓</span>
                                        5 Clients Max
                                    </li>
                                    <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                        <span className="text-primary-600 font-black">✓</span>
                                        Basic Templates
                                    </li>
                                    <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                        <span className="text-primary-600 font-black">✓</span>
                                        WhatsApp Sharing
                                    </li>
                                    <li className="flex items-center gap-3 text-secondary-800 font-medium">
                                        <span className="text-primary-600 font-black">✓</span>
                                        UPI Payment Links
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="p-8 pt-0 bg-white">
                                <Link href="/auth/signup" className="w-full">
                                    <Button variant="outline" size="lg" fullWidth>
                                        Start Free
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="flex flex-col border-2 border-primary-500 shadow-2xl relative transform hover:-translate-y-1 transition-transform">
                            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-max">
                                <Badge variant="primary" className="py-2 px-6 text-sm shadow-lg">
                                    Most Popular
                                </Badge>
                            </div>
                            <CardHeader className="p-8 text-center border-b bg-primary-50/50">
                                <CardTitle className="text-2xl font-bold text-primary-900">
                                    Pro Unlimited
                                </CardTitle>
                                <div className="mt-6">
                                    <span className="text-5xl font-black text-primary-600">
                                        ₹499
                                    </span>
                                    <span className="text-secondary-500 font-medium ml-2">
                                        / year
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-secondary-500 font-medium">
                                    ~₹42/month. One payment, full year of Pro.
                                </p>
                                <p className="mt-2 text-sm text-primary-600 font-semibold">
                                    For serious businesses.
                                </p>
                            </CardHeader>
                            <CardContent className="p-8 flex-1 bg-white">
                                <ul className="space-y-4">
                                    {[
                                        "Unlimited Invoices",
                                        "Unlimited Clients",
                                        "Premium PDF Templates",
                                        "Remove 'Made with MsgBill' Branding",
                                        "Priority Support",
                                        "Everything in Free",
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-secondary-800 font-medium"
                                        >
                                            <span className="text-success-500 font-black">
                                                ✓
                                            </span>{" "}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-8 pt-0 bg-white">
                                <Link href="/auth/signup" className="w-full">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        className="shadow-lg py-6 text-lg"
                                    >
                                        Get Unlimited Access
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Plan comparison */}
                    <div className="max-w-4xl mx-auto mb-32">
                        <h2 className="text-3xl font-bold text-center mb-4">
                            Compare plans
                        </h2>
                        <p className="text-secondary-600 text-center max-w-2xl mx-auto mb-10">
                            Both plans include the same GST calculation, WhatsApp sharing and payment details on every invoice. Pro is for businesses that bill regularly and want no limits on invoices or clients.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b-2 border-secondary-200">
                                        <th className="py-3 pr-4 font-bold text-secondary-900">Feature</th>
                                        <th className="py-3 px-4 font-bold text-secondary-900">Starter (Free)</th>
                                        <th className="py-3 pl-4 font-bold text-primary-700">Pro Unlimited</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row) => (
                                        <tr key={row.label} className="border-b border-secondary-100">
                                            <td className="py-3 pr-4 font-medium text-secondary-800">{row.label}</td>
                                            <td className="py-3 px-4 text-secondary-600">{row.free}</td>
                                            <td className="py-3 pl-4 text-secondary-800 font-semibold">{row.pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Who the free plan suits</h3>
                                <p className="text-secondary-600">
                                    Home businesses, new freelancers and shops that send a handful of invoices a month. You get proper GST invoices, a shareable WhatsApp link and your UPI details on every bill, so you can see whether customers pay faster before spending anything.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Who should choose Pro</h3>
                                <p className="text-secondary-600">
                                    Businesses that bill every week, keep many regular customers or need a year of invoice history in one place. At ₹499 a year, about ₹42 a month, Pro removes every limit on invoices and clients.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">How do I pay?</h3>
                                <p className="text-secondary-600">
                                    Click Upgrade inside the app and you are taken to a secure Razorpay checkout, where you can pay with UPI (GPay, PhonePe, Paytm), debit or credit card, or net banking. Pro is activated on your account once the payment is confirmed.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Is the ₹499 fee monthly or yearly?</h3>
                                <p className="text-secondary-600">
                                    It's ₹499 for the full year (one payment). That's about ₹42 per month. No recurring charge until you renew next year.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">What exactly counts towards the 20 free invoices?</h3>
                                <p className="text-secondary-600">
                                    Every invoice you create in your dashboard counts once, whether or not it has been paid. The limit is a lifetime total, not a monthly allowance, so it is meant for trying MsgBill properly before you decide. The no-login free invoice generator is separate and does not use up your account invoices.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">What happens when I reach the free limit?</h3>
                                <p className="text-secondary-600">
                                    Your existing invoices stay in your account and links you already sent keep working. You will see an upgrade prompt when you try to create the 21st invoice. Upgrade to Pro to keep creating invoices without limits.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">How long are my invoices stored?</h3>
                                <p className="text-secondary-600">
                                    Invoices stay in your dashboard for 6 months on the free plan and 12 months on paid plans, counted from the date each invoice was created. Download PDFs of invoices you need to keep, because GST law expects businesses to preserve records for several years.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Is there a charge on the payments my customers make?</h3>
                                <p className="text-secondary-600">
                                    MsgBill does not take a cut of your sales. When customers pay to your UPI ID or bank account shown on the invoice, the money goes straight to you. If you choose to use Razorpay payment links, Razorpay&apos;s own fees apply under your Razorpay account.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Do I need a credit card to start?</h3>
                                <p className="text-secondary-600">
                                    No. Sign up with your email or Google account and start invoicing on the free plan. You only pay if you decide to upgrade to Pro.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
