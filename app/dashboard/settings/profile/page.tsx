"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import PageHeader from "@/components/layout/PageHeader";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { StateSelect } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

export default function BusinessProfilePage() {
    const { user, profile, refreshProfile } = useAuth();
    const supabase = createClientSideClient();
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

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
    const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);
    const [currentQrUrl, setCurrentQrUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrganization = async () => {
            if (!user) {
                setFetching(false);
                return;
            }

            let orgId = profile?.org_id;

            // Fallback: If profile doesn't have org_id, try to find it in organization_members
            if (!orgId) {
                const { data: memberData } = await supabase
                    .from("organization_members")
                    .select("org_id")
                    .eq("user_id", user.id)
                    .single();
                
                if (memberData) {
                    orgId = memberData.org_id;
                }
            }

            if (orgId) {
                const { data: org, error } = await supabase
                    .from("organizations")
                    .select("*")
                    .eq("id", orgId)
                    .single();

                if (org && !error) {
                    setFormData({
                        company_name: org.name || "",
                        address: org.address || "",
                        gstin: org.gstin || "",
                        state: org.state || "",
                        bank_name: org.bank_name || "",
                        account_number: org.bank_account_number || "",
                        ifsc_code: org.bank_ifsc_code || "",
                        upi_id: org.upi_id || "",
                    });
                    if (org.logo_url) {
                        setLogoPreview(org.logo_url);
                        setCurrentLogoUrl(org.logo_url);
                    }
                    if (org.upi_qr_url) {
                        setQrPreview(org.upi_qr_url);
                        setCurrentQrUrl(org.upi_qr_url);
                    }
                }
                setFetching(false);
            } else if (profile) {
                // Fallback to profile data if org not found or not set
                 setFormData({
                    company_name: profile.company_name || "",
                    address: profile.address || "",
                    gstin: profile.gstin || "",
                    state: profile.state || "",
                    bank_name: profile.bank_name || "",
                    account_number: profile.account_number || "",
                    ifsc_code: profile.ifsc_code || "",
                    upi_id: profile.upi_id || "",
                });
                if (profile.logo_url) {
                    setLogoPreview(profile.logo_url);
                    setCurrentLogoUrl(profile.logo_url);
                }
                if (profile.upi_qr_url) {
                    setQrPreview(profile.upi_qr_url);
                    setCurrentQrUrl(profile.upi_qr_url);
                }
                setFetching(false);
            }
        };

        fetchOrganization();
    }, [profile, supabase]);

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
        if (!user) return;

        setLoading(true);
        try {
            let logo_url = currentLogoUrl;
            let upi_qr_url = currentQrUrl;

            // 0. Upload Logo if changed
            if (logoFile) {
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

            // 0.1 Upload QR if changed
            if (qrFile) {
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

            if (profile?.org_id) {
                // Try updating all fields first
                const fullUpdateData = {
                    name: formData.company_name,
                    address: formData.address,
                    gstin: formData.gstin,
                    state: formData.state,
                    bank_name: formData.bank_name,
                    bank_account_number: formData.account_number,
                    bank_ifsc_code: formData.ifsc_code,
                    upi_id: formData.upi_id,
                    logo_url,
                    upi_qr_url,
                    updated_at: new Date().toISOString(),
                };

                const { error: updateError } = await supabase
                    .from("organizations")
                    .update(fullUpdateData)
                    .eq("id", profile.org_id);

                if (updateError) {
                    // Fallback: Try updating only core fields (in case migration for new fields hasn't run)
                    console.warn("Full organization update failed, retrying with core fields...", updateError);
                    
                    const coreUpdateData = {
                        name: formData.company_name,
                        address: formData.address,
                        gstin: formData.gstin,
                        state: formData.state,
                        bank_account_number: formData.account_number,
                        bank_ifsc_code: formData.ifsc_code,
                        upi_id: formData.upi_id,
                        logo_url,
                        updated_at: new Date().toISOString(),
                    };

                     const { error: coreError } = await supabase
                        .from("organizations")
                        .update(coreUpdateData)
                        .eq("id", profile.org_id);
                    
                    if (coreError) throw coreError;

                    // If core update succeeded but full failed, warn user
                    addToast({
                        title: "Partial Success",
                        type: "warning",
                        message: "Profile updated, but QR Code or Bank Name could not be saved. Please apply latest database migrations.",
                    });
                } else {
                     addToast({
                        title: "Success",
                        type: "success",
                        message: "Business profile updated successfully.",
                    });
                }
            } else {
                 // Fallback update to profile (legacy behavior or if org_id missing)
                 // Note: This might fail if columns are missing in profiles, but we prioritizing organization update
                 const { error: updateError } = await supabase
                    .from("profiles")
                    .update({
                        ...formData,
                        logo_url,
                        upi_qr_url,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", user.id);
                 if (updateError) throw updateError;
                 
                 addToast({
                    title: "Success",
                    type: "success",
                    message: "Business profile updated successfully.",
                });
            }
            await refreshProfile();
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <PageHeader
                title="Business Profile"
                description="Manage your business details and branding."
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
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs font-medium">Change Logo</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-secondary-200 flex items-center justify-center">
                                        <span className="text-2xl">🏢</span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <p className="text-sm font-medium text-secondary-900">
                                        Business Logo
                                    </p>
                                    <p className="text-xs text-secondary-500 mt-1">
                                        Click to upload (PNG, JPG)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Company Name"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Acme Corp"
                                    required
                                />
                                <Input
                                    label="GSTIN (Optional)"
                                    name="gstin"
                                    value={formData.gstin}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 29ABCDE1234F1Z5"
                                />
                            </div>

                            <Textarea
                                label="Business Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Full business address"
                                required
                            />

                            <StateSelect
                                value={formData.state}
                                onChange={handleSelectChange}
                                error=""
                            />
                        </CardContent>
                    </Card>

                    {/* Banking Details */}
                    <Card shadow-lg>
                        <CardHeader>
                            <CardTitle>Banking Details</CardTitle>
                            <CardDescription>
                                Your bank account details for receiving payments.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Bank Name"
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. HDFC Bank"
                                    required
                                />
                                <Input
                                    label="Account Number"
                                    name="account_number"
                                    value={formData.account_number}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 1234567890"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="IFSC Code"
                                    name="ifsc_code"
                                    value={formData.ifsc_code}
                                    onChange={handleInputChange}
                                    placeholder="e.g. HDFC0001234"
                                    required
                                />
                                <Input
                                    label="UPI ID (Optional)"
                                    name="upi_id"
                                    value={formData.upi_id}
                                    onChange={handleInputChange}
                                    placeholder="e.g. business@okicici"
                                />
                            </div>
                            
                            <div className="mt-4 border-t pt-4">
                                <p className="text-sm font-medium text-secondary-700 mb-3">UPI QR Code</p>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-24 h-24 border rounded-lg bg-secondary-50 flex items-center justify-center overflow-hidden group">
                                        {qrPreview ? (
                                            <>
                                                <img 
                                                    src={qrPreview} 
                                                    alt="QR Preview" 
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-[10px] font-medium">Change</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-2xl">📱</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleQrChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="text-sm text-secondary-500">
                                        <p>Upload your UPI QR code image.</p>
                                        <p className="text-xs mt-1">This will be shown on invoices for easy payment.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full sm:w-auto"
                            isLoading={loading}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}