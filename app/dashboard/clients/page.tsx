"use client";

import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import ClientModal from "@/components/dashboard/ClientModal";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

export default function ClientsPage() {
    const { user, orgId } = useAuth();
    const supabase = createClientSideClient();
    const { addToast } = useToast();

    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const fetchClients = useCallback(async () => {
        if (!user || !orgId) return;
        setLoading(true);

        try {
            // Base query
            let query = supabase
                .from("clients")
                .select("*", { count: "exact" })
                .eq("org_id", orgId);

            // Search filter
            if (search) {
                query = query.or(
                    `name.ilike.%${search}%,email.ilike.%${search}%`,
                );
            }

            // Pagination
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, error, count } = await query
                .order("name", { ascending: true })
                .range(from, to);

            if (error) throw error;

            setClients(data || []);
            setTotalCount(count || 0);
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    }, [user, search, page, addToast, supabase, orgId]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this client?")) return;
        if (!orgId) return;

        try {
            const { error } = await supabase
                .from("clients")
                .delete()
                .eq("id", id)
                .eq("org_id", orgId);
            if (error) throw error;
            addToast({
                title: "Success",
                type: "success",
                message: "Client deleted.",
            });
            fetchClients();
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        }
    };

    const handleEdit = (client: any) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedClient(null);
        setIsModalOpen(true);
    };

    const columns = [
        {
            header: "Name",
            accessor: (row: any) => (
                <div className="flex flex-col">
                    <span className="font-bold text-secondary-900">
                        {row.name}
                    </span>
                    <span className="text-xs text-secondary-500">
                        {row.gstin || "No GSTIN"}
                    </span>
                </div>
            ),
        },
        { header: "Email", accessor: "email" },
        { header: "Phone", accessor: "phone" },
        {
            header: "Added On",
            accessor: (row: any) => formatDate(row.created_at),
        },
        {
            header: "Actions",
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-error-600 hover:text-error-700 hover:bg-error-50"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleClientSuccess = (client?: any) => {
        if (client) {
            // Optimistic update
            if (selectedClient) {
                // Edit mode: Update existing client
                setClients(prev => prev.map(c => c.id === client.id ? client : c));
            } else {
                // Add mode: Prepend new client
                setClients(prev => [client, ...prev]);
                setTotalCount(prev => prev + 1);
            }
        } else {
            // Fallback to full fetch if no client data returned (legacy)
            fetchClients();
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Clients"
                description="Manage your customer directory and GST details."
                action={
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={fetchClients} title="Refresh List">
                            🔄
                        </Button>
                        <Button onClick={handleAddNew} leftIcon={<span>➕</span>}>
                            Add Client
                        </Button>
                    </div>
                }
            />

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
                <div className="w-full md:w-96">
                    <Input
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset to first page on search
                        }}
                        leftIcon={<span>🔍</span>}
                    />
                </div>
                <div className="text-sm text-secondary-500 font-medium">
                    Showing {clients.length} of {totalCount} clients
                </div>
            </div>

            <Table headers={["Name", "Email", "Phone", "Added On", "Actions"]}>
                {clients.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-secondary-500">
                            {loading ? "Loading..." : "No clients found. Click 'Add Client' to create your first one."}
                        </td>
                    </tr>
                ) : (
                    clients.map((client) => (
                        <tr key={client.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                            <td className="p-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-secondary-900">
                                        {client.name}
                                    </span>
                                    <span className="text-xs text-secondary-500">
                                        {client.gstin || "No GSTIN"}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4">{client.email}</td>
                            <td className="p-4">{client.phone}</td>
                            <td className="p-4">{formatDate(client.created_at)}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(client)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-error-600 hover:text-error-700 hover:bg-error-50"
                                        onClick={() => handleDelete(client.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </Table>

            {/* Pagination Controls */}
            {totalCount > pageSize && (
                <div className="flex justify-center gap-2 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center px-4 text-sm font-medium">
                        Page {page} of {Math.ceil(totalCount / pageSize)}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= Math.ceil(totalCount / pageSize)}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleClientSuccess}
                client={selectedClient}
            />
        </div>
    );
}
