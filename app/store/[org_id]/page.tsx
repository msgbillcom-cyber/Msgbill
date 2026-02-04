"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";
import { Badge } from "lucide-react";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    stock_quantity: number;
}

interface Organization {
    id: string;
    name: string;
    logo_url: string;
    address: string;
    phone: string; // Assuming we might have this or similar contact info
}

interface CartItem extends Product {
    quantity: number;
}

export default function StorePage() {
    const params = useParams();
    const orgId = params.org_id as string;
    const supabase = createClientComponentClient();

    const [org, setOrg] = useState<Organization | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!orgId) return;
            setLoading(true);
            try {
                // 1. Fetch Organization Details
                const { data: orgData, error: orgError } = await supabase
                    .from("organizations")
                    .select("id, name, logo_url, address") // Fetch safe fields
                    .eq("id", orgId)
                    .single();
                
                if (orgError) throw orgError;
                setOrg(orgData as any);

                // 2. Fetch Products
                const { data: prodData, error: prodError } = await supabase
                    .from("products")
                    .select("*")
                    .eq("org_id", orgId)
                    .gt("stock_quantity", 0) // Only show in-stock items
                    .order("name");

                if (prodError) throw prodError;
                setProducts(prodData || []);

            } catch (error) {
                console.error("Error fetching store data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orgId, supabase]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (!org) return;

        // Construct WhatsApp Message
        let message = `Hi ${org.name}, I would like to place an order:\n\n`;
        cart.forEach(item => {
            message += `• ${item.name} x ${item.quantity} (${item.unit}) - ${formatCurrency(item.price * item.quantity)}\n`;
        });
        message += `\n*Total Amount: ${formatCurrency(cartTotal)}*`;
        message += `\n\nPlease confirm my order.`;

        // Encode and open WhatsApp
        // Note: Ideally we should have the org's phone number. 
        // If not in DB, we can leave the phone number blank and it will ask user to pick a contact, 
        // OR we just use a generic intent link if we don't have the specific number.
        // For now, let's assume we might not have the phone number public, 
        // but typically a "WhatsApp Store" needs a target number.
        // We'll use a placeholder or try to fetch it if available.
        
        // Use a generic link that lets user pick contact if we don't have one, 
        // OR if we had `phone` in org, we'd use it.
        // Let's assume the user will send it to the business number they know, 
        // or we can prompt the business owner to set a "WhatsApp Number" in settings later.
        
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!org) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Store Not Found</h1>
                    <p className="text-gray-600">This store does not exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {org.logo_url ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                <Image src={org.logo_url} alt={org.name} fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                {org.name.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="font-bold text-gray-900 leading-tight">{org.name}</h1>
                            <p className="text-xs text-gray-500">Powered by MsgBill</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <span className="text-2xl">🛒</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Product List */}
            <main className="max-w-3xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">No products available at the moment.</p>
                        </div>
                    ) : (
                        products.map(product => (
                            <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                        {product.description && (
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                        )}
                                        <div className="font-bold text-primary-700">
                                            {formatCurrency(product.price)}
                                            <span className="text-xs text-gray-400 font-normal ml-1">/ {product.unit}</span>
                                        </div>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant={cart.find(i => i.id === product.id) ? "secondary" : "outline"}
                                        onClick={() => addToCart(product)}
                                    >
                                        {cart.find(i => i.id === product.id) ? "Added +1" : "Add"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </main>

            {/* Cart Sheet / Bottom Bar */}
            {cart.length > 0 && (
                <div className={`fixed inset-x-0 bottom-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 z-50 ${isCartOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                    {/* Handle for mobile */}
                    <div 
                        className="h-6 flex items-center justify-center cursor-pointer md:hidden"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 pb-6 pt-2">
                        {/* Cart Header (Always visible) */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-500">{cart.length} items in cart</p>
                                <p className="text-xl font-bold text-gray-900">{formatCurrency(cartTotal)}</p>
                            </div>
                            <Button 
                                onClick={handleCheckout}
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg gap-2"
                            >
                                <span>Order on WhatsApp</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            </Button>
                        </div>

                        {/* Cart Items (Visible when expanded) */}
                        {isCartOpen && (
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">{formatCurrency(item.price)} x {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                            >
                                                -
                                            </button>
                                            <span className="font-medium w-4 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
