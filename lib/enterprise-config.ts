// Enterprise Configuration - Centralized settings for JJ Enterprises Platform
// This file provides a single source of truth for all enterprise-level configurations

export const ENTERPRISE_CONFIG = {
    // Company Information
    company: {
        name: "JJ Enterprises",
        legalName: "JJ Enterprises Pvt. Ltd.",
        tagline: "India's Premier Paper Box Packaging Solutions",
        foundedYear: 2008,
        registrationNumber: "U17100MH2008PTC123456",
        gstNumber: "27AABCJ1234F1Z5",
    },

    // Contact Details
    contact: {
        phone: {
            primary: "+91-98192-56432",
            secondary: "+91-22-2567-8901",
            whatsapp: "+91-98192-56432",
        },
        email: {
            sales: "sales@jjenterprises.com",
            support: "support@jjenterprises.com",
            info: "info@jjenterprises.com",
            careers: "careers@jjenterprises.com",
        },
        address: {
            street: "Plot No. 45, MIDC Industrial Area",
            landmark: "Near Bharat Petroleum",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            postalCode: "400093",
            coordinates: {
                lat: 19.0760,
                lng: 72.8777,
            },
        },
    },

    // Business Hours
    businessHours: {
        weekdays: { open: "09:00", close: "18:00" },
        saturday: { open: "09:00", close: "14:00" },
        sunday: { open: null, close: null }, // Closed
        timezone: "Asia/Kolkata",
    },

    // Certifications
    certifications: [
        {
            id: "iso-9001",
            name: "ISO 9001:2015",
            description: "Quality Management System",
            issuer: "International Organization for Standardization",
            validUntil: "2026-12-31",
            icon: "Shield",
        },
        {
            id: "iso-14001",
            name: "ISO 14001:2015",
            description: "Environmental Management System",
            issuer: "International Organization for Standardization",
            validUntil: "2026-12-31",
            icon: "Leaf",
        },
        {
            id: "fda-compliant",
            name: "FDA Compliant",
            description: "Food & Drug Administration Approved",
            issuer: "FDA",
            validUntil: "2027-06-30",
            icon: "CheckCircle",
        },
        {
            id: "fsc-certified",
            name: "FSC Certified",
            description: "Forest Stewardship Council",
            issuer: "FSC",
            validUntil: "2026-09-15",
            icon: "TreeDeciduous",
        },
        {
            id: "brc-packaging",
            name: "BRC Packaging",
            description: "British Retail Consortium Standard",
            issuer: "BRC",
            validUntil: "2027-03-31",
            icon: "Award",
        },
    ],

    // Business Stats
    stats: {
        yearsExperience: 15,
        productsDelivered: "10M+",
        happyClients: "2,500+",
        productSKUs: "2,500+",
        manufacturingCapacity: "500,000 boxes/day",
        exportCountries: 15,
    },

    // Feature Flags for Enterprise Features
    features: {
        enableRealTimeQuotes: true,
        enableBulkOrdering: true,
        enableCustomDesign: true,
        enable3DConfigurator: true,
        enableLiveChat: false, // Coming soon
        enableARPreview: false, // Coming soon
        enableMultiLanguage: false, // Coming soon
        enableB2BPortal: true,
        enableSampleOrdering: true,
        enableOrderTracking: true,
    },

    // Pricing Configuration
    pricing: {
        currency: {
            default: "INR" as const,
            supported: ["INR", "USD", "AED"] as const,
        },
        minimumOrderValue: {
            INR: 5000,
            USD: 60,
            AED: 220,
        },
        bulkDiscounts: [
            { minQuantity: 500, discount: 5 },
            { minQuantity: 1000, discount: 10 },
            { minQuantity: 5000, discount: 15 },
            { minQuantity: 10000, discount: 20 },
        ],
        vatRates: {
            IN: 18, // GST
            US: 0,  // Varies by state
            AE: 5,  // UAE VAT
        },
    },

    // Shipping Configuration
    shipping: {
        freeShippingThreshold: {
            INR: 25000,
            USD: 300,
            AED: 1100,
        },
        estimatedDelivery: {
            domestic: "5-7 business days",
            international: "10-15 business days",
            express: "2-3 business days",
        },
        carriers: ["BlueDart", "DHL", "FedEx", "Delhivery"],
    },

    // API Configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
        timeout: 30000,
        retryAttempts: 3,
        rateLimit: {
            requests: 100,
            windowMs: 60000,
        },
    },

    // Security Configuration
    security: {
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        maxLoginAttempts: 5,
        lockoutDuration: 15 * 60 * 1000, // 15 minutes
        passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            requireSpecialChar: true,
        },
        csrfEnabled: true,
        rateLimitEnabled: true,
    },

    // Performance Budgets
    performance: {
        lcp: 2500, // ms
        fid: 100,  // ms
        cls: 0.1,
        fcp: 1800, // ms
        ttfb: 800, // ms
        bundleSizeLimit: 250, // KB for initial JS
        imageSizeLimit: 200, // KB per image
    },

    // Social Links
    social: {
        linkedin: "https://linkedin.com/company/jjenterprises",
        facebook: "https://facebook.com/jjenterprises",
        twitter: "https://twitter.com/jjenterprises",
        instagram: "https://instagram.com/jjenterprises",
        youtube: "https://youtube.com/@jjenterprises",
        pinterest: "https://pinterest.com/jjenterprises",
    },
} as const

// Type exports for type-safe usage
export type EnterpriseConfig = typeof ENTERPRISE_CONFIG
export type Currency = (typeof ENTERPRISE_CONFIG.pricing.currency.supported)[number]
export type Certification = (typeof ENTERPRISE_CONFIG.certifications)[number]

// Helper functions
export function getCertificationById(id: string): Certification | undefined {
    return ENTERPRISE_CONFIG.certifications.find((cert) => cert.id === id)
}

export function getBulkDiscount(quantity: number): number {
    const discounts = [...ENTERPRISE_CONFIG.pricing.bulkDiscounts].sort(
        (a, b) => b.minQuantity - a.minQuantity
    )
    const applicable = discounts.find((d) => quantity >= d.minQuantity)
    return applicable?.discount ?? 0
}

export function isFeatureEnabled(feature: keyof typeof ENTERPRISE_CONFIG.features): boolean {
    return ENTERPRISE_CONFIG.features[feature]
}

export function getFreeShippingThreshold(currency: Currency): number {
    return ENTERPRISE_CONFIG.shipping.freeShippingThreshold[currency]
}

export function getMinimumOrderValue(currency: Currency): number {
    return ENTERPRISE_CONFIG.pricing.minimumOrderValue[currency]
}
