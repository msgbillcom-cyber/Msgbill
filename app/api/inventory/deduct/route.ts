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

            const { data: product } = await supabaseAdmin
                .from('products')
                .select('stock_quantity')
                .eq('id', item.productId)
                .single();

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
