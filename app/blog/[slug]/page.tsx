import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// This would normally come from a CMS or database
const blogPosts: Record<string, any> = {
    "whatsapp-invoice-guide": {
        title: "How to Send Invoices on WhatsApp in India (2026 Complete Guide)",
        date: "2026-01-28",
        author: "MsgBill Team",
        category: "WhatsApp Business",
        content: `
            <p class="mb-6 text-lg">In 2026, WhatsApp is no longer just for chatting—it's the most powerful tool for Indian businesses to collect payments. If you're still emailing invoices or printing them out, you're losing time and money.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Why WhatsApp Invoicing Wins</h2>
            <p class="mb-4">Did you know that WhatsApp messages have a 98% open rate compared to just 20% for email? When you send an invoice on WhatsApp:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Your client sees it instantly.</li>
                <li>They can pay immediately using UPI.</li>
                <li>You can track if they've read it (blue ticks).</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Create a WhatsApp Invoice with MsgBill</h2>
            <p class="mb-4">We built MsgBill specifically to solve this problem. Here is how you can send your first invoice in 30 seconds:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Sign Up</strong> for a free MsgBill account.</li>
                <li><strong>Click "New Invoice"</strong> and enter your client's details.</li>
                <li><strong>Hit "Send on WhatsApp"</strong>. We automatically format a professional message with a PDF link.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Is it Legal in India?</h2>
            <p class="mb-4">Yes! Under GST laws, a digital invoice (PDF) sent via electronic means is perfectly valid. MsgBill ensures your invoices meet all GST requirements (Rule 46 of CGST Rules).</p>

            <div class="bg-blue-50 p-6 rounded-xl my-8 border border-blue-100">
                <h3 class="font-bold text-blue-900 mb-2">Ready to get paid faster?</h3>
                <p class="text-blue-800 mb-4">Join 1,000+ Indian businesses using MsgBill today.</p>
                <a href="/auth/signup" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">Create Free Invoice Now</a>
            </div>
        `
    },
    "msgbill-vs-vyapar": {
        title: "MsgBill vs Vyapar: Which is Better for Your Business? (Honest 2026 Comparison)",
        date: "2026-01-28",
        author: "MsgBill Team",
        category: "Software Comparison",
        content: `
            <p class="mb-6 text-lg">Choosing the right billing software is tough. Vyapar is a giant in the industry, but MsgBill is the modern challenger built for speed. Let's compare them fairly.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">1. Speed of Invoicing</h2>
            <p class="mb-4"><strong>MsgBill:</strong> Built for "10-second invoicing". Our interface is minimal and focuses purely on getting the bill out via WhatsApp.</p>
            <p class="mb-4"><strong>Vyapar:</strong> Feature-rich but can be complex. Great if you need inventory management, but slower for just billing.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Platform Support</h2>
            <p class="mb-4"><strong>MsgBill:</strong> Cloud-based. Works on any phone, laptop, or tablet without installation.</p>
            <p class="mb-4"><strong>Vyapar:</strong> Primarily desktop/app-based. Data syncing can sometimes be an issue across devices.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Cost</h2>
            <p class="mb-4"><strong>MsgBill:</strong> Generous free tier for small businesses. Pro plan is affordable.</p>
            <p class="mb-4"><strong>Vyapar:</strong> Paid licenses can be expensive for micro-businesses.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Verdict</h2>
            <p class="mb-4">If you need full inventory and barcode scanning, go with Vyapar. If you want <strong>speed, simplicity, and WhatsApp integration</strong>, MsgBill is the winner.</p>
        `
    },
    "gst-invoice-guide": {
        title: "GST Invoice Format: Complete Guide for Indian Businesses (2026)",
        date: "2026-01-29",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">Creating a GST-compliant invoice is mandatory for registered businesses. One mistake can lead to penalties. Here is your checklist.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Fields for a Valid GST Invoice</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Invoice Number & Date:</strong> Must be consecutive and unique.</li>
                <li><strong>Supplier Details:</strong> Name, Address, and GSTIN.</li>
                <li><strong>Customer Details:</strong> Name, Address, and GSTIN (if registered).</li>
                <li><strong>HSN/SAC Code:</strong> Mandatory for businesses with turnover > ₹5Cr (and recommended for all).</li>
                <li><strong>Tax Breakdown:</strong> CGST, SGST, and IGST must be shown separately.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes to Avoid</h2>
            <p class="mb-4">1. <strong>Missing Place of Supply:</strong> Crucial for determining IGST vs CGST/SGST.</p>
            <p class="mb-4">2. <strong>Incorrect Rates:</strong> Charging 18% on food items (5%) is a common error.</p>

            <p class="mb-6">MsgBill automates all of this. Just select your state and your client's state, and we calculate the correct tax automatically.</p>
        `
    }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts[params.slug];
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | MsgBill Blog`,
        description: `Read about ${post.title}. ${post.category} tips for Indian businesses.`,
        openGraph: {
            title: post.title,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        }
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": "https://msgbill.com/og-image.png",
        "author": {
            "@type": "Organization",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "MsgBill",
            "logo": {
                "@type": "ImageObject",
                "url": "https://msgbill.com/logo-final.png"
            }
        },
        "datePublished": post.date,
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="flex-1 py-12 lg:py-20">
                <article className="container max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                            {post.category}
                        </span>
                        <h1 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center text-secondary-500 text-sm gap-4">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {/* Featured Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl mb-12 flex items-center justify-center text-secondary-400">
                        <span className="text-6xl">📝</span>
                    </div>

                    {/* Content */}
                    <div 
                        className="prose prose-lg prose-blue mx-auto text-secondary-700"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA */}
                    <div className="mt-16 p-8 bg-secondary-50 rounded-2xl text-center border border-secondary-100">
                        <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                            Start creating invoices like this?
                        </h3>
                        <p className="text-secondary-600 mb-6">
                            Join MsgBill today and professionalize your business in minutes.
                        </p>
                        <Link href="/auth/signup">
                            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg">
                                Get Started for Free
                            </button>
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    );
}
