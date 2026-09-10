import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdSenseAd from "@/components/ads/AdSenseAd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Master Blog Content Dictionary (15 In-Depth Articles)
const blogPosts: Record<string, any> = {
    "whatsapp-invoice-guide": {
        title: "How to Send Invoices on WhatsApp in India (2026 Complete Guide)",
        date: "2026-01-28",
        author: "MsgBill Team",
        category: "WhatsApp Business",
        content: `
            <p class="mb-6 text-lg">Email invoices often sit unread. In India, WhatsApp is where customers respond — and where UPI payments happen on the same screen.</p>
            <p class="mb-6">This guide covers a practical WhatsApp invoicing workflow for shops, freelancers, and GST-registered sellers. Educational only; not tax advice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Send a PDF + short payment message, not a notebook photo.</li>
                <li>Put UPI ID or payment link in the first message.</li>
                <li>Keep invoice numbers sequential if you are GST-registered.</li>
                <li>Start free on the MsgBill generator; upgrade for history and reminders.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Why WhatsApp Beats Email for Collections</h2>
            <p class="mb-4">Customers already chat with vendors on WhatsApp. Delivery ticks and instant UPI make same-day payment realistic for many small invoices.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Create & Send with MsgBill</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Open the <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free invoice generator</a> or sign in to the dashboard.</li>
                <li>Enter business + client details, line items, and GST slab.</li>
                <li>Choose intra-state (CGST+SGST) or inter-state (IGST).</li>
                <li>Download PDF and/or tap Send to WhatsApp.</li>
                <li>Add your UPI ID in the chat if it is not already on the PDF.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Is a WhatsApp Invoice Legal?</h2>
            <p class="mb-4">GST focuses on invoice content (Rule 46 fields, numbering, tax), not the chat app. Keep your own archive. MsgBill helps produce a clean PDF; you remain responsible for compliance.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Reminder Rhythm</h2>
            <p class="mb-4">Day 0: send. Day 3: friendly nudge. Day 7: firm reminder. Day 14: final notice before pausing work.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Do I need WhatsApp Business API?</strong></p>
            <p class="mb-4">Not for manual sends from your phone. API is for automated scale.</p>
            <p class="mb-2"><strong>Can guests use MsgBill without signup?</strong></p>
            <p class="mb-6">Yes. The free generator needs no login. Accounts remove ads and store invoices for 1 year.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Ready to get paid faster?</h3>
                <p class="text-emerald-800 mb-4">Create a bill in seconds and share on WhatsApp.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
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
            <p class="mb-4"><strong>Vyapar:</strong> Feature-rich but can be complex. Great if you need heavy inventory management, but slower for quick billing.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Platform Support</h2>
            <p class="mb-4"><strong>MsgBill:</strong> Cloud-based. Works on any phone, laptop, or tablet without installation.</p>
            <p class="mb-4"><strong>Vyapar:</strong> Primarily desktop/app-based. Data syncing can sometimes be an issue across devices.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Cost & Free Access</h2>
            <p class="mb-4"><strong>MsgBill:</strong> Offers a 100% free instant invoice maker without login, plus a generous free monthly plan for small businesses.</p>
            <p class="mb-4"><strong>Vyapar:</strong> Paid desktop licenses can be expensive for homepreneurs and micro-enterprises.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Verdict</h2>
            <p class="mb-4">If you need barcode scanning and heavy warehouse tracking, choose Vyapar. If you want <strong>speed, simplicity, and WhatsApp payment collection</strong>, MsgBill is the winner.</p>
        `
    },
    "gst-invoice-guide": {
        title: "GST Invoice Format: Complete Guide for Indian Businesses (2026)",
        date: "2026-01-29",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">A GST tax invoice is the primary document for registered supplies in India. Wrong fields or tax splits create return mismatches and buyer ITC issues. Use this as a practical checklist — not a substitute for your CA.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Rule 46-style fields: number, date, supplier/buyer, HSN/SAC, tax breakup.</li>
                <li>Intra-state → CGST+SGST; inter-state → IGST (place of supply matters).</li>
                <li>Keep a unique sequential series for the financial year.</li>
                <li>Generate a draft fast with MsgBill, then verify before filing.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Fields (Practical List)</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Invoice number & date</strong> — consecutive; letters/numbers/hyphen/slash only.</li>
                <li><strong>Supplier</strong> — name, address, GSTIN.</li>
                <li><strong>Recipient</strong> — name, address; GSTIN for typical B2B.</li>
                <li><strong>HSN/SAC</strong> — digit rules depend on turnover; when in doubt, ask your CA.</li>
                <li><strong>Tax breakup</strong> — CGST/SGST or IGST, rate and amount per line or summary.</li>
                <li><strong>Place of supply</strong> — drives IGST vs CGST/SGST.</li>
                <li><strong>Signature / digital acknowledgement</strong> as applicable to your process.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">CGST + SGST vs IGST</h2>
            <p class="mb-4">Same state supply usually splits the rate into CGST and SGST. Different state supply usually charges IGST at the full rate. Reverse charge and special categories need professional advice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Missing place of supply.</li>
                <li>Wrong slab (e.g. 18% on a 5% item).</li>
                <li>Duplicate or reset invoice numbers mid-year.</li>
                <li>Sending only a WhatsApp text without a proper PDF for B2B ITC.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">E-Invoice Note</h2>
            <p class="mb-4">Businesses above the notified turnover threshold must generate IRN via the Invoice Registration Portal. Thresholds change — confirm the current limit before assuming you are exempt.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Create a Clean Format Fast</h2>
            <p class="mb-6">Use the <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free GST invoice generator</a> to draft CGST/SGST or IGST bills, download PDF, and share on WhatsApp. Sign up later for ad-free storage.</p>
        `
    },
    "bill-vs-invoice-difference": {
        title: "Bill vs Invoice: What's the Difference? (Explained for Indian Businesses)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Basics",
        content: `
            <p class="mb-6 text-lg">In everyday Hindi and English, people say “bill bhej do” for almost any payment request. Under GST, the document type matters: a retail <strong>bill</strong> or cash memo is not the same as a <strong>tax invoice</strong> that unlocks Input Tax Credit (ITC).</p>
            <p class="mb-6">This guide explains the difference for Indian shops, freelancers, and registered businesses — without legalese. It is educational, not tax advice; confirm edge cases with your CA.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>A <strong>bill / cash memo</strong> usually means pay-now retail (B2C).</li>
                <li>A <strong>tax invoice</strong> is the GST document for registered supplies and ITC.</li>
                <li>Buyers need a proper tax invoice (with GSTIN where required) to claim ITC.</li>
                <li>You can create either format online with MsgBill’s <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free invoice generator</a> (no login).</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is a Bill?</h2>
            <p class="mb-4">A <strong>bill</strong> is commonly used when goods or services are delivered with immediate payment: kirana counters, restaurants, salons, hardware shops. Payment is often cash, UPI, or card at the counter. Many unregistered sellers also issue simple commercial bills.</p>
            <p class="mb-4">Under GST, small-value retail supplies may use a consolidated cash memo in limited situations (for example where the law allows for low-value B2C supplies). For day-to-day practice, think of a bill as a customer-facing receipt of what was sold and what was paid.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is an Invoice (Tax Invoice)?</h2>
            <p class="mb-4">An <strong>invoice</strong> — specifically a <strong>tax invoice</strong> — is the commercial document registered persons issue under the CGST Rules (including Rule 46 mandatory fields). It records the supply, tax breakup (CGST/SGST or IGST), and often credit terms (Net 7 / Net 15 / Net 30).</p>
            <p class="mb-4">B2B buyers typically need this document to claim ITC in their returns. Missing GSTIN, wrong place of supply, or broken invoice numbering can create notices later.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Differences at a Glance</h2>
            <table class="w-full text-left border-collapse my-6 border border-slate-200">
                <thead>
                    <tr class="bg-slate-100"><th class="p-3 border">Feature</th><th class="p-3 border">Bill / Cash Memo</th><th class="p-3 border">Tax Invoice</th></tr>
                </thead>
                <tbody>
                    <tr><td class="p-3 border font-semibold">Primary use</td><td class="p-3 border">Retail, B2C, immediate pay</td><td class="p-3 border">B2B, credit sales, registered supplies</td></tr>
                    <tr><td class="p-3 border font-semibold">Input Tax Credit</td><td class="p-3 border">Usually not claimed</td><td class="p-3 border">Buyer may claim if eligible</td></tr>
                    <tr><td class="p-3 border font-semibold">Customer GSTIN</td><td class="p-3 border">Often optional</td><td class="p-3 border">Required for typical B2B tax invoices</td></tr>
                    <tr><td class="p-3 border font-semibold">Tax lines</td><td class="p-3 border">May be nil / inclusive</td><td class="p-3 border">CGST+SGST or IGST shown clearly</td></tr>
                    <tr><td class="p-3 border font-semibold">Numbering</td><td class="p-3 border">Shop series</td><td class="p-3 border">Unique sequential series for the FY</td></tr>
                </tbody>
            </table>

            <h2 class="text-2xl font-bold mt-8 mb-4">Which One Should You Send on WhatsApp?</h2>
            <p class="mb-4">If the customer paid at the counter, a clear bill/receipt with UPI reference is enough for most retail disputes. If the buyer is a registered business that needs ITC, send a <strong>tax invoice PDF</strong> with GSTIN, HSN/SAC, place of supply, and tax split — then share on WhatsApp so it is opened on mobile.</p>
            <p class="mb-4">MsgBill is built for that WhatsApp-first workflow: generate → PDF → <code>wa.me</code> share. Guests can try it free; accounts keep history for a year without ads.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Calling every PDF an “invoice” when it lacks Rule 46 fields.</li>
                <li>Reusing the same invoice number after edits.</li>
                <li>Charging IGST on an intra-state supply (or the reverse).</li>
                <li>Promising ITC on a document that is only a commercial estimate or proforma.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Is a WhatsApp PDF legally valid?</strong></p>
            <p class="mb-4">Digital invoices are widely used; validity depends on content and your registration status, not the chat app. Keep your own copy for records.</p>
            <p class="mb-2"><strong>Do I need GST registration to make a bill?</strong></p>
            <p class="mb-4">No. Unregistered sellers still issue commercial bills. Tax invoices with GST charge apply once you are registered (subject to thresholds and exemptions).</p>
            <p class="mb-2"><strong>Proforma vs tax invoice?</strong></p>
            <p class="mb-6">A proforma is a quotation-style document before supply; it is not a tax invoice for ITC. See our proforma vs tax invoice guide for details.</p>

            <p class="mb-4">Create a clean bill or GST-style invoice in minutes on the <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free generator</a>, or <a href="/auth/signup" class="text-emerald-600 underline font-semibold">sign up</a> for an ad-free dashboard with 1-year storage.</p>
        `
    },
    "how-to-create-bill-on-whatsapp": {
        title: "How to Create a Bill on WhatsApp: Step-by-Step Guide (2026)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "WhatsApp Business",
        content: `
            <p class="mb-6 text-lg">Most Indian customers check WhatsApp before email. Sending a clear bill with amount, UPI, and PDF on chat often gets you paid the same day.</p>
            <p class="mb-6">Here is a practical workflow you can run from a phone — no desktop software required.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Create the bill in a browser tool, then open WhatsApp with one tap.</li>
                <li>Include amount, due date, and UPI ID in the message body.</li>
                <li>Attach or link a PDF for GST-registered buyers who need records.</li>
                <li>Use reminders (friendly → firm) if payment slips.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Step-by-Step: Bill on WhatsApp in 5 Minutes</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-3">
                <li><strong>Open</strong> the <a href="/free-invoice-generator" class="text-emerald-600 underline font-bold">MsgBill Free Invoice Generator</a> (no login).</li>
                <li><strong>Enter</strong> your business name, phone, and GSTIN if you have one.</li>
                <li><strong>Add</strong> the customer name and phone (WhatsApp number).</li>
                <li><strong>List</strong> items with qty, rate, and GST % if applicable. Choose intra-state or inter-state tax.</li>
                <li><strong>Tap Send to WhatsApp</strong> — review the pre-filled text, pick the chat, send. Optionally download PDF first and attach.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">What to Put in the WhatsApp Message</h2>
            <p class="mb-4">A good message is short:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Invoice / bill number and date</li>
                <li>Total payable in ₹</li>
                <li>UPI ID or payment link</li>
                <li>One-line description of work/goods</li>
                <li>Polite due date (“Kindly pay by Friday”)</li>
            </ul>
            <p class="mb-4">Avoid long paragraphs. Customers decide on mobile screens.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">UPI + WhatsApp = Faster Collection</h2>
            <p class="mb-4">When the chat includes your UPI ID or a Razorpay payment link, the customer does not hunt for bank details. They pay in GPay / PhonePe / Paytm and reply “paid” with a screenshot.</p>
            <p class="mb-4">Logged-in MsgBill users can store invoices and run structured reminders later. Guests still get the free one-off PDF + WhatsApp share.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GST Tip for WhatsApp Bills</h2>
            <p class="mb-4">If you are GST-registered, ensure the PDF shows tax breakup and consecutive numbering. WhatsApp is only the delivery channel — the PDF is the record.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Do I need WhatsApp Business API?</strong></p>
            <p class="mb-4">No for manual sending from your phone. API is for automated bulk messaging at scale.</p>
            <p class="mb-2"><strong>Can I send without GST?</strong></p>
            <p class="mb-4">Yes — use 0% tax lines for a commercial bill. Register when your turnover/category requires it.</p>
            <p class="mb-6"><strong>Will ads appear?</strong> On the free public tool, yes. Sign up for an ad-free dashboard.</p>

            <p class="mb-4">Try it now: <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free bill generator</a> → WhatsApp. Or <a href="/auth/signup" class="text-emerald-600 underline font-semibold">create a free account</a> to save invoices for 1 year.</p>
        `
    },
    "10-best-invoice-apps-india-2026": {
        title: "10 Best Invoice Apps for Indian Small Business 2026",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Software Comparison",
        content: `
            <p class="mb-6 text-lg">Indian SMBs need GST fields, UPI, and WhatsApp — not US-only tools. Below is a practical shortlist for 2026. Features change; verify pricing on each vendor’s site before you buy.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">How We Compared</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>WhatsApp / mobile sharing ease</li>
                <li>GST (CGST/SGST/IGST) support</li>
                <li>UPI / payment collection</li>
                <li>Free tier usefulness for micro businesses</li>
                <li>Fit for shops vs freelancers vs agencies</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">The 10 Apps</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-3">
                <li><strong>MsgBill</strong> — Best for WhatsApp-native bills, free no-login generator, UPI-oriented collection. Pro ₹499/year.</li>
                <li><strong>Vyapar</strong> — Strong for retail inventory and desktop POS-style workflows.</li>
                <li><strong>MyBillBook</strong> — Popular mobile billing for local stores.</li>
                <li><strong>Zoho Invoice</strong> — Clean cloud invoicing for consultants and agencies.</li>
                <li><strong>Refrens</strong> — Freelancer proposals + invoices.</li>
                <li><strong>Busy</strong> — Accounting-heavy GST books for growing traders.</li>
                <li><strong>TallyPrime</strong> — Deep accounting; steeper learning curve.</li>
                <li><strong>Clear (ClearTax) Invoice / GST suite</strong> — Strong around compliance and larger GST ops.</li>
                <li><strong>QuickBooks Online</strong> — Cross-border freelancers; check India GST fit for your case.</li>
                <li><strong>Marg ERP / similar retail ERPs</strong> — Distribution and pharma-style inventory (heavier setups).</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Who Should Pick What</h2>
            <p class="mb-4"><strong>Kirana / salon / local services:</strong> MsgBill or MyBillBook for speed on phone.</p>
            <p class="mb-4"><strong>Inventory-heavy retail:</strong> Vyapar, Busy, or Marg-class tools.</p>
            <p class="mb-4"><strong>Agency / IT:</strong> Zoho Invoice or MsgBill if WhatsApp collection matters most.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Try Before You Commit</h2>
            <p class="mb-6">Generate one GST-style bill free on <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">msgbill.com/free-invoice-generator</a>, share on WhatsApp, and see if the flow fits your customers. No card required.</p>
        `
    },
    "upi-payment-link-get-paid-faster": {
        title: "UPI Payment Link: How to Get Paid Faster (2026 Guide)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">UPI handles over 14 billion transactions monthly in India. Adding a direct UPI payment link to your invoices eliminates payment delays.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">How UPI Invoicing Works</h2>
            <p class="mb-4">Instead of asking clients to copy 16-digit bank account numbers and IFSC codes, MsgBill embeds your UPI ID directly into your WhatsApp invoice.</p>
            <p class="mb-4">The customer taps the link on their mobile, their phone opens Google Pay, PhonePe, or Paytm with the exact invoice amount pre-filled, and they authenticate with their UPI PIN in 5 seconds.</p>
        `
    },
    "gst-invoice-rules-2026-indian-business": {
        title: "GST Invoice Rules 2026: What Every Indian Business Must Know",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">A review of critical statutory requirements under CGST Rule 46 and e-invoicing thresholds in 2026.</p>
            <h2 class="text-2xl font-bold mt-8 mb-4">Core Compliance Requirements</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Sequential Numbering:</strong> Must not restart randomly or have duplicate invoice numbers in a financial year.</li>
                <li><strong>E-Invoicing Threshold:</strong> Businesses exceeding ₹5 Crore annual turnover must generate an IRN (Invoice Reference Number) via the IRP portal.</li>
                <li><strong>HSN Code Digits:</strong> 4 digits for turnover up to ₹5Cr; 6 digits for turnover above ₹5Cr.</li>
            </ul>
        `
    },

    // --- 7 NEW COMPREHENSIVE PILLAR ARTICLES ---

    "cash-memo-format-retail-shops-india": {
        title: "Cash Memo Format for Retail Shops in India (2026 Free Guide & Template)",
        date: "2026-03-01",
        author: "MsgBill Team",
        category: "Retail & GST",
        content: `
            <p class="mb-6 text-lg">For retail shop owners, grocery merchants, garment outlets, and small traders in India, issuing a clear, legal <strong>cash memo</strong> is essential for bookkeeping and customer trust.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is a Cash Memo?</h2>
            <p class="mb-4">A cash memo is a commercial document issued by a seller to a buyer when goods or services are sold for immediate cash, UPI, or card payment. Unlike a credit invoice where payment is delayed, a cash memo proves that payment was completed simultaneously with the transaction.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Is a Cash Memo Required Under GST?</h2>
            <p class="mb-4">Under Section 31(3)(b) of the CGST Act, if the value of goods or services supplied is less than ₹200 and the buyer does not require a tax invoice, a registered person can issue a consolidated daily cash memo. However, for any sale above ₹200, an itemized cash receipt or invoice is mandatory.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Elements of a Valid Cash Memo</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Shop Name & Address:</strong> Clearly printed at the top.</li>
                <li><strong>Cash Memo Serial Number:</strong> Sequential numbering for audit tracking.</li>
                <li><strong>Date of Sale:</strong> Day, month, and year of purchase.</li>
                <li><strong>Item Description & Quantity:</strong> Name of goods sold with piece or weight count.</li>
                <li><strong>Rate & Total Amount:</strong> Unit price multiplied by quantity.</li>
                <li><strong>Payment Mode:</strong> Cash, UPI (GPay/PhonePe), or Debit Card.</li>
                <li><strong>GST Details (If Registered):</strong> Applicable CGST and SGST rates.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Create Cash Memos on Your Phone</h2>
            <p class="mb-4">Paper cash memo books are prone to tearing, ink fading, and math mistakes. With <a href="/free-invoice-generator" class="text-emerald-600 underline font-bold">MsgBill's Free Bill Maker</a>, you can enter items on your smartphone in 10 seconds, calculate totals automatically, and send a digital cash memo directly to your customer's WhatsApp.</p>
        `
    },

    "gst-invoice-coaching-classes-tuitions": {
        title: "GST Invoice Guide for Coaching Classes, Tutors & Training Institutes",
        date: "2026-03-02",
        author: "MsgBill Team",
        category: "Education & Coaching",
        content: `
            <p class="mb-6 text-lg">Coaching centers, competitive exam tutors (IIT-JEE, NEET, UPSC), and edtech educators across India frequently struggle with GST applicability on student fees.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Are Coaching Classes Exempt from GST?</h2>
            <p class="mb-4"><strong>No.</strong> Unlike formal educational institutions (schools, recognized colleges offering degrees), private coaching centers, tuition classes, and vocational training institutes are <strong>NOT exempt from GST</strong>. They are categorized as commercial training and coaching services.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GST Rate and SAC Code for Education</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Applicable GST Rate:</strong> 18% (9% CGST + 9% SGST for intra-state students).</li>
                <li><strong>SAC Code:</strong> <code>9992</code> (Commercial training and coaching services) or <code>999293</code> (Commercial coaching services).</li>
                <li><strong>Registration Threshold:</strong> If your aggregate fee collection exceeds ₹20 Lakhs per financial year (₹10 Lakhs in Special Category States), GST registration is mandatory.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Student Fee Receipt Format</h2>
            <p class="mb-4">When parents pay course fees, an official receipt must detail: Course Name (e.g. Class 10 Science Batch), Term Duration, Base Tuition Fee, and 18% GST itemized separately.</p>

            <p class="mb-4">MsgBill allows coaching academies to generate student fee receipts with installment schedules and send them directly to parents' WhatsApp numbers with UPI payment links.</p>
        `
    },

    "medical-clinic-doctor-billing-receipt-format": {
        title: "Doctor & Clinic Billing Receipt Format: Complete Healthcare Guide (2026)",
        date: "2026-03-03",
        author: "MsgBill Team",
        category: "Healthcare",
        content: `
            <p class="mb-6 text-lg">Healthcare professionals, doctors, dental clinics, and physiotherapists require a specialized billing format to maintain compliance with both the Indian Medical Council and GST laws.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GST Exemption on Doctor Consultation Fees</h2>
            <p class="mb-4">Under Notification No. 12/2017-Central Tax (Rate), health care services provided by a clinical establishment or an authorized medical practitioner are <strong>exempt from GST (0% Nil Rated)</strong>.</p>
            <p class="mb-4">However, this exemption applies strictly to diagnosis, treatment, or care for illness, injury, or deformity. Aesthetic or cosmetic surgery that is not reconstructive is taxable at 18% GST.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What to Include in a Clinic OPD Receipt</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Doctor's Name & Medical Registration Number (MCI / State Medical Council).</li>
                <li>Clinic Name, OPD Address, and Contact Number.</li>
                <li>Patient Details: Full Name, Age, Gender, Patient ID (UHID).</li>
                <li>Date and Time of Consultation.</li>
                <li>Itemized Services: Consultation Fee, Diagnostic Tests (ECG/Blood), Minor Procedure.</li>
                <li>Medicine Charges (Note: Sale of medicines from an attached pharmacy is taxable at 5% or 12% GST).</li>
            </ul>

            <p class="mb-6">Use MsgBill's free receipt generator to issue professional, printable OPD consultation receipts in under 30 seconds.</p>
        `
    },

    "freelance-invoice-foreign-clients-firc": {
        title: "Freelancer Invoicing for Foreign Clients: GST, FIRC, PayPal & Stripe Rules (2026)",
        date: "2026-03-04",
        author: "MsgBill Team",
        category: "Freelancing",
        content: `
            <p class="mb-6 text-lg">Indian software developers, UI/UX designers, and copywriters working with US, UK, and international clients can legally bill with <strong>0% GST</strong> if they follow export rules correctly.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">The 5 Conditions for 'Export of Services'</h2>
            <p class="mb-4">Under Section 2(6) of the IGST Act, your work qualifies as a zero-rated export only when:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>The supplier of service is located in India.</li>
                <li>The recipient of service is located outside India.</li>
                <li>The place of supply of service is outside India.</li>
                <li>Payment is received in <strong>convertible foreign exchange</strong> (or INR via authorized Vostro accounts).</li>
                <li>The supplier and recipient are not merely establishments of a distinct person.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Avoid 18% IGST: File an LUT (Letter of Undertaking)</h2>
            <p class="mb-4">If you are GST registered, you must file a <strong>Letter of Undertaking (Form GST RFD-11)</strong> on the GST portal at the beginning of each financial year. An LUT allows you to export services without paying 18% IGST upfront.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is a FIRC / FIRA?</h2>
            <p class="mb-4">A Foreign Inward Remittance Certificate (FIRC) or Advice (FIRA) is issued by your authorized dealer bank (or payment processors like Stripe, Wise, or PayPal) proving that funds came from abroad. You must preserve FIRCs for 6 years for income tax and GST audits.</p>
        `
    },

    "proforma-invoice-vs-tax-invoice": {
        title: "Proforma Invoice vs Tax Invoice: 5 Key Legal Differences Explained (2026)",
        date: "2026-03-05",
        author: "MsgBill Team",
        category: "Basics",
        content: `
            <p class="mb-6 text-lg">Businesses often make the expensive mistake of treating a proforma invoice as a tax invoice, causing tax liabilities before money has even been received.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is a Proforma Invoice?</h2>
            <p class="mb-4">A proforma invoice is an estimated preliminary bill sent to a customer before the delivery of goods or execution of services. It details the items, estimated costs, and delivery timeline. It is an offer to sell, not an actual financial demand.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">5 Key Differences</h2>
            <ul class="list-disc pl-6 mb-6 space-y-3">
                <li><strong>1. Tax Liability:</strong> A proforma invoice does NOT trigger GST liability. A tax invoice creates an immediate obligation to remit GST to the government.</li>
                <li><strong>2. Input Tax Credit (ITC):</strong> Buyers CANNOT claim ITC on a proforma invoice. ITC requires a formal Tax Invoice under Section 16 of CGST Act.</li>
                <li><strong>3. Accounting Ledger:</strong> Proforma invoices are not entered into your accounting books. Tax invoices must be entered into sales ledgers.</li>
                <li><strong>4. Purpose:</strong> Proforma = quotation / advance payment request; Tax invoice = final bill.</li>
                <li><strong>5. Legal Status:</strong> Proforma is non-binding; Tax invoice is a legally enforceable debt.</li>
            </ul>
        `
    },

    "delivery-challan-vs-tax-invoice-gst": {
        title: "Delivery Challan vs Tax Invoice under GST: When to Issue What (2026 Guide)",
        date: "2026-03-06",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">Transporting goods across India without the proper documentation can result in vehicle interception, goods seizure, and 100% penalty under Section 129 of the CGST Act.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">When is a Delivery Challan Used?</h2>
            <p class="mb-4">Under Rule 55 of the CGST Rules, a <strong>delivery challan</strong> is issued when goods are transported for reasons OTHER than an immediate sale:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Supply of liquid gas:</strong> Where the quantity at the time of removal is not known.</li>
                <li><strong>Transportation for Job Work:</strong> Sending raw materials to a job worker for cutting, stitching, or processing.</li>
                <li><strong>Transportation for Reasons Other Than Sale:</strong> Moving stock between your own branches (where distinct persons rules do not require an invoice) or for demo exhibitions.</li>
                <li><strong>Goods on Sale on Approval:</strong> Sending goods to a customer who will decide whether to buy within 6 months.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Serial Numbers for Delivery Challans</h2>
            <p class="mb-4">Delivery challans must have consecutive, unique serial numbers for each financial year, just like tax invoices. Three copies must be generated: Original for Consignee, Duplicate for Transporter, and Triplicate for Consignor.</p>
        `
    },

    "how-to-recover-overdue-payments-whatsapp": {
        title: "How to Recover Overdue Payments from Clients via WhatsApp (7 Polite Templates)",
        date: "2026-03-07",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">Calling clients to ask for overdue payments is awkward and time-consuming. Because WhatsApp has a 98% open rate, using polite, structured reminder templates recovers payments in hours without harming your client relationships.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Template 1: The Gentle Day-Before Reminder</h2>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">
                "Hi [Client Name], hope you're having a productive week! Just a quick heads-up that Invoice #[Number] for Rs. [Amount] is due tomorrow. You can pay seamlessly via this UPI link: [Link]. Thank you!"
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Template 2: The Due-Date Friendly Check-in</h2>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">
                "Hello [Client Name], your invoice #[Number] for [Service/Product] is due today. Here is the quick pay link: [Link]. Please let me know once processed so I can send over your payment receipt!"
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Template 3: The 3-Days Overdue Nudge</h2>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">
                "Hi [Client Name], wanted to make sure you received Invoice #[Number] sent on [Date]. It was due on [Due Date]. Let me know if you need any clarification or updated bank details to clear it today!"
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Template 4: The Firm Account Balance Notice (7 Days Overdue)</h2>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">
                "Dear [Client Name], our finance team noticed that payment of Rs. [Amount] for Invoice #[Number] is now 7 days overdue. Kindly settle this by 5:00 PM today via [UPI Link] to avoid any interruption in your active services."
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Automate Your WhatsApp Payment Chasing</h2>
            <p class="mb-4">Instead of copying and pasting templates manually, MsgBill's Payment Collection agent automates friendly, firm, and urgent WhatsApp reminders based on real-time due dates.</p>
        `
    }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts[params.slug];
    if (!post) return { title: "Post Not Found | MsgBill Blog" };

    return {
        title: `${post.title} | MsgBill Blog`,
        description: `Read: ${post.title}. Comprehensive ${post.category} guide for Indian businesses by MsgBill.`,
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
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-secondary-950">
            <Navbar />
            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="flex-1 pt-32 pb-20">
                <article className="container max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <header className="mb-10 text-center space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                            {post.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary-900 dark:text-white leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center text-secondary-400 text-xs gap-3">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {/* Top AdSense Container for Blog */}
                    <AdSenseAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_TOP} format="horizontal" label="Advertisement" />

                    {/* Article Content Card */}
                    <div className="bg-white dark:bg-secondary-900 p-8 sm:p-12 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm">
                        <div 
                            className="prose prose-lg prose-emerald dark:prose-invert max-w-none text-secondary-700 dark:text-secondary-300 leading-relaxed space-y-4 text-sm sm:text-base"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Mid/Bottom AdSense Container */}
                    <AdSenseAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM} format="rectangle" label="Sponsored Content" />

                    {/* Interactive Free Generator CTA Box */}
                    <div className="mt-12 p-8 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl text-center shadow-xl space-y-4">
                        <h3 className="text-2xl font-bold">
                            Create Your Free GST Invoice Now
                        </h3>
                        <p className="text-emerald-100 text-sm max-w-lg mx-auto">
                            No sign up or credit card required. Generate compliant invoices, download clean PDFs, or share directly via WhatsApp.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Link href="/free-invoice-generator">
                                <button className="px-8 py-3.5 bg-white text-emerald-800 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-lg">
                                    Open Free Generator →
                                </button>
                            </Link>
                            <Link href="/auth/signup">
                                <button className="px-6 py-3.5 bg-emerald-800/60 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm transition-all border border-white/20">
                                    Sign Up Free (No Ads)
                                </button>
                            </Link>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
