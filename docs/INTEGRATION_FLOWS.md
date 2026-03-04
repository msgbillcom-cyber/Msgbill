# MsgBill – Module Integration & Payment Flows

Quick reference for how modules connect and how payments flow end-to-end.

---

## 1. Auth → Onboarding → Dashboard

- **Auth:** `auth/login`, `auth/signup`, `auth/verify`, `auth/callback` (OAuth code exchange).
- **Middleware:** Protects `/dashboard` and `/onboarding`; redirects unauthenticated to `/auth/login`; if logged in but not onboarded, redirects to `/onboarding`.
- **Onboarding:** `onboarding/page` → `POST /api/onboarding/complete` (creates/updates `organizations`, sets `profiles.onboarded`, `org_id`). Trigger creates `usage_limits` for org.
- **Dashboard:** All dashboard routes require session + profile with `onboarded` and `org_id`. `AuthProvider` loads profile + `organization_members` + `organizations.subscription_tier` → `profile.subscription_tier` (free/pro).

---

## 2. Invoice Payment Flow (Customer pays invoice)

1. **Create invoice:** Dashboard → `invoices/new` → insert `invoices` + `invoice_items`. RLS and triggers enforce org and limits.
2. **Create payment link:** Dashboard invoice detail or `PaymentLinkButton` → `createRazorpayPaymentLink()` → `POST /api/payments/create-link` with `reference_id: invoice.id`.
   - **create-link:** Verifies session, **verifies invoice belongs to user’s org**, fetches amount from DB, creates Razorpay payment link, updates `invoices.payment_link_id` and `payment_link_url`. Callback URL: `/invoice/[id]?payment=success`.
3. **Share:** User shares public invoice URL or payment link (WhatsApp, etc.).
4. **Customer pays:** Razorpay → redirect to `/invoice/[id]?payment=success`. Public page shows “Payment received” when `payment=success`.
5. **Webhook:** Razorpay sends `payment_link.paid` to `POST /api/payments/webhook` (no auth; verified by signature). Webhook finds invoice by `payment_link_id`, updates `invoices` (status paid, `paid_at`, `razorpay_payment_id`), inserts `payments`. Middleware excludes `/api/payments/webhook` so it is not blocked by auth.

**Alternative payment (for customers who can’t use Razorpay):** Business can add **UPI ID**, **UPI QR code**, and **bank details** (bank name, A/C, IFSC) in onboarding or **Settings → Profile**. These are stored on `organizations` (and synced to `profiles` where used). On the **public invoice page**, the “Or pay via UPI / Bank” block shows bank name, account number, IFSC, UPI ID, and the uploaded QR image so customers can pay by UPI scan or bank transfer. The PDF export (`lib/pdf.ts`) also includes bank, UPI ID, and QR. If both Razorpay link and UPI/bank are present, a hint is shown: “Prefer UPI or bank transfer? Use the details in the invoice below.”

---

## 3. Subscription (Pro) Payment Flow

1. **Upgrade:** Dashboard billing or `UpgradeModal` → `POST /api/payments/create-subscription` with `orgId`. API verifies user’s `profile.org_id` matches, creates Razorpay payment link (₹499), `reference_id`: `sub_<orgId>_<timestamp>`, `notes`: `{ payment_type: 'subscription', org_id }`.
2. **User pays:** Redirect to Razorpay → after payment, redirect to `NEXT_PUBLIC_APP_URL/dashboard?subscription=success`.
3. **Webhook:** On `payment_link.paid`, if `notes.payment_type === 'subscription'` and `notes.org_id` set: update `organizations.subscription_tier = 'pro'`, update `usage_limits` (plan_type, max_invoices, max_clients), call `update_invoice_retention(org_id, 12)`. **Only `notes.org_id` is used for subscription** (not reference_id), so the correct org is always upgraded.
4. **Dashboard:** Overview page reads `?subscription=success`, shows toast “Pro activated! You have unlimited access for 1 year.” Profile refresh shows new `subscription_tier`.

---

## 4. Cross-module data usage

| Module        | Reads from                                      | Writes to / triggers      |
|---------------|--------------------------------------------------|----------------------------|
| Middleware    | `profiles` (onboarded, org_id)                   | Redirects only             |
| AuthProvider  | `profiles`, `organization_members`, `organizations` | Cache, setProfile          |
| create-link   | Session, `profiles.org_id`, `invoices`           | `invoices` (payment_link_*) |
| create-subscription | Session, `profiles.org_id`                 | Razorpay only              |
| Webhook       | `payment_link` payload, `invoices`, `organizations`, `usage_limits` | `invoices`, `payments`, `organizations`, `usage_limits`, RPC |
| Public invoice| —                                               | Client only (download, share) |
| RecordPaymentModal | Session (RLS)                             | `payments`, `invoices`     |

---

## 5. Env / config

- **Payments:** `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`.
- **Auth/DB:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Webhook URL in Razorpay dashboard must point to `https://<your-domain>/api/payments/webhook`.
