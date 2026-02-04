"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { LIMITS } from "@/lib/limits";

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    client?: any; // If provided, we are in Edit mode
}

const ClientModal: React.FC<ClientModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    client,
}) => {
    const { profile, user } = useAuth();
    const supabase = createClientSideClient();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [checkingLimit, setCheckingLimit] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gstin: "",
    });

    useEffect(() => {
        const checkLimits = async () => {
            if (isOpen && !client && profile?.org_id) {
                setCheckingLimit(true);
                try {
                    // 1. Get Organization for Subscription Tier
                    const { data: org } = await supabase
                        .from("organizations")
                        .select("subscription_tier")
                        .eq("id", profile.org_id)
                        .single();

                    // 2. Get Client Count
                    const { count } = await supabase
                        .from("clients")
                        .select("*", { count: "exact", head: true })
                        .eq("org_id", profile.org_id);

                    const plan = org?.subscription_tier?.toUpperCase() || 'FREE';
                    // @ts-ignore
                    const limit = LIMITS[plan]?.clientsMax || LIMITS.FREE.clientsMax;

                    if (count !== null && count >= limit) {
                        setIsLimitReached(true);
                    } else {
                        setIsLimitReached(false);
                    }
                } catch (error) {
                    console.error("Error checking limits:", error);
                } finally {
                    setCheckingLimit(false);
                }
            } else {
                setIsLimitReached(false);
            }
        };

        checkLimits();
    }, [isOpen, client, profile?.org_id, supabase]);

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || "",
                email: client.email || "",
                phone: client.phone || "",
                address: client.address || "",
                gstin: client.gstin || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                gstin: "",
            });
        }
    }, [client, isOpen]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e?: React.SyntheticEvent) => {
        e?.preventDefault();

        let orgId: string | null = client?.org_id ?? profile?.org_id ?? null;
        if (!orgId && user?.id) {
            const { data, error } = await supabase
                .from("profiles")
                .select("org_id")
                .eq("id", user.id)
                .single();
            if (error) {
                console.error("Error fetching profile org_id:", error);
            }
            if (!error) orgId = data?.org_id ?? null;
        }

        if (!orgId) {
            console.error("No organization ID found for user");
            addToast({
                title: "Error",
                type: "error",
                message: "No organization found. Please complete onboarding.",
            });
            return;
        }

        setLoading(true);
        try {
            // Get current session token for API authentication
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                throw new Error("No active session");
            }

            if (client) {
                // Update via API (Bypassing RLS)
                console.log("Updating existing client via API:", client.id);
                const response = await fetch("/api/clients", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: client.id,
                        ...formData,
                    }),
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error || "Failed to update client");

                addToast({
                    title: "Success",
                    type: "success",
                    message: "Client updated successfully.",
                });
            } else {
                // Create via API (Bypassing RLS)
                console.log("Inserting new client via API...");
                const response = await fetch("/api/clients", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        org_id: orgId,
                        ...formData,
                    }),
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error || "Failed to create client");

                addToast({
                    title: "Success",
                    type: "success",
                    message: "Client added successfully.",
                });
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Client submission error:", error);
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={client ? "Edit Client" : "Add New Client"}
            description={!isLimitReached ? (client
                ? "Update client details below."
                : "Enter the client details to create a new record.") : undefined}
            footer={!isLimitReached ? (
                <>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="client-form"
                        isLoading={loading}
                    >
                        {client ? "Save Changes" : "Add Client"}
                    </Button>
                </>
            ) : undefined}
        >
            {isLimitReached && !client ? (
                <div className="text-center py-6">
                    <div className="mb-4 text-amber-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Client Limit Reached
                    </h3>
                    <p className="text-gray-500 mb-6">
                        You have reached the maximum number of clients for your current plan.
                        Upgrade to Pro for unlimited clients.
                    </p>
                    <div className="flex justify-center gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Link href="/dashboard/settings/billing">
                            <Button>Upgrade Plan</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <form id="client-form" onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="name"
                        label="Client Name"
                        placeholder="Acme Corp or John Doe"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="client@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="phone"
                        label="Phone Number"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <Input
                    name="gstin"
                    label="GSTIN (Optional)"
                    placeholder="22AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={handleInputChange}
                />
                <Textarea
                    name="address"
                    label="Address"
                    placeholder="Billing address of the client"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                </form>
            )}
        </Modal>
    );
};

export default ClientModal;
