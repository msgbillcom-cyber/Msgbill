import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        // 1. Authenticate user (we still need to know who is asking)
        const supabase = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...productData } = body;

        // 2. Validate Org Access (Security Check)
        // Ensure the user actually belongs to the org they are trying to create/edit products for
        const { data: membership } = await supabase
            .from('organization_members')
            .select('role')
            .eq('org_id', productData.org_id)
            .eq('user_id', session.user.id)
            .single();

        if (!membership) {
            return NextResponse.json({ error: 'Forbidden: You are not a member of this organization' }, { status: 403 });
        }

        // 3. Perform Operation using Admin Client (Bypassing RLS)
        let result;
        if (id) {
            // UPDATE
            result = await supabaseAdmin
                .from('products')
                .update(productData)
                .eq('id', id)
                .select()
                .single();
        } else {
            // INSERT
            result = await supabaseAdmin
                .from('products')
                .insert(productData)
                .select()
                .single();
        }

        if (result.error) {
            throw result.error;
        }

        return NextResponse.json(result.data);

    } catch (error: any) {
        console.error('Inventory API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        const supabase = createRouteHandlerClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // We need to fetch the product first to check org_id for permission
        const { data: product } = await supabaseAdmin
            .from('products')
            .select('org_id')
            .eq('id', id)
            .single();
        
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Check membership
        const { data: membership } = await supabase
            .from('organization_members')
            .select('role')
            .eq('org_id', product.org_id)
            .eq('user_id', session.user.id)
            .single();

        if (!membership) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { error } = await supabaseAdmin
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
