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

        const body = await request.json();
        const {
            currency = 'INR',
            description,
            notify = { sms: true, email: true, whatsapp: false },
        } = body;
        
        // Support both invoiceId and reference_id (legacy/Razorpay convention)
        const invoiceId = body.invoiceId || body.reference_id;

        if (!invoiceId) {
            return NextResponse.json(
                { error: 'Invoice ID is required' },
                { status: 400 }
            );
        }

        // Fetch invoice and client details from DB to prevent price manipulation
        const { data: invoice, error: invoiceError } = await supabase
            .from('invoices')
            .select('*, clients(*)')
            .eq('id', invoiceId)
            .single();

        if (invoiceError || !invoice) {
            return NextResponse.json(
                { error: 'Invoice not found or access denied' },
                { status: 404 }
            );
        }

        // Ensure invoice belongs to current user's organization
        const { data: profile } = await supabase
            .from('profiles')
            .select('org_id')
            .eq('id', session.user.id)
            .single();

        if (!profile?.org_id || invoice.org_id !== profile.org_id) {
            return NextResponse.json(
                { error: 'Invoice not found or access denied' },
                { status: 403 }
            );
        }

        // Use trusted data from DB
        const amount = invoice.grand_total;
        const customer = {
            name: invoice.clients?.name || 'Customer',
            contact: invoice.clients?.phone || '',
            email: invoice.clients?.email || ''
        };

        if (!amount) {
             return NextResponse.json(
                { error: 'Invalid invoice amount' },
                { status: 400 }
            );
        }

        // Check and clean Razorpay credentials
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
        const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

        if (!key_id || !key_secret) {
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

        console.log("Initializing Razorpay with Key ID:", key_id.substring(0, 8) + "...");

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id,
            key_secret,
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
