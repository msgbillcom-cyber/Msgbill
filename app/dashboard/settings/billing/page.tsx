"use client";

import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import UpgradeModal from "@/components/dashboard/UpgradeModal";

export default function BillingSettingsPage() {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <PageHeader
                title="Billing Settings"
                description="Manage your subscription and billing details."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan - Active */}
                <Card className="border-2 border-primary-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-bl-lg">
                        CURRENT PLAN
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">Free Plan</CardTitle>
                        <CardDescription>
                            Perfect for getting started
                        </CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-black text-secondary-900">₹0</span>
                            <span className="text-secondary-500">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-green-500">✓</span>
                                20 Invoices / Month
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-green-500">✓</span>
                                5 Clients Max
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-green-500">✓</span>
                                Basic Templates
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-green-500">✓</span>
                                WhatsApp Sharing
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" fullWidth disabled>
                            Current Plan
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="border-2 border-primary-600 bg-white relative overflow-hidden shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
                     <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMMENDED
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary-900">Pro Plan</CardTitle>
                        <CardDescription className="text-secondary-500">
                            For growing businesses
                        </CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-black text-primary-600">₹499</span>
                            <span className="text-secondary-400">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-primary-600">★</span>
                                Unlimited Invoices
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-primary-600">★</span>
                                Unlimited Clients
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-primary-600">★</span>
                                Premium Templates
                            </li>
                            <li className="flex items-center gap-2 text-sm text-secondary-700">
                                <span className="text-primary-600">★</span>
                                Priority Support
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            className="bg-primary-600 text-white hover:bg-primary-700 shadow-glow" 
                            fullWidth
                            onClick={() => setIsUpgradeModalOpen(true)}
                        >
                            Upgrade Now
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-secondary-900">
                                Need Enterprise Solutions?
                            </h4>
                            <p className="text-sm text-secondary-500 max-w-xl">
                                For large organizations requiring custom integrations, multiple seats, and dedicated account management.
                            </p>
                        </div>
                        <Button variant="outline">
                            Contact Sales
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
        </div>
    );
}
