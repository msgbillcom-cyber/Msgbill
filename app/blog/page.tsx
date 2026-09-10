import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";
import AdSenseAd from "@/components/ads/AdSenseAd";

export const metadata: Metadata = {
    title: "Billing & Invoicing Blog for Indian Businesses | MsgBill",
    description:
        "Learn how to invoice on WhatsApp, calculate GST, handle cash memos, recover overdue payments, and grow your Indian business with free expert guides.",
    keywords: [
        "invoicing tips",
        "WhatsApp business",
        "GST guide",
        "payment collection",
        "Indian business tips",
        "cash memo format",
        "free invoice maker",
    ],
};

const blogPosts = [
    {
        "slug": "bill-vs-invoice-difference",
        "title": "Bill vs Invoice: What's the Difference? (Explained for Indian Businesses)",
        "excerpt": "Learn the key differences between a bill and an invoice. Why it matters under GST and how to create both professionally.",
        "author": "MsgBill Team",
        "date": "2026-02-18",
        "readTime": "5 min read",
        "category": "Basics"
    },
    {
        "slug": "how-to-create-bill-on-whatsapp",
        "title": "How to Create a Bill on WhatsApp: Step-by-Step Guide (2026)",
        "excerpt": "Create and send a bill on WhatsApp in 5 simple steps. Get paid faster with WhatsApp bill maker for Indian businesses.",
        "author": "MsgBill Team",
        "date": "2026-02-18",
        "readTime": "6 min read",
        "category": "WhatsApp Business"
    },
    {
        "slug": "10-best-invoice-apps-india-2026",
        "title": "10 Best Invoice Apps for Indian Small Business 2026",
        "excerpt": "Compare MsgBill, Vyapar, Zoho, MyBillBook, and more. Find the right invoice app for your Indian business.",
        "author": "MsgBill Team",
        "date": "2026-02-18",
        "readTime": "8 min read",
        "category": "Software Comparison"
    },
    {
        "slug": "upi-payment-link-get-paid-faster",
        "title": "UPI Payment Link: How to Get Paid Faster (2026 Guide)",
        "excerpt": "Learn how UPI payment links work and how to add them to your invoices. Get paid in minutes, not days.",
        "author": "MsgBill Team",
        "date": "2026-02-18",
        "readTime": "5 min read",
        "category": "Payments"
    },
    {
        "slug": "gst-invoice-rules-2026-indian-business",
        "title": "GST Invoice Rules 2026: What Every Indian Business Must Know",
        "excerpt": "Mandatory fields, CGST vs SGST vs IGST, and common mistakes. Stay GST-compliant and avoid penalties.",
        "author": "MsgBill Team",
        "date": "2026-02-18",
        "readTime": "7 min read",
        "category": "GST Compliance"
    },
    {
        "slug": "whatsapp-invoice-guide",
        "title": "How to Send Invoices on WhatsApp in India (2026 Complete Guide)",
        "excerpt": "Learn how Indian businesses are getting paid 10x faster by sharing invoices on WhatsApp. Complete guide with free templates.",
        "author": "MsgBill Team",
        "date": "2026-01-28",
        "readTime": "8 min read",
        "category": "WhatsApp Business"
    },
    {
        "slug": "msgbill-vs-vyapar",
        "title": "MsgBill vs Vyapar: Which is Better for Your Business? (Honest 2026 Comparison)",
        "excerpt": "Detailed comparison of MsgBill and Vyapar. See which invoicing software is right for your Indian business.",
        "author": "MsgBill Team",
        "date": "2026-01-28",
        "readTime": "6 min read",
        "category": "Software Comparison"
    },
    {
        "slug": "gst-invoice-guide",
        "title": "GST Invoice Format: Complete Guide for Indian Businesses (2026)",
        "excerpt": "Everything you need to know about creating GST-compliant invoices. Free template included.",
        "author": "MsgBill Team",
        "date": "2026-01-29",
        "readTime": "10 min read",
        "category": "GST Compliance"
    },
    {
        "slug": "cash-memo-format-retail-shops-india",
        "title": "Cash Memo Format for Retail Shops in India (2026 Free Guide & Template)",
        "excerpt": "Complete legal rules for cash memos under GST. When to issue a cash memo vs a tax invoice, mandatory fields, and how to print free receipts.",
        "author": "MsgBill Team",
        "date": "2026-03-01",
        "readTime": "7 min read",
        "category": "Retail & GST"
    },
    {
        "slug": "gst-invoice-coaching-classes-tuitions",
        "title": "GST Invoice Guide for Coaching Classes, Tutors & Training Institutes",
        "excerpt": "SAC codes (9992), 18% GST applicability, exemption thresholds up to ₹20 Lakhs, and student fee receipt formats for tuition centers.",
        "author": "MsgBill Team",
        "date": "2026-03-02",
        "readTime": "8 min read",
        "category": "Education & Coaching"
    },
    {
        "slug": "medical-clinic-doctor-billing-receipt-format",
        "title": "Doctor & Clinic Billing Receipt Format: Complete Healthcare Guide (2026)",
        "excerpt": "Are doctor consultation fees exempt from GST? Health care service rules under Notification 12/2017, clinical OPD receipts, and pharmacy billing.",
        "author": "MsgBill Team",
        "date": "2026-03-03",
        "readTime": "9 min read",
        "category": "Healthcare"
    },
    {
        "slug": "freelance-invoice-foreign-clients-firc",
        "title": "Freelancer Invoicing for Foreign Clients: GST, FIRC, PayPal & Stripe Rules (2026)",
        "excerpt": "How to bill international clients zero GST legally using Letter of Undertaking (LUT). Complete guide to FIRCs, export of services, and payment compliance.",
        "author": "MsgBill Team",
        "date": "2026-03-04",
        "readTime": "10 min read",
        "category": "Freelancing"
    },
    {
        "slug": "proforma-invoice-vs-tax-invoice",
        "title": "Proforma Invoice vs Tax Invoice: 5 Key Legal Differences Explained (2026)",
        "excerpt": "Can a client claim input tax credit (ITC) on a proforma invoice? Why issuing a proforma saves tax before advance payment arrives.",
        "author": "MsgBill Team",
        "date": "2026-03-05",
        "readTime": "6 min read",
        "category": "Basics"
    },
    {
        "slug": "delivery-challan-vs-tax-invoice-gst",
        "title": "Delivery Challan vs Tax Invoice under GST: When to Issue What (2026 Guide)",
        "excerpt": "Rule 55 of CGST rules: moving goods for job work, exhibition, or sale on approval without a tax invoice. Mandatory challan serial numbering rules.",
        "author": "MsgBill Team",
        "date": "2026-03-06",
        "readTime": "7 min read",
        "category": "GST Compliance"
    },
    {
        "slug": "how-to-recover-overdue-payments-whatsapp",
        "title": "How to Recover Overdue Payments from Clients via WhatsApp (7 Polite Templates)",
        "excerpt": "Stop feeling awkward about asking for money. 7 battle-tested WhatsApp payment reminder templates that get overdue invoices settled in 24 hours.",
        "author": "MsgBill Team",
        "date": "2026-03-07",
        "readTime": "6 min read",
        "category": "Payments"
    }
];

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-secondary-950">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                {/* Hero Section */}
                <section className="pb-16 lg:pb-20 pt-8 bg-gradient-to-b from-primary-50/50 to-transparent">
                    <div className="container-wide text-center max-w-3xl mx-auto space-y-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-200">
                            Knowledge Base & Tutorials
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-secondary-900 dark:text-white">
                            Invoicing & GST Guides for Bharat
                        </h1>
                        <p className="text-lg text-secondary-600 dark:text-secondary-400">
                            Actionable tutorials on WhatsApp billing, GST compliance, payment collections, and SME growth.
                        </p>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="container-wide">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group"
                            >
                                <div className="aspect-video bg-gradient-to-br from-emerald-500/10 via-primary-500/10 to-teal-500/10 relative flex items-center justify-center border-b border-secondary-100 dark:border-secondary-800">
                                    <span className="text-5xl group-hover:scale-110 transition-transform">📄</span>
                                    <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider bg-white/90 dark:bg-secondary-800/90 text-emerald-600 px-3 py-1 rounded-full shadow-sm">
                                        {post.category}
                                    </span>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-secondary-100 dark:border-secondary-800 flex items-center justify-between text-xs text-secondary-400">
                                        <span>{post.readTime}</span>
                                        <span>{new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    </div>

                                    <Link href={`/blog/${post.slug}`}>
                                        <button className="w-full py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700 text-xs font-bold text-secondary-700 dark:text-secondary-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                                            Read Complete Guide →
                                        </button>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="container-wide mt-12">
                    <AdSenseAd
                        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INDEX}
                        format="horizontal"
                        label="Advertisement"
                    />
                </section>

                {/* Free Tool Callout */}
                <section className="container-wide mt-20">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl font-extrabold">
                                Need to create an invoice right now?
                            </h2>
                            <p className="text-emerald-100 text-sm">
                                Use our 100% Free Instant Bill Generator. No login required. Download PDF or share on WhatsApp in 10 seconds.
                            </p>
                        </div>
                        <Link
                            href="/free-invoice-generator"
                            className="px-8 py-4 bg-white text-emerald-800 font-bold rounded-2xl text-sm shadow-xl hover:bg-emerald-50 transition-all shrink-0"
                        >
                            Open Free Bill Generator →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
