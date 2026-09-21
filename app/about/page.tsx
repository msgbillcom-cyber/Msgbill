import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Bill & Invoice on WhatsApp | MsgBill",
    description: "MsgBill: WhatsApp bill maker and invoice maker for Indian businesses. We simplify bill and invoice on WhatsApp for homepreneurs and small businesses.",
    keywords: ["bill on whatsapp", "invoice on whatsapp", "whatsapp bill maker", "whatsapp invoice maker", "about msgbill"],
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-1">
                {/* Hero Section */}
                <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-secondary-50">
                    <div className="container-wide">
                        <div className="text-center max-w-4xl mx-auto space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-secondary-900 leading-tight">
                                We're building for the <br />
                                <span className="gradient-text-purple">builders of India</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
                                MsgBill is on a mission to help homepreneurs, freelancers, and small businesses 
                                get paid faster without the headache of complex software.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20 lg:py-28">
                    <div className="container-wide">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-secondary-900">
                                    Why We Built MsgBill
                                </h2>
                                <p className="text-lg text-secondary-600 leading-relaxed">
                                    In India, business happens on WhatsApp. Deals are struck, orders are taken, 
                                    and relationships are built—all in chat.
                                </p>
                                <p className="text-lg text-secondary-600 leading-relaxed">
                                    Yet traditional accounting software like Tally or heavy desktop ERPs were never designed for modern mobile-first Indian commerce. Small merchants, home bakers, coaches, clinics, and freelance developers spend hours wrestling with confusing software just to send a basic bill.
                                </p>
                                <p className="text-lg text-secondary-900 font-medium leading-relaxed">
                                    MsgBill bridges this gap by providing instant, 10-second GST-compliant billing, dynamic UPI QR codes, and seamless WhatsApp delivery with zero complex setup.
                                </p>
                            </div>
                            <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-secondary-900">
                                        The MsgBill Solution
                                    </h2>
                                    <p className="text-lg text-secondary-600 leading-relaxed">
                                        We asked: <span className="italic">"What if creating an invoice was as easy as sending a message?"</span>
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <span className="text-2xl">⚡</span>
                                            <span className="text-secondary-700 font-medium">Create invoices in under 60 seconds with no signup required</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-2xl">💬</span>
                                            <span className="text-secondary-700 font-medium">Share clean PDF invoices and UPI deep links directly via WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-2xl">🇮🇳</span>
                                            <span className="text-secondary-700 font-medium">Fully aligned with Indian GST Rule 46, CGST/SGST/IGST slabs, and MSME thresholds</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Editorial & Authorship Standards (E-E-A-T for AdSense) */}
                <section className="py-16 bg-slate-50 border-y border-slate-200">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                                Editorial Transparency & Standards
                            </span>
                            <h2 className="text-3xl font-extrabold text-secondary-900">
                                Trust, Research & Subject-Matter Expertise
                            </h2>
                            <p className="text-secondary-600 text-sm">
                                Every guide, comparison, and invoice template on MsgBill is researched and reviewed against official Central Board of Indirect Taxes and Customs (CBIC) notifications and RBI digital payment standards.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-3xl border border-secondary-200 shadow-sm space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                                    PK
                                </div>
                                <h3 className="text-xl font-bold text-secondary-900">Pradeep Kumar</h3>
                                <p className="text-xs font-semibold text-emerald-600">Lead Product Architect & SME FinTech Specialist</p>
                                <p className="text-xs text-secondary-600 leading-relaxed">
                                    Passionate about streamlining business operations for Indian entrepreneurs. Pradeep oversees the product development and tax research desk at MsgBill, ensuring that every invoice structure adheres strictly to the GST Act.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-secondary-200 shadow-sm space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                                    📝
                                </div>
                                <h3 className="text-xl font-bold text-secondary-900">Our Editorial Guarantee</h3>
                                <p className="text-xs font-semibold text-teal-600">Fact-Checked & Regularly Updated</p>
                                <p className="text-xs text-secondary-600 leading-relaxed">
                                    We do not publish auto-generated thin content or unverified tips. Our articles feature real-world calculation tables, SAC/HSN codes, and actionable walk-throughs to protect small business owners from tax filing penalties and late payment traps.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 lg:py-28 bg-secondary-900 text-white">
                    <div className="container-wide">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                Built on Trust & Simplicity
                            </h2>
                            <p className="text-lg text-secondary-400">
                                We believe software should empower you, not confuse you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                <div className="text-4xl mb-6">🛡️</div>
                                <h3 className="text-xl font-bold mb-4">Privacy First</h3>
                                <p className="text-secondary-400">
                                    Your business data is yours. We don't sell it, share it, or spy on it. 
                                    Securely stored on Indian servers.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                <div className="text-4xl mb-6">🚀</div>
                                <h3 className="text-xl font-bold mb-4">Speed Matters</h3>
                                <p className="text-secondary-400">
                                    Every second you spend on admin is a second away from your customers. 
                                    We optimize for speed.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                <div className="text-4xl mb-6">🤝</div>
                                <h3 className="text-xl font-bold mb-4">Customer Obsessed</h3>
                                <p className="text-secondary-400">
                                    We build what you need. Our roadmap is driven by feedback from real 
                                    business owners like you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-white">
                    <div className="container-narrow text-center">
                        <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-8">
                            Join the movement
                        </h2>
                        <p className="text-xl text-secondary-600 mb-12">
                            Start invoicing smarter today. No credit card required.
                        </p>
                        <Link href="/auth/signup">
                            <Button size="lg" variant="primary" className="shadow-glow px-12 py-4 text-lg">
                                Get Started for Free
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
