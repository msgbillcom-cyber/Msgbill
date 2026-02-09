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

        // Process each item
        const results = [];
        for (const item of items) {
            if (!item.productId || !item.quantity) continue;

            // Direct update using admin client
            // "stock_quantity = stock_quantity - quantity"
            // Supabase JS doesn't support relative updates easily without RPC, 
            // but we can read then update, or use a raw query if we had one.
            // Since we don't have raw query RPC, we must Read -> Calculate -> Update.
            // This is not atomic but acceptable for this fix.

            // Security: Verify product belongs to user's org (via RLS check or explicit check)
            // Since we are using admin client, we MUST explicitly check org_id
            
            // 1. Get user's org_id
            const { data: profile } = await supabase
                .from('profiles')
                .select('org_id')
                .eq('id', session.user.id)
                .single();
                
            if (!profile?.org_id) {
                 results.push({ id: item.productId, status: 'failed', error: 'User has no organization' });
                 continue;
            }

            const { data: product } = await supabaseAdmin
                .from('products')
                .select('stock_quantity, org_id')
                .eq('id', item.productId)
                .single();

            if (!product) {
                 results.push({ id: item.productId, status: 'failed', error: 'Product not found' });
                 continue;
            }

            // 2. Check ownership
            if (product.org_id !== profile.org_id) {
                 results.push({ id: item.productId, status: 'failed', error: 'Unauthorized access to product' });
                 continue;
            }

            if (product) {
                const newStock = Number(product.stock_quantity) - Number(item.quantity);
                const { error } = await supabaseAdmin
                    .from('products')
                    .update({ stock_quantity: newStock })
                    .eq('id', item.productId);
                
                if (error) {
                    console.error(`Failed to update stock for ${item.productId}:`, error);
                    results.push({ id: item.productId, status: 'failed', error: error.message });
                } else {
                    results.push({ id: item.productId, status: 'success' });
                }
            }
        }

        return NextResponse.json({ results });

    } catch (error: any) {
        console.error('Stock Deduction Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
