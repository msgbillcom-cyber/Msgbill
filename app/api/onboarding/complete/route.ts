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
        const {
            company_name,
            address,
            gstin,
            state,
            bank_name,
            account_number,
            ifsc_code,
            upi_id,
            logo_url,
            upi_qr_url,
        } = body;

        // 3. Create/Update Organization
        // Check if user already has an org_id in profile
        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("org_id")
            .eq("id", user.id)
            .single();

        let org_id = profile?.org_id;
        let orgData;

        const commonData = {
            name: company_name,
            address,
            gstin,
            state,
            bank_name,
            bank_account_number: account_number,
            bank_ifsc_code: ifsc_code,
            upi_id,
            logo_url,
            upi_qr_url,
            updated_at: new Date().toISOString(),
        };

        if (org_id) {
            // Update existing org
            const { data, error } = await supabaseAdmin
                .from("organizations")
                .update(commonData)
                .eq("id", org_id)
                .select()
                .single();
            
            if (error) {
                console.error("Error updating organization:", error);
                throw error;
            }
            orgData = data;
        } else {
            // Create new org
            const { data, error } = await supabaseAdmin
                .from("organizations")
                .insert({
                    ...commonData,
                    created_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) {
                console.error("Error creating organization:", error);
                throw error;
            }
            orgData = data;
            org_id = data.id;
        }

        // 4. Update Profile FIRST (Crucial for Foreign Key constraint in next step)
        // We use upsert here to ensure the profile exists (especially for Google OAuth users 
        // who might have skipped the client-side profile creation)
        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .upsert({
                id: user.id,
                email: user.email,
                org_id: org_id,
                onboarded: true,
                // Legacy fields
                company_name,
                address,
                gstin,
                state,
                bank_name,
                account_number,
                ifsc_code,
                upi_id,
                logo_url,
                upi_qr_url,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'id'
            });

        if (profileError) {
            console.error("Error upserting profile:", profileError);
            throw profileError;
        }

        // 5. Link user to organization as owner
        const { error: memberError } = await supabaseAdmin
            .from("organization_members")
            .upsert({
                org_id: org_id,
                user_id: user.id,
                role: "owner",
            }, {
                onConflict: 'org_id,user_id'
            });

        if (memberError) {
            console.error("Error creating organization membership:", memberError);
            throw memberError;
        }

        return NextResponse.json({ success: true, organization: orgData });

    } catch (error: any) {
        console.error("Onboarding API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
