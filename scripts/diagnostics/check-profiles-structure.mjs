import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProfilesStructure() {
    console.log('🔍 CHECKING PROFILES TABLE STRUCTURE');
    console.log('=====================================');

    try {
        // Get one profile to see the structure
        const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);

        if (error) {
            console.log('❌ Error fetching profiles:', error.message);
            return;
        }

        if (profiles && profiles.length > 0) {
            console.log('✅ Profiles table structure:');
            const profile = profiles[0];
            const fields = Object.keys(profile);
            
            console.log('\nFields found:');
            fields.forEach(field => {
                console.log(`  - ${field}: ${typeof profile[field]} ${profile[field] ? '(has value)' : '(null)'}`);
            });
            
            console.log('\nSample profile data:');
            fields.forEach(field => {
                if (profile[field] !== null && profile[field] !== undefined) {
                    console.log(`  ${field}: ${profile[field]}`);
                }
            });
        } else {
            console.log('ℹ️  No profiles found in database');
        }

    } catch (error) {
        console.log('❌ Unexpected error:', error.message);
    }
}

checkProfilesStructure();