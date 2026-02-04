import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Init Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
    try {
        // 1. Verify Authentication
        const authHeader = request.headers.get("authorization") || "";
        const token = authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.slice("bearer ".length).trim()
            : null;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        // 2. Parse Body
        const body = await request.json();
        const { org_id, name, email, phone, address, gstin } = body;

        if (!org_id || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 2.1 Verify user belongs to the organization
        const { data: membership, error: memberError } = await supabaseAdmin
            .from("organization_members")
            .select("role")
            .eq("org_id", org_id)
            .eq("user_id", user.id)
            .single();

        if (memberError || !membership) {
            console.error("Unauthorized org access attempt:", { userId: user.id, org_id });
            return NextResponse.json({ error: "Unauthorized access to this organization" }, { status: 403 });
        }

        // 3. Insert Client (Bypassing RLS via Service Role)
        const { data: client, error: insertError } = await supabaseAdmin
            .from("clients")
            .insert({
                org_id,
                name,
                email: email || null,
                phone: phone || null,
                address: address || null,
                gstin: gstin || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (insertError) {
            console.error("Supabase Admin Insert Error:", insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({ client });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        // 1. Verify Authentication
        const authHeader = request.headers.get("authorization") || "";
        const token = authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.slice("bearer ".length).trim()
            : null;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        // 2. Parse Body
        const body = await request.json();
        const { id, name, email, phone, address, gstin } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing client ID" }, { status: 400 });
        }

        // 2.1 Verify user has access to this client via organization membership
        const { data: clientToUpdate, error: fetchError } = await supabaseAdmin
            .from("clients")
            .select("org_id")
            .eq("id", id)
            .single();

        if (fetchError || !clientToUpdate) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        const { data: membership, error: memberError } = await supabaseAdmin
            .from("organization_members")
            .select("role")
            .eq("org_id", clientToUpdate.org_id)
            .eq("user_id", user.id)
            .single();

        if (memberError || !membership) {
            return NextResponse.json({ error: "Unauthorized access to this client" }, { status: 403 });
        }

        // 3. Update Client (Bypassing RLS via Service Role)
        const { data: client, error: updateError } = await supabaseAdmin
            .from("clients")
            .update({
                name,
                email: email || null,
                phone: phone || null,
                address: address || null,
                gstin: gstin || null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (updateError) {
            console.error("Supabase Admin Update Error:", updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ client });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
