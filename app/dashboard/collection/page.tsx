"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateReminderMessage, shareViaWhatsApp, ReminderTone } from "@/lib/whatsapp";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";

export default function CollectionPage() {
    const supabase = createClientSideClient();
    const { orgId, profile } = useAuth();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalOverdue: 0,
        count: 0
    });

    const [reminderModalOpen, setReminderModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [reminderTone, setReminderTone] = useState<ReminderTone>('friendly');

    const fetchOverdueInvoices = async () => {
        if (!orgId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const today = new Date().toISOString().split("T")[0];

            // Fetch overdue invoices (status = sent/overdue AND due_date < today)
            const { data, error } = await supabase
                .from("invoices")
                .select(`
                    *,
                    client:clients(name, phone)
                `)
                .eq("org_id", orgId)
                .neq("status", "paid")
                .neq("status", "cancelled")
                .neq("status", "draft")
                .lt("due_date", today)
                .order("due_date", { ascending: true });

            if (error) throw error;

            setInvoices(data || []);

            // Calculate stats
            const total = (data || []).reduce((sum, inv) => sum + Number(inv.grand_total), 0);
            setStats({
                totalOverdue: total,
                count: (data || []).length
            });

        } catch (error: any) {
            console.error("Error fetching collections:", error);
            addToast({ title: "Error", type: "error", message: "Failed to load overdue invoices." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverdueInvoices();
    }, [orgId]);

    const handleRemindClick = (invoice: any) => {
        setSelectedInvoice(invoice);
        setReminderModalOpen(true);
    };

    const sendReminder = () => {
        if (!selectedInvoice) return;

        const clientPhone = selectedInvoice.client?.phone;
        
        if (!clientPhone) {
            addToast({ 
                title: "No Phone Number", 
                type: "error", 
                message: "This client does not have a phone number saved." 
            });
            return;
        }

        const message = generateReminderMessage({
            invoiceNumber: selectedInvoice.invoice_number,
            clientName: selectedInvoice.client?.name || "Client",
            amount: formatCurrency(selectedInvoice.grand_total),
            dueDate: formatDate(selectedInvoice.due_date),
            invoiceUrl: `${window.location.origin}/invoice/${selectedInvoice.id}`,
            businessName: profile?.company_name || "MsgBill User",
            paymentLink: selectedInvoice.payment_link_url
        }, reminderTone);

        shareViaWhatsApp(clientPhone, message);
        
        setReminderModalOpen(false);
        addToast({ title: "Opened WhatsApp", type: "success", message: "Reminder message generated!" });
    };

    const getDaysOverdue = (dueDate: string) => {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - due.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    };

    return (
        <div className="container-wide pb-20">
            <PageHeader
                title="Collection Center"
                description="Recover unpaid invoices faster with automated reminders."
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="p-6">
                        <p className="text-red-600 font-medium mb-1">Total Overdue Amount</p>
                        <h2 className="text-3xl font-bold text-red-900">
                            {formatCurrency(stats.totalOverdue)}
                        </h2>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-100">
                    <CardContent className="p-6">
                        <p className="text-orange-600 font-medium mb-1">Overdue Invoices</p>
                        <h2 className="text-3xl font-bold text-orange-900">
                            {stats.count}
                        </h2>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table headers={["Client", "Invoice #", "Due Date", "Amount", "Status", "Action"]}>
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-secondary-500">
                                    {loading ? "Loading..." : "🎉 No overdue invoices! Great job."}
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                                    <td className="p-4 font-medium">{invoice.client?.name}</td>
                                    <td className="p-4 text-secondary-600">{invoice.invoice_number}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span>{formatDate(invoice.due_date)}</span>
                                            <span className="text-xs text-red-500 font-medium">
                                                {getDaysOverdue(invoice.due_date)} days late
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold">{formatCurrency(invoice.grand_total)}</td>
                                    <td className="p-4">
                                        <Badge variant="error">Overdue</Badge>
                                    </td>
                                    <td className="p-4">
                                        <Button 
                                            size="sm" 
                                            className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
                                            onClick={() => handleRemindClick(invoice)}
                                        >
                                            📲 Remind
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </Table>
                </CardContent>
            </Card>

            <Modal
                isOpen={reminderModalOpen}
                onClose={() => setReminderModalOpen(false)}
                title="Send Payment Reminder"
            >
                <div className="space-y-4">
                    <p className="text-sm text-secondary-600">
                        Choose the tone for your reminder message to <strong>{selectedInvoice?.client?.name}</strong>.
                    </p>

                    <div className="space-y-3">
                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${reminderTone === 'friendly' ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'}`}>
                            <input 
                                type="radio" 
                                name="tone" 
                                value="friendly" 
                                checked={reminderTone === 'friendly'}
                                onChange={() => setReminderTone('friendly')}
                                className="w-4 h-4 text-primary-600"
                            />
                            <div>
                                <div className="font-medium text-secondary-900">Friendly Nudge</div>
                                <div className="text-xs text-secondary-500">"Just a gentle reminder..."</div>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${reminderTone === 'firm' ? 'border-orange-500 bg-orange-50' : 'border-secondary-200'}`}>
                            <input 
                                type="radio" 
                                name="tone" 
                                value="firm" 
                                checked={reminderTone === 'firm'}
                                onChange={() => setReminderTone('firm')}
                                className="w-4 h-4 text-orange-600"
                            />
                            <div>
                                <div className="font-medium text-secondary-900">Firm Reminder</div>
                                <div className="text-xs text-secondary-500">"We haven't received it yet..."</div>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${reminderTone === 'urgent' ? 'border-red-500 bg-red-50' : 'border-secondary-200'}`}>
                            <input 
                                type="radio" 
                                name="tone" 
                                value="urgent" 
                                checked={reminderTone === 'urgent'}
                                onChange={() => setReminderTone('urgent')}
                                className="w-4 h-4 text-red-600"
                            />
                            <div>
                                <div className="font-medium text-red-900">Urgent / Final</div>
                                <div className="text-xs text-red-500">"Pay immediately to avoid..."</div>
                            </div>
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setReminderModalOpen(false)}>Cancel</Button>
                        <Button onClick={sendReminder} className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                            Send on WhatsApp
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
