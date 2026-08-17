// app/api/invoices/track-share/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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

        const { invoiceId, shareType, recipient, metadata } = await request.json();

        if (!invoiceId || !shareType) {
            return NextResponse.json(
                { error: 'Invoice ID and share type are required' },
                { status: 400 }
            );
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('org_id')
            .eq('id', session.user.id)
            .single();

        const { data: currentInvoice } = await supabase
            .from('invoices')
            .select('id, status, org_id')
            .eq('id', invoiceId)
            .single();

        if (!currentInvoice || !profile?.org_id || currentInvoice.org_id !== profile.org_id) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        const { data, error } = await supabase
            .from('share_history')
            .insert({
                invoice_id: invoiceId,
                share_type: shareType,
                recipient,
                metadata: metadata || {},
            })
            .select()
            .single();

        if (error) {
            console.error('Error tracking share:', error);
            return NextResponse.json(
                { error: 'Failed to track share' },
                { status: 500 }
            );
        }

        // Update invoice with latest share timestamp AND set status to 'sent' if it was 'draft'
        const updateField = shareType === 'whatsapp' ? 'whatsapp_shared_at' : 'email_sent_at';

        const updates: any = { [updateField]: new Date().toISOString() };
        
        if (currentInvoice?.status === 'draft') {
            updates.status = 'sent';
        }

        await supabase
            .from('invoices')
            .update(updates)
            .eq('id', invoiceId);

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Error in track-share API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
