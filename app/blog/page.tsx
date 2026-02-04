import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - Invoicing Tips for Indian Businesses | MsgBill",
    description:
        "Learn how to invoice on WhatsApp, calculate GST, get paid faster, and grow your business. Free guides for Indian entrepreneurs.",
    keywords: [
        "invoicing tips",
        "WhatsApp business",
        "GST guide",
        "payment collection",
        "Indian business tips",
    ],
};

// Blog posts data - will be moved to CMS later
const blogPosts = [
    {
        slug: "whatsapp-invoice-guide",
        title:
            "How to Send Invoices on WhatsApp in India (2026 Complete Guide)",
        excerpt:
            "Learn how Indian businesses are getting paid 10x faster by sharing invoices on WhatsApp. Complete guide with free templates.",
        author: "MsgBill Team",
        date: "2026-01-28",
        readTime: "8 min read",
        category: "WhatsApp Business",
        image: "/blog/whatsapp-invoice.jpg",
    },
    {
        slug: "msgbill-vs-vyapar",
        title:
            "MsgBill vs Vyapar: Which is Better for Your Business? (Honest 2026 Comparison)",
        excerpt:
            "Detailed comparison of MsgBill and Vyapar. See which invoicing software is right for your Indian business.",
        author: "MsgBill Team",
        date: "2026-01-28",
        readTime: "6 min read",
        category: "Software Comparison",
        image: "/blog/comparison.jpg",
    },
    {
        slug: "gst-invoice-guide",
        title:
            "GST Invoice Format: Complete Guide for Indian Businesses (2026)",
        excerpt:
            "Everything you need to know about creating GST-compliant invoices. Free template included.",
        author: "MsgBill Team",
        date: "2026-01-29",
        readTime: "10 min read",
        category: "GST Compliance",
        image: "/blog/gst-guide.jpg",
    },
];

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 pt-32">
                {/* Hero Section */}
                <section className="pb-16 lg:pb-24 pt-8 lg:pt-12 bg-gradient-to-br from-primary-50 to-white">
                    <div className="container-wide">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
                                Invoicing Tips for Indian Businesses
                            </h1>
                            <p className="text-xl text-secondary-600">
                                Learn how to invoice smarter, get paid faster,
                                and grow your business with our free guides.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-16 lg:py-24">
                    <div className="container-wide">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="glass-card rounded-2xl overflow-hidden hover-lift transition-smooth group"
                                >
                                    {/* Featured Image */}
                                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center text-primary-600 text-6xl">
                                            📄
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category */}
                                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                                            {post.category}
                                        </span>

                                        {/* Title */}
                                        <h2 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-secondary-600 mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-sm text-secondary-500">
                                            <span>{post.readTime}</span>
                                            <span>
                                                {new Date(post.date)
                                                    .toLocaleDateString(
                                                        "en-IN",
                                                    )}
                                            </span>
                                        </div>

                                        {/* Read More */}
                                        <Link href={`/blog/${post.slug}`}>
                                            <button className="mt-4 w-full py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors">
                                                Read Article →
                                            </button>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Coming Soon */}
                        <div className="mt-12 text-center">
                            <p className="text-secondary-600 mb-4">
                                More invoicing tips coming soon! Subscribe to
                                get notified.
                            </p>
                            <div className="inline-flex gap-2 max-w-md">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-2 border-2 border-secondary-200 rounded-lg focus:border-primary-500 focus:outline-none"
                                />
                                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                    <div className="container-wide text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Ready to Start Invoicing Smarter?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Join 1,000+ Indian businesses using MsgBill
                        </p>
                        <Link href="/auth/signup">
                            <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                                Start Free Trial - 10 Invoices →
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
