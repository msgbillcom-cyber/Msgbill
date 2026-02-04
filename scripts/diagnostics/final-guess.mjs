import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function finalGuess() {
    const testSql = 'SELECT 1';
    const names = ['exec_sql', 'execute_sql', 'sql', 'run_sql'];
    const params = ['sql', 'query', 'command', 'statement', 'content'];

    console.log('🔍 Final attempt to find SQL RPC...');

    for (const name of names) {
        for (const param of params) {
            try {
                const { data, error } = await supabase.rpc(name, { [param]: testSql });
                if (!error) {
                    console.log(`✅ FOUND! RPC: ${name}, Param: ${param}`);
                    return;
                }
            } catch (e) {}
        }
    }
    console.log('❌ Still nothing.');
}

finalGuess();
