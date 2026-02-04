import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkRLSPolicies() {
    console.log('🔍 CHECKING RLS POLICIES');
    console.log('=========================');

    try {
        // Check RLS policies for organization_members table
        const { data: policies, error } = await supabaseAdmin
            .from('information_schema.routines')
            .select('routine_definition')
            .eq('routine_name', 'policy')
            .eq('routine_schema', 'public');

        if (error) {
            console.log('❌ Error checking RLS policies:', error.message);
            return;
        }

        console.log('RLS Policies found:', policies.length);
        policies.forEach((policy, index) => {
            console.log(`Policy ${index + 1}:`, policy.routine_definition);
        });

        // Let's check the actual table structure and policies
        const { data: tableInfo, error: tableError } = await supabaseAdmin
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .like('table_name', '%organization%');

        if (tableError) {
            console.log('❌ Error checking tables:', tableError.message);
            return;
        }

        console.log('\nOrganization-related tables:');
        tableInfo.forEach(table => {
            console.log(`- ${table.table_name}`);
        });

        // Check for RLS policies on organization_members
        const { data: rlsPolicies, error: rlsError } = await supabaseAdmin
            .from('pg_policies')
            .select('*')
            .eq('tablename', 'organization_members');

        if (rlsError) {
            console.log('❌ Error getting RLS policies:', rlsError.message);
            return;
        }

        console.log('\nRLS Policies for organization_members:');
        rlsPolicies.forEach(policy => {
            console.log(`Policy: ${policy.policyname}`);
            console.log(`Command: ${policy.cmd}`);
            console.log(`Using: ${policy.using}`);
            console.log(`With Check: ${policy.with_check}`);
            console.log('---');
        });

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
    }
}

checkRLSPolicies();