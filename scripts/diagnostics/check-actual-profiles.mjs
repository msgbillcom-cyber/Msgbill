import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkActualProfiles() {
    console.log('🔍 CHECKING ACTUAL PROFILES TABLE STRUCTURE');
    console.log('===========================================');

    try {
        // Get the actual table structure
        const { data: tableInfo, error: tableError } = await supabase
            .from('information_schema.columns')
            .select('column_name, data_type, is_nullable, column_default')
            .eq('table_name', 'profiles')
            .eq('table_schema', 'public')
            .order('ordinal_position');

        if (tableError) {
            console.log('❌ Error getting table info:', tableError.message);
            return;
        }

        console.log('📋 Profiles table structure:');
        tableInfo.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type} ${col.is_nullable === 'YES' ? '(nullable)' : '(required)'}`);
        });

        // Check if there's any data
        const { data: profiles, error: dataError } = await supabase
            .from('profiles')
            .select('*')
            .limit(5);

        if (dataError) {
            console.log('❌ Error getting profiles data:', dataError.message);
        } else if (profiles && profiles.length > 0) {
            console.log('\n📊 Sample profile data:');
            profiles.forEach((profile, index) => {
                console.log(`\nProfile ${index + 1}:`);
                Object.keys(profile).forEach(key => {
                    console.log(`  ${key}: ${profile[key]}`);
                });
            });
        } else {
            console.log('\nℹ️  No profiles found in database');
        }

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
    }
}

checkActualProfiles();