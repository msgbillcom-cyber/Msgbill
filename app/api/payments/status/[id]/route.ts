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

        // Verify user profile and organization
        const { data: profile } = await supabase
            .from('profiles')
            .select('org_id')
            .eq('id', session.user.id)
            .single();

        if (!profile || !profile.org_id) {
             return NextResponse.json({ error: 'Unauthorized: Profile incomplete' }, { status: 403 });
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

        // Verify that this payment belongs to the user's organization
        // Check if it is a subscription payment or an invoice payment
        const referenceId = paymentLink.reference_id;
        const notes = (paymentLink as any).notes || {};
        
        if (!referenceId) {
             return NextResponse.json({ error: 'Invalid payment link: missing reference ID' }, { status: 400 });
        }

        let isAuthorized = false;

        // Check for subscription using notes (new method) or reference_id prefix (fallback)
        if (notes.payment_type === 'subscription' || referenceId.startsWith('sub_')) {
            // Subscription payment
            // Priority: Check notes.org_id
            if (notes.org_id && notes.org_id === profile.org_id) {
                isAuthorized = true;
            } 
            // Fallback: Check reference_id format sub_{orgId} (legacy)
            else if (referenceId === `sub_${profile.org_id}`) {
                isAuthorized = true;
            }
            // Fallback: Check reference_id format sub_{orgId}_{timestamp} (transitional)
            else {
                 const parts = referenceId.split('_');
                 if (parts.length >= 2 && parts[1] === profile.org_id) {
                     isAuthorized = true;
                 }
            }
        } else {
            // Invoice payment: reference_id is invoice ID
            // Verify invoice belongs to user's org
            const { data: invoice } = await supabase
                .from('invoices')
                .select('org_id')
                .eq('id', referenceId)
                .single();
            
            if (invoice && invoice.org_id === profile.org_id) {
                isAuthorized = true;
            }
        }

        if (!isAuthorized) {
             console.error(`Security Warning: User ${session.user.id} (Org ${profile.org_id}) tried to access payment ${paymentLinkId} belonging to ${referenceId}`);
             return NextResponse.json({ error: 'Unauthorized: Payment does not belong to your organization' }, { status: 403 });
        }

        const isPaid = paymentLink.status === 'paid';

        // Safe extraction of payment_id
        let paymentId = (paymentLink as any).payment_id;
        if (!paymentId && (paymentLink as any).payments && (paymentLink as any).payments.length > 0) {
             paymentId = (paymentLink as any).payments[0].payment_id;
        }

        return NextResponse.json({
            status: paymentLink.status,
            paid: isPaid,
            payment_id: paymentId,
        });

    } catch (error: any) {
        console.error('Error fetching payment status:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payment status' },
            { status: 500 }
        );
    }
}
