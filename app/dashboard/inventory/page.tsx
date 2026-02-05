"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import ProductModal from "@/components/inventory/ProductModal";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";

export default function InventoryPage() {
    const supabase = createClientSideClient();
    const { orgId } = useAuth();
    const { addToast } = useToast();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProducts = async () => {
        if (!orgId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            let query = supabase
                .from("products")
                .select("*")
                .eq("org_id", orgId)
                .order("name");
            
            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
            }

            const { data, error } = await query;
            if (error) throw error;
            setProducts(data || []);
        } catch (error: any) {
            console.error("Error fetching products:", error);
            // Don't show error on first load if table doesn't exist yet
            if (!error.message.includes("relation \"public.products\" does not exist")) {
                 addToast({
                    title: "Error",
                    type: "error",
                    message: "Failed to load inventory.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [orgId, searchQuery]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        
        try {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);
            
            if (error) throw error;
            
            addToast({
                title: "Success",
                type: "success",
                message: "Product deleted",
            });
            fetchProducts();
        } catch (error: any) {
             addToast({
                title: "Error",
                type: "error",
                message: error.message,
            });
        }
    };

    return (
        <div className="container-wide pb-20">
            <PageHeader
                title="Inventory & Products"
                description="Manage your products, services, and stock."
                action={
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (!orgId) return;
                                const url = `${window.location.origin}/store/${orgId}`;
                                navigator.clipboard.writeText(url);
                                addToast({
                                    title: "Copied!",
                                    message: "Store link copied to clipboard.",
                                    type: "success",
                                });
                            }}
                        >
                            🔗 Share Store Link
                        </Button>
                        <Button
                            onClick={() => {
                                setProductToEdit(null);
                                setIsModalOpen(true);
                            }}
                        >
                            + Add Product
                        </Button>
                    </div>
                }
            />

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table headers={["Name", "Price", "Stock", "GST", "Actions"]}>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-secondary-500">
                                    {loading ? "Loading..." : "No products found. Add your first product!"}
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                                    <td className="p-4">
                                        <div className="font-medium text-secondary-900">
                                            {product.name}
                                        </div>
                                        {product.description && (
                                            <div className="text-xs text-secondary-500 truncate max-w-xs">
                                                {product.description}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium">
                                        {formatCurrency(product.price)}
                                        <span className="text-xs text-secondary-500 font-normal"> / {product.unit}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            product.stock_quantity < 5 
                                            ? "bg-red-100 text-red-700" 
                                            : "bg-green-100 text-green-700"
                                        }`}>
                                            {product.stock_quantity} {product.unit}
                                        </span>
                                    </td>
                                    <td className="p-4 text-secondary-600">
                                        {product.gst_rate}%
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => {
                                                    setProductToEdit(product);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </Table>
                </CardContent>
            </Card>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchProducts}
                productToEdit={productToEdit}
            />
        </div>
    );
}
