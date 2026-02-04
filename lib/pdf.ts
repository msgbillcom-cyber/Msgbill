import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency, formatDate } from './utils';

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};

export interface GenerateInvoiceProps {
    invoice: any;
    client: any;
    organization: any;
    items: any[];
}

export const generateInvoicePDF = async ({
    invoice,
    client,
    organization,
    items,
}: GenerateInvoiceProps) => {
    const doc = new jsPDF();
    const margin = 20;
    let cursorY = 20;

    // 1. Header (Logo & Title)
    if (organization.logo_url) {
        try {
            const img = await loadImage(organization.logo_url);
            const maxW = 50;
            const maxH = 25;
            const ratio = img.width / img.height;
            let w = maxW;
            let h = w / ratio;
            if (h > maxH) {
                h = maxH;
                w = h * ratio;
            }
            doc.addImage(img, 'PNG', margin, cursorY, w, h);
            cursorY += h + 5;
        } catch (error) {
            console.error('Failed to load logo', error);
            doc.setFontSize(22);
            doc.setTextColor(30, 41, 59); // secondary-900
            doc.text(organization.company_name || organization.name || 'INVOICE', margin, cursorY + 8);
            cursorY += 15;
        }
    } else {
        doc.setFontSize(22);
        doc.setTextColor(30, 41, 59); // secondary-900
        doc.text(organization.company_name || organization.name || 'INVOICE', margin, cursorY + 8);
        cursorY += 15;
    }

    doc.setFontSize(10);
    doc.setTextColor(100);
    // cursorY is already updated
    doc.text(`GSTIN: ${organization.gstin || 'N/A'}`, margin, cursorY);

    doc.setFontSize(30);
    doc.setTextColor(79, 70, 229); // primary-600
    doc.text('INVOICE', 190, 25, { align: 'right' });

    cursorY += 15;

    // 2. Business Details (Row)
    doc.setFontSize(10);
    doc.setTextColor(30);
    doc.setFont('helvetica', 'bold');
    doc.text('FROM:', margin, cursorY);
    doc.text('BILL TO:', 120, cursorY);

    cursorY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);

    // From details (Organization)
    const fromLines = [
        organization.company_name || organization.name,
        organization.address,
        organization.bank_name ? `Bank: ${organization.bank_name}` : '',
        (organization.account_number || organization.bank_account_number) ? `A/C: ${organization.account_number || organization.bank_account_number}` : '',
        (organization.ifsc_code || organization.bank_ifsc_code) ? `IFSC: ${organization.ifsc_code || organization.bank_ifsc_code}` : '',
        organization.upi_id ? `UPI ID: ${organization.upi_id}` : '',
    ].filter(Boolean);

    fromLines.forEach((line, i) => {
        doc.text(line, margin, cursorY + i * 5);
    });

    // To details (Client)
    const toLines = [
        client.name,
        client.address,
        client.email,
        client.gstin ? `GSTIN: ${client.gstin}` : '',
    ].filter(Boolean);

    toLines.forEach((line, i) => {
        doc.text(line, 120, cursorY + i * 5);
    });

    cursorY += 30;

    // 3. Invoice Summary Banner
    doc.setFillColor(248, 250, 252); // secondary-50
    doc.rect(margin, cursorY, 170, 15, 'F');
    doc.setTextColor(30);
    doc.setFont('helvetica', 'bold');

    doc.text('Invoice #', margin + 5, cursorY + 10);
    doc.text('Date', margin + 55, cursorY + 10);
    doc.text('Due Date', margin + 115, cursorY + 10);

    doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoice_number, margin + 25, cursorY + 10);
    doc.text(formatDate(invoice.issue_date), margin + 70, cursorY + 10);
    doc.text(formatDate(invoice.due_date), margin + 135, cursorY + 10);

    cursorY += 25;

    // 4. Items Table
    (doc as any).autoTable({
        startY: cursorY,
        head: [['Description', 'Qty', 'Rate', 'Tax%', 'Amount']],
        body: items.map(item => [
            item.description,
            item.quantity,
            formatCurrency(item.rate),
            `${item.tax_percent}%`,
            formatCurrency(item.quantity * item.rate * (1 + (invoice.is_gst_enabled ? item.tax_percent / 100 : 0)))
        ]),
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229], textColor: 255 },
        margin: { left: margin, right: margin }
    });

    cursorY = (doc as any).lastAutoTable.finalY + 15;

    // 5. Totals
    const summaryX = 140;
    doc.setFontSize(10);
    doc.setTextColor(100);

    doc.text('Subtotal:', summaryX, cursorY);
    doc.text(formatCurrency(invoice.subtotal), 190, cursorY, { align: 'right' });

    if (invoice.is_gst_enabled) {
        cursorY += 7;
        doc.text('GST Total:', summaryX, cursorY);
        doc.text(formatCurrency(invoice.tax_total), 190, cursorY, { align: 'right' });
    }

    cursorY += 10;
    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', summaryX, cursorY);
    doc.text(formatCurrency(invoice.grand_total), 190, cursorY, { align: 'right' });

    // 6. Footer Notes
    if (invoice.notes) {
        cursorY += 20;
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Notes:', margin, cursorY);
        doc.text(invoice.notes, margin, cursorY + 5, { maxWidth: 170 });
    }

    // 7. UPI QR Code
    if (organization.upi_qr) {
        // Ensure we don't overlap with notes
        const qrY = invoice.notes ? cursorY + 20 : cursorY + 20;
        try {
            const qrImg = await loadImage(organization.upi_qr);
            doc.addImage(qrImg, 'PNG', 160, qrY, 30, 30);
            doc.setFontSize(8);
            doc.setTextColor(30);
            doc.text('Scan to Pay', 160, qrY + 35);
        } catch (error) {
            console.error('Failed to load UPI QR', error);
        }
    }

    return doc;
};
