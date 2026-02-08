// app/api/payments/create-link/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { formatRazorpayAmount } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const {
            invoiceId,
            amount,
            currency = 'INR',
            description,
            customer,
            notify = { sms: true, email: true, whatsapp: false },
        } = await request.json();

        if (!invoiceId || !amount || !customer) {
            return NextResponse.json(
                { error: 'Invoice ID, Amount, and Customer details are required' },
                { status: 400 }
            );
        }

        // Check if Razorpay credentials are configured
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
            // Return mock data for development
            const mockPaymentLink = {
                id: `plink_mock_${Date.now()}`,
                short_url: `https://rzp.io/i/mock${Math.random().toString(36).substr(2, 6)}`,
                status: 'created',
                amount: formatRazorpayAmount(amount),
                currency,
                description: description || `Payment for invoice`,
                customer,
                created_at: Math.floor(Date.now() / 1000),
            };

            // Update invoice with mock payment link
            // Use user's client to respect RLS
            await supabase
                .from('invoices')
                .update({
                    payment_link_id: mockPaymentLink.id,
                    payment_link_url: mockPaymentLink.short_url,
                })
                .eq('id', invoiceId);

            return NextResponse.json({
                paymentLink: mockPaymentLink,
                message: 'Mock payment link created (Razorpay not configured)',
            });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Create payment link
        const paymentLink = await razorpay.paymentLink.create({
            amount: formatRazorpayAmount(amount),
            currency,
            description: description || `Payment for invoice`,
            customer: {
                name: customer.name,
                contact: customer.contact,
                email: customer.email,
            },
            notify,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${invoiceId}?payment=success`,
            callback_method: 'get',
            reference_id: invoiceId,
        });

        // Update invoice with payment link
        await supabase
            .from('invoices')
            .update({
                payment_link_id: paymentLink.id,
                payment_link_url: paymentLink.short_url,
            })
            .eq('id', invoiceId);

        return NextResponse.json({ paymentLink });
    } catch (error: any) {
        console.error('Error creating payment link:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment link' },
            { status: 500 }
        );
    }
}
