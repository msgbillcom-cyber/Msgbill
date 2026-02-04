import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsageLimits() {
    console.log('🔍 CHECKING USAGE_LIMITS TABLE STRUCTURE');
    console.log('========================================');

    try {
        // Try to get one record to see the structure
        const { data: limits, error } = await supabase
            .from('usage_limits')
            .select('*')
            .limit(1);

        if (error) {
            console.log('❌ Error:', error.message);
            return;
        }

        if (limits && limits.length > 0) {
            console.log('✅ Usage limits table exists');
            console.log('Fields:', Object.keys(limits[0]).join(', '));
            
            console.log('\nSample data:');
            const sample = limits[0];
            Object.keys(sample).forEach(key => {
                console.log(`  ${key}: ${sample[key]}`);
            });
        } else {
            console.log('✅ Usage limits table exists (empty)');
            
            // Try to insert a minimal record to see required fields
            try {
                const { data: insertData, error: insertError } = await supabase
                    .from('usage_limits')
                    .insert({
                        org_id: 'test-org-id',
                        plan_type: 'free'
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
                    await supabase.from('usage_limits').delete().eq('id', insertData.id);
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

checkUsageLimits();