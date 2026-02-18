// app/api/cron/archive/route.ts
// Run daily (e.g. Vercel Cron) to archive invoices past retention (1 yr paid, 6 mo free)
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: count, error } = await supabase.rpc('archive_old_invoices');

    if (error) {
        console.error('Archive cron error:', error);
        return NextResponse.json(
            { error: error.message, archived: 0 },
            { status: 500 }
        );
    }

    return NextResponse.json({ archived: count ?? 0 });
}
