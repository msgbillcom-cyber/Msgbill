import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { items } = await request.json();

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('org_id')
            .eq('id', session.user.id)
            .single();

        if (!profile?.org_id) {
            return NextResponse.json({ error: 'User has no organization' }, { status: 403 });
        }

        const results = [];
        for (const item of items) {
            if (!item.productId || !item.quantity) continue;

            const { error } = await supabaseAdmin.rpc('deduct_org_stock', {
                p_id: item.productId,
                p_quantity: item.quantity,
                p_org: profile.org_id,
            });

            if (error) {
                console.error(`Failed to update stock for ${item.productId}:`, error);
                results.push({ id: item.productId, status: 'failed', error: error.message });
            } else {
                results.push({ id: item.productId, status: 'success' });
            }
        }

        const failed = results.filter((r) => r.status === 'failed');
        if (failed.length > 0) {
            return NextResponse.json({ results }, { status: 409 });
        }

        return NextResponse.json({ results });
    } catch (error: any) {
        console.error('Stock Deduction Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
