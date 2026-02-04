import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MsgBill - WhatsApp Invoicing',
        short_name: 'MsgBill',
        description: 'Create GST-compliant invoices and share them on WhatsApp. Get paid faster.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
            {
                src: '/logo-final.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo-final.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
