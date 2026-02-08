/**
 * Archive Notification System
 * Sends emails to users before their invoices are auto-archived
 */

import { createClientSideClient } from '@/lib/supabase';
// import { Database } from '@/types/supabase'; // Not needed for basic functionality


interface ArchiveWarning {
    org_id: string;
    invoice_id: string;
    invoice_number: string;
    client_name: string;
    archive_in_days: number;
}

/**
 * Get invoices that will be archived soon
 */
export async function getArchiveWarnings(daysBefore: number = 7): Promise<ArchiveWarning[]> {
    const supabase = createClientSideClient();

    const { data, error } = await supabase
        .rpc('get_archive_warnings', { days_before: daysBefore });

    if (error) {
        console.error('Error fetching archive warnings:', error);
        return [];
    }

    return data || [];
}

/**
 * Send archive warning email to organization
 */
export async function sendArchiveWarningEmail(
    orgId: string,
    invoices: ArchiveWarning[]
) {
    // Get organization details
    const supabase = createClientSideClient();
    const { data: org } = await supabase
        .from('organizations')
        .select('name, subscription_tier')
        .eq('id', orgId)
        .single();

    // Get owner email
    const { data: members } = await supabase
        .from('organization_members')
        .select('user_id, profiles(full_name, id)')
        .eq('org_id', orgId)
        .eq('role', 'owner')
        .limit(1)
        .single();

    if (!members) return;

    const userId = members.user_id;
    const { data: { user } } = await supabase.auth.admin.getUserById(userId);

    if (!user?.email) return;

    // Email content
    const invoiceList = invoices
        .map(inv => `- Invoice #${inv.invoice_number} for ${inv.client_name} (in ${inv.archive_in_days} days)`)
        .join('\n');

    const emailBody = `
Hi ${org?.name},

This is a friendly reminder that ${invoices.length} invoice(s) will be automatically archived soon:

${invoiceList}

🎁 FREE TRIAL RETENTION: We keep your invoices for 6 months, then archive them to keep MsgBill free for everyone.

OPTIONS:
1. Download PDFs now (from your dashboard)
2. Upgrade to Pro (₹499/month) - Unlimited invoices & 3 years retention

[Download My Invoices] [Upgrade to Pro]

Need help? Reply to this email.

Best,
The MsgBill Team

P.S. Archived invoices are safely stored but not accessible in your dashboard. Upgrade anytime to restore them!
  `.trim();

    // TODO: Implement actual email sending via Resend/SendGrid
    console.log('Would send email to:', user.email);
    console.log('Subject:', `⚠️ ${invoices.length} invoices will be archived soon`);
    console.log('Body:', emailBody);

    return {
        to: user.email,
        subject: `⚠️ ${invoices.length} invoices will be archived soon`,
        body: emailBody
    };
}

/**
 * Daily cron job to check and send archive warnings
 * Call this from Vercel Cron or Supabase Edge Function
 */
export async function dailyArchiveWarningJob() {
    const warnings = await getArchiveWarnings(7); // 7 days before

    // Group by organization
    const warningsByOrg = warnings.reduce((acc, warning) => {
        if (!acc[warning.org_id]) {
            acc[warning.org_id] = [];
        }
        acc[warning.org_id].push(warning);
        return acc;
    }, {} as Record<string, ArchiveWarning[]>);

    // Send email to each org
    const results = [];
    for (const [orgId, orgWarnings] of Object.entries(warningsByOrg)) {
        const result = await sendArchiveWarningEmail(orgId, orgWarnings);
        results.push(result);
    }

    console.log(`Sent ${results.length} archive warning emails`);
    return results;
}

/**
 * Upgrade hook - recalculate archive dates when subscription changes
 */
export async function onSubscriptionUpgrade(orgId: string, newTier: string) {
    const supabase = createClientSideClient();

    // Recalculate archive dates for all invoices
    const retentionMonths = {
        'free': 6,
        'pro': 36,
        'enterprise': 120
    }[newTier] || 6;

    const { error } = await supabase.rpc('update_invoice_retention', {
        org_uuid: orgId,
        retention_months: retentionMonths
    });

    if (error) {
        console.error('Error updating retention:', error);
    }

    console.log(`Updated invoice retention for org ${orgId} to ${retentionMonths} months`);
}
