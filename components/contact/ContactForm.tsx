"use client";

import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // MsgBill WhatsApp support desk (+91 9148868413).
    const SUPPORT_WHATSAPP = "919148868413";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // There is no backend inbox for this form, so hand the message to the
        // support desk on WhatsApp (pre-filled) instead of silently dropping it.
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        const message = String(data.get("message") || "").trim();

        const text =
            `Hi MsgBill Team, I have a query.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            (phone ? `Phone: ${phone}\n` : "") +
            `\n${message}`;

        const url = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(text)}`;
        const win = window.open(url, "_blank");
        if (!win) {
            window.location.href = url;
        }

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
                    Almost done!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto">
                    We opened WhatsApp with your message to MsgBill support (+91 9148868413). Tap Send in WhatsApp to deliver it. Prefer email? Write to{" "}
                    <a href="mailto:support@msgbill.com" className="underline font-semibold">support@msgbill.com</a>.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-emerald-600 underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                    Your Full Name *
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                    Email Address *
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="ramesh@example.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                    Phone / WhatsApp Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                    Message / Question *
                </label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we help your business?"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl outline-none focus:border-emerald-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <Send className="w-4 h-4" /> {loading ? "Opening WhatsApp..." : "Send via WhatsApp"}
            </button>
        </form>
    );
}
