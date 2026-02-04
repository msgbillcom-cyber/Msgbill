import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODE2MjUsImV4cCI6MjA4NTE1NzYyNX0.AA_gaIOkkC6GXC1WP8sLbKu97rSbuW6a97OJ32t71Ns';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPerformance() {
    console.log('🚀 Starting Performance & Latency Check...');
    const email = '2022auradigital@gmail.com';
    const password = 'Pr@deep8553113306';

    // 1. Authenticate (Simulating Login)
    const loginStart = performance.now();
    const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    const loginEnd = performance.now();

    if (loginError) {
        console.error('❌ Login failed:', loginError.message);
        return;
    }
    console.log(`✅ Login successful (${(loginEnd - loginStart).toFixed(2)}ms)`);

    if (!session) {
        console.error('❌ No session returned');
        return;
    }

    // 2. Fetch User Profile (Simulating Dashboard Load)
    const profileStart = performance.now();
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
    const profileEnd = performance.now();

    if (profileError) {
        console.error('❌ Profile fetch failed:', profileError.message);
    } else {
        console.log(`✅ Profile fetch successful (${(profileEnd - profileStart).toFixed(2)}ms)`);
    }

    // 3. Fetch Organization Members (This was the problematic recursive query!)
    const membersStart = performance.now();
    const { data: members, error: membersError } = await supabase
        .from('organization_members')
        .select('*')
        .eq('user_id', session.user.id);
    const membersEnd = performance.now();

    if (membersError) {
        console.error('❌ Members fetch failed:', membersError.message);
    } else {
        console.log(`✅ Organization Members fetch successful (${(membersEnd - membersStart).toFixed(2)}ms)`);
        console.log(`   Found ${members?.length || 0} memberships.`);
    }

    if (!members || members.length === 0) {
        console.warn('⚠️ User has no organization, cannot proceed with Client test.');
        return;
    }
    const orgId = members[0].org_id;

    // 4. Fetch Clients (Simulating Clients Page Load)
    const clientsStart = performance.now();
    const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('org_id', orgId)
        .limit(10);
    const clientsEnd = performance.now();

    if (clientsError) {
        console.error('❌ Clients fetch failed:', clientsError.message);
    } else {
        console.log(`✅ Clients fetch successful (${(clientsEnd - clientsStart).toFixed(2)}ms)`);
        console.log(`   Found ${clients?.length || 0} clients.`);
    }

    // 5. Insert a Test Client (Simulating "Add Client")
    // Note: This uses the direct client, testing if the RLS fix works for WRITES too!
    const testClientName = `Test Client ${Date.now()}`;
    const insertStart = performance.now();
    const { data: newClient, error: insertError } = await supabase
        .from('clients')
        .insert({
            org_id: orgId,
            name: testClientName,
            email: `test-${Date.now()}@example.com`,
            address: 'Performance Test Lane'
        })
        .select()
        .single();
    const insertEnd = performance.now();

    if (insertError) {
        console.error('❌ Client Insert failed (RLS Issue?):', insertError.message);
    } else {
        console.log(`✅ Client Insert successful (${(insertEnd - insertStart).toFixed(2)}ms)`);
        console.log(`   Created: ${newClient.name}`);

        // Cleanup
        await supabase.from('clients').delete().eq('id', newClient.id);
        console.log('   (Cleaned up test record)');
    }

    console.log('\n🏁 Performance Check Complete.');
}

checkPerformance();
