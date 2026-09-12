"use client";

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Plus,
    Trash2,
    Download,
    Share2,
    Printer,
    Sparkles,
    CheckCircle2,
    ShieldCheck,
    Upload,
    X,
    FileText,
} from "lucide-react";
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

    // Logo state
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [logoAspect, setLogoAspect] = useState<number>(1);

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

    // Modal state for desktop WhatsApp Web guide
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [downloadedFileName, setDownloadedFileName] = useState("");

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

    // Hydrate saved business profile from localStorage
    useEffect(() => {
        try {
            const savedSeller = localStorage.getItem("msgbill_guest_seller");
            if (savedSeller) {
                const parsed = JSON.parse(savedSeller);
                if (parsed.sellerName) setSellerName(parsed.sellerName);
                if (parsed.sellerPhone) setSellerPhone(parsed.sellerPhone);
                if (parsed.sellerEmail) setSellerEmail(parsed.sellerEmail);
                if (parsed.sellerGstin) setSellerGstin(parsed.sellerGstin);
                if (parsed.sellerAddress) setSellerAddress(parsed.sellerAddress);
                if (parsed.upiId) setUpiId(parsed.upiId);
            }
            const savedLogo = localStorage.getItem("msgbill_guest_logo");
            if (savedLogo) {
                setLogoUrl(savedLogo);
                const img = new Image();
                img.onload = () => setLogoAspect(img.width / img.height);
                img.src = savedLogo;
            }
        } catch (e) {}
    }, []);

    // Save business details whenever changed
    useEffect(() => {
        try {
            const payload = JSON.stringify({
                sellerName,
                sellerPhone,
                sellerEmail,
                sellerGstin,
                sellerAddress,
                upiId,
            });
            localStorage.setItem("msgbill_guest_seller", payload);
        } catch (e) {}
    }, [sellerName, sellerPhone, sellerEmail, sellerGstin, sellerAddress, upiId]);

    // Handle Logo Upload (converts to standardized PNG to ensure crisp rendering in jsPDF)
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) {
            alert("Please choose an image under 3MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxDim = 600;
                let w = img.width;
                let h = img.height;
                if (w > maxDim || h > maxDim) {
                    if (w > h) {
                        h = Math.round((h * maxDim) / w);
                        w = maxDim;
                    } else {
                        w = Math.round((w * maxDim) / h);
                        h = maxDim;
                    }
                }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, w, h);
                    const pngData = canvas.toDataURL("image/png");
                    setLogoUrl(pngData);
                    setLogoAspect(img.width / img.height);
                    try {
                        localStorage.setItem("msgbill_guest_logo", pngData);
                    } catch (e) {}
                }
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    };

    const removeLogo = () => {
        setLogoUrl(null);
        setLogoAspect(1);
        try {
            localStorage.removeItem("msgbill_guest_logo");
        } catch (e) {}
    };

    // Helpers to update items
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

    // Build the formatted PDF document
    const generatePDFDoc = (): jsPDF => {
        const doc = new jsPDF();

        // Top Brand Banner
        doc.setFillColor(16, 185, 129); // emerald-500
        doc.rect(0, 0, 210, 12, "F");
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text("GST COMPLIANT TAX INVOICE • GENERATED VIA MSGBILL.COM", 105, 8, { align: "center" });

        // Calculate Header Positions based on Logo
        let textX = 14;

        if (logoUrl) {
            try {
                const maxW = 32;
                const maxH = 20;
                let renderW = maxW;
                let renderH = maxH;
                const aspect = logoAspect || 1;

                if (aspect >= 1) {
                    renderW = Math.min(maxW, maxH * aspect);
                    renderH = renderW / aspect;
                } else {
                    renderH = Math.min(maxH, maxW / aspect);
                    renderW = renderH * aspect;
                }

                doc.addImage(logoUrl, "PNG", 14, 18, renderW, renderH);
                textX = 14 + renderW + 5;
            } catch (err) {
                console.error("Failed to render logo in PDF", err);
                textX = 14;
            }
        }

        // Seller Header
        doc.setFontSize(18);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.setFont("helvetica", "bold");
        doc.text(sellerName || "TAX INVOICE", textX, 24);

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "normal");
        let curY = 30;
        if (sellerGstin) {
            doc.text(`GSTIN: ${sellerGstin}`, textX, curY);
            curY += 4.5;
        }
        if (sellerPhone) {
            doc.text(`Phone: ${sellerPhone}`, textX, curY);
            curY += 4.5;
        }
        if (sellerEmail) {
            doc.text(`Email: ${sellerEmail}`, textX, curY);
            curY += 4.5;
        }
        if (sellerAddress) {
            const truncatedAddr = sellerAddress.length > 40 ? `${sellerAddress.substring(0, 40)}...` : sellerAddress;
            doc.text(`Address: ${truncatedAddr}`, textX, curY);
            curY += 4.5;
        }

        // Right Invoice Meta
        doc.setFontSize(15);
        doc.setTextColor(16, 185, 129);
        doc.setFont("helvetica", "bold");
        doc.text("TAX INVOICE", 196, 24, { align: "right" });

        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "normal");
        doc.text(`Invoice #: ${invoiceNumber}`, 196, 30, { align: "right" });
        doc.text(`Date: ${invoiceDate}`, 196, 35, { align: "right" });
        if (upiId) doc.text(`UPI ID: ${upiId}`, 196, 40, { align: "right" });
        doc.text(`Place of Supply: ${taxType === "intra" ? "Intra-State" : "Inter-State"}`, 196, 45, { align: "right" });

        // Bill To Box
        const billToY = 56;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(14, billToY, 182, 22, 3, 3, "F");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "bold");
        doc.text("BILLED TO:", 18, billToY + 7);

        doc.setFontSize(10.5);
        doc.setTextColor(15, 23, 42);
        doc.text(clientName || "Cash Customer", 18, billToY + 13);

        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "normal");
        const clientExtra = [clientPhone ? `Tel: ${clientPhone}` : "", clientAddress].filter(Boolean).join(" | ");
        if (clientExtra) doc.text(clientExtra, 18, billToY + 18);

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
            startY: billToY + 28,
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
        const finalY = doc.lastAutoTable.finalY + 8;
        const totalX = 135;

        doc.setFontSize(9.5);
        doc.setTextColor(100, 116, 139);
        doc.text("Subtotal:", totalX, finalY);
        doc.setTextColor(15, 23, 42);
        doc.text(`INR ${subtotal.toFixed(2)}`, 196, finalY, { align: "right" });

        if (taxType === "intra") {
            const halfTax = totalTax / 2;
            doc.setTextColor(100, 116, 139);
            doc.text("CGST:", totalX, finalY + 5);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${halfTax.toFixed(2)}`, 196, finalY + 5, { align: "right" });

            doc.setTextColor(100, 116, 139);
            doc.text("SGST:", totalX, finalY + 10);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${halfTax.toFixed(2)}`, 196, finalY + 10, { align: "right" });
        } else {
            doc.setTextColor(100, 116, 139);
            doc.text("IGST:", totalX, finalY + 5);
            doc.setTextColor(15, 23, 42);
            doc.text(`INR ${totalTax.toFixed(2)}`, 196, finalY + 5, { align: "right" });
        }

        // Grand Total Box
        const grandBoxY = finalY + (taxType === "intra" ? 15 : 11);
        doc.setFillColor(236, 253, 245);
        doc.rect(totalX - 4, grandBoxY, 65, 11, "F");
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(6, 95, 70);
        doc.text("TOTAL DUE:", totalX, grandBoxY + 7.5);
        doc.text(`INR ${grandTotal.toFixed(2)}`, 196, grandBoxY + 7.5, { align: "right" });

        // Footer Note
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Thank you for your business! Created with MsgBill.com - Free WhatsApp Invoicing for Indian SMBs.",
            105,
            285,
            { align: "center" }
        );

        return doc;
    };

    // Standard Download PDF
    const downloadPDF = () => {
        const doc = generatePDFDoc();
        doc.save(`${invoiceNumber || "Invoice"}.pdf`);
    };

    // Format WhatsApp message with items, tax breakdown, and 1-tap UPI link
    const getWhatsAppMessage = () => {
        const itemsSummary = items
            .filter((it) => it.description)
            .map((it) => {
                const total = (Number(it.quantity) || 0) * (Number(it.rate) || 0);
                return `• ${it.description} (${it.quantity} × Rs. ${Number(it.rate).toFixed(2)})`;
            })
            .slice(0, 4)
            .join("\n");

        return (
            `*TAX INVOICE #${invoiceNumber}*` +
            `\n\n*From:* ${sellerName || "Merchant"}` +
            `\n*Billed To:* ${clientName || "Customer"}` +
            `\n*Date:* ${invoiceDate}` +
            (itemsSummary ? `\n\n*Items:*\n${itemsSummary}` : "") +
            `\n\n*Subtotal:* Rs. ${subtotal.toFixed(2)}` +
            `\n*GST:* Rs. ${totalTax.toFixed(2)} (${taxType === "intra" ? "CGST+SGST" : "IGST"})` +
            `\n*Total Due:* Rs. ${grandTotal.toFixed(2)}` +
            (upiId
                ? `\n\n*Pay via UPI:* ${upiId}\n*Instant UPI Link:* upi://pay?pa=${upiId}&pn=${encodeURIComponent(
                      sellerName || "Merchant"
                  )}&am=${grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(invoiceNumber)}`
                : "") +
            `\n\n📄 *Official PDF Invoice attached below.*` +
            `\n\n_Created via MsgBill.com - WhatsApp Invoicing for India_`
        );
    };

    // WhatsApp Share: Native file share on mobile, auto-download + guidance on desktop
    const shareWhatsApp = async () => {
        const doc = generatePDFDoc();
        const fileName = `${invoiceNumber || "Invoice"}.pdf`;
        const message = getWhatsAppMessage();

        // 1. Try Mobile Web Share API with File
        if (typeof navigator !== "undefined" && navigator.canShare) {
            try {
                const pdfBlob = doc.output("blob");
                const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
                if (navigator.canShare({ files: [pdfFile] })) {
                    await navigator.share({
                        files: [pdfFile],
                        title: `Tax Invoice #${invoiceNumber}`,
                        text: message,
                    });
                    return;
                }
            } catch (err: any) {
                if (err.name === "AbortError") {
                    return; // User canceled native share sheet
                }
            }
        }

        // 2. Desktop Fallback: Download PDF + open WhatsApp Web + show guidance modal
        doc.save(fileName);
        setDownloadedFileName(fileName);
        setShowWhatsAppModal(true);

        const cleanPhone = clientPhone.replace(/\D/g, "");
        const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
        const waUrl = formattedPhone
            ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
            : `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(waUrl, "_blank");
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
            <AdSenseAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP} format="horizontal" label="Advertisement" />

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
                            type="button"
                            onClick={downloadPDF}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button
                            type="button"
                            onClick={shareWhatsApp}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                        >
                            <Share2 className="w-4 h-4" /> WhatsApp
                        </button>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 px-3 py-2.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 dark:text-secondary-200 dark:bg-secondary-800 text-xs font-bold rounded-xl transition-all"
                        >
                            <Printer className="w-4 h-4" /> Print
                        </button>
                    </div>
                </div>

                {/* Seller & Client 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* FROM: Your Business */}
                    <div className="bg-secondary-50/70 dark:bg-secondary-800/40 p-5 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-3.5">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black tracking-wider text-secondary-500 uppercase">
                                1. Your Business Details (From)
                            </h4>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                                Auto-saved locally
                            </span>
                        </div>

                        {/* Business Logo Upload */}
                        <div className="p-3 bg-white dark:bg-secondary-900 rounded-xl border border-dashed border-secondary-300 dark:border-secondary-700">
                            {logoUrl ? (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-12 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 flex items-center justify-center p-1 overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={logoUrl} alt="Business Logo" className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-secondary-800 dark:text-secondary-200">Business Logo Added</p>
                                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Rendered on your PDF</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            ) : (
                                <label className="flex items-center gap-3 w-full cursor-pointer group">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 transition-colors shrink-0">
                                        <Upload className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-secondary-800 dark:text-secondary-200 group-hover:text-emerald-600 transition-colors">
                                            Upload Business Logo <span className="text-[11px] font-normal text-secondary-400">(Optional)</span>
                                        </p>
                                        <p className="text-[11px] text-secondary-400">PNG, JPG, or WebP (crisply embedded on PDF)</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

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
                    <div className="bg-secondary-50/70 dark:bg-secondary-800/40 p-5 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-3.5">
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
                                placeholder="Customer Phone (e.g. 9876543210)"
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
                            rows={3}
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
                                                    aria-label="Remove line item"
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
            <AdSenseAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM} format="horizontal" label="Sponsored Links" />

            {/* Desktop WhatsApp Web Guidance Modal */}
            {showWhatsAppModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
                        <button
                            type="button"
                            onClick={() => setShowWhatsAppModal(false)}
                            className="absolute top-5 right-5 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 p-1.5 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                                    Invoice Downloaded & WhatsApp Opened!
                                </h3>
                                <p className="text-xs text-secondary-500 font-mono">
                                    {downloadedFileName}
                                </p>
                            </div>
                        </div>

                        <div className="bg-secondary-50 dark:bg-secondary-800/50 p-4 rounded-2xl border border-secondary-200 dark:border-secondary-700 space-y-3 text-xs text-secondary-600 dark:text-secondary-300">
                            <p className="font-bold text-secondary-900 dark:text-white flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                                Quick Step to Send PDF on WhatsApp Web:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                                <li>
                                    In the <strong>WhatsApp Web</strong> tab that just opened, click the <strong>📎 (Attach)</strong> icon at the bottom of your chat, then choose <strong>Document</strong>.
                                </li>
                                <li>
                                    Select the downloaded file: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{downloadedFileName}</strong> (or drag and drop it from your browser downloads into the chat).
                                </li>
                                <li>
                                    Your invoice breakdown, customer total, and instant UPI payment link are already pre-filled in the chat — just click <strong>Send</strong>!
                                </li>
                            </ol>
                        </div>

                        {/* SaaS Value Prop Banner */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                                    Want 1-click cloud invoice links without attaching files?
                                </p>
                                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                                    With a free MsgBill account, your clients can view & pay their invoices on a live web link directly from WhatsApp with no manual file dragging.
                                </p>
                                <Link
                                    href="/auth/signup"
                                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 underline mt-1 hover:text-emerald-900"
                                >
                                    Create Free MsgBill Account →
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    const doc = generatePDFDoc();
                                    doc.save(downloadedFileName);
                                }}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-secondary-800 dark:text-secondary-200 text-xs font-bold rounded-xl transition-colors"
                            >
                                <Download className="w-4 h-4" /> Download PDF Again
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowWhatsAppModal(false)}
                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                            >
                                Got It!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
