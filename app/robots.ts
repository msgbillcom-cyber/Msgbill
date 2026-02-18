import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog/', '/blog/*'],
      disallow: ['/dashboard/', '/api/', '/auth/'],
    },
    sitemap: 'https://msgbill.com/sitemap.xml',
  };
}
