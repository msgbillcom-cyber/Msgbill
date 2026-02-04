import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listFunctions() {
    console.log('🔍 Listing functions in public schema...');
    
    // We try to query pg_proc via a simple select if allowed
    const { data, error } = await supabase
        .from('pg_proc')
        .select('proname')
        .join('pg_namespace', 'pg_proc.pronamespace = pg_namespace.oid')
        .eq('pg_namespace.nspname', 'public');

    if (error) {
        console.log('❌ Failed to list functions via direct query:', error.message);
        
        // Try another way - maybe we can call a function that returns info?
        // No, let's try to just guess some names.
    } else {
        console.log('✅ Functions found:', data.map(f => f.proname));
    }
}

listFunctions();