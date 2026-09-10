"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Plus, Trash2, Download, Share2, Printer, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import AdSenseAd from "../ads/AdSenseAd";

interface InvoiceItem {
    id: string;
    description: string;
    hsn: string;
    quantity: number;
    rate: number;
    taxRate: number; // GST percentage (0, 5, 12, 18, 28)
}

export default function FreeInvoiceGenerator() {
    // Seller details
    const [sellerName, setSellerName] = useState("");
    const [sellerPhone, setSellerPhone] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [sellerGstin, setSellerGstin] = useState("");
    const [sellerAddress, setSellerAddress] = useState("");
    const [upiId, setUpiId] = useState("");

    // Client details
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientAddress, setClientAddress] = useState("");

    // Invoice meta
    const [invoiceNumber, setInvoiceNumber] = useState(
        `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    );
    const [invoiceDate, setInvoiceDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [taxType, setTaxType] = useState<"intra" | "inter">("intra"); // intra = CGST+SGST, inter = IGST

    // Line items
    const [items, setItems] = useState<InvoiceItem[]>([
        {
            id: "1",
            description: "Consulting / Professional Service",
            hsn: "9983",
            quantity: 1,
            rate: 2500,
            taxRate: 18,
        },
    ]);

    // Helpers to update item
    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                description: "",
                hsn: "",
                quantity: 1,
                rate: 0,
                taxRate: 18,
            },
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length <= 1) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Computations
    const subtotal = items.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
        0
    );

    const totalTax = items.reduce((sum, item) => {
        const itemTotal = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
        return sum + (itemTotal * (Number(item.taxRate) || 0)) / 100;
    }, 0);

    const grandTotal = subtotal + totalTax;

    // PDF Generation via jsPDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Brand banner
        doc.setFillColor(16, 185, 129); // emerald-500
        doc.rect(0, 0, 210, 15, "F");
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text("GST COMPLIANT INVOICE • GENERATED VIA MSGBILL.COM", 105, 10, { align: "center" });

        // Invoice Header
        doc.setFontSize(22);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont("helvetica", "bold");
        doc.text(sellerName || "TAX INVOICE", 14, 30);

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "normal");
        if (sellerGstin) doc.text(`GSTIN: ${sellerGstin}`, 14, 36);
        if (sellerPhone) doc.text(`Phone: ${sellerPhone}`, 14, 42);
        if (sellerEmail) doc.text(`Email: ${sellerEmail}`, 14, 48);
        if (sellerAddress) doc.text(`Address: ${sellerAddress}`, 14, 54);

        // Right Meta
        doc.setFontSize(16);
        doc.setTextColor(16, 185, 129);
        doc.setFont("helvetica", "bold");
        doc.text("INVOICE", 196, 30, { align: "right" });

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "normal");
        doc.text(`Invoice #: ${invoiceNumber}`, 196, 37, { align: "right" });
        doc.text(`Date: ${invoiceDate}`, 196, 43, { align: "right" });
        if (upiId) doc.text(`UPI ID: ${upiId}`, 196, 49, { align: "right" });

        // Bill To Box
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(14, 62, 182, 24, 3, 3, "F");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "bold");
        doc.text("BILLED TO:", 18, 70);

        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(clientName || "Cash Customer", 18, 77);

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "normal");
        const clientExtra = [clientPhone ? `Tel: ${clientPhone}` : "", clientAddress].filter(Boolean).join(" | ");
        if (clientExtra) doc.text(clientExtra, 18, 83);

        // Table
        const tableBody = items.map((item, idx) => {
            const rowTotal = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
            const rowTax = (rowTotal * (Number(item.taxRate) || 0)) / 100;
            return [
                idx + 1,
                item.description || "Item",
                item.hsn || "-",
                item.quantity,
                `INR ${Number(item.rate).toFixed(2)}`,
                `${item.taxRate}%`,
                `INR ${(rowTotal + rowTax).toFixed(2)}`,
            ];
        });

        autoTable(doc, {
            startY: 92,
            head: [["#", "Item Description", "HSN/SAC", "Qty", "Rate", "Tax", "Amount"]],
            body: tableBody,
            headStyles: {
                fillColor: [15, 23, 42],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252],
            },
            margin: { left: 14, right: 14 },
        });

        // Totals
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;
        const totalX = 135;

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text("Subtotal:", totalX, finalY);
        doc.setTextColor(15, 23, 42);
        doc.text(`INR ${subtotal.toFixed(2)}`, 196, finalY, { align: "right" });

        if (taxType === "intra") {
            const halfTax = totalTax / 2;
            doc.setTextColor(100, 116, 139);
            doc.text("CGST:", totalX, finalY + 6);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${halfTax.toFixed(2)}`, 196, finalY + 6, { align: "right" });

            doc.setTextColor(100, 116, 139);
            doc.text("SGST:", totalX, finalY + 12);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${halfTax.toFixed(2)}`, 196, finalY + 12, { align: "right" });
        } else {
            doc.setTextColor(100, 116, 139);
            doc.text("IGST:", totalX, finalY + 6);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${totalTax.toFixed(2)}`, 196, finalY + 6, { align: "right" });
        }

        // Grand Total Box
        doc.setFillColor(236, 253, 245);
        doc.rect(totalX - 4, finalY + 18, 65, 12, "F");
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(6, 95, 70);
        doc.text("TOTAL DUE:", totalX, finalY + 26);
        doc.text(`INR ${grandTotal.toFixed(2)}`, 196, finalY + 26, { align: "right" });

        // Footer Note
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Thank you for your business! Created with MsgBill.com - Free Invoicing on WhatsApp for Indian SMBs.",
            105,
            285,
            { align: "center" }
        );

        doc.save(`${invoiceNumber || "Invoice"}.pdf`);
    };

    // WhatsApp Share Link
    const shareWhatsApp = () => {
        const text = encodeURIComponent(
            `*TAX INVOICE #${invoiceNumber}*` +
                `\n\n*From:* ${sellerName || "Merchant"}` +
                `\n*Billed To:* ${clientName || "Customer"}` +
                `\n*Date:* ${invoiceDate}` +
                `\n\n*Amount Payable:* Rs. ${grandTotal.toFixed(2)}` +
                (upiId ? `\n*Pay via UPI:* ${upiId}` : "") +
                `\n\nGenerated via MsgBill.com - WhatsApp Invoicing for India`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Conversion Banner: Log in to remove ads */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-emerald-200" />
                    </div>
                    <div>
                        <h3 className="font-bold text-base">Want an Ad-Free Invoicing Experience?</h3>
                        <p className="text-xs text-emerald-100">
                            Create a Free MsgBill Account to save your clients, store invoices for 1 year, and send 1-click WhatsApp bills with UPI QR codes.
                        </p>
                    </div>
                </div>
                <Link
                    href="/auth/signup"
                    className="px-5 py-2.5 bg-white text-emerald-800 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-all shadow-md shrink-0 whitespace-nowrap"
                >
                    Sign Up Free (No Ads) →
                </Link>
            </div>

            {/* Top AdSense Ad Container */}
            <AdSenseAd slot="9876543210" format="horizontal" label="Advertisement" />

            {/* Main Generator Form Card */}
            <div className="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-xl p-6 sm:p-10 space-y-8">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-secondary-100 dark:border-secondary-800 pb-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-950/60 px-3 py-1 rounded-full">
                            Free Tool • No Registration Required
                        </span>
                        <h2 className="text-2xl font-black text-secondary-900 dark:text-white mt-2">
                            Instant GST Invoice & Bill Generator
                        </h2>
                        <p className="text-xs text-secondary-500 mt-1">
                            Fill the details below to download your professional GST-compliant PDF or share via WhatsApp.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={downloadPDF}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button
                            onClick={shareWhatsApp}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                        >
                            <Share2 className="w-4 h-4" /> WhatsApp
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 px-3 py-2.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 text-xs font-bold rounded-xl transition-all"
                        >
                            <Printer className="w-4 h-4" /> Print
                        </button>
                    </div>
                </div>

                {/* Seller & Client 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* FROM: Your Business */}
                    <div className="bg-secondary-50/70 dark:bg-secondary-800/40 p-5 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-3">
                        <h4 className="text-xs font-black tracking-wider text-secondary-500 uppercase">
                            1. Your Business Details (From)
                        </h4>
                        <input
                            type="text"
                            placeholder="Business / Your Name *"
                            value={sellerName}
                            onChange={(e) => setSellerName(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={sellerPhone}
                                onChange={(e) => setSellerPhone(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={sellerEmail}
                                onChange={(e) => setSellerEmail(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="GSTIN (Optional)"
                                value={sellerGstin}
                                onChange={(e) => setSellerGstin(e.target.value.toUpperCase())}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="UPI ID for Payment (e.g. name@okhdfc)"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <textarea
                            rows={2}
                            placeholder="Business Address / City / State"
                            value={sellerAddress}
                            onChange={(e) => setSellerAddress(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    {/* TO: Customer Details */}
                    <div className="bg-secondary-50/70 dark:bg-secondary-800/40 p-5 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black tracking-wider text-secondary-500 uppercase">
                                2. Customer Details (Bill To)
                            </h4>
                            <div className="flex items-center gap-2">
                                <label className="text-[11px] text-secondary-500 font-semibold">Tax Type:</label>
                                <select
                                    value={taxType}
                                    onChange={(e: any) => setTaxType(e.target.value)}
                                    className="text-xs bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded px-2 py-1 outline-none"
                                >
                                    <option value="intra">Intra-State (CGST + SGST)</option>
                                    <option value="inter">Inter-State (IGST)</option>
                                </select>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Customer / Client Name *"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Customer Phone"
                                value={clientPhone}
                                onChange={(e) => setClientPhone(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Invoice #"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <div className="flex items-center text-xs text-secondary-500 px-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1 shrink-0" />
                                100% Legal GST format
                            </div>
                        </div>
                        <textarea
                            rows={2}
                            placeholder="Client Address / State"
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black tracking-wider text-secondary-500 uppercase">
                            3. Items & Services
                        </h4>
                        <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-secondary-200 dark:border-secondary-800 text-xs font-bold text-secondary-500 uppercase">
                                    <th className="py-2.5 px-2">Description</th>
                                    <th className="py-2.5 px-2 w-24">HSN/SAC</th>
                                    <th className="py-2.5 px-2 w-20">Qty</th>
                                    <th className="py-2.5 px-2 w-28">Rate (₹)</th>
                                    <th className="py-2.5 px-2 w-24">GST %</th>
                                    <th className="py-2.5 px-2 w-28 text-right">Amount (₹)</th>
                                    <th className="py-2.5 px-2 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800">
                                {items.map((item) => {
                                    const rowTotal = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
                                    const rowTax = (rowTotal * (Number(item.taxRate) || 0)) / 100;
                                    return (
                                        <tr key={item.id} className="group">
                                            <td className="py-2 px-2">
                                                <input
                                                    type="text"
                                                    placeholder="Item name / description"
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg outline-none focus:border-emerald-500"
                                                />
                                            </td>
                                            <td className="py-2 px-2">
                                                <input
                                                    type="text"
                                                    placeholder="HSN"
                                                    value={item.hsn}
                                                    onChange={(e) => updateItem(item.id, "hsn", e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg outline-none focus:border-emerald-500"
                                                />
                                            </td>
                                            <td className="py-2 px-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg outline-none focus:border-emerald-500"
                                                />
                                            </td>
                                            <td className="py-2 px-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.rate}
                                                    onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                                                    className="w-full px-2.5 py-1.5 text-sm bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg outline-none focus:border-emerald-500"
                                                />
                                            </td>
                                            <td className="py-2 px-2">
                                                <select
                                                    value={item.taxRate}
                                                    onChange={(e) => updateItem(item.id, "taxRate", Number(e.target.value))}
                                                    className="w-full px-2 py-1.5 text-sm bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg outline-none focus:border-emerald-500"
                                                >
                                                    <option value={0}>0%</option>
                                                    <option value={5}>5%</option>
                                                    <option value={12}>12%</option>
                                                    <option value={18}>18%</option>
                                                    <option value={28}>28%</option>
                                                </select>
                                            </td>
                                            <td className="py-2 px-2 text-right font-semibold text-secondary-800 dark:text-secondary-200">
                                                ₹{(rowTotal + rowTax).toFixed(2)}
                                            </td>
                                            <td className="py-2 px-2 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={items.length <= 1}
                                                    className="text-secondary-400 hover:text-red-500 disabled:opacity-30 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t border-secondary-100 dark:border-secondary-800 pt-6">
                    <div className="space-y-2 max-w-sm">
                        <p className="text-xs text-secondary-500">
                            💡 <strong>Tip for Indian Businesses:</strong> Under Rule 46 of CGST Rules, an invoice must clearly separate taxable value from GST amounts. This tool automatically calculates your CGST & SGST or IGST.
                        </p>
                    </div>

                    <div className="w-full sm:w-72 bg-secondary-50 dark:bg-secondary-800/60 p-4 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-2.5 text-sm">
                        <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                            <span>Subtotal:</span>
                            <span className="font-semibold text-secondary-800 dark:text-secondary-200">
                                ₹{subtotal.toFixed(2)}
                            </span>
                        </div>

                        {taxType === "intra" ? (
                            <>
                                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                                    <span>CGST:</span>
                                    <span className="font-semibold text-secondary-800 dark:text-secondary-200">
                                        ₹{(totalTax / 2).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                                    <span>SGST:</span>
                                    <span className="font-semibold text-secondary-800 dark:text-secondary-200">
                                        ₹{(totalTax / 2).toFixed(2)}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                                <span>IGST:</span>
                                <span className="font-semibold text-secondary-800 dark:text-secondary-200">
                                    ₹{totalTax.toFixed(2)}
                                </span>
                            </div>
                        )}

                        <div className="border-t border-secondary-200 dark:border-secondary-700 pt-2 flex justify-between text-base font-bold text-emerald-600 dark:text-emerald-400">
                            <span>Total Payable:</span>
                            <span>₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-secondary-100 dark:border-secondary-800">
                    <div className="text-xs text-secondary-500 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Free client-side generation. No watermark. No spam.
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={downloadPDF}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Download PDF Bill
                        </button>
                        <button
                            type="button"
                            onClick={shareWhatsApp}
                            className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
                        >
                            <Share2 className="w-4 h-4" /> Send to WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom AdSense Ad Container */}
            <AdSenseAd slot="1122334455" format="horizontal" label="Sponsored Links" />
        </div>
    );
}
