import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/callback',
          '/auth/',
          '/invoice/',
          '/store/',
          '/design-system',
          '/onboarding',
        ],
      },
      {
        // Link-preview bots: keep WhatsApp/social previews working for shared
        // invoice and store links (those pages also send noindex).
        userAgent: ['facebookexternalhit', 'WhatsApp', 'Twitterbot', 'LinkedInBot'],
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://msgbill.com/sitemap.xml',
  };
}
