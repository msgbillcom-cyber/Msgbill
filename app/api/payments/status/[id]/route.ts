import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const paymentLinkId = params.id;
        const supabase = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
        const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

        if (!key_id || !key_secret) {
            return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 });
        }

        console.log("Initializing Razorpay with Key ID:", key_id.substring(0, 8) + "...");

        const razorpay = new Razorpay({
            key_id,
            key_secret,
        });

        // Fetch payment link from Razorpay
        const paymentLink = await razorpay.paymentLink.fetch(paymentLinkId);

        const isPaid = paymentLink.status === 'paid';

        return NextResponse.json({
            status: paymentLink.status,
            paid: isPaid,
            payment_id: paymentLink.payment_id,
        });

    } catch (error: any) {
        console.error('Error fetching payment status:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch payment status' },
            { status: 500 }
        );
    }
}
