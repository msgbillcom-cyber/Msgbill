import React from "react";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Server wrapper for the client-side storefront page (app/store/[org_id]/page.tsx).
// 1. Storefronts are customer-specific pages: keep them out of search results.
// 2. If the store ID clearly does not exist, return a real 404 instead of a
//    200 "Store Not Found" screen (soft 404).
// Any unexpected error (network, missing env vars) falls through to the
// existing client page, so valid stores are never blocked by this check.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Online Store | MsgBill",
    robots: { index: false, follow: false },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function storeExists(orgId: string): Promise<boolean | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return null; // cannot check, do not block

    try {
        // Same public view and anon key the client page already uses.
        const supabase = createClient(url, anonKey, {
            auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data, error } = await supabase
            .from("storefront_orgs")
            .select("id")
            .eq("id", orgId)
            .maybeSingle();

        if (error) return null; // unknown state, do not block
        return Boolean(data);
    } catch {
        return null;
    }
}

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { org_id: string };
}) {
    const orgId = params.org_id;

    // Organization IDs are UUIDs; anything else can never be a valid store.
    if (!orgId || !UUID_RE.test(orgId)) {
        notFound();
    }

    const exists = await storeExists(orgId);
    if (exists === false) {
        notFound();
    }

    return <>{children}</>;
}
