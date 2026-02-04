import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkPaymentStructure() {
    console.log('🔍 CHECKING PAYMENT TABLE STRUCTURE');
    console.log('====================================');

    try {
        // Get one payment to see the structure
        const { data: payments, error } = await supabaseAdmin
            .from('payments')
            .select('*')
            .limit(1);

        if (error) {
            console.log('❌ Error:', error.message);
            return;
        }

        if (payments && payments.length > 0) {
            console.log('✅ Payments table exists');
            console.log('Fields:', Object.keys(payments[0]).join(', '));
            
            console.log('\nSample data:');
            const payment = payments[0];
            Object.keys(payment).forEach(key => {
                console.log(`  ${key}: ${payment[key]}`);
            });
        } else {
            console.log('✅ Payments table exists (empty)');
            
            // Try to insert a minimal record to see required fields
            try {
                const { data: insertData, error: insertError } = await supabaseAdmin
                    .from('payments')
                    .insert({
                        org_id: '0c38bc16-47b9-43ab-bc42-02eb999a2a74',
                        invoice_id: 'be04566f-c096-4b89-9e08-6ab26fcd9609',
                        amount: 1000
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
                    await supabaseAdmin.from('payments').delete().eq('id', insertData.id);
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

checkPaymentStructure();