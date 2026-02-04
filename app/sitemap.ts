import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://msgbill.com';
    const currentDate = new Date();

    return [
        // Main Pages
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/features`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Authentication
        {
            url: `${baseUrl}/auth/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/auth/signup`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Blog
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/whatsapp-invoice-guide`,
            lastModified: new Date('2026-01-28'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}
