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
    },
    "bill-vs-invoice-difference": {
        title: "Bill vs Invoice: What's the Difference? (Explained for Indian Businesses)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Basics",
        content: `
            <p class="mb-6 text-lg">"Bill" and "invoice" are often used interchangeably, but there are subtle differences that matter for Indian businesses, especially under GST. Here's what you need to know.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">What is a Bill?</h2>
            <p class="mb-4">A <strong>bill</strong> is a document requesting payment for goods or services already received. It's typically used in retail or B2C transactions—think restaurants, grocery stores, or quick service businesses. The customer pays immediately or within a short period.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">What is an Invoice?</h2>
            <p class="mb-4">An <strong>invoice</strong> is a formal document issued before or at the time of a sale, detailing what was sold, the amount due, payment terms, and tax breakdown. Invoices are standard in B2B and service businesses. Payment can be due later (e.g., net 15 or net 30).</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Key Differences</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Timing:</strong> Bills often accompany immediate payment; invoices usually have credit terms.</li>
                <li><strong>Formality:</strong> Invoices are more formal and GST-compliant; bills can be simpler.</li>
                <li><strong>Use case:</strong> Bill = retail/quick payment; Invoice = B2B, services, credit sales.</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Do You Need Both?</h2>
            <p class="mb-4">For most Indian small businesses, a single document that works as both—with proper GST details—is enough. MsgBill lets you create professional GST bills and invoices that work for retail and B2B.</p>
            
            <div class="bg-primary-50 p-6 rounded-xl my-8 border border-primary-100">
                <h3 class="font-bold text-primary-900 mb-2">Create bill or invoice on WhatsApp</h3>
                <p class="text-primary-800 mb-4">MsgBill works for both bills and invoices. Start free.</p>
                <a href="/auth/signup" class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors">Try MsgBill Free →</a>
            </div>
        `
    },
    "how-to-create-bill-on-whatsapp": {
        title: "How to Create a Bill on WhatsApp: Step-by-Step Guide (2026)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "WhatsApp Business",
        content: `
            <p class="mb-6 text-lg">Creating a bill on WhatsApp is one of the fastest ways to get paid in India. Here's a simple 5-step process that works for any small business.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Step 1: Choose Your Tool</h2>
            <p class="mb-4">You need a way to generate a proper bill or invoice. Options include Excel, Google Sheets, or a dedicated app like MsgBill. MsgBill is built for speed—you can create and send a bill in under 2 minutes.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Step 2: Add Business & Client Details</h2>
            <p class="mb-4">Include your business name, address, GSTIN (if registered), and bank/UPI details. Add your client's name, address, and phone number. This ensures your bill is professional and GST-compliant.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Step 3: Add Items & Amounts</h2>
            <p class="mb-4">List the products or services, quantities, rates, and let the tool calculate GST (CGST/SGST or IGST) and the total. Double-check the amounts before sending.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Step 4: Generate & Download (or Use Link)</h2>
            <p class="mb-4">Save as PDF or use a shareable link. MsgBill creates a link that your client can open on any device. No need to attach a heavy PDF.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Step 5: Share on WhatsApp</h2>
            <p class="mb-4">Open WhatsApp, find your client, paste the bill link or attach the PDF, add a short message like "Hi [Name], here's your bill for ₹X. Pay via the link. Thanks!" Send. Done.</p>
            
            <p class="mb-6">With MsgBill, Steps 2–5 happen in one flow. Create the bill, click "Share on WhatsApp," and a pre-filled message opens. One tap to send.</p>
            
            <div class="bg-primary-50 p-6 rounded-xl my-8 border border-primary-100">
                <h3 class="font-bold text-primary-900 mb-2">Create bill on WhatsApp in 2 minutes</h3>
                <p class="text-primary-800 mb-4">Free for 20 bills per month. No credit card needed.</p>
                <a href="/auth/signup" class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors">Start Free →</a>
            </div>
        `
    },
    "10-best-invoice-apps-india-2026": {
        title: "10 Best Invoice Apps for Indian Small Business 2026",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Software Comparison",
        content: `
            <p class="mb-6 text-lg">Finding the right invoice app for your Indian business can save hours and get you paid faster. Here are 10 top options for 2026, compared for small businesses and freelancers.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">1. MsgBill</h2>
            <p class="mb-4">Built for WhatsApp-first invoicing. Create bills and invoices in 2 minutes, share on WhatsApp with one click, get paid via UPI. Free tier: 20 invoices/month. Best for: homepreneurs, freelancers, small traders who already use WhatsApp for business.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">2. Vyapar</h2>
            <p class="mb-4">Full-featured accounting and inventory. Good for shops with lots of stock. Can be complex for simple billing needs. Paid plans.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">3. Zoho Invoice</h2>
            <p class="mb-4">Part of Zoho suite. Professional invoices, recurring billing, time tracking. Free for 1 user. Best for: agencies and consultants.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">4. MyBillBook</h2>
            <p class="mb-4">Popular among retailers. GST billing, inventory, daily sales. Mobile app focused. Free tier available.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">5. Clear (formerly Cleartax)</h2>
            <p class="mb-4">Tax and invoicing. Strong GST compliance. Suits businesses that need tax filing too.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">6–10. Honorable Mentions</h2>
            <p class="mb-4">FreshBooks (good for freelancers), Wave (free), Tally (enterprise), OkCredit (credit tracking), Marg (accounting).</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">How to Choose</h2>
            <p class="mb-4">Ask: Do I mainly need fast billing and WhatsApp sharing? → MsgBill. Do I need heavy inventory and accounting? → Vyapar or Zoho. Do I need tax filing? → Clear.</p>
        `
    },
    "upi-payment-link-get-paid-faster": {
        title: "UPI Payment Link: How to Get Paid Faster (2026 Guide)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">A UPI payment link turns your invoice into a one-click pay button. Your client opens the link, enters the amount (or it's pre-filled), and pays via GPay, PhonePe, or any UPI app. You get the money in minutes.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Why UPI Payment Links Work</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>No cash or bank details needed</strong>—everything happens in the UPI app.</li>
                <li><strong>Instant settlement</strong>—money reaches your bank in real-time.</li>
                <li><strong>Less friction</strong>—client pays without opening another app or copying account numbers.</li>
                <li><strong>Trackable</strong>—you know exactly when payment is received.</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">How to Add UPI Links to Your Invoices</h2>
            <p class="mb-4">Option 1: Use your UPI ID (e.g., you@paytm) and ask the client to pay to that ID with the invoice amount. Option 2: Use a payment link generator. MsgBill and Razorpay create links that pre-fill the amount. Client clicks, pays, done.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Best Practices</h2>
            <p class="mb-4">Include the payment link in the WhatsApp message with your invoice. Add a short note: "Pay here: [link]". Follow up after 2 days if unpaid. Keep your UPI ID visible on the invoice for clients who prefer manual payment.</p>
            
            <div class="bg-primary-50 p-6 rounded-xl my-8 border border-primary-100">
                <h3 class="font-bold text-primary-900 mb-2">Auto-add UPI payment links to every invoice</h3>
                <p class="text-primary-800 mb-4">MsgBill includes payment links when you share on WhatsApp.</p>
                <a href="/auth/signup" class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors">Try Free →</a>
            </div>
        `
    },
    "gst-invoice-rules-2026-indian-business": {
        title: "GST Invoice Rules 2026: What Every Indian Business Must Know",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">GST rules for invoices can change. Here's what Indian businesses must know in 2026 to stay compliant and avoid penalties.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Fields on a GST Invoice</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Invoice number (consecutive, unique)</li>
                <li>Invoice date</li>
                <li>Supplier name, address, GSTIN</li>
                <li>Customer name, address, GSTIN (if registered)</li>
                <li>Place of supply</li>
                <li>HSN/SAC code</li>
                <li>Taxable value, tax rate, CGST/SGST/IGST, total</li>
                <li>Reverse charge mention (if applicable)</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">CGST vs SGST vs IGST</h2>
            <p class="mb-4"><strong>Intra-state:</strong> Same state → CGST + SGST. <strong>Inter-state:</strong> Different state → IGST. Your software should auto-calculate based on place of supply. MsgBill does this when you select business and client state.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes That Lead to Penalties</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Wrong tax rate (e.g., 18% on 5% items)</li>
                <li>Missing HSN/SAC codes</li>
                <li>Incorrect place of supply</li>
                <li>Duplicate or non-sequential invoice numbers</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Digital Invoices: Are They Valid?</h2>
            <p class="mb-4">Yes. PDF invoices sent via email or WhatsApp are valid under GST. Rule 46 allows digital invoices. Keep them accessible for audit.</p>
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
