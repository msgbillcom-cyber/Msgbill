import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdSenseAd from "@/components/ads/AdSenseAd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Master Blog Content Dictionary (15 In-Depth Articles)
const blogPosts: Record<string, any> = {
    "salon-spa-gst-invoice-format-india": {
        title: "Salon & Spa GST Invoice Format in India (2026 Guide with SAC Codes)",
        date: "2026-11-06",
        author: "MsgBill Team",
        category: "Retail & GST",
        content: `
            <p class="mb-6 text-lg">A salon bill looks simple: a haircut, a facial, maybe a bottle of shampoo. But since the GST rate changes of September 2025, many salons and spas are still printing old formats with 18% GST, mixing products and services on one line, or skipping the SAC code altogether. This guide shows a clean, GST-ready invoice format for salons, spas, barbershops and beauty parlours in India.</p>
            <p class="mb-6">This is educational content written for small business owners, not legal or tax advice. GST rates and notifications change — always confirm the current position with your Chartered Accountant (CA) before you change your billing.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>From 22 September 2025, CBIC has stated that beauty and physical well-being services (salons, spas, barbers, gyms, yoga centres) are taxed at <strong>5% GST without input tax credit</strong>. The earlier 18%-with-ITC option is no longer available for these services.</li>
                <li>Services and retail products (shampoo, serum, hair colour sold to the client) should be shown as <strong>separate line items</strong>, each with its own HSN/SAC and GST rate.</li>
                <li>Intra-state bills show CGST + SGST; a salon almost always supplies within its own state, so IGST is rare.</li>
                <li>If you are below the registration threshold and not registered, do not charge GST at all — issue a simple bill without any tax line.</li>
                <li>Membership packages and advance payments need careful handling: GST is generally due when you receive the advance, not when the client uses the service.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Who Needs to Register for GST?</h2>
            <p class="mb-4">A salon is primarily a service business. For service providers, GST registration becomes compulsory once aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in special category states). "Aggregate turnover" includes all your taxable supplies across branches with the same PAN — so two small outlets can together cross the limit even if each one alone does not.</p>
            <p class="mb-4">Many salons also sell products. Once you are registered, those sales are taxed too. If you are not registered, you cannot collect GST from customers, and your bill must not show any GST amount.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">The Correct GST Rate for Salon and Spa Services</h2>
            <p class="mb-4">Before September 2025, most salons charged 18% GST and claimed input tax credit (ITC) on rent, equipment and products used. After the rate rationalisation, CBIC clarified that beauty and physical well-being services are taxed at 5% without ITC, and that this is mandatory — the service provider cannot choose 18% with ITC instead. The same applies when such services are supplied inside a hotel.</p>
            <p class="mb-4">"Without ITC" means you cannot claim credit of GST paid on inputs, input services and capital goods used to provide these services. For a salon owner, that changes the maths: the GST you pay on rent, chairs, dryers and professional products becomes a cost, while your output tax falls sharply.</p>

            <h3 class="text-xl font-semibold mt-6 mb-3">Common SAC Codes for Salons and Spas</h3>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">SAC</th>
                            <th class="p-3 border border-slate-200">Description</th>
                            <th class="p-3 border border-slate-200">Typical services</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200 font-medium">999721</td><td class="p-3 border border-slate-200">Hairdressing and barbers' services</td><td class="p-3 border border-slate-200">Haircut, shave, styling, hair colour application</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">999722</td><td class="p-3 border border-slate-200">Cosmetic treatment, manicure and pedicure</td><td class="p-3 border border-slate-200">Facial, clean-up, nail art, waxing</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">999723</td><td class="p-3 border border-slate-200">Physical well-being services</td><td class="p-3 border border-slate-200">Spa, massage, steam, fitness centre</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">999729</td><td class="p-3 border border-slate-200">Other beauty treatment services</td><td class="p-3 border border-slate-200">Bridal packages, other grooming not listed above</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Use the code that best matches what you actually did for the client. If you are unsure whether a treatment counts as beauty, wellness or medical (for example, a dermatologist-led procedure), ask your CA — medical services follow different rules.</p>

            <h3 class="text-xl font-semibold mt-6 mb-3">Products Sold Over the Counter</h3>
            <p class="mb-4">Retail products are goods and carry their own HSN code and rate. For example, shampoos and hair preparations fall under HSN 3305, and many such personal-care items moved to 5% in September 2025. Do not assume every product is 5% — perfumes, certain cosmetics and electrical appliances (like a hair dryer you sell) may sit in a different slab. Check the current rate for each HSN on the CBIC rate schedule or ask your CA before you set up your product list.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Fields on a Salon Tax Invoice</h2>
            <p class="mb-4">Rule 46 of the CGST Rules lists what a tax invoice must contain. For a typical salon, that translates to:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Salon's legal name, trade name, address and GSTIN.</li>
                <li>A unique, sequential invoice number (up to 16 characters, e.g. <code>SAL/25-26/0412</code>) and invoice date.</li>
                <li>Customer name and, if the customer is a GST-registered business (for example, a corporate booking for staff grooming), their GSTIN and address.</li>
                <li>Place of supply — usually your own state.</li>
                <li>Description of each service or product, SAC/HSN, quantity, rate and taxable value.</li>
                <li>Discounts shown before tax, so the taxable value is correct.</li>
                <li>GST rate and amount split into CGST and SGST.</li>
                <li>Total invoice value in figures and words.</li>
                <li>Signature or digital signature of the supplier or authorised person.</li>
            </ol>
            <p class="mb-4">For walk-in individual customers (B2C), you are not required to collect the customer's address for small bills, but a name and phone number are useful for appointment history and WhatsApp reminders.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: A Saturday Bill</h2>
            <p class="mb-4">Priya visits a registered salon in Bengaluru for a haircut and a facial, and buys a bottle of shampoo. The salon offers 10% off the facial.</p>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Item</th>
                            <th class="p-3 border border-slate-200">SAC/HSN</th>
                            <th class="p-3 border border-slate-200">Taxable value</th>
                            <th class="p-3 border border-slate-200">GST</th>
                            <th class="p-3 border border-slate-200">CGST</th>
                            <th class="p-3 border border-slate-200">SGST</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Haircut &amp; styling</td><td class="p-3 border border-slate-200">999721</td><td class="p-3 border border-slate-200">₹600.00</td><td class="p-3 border border-slate-200">5%</td><td class="p-3 border border-slate-200">₹15.00</td><td class="p-3 border border-slate-200">₹15.00</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Facial (₹1,500 less 10%)</td><td class="p-3 border border-slate-200">999722</td><td class="p-3 border border-slate-200">₹1,350.00</td><td class="p-3 border border-slate-200">5%</td><td class="p-3 border border-slate-200">₹33.75</td><td class="p-3 border border-slate-200">₹33.75</td></tr>
                        <tr><td class="p-3 border border-slate-200">Shampoo 250 ml (retail)</td><td class="p-3 border border-slate-200">3305</td><td class="p-3 border border-slate-200">₹400.00</td><td class="p-3 border border-slate-200">5%*</td><td class="p-3 border border-slate-200">₹10.00</td><td class="p-3 border border-slate-200">₹10.00</td></tr>
                        <tr class="bg-slate-50 font-semibold"><td class="p-3 border border-slate-200" colspan="2">Total</td><td class="p-3 border border-slate-200">₹2,350.00</td><td class="p-3 border border-slate-200"></td><td class="p-3 border border-slate-200">₹58.75</td><td class="p-3 border border-slate-200">₹58.75</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Grand total = ₹2,350.00 + ₹117.50 = <strong>₹2,467.50</strong> (rounded to ₹2,468 if you round off, with a ₹0.50 round-off line). *Confirm the product rate for your exact item.</p>
            <p class="mb-4">Notice two things: the discount reduces the taxable value <em>before</em> GST is calculated, and the product sits on its own line even though it happens to share the same rate today. If the product rate changes later, your format will not break.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Packages, Memberships and Gift Vouchers</h2>
            <h3 class="text-xl font-semibold mt-6 mb-3">Prepaid packages</h3>
            <p class="mb-4">Suppose a client pays ₹10,000 for a "6 facials" package. For services, GST is generally payable when you receive the advance. Issue a receipt voucher (or a tax invoice) at the time of payment, and then record each session against the package without charging GST again. Keep a simple balance on each visit: "Package FAC-6: 2 of 6 used".</p>
            <h3 class="text-xl font-semibold mt-6 mb-3">Gift vouchers</h3>
            <p class="mb-4">The GST treatment of vouchers depends on whether the voucher can be used for one specific service or for anything in your menu. This area has seen clarifications and changes, so ask your CA how to treat the vouchers you sell and when GST becomes due on them.</p>
            <h3 class="text-xl font-semibold mt-6 mb-3">Tips to staff</h3>
            <p class="mb-4">A tip the client voluntarily gives directly to a stylist is usually not part of your invoice. If you add a "service charge" to the bill and keep it as salon revenue, it becomes part of the value of your supply and attracts GST. Do not add a compulsory service charge without explaining it clearly to the customer.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes Salons Make</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Still charging 18% on services:</strong> Old billing software or printed rate cards often still say 18%. Update them.</li>
                <li><strong>Claiming ITC on salon purchases:</strong> With the 5% without-ITC rate, credit on inputs used for these services is not available. Speak to your CA about how this affects any balance in your electronic credit ledger.</li>
                <li><strong>One combined line for everything:</strong> "Services + products ₹2,350" makes it hard to apply the right rate and HSN.</li>
                <li><strong>Charging GST while unregistered:</strong> Collecting tax you are not registered to collect is a serious issue. Unregistered salons should issue a plain bill.</li>
                <li><strong>Breaking the invoice number series:</strong> Use one series per financial year per branch, without gaps. Cancelled bills should be marked cancelled, not deleted.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Sending Salon Bills on WhatsApp</h2>
            <p class="mb-4">Most salon clients book on WhatsApp already. Sending the bill to the same chat gives them a record, and gives you a natural place to add a "Book your next appointment" line. Keep the message short: amount, UPI ID or QR, and the PDF. Avoid sending photos of handwritten bills — they are hard to read and harder to search later.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Can a salon still choose 18% GST with ITC?</strong></p>
            <p class="mb-4">According to CBIC's clarification for the rates effective 22 September 2025, no — 5% without ITC is mandatory for beauty and physical well-being services. Confirm with your CA if your service mix includes anything outside this category.</p>
            <p class="mb-2"><strong>Is GST charged on products used during a service, like hair colour?</strong></p>
            <p class="mb-4">Products consumed while performing the service are part of the service, so they are billed within the service line, not separately. Only products the client takes home are billed as goods.</p>
            <p class="mb-2"><strong>Do I need the customer's GSTIN?</strong></p>
            <p class="mb-4">Only if the customer is a registered business that wants to record the purchase. For individual walk-in clients, it is not required.</p>
            <p class="mb-2"><strong>What if I run a salon under the composition scheme?</strong></p>
            <p class="mb-4">Composition taxpayers issue a bill of supply, do not show GST on the bill and pay tax at the composition rate on turnover. Read our <a href="/blog/gst-composition-scheme-billing-rules" class="text-emerald-600 underline font-semibold">composition scheme billing guide</a> and check your eligibility with your CA.</p>
            <p class="mb-2"><strong>Should my bill mention "5% without ITC"?</strong></p>
            <p class="mb-6">There is no rule requiring that wording on the customer's bill. Showing the rate and the CGST/SGST split clearly is what matters.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Make your next salon bill in under a minute</h3>
                <p class="text-emerald-800 mb-4">Add services and products as separate lines, pick the GST rate, and share a clean PDF on WhatsApp. No signup needed.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try the Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: This article is for general education only and reflects our understanding of GST rules as of the date of publishing. It is not tax or legal advice. Please confirm rates, SAC codes and ITC treatment with a qualified Chartered Accountant.</em></p>
        `
    },

    "hsn-sac-codes-common-indian-businesses": {
        title: "HSN & SAC Codes for Common Indian Businesses (Practical 2026 List)",
        date: "2026-11-07",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">"What is the HSN code for this?" is one of the most common questions small business owners ask their accountant. HSN and SAC codes look like a bureaucratic detail, but a wrong or missing code can cause mismatches in your GST returns, confuse your buyers' input tax credit, and make your invoices look unprofessional.</p>
            <p class="mb-6">This guide explains what HSN and SAC codes are, how many digits you need to show, and lists commonly used codes for typical Indian small businesses. It is a starting point for your research — always confirm the exact code and current GST rate for your product or service with your CA or the official CBIC rate schedule.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>HSN</strong> (Harmonised System of Nomenclature) classifies goods; <strong>SAC</strong> (Services Accounting Code) classifies services. Under GST, SAC codes start with 99.</li>
                <li>Businesses with aggregate turnover up to ₹5 crore in the previous year must show at least a <strong>4-digit</strong> code on B2B tax invoices; above ₹5 crore, <strong>6 digits</strong> on all tax invoices.</li>
                <li>The code decides the GST rate. Choosing a code because it has a "lower rate" is misclassification, not tax planning.</li>
                <li>Your GSTR-1 includes an HSN-wise summary, so the codes on your invoices should match what you report.</li>
                <li>Rates were restructured in September 2025 — re-check any rate you copied from an older chart.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">HSN vs SAC: A Quick Explanation</h2>
            <p class="mb-4">HSN is an international system developed by the World Customs Organization and used by over 200 countries. India uses an 8-digit version of it for customs and GST. The first two digits are the chapter (for example, chapter 61 is knitted apparel), the next two narrow it to a heading, and further digits get more specific.</p>
            <p class="mb-4">SAC is India's classification for services, built on the same idea. All SAC codes under GST begin with 99. For example, 9983 is "other professional, technical and business services", and 998314 within it is "information technology design and development services".</p>

            <h3 class="text-xl font-semibold mt-6 mb-3">How many digits do you need?</h3>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Aggregate turnover (previous FY)</th>
                            <th class="p-3 border border-slate-200">Digits on tax invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Up to ₹5 crore</td><td class="p-3 border border-slate-200">4 digits for B2B invoices (optional for B2C)</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Above ₹5 crore</td><td class="p-3 border border-slate-200">6 digits for all tax invoices</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">These are minimums. Many businesses use 6 or 8 digits voluntarily because it reduces ambiguity, especially when two products in the same 4-digit heading carry different rates. Confirm current requirements with your CA, as notifications on HSN reporting in returns have been updated in phases.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common SAC Codes for Service Businesses</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">SAC</th>
                            <th class="p-3 border border-slate-200">Description</th>
                            <th class="p-3 border border-slate-200">Who typically uses it</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200 font-medium">998311</td><td class="p-3 border border-slate-200">Management consulting and management services</td><td class="p-3 border border-slate-200">Business consultants</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">998313</td><td class="p-3 border border-slate-200">IT consulting and support services</td><td class="p-3 border border-slate-200">IT consultants, support freelancers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">998314</td><td class="p-3 border border-slate-200">IT design and development services</td><td class="p-3 border border-slate-200">Web/app developers</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">998361</td><td class="p-3 border border-slate-200">Advertising services</td><td class="p-3 border border-slate-200">Ad agencies, social media marketers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">998383</td><td class="p-3 border border-slate-200">Event photography and videography services</td><td class="p-3 border border-slate-200">Wedding and event photographers</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">998391</td><td class="p-3 border border-slate-200">Specialty design services</td><td class="p-3 border border-slate-200">Graphic and interior designers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">998221</td><td class="p-3 border border-slate-200">Financial auditing services</td><td class="p-3 border border-slate-200">Audit firms</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">998222</td><td class="p-3 border border-slate-200">Accounting and bookkeeping services</td><td class="p-3 border border-slate-200">Accountants, bookkeepers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">9954</td><td class="p-3 border border-slate-200">Construction services</td><td class="p-3 border border-slate-200">Contractors, renovation firms</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">996331</td><td class="p-3 border border-slate-200">Services by restaurants, cafes and similar eating places</td><td class="p-3 border border-slate-200">Restaurants, cafes, cloud kitchens</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">9965</td><td class="p-3 border border-slate-200">Goods transport services</td><td class="p-3 border border-slate-200">Transporters, GTAs</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">9972</td><td class="p-3 border border-slate-200">Real estate services</td><td class="p-3 border border-slate-200">Brokers, property managers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">9987</td><td class="p-3 border border-slate-200">Maintenance, repair and installation services</td><td class="p-3 border border-slate-200">Mobile/AC repair, electricians</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">9992</td><td class="p-3 border border-slate-200">Education services</td><td class="p-3 border border-slate-200">Coaching centres, trainers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">9993</td><td class="p-3 border border-slate-200">Human health and social care services</td><td class="p-3 border border-slate-200">Clinics, diagnostic labs</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">99972</td><td class="p-3 border border-slate-200">Beauty and physical well-being services</td><td class="p-3 border border-slate-200">Salons, spas, gyms</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">998596</td><td class="p-3 border border-slate-200">Events, exhibitions and conventions organisation</td><td class="p-3 border border-slate-200">Event planners</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Services can be exempt, taxed at 5% or 18%, or fall under special rules (for example, reverse charge). The code alone does not tell you the full story, which is why we have not listed rates here — check the current rate notification or ask your CA.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common HSN Chapters for Goods Sellers</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">HSN (4-digit)</th>
                            <th class="p-3 border border-slate-200">Goods</th>
                            <th class="p-3 border border-slate-200">Typical sellers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200 font-medium">1006</td><td class="p-3 border border-slate-200">Rice</td><td class="p-3 border border-slate-200">Kirana, wholesalers</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">1905</td><td class="p-3 border border-slate-200">Bread, biscuits, cakes, bakery products</td><td class="p-3 border border-slate-200">Bakeries</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">2106</td><td class="p-3 border border-slate-200">Food preparations not elsewhere specified</td><td class="p-3 border border-slate-200">Packaged food brands, home bakers</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">3004</td><td class="p-3 border border-slate-200">Medicaments in measured doses</td><td class="p-3 border border-slate-200">Pharmacies</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">3304 / 3305</td><td class="p-3 border border-slate-200">Beauty/make-up preparations / hair preparations</td><td class="p-3 border border-slate-200">Cosmetic stores, salons</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">3401</td><td class="p-3 border border-slate-200">Soap</td><td class="p-3 border border-slate-200">FMCG retailers, handmade soap makers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">4901</td><td class="p-3 border border-slate-200">Printed books</td><td class="p-3 border border-slate-200">Bookshops, publishers</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">6109</td><td class="p-3 border border-slate-200">T-shirts and vests, knitted</td><td class="p-3 border border-slate-200">Garment shops, print-on-demand</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">6203 / 6204</td><td class="p-3 border border-slate-200">Men's / women's suits, trousers etc. (not knitted)</td><td class="p-3 border border-slate-200">Boutiques, tailors selling ready-mades</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">7113</td><td class="p-3 border border-slate-200">Articles of jewellery</td><td class="p-3 border border-slate-200">Jewellers</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">8471</td><td class="p-3 border border-slate-200">Computers and units</td><td class="p-3 border border-slate-200">Computer shops</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">8517</td><td class="p-3 border border-slate-200">Mobile phones and telephone sets</td><td class="p-3 border border-slate-200">Mobile shops</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">9403</td><td class="p-3 border border-slate-200">Other furniture</td><td class="p-3 border border-slate-200">Furniture makers and dealers</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Within each heading, rates can differ based on packaging, value or description. For textiles and footwear, for example, the GST rate has historically depended on the sale value per piece. Look up your exact item, not just the chapter.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Find the Right Code: A 5-Step Method</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Describe the item plainly.</strong> "Cotton knitted round-neck T-shirt" is more useful than "Summer Tee".</li>
                <li><strong>Search the official source.</strong> The GST portal has an HSN/SAC search, and CBIC publishes rate schedules. Avoid relying only on random blog charts.</li>
                <li><strong>Check your supplier's invoice.</strong> If you resell goods unchanged, your supplier's HSN is a good starting point — but verify it, as suppliers make mistakes too.</li>
                <li><strong>Confirm the rate for that exact code.</strong> Note the date of the rate notification you are relying on.</li>
                <li><strong>Save it in your item master.</strong> Set the code once in your billing software so every invoice is consistent.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: A Mixed Invoice</h2>
            <p class="mb-4">A Pune-based computer shop (turnover ₹3 crore, so 4 digits is the minimum for B2B) sells to a registered business in Pune:</p>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Item</th>
                            <th class="p-3 border border-slate-200">HSN/SAC</th>
                            <th class="p-3 border border-slate-200">Taxable value</th>
                            <th class="p-3 border border-slate-200">GST rate</th>
                            <th class="p-3 border border-slate-200">Tax (CGST+SGST)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Laptop</td><td class="p-3 border border-slate-200">8471</td><td class="p-3 border border-slate-200">₹50,000</td><td class="p-3 border border-slate-200">18%</td><td class="p-3 border border-slate-200">₹9,000</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Installation &amp; setup</td><td class="p-3 border border-slate-200">9987</td><td class="p-3 border border-slate-200">₹1,500</td><td class="p-3 border border-slate-200">18%</td><td class="p-3 border border-slate-200">₹270</td></tr>
                        <tr class="font-semibold"><td class="p-3 border border-slate-200" colspan="2">Total</td><td class="p-3 border border-slate-200">₹51,500</td><td class="p-3 border border-slate-200"></td><td class="p-3 border border-slate-200">₹9,270</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Invoice total: ₹60,770 (CGST ₹4,635 + SGST ₹4,635). The rates shown are for illustration; confirm them for your product. In GSTR-1, the shop would report ₹50,000 under HSN 8471 and ₹1,500 under SAC 9987 in its HSN summary. Whether installation is a separate supply or part of a composite supply depends on the facts — this is exactly the kind of question to run past your CA.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mistakes That Cause Trouble Later</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Using one code for everything you sell.</strong> A general store selling rice, soap and biscuits needs different codes per item.</li>
                <li><strong>Copying rates from pre-2025 charts.</strong> Many rates changed on 22 September 2025.</li>
                <li><strong>Mismatched HSN summary.</strong> If invoices say 8471 but your return summary says 8473, it invites questions.</li>
                <li><strong>Picking a code for its rate.</strong> Classification must follow what the item actually is.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Is HSN mandatory on B2C invoices for small businesses?</strong></p>
            <p class="mb-4">For turnover up to ₹5 crore, the 4-digit requirement applies to B2B tax invoices; it is optional on B2C. Showing it anyway is good practice. Note that your returns may still need HSN-wise summaries — check with your CA.</p>
            <p class="mb-2"><strong>Do unregistered businesses need HSN codes?</strong></p>
            <p class="mb-4">An unregistered business does not issue GST tax invoices, so HSN rules do not apply in the same way. Many still add codes to look professional and to be ready when they register.</p>
            <p class="mb-2"><strong>What happens if I use the wrong HSN code?</strong></p>
            <p class="mb-4">If the wrong code led to the wrong tax rate, you may have short-paid tax, which can lead to interest and penalties. Correct it going forward and ask your CA how to fix past invoices (often via debit or credit notes).</p>
            <p class="mb-2"><strong>Can I get an official ruling on classification?</strong></p>
            <p class="mb-6">Yes — businesses can apply for an Advance Ruling on classification. It is a formal process, usually worth it only for high-value or disputed items.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Put the right code on every line</h3>
                <p class="text-emerald-800 mb-4">MsgBill's free generator has an HSN/SAC field on each item, so your invoice and return summary stay consistent.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try the Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: Codes listed here are common examples for general education and are not a substitute for professional classification advice. GST rates and reporting rules change; verify with the official CBIC schedules and your Chartered Accountant.</em></p>
        `
    },

    "how-to-add-upi-qr-code-on-invoice": {
        title: "How to Add a UPI QR Code on an Invoice (Static vs Dynamic Guide)",
        date: "2026-11-08",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">A UPI QR code on an invoice turns "I'll pay later" into "paid" in under a minute. The customer opens any UPI app, scans, and the amount and reference can already be filled in. Yet many businesses either skip the QR or paste a random screenshot that does not match the bill.</p>
            <p class="mb-6">This guide covers every practical way to add a UPI QR code to your invoice — whether you print bills, send PDFs, or share invoices on WhatsApp — and how to set it up so every payment is easy to match with the right invoice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>A <strong>static QR</strong> holds only your UPI ID; the customer types the amount. A <strong>dynamic QR</strong> also holds the amount and an invoice reference.</li>
                <li>For invoices, dynamic QR codes reduce wrong amounts and make reconciliation much easier.</li>
                <li>A UPI QR is just a standard <code>upi://pay</code> link encoded as a QR image — you can generate one without special software.</li>
                <li>Use a business/merchant UPI ID where possible, not a personal one, for cleaner records.</li>
                <li>Always print your UPI ID in text next to the QR, so customers can pay even if scanning fails.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Static vs Dynamic QR: Which One for Invoices?</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Feature</th>
                            <th class="p-3 border border-slate-200">Static QR</th>
                            <th class="p-3 border border-slate-200">Dynamic QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200 font-medium">Contains</td><td class="p-3 border border-slate-200">UPI ID and name</td><td class="p-3 border border-slate-200">UPI ID, name, amount, note/reference</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">Customer enters amount?</td><td class="p-3 border border-slate-200">Yes</td><td class="p-3 border border-slate-200">No (pre-filled)</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">Best for</td><td class="p-3 border border-slate-200">Counter standee, shop wall</td><td class="p-3 border border-slate-200">Invoices, payment requests</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">Reconciliation</td><td class="p-3 border border-slate-200">Manual matching by amount/time</td><td class="p-3 border border-slate-200">Invoice number travels with payment note</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">Generated</td><td class="p-3 border border-slate-200">Once</td><td class="p-3 border border-slate-200">Per invoice</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">If you send even 10 invoices a week, dynamic QR codes save real time at month-end because you are not guessing which ₹4,720 payment belongs to which customer.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What Is Inside a UPI QR Code?</h2>
            <p class="mb-4">A UPI QR code is simply a text link in a format that UPI apps understand. A typical payment link looks like this:</p>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">upi://pay?pa=sharmatraders@okaxis&amp;pn=Sharma%20Traders&amp;am=4720.00&amp;cu=INR&amp;tn=INV-2026-0187</div>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><code>pa</code> — payee address (your UPI ID / VPA)</li>
                <li><code>pn</code> — payee name, shown to the customer before they pay</li>
                <li><code>am</code> — amount in rupees, with two decimals</li>
                <li><code>cu</code> — currency, always INR</li>
                <li><code>tn</code> — transaction note; put your invoice number here</li>
            </ul>
            <p class="mb-4">Turn that link into a QR image and you have a dynamic invoice QR. Some apps may let the customer edit a pre-filled amount, and banks and apps can handle parameters slightly differently, so always test with two or three popular UPI apps before you roll it out.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Method 1: Use Your Bank or Payment App's Merchant QR</h2>
            <p class="mb-4">Most banks and UPI payment apps offer a free business or merchant account with a downloadable QR. This is the quickest way to get a static QR.</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Open your bank's business app or a merchant UPI app and complete the business onboarding (usually PAN, bank account and sometimes GSTIN or Udyam details).</li>
                <li>Download the QR as a high-resolution PNG.</li>
                <li>Add it to the footer of your invoice template, next to your bank details.</li>
                <li>Print the UPI ID below the QR in plain text.</li>
            </ol>
            <p class="mb-4">Merchant accounts often provide payment notifications, settlement reports and sometimes a sound box, which help with record-keeping. Personal UPI IDs work, but mixing personal and business receipts in one account makes accounting harder.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Method 2: Generate a Dynamic QR for Each Invoice</h2>
            <p class="mb-4">For each invoice, create a <code>upi://pay</code> link with the invoice amount and number, then convert it into a QR image. You can do this in three ways:</p>
            <h3 class="text-xl font-semibold mt-6 mb-3">a) Invoicing software</h3>
            <p class="mb-4">Many invoice tools, including MsgBill, can place a QR or payment link on the invoice automatically once you save your UPI ID in your business profile. This is the least error-prone option because the amount always matches the invoice total.</p>
            <h3 class="text-xl font-semibold mt-6 mb-3">b) A spreadsheet</h3>
            <p class="mb-4">If you bill from Excel or Google Sheets, build the link with a formula. For example, if the amount is in cell F20 and the invoice number in B3:</p>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-3 text-slate-800">="upi://pay?pa=yourid@bank&amp;pn=Your%20Business&amp;am="&amp;TEXT(F20,"0.00")&amp;"&amp;cu=INR&amp;tn="&amp;B3</div>
            <p class="mb-4">Then use any reputable QR generator (or a QR add-on) to turn that cell's text into an image. Avoid QR sites that ask for your bank login — a QR code never needs it.</p>
            <h3 class="text-xl font-semibold mt-6 mb-3">c) A payment gateway link</h3>
            <p class="mb-4">Payment gateways can create a payment link or QR per invoice and notify you when it is paid. They usually charge a fee on some payment methods, so compare costs against the time saved.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Where to Place the QR on the Invoice</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Bottom right, near the grand total.</strong> That is where the eye lands after reading the amount.</li>
                <li><strong>At least 2.5 cm × 2.5 cm when printed.</strong> Smaller codes fail on thermal printers and low-end phone cameras.</li>
                <li><strong>Quiet space around it.</strong> Leave a white margin; do not overlap it with a logo or border.</li>
                <li><strong>A clear label.</strong> "Scan to pay ₹4,720 via any UPI app" plus the UPI ID in text.</li>
                <li><strong>Payment terms nearby.</strong> "Due by 15 Nov 2026" sets expectations.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: An Interior Designer's Invoice</h2>
            <p class="mb-4">Neha, an interior designer in Hyderabad, bills a client for a design consultation:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Design consultation: ₹4,000</li>
                <li>GST @ 18% (CGST ₹360 + SGST ₹360): ₹720</li>
                <li>Total: <strong>₹4,720</strong>, invoice number INV-2026-0187</li>
            </ul>
            <p class="mb-4">Her QR encodes <code>am=4720.00</code> and <code>tn=INV-2026-0187</code>. When the client scans, the amount and note are pre-filled. On her bank statement, the credit for ₹4,720 shows the note, so she marks INV-2026-0187 as paid in seconds. If the client pays ₹4,000 by mistake (forgetting GST), the mismatch is obvious immediately, and she can send a polite reminder for the ₹720 balance.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Reconciliation: Matching Payments to Invoices</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Download your bank or UPI statement weekly.</li>
                <li>Match each credit using the note (invoice number), then amount, then payer name.</li>
                <li>Mark invoices paid, partly paid or unpaid in your invoice register.</li>
                <li>For partial payments, send a short WhatsApp message with the balance and a fresh QR for the remaining amount.</li>
            </ol>
            <p class="mb-4">For GST-registered businesses, remember that receiving payment does not change when GST is due on a supply of goods — the invoice date usually governs. Your accountant can explain the time-of-supply rules for your situation.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Safety Tips for Businesses and Customers</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Scanning a QR should only ever be used to <em>pay</em>. You never need to scan a QR or enter a UPI PIN to <em>receive</em> money. Tell your staff this — it is a common fraud pattern.</li>
                <li>Check the payee name shown in the UPI app before paying. Encourage your customers to do the same.</li>
                <li>Do not accept "payment screenshots" as final proof for large amounts; confirm the credit in your bank account.</li>
                <li>If you print QR standees, check them periodically to make sure no one has pasted another QR on top.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Is it legal to put a UPI QR on a GST invoice?</strong></p>
            <p class="mb-4">Yes. Rule 46 lists fields that must be on a tax invoice, but adding payment details such as bank account and UPI QR is allowed and common.</p>
            <p class="mb-2"><strong>Is the dynamic B2C QR under e-invoicing the same thing?</strong></p>
            <p class="mb-4">Not exactly. Certain large taxpayers were notified to show a dynamic QR on B2C invoices with specific invoice details. Small businesses outside those rules can use a simple UPI payment QR. Check with your CA if you are close to the notified thresholds.</p>
            <p class="mb-2"><strong>Is there a limit on UPI payments?</strong></p>
            <p class="mb-4">Yes, banks and NPCI set per-transaction and daily limits, which vary by category and bank. For large invoices, offer bank transfer (NEFT/RTGS) details as well.</p>
            <p class="mb-2"><strong>Do customers pay a fee to scan and pay?</strong></p>
            <p class="mb-6">Paying via UPI from a bank account is generally free for customers. Some merchant or gateway services may charge the business; check your provider's terms.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Add your UPI details to every invoice</h3>
                <p class="text-emerald-800 mb-4">Create a professional invoice with your payment details and share the PDF on WhatsApp in seconds. No signup required.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try the Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: This guide is for general information. UPI features, limits and charges are set by NPCI, banks and payment providers and may change. For GST or accounting treatment of receipts, consult your Chartered Accountant.</em></p>
        `
    },

    "gst-composition-scheme-billing-rules": {
        title: "GST Composition Scheme Billing Rules: Bill of Supply Format for MSMEs",
        date: "2026-11-09",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">The GST composition scheme is designed for small businesses that want simpler compliance: pay tax at a fixed low rate on turnover, file returns less often, and skip the complexity of regular GST invoices. But the scheme also comes with hard limits — you cannot charge GST on bills, your buyers cannot claim ITC, and you cannot make inter-state supplies.</p>
            <p class="mb-6">This guide explains who can opt for composition, the current rates, how a bill of supply looks, and the billing mistakes that get composition dealers into trouble. Educational only — confirm eligibility and rates with your CA before you opt in or out.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Composition is for small taxpayers with aggregate turnover up to the notified limit (commonly discussed as ₹1.5 crore for goods; lower for services — confirm the current notification with your CA).</li>
                <li>You issue a <strong>bill of supply</strong>, not a tax invoice, and you <strong>must not</strong> collect GST from customers.</li>
                <li>Composition tax is paid from your own pocket on turnover at a prescribed rate (goods and restaurants have historically used different rates such as 1% and 5% — verify the rate that applies to you today).</li>
                <li>Buyers cannot claim input tax credit on purchases from a composition dealer.</li>
                <li>Inter-state outward supplies of goods and most services are generally not allowed under composition.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Who Can Opt for Composition?</h2>
            <p class="mb-4">Composition is meant for manufacturers, traders and restaurants (and certain service providers under related schemes) whose aggregate turnover in the previous financial year stays within the prescribed limit. Aggregate turnover is computed PAN-wise across all GSTINs of the same person.</p>
            <p class="mb-4">You typically cannot opt for composition if you:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Make inter-state outward supplies of goods (or fall into other notified exclusions).</li>
                <li>Supply goods through an e-commerce operator who is required to collect TCS (check current exclusions).</li>
                <li>Are a non-resident taxable person or a casual taxable person.</li>
                <li>Manufacture goods notified as ineligible for composition.</li>
                <li>Have already crossed the turnover threshold for the year.</li>
            </ul>
            <p class="mb-4">Service providers (other than restaurants / notified categories) often use a separate composition-style option with its own turnover cap and rate. Do not assume the goods composition rules apply to a pure service business.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Typical Composition Rates (Confirm Before You Use)</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Category</th>
                            <th class="p-3 border border-slate-200">Illustrative rate often discussed</th>
                            <th class="p-3 border border-slate-200">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Manufacturers / traders (goods)</td><td class="p-3 border border-slate-200">Around 1% of turnover</td><td class="p-3 border border-slate-200">Confirm split (CGST+SGST) and exact rate</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Restaurants (not serving alcohol)</td><td class="p-3 border border-slate-200">Around 5% of turnover</td><td class="p-3 border border-slate-200">No ITC; bill of supply</td></tr>
                        <tr><td class="p-3 border border-slate-200">Other notified service options</td><td class="p-3 border border-slate-200">Varies</td><td class="p-3 border border-slate-200">Separate turnover caps may apply</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Rates and eligibility notifications change. Treat the table as orientation, not a rate card.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Bill of Supply vs Tax Invoice</h2>
            <p class="mb-4">A regular registered taxpayer under the normal scheme issues a <strong>tax invoice</strong> showing CGST/SGST or IGST. A composition taxpayer issues a <strong>bill of supply</strong>. The bill of supply must not show a GST amount charged to the customer. Many states expect a clear statement such as: <em>"Composition taxable person, not eligible to collect tax on supplies"</em>.</p>
            <p class="mb-4">Practical fields on a composition bill of supply:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Your business name, address and GSTIN.</li>
                <li>Unique sequential document number and date.</li>
                <li>Customer name (and GSTIN if known for B2B records).</li>
                <li>Description of goods/services, quantity and value.</li>
                <li>Total amount payable — without a GST line.</li>
                <li>Composition declaration wording.</li>
                <li>Signature or digital acknowledgement.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: Kirana Composition Dealer</h2>
            <p class="mb-4">Ramesh runs a kirana store in Mysuru under composition. A regular customer buys grocery items totalling ₹2,450. Under composition:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Bill of supply total = <strong>₹2,450</strong> (no CGST/SGST lines).</li>
                <li>Ramesh still pays composition tax on his turnover at the prescribed rate when he files — that tax is <em>not</em> collected from this customer as a separate GST line.</li>
                <li>If the same customer were a registered wholesaler wanting ITC, they would prefer buying from a regular GST dealer who issues a tax invoice.</li>
            </ul>
            <p class="mb-4">Composition works well when most buyers are end consumers. It becomes awkward when your main customers are GST-registered businesses that need ITC.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Returns and Compliance Rhythm</h2>
            <p class="mb-4">Composition dealers typically file a simpler return cycle than monthly GSTR-1/GSTR-3B filers (historically an annual return with quarterly tax payments — confirm the current form names and due dates). Missing a payment due date can attract interest. Keep your books ready so turnover for composition tax is easy to compute.</p>
            <p class="mb-4">Track turnover carefully during the year. Crossing the threshold mid-year usually means you must migrate to the regular scheme from the day you cross — and start issuing tax invoices correctly from that point.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Billing Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Showing GST on the bill:</strong> Customers then think they can claim ITC; both sides get confused during audits.</li>
                <li><strong>Using the word "Tax Invoice":</strong> Use "Bill of Supply" as the document title.</li>
                <li><strong>Forgetting the composition declaration:</strong> Add the mandated wording on every bill.</li>
                <li><strong>Making inter-state sales:</strong> Often not permitted — check before you expand to other states.</li>
                <li><strong>Mixing schemes without advice:</strong> Opting in/out has timing rules. Speak to your CA before switching.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Should You Stay on Composition?</h2>
            <p class="mb-4">Stay if your buyers are mostly B2C, your turnover is comfortably inside the limit, and you value simpler compliance over ITC. Switch to regular GST if B2B customers demand tax invoices with ITC, you need to sell inter-state, or your input GST is high enough that credit would outweigh composition simplicity.</p>
            <p class="mb-4">Run the numbers with your CA once a year: composition tax paid vs ITC you would have claimed under the regular scheme.</p>


            <h2 class="text-2xl font-bold mt-8 mb-4">How to Opt In and What Changes on Day One</h2>
            <p class="mb-4">Opting into composition is done through the GST portal with the prescribed form and effective date rules. Once approved, update every template your staff uses: POS print layout, Word/Google Doc bill, WhatsApp PDF tool, and accounting software. Rename the document title to Bill of Supply, remove CGST/SGST columns, and add the composition declaration in a font large enough to read on a thermal slip.</p>
            <p class="mb-4">Train anyone who raises bills: they must not "just add 18%" because a customer asked for GST. If a B2B customer insists on ITC, explain politely that composition supplies do not give them credit, and decide whether that customer relationship justifies moving to the regular scheme later.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Inventory Purchases While on Composition</h2>
            <p class="mb-4">You will still buy from regular GST dealers who charge tax on their invoices. That GST generally becomes a cost because composition taxpayers cannot claim ITC. Build it into your pricing. Keep purchase invoices organised anyway — they support expense books and any future scheme change.</p>
            <p class="mb-4">If you stock both composition-eligible and ineligible goods, review product mix with your CA. Manufacturing notified goods can knock you out of eligibility.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Branch and Multi-State Reality Check</h2>
            <p class="mb-4">Composition is awkward for businesses that want to expand across state borders quickly. A Bengaluru trader who starts fulfilling Hyderabad wholesale orders may discover that inter-state outward supplies are not allowed under composition. Plan expansion with GST structure in mind before you hire a salesperson in another state.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Can a composition dealer use e-commerce marketplaces?</strong></p>
            <p class="mb-4">Often restricted where the operator must collect TCS. Confirm current rules before listing on marketplaces.</p>
            <p class="mb-2"><strong>Can I show my UPI QR on a bill of supply?</strong></p>
            <p class="mb-4">Yes. Payment method is separate from GST document type. A clear UPI QR helps collections.</p>
            <p class="mb-2"><strong>Do I need HSN codes on a bill of supply?</strong></p>
            <p class="mb-4">HSN reporting rules still matter for returns and clarity. Ask your CA what digit length you must show for your turnover.</p>
            <p class="mb-2"><strong>What if I accidentally charged GST while on composition?</strong></p>
            <p class="mb-6">Do not ignore it. Speak to your CA about correction, credit notes or other compliance steps. Continuing to collect tax you are not allowed to collect creates risk.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Need a clean bill of supply format?</h3>
                <p class="text-emerald-800 mb-4">Create a professional bill in seconds, download PDF, and share on WhatsApp. Confirm with your CA that your document title and composition wording match your scheme.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: This article is for general education only. Composition eligibility, rates, forms and restrictions change through CBIC notifications. Confirm your position with a qualified Chartered Accountant before opting in, opting out, or changing your billing format.</em></p>
        `
    },

    "restaurant-cafe-bill-format-gst": {
        title: "Restaurant & Café Bill Format under GST (Dine-In, Takeaway & Cloud Kitchen)",
        date: "2026-11-10",
        author: "MsgBill Team",
        category: "Retail & GST",
        content: `
            <p class="mb-6 text-lg">A restaurant bill is one of the most familiar documents in India — yet GST on food service still confuses many café and cloud-kitchen owners. Is dine-in the same as takeaway? What about alcohol? How do you show CGST and SGST on a thermal receipt? This guide walks through a practical GST bill format for restaurants, cafés, bakeries and cloud kitchens.</p>
            <p class="mb-6">Educational content for MSME owners — not tax advice. Restaurant GST rates and composition options have changed more than once; confirm the current slab and scheme with your CA before you reprint menus or reconfigure POS.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Restaurant / food-serving services generally attract GST at a notified rate (commonly discussed as 5% without ITC for many restaurant supplies — verify the rate that applies to your outlet today).</li>
                <li>Serving alcohol for human consumption is outside GST (state excise / VAT applies). Food lines and alcohol lines should never be mixed carelessly.</li>
                <li>Composition restaurants typically issue a bill of supply and do not collect GST on the customer bill; regular scheme restaurants issue a tax invoice with tax breakup.</li>
                <li>Service charge, if added by the restaurant as a compulsory charge, usually forms part of the taxable value — tips paid voluntarily to staff are different.</li>
                <li>Cloud kitchens and delivery aggregators add place-of-supply and e-commerce nuances — get CA help before you scale on Swiggy/Zomato-style platforms.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Regular Scheme vs Composition for Restaurants</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Point</th>
                            <th class="p-3 border border-slate-200">Regular GST</th>
                            <th class="p-3 border border-slate-200">Composition (typical restaurant)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200 font-medium">Document</td><td class="p-3 border border-slate-200">Tax invoice</td><td class="p-3 border border-slate-200">Bill of supply</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">Show GST to customer?</td><td class="p-3 border border-slate-200">Yes (CGST+SGST)</td><td class="p-3 border border-slate-200">No</td></tr>
                        <tr><td class="p-3 border border-slate-200 font-medium">ITC for restaurant</td><td class="p-3 border border-slate-200">Often restricted for restaurant services at concessional rate — confirm</td><td class="p-3 border border-slate-200">No ITC</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200 font-medium">Buyer ITC</td><td class="p-3 border border-slate-200">Possible if conditions met</td><td class="p-3 border border-slate-200">Not available</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">Most neighbourhood cafés that mainly serve walk-in customers care more about a clean, fast bill than about buyer ITC. Corporate catering clients, however, often ask for a proper tax invoice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Fields on a Restaurant Tax Invoice</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Restaurant legal/trade name, address, GSTIN.</li>
                <li>Invoice number (sequential for the FY) and date/time.</li>
                <li>Table number / order ID / token number (helpful operationally).</li>
                <li>Item description, quantity, rate, taxable value.</li>
                <li>SAC for restaurant services (commonly under heading 9963 — confirm the exact code you use).</li>
                <li>GST rate with CGST and SGST amounts (intra-state dine-in is the usual case).</li>
                <li>Total payable, payment mode (UPI / card / cash).</li>
                <li>Signature / digital acknowledgement where applicable.</li>
            </ol>
            <p class="mb-4">For small B2C bills, customer address is often omitted. For billed corporate parties, capture the company name and GSTIN.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: Café Bill (Regular Scheme Illustration)</h2>
            <p class="mb-4">Assume a Bengaluru café on the regular scheme bills two coffees and a sandwich. For illustration, use 5% GST without claiming that this is forever fixed:</p>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Item</th>
                            <th class="p-3 border border-slate-200">Qty</th>
                            <th class="p-3 border border-slate-200">Taxable</th>
                            <th class="p-3 border border-slate-200">CGST 2.5%</th>
                            <th class="p-3 border border-slate-200">SGST 2.5%</th>
                            <th class="p-3 border border-slate-200">Line total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Filter coffee</td><td class="p-3 border border-slate-200">2</td><td class="p-3 border border-slate-200">₹160.00</td><td class="p-3 border border-slate-200">₹4.00</td><td class="p-3 border border-slate-200">₹4.00</td><td class="p-3 border border-slate-200">₹168.00</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Veg sandwich</td><td class="p-3 border border-slate-200">1</td><td class="p-3 border border-slate-200">₹180.00</td><td class="p-3 border border-slate-200">₹4.50</td><td class="p-3 border border-slate-200">₹4.50</td><td class="p-3 border border-slate-200">₹189.00</td></tr>
                        <tr class="font-semibold"><td class="p-3 border border-slate-200" colspan="2">Total</td><td class="p-3 border border-slate-200">₹340.00</td><td class="p-3 border border-slate-200">₹8.50</td><td class="p-3 border border-slate-200">₹8.50</td><td class="p-3 border border-slate-200">₹357.00</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">If the same café were on composition, the customer bill might simply show ₹357 as a round menu price with no tax breakup — and composition tax would be paid later on turnover. Menu pricing strategy differs between schemes; align POS and printed menus with your CA.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Service Charge, Packaging and Delivery</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Compulsory service charge:</strong> If you add it on the bill as your revenue, it generally increases taxable value. Disclose it clearly; many customers dislike surprise service charges.</li>
                <li><strong>Voluntary tip:</strong> Paid directly to staff and not retained by the restaurant is usually not billed as restaurant supply — keep it off the tax invoice if it never enters your revenue.</li>
                <li><strong>Packaging for takeaway:</strong> Often treated as part of the restaurant supply; do not invent a separate "exempt packing" line without advice.</li>
                <li><strong>Third-party delivery fees:</strong> Aggregator commissions and customer delivery charges follow platform contracts and GST rules that need separate review.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Thermal Printer Tips for Cafés</h2>
            <p class="mb-4">80mm thermal rolls are common. Keep the header readable: name, GSTIN, FSSAI number if you print it, and invoice number. Put UPI QR near the total. Avoid tiny fonts that become unreadable after a few hours of heat fade. For WhatsApp-first cloud kitchens, a PDF invoice with UPI often works better than a paper slip.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Printing "GST inclusive" without ever showing the breakup when you are on the regular scheme and should issue a proper tax invoice.</li>
                <li>Mixing liquor and food on one GST invoice without understanding that alcohol is outside GST.</li>
                <li>Using one invoice series across two GSTINs or two branches incorrectly.</li>
                <li>Charging GST while unregistered, or showing GST on a composition bill of supply.</li>
                <li>Ignoring advance receipts for large catering contracts.</li>
            </ul>


            <h2 class="text-2xl font-bold mt-8 mb-4">Cloud Kitchens vs Dine-In Counters</h2>
            <p class="mb-4">Cloud kitchens rarely hand over a thermal bill to a seated guest. Their "bill" is often a WhatsApp PDF or an aggregator invoice. Still maintain your own sequential invoice series for orders you fulfil directly (WhatsApp, Instagram, private catering). Do not assume the aggregator's customer receipt replaces your GST document for your own supplies.</p>
            <p class="mb-4">For private party catering billed to a company, capture GSTIN, billing address and place of supply. A Saturday birthday cake sold to a walk-in parent is B2C; a Monday office lunch subscription is often B2B.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Menu Engineering and Tax-Inclusive Prices</h2>
            <p class="mb-4">Many cafés advertise tax-inclusive menu prices for simplicity. That is fine if your POS still calculates the taxable value and tax correctly underneath. When rates change, update both the menu board and the POS master — forgotten masters are how outlets keep charging an obsolete percentage for months.</p>
            <p class="mb-4">If you offer buffet + soft drinks + packaged sweets for takeaway, split lines when different tax treatments could apply. Ambiguous "combo" lines are where audits get messy.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Staff Training Checklist</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>How to void/cancel a bill without breaking the number series.</li>
                <li>When to ask for company GSTIN.</li>
                <li>How to explain service charge vs tip.</li>
                <li>Where the UPI QR is placed and how to verify payment screenshots.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">FSSAI Number on Bills</h2>
            <p class="mb-4">Customers and delivery partners often look for FSSAI on food bills. Printing it under your GSTIN builds trust. It is not a substitute for GST fields, but it belongs on restaurant stationery when you hold a licence.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Is hotel restaurant GST the same as a standalone café?</strong></p>
            <p class="mb-4">Not always. Hotels above certain room tariffs historically had different treatments. Confirm your specific category.</p>
            <p class="mb-2"><strong>Do I need the customer's GSTIN for every bill?</strong></p>
            <p class="mb-4">No for typical walk-in B2C. Yes when a registered business wants ITC on a catering invoice.</p>
            <p class="mb-2"><strong>Can I send the bill on WhatsApp instead of printing?</strong></p>
            <p class="mb-4">Yes for many small outlets. Keep a sequential archive. A clear PDF plus UPI link improves collections for cloud kitchens.</p>
            <p class="mb-2"><strong>What SAC should I use?</strong></p>
            <p class="mb-6">Restaurant services commonly fall under SAC heading 9963. Pick the most accurate sub-code with your CA or software defaults that your CA has approved.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Create a café-ready bill in seconds</h3>
                <p class="text-emerald-800 mb-4">Add line items, choose GST treatment with your CA's guidance, download PDF, and share on WhatsApp with UPI.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: Restaurant GST rates, composition options and hotel-linked rules change through notifications. This guide is educational only. Confirm with a Chartered Accountant before changing POS tax settings.</em></p>
        `
    },

    "whatsapp-business-catalog-orders-invoicing": {
        title: "WhatsApp Business Catalog Orders to GST Invoice: Step-by-Step Workflow",
        date: "2026-11-11",
        author: "MsgBill Team",
        category: "WhatsApp Business",
        content: `
            <p class="mb-6 text-lg">WhatsApp Business catalogs let customers browse your products inside chat and place orders without visiting a website. That is powerful for Indian MSMEs — but an order chat is not automatically a GST-compliant invoice. This guide shows how to connect catalog orders to proper invoicing, UPI collection and record-keeping.</p>
            <p class="mb-6">Educational workflow content for shop owners and home businesses. Not tax or Meta policy advice; WhatsApp product features and GST rules both change.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>A catalog order message is a sales lead / purchase request — you still need a tax invoice or bill of supply as per your GST status.</li>
                <li>Confirm stock, price, GST and delivery charges in chat before you finalise the invoice.</li>
                <li>Send a PDF invoice with invoice number, tax breakup (if registered) and UPI payment details in the same thread.</li>
                <li>Keep sequential invoice numbers even when every sale starts on WhatsApp.</li>
                <li>For GST-registered B2B buyers, capture GSTIN and billing address before dispatch.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Typical Catalog → Invoice Flow</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Customer browses your WhatsApp catalog and taps to order.</li>
                <li>You receive an order message with item names and quantities.</li>
                <li>You reply with availability, final price, GST treatment, shipping and delivery timeline.</li>
                <li>You create an invoice in your billing tool with a unique number.</li>
                <li>You share the PDF + short payment message (UPI ID / dynamic QR / payment link).</li>
                <li>You mark the chat "paid", pack, and dispatch — then save the invoice PDF for your books.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">What to Put in the Confirmation Message</h2>
            <p class="mb-4">Before generating the invoice, send a short confirmation so disputes drop:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Item list with sizes/colours/variants.</li>
                <li>Taxable value and GST amount (or "GST not applicable — unregistered" / composition note as relevant).</li>
                <li>Delivery or shipping charge.</li>
                <li>Expected dispatch date.</li>
                <li>Cancellation window, if any.</li>
            </ul>
            <p class="mb-4">Example reply structure: "Confirmed: 2 × cotton kurti (M), taxable ₹1,800 + GST as applicable + shipping ₹80. Invoice INV/25-26/118 coming next with UPI."</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: Boutique Catalog Order</h2>
            <p class="mb-4">Ananya runs a clothing boutique in Jaipur (GST-registered, intra-state sale). Catalog order:</p>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Item</th>
                            <th class="p-3 border border-slate-200">HSN (illustrative)</th>
                            <th class="p-3 border border-slate-200">Taxable</th>
                            <th class="p-3 border border-slate-200">GST*</th>
                            <th class="p-3 border border-slate-200">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="p-3 border border-slate-200">Kurti × 2</td><td class="p-3 border border-slate-200">6204</td><td class="p-3 border border-slate-200">₹1,800</td><td class="p-3 border border-slate-200">Confirm current rate</td><td class="p-3 border border-slate-200">Taxable + tax</td></tr>
                        <tr class="bg-slate-50"><td class="p-3 border border-slate-200">Shipping</td><td class="p-3 border border-slate-200">As advised by CA</td><td class="p-3 border border-slate-200">₹80</td><td class="p-3 border border-slate-200">Often same treatment as supply — confirm</td><td class="p-3 border border-slate-200">₹80 + tax if applicable</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-4">*Apparel GST rates depend on the exact product and notified slabs. Do not copy an old Instagram chart — verify HSN and rate.</p>
            <p class="mb-4">She generates invoice <code>JAIP/25-26/118</code>, attaches a dynamic UPI QR for the grand total with note <code>JAIP-118</code>, and sends it on the same WhatsApp thread.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Catalog Pricing vs Invoice Pricing</h2>
            <p class="mb-4">Catalog prices should match what you invoice, or you should state "prices indicative; final invoice may vary with GST/shipping". Silent price changes after order create chargebacks and bad reviews. If you run festival discounts, put the discount as a line on the invoice so taxable value stays clear.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">B2C vs B2B on WhatsApp</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>B2C retail:</strong> Name + phone may be enough; focus on clear returns policy and UPI proof.</li>
                <li><strong>B2B / reseller:</strong> Collect GSTIN, legal name, billing address, place of supply. Wrong place of supply breaks CGST/SGST vs IGST.</li>
                <li><strong>Export of goods:</strong> Different documentation (shipping bill, etc.). Do not treat a WhatsApp chat as export paperwork.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Record-Keeping Habits That Save You Later</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Never reuse invoice numbers for catalog rush orders.</li>
                <li>Export or download PDFs weekly into a FY folder.</li>
                <li>Match UPI settlements to invoice numbers using the payment note.</li>
                <li>For cancelled orders, issue credit notes where required — do not silently delete invoices.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Sending only a catalog screenshot as "the bill".</li>
                <li>Collecting full payment before confirming variant/stock, then fighting refunds.</li>
                <li>Using a personal UPI ID with no invoice reference in the note.</li>
                <li>Charging GST while unregistered because "the catalog template had a GST field".</li>
            </ul>


            <h2 class="text-2xl font-bold mt-8 mb-4">Multi-Item Catalog Orders Without Chaos</h2>
            <p class="mb-4">When a customer orders five variants at once, do not raise five separate chats. Summarise into one confirmation table in chat, then one invoice with five lines. If one variant is out of stock, revise the confirmation before payment — never collect full amount and "adjust later" without written consent.</p>
            <p class="mb-4">For made-to-order products (custom embroidery, engraved gifts), collect a clearly labelled advance, issue the appropriate receipt/invoice for the advance as your CA advises, and raise the final invoice on delivery with credit for the advance.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Returns and Catalog Refunds</h2>
            <p class="mb-4">State your return window in the catalog description and again on the invoice footer. When goods come back, document the credit note number in the same WhatsApp thread. Refund via the original UPI/bank route when possible so reconciliation stays clean.</p>


            <h2 class="text-2xl font-bold mt-8 mb-4">Label Products for GST Clarity Inside the Catalog</h2>
            <p class="mb-4">Each catalog item should carry enough detail that your billing staff (or future you) can pick the right HSN and rate without guessing: fabric, weight band, whether it is a set, and whether price is inclusive of tax. Ambiguous titles like "Gift item 3" create invoice errors at 11 pm when orders spike.</p>
            <p class="mb-4">If you sell both exempt and taxable items, separate them visually in the catalog and never merge them into one chat-only price without a proper invoice breakup.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Using Labels and Quick Replies</h2>
            <p class="mb-4">WhatsApp Business labels such as "Awaiting payment", "Paid", "Packed", "Shipped" turn your chat list into a lightweight CRM. Pair each status change with an invoice action: awaiting payment means invoice sent; paid means UPI matched; shipped means transporter details shared in the same thread.</p>
            <p class="mb-4">Saved replies can include a short invoice explainer: "Sharing GST invoice PDF with UPI. Please pay using the QR so the reference matches your order."</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Festival Rush Playbook</h2>
            <p class="mb-4">During Diwali or wedding season, freeze catalog prices for the week, pre-create invoice number ranges, and assign one person to payment matching. Most catalog chaos is operational, not technical.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Is WhatsApp Business API required?</strong></p>
            <p class="mb-4">No for small catalogs on the WhatsApp Business app. API helps when you need automation at scale.</p>
            <p class="mb-2"><strong>Can the catalog itself show GST?</strong></p>
            <p class="mb-4">You can show tax-inclusive prices, but your formal invoice still needs correct fields if you are registered.</p>
            <p class="mb-2"><strong>What if the customer pays before the invoice?</strong></p>
            <p class="mb-4">Issue the invoice/receipt promptly and match the UPI reference. For registered suppliers, advances can trigger GST timing rules — ask your CA for your industry.</p>
            <p class="mb-2"><strong>How do I handle COD catalog orders?</strong></p>
            <p class="mb-6">Still raise the invoice at supply. Mark payment mode as COD and update when cash/UPI is collected on delivery.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Turn a WhatsApp order into a proper invoice</h3>
                <p class="text-emerald-800 mb-4">Create the PDF, add UPI details, and share it back in the same chat — no install required.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: Educational only. WhatsApp features, catalog policies and GST invoicing rules can change. Confirm tax treatment with a Chartered Accountant.</em></p>
        `
    },

    "input-tax-credit-checklist-small-business": {
        title: "Input Tax Credit Checklist for Small Businesses (GSTR-2B Habit Guide)",
        date: "2026-11-12",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">Input Tax Credit (ITC) is the GST you paid on purchases that you can set off against the GST you collect on sales — if you meet the conditions. For small businesses, ITC mistakes are expensive: blocked credit, interest, and notices. This checklist helps MSME owners understand what to verify before claiming ITC in their returns.</p>
            <p class="mb-6">This is educational material for business owners, not a filing manual. ITC rules are technical; always work with your CA or GST practitioner before you claim or reverse credit.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>You generally need a valid tax invoice (or prescribed document), receipt of goods/services, return filing by the supplier, and payment of tax to the government — among other conditions under the CGST Act.</li>
                <li>Reconcile your purchase register with GSTR-2B (auto-drafted ITC statement) before you claim.</li>
                <li>Some credits are blocked (for example, certain motor vehicles, food &amp; beverages, club memberships — see Section 17(5) list with your CA).</li>
                <li>Payment to the supplier within the prescribed time matters for reclaiming provisional credit in many cases.</li>
                <li>Wrong HSN, missing GSTIN, or fake invoices destroy credit — process quality beats "claim everything".</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">The Practical ITC Checklist (Before Every Return)</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Document on hand:</strong> Tax invoice / debit note / prescribed bill with your GSTIN, supplier GSTIN, invoice number, date, taxable value, tax amount and place of supply where relevant.</li>
                <li><strong>Goods or services received:</strong> Keep GRN, e-way bill, delivery challan or service completion evidence where applicable.</li>
                <li><strong>Supplier compliance:</strong> Invoice appears in your GSTR-2B (or follow the current reconciliation process your CA uses).</li>
                <li><strong>Not a blocked credit:</strong> Cross-check Section 17(5) categories and any special restrictions for your industry (restaurants, construction, etc.).</li>
                <li><strong>Business use:</strong> Credit is for furtherance of business — personal draws and non-business use need reversal thinking.</li>
                <li><strong>Time limit:</strong> ITC generally cannot be claimed indefinitely; there is an outer time limit linked to the due date of returns for a financial year / relevant form — confirm the current deadline.</li>
                <li><strong>Supplier payment:</strong> Track ageing of payables; unpaid invoices can force ITC reversal and later reclaim when paid.</li>
                <li><strong>Books match returns:</strong> Purchase register, electronic credit ledger and GSTR-3B claims should tell the same story.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: Trading Business ITC Math</h2>
            <p class="mb-4">Meera trades electrical fittings in Pune. In October she:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Purchases stock with GST of <strong>₹18,000</strong> (invoices in GSTR-2B).</li>
                <li>Pays office rent with GST of <strong>₹4,500</strong> (eligible — confirm for her facts).</li>
                <li>Buys a car for personal + occasional stock transport — CA flags motor vehicle credit as likely blocked / restricted.</li>
                <li>Sells goods collecting output GST of <strong>₹22,000</strong>.</li>
            </ul>
            <p class="mb-4">If eligible ITC is ₹18,000 + ₹4,500 = ₹22,500, her net GST payable for the period could be nil with a small credit carry-forward — <em>provided</em> every invoice clears the checklist. If ₹3,000 of purchase invoices never appear in GSTR-2B, she should not casually claim that ₹3,000.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Blocked or Sensitive Credits (Discuss With CA)</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Motor vehicles for passenger transport (with exceptions such as further supply, training, etc.).</li>
                <li>Food and beverages, outdoor catering, beauty treatment, health services (subject to exceptions).</li>
                <li>Membership of a club, health and fitness centre.</li>
                <li>Works contract / construction of immovable property in many self-use cases.</li>
                <li>Goods lost, stolen, destroyed, written off, or given as free samples — credit implications need review.</li>
            </ul>
            <p class="mb-4">Do not memorise this list as complete. Read the current Section 17(5) text with your advisor.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GSTR-2B Reconciliation Habit</h2>
            <p class="mb-4">Every month (or every return period):</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Download GSTR-2B.</li>
                <li>Match supplier-wise invoices to your purchase book.</li>
                <li>Tag mismatches: missing in 2B, missing in books, amount differences, GSTIN typos.</li>
                <li>Follow up with suppliers whose invoices are absent.</li>
                <li>Claim only what your CA agrees is safe for that period.</li>
            </ol>
            <p class="mb-4">A simple spreadsheet with columns Invoice No | Supplier | Tax | In 2B? | Claimed? | Notes is enough for many MSMEs.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Invoicing Quality Protects Your Buyers Too</h2>
            <p class="mb-4">If you are the supplier, your customers' ITC depends on your invoice quality and return filing. Use clear sequential invoices, correct GSTIN, proper tax breakup and timely GSTR-1. Tools like MsgBill help you produce clean PDFs quickly — compliance still sits with you.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Red Flags That Attract Trouble</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Claiming ITC on photocopies or WhatsApp images without a valid invoice trail.</li>
                <li>Dealing with suppliers who cannot be verified on the GST portal.</li>
                <li>Huge credit with almost no outward supplies (pattern risk).</li>
                <li>Ignoring reverse charge invoices where you must self-pay tax before credit.</li>
            </ul>


            <h2 class="text-2xl font-bold mt-8 mb-4">Reverse Charge — Do Not Skip the Self-Invoice Habit</h2>
            <p class="mb-4">Under reverse charge, you (the recipient) pay GST on specified supplies and may then claim ITC if eligible. Common MSME examples include certain advocate services or notified categories that change over time. Maintain a self-invoice / payment voucher trail as your CA prescribes. Missing RCM entries is a frequent notice trigger.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Vendor Onboarding That Protects ITC</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Verify GSTIN status on the portal before the first large order.</li>
                <li>Collect a sample tax invoice and check that your legal name/GSTIN are spelled correctly.</li>
                <li>Agree that invoices will be emailed/WhatsApped the same day as dispatch.</li>
                <li>Escalate quickly when an invoice fails to appear in GSTR-2B for two consecutive periods.</li>
            </ul>
            <p class="mb-4">Cheap purchase prices from non-compliant vendors are not cheap if you lose ITC and face interest.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Year-End ITC Hygiene</h2>
            <p class="mb-4">Before the outer time limit for claiming FY credit expires, run a full open-invoice review with your CA: unclaimed eligible credit, credit that must be reversed, and pending supplier follow-ups. Do not leave this to the last portal day.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Credit Notes and ITC Impact</h2>
            <p class="mb-4">When you receive a supplier credit note, reduce ITC accordingly in the relevant period. When you issue credit notes to customers, remember their ITC may need reversal on their side — timely documentation protects both parties.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Can I claim ITC on a proforma invoice?</strong></p>
            <p class="mb-4">No. Proforma is not a tax invoice. Wait for the tax invoice.</p>
            <p class="mb-2"><strong>What if the supplier filed late?</strong></p>
            <p class="mb-4">Credit timing often follows appearance in the auto-drafted statements / legal conditions then in force. Ask your CA how to treat that invoice period.</p>
            <p class="mb-2"><strong>Does composition dealer purchase give me ITC?</strong></p>
            <p class="mb-4">Composition dealers do not issue tax invoices with GST — buyers generally cannot claim ITC on those purchases.</p>
            <p class="mb-2"><strong>Are bank charges with GST eligible?</strong></p>
            <p class="mb-6">Often yes if used for business and other conditions are met — confirm document type and 2B reflection.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Issue ITC-friendly invoices to your customers</h3>
                <p class="text-emerald-800 mb-4">Clear GSTIN, tax breakup and sequential numbers help your B2B buyers. Generate a clean PDF and share on WhatsApp.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: ITC is one of the most litigation-prone areas of GST. This checklist is general education only and may not reflect the latest circulars or portal behaviour. Take advice from a qualified Chartered Accountant before claiming or reversing credit.</em></p>
        `
    },

    "late-payment-interest-invoice-india": {
        title: "Late Payment Interest on Invoices in India: MSME Terms & Collection Tips",
        date: "2026-11-13",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">Late payments hurt MSME cash flow more than almost any other operational issue. Indian law gives suppliers tools — including interest on delayed payments under the MSMED Act for registered micro and small enterprises — but your invoice wording, contract and follow-up discipline decide whether you can actually collect that interest.</p>
            <p class="mb-6">This guide explains how to show payment terms and late-payment interest on invoices in a clear, professional way, what MSME buyers/sellers should know at a high level, and how to chase dues without burning relationships. Educational only — not legal advice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Print clear <strong>payment due dates</strong> and preferred UPI / bank details on every invoice.</li>
                <li>If you want contractual interest on overdue invoices, state the rate and calculation basis in your terms (and ideally in a purchase order / agreement).</li>
                <li>Registered MSMEs supplying to buyers may have statutory interest protections under the MSMED Act when payments are delayed beyond prescribed timelines — confirm registration and applicability with a lawyer/CA.</li>
                <li>GST treatment of interest / late fees can be nuanced; do not add a random "GST on interest" line without advice.</li>
                <li>Polite, documented WhatsApp reminders often recover more money than aggressive threats.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">What to Print on the Invoice</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Invoice date</strong> and <strong>due date</strong> (for example, Net 7 / Net 15 / Due on receipt).</li>
                <li><strong>Payment methods:</strong> UPI ID, bank account, IFSC, favouring name.</li>
                <li><strong>Late payment clause</strong> (sample educational wording below).</li>
                <li><strong>Interest stop-date policy</strong> if you offer a grace period.</li>
                <li>Reference to the governing PO / work order number.</li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3">Sample clause (customise with counsel)</h3>
            <p class="mb-4"><em>"Payment is due within 15 days of invoice date. Overdue balances may attract interest at 1.5% per month (or the rate prescribed under applicable MSME law, whichever applies) from the due date until realisation. This does not limit other legal remedies."</em></p>
            <p class="mb-4">Replace the rate with whatever your contract and counsel approve. Do not copy-paste blindly.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">MSME Delayed Payment — High-Level Orientation</h2>
            <p class="mb-4">The Micro, Small and Medium Enterprises Development Act, 2006 contains provisions aimed at protecting MSME suppliers from delayed payments by buyers, including interest consequences when dues are not paid within the agreed period or within the statutory outer limit (commonly discussed as 45 days in many explainers — verify the exact section text that applies to your case).</p>
            <p class="mb-4">Practical points owners discuss with advisors:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Udyam registration details help establish MSME status.</li>
                <li>Written agreements / accepted POs make timelines clearer.</li>
                <li>MSE facilitation councils exist for dispute avenues — process and jurisdiction need legal guidance.</li>
                <li>Statutory interest formulas can be higher than casual "1% per month" chat promises — do not assume.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Worked Example: Interest Math on an Overdue Invoice</h2>
            <p class="mb-4">Suppose invoice INV/25-26/042 dated 1 October is for <strong>₹50,000</strong> due in 15 days (due date 16 October). The buyer pays on 16 November (31 days late). If your agreed contractual interest is 1.5% per month on overdue principal:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Monthly interest ≈ 1.5% × ₹50,000 = <strong>₹750</strong>.</li>
                <li>For 31 days, a simple pro-rata approach some businesses use: ₹750 × 31/30 ≈ <strong>₹775</strong> (method should match your terms — some use monthly slabs without daily pro-rata).</li>
            </ul>
            <p class="mb-4">Issue a separate debit note / interest invoice only if your CA says that is the right document, and clarify GST treatment before you tax the interest line.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GST Angle (Ask Before You Bill Interest)</h2>
            <p class="mb-4">Consideration for a supply can include interest or late fee in certain situations under valuation rules. Whether your delayed-payment interest is taxable, exempt, or outside supply depends on facts. Do not invent a 18% GST line on interest just because "everything is 18%". Document the position your CA recommends and keep it consistent.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Collection Sequence That Works for MSMEs</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Day 0:</strong> Send invoice PDF + UPI on WhatsApp/email.</li>
                <li><strong>Day 3 after due:</strong> Friendly reminder with PDF re-attach.</li>
                <li><strong>Day 7:</strong> Firm note stating overdue status and interest clause reference.</li>
                <li><strong>Day 14:</strong> Call + written follow-up; offer a short settlement plan if relationship matters.</li>
                <li><strong>Day 21+:</strong> Formal notice path as advised by counsel; pause further supply if needed.</li>
            </ol>
            <p class="mb-4">Keep every reminder polite and factual. Screenshots of the thread help if the dispute escalates.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>No due date on the invoice — "pay when you can" invites delay.</li>
                <li>Interest rate mentioned only verbally.</li>
                <li>Threatening criminal action casually in WhatsApp (can backfire).</li>
                <li>Continuing large credit supplies to chronic late payers.</li>
                <li>Not reconciling partial UPI payments against invoice numbers.</li>
            </ul>


            <h2 class="text-2xl font-bold mt-8 mb-4">Partial Payments and Running Accounts</h2>
            <p class="mb-4">When a buyer pays ₹20,000 against a ₹50,000 invoice, acknowledge in writing which invoice and how much remains. Update your books the same day. Interest, if charged, usually runs on the overdue balance only — say so in your terms.</p>
            <p class="mb-4">For customers with multiple open invoices, apply payments FIFO unless the buyer remittance advice names a specific invoice. Ambiguous allocation is how disputes start.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">When to Stop Supply</h2>
            <p class="mb-4">Decide an internal credit policy: for example, no new dispatch if any invoice is more than 21 days overdue without a written plan. Communicate the policy up front for new B2B accounts. Emotional "one more order" exceptions should be rare and approved by the owner, not the salesperson alone.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Documentation Pack for Serious Dues</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Invoice PDF and delivery proof.</li>
                <li>PO / email acceptance.</li>
                <li>WhatsApp/email reminder trail.</li>
                <li>Udyam registration copy if relying on MSME protections.</li>
                <li>Statement of account signed or shared with the buyer.</li>
            </ul>
            <p class="mb-4">Hand this pack to your counsel early rather than hunting screenshots the night before a hearing.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Advance Payments Reduce Interest Disputes</h2>
            <p class="mb-4">For custom work, take a written advance percentage before starting. Advances shrink principal at risk and show seriousness on both sides. State whether advance is refundable and how it appears on the final invoice.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Can I charge interest if my invoice never mentioned it?</strong></p>
            <p class="mb-4">Harder to enforce. Put terms on invoices and in contracts going forward. Past dues may still have statutory MSME angles — ask a lawyer.</p>
            <p class="mb-2"><strong>Is compound interest allowed?</strong></p>
            <p class="mb-4">Follow your written terms and applicable law. Do not assume compounding.</p>
            <p class="mb-2"><strong>Should interest be a new invoice or a debit note?</strong></p>
            <p class="mb-4">Depends on accounting and GST advice for your case. Consistency matters more than the label you invent.</p>
            <p class="mb-2"><strong>Does sending invoices only on WhatsApp hurt recovery?</strong></p>
            <p class="mb-6">WhatsApp delivery ticks help prove sending. Still keep PDF archives and, for large dues, parallel email or portal submission.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Send clearer invoices with due dates &amp; UPI</h3>
                <p class="text-emerald-800 mb-4">A professional PDF plus payment details on WhatsApp reduces accidental delays. Create your next invoice in under a minute.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Invoice Generator →</a>
            </div>
            <p class="mb-4 text-sm text-slate-500"><em>Disclaimer: This article is general education on invoicing practice and high-level MSME payment concepts. It is not legal advice. Interest entitlements, MSMED Act remedies and GST on interest depend on registration status, contracts and current law — consult a lawyer and Chartered Accountant.</em></p>
        `
    },
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
            <p class="mb-6 text-lg">Choosing the right billing software can make or break your small business operations. While Vyapar has long been a household name in Indian desktop accounting, modern homepreneurs, freelancers, and service providers often find traditional accounting software too heavy and complicated for their daily workflow. Enter MsgBill: the streamlined, WhatsApp-native invoicing tool engineered for speed.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Core Comparison Matrix: MsgBill vs Vyapar</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Feature</th>
                            <th class="p-3 border border-slate-200 text-emerald-700">MsgBill</th>
                            <th class="p-3 border border-slate-200">Vyapar App</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Core Focus</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">10-Second WhatsApp Bills & UPI Collection</td>
                            <td class="p-3 border border-slate-200">Full-scale inventory & double-entry accounting</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Free Access (No Login)</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Yes — 100% free instant generator</td>
                            <td class="p-3 border border-slate-200">No — Requires software installation & phone registration</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Device Compatibility</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Any phone, tablet, Mac, PC, or iPhone (Cloud Web)</td>
                            <td class="p-3 border border-slate-200">Primarily Windows Desktop & Android APK</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Annual Pro Pricing</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">₹499 / year flat</td>
                            <td class="p-3 border border-slate-200">₹2,399 – ₹3,299 / year per device</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Customer Payment Flow</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Instant 1-tap UPI deep link in WhatsApp chat</td>
                            <td class="p-3 border border-slate-200">Printed QR code on PDF or payment gateway integration</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Hardware Required</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">None (any web browser)</td>
                            <td class="p-3 border border-slate-200">Desktop PC or Android device with storage space</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">1. Speed of Invoicing: 10 Seconds vs 3 Minutes</h2>
            <p class="mb-4">Vyapar requires you to set up opening balances, create ledgers, add party masters, and navigate multiple dropdowns before clicking "Save & Print". This makes sense if you run a distributor business with 5,000 SKUs, but it is painfully slow if you just repaired an air conditioner, delivered 10 custom cakes, or billed a client for graphic design services.</p>
            <p class="mb-4"><strong>MsgBill</strong> is engineered specifically around the "quick bill" philosophy. You open the app, enter the item name, quantity, and GST slab, and tap "Share to WhatsApp". The client receives a professional PDF along with an embedded 1-tap UPI payment link directly inside their chat window within seconds.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">2. Cloud Web vs Desktop Local Storage</h2>
            <p class="mb-4">One of the most frequent complaints about legacy desktop billing software like Vyapar is syncing issues between your desktop shop counter and your mobile phone when you are out meeting suppliers. If your hard drive crashes or an update corrupts the database, data recovery can require technical support.</p>
            <p class="mb-4">MsgBill is 100% cloud-hosted. Your invoices, client records, and collection statuses are accessible securely from any browser — whether you are on your laptop at your desk, on an iPad at an exhibition, or on your phone while traveling.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">3. Pricing Comparison: Why Pay ₹3,000 When You Need Fast Billing?</h2>
            <p class="mb-4">Vyapar's annual subscription costs between ₹2,399 and ₹3,299 per year for desktop licenses. For micro-businesses, solo entrepreneurs, home bakers, coaches, and boutique retailers, paying thousands of rupees every year for accounting features they never touch is unnecessary.</p>
            <p class="mb-4">MsgBill offers a completely free guest generator for one-off bills, and an ad-free Pro SaaS tier at just <strong>₹499 per year</strong> — less than ₹42 per month — complete with WhatsApp payment reminders, UPI link generation, cloud invoice history, and client directories.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">When Should You Choose Vyapar?</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>You manage a large retail supermarket or hardware warehouse needing barcode scanner integration.</li>
                <li>You need thermal POS printers hardwired via USB to a desktop machine.</li>
                <li>Your accountant requires full double-entry ledger bookkeeping (Trial Balance, Balance Sheet, P&L) generated directly within the software.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">When Should You Choose MsgBill?</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Your primary sales channel is WhatsApp, Instagram, or direct client communication.</li>
                <li>You want to get paid 3x faster via direct 1-tap UPI links without 2% payment gateway deductions.</li>
                <li>You want a lightning-fast bill maker that works on any phone or laptop without installing software.</li>
                <li>You want an affordable, modern, professional billing system at ₹499/year rather than costly desktop software.</li>
            </ul>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Create your first bill right now — No signup required</h3>
                <p class="text-emerald-800 mb-4">Test MsgBill's instant bill maker for free. Generate a compliant GST invoice and send it to WhatsApp in 30 seconds.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Generator →</a>
            </div>
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
        title: "UPI Payment Link: How to Get Paid Faster on WhatsApp Invoices (2026 Guide)",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "Payments",
        content: `
            <p class="mb-6 text-lg">In India, the Unified Payments Interface (UPI) processes more than 14 billion financial transactions every month. Yet thousands of small business owners, freelancers, and service providers continue to experience payment delays because they ask clients to manually copy 16-digit bank account numbers and IFSC codes. Adding a direct, 1-tap UPI payment link to your invoices eliminates friction and reduces payment collection time from 15 days to under 5 minutes.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Why Traditional Bank Transfer Invoicing Fails</h2>
            <p class="mb-4">When a customer receives an invoice requesting an IMPS or NEFT bank transfer, they must:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Log in to their netbanking portal or mobile banking application.</li>
                <li>Add your business bank account as a new beneficiary.</li>
                <li>Wait 30 minutes to 4 hours for the bank's security "cooling period" before transferring funds.</li>
                <li>Manually enter the exact amount and reference number.</li>
            </ol>
            <p class="mb-4">Because this process requires significant effort, clients postpone payment with thoughts like <em>"I'll do this tonight when I sit at my computer."</em> Days turn into weeks, creating severe working capital bottlenecks for your business.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">How UPI Deep Linking Works Under the Hood</h2>
            <p class="mb-4">The National Payments Corporation of India (NPCI) defines an open URI specification for instant UPI payments. When formatted correctly, a standard payment link looks like this:</p>
            <div class="bg-slate-100 p-4 rounded-xl font-mono text-xs my-4 text-slate-800 break-all">
                upi://pay?pa=yourbusiness@upi&pn=BusinessName&am=2450.00&cu=INR&tn=Invoice-MB1042
            </div>
            <p class="mb-4">Here is what each component represents:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>pa (Payment Address):</strong> Your VPA / UPI ID (e.g., yourname@okhdfcbank or 9876543210@paytm).</li>
                <li><strong>pn (Payee Name):</strong> Your registered business or legal trade name.</li>
                <li><strong>am (Amount):</strong> The exact invoice total pre-filled to two decimal places.</li>
                <li><strong>cu (Currency):</strong> Indian Rupee (INR).</li>
                <li><strong>tn (Transaction Note):</strong> Your unique invoice number for automatic accounting reference.</li>
            </ul>
            <p class="mb-4">When a customer clicks this link on an Android or iOS smartphone, their operating system automatically invokes installed UPI apps (Google Pay, PhonePe, Paytm, CRED, BHIM). The exact amount and payee are locked in — the customer simply taps their preferred app, enters their 4- or 6-digit UPI PIN, and funds settle instantly into your bank account with zero merchant fee (0% MDR).</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Payment Methods Comparison for Indian SMBs</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Payment Channel</th>
                            <th class="p-3 border border-slate-200">Customer Friction</th>
                            <th class="p-3 border border-slate-200">Transaction Fee (MDR)</th>
                            <th class="p-3 border border-slate-200">Settlement Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">1-Tap Direct UPI Link</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Zero (1 tap + PIN)</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">0% (Completely Free)</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Instant (T+0 seconds)</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">NEFT / IMPS Netbanking</td>
                            <td class="p-3 border border-slate-200 text-amber-700">High (Add beneficiary + cooling)</td>
                            <td class="p-3 border border-slate-200">₹0 – ₹5 per transfer</td>
                            <td class="p-3 border border-slate-200">30 mins – next business day</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Payment Gateway (Cards/EMI)</td>
                            <td class="p-3 border border-slate-200">Medium (Browser redirect + OTP)</td>
                            <td class="p-3 border border-slate-200 text-rose-700 font-semibold">2.0% – 2.5% + GST</td>
                            <td class="p-3 border border-slate-200">T+1 to T+3 business days</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">How to Attach UPI Links Using MsgBill</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-3">
                <li><strong>Generate Bill:</strong> Open the <a href="/free-invoice-generator" class="text-emerald-600 underline font-semibold">free invoice generator</a> or create a bill in your MsgBill dashboard.</li>
                <li><strong>Add Your UPI ID:</strong> In the payment section, enter your UPI VPA (e.g., yourname@hdfcbank).</li>
                <li><strong>Share on WhatsApp:</strong> Tap "Share to WhatsApp". MsgBill automatically attaches the high-resolution PDF invoice and crafts a ready-to-send WhatsApp message with your 1-tap UPI link pre-populated.</li>
                <li><strong>Customer Pays Instantly:</strong> Your client taps the link, approves the payment in Google Pay or PhonePe, and shares the screenshot back in chat.</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>What is the maximum amount I can collect via a UPI payment link?</strong></p>
            <p class="mb-4">NPCI sets standard peer-to-peer (P2P) and small business UPI transaction limits at ₹1,00,000 per day. However, verified merchant accounts (P2M) in sectors such as healthcare, education, and capital markets can accept up to ₹5,00,000 per transaction.</p>

            <p class="mb-2"><strong>Does MsgBill charge a commission on UPI payments?</strong></p>
            <p class="mb-4">No. MsgBill does not intermediate your funds. The UPI intent link routes money straight from your customer's bank account into your personal or current account with zero commissions deducted.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Start collecting via UPI in seconds</h3>
                <p class="text-emerald-800 mb-4">Create your first GST bill with an embedded UPI payment link right now — no signup required.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Create Bill with UPI Link →</a>
            </div>
        `
    },
    "gst-invoice-rules-2026-indian-business": {
        title: "GST Invoice Rules 2026: Mandatory Particulars, Slabs & Penalties Explained",
        date: "2026-02-18",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">Issuing an invalid or non-compliant invoice under the Central Goods and Services Tax (CGST) Act can lead to severe penalties, vehicle interception during transport, and disqualification of your buyer's Input Tax Credit (ITC). In 2026, the GST Council and Central Board of Indirect Taxes and Customs (CBIC) have stepped up automated return matching, making invoice accuracy mandatory for every registered business in India.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">The 16 Mandatory Particulars Under CGST Rule 46</h2>
            <p class="mb-4">According to Rule 46 of the CGST Rules, 2017, every tax invoice issued by a registered person must contain the following 16 specific details:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Name, Address, and GSTIN</strong> of the supplier.</li>
                <li><strong>Consecutive Serial Number:</strong> Not exceeding 16 characters, containing alphabets, numerals, or special characters (hyphen or slash), unique for each financial year.</li>
                <li><strong>Date of Issue:</strong> The formal calendar date the invoice was generated.</li>
                <li><strong>Name, Address, and GSTIN / UIN</strong> of the recipient (if registered).</li>
                <li><strong>Recipient Address of Delivery:</strong> Mandatory if recipient is unregistered and the taxable supply value is ₹50,000 or more, including State Name and State Code.</li>
                <li><strong>HSN Code of Goods or SAC Code of Services:</strong> Harmonized System of Nomenclature classification code.</li>
                <li><strong>Description of Goods or Services:</strong> Clear specification of the items supplied.</li>
                <li><strong>Quantity:</strong> Number of units, kilograms, metres, or standard unit quantity code (UQC).</li>
                <li><strong>Total Value of Supply:</strong> Gross product/service price before discounts.</li>
                <li><strong>Taxable Value:</strong> Total value taking into account any discount or abatement.</li>
                <li><strong>Applicable Tax Rate:</strong> Exact percentage slabs (0%, 5%, 12%, 18%, or 28%).</li>
                <li><strong>Tax Breakup:</strong> Segregated amounts showing Central Tax (CGST), State Tax (SGST), Integrated Tax (IGST), and Cess.</li>
                <li><strong>Place of Supply (POS):</strong> Name of the destination State along with State Code.</li>
                <li><strong>Address of Delivery:</strong> If different from the place of supply.</li>
                <li><strong>Reverse Charge Declaration:</strong> Stating whether tax is payable on reverse charge basis (Yes/No).</li>
                <li><strong>Signature or Digital Signature:</strong> Physical signature of supplier/authorized representative, or valid electronic signature (as per Rule 46 proviso).</li>
            </ol>

            <h2 class="text-2xl font-bold mt-8 mb-4">HSN Code Requirements: 4 Digits vs 6 Digits</h2>
            <p class="mb-4">The CBIC requires businesses to declare HSN codes on tax invoices according to their Aggregate Annual Turnover (AATO):</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Turnover up to ₹5 Crores:</strong> Mandatory minimum of <strong>4 digits</strong> of HSN code on B2B tax invoices (optional on B2C supplies).</li>
                <li><strong>Turnover above ₹5 Crores:</strong> Mandatory minimum of <strong>6 digits</strong> of HSN code on all B2B and B2C tax invoices.</li>
                <li><strong>Chemical and pharma products:</strong> Certain designated bulk chemical supplies mandate full 8-digit HSN codes regardless of turnover.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">E-Invoicing Rules in 2026</h2>
            <p class="mb-4">Under Rule 48(4) of the CGST Rules, registered entities whose aggregate annual turnover exceeded <strong>₹5 Crores</strong> in any preceding financial year since 2017–18 are legally mandated to generate electronic invoices (e-invoicing). This involves submitting JSON payload data to an approved Invoice Registration Portal (IRP) such as NIC to obtain a 64-character Invoice Reference Number (IRN) and a digitally signed QR code.</p>
            <p class="mb-4">Any tax invoice issued by an e-invoicing-mandated taxpayer without an approved IRN is legally treated as an <strong>invalid document</strong>. The buyer cannot claim ITC, and the seller faces penalties under Section 122.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Intra-State vs Inter-State Tax Calculations</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Transaction Type</th>
                            <th class="p-3 border border-slate-200">Condition</th>
                            <th class="p-3 border border-slate-200">Tax Breakdown</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Intra-State Supply</td>
                            <td class="p-3 border border-slate-200">Supplier location and Place of Supply are in the <strong>same State or Union Territory</strong></td>
                            <td class="p-3 border border-slate-200 text-emerald-700 font-semibold">Equal split: 50% CGST + 50% SGST (or UTGST)</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Inter-State Supply</td>
                            <td class="p-3 border border-slate-200">Supplier location and Place of Supply are in <strong>different States / UTs</strong> or SEZ unit</td>
                            <td class="p-3 border border-slate-200 text-blue-700 font-semibold">100% IGST (Integrated Goods and Services Tax)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Penalties for Invoicing Errors Under Section 122</h2>
            <p class="mb-4">Under Section 122 of the CGST Act, issuing an invoice without supplying goods/services, or issuing an incorrect invoice that leads to short payment of tax, attracts a penalty of <strong>₹10,000 or 100% of the tax involved</strong> (whichever is higher). Routine clerical errors can lead to audit scrutiny and interest charges under Section 50 at 18% per annum.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">How MsgBill Keeps You 100% GST Compliant</h2>
            <p class="mb-4">MsgBill's bill generator automates compliance so you never worry about math errors or missing fields:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Automatic split between CGST+SGST vs IGST based on State selection.</li>
                <li>Exact two-decimal rounding without floating-point math errors.</li>
                <li>Automated sequential invoice numbering that adheres to financial year rules.</li>
                <li>Clean, printable PDF format containing all Rule 46 requirements.</li>
            </ul>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Create a 100% compliant GST bill now</h3>
                <p class="text-emerald-800 mb-4">Use MsgBill's free invoice generator to create an audit-ready GST invoice in under 30 seconds.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Generate GST Invoice Free →</a>
            </div>
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
            <p class="mb-6 text-lg">Indian business owners, consultants, and contractors frequently confuse a proforma invoice with a tax invoice. This common mistake can trigger premature GST liabilities before money has even been received, or cause your client to improperly claim Input Tax Credit (ITC) that gets flagged during department audits.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Core Comparison: Proforma Invoice vs Tax Invoice</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Comparison Dimension</th>
                            <th class="p-3 border border-slate-200">Proforma Invoice</th>
                            <th class="p-3 border border-slate-200 text-emerald-700">Tax Invoice (Rule 46)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Definition</td>
                            <td class="p-3 border border-slate-200">Preliminary estimate / quotation sent prior to delivery</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Legally binding tax document for supply of goods/services</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">GST Tax Liability</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Zero tax liability triggered</td>
                            <td class="p-3 border border-slate-200 text-rose-600">Immediate obligation to deposit GST via GSTR-3B</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Buyer ITC Claim</td>
                            <td class="p-3 border border-slate-200 text-rose-600 font-semibold">Cannot claim Input Tax Credit</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Mandatory proof for claiming ITC under Section 16</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Accounting Entry</td>
                            <td class="p-3 border border-slate-200">Memo entry only (not posted to sales ledger)</td>
                            <td class="p-3 border border-slate-200">Official credit to Sales Account & debtor debit</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Legal Enforceability</td>
                            <td class="p-3 border border-slate-200">Quotation / commercial offer</td>
                            <td class="p-3 border border-slate-200">Legally enforceable debt admissible in court</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">When Should You Issue a Proforma Invoice?</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Advance Payment Collection:</strong> When you require an advance deposit before starting manufacturing or ordering raw materials.</li>
                <li><strong>Custom Fabrication or Milestones:</strong> Before executing design, interior decoration, or custom software stages.</li>
                <li><strong>Import / Export Clearances:</strong> Overseas buyers and customs brokers require a proforma invoice to open Letters of Credit (LC) or arrange bank guarantees.</li>
                <li><strong>Government Tender Approvals:</strong> Institutional procurement teams need a formal price commitment before releasing purchase orders (PO).</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">When Must You Issue a Tax Invoice?</h2>
            <p class="mb-4">Under Section 31 of the CGST Act, you MUST issue a final Tax Invoice:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Supply of Goods:</strong> Before or at the time of removal of goods for transportation to the buyer.</li>
                <li><strong>Supply of Services:</strong> Within <strong>30 days</strong> from the date of completion of the service (or 45 days for banks and NBFCs).</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <p class="mb-2"><strong>Can I write GSTIN on a proforma invoice?</strong></p>
            <p class="mb-4">Yes, you may include your GSTIN and indicative GST rates for quotation clarity, but clearly label the document header as <strong>"PROFORMA INVOICE - NOT A TAX INVOICE"</strong> to avoid audit confusion.</p>

            <p class="mb-2"><strong>Can a customer claim GST input credit on a proforma invoice?</strong></p>
            <p class="mb-4">Absolutely not. Under Section 16(2) of the CGST Act, possession of a valid tax invoice or debit note is a mandatory prerequisite for claiming ITC. Claiming ITC against a proforma invoice will lead to notices and interest charges.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Create professional invoices in seconds</h3>
                <p class="text-emerald-800 mb-4">Generate clean, compliant tax invoices with automatic GST calculations on MsgBill.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Create Free Invoice Now →</a>
            </div>
        `
    },

    "delivery-challan-vs-tax-invoice-gst": {
        title: "Delivery Challan vs Tax Invoice under GST: When to Issue What (2026 Guide)",
        date: "2026-03-06",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">Transporting commercial goods across India without the proper statutory paperwork can lead to vehicle detention, consignment confiscation, and a 100% tax penalty under Section 129 of the CGST Act. Understanding exactly when to issue a Delivery Challan versus a Tax Invoice protects your business from expensive transit disruptions.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is a Delivery Challan Under Rule 55?</h2>
            <p class="mb-4">Under Rule 55 of the CGST Rules, 2017, a registered supplier may issue a <strong>Delivery Challan</strong> instead of a Tax Invoice in specific business circumstances where goods are removed or transported without an immediate sale taking place:</p>
            <ul class="list-disc pl-6 mb-6 space-y-3">
                <li><strong>1. Supply of Liquid Gas:</strong> Where the exact quantity at the time of removal from the supplier's warehouse or refinery is not known.</li>
                <li><strong>2. Transportation for Job Work:</strong> Sending raw materials, intermediate components, or semi-finished goods to an external processor for dyeing, cutting, assembly, or plating.</li>
                <li><strong>3. Goods on Approval or Return Basis:</strong> Where goods are sent to a customer for inspection, trial, or approval before final sale commitment (must be sold or returned within 6 months under Section 31(7)).</li>
                <li><strong>4. Non-Sale Movements & Exhibitions:</strong> Transporting inventory to trade expos, promotional events, or between branches of the same entity within the same state.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Delivery Challan Copies and Rules</h2>
            <p class="mb-4">Delivery challans must be generated in triplicate (three copies) with consecutive serial numbers unique for each financial year:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Original for Consignee:</strong> Handed over to the receiving party or job worker.</li>
                <li><strong>Duplicate for Transporter:</strong> Accompanies the vehicle driver during transit for highway inspection.</li>
                <li><strong>Triplicate for Consignor:</strong> Retained by the sending supplier for company audit records.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">E-Way Bill Requirement with Delivery Challan</h2>
            <p class="mb-4">A common misconception among traders is that an E-Way Bill is only needed for Tax Invoices. In reality, under Rule 138 of the CGST Rules, an <strong>E-Way Bill is mandatory for ANY movement of goods exceeding ₹50,000 consignment value</strong> (or designated inter-state thresholds), even when transported under a Delivery Challan or for job work.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Takeaway for Indian SMBs</h2>
            <p class="mb-4">If ownership of goods is transferring to a buyer in exchange for payment, always issue a formal <strong>Tax Invoice</strong>. If goods are simply moving physical locations for job work, demo, or storage without title transfer, always issue a <strong>Delivery Challan</strong> accompanied by an E-Way Bill.</p>

            <div class="bg-emerald-50 p-6 rounded-2xl my-8 border border-emerald-100">
                <h3 class="font-bold text-emerald-900 mb-2">Need to create a fast GST bill?</h3>
                <p class="text-emerald-800 mb-4">MsgBill generates clean, compliant GST bills in under 30 seconds with automatic tax calculation.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">Try Free Generator →</a>
            </div>
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
    },
    "e-invoicing-rules-2026-msme-threshold": {
        title: "e-Invoicing Rules 2026 for MSMEs: Mandatory Thresholds, B2B QR Code & Free Generator",
        date: "2026-03-10",
        author: "MsgBill Team",
        category: "GST Compliance",
        content: `
            <p class="mb-6 text-lg">As GST compliance digitizes across India, the Central Board of Indirect Taxes and Customs (CBIC) continues to tighten the electronic invoicing (e-invoicing) net. If your business sells to other GST-registered businesses (B2B), knowing whether you fall under mandatory e-invoicing is critical to avoid severe penalties and frozen Input Tax Credit (ITC) for your buyers.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What is e-Invoicing Under GST?</h2>
            <p class="mb-4">e-Invoicing is not creating invoices on a computer or emailing a PDF. Under GST Rule 48(4), e-invoicing means electronically authenticating your B2B invoice data on the government's <strong>Invoice Registration Portal (IRP)</strong> (such as einvoice1.gst.gov.in).</p>
            <p class="mb-4">Once authenticated, the IRP generates two mandatory security elements:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>IRN (Invoice Reference Number):</strong> A unique 64-character alphanumeric hash code.</li>
                <li><strong>Digitally Signed QR Code:</strong> Contains key invoice details readable offline by tax officers.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Mandatory Threshold Limits & Applicability (2026)</h2>
            <p class="mb-4">e-Invoicing applies to any GST-registered entity whose <strong>Aggregate Annual Turnover (AATO)</strong> exceeded the specified limit in <em>any</em> preceding financial year from 2017-18 onwards.</p>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Phase</th>
                            <th class="p-3 border border-slate-200">Turnover Threshold</th>
                            <th class="p-3 border border-slate-200">Status in 2026</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Phase I - IV</td>
                            <td class="p-3 border border-slate-200">Above ₹20 Crores</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Fully Mandatory</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-medium">Phase V</td>
                            <td class="p-3 border border-slate-200">Above ₹10 Crores</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Fully Mandatory</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-medium">Phase VI</td>
                            <td class="p-3 border border-slate-200">Above ₹5 Crores</td>
                            <td class="p-3 border border-slate-200 text-emerald-600 font-semibold">Mandatory for all B2B & Exports</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">Are B2C (Consumer) Invoices Subject to e-Invoicing?</h2>
            <p class="mb-4">No. <strong>e-Invoicing applies strictly to B2B supplies, supplies to SEZs, Deemed Exports, and Export invoices.</strong> If you sell directly to end consumers (B2C), you do not need an IRN from the IRP, but large entities require dynamic B2C UPI QR codes for digital payment collection.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">What Happens if You Issue an Invoice Without an IRN?</h2>
            <p class="mb-4">Under Section 122 of the CGST Act, an invoice issued without a valid IRN (when mandated) is legally considered <strong>invalid</strong>:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Penalty on Seller:</strong> 100% of the tax due or ₹10,000 (whichever is higher) for every incorrect invoice.</li>
                <li><strong>Loss of ITC for Buyer:</strong> Your customer cannot legally claim Input Tax Credit on an invoice lacking a validated IRN QR code.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">How Small Businesses & MSMEs Can Prepare</h2>
            <p class="mb-4">For small businesses, freelancers, and growing suppliers, maintaining clean sequential invoicing records is the first defense. Use MsgBill's free invoice generator to generate compliant, beautifully structured tax invoices with all statutory Rule 46 fields, GSTINs, HSN codes, and instant UPI payment links.</p>

            <div class="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl my-8 border border-emerald-100 dark:border-emerald-800">
                <h3 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Create a 100% Compliant GST Invoice in 10 Seconds</h3>
                <p class="text-emerald-800 dark:text-emerald-300 text-sm mb-4">No login required. Generate professional PDF invoices with automatic CGST, SGST, and IGST calculations, plus instant WhatsApp sharing.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md text-sm">Open Free Invoice Generator →</a>
            </div>
        `
    },

    "kirana-store-bill-format-upi-qr-code": {
        title: "Kirana & Retail Store Bill Format (2026 Guide): Mandatory GST Fields, UPI QR Code & Free Bill Maker",
        date: "2026-03-12",
        author: "MsgBill Team",
        category: "Retail & GST",
        content: `
            <p class="mb-6 text-lg">In Indian retail, customer speed at the counter is everything. Whether you run a neighborhood Kirana store, a provision mart, or a busy supermarket, giving customers a quick, professional receipt with an instant UPI QR code cuts billing time in half and eliminates cash change disputes.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Do Kirana Stores Need to Issue GST Invoices?</h2>
            <p class="mb-4">Under Section 31(3)(b) of the CGST Act, a registered retail shopkeeper is not required to issue a tax invoice if the sale value is less than <strong>₹200</strong>, provided the customer does not ask for one. However, if the purchase exceeds ₹200 or the buyer specifically requests a receipt, issuing a clean bill or cash memo is legally required.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Key Elements of a Modern Retail Receipt</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Store Identity:</strong> Shop Name, address, and contact number.</li>
                <li><strong>GSTIN:</strong> Mandatory if your shop is registered under regular or composition GST.</li>
                <li><strong>Date & Bill Number:</strong> Consecutive serial numbering for audit compliance.</li>
                <li><strong>Line Items:</strong> Item description, quantity, rate, and net total.</li>
                <li><strong>Dynamic UPI QR Code:</strong> Allows the customer to scan directly from the receipt or phone screen to pay via Google Pay, PhonePe, or Paytm in 3 seconds.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Why Paperless WhatsApp Receipts Beat Thermal Paper</h2>
            <p class="mb-4">Traditional POS thermal rolls cost ₹30 to ₹60 per roll, fade within weeks, and get discarded by customers immediately. Forward-thinking Indian retailers now offer WhatsApp receipts:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li>Save hundreds of rupees monthly on paper rolls and printer maintenance.</li>
                <li>Capture the customer's mobile number legitimately for repeat offers and festival greetings.</li>
                <li>Customers love having digital receipts saved permanently on their phones.</li>
            </ol>

            <div class="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl my-8 border border-emerald-100 dark:border-emerald-800">
                <h3 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Create Retail Bills on Any Phone or PC with MsgBill</h3>
                <p class="text-emerald-800 dark:text-emerald-300 text-sm mb-4">Zero hardware setup needed. Open the free generator, enter items, and send digital bills directly to your customer's WhatsApp.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md text-sm">Generate Free Retail Bill →</a>
            </div>
        `
    },

    "free-vyapar-app-alternative-pc-mobile": {
        title: "Top Free Vyapar Alternatives for PC & Mobile in 2026 (No Cost Comparison)",
        date: "2026-03-13",
        author: "MsgBill Team",
        category: "Software Comparison",
        content: `
            <p class="mb-6 text-lg">Vyapar has long been a popular desktop billing software for Indian small businesses. However, with their annual subscription prices rising to ₹2,399 – ₹3,299 per device and strict hardware locking, thousands of small business owners, freelancers, and retail shops are actively looking for lightweight, modern, and free alternatives.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Why Indian Businesses Are Looking Beyond Desktop Software</h2>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Hardware Traps:</strong> Traditional desktop apps trap your financial data on a single Windows PC. If the PC crashes, billing stops.</li>
                <li><strong>Heavy Installation:</strong> Desktop accounting suites require high RAM, frequent updates, and manual backup setups.</li>
                <li><strong>No Real-Time WhatsApp Delivery:</strong> Exporting PDFs from desktop software to manually attach in WhatsApp Web wastes precious customer minutes.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Top 3 Free Alternatives in 2026</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr class="bg-slate-100 text-slate-800 font-bold">
                            <th class="p-3 border border-slate-200">Software</th>
                            <th class="p-3 border border-slate-200">Starting Price</th>
                            <th class="p-3 border border-slate-200">Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-3 border border-slate-200 font-semibold text-emerald-600">MsgBill.com</td>
                            <td class="p-3 border border-slate-200 font-bold">100% Free Instant Generator</td>
                            <td class="p-3 border border-slate-200">Fast 10-second WhatsApp bills & UPI payments on any device</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-200 font-semibold">Zoho Invoice</td>
                            <td class="p-3 border border-slate-200">Free (Complex Setup)</td>
                            <td class="p-3 border border-slate-200">Service companies needing time-tracking and project billing</td>
                        </tr>
                        <tr>
                            <td class="p-3 border border-slate-200 font-semibold">MyBillBook</td>
                            <td class="p-3 border border-slate-200">Paid after trial (₹1,500+)</td>
                            <td class="p-3 border border-slate-200">Wholesale distributors needing warehouse inventory sync</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold mt-8 mb-4">The Verdict: Why MsgBill Wins on Mobile Speed</h2>
            <p class="mb-4">If you need double-entry accounting with audit trails, heavy desktop software makes sense. But if your goal is to generate clean GST bills, get paid instantly via UPI, and share receipts directly on WhatsApp without paying expensive renewal fees, MsgBill provides the fastest solution in Bharat.</p>

            <div class="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl my-8 border border-emerald-100 dark:border-emerald-800">
                <h3 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Try the 100% Free Invoice Generator Today</h3>
                <p class="text-emerald-800 dark:text-emerald-300 text-sm mb-4">No software download, no credit card, and no signup needed to create your first bill.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md text-sm">Open Free Generator →</a>
            </div>
        `
    },

    "garment-shop-cash-memo-format-gst": {
        title: "Garment & Clothing Store Cash Memo Format (2026 GST Retail Guide)",
        date: "2026-03-14",
        author: "MsgBill Team",
        category: "Retail & GST",
        content: `
            <p class="mb-6 text-lg">Running a clothing store, boutique, or textile showroom in India requires fast counter billing with accurate apparel HSN codes and GST slab calculation. Giving customers a professional cash memo builds trust and streamlines size exchange requests.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">GST Slabs & HSN Codes for Garments in 2026</h2>
            <p class="mb-4">Apparel items fall under Chapter 61 (knitted) and Chapter 62 (not knitted) of the GST tariff:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Sale Value Up to ₹1,000 per piece:</strong> 5% GST (2.5% CGST + 2.5% SGST).</li>
                <li><strong>Sale Value Exceeding ₹1,000 per piece:</strong> 12% GST (6% CGST + 6% SGST).</li>
                <li><strong>Custom Tailoring & Job Work:</strong> 5% or 12% depending on whether materials are supplied by the customer or boutique.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Essential Fields on a Clothing Store Cash Memo</h2>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Store Branding:</strong> Boutique Name, address, phone number, and Instagram handle.</li>
                <li><strong>Item Breakdown:</strong> Apparel category, size, color, quantity, unit price, and discount percentage.</li>
                <li><strong>Clear Return / Exchange Policy:</strong> E.g., "Exchange allowed within 7 days with original cash memo and tags attached."</li>
                <li><strong>Payment Mode:</strong> Cash, Card, or UPI Reference ID.</li>
            </ol>

            <div class="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl my-8 border border-emerald-100 dark:border-emerald-800">
                <h3 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Generate Instant Clothing Bills with MsgBill</h3>
                <p class="text-emerald-800 dark:text-emerald-300 text-sm mb-4">Support 5% and 12% GST slabs with automatic tax splits. Print A4, thermal, or send directly to customer's WhatsApp.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md text-sm">Create Free Garment Bill →</a>
            </div>
        `
    },

    "freelance-developer-gst-exemption-under-20-lakhs": {
        title: "Freelance Developer & Creator GST Exemption: 20 Lakhs Limit, LUT & Export Rules (2026)",
        date: "2026-03-15",
        author: "MsgBill Team",
        category: "Freelancing",
        content: `
            <p class="mb-6 text-lg">If you are a remote software engineer, UI/UX designer, digital marketer, or content creator in India earning income from domestic or overseas clients, understanding GST applicability is critical to prevent unexpected tax notices and bank freezes.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">The ₹20 Lakh Exemption Threshold (Domestic Clients)</h2>
            <p class="mb-4">Under Section 22 of the CGST Act, service providers whose aggregate annual turnover is below <strong>₹20 Lakhs</strong> (₹10 Lakhs in special category states) are <strong>not legally required to register for GST</strong> for intra-state supplies.</p>
            <p class="mb-4">If you bill domestic clients in India and stay below ₹20 Lakhs, you can issue standard non-GST commercial invoices or bills of supply without charging tax.</p>

            <h2 class="text-2xl font-bold mt-8 mb-4">Export of Services to Foreign Clients (Zero-Rated Supply)</h2>
            <p class="mb-4">When you work with foreign clients (US, UK, Europe, UAE) on Upwork, Fiverr, or direct contracts and receive payment in convertible foreign exchange (via Wise, Stripe, PayPal, or Bank Wire), your work is classified as <strong>Export of Services</strong> under Section 2(6) of the IGST Act.</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Export of services is treated as a <strong>Zero-Rated Supply</strong> (0% tax).</li>
                <li>By filing an annual online <strong>Letter of Undertaking (LUT)</strong> on the GST portal (Form GST RFD-11), you can invoice international clients legally with 0% IGST without paying tax upfront.</li>
                <li>Always request a <strong>FIRC (Foreign Inward Remittance Certificate)</strong> or e-BRC from your receiving bank as proof of export.</li>
            </ul>

            <h2 class="text-2xl font-bold mt-8 mb-4">Professional Invoicing for Tech Freelancers</h2>
            <p class="mb-4">Foreign clients expect clean, structured PDF invoices detailing project milestones, hourly rates, wire routing numbers (SWIFT/BIC codes), and payment terms. MsgBill allows tech professionals to create polished, international-grade invoices in seconds.</p>

            <div class="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl my-8 border border-emerald-100 dark:border-emerald-800">
                <h3 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Create Professional Freelance Invoices for Free</h3>
                <p class="text-emerald-800 dark:text-emerald-300 text-sm mb-4">Generate international invoices with 0% LUT or standard domestic GST in seconds. Download clean PDFs ready for client delivery.</p>
                <a href="/free-invoice-generator" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md text-sm">Generate Free Freelance Invoice →</a>
            </div>
        `
    },

};

export async function generateStaticParams() {
    return Object.keys(blogPosts).map((slug) => ({
        slug,
    }));
}

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
        "image": "https://msgbill.com/logo-final.png",
        "author": {
            "@type": "Person",
            "name": post.author || "Pradeep Kumar",
            "jobTitle": "FinTech & SME Billing Specialist",
            "url": "https://msgbill.com/about",
            "worksFor": {
                "@type": "Organization",
                "name": "MsgBill"
            }
        },
        "publisher": {
            "@type": "Organization",
            "name": "MsgBill",
            "url": "https://msgbill.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://msgbill.com/logo-final.png"
            }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://msgbill.com/blog/${params.slug}`
        }
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
                        <div className="flex items-center justify-center text-secondary-500 dark:text-secondary-400 text-xs gap-3">
                            <span className="font-semibold text-secondary-800 dark:text-secondary-200">Written by {post.author || "Pradeep Kumar"}</span>
                            <span>•</span>
                            <span>Fact-checked & Updated: {new Date(post.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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

                    {/* Author Byline & E-E-A-T Credibility Box */}
                    <div className="mt-8 p-6 bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                            PK
                        </div>
                        <div className="text-center sm:text-left space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
                                <h3 className="font-bold text-base text-secondary-900 dark:text-white">
                                    {post.author === "MsgBill Team" ? "Pradeep Kumar & MsgBill Editorial Desk" : post.author}
                                </h3>
                                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 inline-block self-center sm:self-auto">
                                    Verified Editorial Review
                                </span>
                            </div>
                            <p className="text-xs text-secondary-600 dark:text-secondary-400 leading-relaxed">
                                Curated and verified according to the Central Board of Indirect Taxes and Customs (CBIC) rules and Indian MSME invoicing standards. Written to help Indian homepreneurs, retail stores, and freelancers build compliant, fast-paying billing systems.
                            </p>
                            <p className="text-[11px] text-secondary-400">
                                <em>Disclaimer: Content published on MsgBill is strictly for general educational and recordkeeping guidance and does not constitute formal legal or chartered accounting advice.</em>
                            </p>
                        </div>
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
