export const LIMITS = {
    FREE: {
        invoicesTotal: 20,
        clientsMax: 5,
        advancedTemplates: false,
    },
    PRO: {
        invoicesTotal: Infinity,
        clientsMax: Infinity,
        advancedTemplates: true,
    },
};

export const checkLimit = (currentCount: number, limit: number) => {
    return currentCount < limit;
};
