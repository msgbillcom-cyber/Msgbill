import React from "react";
import Navbar from "@/components/layout/Navbar";
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
    description: "Free bill and invoice on WhatsApp. Start with 20 free invoices. Upgrade to Pro for unlimited WhatsApp bill maker. No credit card required.",
    keywords: ["bill on whatsapp price", "invoice on whatsapp free", "whatsapp bill maker pricing"],
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container-wide">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6">
                            Simple Pricing for{" "}
                            <span className="gradient-text">Growing Business</span>
                        </h1>
                        <p className="text-xl text-secondary-600">
                            Start for free. Upgrade when you grow. No hidden fees.
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
                                        / month
                                    </span>
                                </div>
                                <p className="mt-4 text-sm text-secondary-500 font-medium">
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

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">How do I pay?</h3>
                                <p className="text-secondary-600">
                                    We accept payments via UPI (GPay, PhonePe, Paytm). Once you upgrade inside the app, you'll see a QR code to scan and pay.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Is the ₹499 fee monthly or yearly?</h3>
                                <p className="text-secondary-600">
                                    It's a monthly fee of ₹499. Cancel anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
