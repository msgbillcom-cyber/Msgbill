import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
    console.log('🚀 APPLYING MIGRATION TO SUPABASE');
    console.log('==================================');

    try {
        const migrationPath = path.join(process.cwd(), 'supabase/migrations/202602040001_create_inventory_table.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');

        console.log('Reading migration file...');
        
        // Execute the SQL using the exec_sql RPC function
        const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql });

        if (error) {
            console.error('❌ Error applying migration:', error.message);
            console.error('Details:', error.details);
            console.error('Hint:', error.hint);
            return;
        }

        console.log('✅ Migration applied successfully!');
        console.log('Result:', data);

    } catch (error) {
        console.error('❌ Unexpected error:', error.message);
    }
}

applyMigration();
