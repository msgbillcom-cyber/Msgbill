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
    alternates: {
        canonical: "https://msgbill.com/contact",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "MsgBill",
        url: "https://msgbill.com/contact",
        title: "Contact MsgBill | WhatsApp +91 9148868413 | support@msgbill.com",
        description:
            "Reach MsgBill support on WhatsApp (+91 9148868413) or email support@msgbill.com. Help with GST invoices, WhatsApp sharing, UPI and Pro payments.",
        images: ["/logo-final.png"],
    },
};

const WHATSAPP_SUPPORT_URL =
    "https://wa.me/919148868413?text=Hi%20MsgBill%20Team%2C%20I%20have%20an%20inquiry%20regarding%20MsgBill";

const helpTopics = [
    {
        title: "Getting started",
        desc: "Setting up your business profile, adding your GSTIN, state, UPI ID and bank details once, and creating your first invoice in the dashboard or the no-login free generator.",
    },
    {
        title: "GST on your invoices",
        desc: "How MsgBill applies CGST + SGST for same-state customers and IGST for other-state customers, adding HSN/SAC codes, and switching GST off for non-GST bills.",
    },
    {
        title: "WhatsApp sharing",
        desc: "Sending the invoice link or PDF to a customer's WhatsApp, sharing from desktop via WhatsApp Web, and sending friendly, firm or urgent reminders for overdue invoices.",
    },
    {
        title: "Payments & Pro plan",
        desc: "UPI QR codes on invoices, Razorpay payment links, recording cash or bank payments, and upgrading to Pro (₹499 for one full year, paid securely via Razorpay).",
    },
];

const faqs = [
    {
        q: "How quickly will I get a reply?",
        a: "We aim to reply to WhatsApp and email messages within one working day, usually much sooner during our working hours (Monday to Saturday, 9:00 AM to 6:00 PM IST). Messages sent on Sunday are answered on Monday unless your invoices or payments are blocked.",
    },
    {
        q: "Is the WhatsApp number for sales or support?",
        a: "Both. +91 9148868413 is the MsgBill support desk. You can ask product questions before you sign up, report a problem, or ask about a Pro payment. We will never ask for your password or OTP on WhatsApp.",
    },
    {
        q: "Can MsgBill give me tax advice?",
        a: "We can explain how MsgBill calculates and shows GST on your invoices, and our blog covers common GST billing rules. For decisions about registration, rates or returns for your business, please speak to a Chartered Accountant.",
    },
    {
        q: "How do I delete my account or data?",
        a: "You can update your details from your dashboard settings. To delete your account, write to privacy@msgbill.com or support@msgbill.com from the email address you signed up with. Our Privacy Policy explains what we store and for how long.",
    },
];

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
                        <p className="text-sm text-secondary-500 dark:text-secondary-400">
                            MsgBill is a small team based in Bengaluru, building simple GST billing for shops, freelancers and service businesses across India. The fastest way to reach us is WhatsApp. For anything that needs screenshots or documents, email works best.
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
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">WhatsApp Desk</h3>
                                    <p className="text-xs text-secondary-500 mt-1">Product questions, support and Pro payment help.</p>
                                    <a
                                        href={WHATSAPP_SUPPORT_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-[#25D366] hover:underline mt-2 inline-block"
                                    >
                                        +91 9148868413 →
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">Working Hours</h3>
                                    <p className="text-xs text-secondary-500 mt-1">Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                                    <p className="text-xs text-secondary-400 mt-1">Sunday: urgent account or payment issues only</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base">Location</h3>
                                    <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                                        MsgBill<br />
                                        Bengaluru, Karnataka, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Message Form Card */}
                        <div className="bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-xl space-y-6">
                            <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                                Send us a Message
                            </h2>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                Fill in the form and we will open WhatsApp with your message ready to send to our support desk.
                            </p>
                            <ContactForm />
                        </div>
                    </div>

                    {/* What we can help with */}
                    <section className="mt-20">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 dark:text-white text-center mb-10">
                            What we can help with
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {helpTopics.map((topic) => (
                                <div
                                    key={topic.title}
                                    className="bg-white dark:bg-secondary-900 p-6 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm"
                                >
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base mb-2">{topic.title}</h3>
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">{topic.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Before you write */}
                    <section className="mt-16 bg-white dark:bg-secondary-900 p-8 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm">
                        <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                            Help us solve it in one reply
                        </h2>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                            Most questions can be answered in a single message if you include a few details:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm text-secondary-600 dark:text-secondary-400">
                            <li>The email address or phone number you signed up with (never your password or OTP).</li>
                            <li>The invoice number you are asking about, for example INV-2026-0042.</li>
                            <li>What you expected to happen and what happened instead, with a screenshot if possible.</li>
                            <li>Whether you were on a phone or a computer, and which browser you used.</li>
                            <li>For Pro payment questions, the Razorpay payment ID or the UPI transaction reference.</li>
                        </ul>
                    </section>

                    {/* FAQ */}
                    <section className="mt-16">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 dark:text-white text-center mb-10">
                            Support FAQs
                        </h2>
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {faqs.map((item) => (
                                <div key={item.q}>
                                    <h3 className="font-bold text-secondary-900 dark:text-white text-base mb-1">{item.q}</h3>
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
