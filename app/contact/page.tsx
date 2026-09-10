import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | MsgBill Support & Inquiries",
    description:
        "Get in touch with the MsgBill team for support, business inquiries, or billing assistance. We are here to help Indian SMBs thrive.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-secondary-950">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container-wide max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-950/60 px-4 py-1.5 rounded-full border border-primary-100">
                            Support & Inquiries
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-secondary-900 dark:text-white">
                            We'd love to hear from you
                        </h1>
                        <p className="text-base text-secondary-600 dark:text-secondary-400">
                            Have questions about our WhatsApp invoicing, custom business integrations, or need billing help? Our team is ready to assist.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Contact Information Cards */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">Email Support</h3>
                                    <p className="text-xs text-secondary-500 mt-1">Our support team replies within 24 hours.</p>
                                    <a href="mailto:support@msgbill.com" className="text-sm font-semibold text-emerald-600 hover:underline mt-2 inline-block">
                                        support@msgbill.com
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">WhatsApp Support</h3>
                                    <p className="text-xs text-secondary-500 mt-1">Instant chat support for active business users.</p>
                                    <span className="text-sm font-semibold text-[#25D366] mt-2 inline-block">
                                        +91 98765 43210
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">Working Hours</h3>
                                    <p className="text-xs text-secondary-500 mt-1">Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                                    <p className="text-xs text-secondary-400 mt-1">Sunday: Emergency Ticket Support</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">Registered Office</h3>
                                    <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                                        MsgBill Financial Technologies<br />
                                        Bengaluru, Karnataka, India - 560001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Message Form Card */}
                        <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-xl space-y-6">
                            <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                                Send us a Message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
