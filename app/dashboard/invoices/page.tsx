"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoicesPage() {
    const { user, orgId } = useAuth();
    const supabase = createClientSideClient();
    const { addToast } = useToast();

    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchInvoices = useCallback(async () => {
        if (!user || !orgId) return;
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from("invoices")
                .select(`
                  *,
                  clients (name)
                `)
                .eq("org_id", orgId)
                .ilike("invoice_number", `%${search}%`)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setInvoices(data || []);
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    }, [user, search, addToast, supabase, orgId]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const columns = [
        {
            header: "Invoice #",
            accessor: (row: any) => (
                <span className="font-bold text-secondary-900">
                    {row.invoice_number}
                </span>
            ),
        },
        {
            header: "Client",
            accessor: (row: any) => row.clients?.name || "Unknown Client",
        },
        {
            header: "Date",
            accessor: (row: any) => formatDate(row.issue_date),
        },
        {
            header: "Amount",
            accessor: (row: any) => (
                <span className="font-semibold text-primary-600">
                    {formatCurrency(row.grand_total)}
                </span>
            ),
        },
        {
            header: "Status",
            accessor: (row: any) => {
                const variants: Record<string, any> = {
                    paid: "success",
                    overdue: "error",
                    sent: "primary",
                    draft: "secondary",
                };
                return (
                    <Badge variant={variants[row.status] || "secondary"} dot>
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            header: "Actions",
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={`/invoice/${row.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-600"
                    >
                        Download
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Invoices"
                description="Create and track your invoices and their payment status."
                action={
                    <Link href="/dashboard/invoices/new">
                        <Button leftIcon={<span>➕</span>}>
                            Create Invoice
                        </Button>
                    </Link>
                }
            />

            <div className="bg-white p-4 rounded-xl border shadow-sm w-full md:w-96">
                <Input
                    placeholder="Search invoice number..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)}
                    leftIcon={<span>🔍</span>}
                />
            </div>

            {invoices.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-secondary-300 text-center">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">📄</span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        No invoices created yet
                    </h3>
                    <p className="text-secondary-500 max-w-md mb-8">
                        Create your first professional invoice in seconds. Share it via WhatsApp and get paid faster.
                    </p>
                    <Link href="/dashboard/invoices/new">
                        <Button size="lg" leftIcon={<span>➕</span>} className="shadow-lg hover-lift">
                            Create Invoice Now
                        </Button>
                    </Link>
                </div>
            ) : (
                <Table headers={["Invoice #", "Client", "Date", "Amount", "Status", "Actions"]}>
                    {invoices.length === 0 && loading ? (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-secondary-500">
                                Loading invoices...
                            </td>
                        </tr>
                    ) : (
                        invoices.map((row) => (
                            <tr key={row.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                            <td className="p-4 font-bold text-secondary-900">{row.invoice_number}</td>
                            <td className="p-4">{row.clients?.name || "Unknown Client"}</td>
                            <td className="p-4">{formatDate(row.issue_date)}</td>
                            <td className="p-4 font-semibold text-primary-600">{formatCurrency(row.grand_total)}</td>
                            <td className="p-4">
                                <Badge variant={
                                    row.status === 'paid' ? 'success' :
                                    row.status === 'overdue' ? 'error' :
                                    row.status === 'sent' ? 'primary' : 'secondary'
                                } dot>
                                    {row.status}
                                </Badge>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <Link href={`/dashboard/invoices/${row.id}`}>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </Link>
                                    <Link href={`/invoice/${row.id}`} target="_blank">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary-600"
                                        >
                                            Public View
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </Table>
            )}
        </div>
    );
}
