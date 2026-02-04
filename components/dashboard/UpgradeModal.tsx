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
    const { profile } = useAuth();
    const [showPayment, setShowPayment] = useState(false);
    
    // Admin WhatsApp for manual verification
    const ADMIN_WHATSAPP = "918665433181"; 
    const UPI_ID = "msgbill@jio"; 

    const handlePaymentVerified = () => {
        const message = `Hi, I have paid ₹499 for MsgBill Pro via UPI.\n\nMy Email: ${profile?.email}\nOrg ID: ${profile?.org_id}\n\nPlease activate my account.`;
        window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
        onClose();
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
                        <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                            📱
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">
                            Scan & Pay via UPI
                        </h3>
                        <p className="text-secondary-500 text-sm mb-6">
                            Scan the QR code or pay to the UPI ID below.
                        </p>

                        <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-dashed border-secondary-200 mb-6 inline-block shadow-sm max-w-full">
                             <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4 mx-auto">
                                <Image
                                    src="/payment/upi-qr.jpg"
                                    alt="Scan to Pay"
                                    fill
                                    className="object-contain"
                                />
                             </div>
                             <div className="flex items-center justify-between bg-secondary-50 p-3 rounded-lg border border-secondary-100">
                                <code className="text-xs sm:text-sm font-bold text-secondary-800 select-all break-all">{UPI_ID}</code>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(UPI_ID);
                                        // Optional: Add toast notification here
                                    }}
                                    className="text-xs text-primary-600 font-bold hover:underline ml-2 uppercase tracking-wide shrink-0"
                                >
                                    Copy
                                </button>
                             </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                size="lg"
                                fullWidth
                                className="shadow-glow font-bold bg-gradient-to-r from-success-600 to-success-500 hover:from-success-700 hover:to-success-600 text-white"
                                onClick={handlePaymentVerified}
                            >
                                I have made the payment
                            </Button>
                            <Button variant="ghost" fullWidth onClick={() => setShowPayment(false)}>
                                Back
                            </Button>
                        </div>
                        <p className="text-[10px] text-secondary-400 mt-4">
                            Clicking "I have made the payment" will open WhatsApp to notify our team for activation.
                        </p>
                    </div>
                )}

                <p className="text-[10px] text-secondary-400 mt-6">
                    100% Secure Payment. 14-day money-back guarantee.
                </p>
            </div>
        </Modal>
    );
}
