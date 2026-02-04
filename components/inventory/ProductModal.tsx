"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    productToEdit?: any;
}

export default function ProductModal({
    isOpen,
    onClose,
    onSuccess,
    productToEdit,
}: ProductModalProps) {
    const supabase = createClientSideClient();
    const { orgId } = useAuth();
    const { addToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        unit: "pcs",
        gst_rate: "0",
        stock_quantity: "0",
        description: "",
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                price: productToEdit.price,
                unit: productToEdit.unit || "pcs",
                gst_rate: productToEdit.gst_rate || "0",
                stock_quantity: productToEdit.stock_quantity || "0",
                description: productToEdit.description || "",
            });
        } else {
            setFormData({
                name: "",
                price: "",
                unit: "pcs",
                gst_rate: "0",
                stock_quantity: "0",
                description: "",
            });
        }
    }, [productToEdit, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orgId) return;

        setLoading(true);
        try {
            const payload = {
                org_id: orgId,
                name: formData.name,
                price: parseFloat(formData.price) || 0,
                unit: formData.unit,
                gst_rate: parseFloat(formData.gst_rate) || 0,
                stock_quantity: parseFloat(formData.stock_quantity) || 0,
                description: formData.description,
            };

            if (productToEdit) {
                const { error } = await supabase
                    .from("products")
                    .update(payload)
                    .eq("id", productToEdit.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("products")
                    .insert(payload);
                if (error) throw error;
            }

            addToast({
                title: "Success",
                type: "success",
                message: `Product ${productToEdit ? "updated" : "added"} successfully`,
            });
            onSuccess();
            onClose();
        } catch (error: any) {
            addToast({
                title: "Error",
                type: "error",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={productToEdit ? "Edit Product" : "Add New Product"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Milk 1L"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Price (₹)"
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })}
                        required
                        placeholder="0.00"
                    />
                    <Select
                        label="Unit"
                        value={formData.unit}
                        onChange={(e) =>
                            setFormData({ ...formData, unit: e.target.value })}
                        options={[
                            { label: "Pieces (pcs)", value: "pcs" },
                            { label: "Kilograms (kg)", value: "kg" },
                            { label: "Liters (L)", value: "L" },
                            { label: "Meters (m)", value: "m" },
                            { label: "Box", value: "box" },
                            { label: "Hours", value: "hrs" },
                        ]}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Stock Quantity"
                        type="number"
                        value={formData.stock_quantity}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock_quantity: e.target.value,
                            })}
                        placeholder="0"
                    />
                    <Select
                        label="GST Rate"
                        value={formData.gst_rate}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                gst_rate: e.target.value,
                            })}
                        options={[
                            { label: "None (0%)", value: "0" },
                            { label: "5%", value: "5" },
                            { label: "12%", value: "12" },
                            { label: "18%", value: "18" },
                            { label: "28%", value: "28" },
                        ]}
                    />
                </div>

                <Input
                    label="Description (Optional)"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product details..."
                />

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {productToEdit ? "Save Changes" : "Add Product"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
