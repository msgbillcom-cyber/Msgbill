import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkClientStructure() {
    console.log('🔍 CHECKING CLIENT TABLE STRUCTURE');
    console.log('==================================');

    try {
        // Get one client to see the structure
        const { data: clients, error } = await supabaseAdmin
            .from('clients')
            .select('*')
            .limit(1);

        if (error) {
            console.log('❌ Error:', error.message);
            return;
        }

        if (clients && clients.length > 0) {
            console.log('✅ Clients table exists');
            console.log('Fields:', Object.keys(clients[0]).join(', '));
            
            console.log('\nSample data:');
            const client = clients[0];
            Object.keys(client).forEach(key => {
                console.log(`  ${key}: ${client[key]}`);
            });
        } else {
            console.log('✅ Clients table exists (empty)');
            
            // Try to insert a minimal record to see required fields
            try {
                const { data: insertData, error: insertError } = await supabaseAdmin
                    .from('clients')
                    .insert({
                        org_id: 'test-org-id',
                        name: 'Test Client'
                    })
                    .select()
                    .single();

                if (insertError) {
                    console.log('❌ Insert error:', insertError.message);
                    // Extract field names from error
                    const fieldMatch = insertError.message.match(/column\s+(\w+)/g);
                    if (fieldMatch) {
                        console.log('Required fields detected:', fieldMatch.map(m => m.replace('column ', '')).join(', '));
                    }
                } else if (insertData) {
                    console.log('✅ Sample record created');
                    console.log('Fields:', Object.keys(insertData).join(', '));
                    
                    // Clean up
                    await supabaseAdmin.from('clients').delete().eq('id', insertData.id);
                    console.log('✅ Cleaned up test record');
                }
            } catch (e) {
                console.log('❌ Test insert failed:', e.message);
            }
        }

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
    }
}

checkClientStructure();