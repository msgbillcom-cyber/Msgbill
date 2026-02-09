"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { LIMITS } from "@/lib/limits";
import { useAuth } from "@/components/auth/AuthProvider";
import Image from "next/image";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

export default function UpgradeModal({
    isOpen,
    onClose,
    title = "Unlock Unlimited Invoices",
    description =
        `You've reached the ${LIMITS.FREE.invoicesTotal}-invoice limit on your Free Plan. Upgrade to Pro to continue growing your business.`,
}: UpgradeModalProps) {
    const { profile, user, orgId, loading: authLoading, refreshProfile } = useAuth();
    const [showPayment, setShowPayment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRazorpayPayment = async () => {
        setLoading(true);
        setError("");
        try {
            let organizationId = profile?.org_id || orgId;

            // If orgId is missing, try to refresh profile once
            if (!organizationId) {
                console.log("Org ID missing, refreshing profile...");
                const updatedProfile = await refreshProfile();
                if (updatedProfile?.org_id) {
                    organizationId = updatedProfile.org_id;
                } else if (updatedProfile?.organization_members?.[0]?.org_id) {
                    organizationId = updatedProfile.organization_members[0].org_id;
                }
            }

            if (!organizationId) {
                throw new Error("Organization ID is missing. Please refresh the page or contact support.");
            }

            const response = await fetch('/api/payments/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orgId: organizationId,
                    userEmail: profile?.email || user?.email,
                    userName: profile?.full_name,
                    userPhone: profile?.phone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create payment link');
            }

            const data = await response.json();
            if (data.paymentLink && data.paymentLink.short_url) {
                // Redirect to Razorpay Payment Link
                window.location.href = data.paymentLink.short_url;
            } else {
                throw new Error('Invalid payment link received');
            }
        } catch (err: any) {
            console.error('Payment error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <div className="p-6 text-center">
                {!showPayment ? (
                    <>
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 animate-bounce">
                            🚀
                        </div>
                        <h3 className="text-2xl font-black text-secondary-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-secondary-500 mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="space-y-4 mb-8 text-left bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
                                <div className="text-[10px] font-bold uppercase text-secondary-400">Feature</div>
                                <div className="text-[10px] font-bold uppercase text-secondary-400 text-right">Pro Plan</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-secondary-700">Invoices</span>
                                <span className="text-sm font-bold text-primary-600">Unlimited</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-secondary-700">GST Reports</span>
                                <span className="text-sm font-bold text-primary-600 font-mono">Full Access</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-secondary-700">WhatsApp Reminders</span>
                                <span className="text-sm font-bold text-primary-600">Automatic</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-secondary-700">Custom Branding</span>
                                <span className="text-sm font-bold text-primary-600">Included</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                size="lg"
                                fullWidth
                                className="shadow-glow font-bold bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                                onClick={() => setShowPayment(true)}
                            >
                                Upgrade to Pro (₹499/month)
                            </Button>
                            <Button variant="ghost" fullWidth onClick={onClose}>
                                Maybe Later
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="animate-fade-in">
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                            💳
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">
                            Pay Securely via Razorpay
                        </h3>
                        <p className="text-secondary-500 text-sm mb-6">
                            You will be redirected to a secure payment page.
                        </p>

                        <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-secondary-600 font-medium">Plan</span>
                                <span className="font-bold text-secondary-900">MsgBill Pro (Monthly)</span>
                            </div>
                            <div className="flex justify-between items-center text-xl">
                                <span className="text-secondary-600 font-medium">Total</span>
                                <span className="font-black text-primary-600">₹499.00</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Button
                                size="lg"
                                fullWidth
                                className="shadow-glow font-bold bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white"
                                onClick={handleRazorpayPayment}
                                isLoading={loading}
                            >
                                Proceed to Payment
                            </Button>
                            <Button variant="ghost" fullWidth onClick={() => setShowPayment(false)} disabled={loading}>
                                Back
                            </Button>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-secondary-400 opacity-75">
                           <span className="text-[10px] font-medium uppercase tracking-widest">Secured by Razorpay</span>
                        </div>
                    </div>
                )}

                <p className="text-[10px] text-secondary-400 mt-6">
                    100% Secure Payment. 14-day money-back guarantee.
                </p>
            </div>
        </Modal>
    );
}
