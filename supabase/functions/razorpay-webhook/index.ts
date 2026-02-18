import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const razorpayWebhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
        return new Response("No signature provided", { status: 401 });
    }

    const body = await req.text();

    // Signature verification
    const hmac = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(razorpayWebhookSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
    );

    const verified = await crypto.subtle.verify(
        "HMAC",
        hmac,
        new Uint8Array(
            (signature as string)
                .match(/.{1,2}/g)!
                .map((byte) => parseInt(byte, 16))
        ),
        new TextEncoder().encode(body)
    );

    if (!verified) {
        return new Response("Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    console.log(`Processing event: ${event}`);

    if (event === "payment_link.paid") {
        const paymentLink = payload.payload.payment_link.entity;
        const payment = payload.payload.payment.entity;
        const paymentLinkId = paymentLink.id;
        const notes = paymentLink.notes || {};
        const referenceId = paymentLink.reference_id || "";

        // Subscription payment: upgrade org to pro and set 1-year retention
        let subscriptionOrgId: string | null = null;
        if (notes.payment_type === "subscription" && notes.org_id) {
            subscriptionOrgId = notes.org_id;
        } else if (referenceId.startsWith("sub_")) {
            const parts = referenceId.split("_");
            if (parts.length >= 2) subscriptionOrgId = parts[1];
        }
        if (subscriptionOrgId) {
            const { error: updateError } = await supabase
                .from("organizations")
                .update({ subscription_tier: "pro" })
                .eq("id", subscriptionOrgId);
            if (!updateError) {
                await supabase.rpc("update_invoice_retention", {
                    org_uuid: subscriptionOrgId,
                    retention_months: 12,
                });
            }
            return new Response(JSON.stringify({ success: true }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        // Invoice payment: find invoice and update
        const { data: invoice, error: fetchError } = await supabase
            .from("invoices")
            .select("*")
            .eq("payment_link_id", paymentLinkId)
            .single();

        if (fetchError || !invoice) {
            console.error("Invoice not found for payment link:", paymentLinkId);
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        // 2. Update Invoice Status
        const { error: updateError } = await supabase
            .from("invoices")
            .update({
                status: "paid",
                payment_status: "paid"
            })
            .eq("id", invoice.id);

        if (updateError) {
            console.error("Failed to update invoice:", updateError);
            return new Response("Update failed", { status: 500 });
        }

        // 3. Record the Payment
        const { error: paymentError } = await supabase
            .from("payments")
            .insert({
                org_id: invoice.org_id,
                invoice_id: invoice.id,
                amount: payment.amount / 100, // Razorpay amount is in paise
                method: "razorpay",
                transaction_id: payment.id,
                notes: `Razorpay Payment Link: ${paymentLinkId}`
            });

        if (paymentError) {
            console.error("Failed to record payment:", paymentError);
        }
    }

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    });
});
