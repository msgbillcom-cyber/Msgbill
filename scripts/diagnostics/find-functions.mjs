import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findExecFunction() {
    console.log('🔍 Searching for SQL execution functions...');
    
    // Query pg_proc directly
    const { data, error } = await supabase
        .from('pg_proc')
        .select('proname')
        .ilike('proname', '%sql%');

    if (error) {
        console.log('❌ Error:', error.message);
    } else {
        console.log('✅ Found functions with "sql" in name:', data.map(f => f.proname));
    }
}

findExecFunction();
