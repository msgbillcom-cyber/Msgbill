// app/api/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
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
            const paymentLinkId = event.payload.payment_link.entity.id;
            const payment = event.payload.payment.entity;

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
