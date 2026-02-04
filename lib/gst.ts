// lib/gst.ts - GST Calculation Utilities for India

export interface GSTConfig {
    isGSTRegistered: boolean;
    gstin?: string;
    state: string;
}

export interface GSTCalculation {
    subtotal: number;
    cgst: number;
    sgst: number;
    igst: number;
    totalTax: number;
    grandTotal: number;
    isInterstate: boolean;
}

export const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
];

export const GST_RATES = {
    STANDARD: 18, // Most services and products
    REDUCED: 12,  // Specific goods
    LOW: 5,       // Essential goods
    ZERO: 0,      // Exempted items
};

/**
 * Validate GSTIN format
 * Format: 22AAAAA0000A1Z5 (15 characters)
 * - First 2 digits: State code
 * - Next 10 characters: PAN
 * - 13th character: Entity number (1-9 or A-Z)
 * - 14th character: Z (default)
 * - 15th character: Checksum
 */
export function validateGSTIN(gstin: string): { valid: boolean; error?: string } {
    if (!gstin) {
        return { valid: false, error: 'GSTIN is required' };
    }

    const cleaned = gstin.toUpperCase().trim();

    if (cleaned.length !== 15) {
        return { valid: false, error: 'GSTIN must be exactly 15 characters' };
    }

    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!gstinRegex.test(cleaned)) {
        return { valid: false, error: 'Invalid GSTIN format' };
    }

    return { valid: true };
}

/**
 * Calculate GST based on business and client location
 * Same state: CGST + SGST (9% + 9% = 18%)
 * Different state: IGST (18%)
 */
export function calculateGST(
    subtotal: number,
    taxRate: number = GST_RATES.STANDARD,
    businessState: string,
    clientState: string
): GSTCalculation {
    const isInterstate = businessState.toLowerCase() !== clientState.toLowerCase();

    const taxAmount = (subtotal * taxRate) / 100;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterstate) {
        // Different states: charge IGST
        igst = taxAmount;
    } else {
        // Same state: split equally into CGST and SGST
        cgst = taxAmount / 2;
        sgst = taxAmount / 2;
    }

    return {
        subtotal,
        cgst: Number(cgst.toFixed(2)),
        sgst: Number(sgst.toFixed(2)),
        igst: Number(igst.toFixed(2)),
        totalTax: Number(taxAmount.toFixed(2)),
        grandTotal: Number((subtotal + taxAmount).toFixed(2)),
        isInterstate,
    };
}

/**
 * Get state code from GSTIN
 */
export function getStateCodeFromGSTIN(gstin: string): string {
    if (!gstin || gstin.length < 2) return '';
    return gstin.substring(0, 2);
}

/**
 * Format GSTIN for display (with dashes for readability)
 */
export function formatGSTIN(gstin: string): string {
    if (!gstin) return '';
    const cleaned = gstin.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (cleaned.length === 15) {
        return `${cleaned.substring(0, 2)}-${cleaned.substring(2, 12)}-${cleaned.substring(12)}`;
    }

    return cleaned;
}

/**
 * Calculate GST for invoice items
 */
export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    taxRate?: number;
}

export function calculateInvoiceGST(
    items: InvoiceItem[],
    businessState: string,
    clientState: string
): GSTCalculation {
    const subtotal = items.reduce((sum, item) => {
        return sum + (item.quantity * item.rate);
    }, 0);

    // Use the most common tax rate from items, or default to 18%
    const avgTaxRate = items.length > 0
        ? items.reduce((sum, item) => sum + (item.taxRate || GST_RATES.STANDARD), 0) / items.length
        : GST_RATES.STANDARD;

    return calculateGST(subtotal, avgTaxRate, businessState, clientState);
}
