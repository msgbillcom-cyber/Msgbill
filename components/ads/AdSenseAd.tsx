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
                <div className="w-full py-4 px-6 rounded-xl border border-dashed border-secondary-200 bg-secondary-50/70 dark:bg-secondary-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 font-bold text-sm">
                            AD
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-secondary-800 dark:text-secondary-200">
                                Sponsor slot (AdSense pending config)
                            </p>
                            <p className="text-[11px] text-secondary-500">
                                Free GST bills on WhatsApp — no login required on the generator.
                            </p>
                        </div>
                    </div>
                    <a
                        href="/auth/signup"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 hover:border-primary-500 text-primary-600 transition-colors shadow-sm whitespace-nowrap"
                    >
                        Sign Up Free (No Ads) →
                    </a>
                </div>
            )}
        </div>
    );
}
