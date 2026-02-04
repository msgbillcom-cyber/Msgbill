// lib/razorpay.ts - Razorpay Payment Integration

export const razorpayOptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    currency: 'INR',
    name: 'MsgBill',
};

export interface RazorpayPaymentLinkRequest {
    amount: number; // in rupees
    currency?: string;
    description: string;
    customer: {
        name: string;
        contact?: string;
        email?: string;
    };
    notify?: {
        sms?: boolean;
        email?: boolean;
        whatsapp?: boolean;
    };
    callback_url?: string;
    reference_id: string; // invoice ID
}

export interface RazorpayPaymentLink {
    id: string;
    short_url: string;
    status: string;
    amount: number;
    currency: string;
    description: string;
    customer: {
        name: string;
        contact?: string;
        email?: string;
    };
    created_at: number;
}

export async function createPaymentLink(
    request: RazorpayPaymentLinkRequest
): Promise<RazorpayPaymentLink> {
    try {
        const response = await fetch('/api/payments/create-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create payment link');
        }

        const data = await response.json();
        return data.paymentLink;
    } catch (error) {
        console.error('Error creating payment link:', error);
        throw error;
    }
}

export async function getPaymentLinkStatus(
    paymentLinkId: string
): Promise<{ status: string; paid: boolean; payment_id?: string }> {
    try {
        const response = await fetch(`/api/payments/status/${paymentLinkId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch payment status');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw error;
    }
}

export function formatRazorpayAmount(rupees: number): number {
    // Razorpay accepts amount in paise (smallest currency unit)
    return Math.round(rupees * 100);
}

export function parseRazorpayAmount(paise: number): number {
    // Convert paise back to rupees
    return paise / 100;
}

export interface RazorpayWebhookEvent {
    event: string;
    payload: {
        payment_link: {
            entity: RazorpayPaymentLink;
        };
        payment?: {
            entity: {
                id: string;
                amount: number;
                currency: string;
                status: string;
                method: string;
                captured: boolean;
                created_at: number;
            };
        };
    };
}

export function verifyRazorpayWebhookSignature(
    body: string,
    signature: string,
    secret: string
): boolean {
    const crypto = require('crypto');

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');

    return expectedSignature === signature;
}

// Legacy function for backward compatibility
export const createRazorpayPaymentLink = async (invoice: any, client: any) => {
    return createPaymentLink({
        amount: invoice.grand_total,
        description: `Invoice ${invoice.invoice_number}`,
        customer: {
            name: client.name,
            contact: client.phone,
            email: client.email,
        },
        reference_id: invoice.id,
    });
};
