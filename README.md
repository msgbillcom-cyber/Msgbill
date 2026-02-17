# MsgBill – WhatsApp Invoicing for Indian Businesses

> Create GST invoices in seconds, share on WhatsApp, and get paid faster.

MsgBill is a Next.js invoicing app for Indian SMBs. Create GST-compliant invoices, share via WhatsApp, generate UPI/payment links, manage clients and inventory, and track payments.

## Features

- **WhatsApp-native sharing** – Share invoices to clients with one click
- **GST compliance** – CGST/SGST/IGST calculation and validation
- **Razorpay integration** – Payment links, UPI QR codes, webhooks
- **Inventory management** – Products, stock tracking, auto-deduction on invoice
- **Client management** – Client profiles with GSTIN
- **Public invoice page** – Shareable links for viewing and paying invoices
- **Reports & analytics** – Revenue and GST reports (Pro)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase
- **Payments:** Razorpay
- **Styling:** Tailwind CSS
- **PDF:** jsPDF + jspdf-autotable

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/your-org/msgbill.git
cd msgbill
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_APP_URL` | App URL (e.g. `https://msgbill.com`) |

Optional (payments, WhatsApp, analytics):

- Razorpay: `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- WhatsApp: `NEXT_PUBLIC_WHATSAPP_BUSINESS_PHONE_NUMBER_ID`, `NEXT_PUBLIC_WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_BUSINESS_API_TOKEN`
- Analytics: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`

### 3. Supabase setup

1. Create a Supabase project.
2. Run migrations from `supabase/migrations/` in order (via Supabase CLI or SQL Editor).
3. Enable Email and Google auth in Supabase Auth settings.

### 4. Razorpay webhook

Configure a webhook in Razorpay pointing to:

```
https://your-domain.com/api/payments/webhook
```

Select event: `payment_link.paid`. Set `RAZORPAY_WEBHOOK_SECRET` in your env.

### 5. Run the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard
│   ├── auth/              # Login, signup, callback
│   ├── invoice/[id]       # Public invoice view
│   └── store/[org_id]     # Public WhatsApp store
├── components/            # React components
├── lib/                   # Utilities (Supabase, Razorpay, GST, PDF, WhatsApp)
├── supabase/
│   └── migrations/        # Database migrations
└── scripts/               # Diagnostics and tests
```

## Documentation

- [COMPLETE_PRODUCT_GUIDE.md](COMPLETE_PRODUCT_GUIDE.md) – Product vision and roadmap
- [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) – Launch checklist and flows
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) – Component integration
- [FEATURES.md](FEATURES.md) – Feature summary
- [SECURITY.md](SECURITY.md) – Security practices

## License

MIT – see [LICENSE](LICENSE).
