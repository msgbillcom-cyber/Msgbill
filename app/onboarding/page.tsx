"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import PageHeader from "@/components/layout/PageHeader";
import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { StateSelect } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

export default function OnboardingPage() {
    const { user, refreshProfile, loading: authLoading } = useAuth();
    const supabase = createClientSideClient();
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        company_name: "",
        address: "",
        gstin: "",
        state: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        upi_id: "",
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [qrPreview, setQrPreview] = useState<string | null>(null);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-50">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setQrFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.error("Onboarding submission failed: No user session found");
            addToast({ title: "Error", type: "error", message: "You must be signed in to complete onboarding." });
            return;
        }

        setLoading(true);
        console.log("Starting onboarding submission for:", user.email);
        
        try {
            let logo_url = null;
            let upi_qr_url = null;

            // 0. Upload Logo if present
            if (logoFile) {
                console.log("Uploading logo...");
                const fileExt = logoFile.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `logos/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("assets")
                    .upload(filePath, logoFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("assets")
                    .getPublicUrl(filePath);
                
                logo_url = publicUrl;
            }

            // 0.1 Upload QR if present
            if (qrFile) {
                console.log("Uploading QR...");
                const fileExt = qrFile.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `qrs/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("assets")
                    .upload(filePath, qrFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("assets")
                    .getPublicUrl(filePath);
                
                upi_qr_url = publicUrl;
            }

            console.log("Fetching fresh session token...");
            const { data: sessionData, error: sessionError } =
                await supabase.auth.getSession();
            if (sessionError || !sessionData.session) {
                throw new Error("Session expired. Please sign in again.");
            }

            console.log("Calling onboarding API...");
            const response = await fetch("/api/onboarding/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionData.session.access_token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    logo_url,
                    upi_qr_url,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                console.error("Onboarding API error:", result.error);
                throw new Error(result.error || "Setup failed");
            }

            console.log("Onboarding API success, refreshing local profile...");
            addToast({
                title: "Welcome!",
                type: "success",
                message: "Your business organization has been set up.",
            });
            
            // Small delay to ensure DB consistency
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Refresh profile with a timeout to avoid hanging the redirect
            const refreshPromise = refreshProfile();
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ onboarded: true }), 3000));
            
            const updatedProfile = await Promise.race([refreshPromise, timeoutPromise]) as any;
            console.log("Profile refresh finished or timed out:", updatedProfile);
            
            // Proactive redirect: We know the API succeeded, so we can move to the dashboard
            console.log("Redirecting to dashboard/overview...");
            router.push("/dashboard/overview");
            
            // Failsafe redirect after 2 seconds if router.push hangs
            setTimeout(() => {
                console.log("Failsafe redirect triggered");
                window.location.href = "/dashboard/overview";
            }, 2000);

        } catch (error: any) {
            console.error("Onboarding submission error:", error);
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-8">
                    <Image 
                        src="/logo-final.png" 
                        alt="MsgBill" 
                        width={300} 
                        height={120} 
                        className="h-24 w-auto object-contain"
                    />
                </div>
                <PageHeader
                    title="Welcome to MsgBill"
                    description="Let's set up your business profile to get you started with professional invoices."
                />

                <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                        {/* Business Details */}
                        <Card shadow-lg>
                            <CardHeader>
                                <CardTitle>Business Details</CardTitle>
                                <CardDescription>
                                    These details will appear on your invoices.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-secondary-200 rounded-2xl bg-secondary-50/50 hover:bg-secondary-50 transition-colors group relative overflow-hidden">
                                    {logoPreview ? (
                                        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md">
                                            <img 
                                                src={logoPreview} 
                                                alt="Logo Preview" 
                                                className="w-full h-full object-contain bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <span className="text-white text-xs font-bold bg-error-600 px-2 py-1 rounded">Remove</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl">
                                                🖼️
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-secondary-900">Upload Business Logo</p>
                                                <p className="text-xs text-secondary-500">PNG, JPG up to 2MB</p>
                                                <p className="text-xs text-primary-600 mt-1 font-medium">Ideally your company logo so customers remember you</p>
                                            </div>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <Input
                                    name="company_name"
                                    label="Company Name"
                                    placeholder="Acme Corp"
                                    required
                                    value={formData.company_name}
                                    onChange={handleInputChange}
                                />
                                <Textarea
                                    name="address"
                                    label="Business Address"
                                    placeholder="123 Business Park, City, PIN"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <StateSelect
                                        name="state"
                                        label="Business State"
                                        required
                                        value={formData.state}
                                        onChange={handleSelectChange}
                                    />
                                    <Input
                                        name="gstin"
                                        label="GSTIN (Optional)"
                                        placeholder="22AAAAA0000A1Z5"
                                        value={formData.gstin}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bank Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bank Details</CardTitle>
                                <CardDescription>
                                    Where do you want to receive payments?
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    name="bank_name"
                                    label="Bank Name"
                                    placeholder="HDFC Bank"
                                    required
                                    value={formData.bank_name}
                                    onChange={handleInputChange}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        name="account_number"
                                        label="Account Number"
                                        placeholder="501000..."
                                        required
                                        value={formData.account_number}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="ifsc_code"
                                        label="IFSC Code"
                                        placeholder="HDFC0001234"
                                        required
                                        value={formData.ifsc_code}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pt-4 border-t border-secondary-100">
                                    <label className="text-sm font-bold text-secondary-900 mb-2 block">
                                        Instant UPI Setup (Recommended ⚡️)
                                    </label>
                                    <p className="text-xs text-secondary-500 mb-4">
                                        Get paid directly to your bank account with 0% fees and 0 waiting time.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        <Input
                                            name="upi_id"
                                            label="Your UPI ID"
                                            placeholder="business@okicici"
                                            value={formData.upi_id}
                                            onChange={handleInputChange}
                                            helperText="e.g. GPay, PhonePe, or Paytm ID"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-medium text-secondary-500">Upload UPI QR Code</label>
                                            <div className="relative border-2 border-dashed border-primary-200 rounded-xl p-4 bg-primary-50/30 hover:bg-primary-50 transition-colors group text-center">
                                                {qrPreview ? (
                                                    <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden shadow-sm bg-white">
                                                        <img src={qrPreview} alt="QR Preview" className="w-full h-full object-contain" />
                                                        <button 
                                                            type="button" 
                                                            onClick={() => { setQrFile(null); setQrPreview(null); }}
                                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <span className="text-white text-[10px] font-bold bg-error-600 px-2 py-1 rounded">Swap</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-2">
                                                        <span className="text-xl">📸</span>
                                                        <p className="text-[10px] font-bold text-primary-600 mt-1 uppercase">Click to Upload QR</p>
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleQrChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-secondary-50/50 justify-end">
                                <Button type="submit" isLoading={loading}>
                                    Complete Setup
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    );
}
