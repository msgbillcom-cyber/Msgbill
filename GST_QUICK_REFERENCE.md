# 🎯 GST System - Quick Reference

## What Just Got Added

### ✅ **Category-Based Tax Rates**
Instead of picking a single tax rate for all items, each line item can now have:
- **Its own category** (e.g., "IT Services", "Tea Products")
- **Its own tax rate** (automatically selected from category)
- Examples:
  - IT Services → 18%
  - Tea → 5%
  - Education → 0%

### ✅ **Non-Profit Organization Support**
Organizations can now specify:
- For-Profit Business (GST applies)
- **Non-Profit / NGO (0% GST on all items)**
- Startup
- Freelancer
- Government Entity

### ✅ **28 Different Item Categories**
Pre-configured categories organized by tax rate:
```
0% GST:     5 categories (food, education, medical)
5% GST:    13 categories (spices, oils, vegetables, transport)
12% GST:    5 categories (hotels, cleaning, repair)
18% GST:   18 categories (IT, consulting, manufacturing)
28% GST:    3 categories (luxury, tobacco, alcohol)
```

---

## 📊 Tax Rate Breakdown

| GST Rate | Item Examples | Your Business Use Case |
|----------|---------------|------------------------|
| **0%** | Food grains, milk, education, medical | Essential items, non-profit |
| **5%** | Oils, spices, vegetables, transport | Agricultural, logistics |
| **12%** | Hotels, cleaning, repair | Services, rentals |
| **18%** | IT, consulting, electronics | Software, design, tech |
| **28%** | Luxury, tobacco, alcohol | High-end products |

---

## 🚀 How to Use

### **For Your Organization:**
1. Go to Settings
2. Set your Organization Type (e.g., "Non-Profit" if applicable)
3. Save

### **For Each Invoice Item:**
1. Add item name/description
2. Add quantity and rate
3. **Select category** (new!)
4. Tax rate auto-fills based on category
5. Save

### **System Auto-Calculates:**
- ✅ Tax amount per item
- ✅ CGST + SGST (same state)
- ✅ IGST (different states)
- ✅ Grand total

---

## 📝 Real Examples

### Example 1: Tech Freelancer
```
Item 1: Website Design        → $1,000 @ 18% (Design Services)
Item 2: Logo Design           → $500 @ 18% (Design Services)
Item 3: Tea & Snacks (catering)→ $200 @ 5% (Tea & Coffee)

Calculation:
  Web Design Tax:  ₹1000 × 18% = ₹180
  Logo Design Tax: ₹500 × 18% = ₹90
  Tea Tax:         ₹200 × 5% = ₹10
  
  Total Tax: ₹280
  Grand Total: ₹1,980
```

### Example 2: Non-Profit NGO
```
Item 1: Education Services    → $5,000 @ 0% (Non-Profit Exempt)
Item 2: Materials             → $1,000 @ 0% (Non-Profit Exempt)

Calculation:
  All items: 0% GST (organization type = NGO)
  Total Tax: ₹0
  Grand Total: ₹6,000
```

### Example 3: Agricultural Business
```
Item 1: Seeds                 → ₹10,000 @ 5% (Seeds)
Item 2: Fertilizer            → ₹5,000 @ 5% (Fertilizer)
Item 3: Pesticide             → ₹3,000 @ 5% (Pesticides)

Calculation:
  Seeds Tax:       ₹10,000 × 5% = ₹500
  Fertilizer Tax:  ₹5,000 × 5% = ₹250
  Pesticide Tax:   ₹3,000 × 5% = ₹150
  
  Total Tax: ₹900
  Grand Total: ₹18,900
```

---

## 🔍 Finding Your Category

**Not sure which category to use?**

### Quick Lookup:

**IT & Tech:**
- Software, development, consulting → **IT Services (18%)**
- Website design, graphic design → **Design Services (18%)**
- SaaS, subscriptions → **Software Subscriptions (18%)**

**Services:**
- Accounting, CA, audit → **Accounting Services (18%)**
- Lawyer, legal advice → **Legal Services (18%)**
- Repair of equipment → **Repair Services (12%)**

**Food & Agriculture:**
- Vegetables, fruits → **Fruits & Vegetables (5%)**
- Cooking oil, ghee → **Oils & Ghee (5%)**
- Fresh meat, fish → **Meat & Poultry (5%)** or **Fish & Seafood (5%)**
- Seeds, fertilizer, pesticide → **5% categories**

**Retail:**
- Electronics, phones, laptops → **Electronics (18%)**
- Clothes, fabric → **Clothing & Textiles (18%)**
- Jewelry, gold, silver → **Jewelry (18%)**

**Miscellaneous:**
- Transport/logistics → **Transport Services (5%)**
- Courier/delivery → **Logistics & Courier (18%)**
- Event management → **Entertainment Services (18%)**

---

## ❓ FAQ

**Q: What if my item doesn't fit any category?**  
A: Use "Other" category (defaults to 18%)

**Q: Can I override the auto-selected rate?**  
A: Yes, you can manually change any item's tax rate after selecting category

**Q: How do non-profits get 0% exemption?**  
A: Set your organization type to "NGO" or "Non-Profit" in settings

**Q: Do I pay GST when my turnover is below ₹40 lakh?**  
A: GST registration is optional below ₹40L, but compliance depends on items

**Q: What's the difference between CGST, SGST, IGST?**  
- **CGST**: Central GST (same state) = 9%
- **SGST**: State GST (same state) = 9%
- **IGST**: Integrated GST (different state) = 18%

---

## 📚 Full Documentation

See **GST_SYSTEM_GUIDE.md** for:
- Complete category list with descriptions
- GST compliance notes
- How to file GST returns
- Best practices

---

## ✨ New Components Available

If you're a developer:

### **GSTCategorySelect.tsx**
```tsx
<GSTCategorySelect
    value={selectedCategory}
    onChange={(category) => setCategory(category)}
    onRateChange={(rate) => setTaxRate(rate)}
/>
```

### **OrganizationTypeSelect.tsx**
```tsx
<OrganizationTypeSelect
    value={orgType}
    onChange={(type) => setOrgType(type)}
/>
```

### **Updated Functions**
```typescript
// Get rate for any category
getGSTRateForCategory("IT_SERVICES") // Returns 18

// Calculate with per-item rates
calculateInvoiceGST(items, businessState, clientState, orgType)

// Get item-level breakdown
getDetailedItemGSTBreakdown(items, orgType)
```

---

## 🎓 Next Steps

1. **Test it:** Create a test invoice with mixed tax rates
2. **Verify:** Compare calculations with manual GST calculations
3. **Integrate:** Add category select to your invoice creation form
4. **Document:** Create your own category list for your business

---

**Status:** ✅ Ready to use  
**Last Updated:** February 5, 2026  
**Version:** 1.0
