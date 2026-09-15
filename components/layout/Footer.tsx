import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-14 bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800">
            <div className="container-wide">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand column */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Image
                            src="/logo-final.png"
                            alt="MsgBill"
                            width={200}
                            height={80}
                            className="h-14 w-auto object-contain"
                        />
                        <p className="text-xs text-secondary-500 leading-relaxed">
                            MsgBill is the WhatsApp-native billing and invoicing software for Indian small businesses, homepreneurs, and freelancers.
                        </p>
                    </div>

                    {/* Free Tools column */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900 dark:text-white">
                            Free Tools
                        </h4>
                        <ul className="space-y-2 text-xs text-secondary-600 dark:text-secondary-400">
                            <li>
                                <Link href="/free-invoice-generator" className="hover:text-emerald-600 transition-colors font-medium">
                                    WhatsApp Invoice Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/free-invoice-generator" className="hover:text-emerald-600 transition-colors">
                                    Free GST Bill Maker
                                </Link>
                            </li>
                            <li>
                                <Link href="/free-invoice-generator" className="hover:text-emerald-600 transition-colors">
                                    Cash Memo & Receipt Maker
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Guides Column (Internal Link Equity) */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900 dark:text-white">
                            Popular Guides
                        </h4>
                        <ul className="space-y-2 text-xs text-secondary-600 dark:text-secondary-400">
                            <li>
                                <Link href="/blog/whatsapp-invoice-guide" className="hover:text-emerald-600 transition-colors">
                                    WhatsApp Invoicing Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/e-invoicing-rules-2026-msme-threshold" className="hover:text-emerald-600 transition-colors">
                                    e-Invoicing Rules 2026
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/kirana-store-bill-format-upi-qr-code" className="hover:text-emerald-600 transition-colors">
                                    Kirana Store Bill Format
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/free-vyapar-app-alternative-pc-mobile" className="hover:text-emerald-600 transition-colors">
                                    Free Vyapar Alternative
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Product & Resources */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900 dark:text-white">
                            Product & Blog
                        </h4>
                        <ul className="space-y-2 text-xs text-secondary-600 dark:text-secondary-400">
                            <li>
                                <Link href="/features" className="hover:text-emerald-600 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="hover:text-emerald-600 transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-emerald-600 transition-colors">
                                    All 20+ Blog Guides
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900 dark:text-white">
                            Company & Legal
                        </h4>
                        <ul className="space-y-2 text-xs text-secondary-600 dark:text-secondary-400">
                            <li>
                                <Link href="/about" className="hover:text-emerald-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-emerald-600 transition-colors">
                                    Contact & Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                                    Privacy Policy & Cookies
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-secondary-200 dark:border-secondary-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-secondary-400">
                    <p>© 2026 MsgBill Financial Technologies. All rights reserved.</p>
                    <p>GST Compliant Invoicing Built with ❤️ for Bharat.</p>
                </div>
            </div>
        </footer>
    );
}
