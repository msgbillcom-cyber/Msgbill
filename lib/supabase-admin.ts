import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase URL or Service Role Key missing. Admin operations will fail at runtime.');
    }
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
