import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkRLSPoliciesDirect() {
    console.log('🔍 CHECKING RLS POLICIES DIRECTLY');
    console.log('===================================');

    try {
        // Check RLS policies using SQL query
        const { data: policies, error } = await supabaseAdmin
            .rpc('exec_sql', {
                sql: `
                    SELECT schemaname, tablename, policyname, cmd, qual, with_check 
                    FROM pg_policies 
                    WHERE tablename = 'organization_members'
                    ORDER BY tablename, policyname;
                `
            });

        if (error) {
            console.log('❌ Error checking RLS policies:', error.message);
            return;
        }

        if (policies && policies.length > 0) {
            console.log('✅ RLS Policies for organization_members:');
            policies.forEach(policy => {
                console.log(`\nPolicy: ${policy.policyname}`);
                console.log(`Command: ${policy.cmd}`);
                console.log(`Qual: ${policy.qual}`);
                console.log(`With Check: ${policy.with_check}`);
            });
        } else {
            console.log('ℹ️  No RLS policies found for organization_members');
        }

        // Also check if RLS is enabled on the table
        const { data: rlsStatus, error: rlsError } = await supabaseAdmin
            .rpc('exec_sql', {
                sql: `
                    SELECT relname, relrowsecurity 
                    FROM pg_class 
                    WHERE relname = 'organization_members';
                `
            });

        if (rlsError) {
            console.log('❌ Error checking RLS status:', rlsError.message);
            return;
        }

        if (rlsStatus && rlsStatus.length > 0) {
            console.log(`\nRLS Status: ${rlsStatus[0].relrowsecurity ? 'ENABLED' : 'DISABLED'}`);
        }

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
        
        // Fallback: try to query the table directly to see what happens
        try {
            const { data, error: queryError } = await supabaseAdmin
                .from('organization_members')
                .select('*')
                .limit(1);

            if (queryError) {
                console.log('❌ Direct query error:', queryError.message);
            } else {
                console.log('✅ Direct query successful');
                console.log('Data count:', data?.length || 0);
            }
        } catch (e) {
            console.log('❌ Fallback query failed:', e.message);
        }
    }
}

checkRLSPoliciesDirect();