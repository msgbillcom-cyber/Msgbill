// app/api/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-razorpay-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing signature' },
                { status: 401 }
            );
        }

        // Verify webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (webhookSecret) {
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
        }

        const event = JSON.parse(body);

        // Handle payment.captured event
        if (event.event === 'payment_link.paid') {
            const paymentLinkEntity = event.payload.payment_link.entity;
            const paymentLinkId = paymentLinkEntity.id;
            const referenceId = paymentLinkEntity.reference_id;
            const notes = paymentLinkEntity.notes || {};
            const payment = event.payload.payment.entity;
            
            // Check if it's a subscription payment
            let subscriptionOrgId: string | null = null;

            if (notes.payment_type === 'subscription' && notes.org_id) {
                subscriptionOrgId = notes.org_id;
            } else if (referenceId && referenceId.startsWith('sub_')) {
                // Fallback: referenceId format: sub_{orgId}_{timestamp} or sub_{orgId}
                const parts = referenceId.split('_');
                if (parts.length >= 2) {
                    subscriptionOrgId = parts[1];
                }
            }

            if (subscriptionOrgId) {
                const orgId = subscriptionOrgId;
                console.log(`Processing subscription for Org: ${orgId}`);

                // Upgrade organization to PRO
                    const { error: updateError } = await supabase
                        .from('organizations')
                        .update({
                            subscription_tier: 'pro'
                        })
                        .eq('id', orgId);

                    if (updateError) {
                        console.error('Failed to upgrade subscription (org update):', updateError);
                        
                        // Fallback: update usage_limits directly if org update fails
                        await supabase
                            .from('usage_limits')
                            .update({
                                plan_type: 'pro',
                                max_invoices: 2147483647,
                                max_clients: 2147483647,
                            })
                            .eq('org_id', orgId);
                    } else {
                        console.log(`Organization ${orgId} upgraded to PRO`);
                    }
                    
                    return NextResponse.json({ received: true });
            }

            // Find invoice by payment link ID
            const { data: invoice, error: findError } = await supabase
                .from('invoices')
                .select('*')
                .eq('payment_link_id', paymentLinkId)
                .single();

            if (findError || !invoice) {
                console.error('Invoice not found for payment link:', paymentLinkId);
                return NextResponse.json({ received: true });
            }

            // Update invoice status to paid
            await supabase
                .from('invoices')
                .update({
                    status: 'paid',
                    razorpay_payment_id: payment.id,
                    paid_at: new Date().toISOString(),
                })
                .eq('id', invoice.id);

            // Record payment in payments table
            await supabase.from('payments').insert({
                org_id: invoice.org_id,
                invoice_id: invoice.id,
                amount: payment.amount / 100, // Convert from paise
                payment_date: new Date(payment.created_at * 1000).toISOString(),
                method: 'razorpay',
                transaction_id: payment.id,
                notes: `Payment via Razorpay: ${payment.method}`,
            });

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
