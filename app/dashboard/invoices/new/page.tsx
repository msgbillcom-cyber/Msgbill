"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card, {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import InvoiceFormGST from "@/components/invoice/InvoiceFormGST";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import { LIMITS } from "@/lib/limits";
import { calculateInvoiceGST } from "@/lib/gst";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import ClientModal from "@/components/dashboard/ClientModal";

interface InvoiceItem {
    id: string;
    productId?: string;
    description: string;
    quantity: number;
    rate: number;
    tax_percent: number;
}

export default function NewInvoicePage() {
    const { user, profile } = useAuth();
    const supabase = createClientSideClient();
    const router = useRouter();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);

    // Invoice state
    const [clientId, setClientId] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [issueDate, setIssueDate] = useState(
        new Date().toISOString().split("T")[0],
    );
    const [dueDate, setDueDate] = useState("");
    const [isGstEnabled, setIsGstEnabled] = useState(true);
    const [businessState, setBusinessState] = useState("");
    const [businessGstin, setBusinessGstin] = useState("");
    const [clientState, setClientState] = useState("");
    const [clientGstin, setClientGstin] = useState("");
    const [items, setItems] = useState<InvoiceItem[]>([
        {
            id: "item-1",
            description: "",
            quantity: 1,
            rate: 0,
            tax_percent: 18,
        },
    ]);

    // Fetch clients and check limits
    useEffect(() => {
        // Fetch next invoice number
        const fetchNextInvoiceNumber = async (orgId: string) => {
            try {
                const { data, error } = await supabase.rpc('get_next_invoice_number', {
                    org_uuid: orgId
                });
                
                if (!error && data) {
                    setInvoiceNumber(data);
                } else {
                    console.error("RPC Error or No Data:", error);
                    // Fallback to timestamp if RPC fails
                    setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
                }
            } catch (err) {
                console.error("Failed to fetch invoice number:", err);
                setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
            }
        };

        const checkUsageAndFetch = async () => {
            if (!user) return; // Need user at minimum

            setLoading(true);
            try {
                // 0. Resolve Org ID (Robust Fallback)
                let orgId = profile?.org_id;
                if (!orgId) {
                    const { data: member } = await supabase
                        .from('organization_members')
                        .select('org_id')
                        .eq('user_id', user.id)
                        .single();
                    if (member) orgId = member.org_id;
                }

                if (!orgId) {
                    // Fallback to legacy invoice number if no org found
                     setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
                     setLoading(false);
                     return;
                }

                // 0. Fetch Invoice Number
                await fetchNextInvoiceNumber(orgId);

                // 1. Check Invoice Count
                const { count, error: countError } = await supabase
                    .from("invoices")
                    .select("*", { count: "exact", head: true })
                    .eq("org_id", orgId);

                // 2. Fetch Clients
                const { data, error } = await supabase
                    .from("clients")
                    .select("id, name, billing_state, gstin")
                    .eq("org_id", orgId)
                    .order("name");
                if (!error) setClients(data || []);

                // 2.1 Fetch Products
                const { data: prodData } = await supabase
                    .from("products")
                    .select("*")
                    .eq("org_id", orgId)
                    .order("name");
                if (prodData) setProducts(prodData);

                // 3. Pre-fill business details from profile/org
                // Priority: Org Table > Profile Table
                const { data: org } = await supabase
                    .from("organizations")
                    .select("state, gstin, subscription_tier")
                    .eq("id", orgId)
                    .single();
                
                if (org) {
                    if (org.state) setBusinessState(org.state);
                    if (org.gstin) setBusinessGstin(org.gstin);
                    
                    // Check Limits with Plan
                    const plan = org.subscription_tier?.toUpperCase() || 'FREE';
                    // @ts-ignore
                    const limit = LIMITS[plan]?.invoicesTotal || LIMITS.FREE.invoicesTotal;
                    
                    if (count !== null && count >= limit) {
                        setIsLimitReached(true);
                        setShowUpgrade(true);
                    } else {
                        // Reset if within limits (in case previously set)
                        setIsLimitReached(false);
                        setShowUpgrade(false);
                    }
                } else if (profile) {
                    // Fallback to profile if org fetch failed
                    if (profile.state) setBusinessState(profile.state);
                    if (profile.gstin) setBusinessGstin(profile.gstin);
                }
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            } finally {
                setLoading(false);
            }
        };
        checkUsageAndFetch();

        // Auto-generate invoice number (simple timestamp for now)
        // Removed as we fetch it via RPC now
        // setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);

        // Set default due date (30 days from now)
        const today = new Date();
        today.setDate(today.getDate() + 30);
        setDueDate(today.toISOString().split("T")[0]);
    }, [profile, supabase]);

    // Calculations
    const totals = useMemo(() => {
        if (!isGstEnabled) {
            const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
            return {
                subtotal,
                taxTotal: 0,
                grandTotal: subtotal,
                cgst: 0,
                sgst: 0,
                igst: 0,
            };
        }

        const gstResult = calculateInvoiceGST(
            items.map(i => ({ ...i, taxRate: i.tax_percent })),
            businessState,
            clientState
        );

        return {
            subtotal: gstResult.subtotal,
            taxTotal: gstResult.totalTax,
            grandTotal: gstResult.grandTotal,
            cgst: gstResult.cgst,
            sgst: gstResult.sgst,
            igst: gstResult.igst,
        };
    }, [items, isGstEnabled, businessState, clientState]);

    const addItem = () => {
        setItems([...items, {
            id: Math.random().toString(36).substr(2, 9),
            description: "",
            quantity: 1,
            rate: 0,
            tax_percent: 18,
        }]);
    };

    const removeItem = (id: string) => {
        if (items.length === 1) return;
        setItems(items.filter((i) => i.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems(items.map((i) => i.id === id ? { ...i, [field]: value } : i));
    };

    const addProductItem = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        setItems([
            ...items,
            {
                id: Math.random().toString(36).substr(2, 9),
                productId: product.id,
                description: product.name,
                quantity: 1,
                rate: product.price,
                tax_percent: product.gst_rate || 0,
            },
        ]);
    };

    const handleClientSuccess = (client: any) => {
        if (client) {
            // Add new client to the list
            setClients(prev => [...prev, client]);
            
            // Auto-select the new client
            setClientId(client.id);
            if (client.billing_state) setClientState(client.billing_state);
            if (client.gstin) setClientGstin(client.gstin);
            
            addToast({
                title: "Client Added",
                type: "success",
                message: `${client.name} has been selected.`
            });
        }
        setIsClientModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLimitReached) {
            setShowUpgrade(true);
            return;
        }
        if (!profile || !profile.org_id) {
            return addToast({
                title: "Error",
                type: "error",
                message: "Your business profile is not loaded. Please refresh the page or complete onboarding before creating invoices.",
            });
        }
        if (!clientId) {
            return addToast({
                title: "Error",
                type: "error",
                message: "Please select a client.",
            });
        }
        if (items.some((i) => !i.description || i.quantity <= 0 || i.rate < 0)) {
            return addToast({
                title: "Error",
                type: "error",
                message: "Please fill all item details (quantity must be > 0 and rate cannot be negative).",
            });
        }

        setLoading(true);
        try {
            // 1. Create Invoice
            const { data: invoice, error: invError } = await supabase
                .from("invoices")
                .insert({
                    org_id: profile.org_id,
                    client_id: clientId,
                    invoice_number: invoiceNumber,
                    issue_date: issueDate,
                    due_date: dueDate,
                    status: "draft",
                    is_gst_invoice: isGstEnabled,
                    subtotal: totals.subtotal,
                    tax_total: totals.taxTotal,
                    grand_total: totals.grandTotal,
                    cgst_amount: totals.cgst,
                    sgst_amount: totals.sgst,
                    igst_amount: totals.igst,
                    place_of_supply: clientState,
                })
                .select()
                .single();

            if (invError) throw invError;

            // 2. Create Items
            const invoiceItems = items.map(({ id, productId, ...rest }) => ({
                invoice_id: invoice.id,
                ...rest,
            }));

            const { error: itemsError } = await supabase
                .from("invoice_items")
                .insert(invoiceItems);

            if (itemsError) throw itemsError;

            // 3. Deduct Stock (if item is a product)
            // We await this to ensure it completes before navigation
            const productItems = items.filter(i => i.productId && i.quantity > 0);
            if (productItems.length > 0) {
                try {
                    await fetch('/api/inventory/deduct', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            items: productItems.map(i => ({
                                productId: i.productId,
                                quantity: i.quantity
                            }))
                        })
                    });
                } catch (err) {
                    console.error("Failed to deduct stock:", err);
                    // Continue even if stock deduction fails
                }
            }

            addToast({
                title: "Success",
                type: "success",
                message: "Invoice created successfully!",
            });
            router.push("/dashboard/invoices");
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <PageHeader
                title="Create New Invoice"
                description="Fill in the details to generate a professional invoice."
            />

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex gap-2 items-end">
                                        <div className="flex-1">
                                            <Select
                                                label="Select Client"
                                                value={clientId}
                                                onChange={(
                                                    e: React.ChangeEvent<
                                                        HTMLSelectElement
                                                    >,
                                                ) => {
                                                    const id = e.target.value;
                                                    setClientId(id);
                                                    const client = clients.find(c => c.id === id);
                                                    if (client) {
                                                        if (client.billing_state) setClientState(client.billing_state);
                                                        if (client.gstin) setClientGstin(client.gstin);
                                                    }
                                                }}
                                                options={clients.map((c) => ({
                                                    label: c.name,
                                                    value: c.id,
                                                }))}
                                                placeholder="Choose a client..."
                                                required
                                            />
                                        </div>
                                        <Button 
                                            type="button" 
                                            variant="secondary" 
                                            className="mb-[2px] h-[42px] px-3"
                                            onClick={() => setIsClientModalOpen(true)}
                                            title="Create New Client"
                                        >
                                            ➕
                                        </Button>
                                    </div>
                                    <Input
                                        label="Invoice Number"
                                        value={invoiceNumber}
                                        onChange={(
                                            e: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => setInvoiceNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        type="date"
                                        label="Issue Date"
                                        value={issueDate}
                                        onChange={(
                                            e: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => setIssueDate(e.target.value)}
                                        required
                                    />
                                    <Input
                                        type="date"
                                        label="Due Date"
                                        value={dueDate}
                                        onChange={(
                                            e: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => setDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <InvoiceFormGST
                            isGstEnabled={isGstEnabled}
                            onGstToggle={setIsGstEnabled}
                            businessState={businessState}
                            onBusinessStateChange={setBusinessState}
                            businessGstin={businessGstin}
                            onBusinessGstinChange={setBusinessGstin}
                            clientState={clientState}
                            onClientStateChange={setClientState}
                            clientGstin={clientGstin}
                            onClientGstinChange={setClientGstin}
                        />

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                                <CardTitle>Line Items</CardTitle>
                                <div className="flex items-center gap-4">
                                    {products.length > 0 && (
                                        <div className="w-64">
                                            <Select
                                                value=""
                                                onChange={(e) => {
                                                    if (e.target.value) addProductItem(e.target.value);
                                                }}
                                                options={[
                                                    { label: "Select Product to Add...", value: "" },
                                                    ...products.map(p => ({ 
                                                        label: `${p.name} (₹${p.price})`, 
                                                        value: p.id 
                                                    }))
                                                ]}
                                            />
                                        </div>
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addItem}
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="grid grid-cols-12 gap-3 items-end group"
                                        >
                                            <div className="col-span-12 md:col-span-5">
                                                {index === 0 && (
                                                    <label className="text-xs font-medium text-secondary-500 mb-1 block">
                                                        Description
                                                    </label>
                                                )}
                                                <Input
                                                    placeholder="Item name or service"
                                                    value={item.description}
                                                    onChange={(
                                                        e: React.ChangeEvent<
                                                            HTMLInputElement
                                                        >,
                                                    ) => updateItem(
                                                        item.id,
                                                        "description",
                                                        e.target.value,
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-4 md:col-span-2">
                                                {index === 0 && (
                                                    <label className="text-xs font-medium text-secondary-500 mb-1 block">
                                                        Qty
                                                    </label>
                                                )}
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(
                                                        e: React.ChangeEvent<
                                                            HTMLInputElement
                                                        >,
                                                    ) => updateItem(
                                                        item.id,
                                                        "quantity",
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-4 md:col-span-2">
                                                {index === 0 && (
                                                    <label className="text-xs font-medium text-secondary-500 mb-1 block">
                                                        Rate
                                                    </label>
                                                )}
                                                <Input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(
                                                        e: React.ChangeEvent<
                                                            HTMLInputElement
                                                        >,
                                                    ) => updateItem(
                                                        item.id,
                                                        "rate",
                                                        parseFloat(
                                                            e.target.value,
                                                        ) || 0,
                                                    )}
                                                />
                                            </div>
                                            {isGstEnabled && (
                                                <div className="col-span-4 md:col-span-2">
                                                    {index === 0 && (
                                                        <label className="text-xs font-medium text-secondary-500 mb-1 block">
                                                            Tax %
                                                        </label>
                                                    )}
                                                    <Select
                                                        value={item.tax_percent
                                                            .toString()}
                                                        onChange={(
                                                            e: React.ChangeEvent<
                                                                HTMLSelectElement
                                                            >,
                                                        ) => updateItem(
                                                            item.id,
                                                            "tax_percent",
                                                            parseInt(
                                                                e.target
                                                                    .value,
                                                            ),
                                                        )}
                                                        options={[
                                                            {
                                                                label: "0%",
                                                                value: "0",
                                                            },
                                                            {
                                                                label: "5%",
                                                                value: "5",
                                                            },
                                                            {
                                                                label: "12%",
                                                                value: "12",
                                                            },
                                                            {
                                                                label: "18%",
                                                                value: "18",
                                                            },
                                                            {
                                                                label: "28%",
                                                                value: "28",
                                                            },
                                                        ]}
                                                    />
                                                </div>
                                            )}
                                            <div className="col-span-1 border-none pb-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(item.id)}
                                                    className="text-secondary-400 hover:text-error-600 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Remove Item"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Totals Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-secondary-50 border-secondary-200 sticky top-24">
                            <CardHeader>
                                <CardTitle>Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-secondary-600">
                                        Subtotal
                                    </span>
                                    <span className="font-semibold">
                                        {formatCurrency(totals.subtotal)}
                                    </span>
                                </div>
                                {isGstEnabled && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary-600">
                                            GST Total
                                        </span>
                                        <span className="font-semibold text-primary-600">
                                            +{formatCurrency(totals.taxTotal)}
                                        </span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-secondary-200 flex justify-between items-center">
                                    <span className="text-lg font-bold text-secondary-900">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-black text-primary-600">
                                        {formatCurrency(totals.grandTotal)}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-3">
                                <Button
                                    type="submit"
                                    fullWidth
                                    isLoading={loading}
                                    size="lg"
                                >
                                    Save Invoice
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    fullWidth
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>

            <UpgradeModal
                isOpen={showUpgrade}
                onClose={() => {
                    setShowUpgrade(false);
                    if (isLimitReached) router.push("/dashboard/invoices");
                }}
            />

            <ClientModal
                isOpen={isClientModalOpen}
                onClose={() => setIsClientModalOpen(false)}
                onSuccess={handleClientSuccess}
            />
        </div>
    );
}
