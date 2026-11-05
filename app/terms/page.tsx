import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MsgBill",
  description:
    "MsgBill Terms of Service: acceptable use, accounts, invoices, subscriptions, liability, governing law (Karnataka, India), and contact at support@msgbill.com.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-secondary-950">
      <Navbar />
      <main className="flex-1 container-wide py-24 max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-secondary-900 p-8 sm:p-12 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Legal &amp; Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-secondary-900 dark:text-white mt-2">
              Terms of Service
            </h1>
            <p className="text-xs text-secondary-500 mt-1">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-secondary dark:prose-invert max-w-none text-sm text-secondary-600 dark:text-secondary-400 space-y-6 leading-relaxed">
            <p>
              Welcome to MsgBill (<strong>https://msgbill.com</strong>), operated by{" "}
              <strong>MsgBill Financial Technologies</strong> (&quot;MsgBill&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;), with operations referenced from Bengaluru,
              Karnataka, India. These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of our websites, free invoice tools, dashboards, APIs (if any), and related
              services (collectively, the &quot;Service&quot;).
            </p>
            <p>
              By accessing or using the Service, creating an account, or generating documents
              through MsgBill, you agree to these Terms and our{" "}
              <Link href="/privacy" className="text-emerald-600 underline">
                Privacy Policy
              </Link>
              . If you do not agree, do not use the Service.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              1. Who We Are &amp; What MsgBill Provides
            </h2>
            <p>
              MsgBill provides invoicing, billing, WhatsApp-oriented sharing workflows, UPI-oriented
              payment references, and related productivity tools for Indian small businesses,
              freelancers, and MSMEs. We are a software provider. We are{" "}
              <strong>not</strong> a Chartered Accountant firm, tax advisor, law firm, payment
              bank, or GST return filing intermediary unless a specific product feature expressly
              states otherwise in writing.
            </p>
            <p>
              Documents you create (invoices, bills of supply, estimates, etc.) are generated from
              information <strong>you</strong> enter. You remain solely responsible for GST
              compliance, HSN/SAC selection, tax rates, e-invoicing obligations, record retention,
              and filings with the Government of India or state authorities.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              2. Eligibility &amp; Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be able to form a binding contract under applicable Indian law.</li>
              <li>
                If you use MsgBill on behalf of a business, you represent that you are authorised to
                bind that business to these Terms.
              </li>
              <li>
                You must provide accurate registration details and keep your login credentials
                confidential. You are responsible for activity under your account.
              </li>
              <li>
                We may refuse, suspend, or terminate accounts that appear fraudulent, abusive, or
                in breach of these Terms.
              </li>
            </ul>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              3. Free Tools, Guest Use &amp; Paid Plans
            </h2>
            <p>
              Some features (including the free invoice generator) may be available without an
              account, subject to fair-use limits, advertising, watermarks, or feature caps we
              publish on the site. Paid or Pro plans, if offered, are governed by the pricing page
              at the time of purchase, including billing cycle, taxes (if applicable), and renewal
              terms shown at checkout.
            </p>
            <p>
              Unless a plan description says otherwise, fees are generally non-refundable once a
              billing period has started, except where required by Indian consumer law or where we
              expressly approve a refund. We may change prices with reasonable notice for future
              periods.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              4. Acceptable Use
            </h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any law, including GST, tax, fraud, or anti-money-laundering rules.</li>
              <li>
                Create fake invoices, forged documents, or misleading payment requests intended to
                deceive others.
              </li>
              <li>Spam, phish, harass, or send unsolicited bulk messages via any MsgBill feature.</li>
              <li>
                Attempt to reverse engineer, scrape at abusive volume, overload, or disrupt the
                Service.
              </li>
              <li>
                Upload malware, or probe other users&apos; data without authorisation.
              </li>
              <li>
                Impersonate MsgBill, government authorities, or another business.
              </li>
            </ul>
            <p>
              We may remove content, throttle usage, or suspend access when we reasonably believe a
              violation has occurred.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              5. Your Content &amp; Invoice Data
            </h2>
            <p>
              You retain ownership of the business data and document content you submit
              (&quot;Customer Content&quot;). You grant MsgBill a limited licence to host, process,
              transmit, and display Customer Content solely to operate and improve the Service
              (including backups, security, and support).
            </p>
            <p>
              You represent that you have the rights to submit Customer Content (including client
              names, phone numbers, and GSTINs) and that doing so does not violate privacy or
              confidentiality obligations you owe to others.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              6. WhatsApp, UPI &amp; Third-Party Services
            </h2>
            <p>
              MsgBill may help you create links, PDFs, or workflows that you share through WhatsApp,
              UPI apps, email, or other third-party platforms. Those platforms are governed by{" "}
              <strong>their own</strong> terms and privacy policies. MsgBill does not control
              WhatsApp delivery, UPI settlement, bank downtime, or third-party outages, and is not
              liable for delays or failed payments on those networks.
            </p>
            <p>
              Payment QR codes or UPI IDs shown on documents are based on values you provide. Verify
              them before sending bills to customers.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              7. Educational Content &amp; No Professional Advice
            </h2>
            <p>
              Blog articles, guides, templates, and on-site explanations are for general education
              about invoicing and GST concepts for Indian MSMEs. They may become outdated when CBIC
              notifications or rates change.{" "}
              <strong>
                Nothing on MsgBill is tax, legal, or accounting advice.
              </strong>{" "}
              Consult a qualified Chartered Accountant or advocate for decisions about registration,
              rates, ITC, composition, e-invoicing, or disputes.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              8. Intellectual Property
            </h2>
            <p>
              The MsgBill name, logos, UI, software, and original content are owned by us or our
              licensors. You may not copy, resell, or frame the Service except as allowed by
              features we explicitly provide (for example, downloading your own invoice PDFs).
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              9. Advertising
            </h2>
            <p>
              Free or logged-out experiences may show third-party advertisements (including Google
              AdSense). Ad-free experiences, if offered for logged-in or paid users, will be
              described on the relevant plan page. Advertising partners may use cookies as explained
              in our Privacy Policy.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              10. Service Availability &amp; Changes
            </h2>
            <p>
              We aim for reliable uptime but do not guarantee uninterrupted or error-free Service.
              Features may change, and we may discontinue components with reasonable notice when
              practicable. Maintenance windows, force majeure events, and upstream cloud failures
              can affect availability.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              11. Disclaimers
            </h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS TO
              THE MAXIMUM EXTENT PERMITTED BY LAW. WE DISCLAIM WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT
              INVOICES GENERATED WILL BE ACCEPTED by any customer, auditor, GST authority, or
              marketplace.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              12. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted under applicable law, MsgBill and its officers,
              employees, and partners shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or for lost profits, lost data, business
              interruption, or tax penalties arising from your use of the Service.
            </p>
            <p>
              Our aggregate liability arising out of these Terms or the Service shall not exceed the
              greater of (a) the amounts you paid us for the Service in the three (3) months before
              the claim, or (b) INR 2,000 (two thousand rupees), except where liability cannot be
              limited under Indian law (including proven fraud or wilful misconduct).
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              13. Indemnity
            </h2>
            <p>
              You agree to indemnify and hold harmless MsgBill from claims, losses, and expenses
              (including reasonable legal fees) arising out of your Customer Content, your invoices
              or payment requests, your breach of these Terms, or your violation of law or
              third-party rights.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              14. Termination
            </h2>
            <p>
              You may stop using the Service at any time. You may request account closure via{" "}
              <a href="mailto:support@msgbill.com" className="text-emerald-600 underline">
                support@msgbill.com
              </a>
              . We may suspend or terminate access for breach, legal risk, non-payment, or extended
              inactivity. Provisions that by nature should survive (IP, disclaimers, liability
              limits, indemnity, governing law) will survive termination.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              15. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of <strong>India</strong>. Subject to mandatory
              consumer protections, courts at <strong>Bengaluru, Karnataka</strong> shall have
              exclusive jurisdiction over disputes arising from these Terms or the Service. Before
              filing a claim, please email support so we can try to resolve the issue informally.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              16. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The &quot;Last Updated&quot; date will
              change, and material updates may also be notified on the website or by email when
              appropriate. Continued use after changes means you accept the revised Terms.
            </p>

            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
              17. Contact
            </h2>
            <p>
              Questions about these Terms:
              <br />
              <strong>MsgBill Financial Technologies</strong>
              <br />
              Bengaluru, Karnataka, India
              <br />
              Email:{" "}
              <a href="mailto:support@msgbill.com" className="text-emerald-600 underline">
                support@msgbill.com
              </a>
              <br />
              Website:{" "}
              <a href="https://msgbill.com" className="text-emerald-600 underline">
                https://msgbill.com
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-secondary-200 dark:border-secondary-800 flex flex-wrap gap-4">
            <Link href="/" className="text-sm font-semibold text-emerald-600 hover:underline">
              ← Return to MsgBill Home
            </Link>
            <Link href="/privacy" className="text-sm font-semibold text-secondary-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-secondary-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
