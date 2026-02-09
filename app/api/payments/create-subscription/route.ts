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

        const { orgId, userEmail, userName, userPhone } = await request.json();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Organization ID is required' },
                { status: 400 }
            );
        }

        // Verify user belongs to the organization
        const { data: profile } = await supabase
            .from('profiles')
            .select('org_id')
            .eq('id', session.user.id)
            .single();
            
        if (!profile || !profile.org_id) {
             return NextResponse.json(
                { error: 'Unauthorized: No organization found for user' },
                { status: 403 }
            );
        }

        // Use profile.org_id as the source of truth
        const targetOrgId = profile.org_id;

        // Check and clean Razorpay credentials
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
        const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

        if (!key_id || !key_secret) {
             console.error("Razorpay Config Error: Missing or empty keys", { 
                 hasKeyId: !!key_id, 
                 hasKeySecret: !!key_secret 
             });
             return NextResponse.json(
                { error: 'Razorpay not configured' },
                { status: 500 }
            );
        }

        console.log("Initializing Razorpay with Key ID:", key_id.substring(0, 8) + "...");

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id,
            key_secret,
        });

        // Create unique reference ID (timestamp + random) to avoid duplicates
        const referenceId = `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const amount = 499; // ₹499

        // Create payment link
        const paymentLink = await razorpay.paymentLink.create({
            amount: formatRazorpayAmount(amount),
            currency: 'INR',
            description: 'MsgBill Pro Subscription (Monthly)',
            customer: {
                name: userName || 'MsgBill User',
                email: userEmail || session.user.email,
                contact: userPhone || '',
            },
            notes: {
                payment_type: 'subscription',
                org_id: targetOrgId
            },
            notify: {
                sms: !!userPhone,
                email: true,
            },
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscription=success`,
            callback_method: 'get',
            reference_id: referenceId,
        });

        return NextResponse.json({ 
            paymentLink: {
                short_url: paymentLink.short_url,
                id: paymentLink.id
            } 
        });

    } catch (error: any) {
        console.error('Error creating subscription link:', error);
        // Provide more detailed error message for debugging
        const errorMessage = error.error?.description || error.message || 'Failed to create subscription link';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
