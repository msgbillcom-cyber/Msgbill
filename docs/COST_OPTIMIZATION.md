# MsgBill: Cost Optimization & Pricing Strategy

## Overview

MsgBill has transitioned to a simplified, high-value pricing model to maximize user acquisition while maintaining sustainability.

---

## Pricing Tiers

| Feature | **Free Plan** | **Pro Plan** |
| :--- | :--- | :--- |
| **Price** | ₹0 / forever | ₹499 / month |
| **Invoice Limit** | 20 Invoices (Lifetime) | **Unlimited** |
| **Client Limit** | 5 Clients | **Unlimited** |
| **Templates** | Basic | Advanced + Custom Branding |
| **Reports** | Basic | Advanced (P&L, GST) |
| **Support** | Email | Priority WhatsApp |

---

## Free Plan Strategy (The "20 Invoice" Hook)

Instead of a time-based trial (which stresses users) or a low recurring monthly limit (which is annoying), we offer a **generous 20-invoice lifetime limit**.

### Why this works:
1.  **Enough to get hooked:** 20 invoices is enough for a freelancer to use the app for 1-3 months.
2.  **No time pressure:** Users can take their time to set up and get comfortable.
3.  **Hard Stop:** Once they hit invoice #21, they *must* upgrade. By then, they have client data and history in the system, making the upgrade a no-brainer.
4.  **Database Cost Control:** We only store ~20 records per free user, keeping our Supabase costs negligible.

---

## Pro Plan Strategy (Simple & Affordable)

At **₹499/month**, the Pro plan is priced for mass adoption in the Indian SMB market.

### Value Proposition:
-   **Unlimited Everything:** No more counting invoices.
-   **Professional Branding:** Remove "Powered by MsgBill" (future feature).
-   **Automation:** WhatsApp reminders, recurring invoices.

---

## Technical Implementation of Limits

### Database Enforcement
We use Supabase Postgres Triggers to strictly enforce the 20-invoice limit for free users.

```sql
-- Logic inside check_invoice_limit() trigger
IF (SELECT COUNT(*) FROM invoices WHERE org_id = NEW.org_id) >= 20 AND plan = 'free' THEN
  RAISE EXCEPTION 'Free limit reached. Upgrade to Pro.';
END IF;
```

### Upgrade Flow
1.  User sees a counter in the dashboard (e.g., "15/20 Invoices Used").
2.  At 20 invoices, the "Create Invoice" button opens the **UpgradeModal**.
3.  User pays ₹499 via UPI/Razorpay.
4.  Webhook/Manual Admin updates `usage_limits.plan_type` to 'pro'.
5.  Limit is instantly removed.

---

## Future Optimization (Post-Growth)

Once we scale to >10,000 users, we can re-introduce:
1.  **Data Archiving:** Archive data older than 1 year for inactive free users.
2.  **Storage Limits:** Cap file uploads (logos, attachments) for free users.
3.  **Enterprise Tier:** For agencies managing multiple organizations.

For now, the **20-Invoice Limit** is the single most important lever for conversion and cost control.
