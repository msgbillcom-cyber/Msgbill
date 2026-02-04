import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxpzdbjjkrqzodokjtcu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cHpkYmpqa3Jxem9kb2tqdGN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU4MTYyNSwiZXhwIjoyMDg1MTU3NjI1fQ.28mcXbr6NYR-N8goRLIm-f1nqgQm4mygxwhVM0y-z08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectSchema() {
    console.log('🔍 Inspecting actual schema...');

    // Inspect payments
    const { data: payments, error: pError } = await supabase.from('payments').select('*').limit(1);
    if (pError) console.log('❌ Payments error:', pError.message);
    else if (payments.length > 0) console.log('✅ Payments columns:', Object.keys(payments[0]));
    else console.log('ℹ️ Payments table empty');

    // Inspect organizations
    const { data: orgs, error: oError } = await supabase.from('organizations').select('*').limit(1);
    if (oError) console.log('❌ Organizations error:', oError.message);
    else if (orgs.length > 0) console.log('✅ Organizations columns:', Object.keys(orgs[0]));
    else console.log('ℹ️ Organizations table empty');

    // Inspect expenses
    const { data: expenses, error: eError } = await supabase.from('expenses').select('*').limit(1);
    if (eError) console.log('❌ Expenses error (Table might be missing):', eError.message);
    else if (expenses && expenses.length > 0) console.log('✅ Expenses columns:', Object.keys(expenses[0]));
    else if (expenses) console.log('✅ Expenses table exists (empty)');

    // Inspect usage_limits
    const { data: limits, error: lError } = await supabase.from('usage_limits').select('*').limit(1);
    if (lError) console.log('❌ Usage Limits error:', lError.message);
    else if (limits && limits.length > 0) console.log('✅ Usage Limits columns:', Object.keys(limits[0]));
    else if (limits) console.log('✅ Usage Limits table exists (empty)');
}

inspectSchema();
