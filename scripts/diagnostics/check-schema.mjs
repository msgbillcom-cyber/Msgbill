import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
    console.log('🔍 CHECKING DATABASE SCHEMA');
    console.log('============================');

    try {
        // Check auth.users table
        console.log('\n📋 Auth Users:');
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        if (authError) {
            console.log('❌ Auth users error:', authError.message);
        } else {
            console.log('✅ Auth users found:', authUsers.users.length);
            if (authUsers.users.length > 0) {
                console.log('Sample user:', authUsers.users[0].email);
            }
        }

        // Check if profiles table exists
        console.log('\n📋 Profiles Table:');
        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);

        if (profilesError) {
            console.log('❌ Profiles table error:', profilesError.message);
        } else {
            console.log('✅ Profiles table exists');
            if (profiles && profiles.length > 0) {
                console.log('Sample profile fields:', Object.keys(profiles[0]));
            }
        }

        // Check organizations table
        console.log('\n📋 Organizations Table:');
        const { data: orgs, error: orgsError } = await supabase
            .from('organizations')
            .select('*')
            .limit(1);

        if (orgsError) {
            console.log('❌ Organizations table error:', orgsError.message);
        } else {
            console.log('✅ Organizations table exists');
            if (orgs && orgs.length > 0) {
                console.log('Sample org fields:', Object.keys(orgs[0]));
            }
        }

        // Check clients table
        console.log('\n📋 Clients Table:');
        const { data: clients, error: clientsError } = await supabase
            .from('clients')
            .select('*')
            .limit(1);

        if (clientsError) {
            console.log('❌ Clients table error:', clientsError.message);
        } else {
            console.log('✅ Clients table exists');
            if (clients && clients.length > 0) {
                console.log('Sample client fields:', Object.keys(clients[0]));
            }
        }

        // Check invoices table
        console.log('\n📋 Invoices Table:');
        const { data: invoices, error: invoicesError } = await supabase
            .from('invoices')
            .select('*')
            .limit(1);

        if (invoicesError) {
            console.log('❌ Invoices table error:', invoicesError.message);
        } else {
            console.log('✅ Invoices table exists');
            if (invoices && invoices.length > 0) {
                console.log('Sample invoice fields:', Object.keys(invoices[0]));
            }
        }

        // Check usage_limits table
        console.log('\n📋 Usage Limits Table:');
        const { data: limits, error: limitsError } = await supabase
            .from('usage_limits')
            .select('*')
            .limit(1);

        if (limitsError) {
            console.log('❌ Usage limits table error:', limitsError.message);
        } else {
            console.log('✅ Usage limits table exists');
            if (limits && limits.length > 0) {
                console.log('Sample limits fields:', Object.keys(limits[0]));
            }
        }

        console.log('\n✅ Schema check complete!');

    } catch (error) {
        console.log('❌ Schema check failed:', error.message);
    }
}

checkSchema();