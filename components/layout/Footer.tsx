import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-12 bg-secondary-50 border-t">
            <div className="container-wide">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo-final.png"
                            alt="MsgBill"
                            width={200}
                            height={80}
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <div className="flex gap-8 text-sm text-secondary-600">
                        <Link
                            href="/features"
                            className="hover:text-primary-600 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="hover:text-primary-600 transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="hover:text-primary-600 transition-colors"
                        >
                            How it works
                        </Link>
                        <Link
                            href="/blog"
                            className="hover:text-primary-600 transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-primary-600 transition-colors"
                        >
                            About
                        </Link>
                    </div>
                    <p className="text-sm text-secondary-400">
                        © 2026 MsgBill. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
