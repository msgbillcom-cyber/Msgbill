/**
 * Google Analytics 4 Event Tracking
 * Track important user actions for conversion optimization
 */

// Event types
export const GAEvents = {
    // User Journey
    SIGNUP_STARTED: 'signup_started',
    SIGNUP_COMPLETED: 'signup_completed',
    LOGIN_COMPLETED: 'login_completed',

    // Invoice Actions
    INVOICE_CREATED: 'invoice_created',
    INVOICE_SHARED_WHATSAPP: 'invoice_shared_whatsapp',
    INVOICE_DOWNLOADED: 'invoice_downloaded',
    PAYMENT_LINK_GENERATED: 'payment_link_generated',

    // Conversions
    UPGRADED_TO_STARTER: 'upgraded_to_starter',
    UPGRADED_TO_PRO: 'upgraded_to_pro',
    TRIAL_STARTED: 'trial_started',

    // Content
    BLOG_POST_READ: 'blog_post_read',
    TEMPLATE_DOWNLOADED: 'template_downloaded',

    // Distribution
    SHARED_ON_SOCIAL: 'shared_on_social',
    REFERRAL_LINK_CLICKED: 'referral_link_clicked',
} as const;

declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'set',
            targetId: string,
            config?: Record<string, any>
        ) => void;
        dataLayer: any[];
    }
}

/**
 * Send event to Google Analytics
 */
export const trackEvent = (
    eventName: string,
    params?: Record<string, any>
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
};

/**
 * Track page view (automatic in Next.js, but useful for custom routing)
 */
export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
            page_path: url,
        });
    }
};

/**
 * Track conversion (signup, upgrade, etc.)
 */
export const trackConversion = (
    value: number,
    currency: string = 'INR',
    transactionId?: string
) => {
    trackEvent('conversion', {
        value,
        currency,
        transaction_id: transactionId,
    });
};

/**
 * Track user properties
 */
export const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('set', 'user_properties', properties);
    }
};

// Usage examples:
// trackEvent(GAEvents.INVOICE_CREATED, { plan: 'free' });
// trackEvent(GAEvents.INVOICE_SHARED_WHATSAPP, { invoice_id: '123' });
// trackConversion(199, 'INR', 'txn_abc123');
