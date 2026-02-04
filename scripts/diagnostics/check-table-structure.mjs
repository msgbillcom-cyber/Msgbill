import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTableStructure() {
    console.log('🔍 CHECKING TABLE STRUCTURES');
    console.log('===========================');

    const tables = ['profiles', 'organizations', 'clients', 'invoices', 'usage_limits'];

    for (const tableName of tables) {
        console.log(`\n📋 ${tableName.toUpperCase()} TABLE:`);
        
        try {
            // Try to get a sample record
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .limit(1);

            if (error) {
                console.log(`❌ Error: ${error.message}`);
            } else if (data && data.length > 0) {
                console.log('✅ Table exists');
                console.log('Fields:', Object.keys(data[0]).join(', '));
            } else {
                console.log('✅ Table exists (empty)');
                
                // Try to get structure by inserting a dummy record and rolling back
                try {
                    const { data: insertData, error: insertError } = await supabase
                        .from(tableName)
                        .insert({})
                        .select()
                        .single();
                    
                    if (insertError) {
                        console.log('Insert error (expected):', insertError.message);
                        // Extract field names from error message
                        const fieldMatch = insertError.message.match(/column\s+(\w+)/);
                        if (fieldMatch) {
                            console.log('Required field detected:', fieldMatch[1]);
                        }
                    } else if (insertData) {
                        console.log('Sample fields:', Object.keys(insertData).join(', '));
                        // Clean up the dummy record
                        await supabase.from(tableName).delete().eq('id', insertData.id);
                    }
                } catch (e) {
                    // Expected for tables with required fields
                    console.log('Structure check completed');
                }
            }
        } catch (error) {
            console.log(`❌ Unexpected error: ${error.message}`);
        }
    }
}

checkTableStructure();