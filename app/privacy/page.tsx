import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | MsgBill - Data Protection & Cookie Policy",
    description: "MsgBill Privacy Policy: How we protect your data, handle cookies, Google AdSense advertising, and maintain GST invoice privacy.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-secondary-950">
            <Navbar />
            <main className="flex-1 container-wide py-24 max-w-4xl mx-auto px-4">
                <div className="bg-white dark:bg-secondary-900 p-8 sm:p-12 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-xl space-y-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                            Legal & Compliance
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-secondary-900 dark:text-white mt-2">
                            Privacy Policy
                        </h1>
                        <p className="text-xs text-secondary-500 mt-1">
                            Last Updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                        </p>
                    </div>

                    <div className="prose prose-secondary dark:prose-invert max-w-none text-sm text-secondary-600 dark:text-secondary-400 space-y-6 leading-relaxed">
                        <p>
                            Welcome to MsgBill (`https://msgbill.com`), operated by MsgBill Financial Technologies ("we", "us", or "our"). 
                            We are committed to safeguarding your personal data and ensuring transparent compliance with global privacy standards, 
                            including the Information Technology Act, 2000 (India), General Data Protection Regulation (GDPR), and Google AdSense Publisher Policies.
                        </p>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            1. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Data:</strong> When you register for a free MsgBill account, we collect your name, email address, phone number, and organization name.</li>
                            <li><strong>Invoice Data:</strong> Details entered during invoice creation (client name, product description, rates, tax amounts, UPI ID). All invoice data remains strictly confidential and is never sold.</li>
                            <li><strong>Log and Device Data:</strong> IP address, browser type, device identifiers, and pages visited to ensure security and optimize performance.</li>
                        </ul>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            2. Google AdSense & Third-Party Advertising Policy
                        </h2>
                        <p>
                            We use Google AdSense and third-party advertising vendors to serve advertisements when you visit our website. 
                            These companies may use cookies and web beacons to collect non-personally identifiable information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                        </p>
                        <div className="bg-slate-50 dark:bg-secondary-800/60 p-4 rounded-xl border border-secondary-200 dark:border-secondary-700 text-xs space-y-2">
                            <p><strong>Google DoubleClick DART Cookie:</strong></p>
                            <p>
                                • Google, as a third-party vendor, uses cookies to serve ads on `msgbill.com`.<br />
                                • Google's use of the DART cookie enables it to serve ads to our users based on their visit to `msgbill.com` and other sites on the Internet.<br />
                                • Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at:{" "}
                                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
                                    https://policies.google.com/technologies/ads
                                </a>
                            </p>
                        </div>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            3. Ad-Free Logged-In User Guarantee
                        </h2>
                        <p>
                            As part of our freemium commitment, users who create and log into a verified MsgBill account enjoy an 
                            <strong> entirely ad-free dashboard experience</strong>. Third-party advertising tags are suppressed on protected customer dashboard pages.
                        </p>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            4. Data Storage, Security & Retention
                        </h2>
                        <p>
                            Your financial documents and client directories are stored inside enterprise-grade databases with encrypted TLS/SSL connections and strict Row-Level Security (RLS). 
                            Registered users benefit from up to 1-year document retention for auditing and GST filing compliance.
                        </p>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            5. Your Rights & Opt-Outs
                        </h2>
                        <p>
                            You have the right to access, rectify, or delete your personal account data at any time through your dashboard settings or by contacting our data protection officer at 
                            <a href="mailto:privacy@msgbill.com" className="text-emerald-600 underline ml-1">privacy@msgbill.com</a>.
                        </p>

                        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">
                            6. Contact Us
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy or our advertising practices, please contact us at:
                            <br />
                            <strong>MsgBill Financial Technologies</strong><br />
                            Email: <a href="mailto:support@msgbill.com" className="text-emerald-600 underline">support@msgbill.com</a><br />
                            Website: <a href="https://msgbill.com" className="text-emerald-600 underline">https://msgbill.com</a>
                        </p>
                    </div>

                    <div className="pt-6 border-t border-secondary-200 dark:border-secondary-800">
                        <Link href="/" className="text-sm font-semibold text-emerald-600 hover:underline">
                            ← Return to MsgBill Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
