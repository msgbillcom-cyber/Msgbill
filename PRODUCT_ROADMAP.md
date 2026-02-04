# MsgBill: Product Roadmap 🚀

This roadmap outlines the strategic plan to transform MsgBill from a simple invoicing tool into a **profitable business platform**.

## **Phase 1: Core Utility & "Stickiness" (Immediate)**
*Focus: Make the app indispensable for daily use so users don't leave.*

### 1. Manual "Mark as Paid" ✅ (High Priority)
- **Why:** Not every client pays via our Razorpay links. Users accept cash, UPI (direct), or bank transfers. They need to record this to close invoices.
- **Action:** Add a "Record Payment" button on the invoice detail page.
- **Impact:** Completes the lifecycle of an invoice.

### 2. Expense Tracking 💰
- **Why:** Business owners care about **Profit**, not just Revenue. Currently, they can't see their costs.
- **Action:**
  - Create `expenses` table (amount, category, date, receipt_url).
  - Add "Expenses" tab in Dashboard.
  - Show "Net Profit" (Income - Expenses) on the Overview.
- **Impact:** Becomes their *single source of truth* for finance.

### 3. Dashboard Analytics 2.0 📊
- **Why:** Users need to know "Who owes me money?" instantly.
- **Action:**
  - "Overdue" ticker (already partially done, needs enhancement).
  - Monthly Revenue Graph.
- **Impact:** Visualizes the value they get from the app.

---

## **Phase 2: Monetization & Automation (Weeks 2-4)**
*Focus: Convert free users to paid users automatically.*

### 1. Automated Subscriptions (Razorpay) 💳
- **Why:** Currently, upgrading is manual (WhatsApp message). This is unscalable.
- **Action:**
  - Integrate Razorpay Subscription API.
  - Auto-update `subscription_tier` in Supabase upon successful webhook.
- **Impact:** Passive income.

### 2. "White Label" Branding (Pro Feature) 🎨
- **Why:** Pro users want to remove "Powered by MsgBill" from PDFs.
- **Action:**
  - Add toggle in Settings for Pro users.
  - Custom color themes for invoices.
- **Impact:** Strong upsell trigger.

---

## **Phase 3: Growth & Viral Loop (Month 2+)**
*Focus: Get more users through existing users.*

### 1. Automated WhatsApp Reminders 🤖
- **Why:** Chasing clients is awkward. Let the bot do it.
- **Action:**
  - "Auto-remind on Due Date" toggle.
  - Requires WhatsApp Business API (Paid integration).
- **Impact:** High-value premium feature.

### 2. Recurring Invoices 🔄
- **Why:** Freelancers/Agencies (our ideal customers) have retainers.
- **Action:**
  - "Repeat every month" option on invoice creation.
  - Cron job auto-creates and emails the draft.
- **Impact:** Lock-in effect (high switching cost).

---

## **Technical Debt / Maintenance**
- **Data Retention:** We have the 6-month archival logic prepared. We will enable the "Warning Emails" once we have enough data (Month 6).
- **Security:** Audit RLS policies for the new `expenses` table.
