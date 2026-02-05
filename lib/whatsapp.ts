// lib/whatsapp.ts - WhatsApp Sharing Utilities

export interface WhatsAppMessageTemplate {
    invoiceNumber: string;
    clientName: string;
    amount: string;
    dueDate: string;
    invoiceUrl: string;
    businessName: string;
    paymentLink?: string;
    upiId?: string;
}

export function generateInvoiceMessage(template: WhatsAppMessageTemplate): string {
    const { invoiceNumber, clientName, amount, dueDate, invoiceUrl, businessName, paymentLink, upiId } = template;

    let message = `Hi ${clientName},\n\n`;
    message += `📄 Your invoice ${invoiceNumber} is ready!\n\n`;
    message += `💰 Amount: ${amount}\n`;
    message += `📅 Due Date: ${dueDate}\n\n`;
    message += `View Invoice: ${invoiceUrl}\n`;

    if (paymentLink) {
        message += `\n💳 Pay Now: ${paymentLink}\n`;
    }
    
    if (upiId) {
        message += `\n📲 Pay via UPI: ${upiId}\n`;
    }

    message += `\nThank you for your business!\n`;
    message += `- ${businessName}`;

    return message;
}

export type ReminderTone = 'friendly' | 'firm' | 'urgent';

export function generateReminderMessage(
    template: WhatsAppMessageTemplate,
    tone: ReminderTone = 'friendly'
): string {
    const { invoiceNumber, clientName, amount, dueDate, invoiceUrl, businessName, paymentLink, upiId } = template;

    let message = '';

    switch (tone) {
        case 'urgent':
            message = `🚨 *URGENT PAYMENT REMINDER*\n\n`;
            message += `Hi ${clientName},\n\n`;
            message += `This is a final reminder that invoice *${invoiceNumber}* for *${amount}* is OVERDUE.\n\n`;
            message += `Please pay immediately to avoid service interruption.\n\n`;
            break;
        case 'firm':
            message = `Hi ${clientName},\n\n`;
            message += `Payment for invoice *${invoiceNumber}* (${amount}) was due on ${dueDate}.\n\n`;
            message += `We have not received it yet. Please clear this today.\n\n`;
            break;
        case 'friendly':
        default:
            message = `Hi ${clientName} 👋,\n\n`;
            message += `Just a gentle reminder about invoice *${invoiceNumber}* for *${amount}*.\n\n`;
            message += `It was due on ${dueDate}.\n\n`;
            break;
    }

    if (paymentLink) {
        message += `💳 *Pay Now:* ${paymentLink}\n\n`;
    } else {
        message += `📄 *View Invoice:* ${invoiceUrl}\n\n`;
    }

    if (upiId) {
        message += `📲 *UPI ID:* ${upiId}\n\n`;
    }

    message += `Thanks,\n${businessName}`;

    return message;
}

export function formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');

    // Add +91 if not present
    if (!cleaned.startsWith('91')) {
        cleaned = '91' + cleaned;
    }

    return cleaned;
}

export function createWhatsAppLink(phone: string, message: string): string {
    const formattedPhone = formatPhoneNumber(phone);
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp Web/App deep link
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

export function shareViaWhatsApp(phone: string, message: string): void {
    const whatsappUrl = createWhatsAppLink(phone, message);

    // Open in new window/tab
    window.open(whatsappUrl, '_blank');
}

export async function shareViaWebShare(
    title: string,
    text: string,
    url: string
): Promise<boolean> {
    // Check if Web Share API is available (mobile browsers)
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text,
                url,
            });
            return true;
        } catch (error) {
            console.error('Error sharing:', error);
            return false;
        }
    }
    return false;
}

export function validatePhone(phone: string): { valid: boolean; error?: string } {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length < 10) {
        return { valid: false, error: 'Phone number must be at least 10 digits' };
    }

    if (cleaned.length > 12) {
        return { valid: false, error: 'Phone number is too long' };
    }

    // Indian mobile numbers start with 6-9
    const lastTenDigits = cleaned.slice(-10);
    if (!/^[6-9]/.test(lastTenDigits)) {
        return { valid: false, error: 'Invalid Indian mobile number' };
    }

    return { valid: true };
}
