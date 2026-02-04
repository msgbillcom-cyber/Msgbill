import React from "react";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            title: "Quick Account Setup",
            desc:
                "Join the platform for free in just 15 seconds. No credit card required.",
            image: "🛡️",
        },
        {
            title: "Organization Setup",
            desc:
                "Add your business logo, address, and GST details to personalize your invoices.",
            image: "🏭",
        },
        {
            title: "Import Clients",
            desc:
                "Store your clients regular billing details so you never have to re-type them.",
            image: "👤",
        },
        {
            title: "Draft & Send",
            desc:
                "Use our powerful editor to build invoices and send them as clean PDFs via email or link.",
            image: "🚀",
        },
    ];

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container-wide">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-6xl font-black mb-6">
                            How simple is{" "}
                            <span className="text-primary-600 italic">
                                "MsgBill"
                            </span>?
                        </h1>
                        <p className="text-xl text-secondary-600">
                            Built for speed. We stripped away the jargon to let
                            you focus on your work.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline bar */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 hidden md:block -translate-x-1/2" />

                        <div className="space-y-24">
                            {steps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col md:flex-row gap-12 items-center relative ${
                                        idx % 2 === 1
                                            ? "md:flex-row-reverse"
                                            : ""
                                    }`}
                                >
                                    {/* Circle marker */}
                                    <div className="absolute left-1/2 top-0 w-8 h-8 rounded-full bg-primary-600 border-4 border-secondary-50 hidden md:block -translate-x-1/2 z-10" />

                                    <div className="flex-1 text-center md:text-left space-y-4 pt-12 md:pt-0">
                                        <span className="text-primary-600 font-black text-6xl opacity-20 block">
                                            {idx + 1}
                                        </span>
                                        <h3 className="text-2xl font-bold">
                                            {step.title}
                                        </h3>
                                        <p className="text-secondary-500 text-lg leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>

                                    <div className="flex-1 w-full flex justify-center">
                                        <div className="w-64 h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center text-7xl transform hover:rotate-3 transition-transform">
                                            {step.image}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-40 max-w-2xl mx-auto text-center">
                        <Card className="bg-primary-600 text-white p-12 border-none shadow-glow">
                            <CardContent className="space-y-8">
                                <h2 className="text-3xl font-bold">
                                    Ready to send your first invoice?
                                </h2>
                                <p className="text-primary-100 italic">
                                    Join 5,000+ invoices generated this month
                                    alone.
                                </p>
                                <Link href="/auth/signup">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="w-full text-primary-900 font-bold"
                                    >
                                        Start Free – Create 3 Invoices
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
