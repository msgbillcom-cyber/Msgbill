import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"
);

function yearFromNowIso() {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString();
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-razorpay-signature');
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();

        if (!webhookSecret) {
            console.error('RAZORPAY_WEBHOOK_SECRET is not set');
            return NextResponse.json(
                { error: 'Webhook not configured' },
                { status: 503 }
            );
        }

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing signature' },
                { status: 401 }
            );
        }

        const isValid = verifyRazorpayWebhookSignature(
            body,
            signature,
            webhookSecret
        );

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);

        if (event.event === 'payment_link.paid') {
            const paymentLinkEntity = event.payload.payment_link.entity;
            const paymentLinkId = paymentLinkEntity.id;
            const referenceId = paymentLinkEntity.reference_id;
            const notes = paymentLinkEntity.notes || {};
            const payment = event.payload.payment.entity;

            const subscriptionOrgId =
                notes.payment_type === 'subscription' && notes.org_id
                    ? (notes.org_id as string)
                    : null;

            if (subscriptionOrgId) {
                const orgId = subscriptionOrgId;
                const { error: updateError } = await supabase
                    .from('organizations')
                    .update({
                        subscription_tier: 'pro',
                        subscription_expires_at: yearFromNowIso(),
                    })
                    .eq('id', orgId);

                if (updateError) {
                    console.error('Failed to upgrade subscription:', updateError);
                    return NextResponse.json(
                        { error: 'Failed to upgrade subscription' },
                        { status: 500 }
                    );
                }

                await supabase
                    .from('usage_limits')
                    .update({
                        plan_type: 'pro',
                        max_invoices: 2147483647,
                        max_clients: 2147483647,
                    })
                    .eq('org_id', orgId);

                try {
                    await supabase.rpc('update_invoice_retention', {
                        org_uuid: orgId,
                        retention_months: 12,
                    });
                } catch (rpcErr) {
                    console.warn('update_invoice_retention failed:', rpcErr);
                }

                return NextResponse.json({ received: true });
            }

            let invoiceQuery = supabase.from('invoices').select('*');
            if (paymentLinkId) {
                invoiceQuery = invoiceQuery.eq('payment_link_id', paymentLinkId);
            }
            let { data: invoice, error: findError } = await invoiceQuery.maybeSingle();

            if ((findError || !invoice) && referenceId) {
                const byRef = await supabase
                    .from('invoices')
                    .select('*')
                    .eq('id', referenceId)
                    .maybeSingle();
                invoice = byRef.data;
                findError = byRef.error;
            }

            if (findError || !invoice) {
                console.error('Invoice not found for payment link:', paymentLinkId, referenceId);
                return NextResponse.json({ received: true, unmatched: true });
            }

            const { error: invUpdateError } = await supabase
                .from('invoices')
                .update({
                    status: 'paid',
                    payment_status: 'paid',
                    razorpay_payment_id: payment.id,
                    paid_at: new Date().toISOString(),
                })
                .eq('id', invoice.id);

            if (invUpdateError) {
                console.error('Failed to mark invoice paid:', invUpdateError);
                return NextResponse.json(
                    { error: 'Failed to update invoice' },
                    { status: 500 }
                );
            }

            const { error: payInsertError } = await supabase.from('payments').insert({
                org_id: invoice.org_id,
                invoice_id: invoice.id,
                amount: payment.amount / 100,
                payment_date: new Date(payment.created_at * 1000).toISOString(),
                method: 'razorpay',
                transaction_id: payment.id,
                notes: `Payment via Razorpay: ${payment.method}`,
            });

            if (payInsertError && payInsertError.code !== '23505') {
                console.error('Failed to record payment:', payInsertError);
                return NextResponse.json(
                    { error: 'Failed to record payment' },
                    { status: 500 }
                );
            }

            console.log(`Invoice ${invoice.invoice_number} marked as paid`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message || 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
