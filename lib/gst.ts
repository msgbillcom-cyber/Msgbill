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

// GST Rate Categories
export const GST_RATES = {
    STANDARD: 18, // Most services and products
    REDUCED: 12,  // Specific goods
    LOW: 5,       // Essential goods
    ZERO: 0,      // Exempted items
    NON_PROFIT: 0, // Non-profit organizations
};

// Item Categories with Default GST Rates
export const GST_CATEGORIES = {
    // 0% GST - Essential & Exempted
    FOOD_GRAINS: { name: 'Food Grains', rate: 0, description: 'Cereals, pulses, flour' },
    MILK_PRODUCTS: { name: 'Milk & Dairy', rate: 0, description: 'Milk, yogurt, paneer' },
    BREAD: { name: 'Bread & Bakery', rate: 0, description: 'Bread, cereals, flour products' },
    MEDICAL_SERVICES: { name: 'Medical Services', rate: 0, description: 'Hospitals, doctors, healthcare' },
    EDUCATION: { name: 'Education', rate: 0, description: 'School, college, education services' },
    
    // 5% GST - Reduced Rate
    SPICES: { name: 'Spices', rate: 5, description: 'All spices and seasonings' },
    OIL_GHEE: { name: 'Oils & Ghee', rate: 5, description: 'Cooking oils, ghee, butter' },
    SALT: { name: 'Salt', rate: 5, description: 'Iodized and non-iodized salt' },
    SUGAR: { name: 'Sugar', rate: 5, description: 'Sugar and jaggery' },
    TEA_COFFEE: { name: 'Tea & Coffee', rate: 5, description: 'Tea and coffee products' },
    FRUITS_VEGETABLES: { name: 'Fruits & Vegetables', rate: 5, description: 'Fresh produce' },
    MEAT_POULTRY: { name: 'Meat & Poultry', rate: 5, description: 'Fresh or frozen meat' },
    FISH_SEAFOOD: { name: 'Fish & Seafood', rate: 5, description: 'Fish and seafood products' },
    EGGS: { name: 'Eggs', rate: 5, description: 'Poultry eggs' },
    FERTILIZER: { name: 'Fertilizer', rate: 5, description: 'Agricultural fertilizers' },
    SEEDS: { name: 'Seeds', rate: 5, description: 'Agricultural and vegetable seeds' },
    PESTICIDES: { name: 'Pesticides', rate: 5, description: 'Agricultural chemicals' },
    TRANSPORT_SERVICES: { name: 'Transport Services', rate: 5, description: 'Goods transport, logistics' },
    
    // 12% GST - Reduced Services
    HOTELS_FOOD: { name: 'Hotel & Food Services', rate: 12, description: 'Restaurant, catering services' },
    CLEANING_SERVICES: { name: 'Cleaning Services', rate: 12, description: 'Cleaning and laundry' },
    REPAIR_SERVICES: { name: 'Repair Services', rate: 12, description: 'Equipment and appliance repair' },
    RENT_COMMERCIAL: { name: 'Commercial Rent', rate: 12, description: 'Commercial building rent' },
    FURNITURE: { name: 'Furniture', rate: 12, description: 'Furniture items' },
    
    // 18% GST - Standard Rate
    CONSULTING: { name: 'Consulting Services', rate: 18, description: 'Professional consultation' },
    IT_SERVICES: { name: 'IT Services', rate: 18, description: 'Software, IT consulting' },
    DESIGN_SERVICES: { name: 'Design Services', rate: 18, description: 'Graphic, web, interior design' },
    ACCOUNTING: { name: 'Accounting Services', rate: 18, description: 'Audit, accounting, tax services' },
    LEGAL_SERVICES: { name: 'Legal Services', rate: 18, description: 'Legal consultation and services' },
    ADVERTISING: { name: 'Advertising', rate: 18, description: 'Advertising and marketing' },
    IMPORT_EXPORT: { name: 'Import/Export', rate: 18, description: 'Import and export services' },
    MANUFACTURING: { name: 'Manufacturing', rate: 18, description: 'Manufacturing services' },
    ELECTRONICS: { name: 'Electronics', rate: 18, description: 'Electronic devices and equipment' },
    APPLIANCES: { name: 'Appliances', rate: 18, description: 'Home and kitchen appliances' },
    VEHICLES: { name: 'Vehicles', rate: 18, description: 'Cars, motorcycles, vehicles' },
    SPARE_PARTS: { name: 'Spare Parts', rate: 18, description: 'Vehicle and equipment spare parts' },
    CLOTHING: { name: 'Clothing & Textiles', rate: 18, description: 'Clothing, fabric, textiles' },
    JEWELRY: { name: 'Jewelry', rate: 18, description: 'Gold, silver, jewelry items' },
    COSMETICS: { name: 'Cosmetics', rate: 18, description: 'Beauty and cosmetic products' },
    ENTERTAINMENT: { name: 'Entertainment Services', rate: 18, description: 'Event management, entertainment' },
    LOGISTICS: { name: 'Logistics & Courier', rate: 18, description: 'Courier and logistics services' },
    SUBSCRIPTION: { name: 'Software Subscriptions', rate: 18, description: 'SaaS, software subscriptions' },
    
    // 28% GST - Luxury Items
    LUXURY_GOODS: { name: 'Luxury Goods', rate: 28, description: 'High-end luxury items' },
    TOBACCO: { name: 'Tobacco Products', rate: 28, description: 'Tobacco and cigarettes' },
    ALCOHOL: { name: 'Alcoholic Beverages', rate: 28, description: 'Wine, beer, spirits' },
    
    // Custom
    OTHER: { name: 'Other', rate: 18, description: 'Other items (default 18%)' },
};

// Organization Type Categories
export const ORGANIZATION_TYPES = {
    PROFIT: { name: 'For-Profit Business', gstRate: 'applicable' },
    NON_PROFIT: { name: 'Non-Profit Organization', gstRate: 'exempt' },
    STARTUP: { name: 'Startup', gstRate: 'applicable' },
    FREELANCER: { name: 'Freelancer/Individual', gstRate: 'conditional' },
    NGO: { name: 'NGO/Charity', gstRate: 'exempt' },
    GOVERNMENT: { name: 'Government Entity', gstRate: 'exempt' },
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
 * Calculate GST for invoice items with category support
 */
export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    taxRate?: number;
    category?: string; // Category key from GST_CATEGORIES
    itemTotal?: number; // Pre-calculated total
}

export interface ItemGSTBreakdown {
    itemDescription: string;
    itemTotal: number;
    taxRate: number;
    taxAmount: number;
    category?: string;
}

/**
 * Get GST rate for a specific category
 */
export function getGSTRateForCategory(categoryKey: string): number {
    const category = Object.values(GST_CATEGORIES).find(
        (c: any) => c.name?.toLowerCase() === categoryKey?.toLowerCase()
    ) as any;
    return category?.rate ?? GST_RATES.STANDARD;
}

/**
 * Calculate GST for invoice items with per-item tax rates
 */
export function calculateInvoiceGST(
    items: InvoiceItem[],
    businessState: string,
    clientState: string,
    organizationType?: string
): GSTCalculation {
    // Check if non-profit organization (exempt from GST)
    const isNonProfit = organizationType === 'NON_PROFIT' || organizationType === 'NGO' || organizationType === 'GOVERNMENT';
    
    if (isNonProfit) {
        const subtotal = items.reduce((sum, item) => {
            return sum + (item.quantity * item.rate);
        }, 0);
        return {
            subtotal,
            cgst: 0,
            sgst: 0,
            igst: 0,
            totalTax: 0,
            grandTotal: subtotal,
            isInterstate: false,
        };
    }

    // Calculate subtotal and tax by item
    let totalSubtotal = 0;
    let totalTax = 0;

    items.forEach(item => {
        const itemSubtotal = item.quantity * item.rate;
        const itemTaxRate = item.taxRate ?? (item.category ? getGSTRateForCategory(item.category) : GST_RATES.STANDARD);
        const itemTax = (itemSubtotal * itemTaxRate) / 100;
        
        totalSubtotal += itemSubtotal;
        totalTax += itemTax;
    });

    const isInterstate = businessState.toLowerCase() !== clientState.toLowerCase();
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterstate) {
        igst = totalTax;
    } else {
        cgst = totalTax / 2;
        sgst = totalTax / 2;
    }

    return {
        subtotal: Number(totalSubtotal.toFixed(2)),
        cgst: Number(cgst.toFixed(2)),
        sgst: Number(sgst.toFixed(2)),
        igst: Number(igst.toFixed(2)),
        totalTax: Number(totalTax.toFixed(2)),
        grandTotal: Number((totalSubtotal + totalTax).toFixed(2)),
        isInterstate,
    };
}

/**
 * Get detailed GST breakdown for each item
 */
export function getDetailedItemGSTBreakdown(items: InvoiceItem[], organizationType?: string): ItemGSTBreakdown[] {
    const isNonProfit = organizationType === 'NON_PROFIT' || organizationType === 'NGO' || organizationType === 'GOVERNMENT';
    
    return items.map(item => {
        const itemTotal = item.quantity * item.rate;
        const taxRate = isNonProfit ? 0 : (item.taxRate ?? (item.category ? getGSTRateForCategory(item.category) : GST_RATES.STANDARD));
        const taxAmount = (itemTotal * taxRate) / 100;
        
        return {
            itemDescription: item.description,
            itemTotal: Number(itemTotal.toFixed(2)),
            taxRate,
            taxAmount: Number(taxAmount.toFixed(2)),
            category: item.category,
        };
    });
}
