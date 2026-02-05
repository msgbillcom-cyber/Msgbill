# 🧾 MsgBill - Advanced GST System

**Updated:** February 5, 2026

---

## 📋 Overview

MsgBill now supports **category-specific GST rates** and **non-profit organization exemptions**, making it fully compliant with Indian GST regulations.

---

## ✨ What's New

### 1. **Category-Based GST Rates**
Each item can have its own GST rate based on category:
- **0%** - Essential items and exempt services
- **5%** - Reduced rate items
- **12%** - Reduced services
- **18%** - Standard rate (default)
- **28%** - Luxury items

### 2. **Organization Type Support**
Specify your organization type for proper GST treatment:
- **For-Profit Business** → GST Applicable
- **Non-Profit Organization** → GST Exempt
- **Startup** → GST Applicable
- **Freelancer/Individual** → GST Conditional
- **NGO/Charity** → GST Exempt
- **Government Entity** → GST Exempt

### 3. **Per-Item Tax Rates**
Each line item can have a different tax rate, automatically calculated based on category.

---

## 🏷️ Supported Categories

### **0% GST - Exempted Items**
```
✓ Food Grains (cereals, pulses, flour)
✓ Milk & Dairy (milk, yogurt, paneer)
✓ Bread & Bakery (bread, flour products)
✓ Medical Services (hospitals, doctors)
✓ Education (schools, colleges)
```

### **5% GST - Reduced Rate**
```
✓ Spices
✓ Oils & Ghee
✓ Salt
✓ Sugar
✓ Tea & Coffee
✓ Fruits & Vegetables
✓ Meat & Poultry (fresh)
✓ Fish & Seafood
✓ Eggs
✓ Fertilizers
✓ Seeds
✓ Pesticides
✓ Transport Services
```

### **12% GST - Reduced Services**
```
✓ Hotel & Food Services
✓ Cleaning Services
✓ Repair Services
✓ Commercial Rent
✓ Furniture
```

### **18% GST - Standard Rate**
```
✓ Consulting Services
✓ IT Services (software, consulting)
✓ Design Services (graphic, web)
✓ Accounting Services
✓ Legal Services
✓ Advertising
✓ Import/Export
✓ Manufacturing
✓ Electronics
✓ Home Appliances
✓ Vehicles
✓ Spare Parts
✓ Clothing & Textiles
✓ Jewelry
✓ Cosmetics
✓ Entertainment Services
✓ Logistics & Courier
✓ Software Subscriptions
```

### **28% GST - Luxury Items**
```
✓ Luxury Goods
✓ Tobacco Products
✓ Alcoholic Beverages
```

---

## 💼 Non-Profit Organizations (0% GST)

If your organization is:
- **NGO** / **Charity**
- **Educational Institution**
- **Government Entity**
- **Religious Organization**

You can mark your organization as **"Non-Profit"** and all invoices will have **0% GST**, regardless of item categories.

### How to Enable:

1. Go to **Settings** → **Organization Details**
2. Set **Organization Type** to "Non-Profit Organization" or "NGO/Charity"
3. All future invoices will automatically calculate with 0% tax
4. **Keep exemption documentation** for audit purposes

---

## 🧮 How GST Calculation Works

### **For-Profit Business (Same State)**

Example Invoice:
```
Item 1: Consulting Services - ₹10,000 @ 18% GST
Item 2: Tea Products - ₹5,000 @ 5% GST

Calculation:
- Item 1 Tax: ₹10,000 × 18% = ₹1,800
- Item 2 Tax: ₹5,000 × 5% = ₹250

Total Tax = ₹2,050

Same State Distribution:
- CGST (Central): ₹1,025
- SGST (State): ₹1,025
- IGST: ₹0

Final Invoice Total: ₹17,050
```

### **Inter-State Invoice (Different States)**

Example:
```
Same items but client in different state

Total Tax = ₹2,050
Distribution:
- CGST: ₹0
- SGST: ₹0
- IGST: ₹2,050

Final Invoice Total: ₹17,050
(Note: Same total, but IGST instead of CGST+SGST)
```

### **Non-Profit Organization**

```
Same items but organization type = "NGO"

Item 1: Consulting Services - ₹10,000 @ 0% GST
Item 2: Tea Products - ₹5,000 @ 0% GST

Total Tax = ₹0
Final Invoice Total: ₹15,000
```

---

## 📝 Using the New Features

### **In Invoice Creation Form:**

```
Step 1: Select Organization Type
  └─ Choose: Non-Profit, For-Profit, etc.

Step 2: For each line item
  ├─ Item Description
  ├─ Quantity
  ├─ Rate
  └─ Category (auto-selects tax rate)
      
Step 3: Select Client State
  └─ Auto-calculates CGST/SGST or IGST
```

### **In Invoice View:**

The invoice displays:
```
Line Items with Tax Breakdown:
┌─────────────────────────────────────┐
│ Item           │ Amount  │ Tax Rate │
├─────────────────────────────────────┤
│ Consulting     │ ₹10,000 │   18%    │
│ Tea Products   │ ₹5,000  │    5%    │
└─────────────────────────────────────┘

Tax Summary:
  CGST (9%): ₹1,025
  SGST (9%): ₹1,025
  ─────────────────
  Total Tax: ₹2,050
  
Grand Total: ₹17,050
```

---

## 🔧 API & Calculation Details

### **Get GST Rate for Category:**
```typescript
import { getGSTRateForCategory } from "@/lib/gst";

const rate = getGSTRateForCategory("IT_SERVICES");
// Returns: 18
```

### **Calculate Invoice with Categories:**
```typescript
import { calculateInvoiceGST } from "@/lib/gst";

const items = [
    { description: "Software Dev", quantity: 1, rate: 50000, category: "IT_SERVICES" },
    { description: "Tea Service", quantity: 10, rate: 500, category: "TEA_COFFEE" }
];

const result = calculateInvoiceGST(
    items,
    "Maharashtra",      // Business State
    "Maharashtra",      // Client State
    "PROFIT"            // Organization Type
);

// Returns: { subtotal, cgst, sgst, igst, totalTax, grandTotal }
```

### **Get Detailed Breakdown:**
```typescript
import { getDetailedItemGSTBreakdown } from "@/lib/gst";

const breakdown = getDetailedItemGSTBreakdown(items, "PROFIT");
// Returns array of { itemDescription, itemTotal, taxRate, taxAmount, category }
```

---

## ✅ Compliance Notes

### **For Business Owners:**

1. **Keep Records:**
   - Maintain category classifications for all items
   - Document GST rates used for each invoice
   - Keep exemption certificates (if applicable)

2. **GST Registration:**
   - If turnover > ₹40 lakh: GST registration is **mandatory**
   - File GST returns monthly/quarterly as applicable
   - Use correct HSN/SAC codes for items

3. **Non-Profit Exemption:**
   - Maintain valid exemption documentation
   - Not all non-profits are automatically exempt
   - Consult a CA for your specific case

4. **Inter-State:**
   - IGST applies for different state delivery
   - CGST + SGST for same state
   - Ensure client's GSTIN is correct

---

## 🎯 Common Use Cases

### **Case 1: E-Learning Company**
- Education category → 0% GST
- Software subscription add-on → 18% GST
- Mix both in one invoice

### **Case 2: Food Delivery**
- Vegetables → 5% GST
- Packaged snacks → 18% GST
- Cooking oil → 5% GST
- Delivery service → 5% GST

### **Case 3: Medical Clinic**
- Doctor consultation → 0% GST
- Medicine (packaged) → 5-18% GST (depends on type)
- Equipment rental → 18% GST

### **Case 4: NGO Fundraising**
- All items → 0% GST (organization exempt)
- Programs, services, donations all tax-free

---

## 🚀 Best Practices

1. **Always verify category:** Use official HSN/SAC codes for compliance
2. **Keep it simple:** Start with standard 18% if unsure
3. **Update quarterly:** Review if your GST liability changed
4. **Maintain records:** Save all invoices and tax calculations
5. **Consult CA:** For complex scenarios, always consult a CA

---

## 📞 Support

For GST-related questions:
- **Email:** support@msgbill.com
- **FAQ:** Coming soon
- **Consult:** A Chartered Accountant in your state

---

## 📚 References

- **GST Council Official Rates:** https://www.gst.gov.in
- **HSN/SAC Codes:** https://www.gst.gov.in/hsnsaccode
- **Non-Profit Exemption:** Check your state GST website
- **GST Returns:** https://returns.gst.gov.in

---

**Note:** This is a general implementation. Always verify with your accountant for your specific business case. MsgBill assumes no liability for GST compliance - use at your discretion.
