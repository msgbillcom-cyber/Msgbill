import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function diagnostic() {
    const testSql = 'SELECT 1';
    const rpcs = [
        { name: 'exec_sql', params: { sql: testSql } },
        { name: 'exec_sql', params: { query: testSql } },
        { name: 'sql', params: { sql: testSql } },
        { name: 'sql', params: { query: testSql } },
        { name: 'exec', params: { sql: testSql } },
        { name: 'exec', params: { query: testSql } },
        { name: 'execute_sql', params: { sql: testSql } },
        { name: 'execute_sql', params: { query: testSql } }
    ];

    console.log('🔍 Testing RPC functions for SQL execution...');

    for (const rpc of rpcs) {
        try {
            const { data, error } = await supabase.rpc(rpc.name, rpc.params);
            if (error) {
                console.log(`❌ RPC ${rpc.name} with ${JSON.stringify(rpc.params)}: ${error.message}`);
            } else {
                console.log(`✅ RPC ${rpc.name} with ${JSON.stringify(rpc.params)}: Success! Data:`, data);
                return; // Found it!
            }
        } catch (e) {
            console.log(`💥 RPC ${rpc.name} with ${JSON.stringify(rpc.params)}: Exception: ${e.message}`);
        }
    }
    
    console.log('❌ No SQL execution RPC found.');
}

diagnostic();