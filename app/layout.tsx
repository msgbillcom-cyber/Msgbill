import { AuthProvider } from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/app/globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: {
        default: "Bill & Invoice on WhatsApp | WhatsApp Bill Maker | MsgBill",
        template: "%s | MsgBill India",
    },
    description:
        "Create bill and invoice on WhatsApp in 10 seconds. WhatsApp invoice & WhatsApp bill maker for Indian businesses. Free GST billing, send invoice via WhatsApp.",
    keywords: [
        "bill",
        "invoice",
        "whatsapp bill",
        "whatsapp invoice",
        "bill on whatsapp",
        "invoice on whatsapp",
        "whatsapp bill maker",
        "whatsapp invoice maker",
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
        title: "Bill & Invoice on WhatsApp | WhatsApp Bill Maker | MsgBill",
        description:
            "Create bill and invoice on WhatsApp. WhatsApp invoice maker. Free GST billing, send invoice via WhatsApp. Get paid 3x faster.",
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
        title: "Bill & Invoice on WhatsApp | WhatsApp Bill Maker | MsgBill",
        description: "Create bill and invoice on WhatsApp. WhatsApp invoice maker. Free GST billing.",
        images: ["/logo-final.png"],
    },
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    },
    verification: {
        google: "RAF69EU6exWaFlGZGCU0W2hQp19TFauMlbrT9lsKKjc",
        other: {
            "google-adsense-account": "ca-pub-2707130870413244",
        },
    },
    alternates: {
        canonical: "https://msgbill.com",
        languages: {
            "en-IN": "https://msgbill.com",
            "hi-IN": "https://msgbill.com",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-IN">
            <head>
                <meta name="theme-color" content="#0ea5e9" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="MsgBill" />
                <meta
                    name="google-adsense-account"
                    content="ca-pub-2707130870413244"
                />
                {/* Raw script — AdSense crawler requires classic <script>, not next/script */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2707130870413244"
                    crossOrigin="anonymous"
                ></script>
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

                <Script
                    id="msgbill-jsonld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "SoftwareApplication",
                                    name: "MsgBill",
                                    applicationCategory: "BusinessApplication",
                                    operatingSystem: "Web",
                                    url: "https://msgbill.com",
                                    areaServed: {
                                        "@type": "Country",
                                        name: "India",
                                    },
                                    offers: {
                                        "@type": "Offer",
                                        price: "499",
                                        priceCurrency: "INR",
                                        description:
                                            "MsgBill Pro, billed ₹499 once per year. Not a ₹10 plan.",
                                    },
                                    description:
                                        "GST invoice and WhatsApp billing software for Indian small businesses. Free to start. Pro is ₹499 per year.",
                                },
                                {
                                    "@type": "Organization",
                                    name: "MsgBill",
                                    url: "https://msgbill.com",
                                    logo: "https://msgbill.com/logo-final.png",
                                },
                            ],
                        }),
                    }}
                />
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
