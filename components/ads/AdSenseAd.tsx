"use client";

import React, { useEffect, useRef } from "react";

interface AdSenseAdProps {
    slot?: string;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    responsive?: boolean;
    className?: string;
    label?: string;
}

/**
 * Public-surface AdSense unit only. Never import under /dashboard/*.
 * Requires NEXT_PUBLIC_ADSENSE_CLIENT_ID and real data-ad-slot from AdSense console.
 */
export default function AdSenseAd({
    slot,
    format = "auto",
    responsive = true,
    className = "",
    label = "Advertisement",
}: AdSenseAdProps) {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const pushed = useRef(false);

    useEffect(() => {
        if (!clientId || !slot || pushed.current) return;
        if (typeof window === "undefined") return;
        try {
            // @ts-expect-error adsbygoogle global
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch (err) {
            console.error("AdSense push error:", err);
        }
    }, [clientId, slot]);

    return (
        <div
            className={`my-6 mx-auto w-full text-center overflow-hidden ${className}`}
            style={{ minHeight: "100px" }}
        >
            <div className="text-[10px] uppercase tracking-wider text-secondary-400 font-semibold mb-1">
                {label}
            </div>

            {clientId && slot ? (
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", minHeight: "90px" }}
                    data-ad-client={clientId}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive ? "true" : "false"}
                />
            ) : (
                <div className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary-500/10 border border-emerald-200/60 dark:border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            ₹
                        </div>
                        <div>
                            <p className="text-xs font-bold text-secondary-900 dark:text-white">
                                Instant GST Invoicing for Indian SMBs
                            </p>
                            <p className="text-[11px] text-secondary-600 dark:text-secondary-400">
                                Create GST invoices and cash memos in seconds. Send directly over WhatsApp.
                            </p>
                        </div>
                    </div>
                    <a
                        href="/free-invoice-generator"
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm whitespace-nowrap"
                    >
                        Try Free Bill Generator →
                    </a>
                </div>
            )}
        </div>
    );
}
