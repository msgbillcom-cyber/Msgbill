"use client";

import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 600);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
                    Message Received!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto">
                    Thank you for reaching out. Our support team will review your inquiry and reply to your email within 24 hours.
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
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                    Message / Question *
                </label>
                <textarea
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
                <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
