import { AuthProvider } from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/app/globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: {
        default: "MsgBill - #1 WhatsApp Invoicing Software for Indian Business",
        template: "%s | MsgBill India",
    },
    description:
        "Create professional GST invoices in 10 seconds and send via WhatsApp. The best free invoicing app for Indian small businesses, freelancers, and shop owners.",
    keywords: [
        "invoice generator",
        "whatsapp invoicing",
        "gst billing software free",
        "mobile bill maker",
        "indian invoice app",
        "send invoice on whatsapp",
        "vyapar alternative",
        "mybillbook alternative",
        "inventory management software",
        "whatsapp store builder",
        "online store for small business",
        "payment collection automation",
        "upi payment link generator",
        "gst invoice format in excel",
        "billing app for pc",
        "retail billing software"
    ],
    metadataBase: new URL("https://msgbill.com"),
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://msgbill.com",
        title: "MsgBill - Send GST Invoices on WhatsApp",
        description:
            "Get paid 3x faster with WhatsApp invoices. Free for small businesses.",
        siteName: "MsgBill",
        images: [{
            url: "/logo-final.png",
            width: 800,
            height: 600,
            alt: "MsgBill Logo",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "MsgBill - WhatsApp Invoicing for India",
        description: "Create and share GST invoices instantly on WhatsApp.",
        images: ["/logo-final.png"],
    },
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    },
    verification: {
        google: "RAF69EU6exWaFlGZGCU0W2hQp19TFauMlbrT9lsKKjc",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#0ea5e9" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="MsgBill" />
                {/* Google Analytics 4 */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="google-analytics"
                            strategy="afterInteractive"
                        >
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `}
                        </Script>
                    </>
                )}

                {/* Microsoft Clarity */}
                {process.env.NEXT_PUBLIC_CLARITY_ID && (
                    <Script id="clarity-script" strategy="afterInteractive">
                        {`
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
                        `}
                    </Script>
                )}
            </head>
            <body>
                <ErrorBoundary>
                    <ToastProvider>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </ToastProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
