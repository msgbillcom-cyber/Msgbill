import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const createClientSideClient = () => {
    // If environment variables are missing (e.g. during build), 
    // we want to avoid crashing, though functionality won't work without them.
    if (process.env.NODE_ENV === 'development' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
        console.warn('Supabase env vars missing in client side client');
    }
    return createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
    });
};
