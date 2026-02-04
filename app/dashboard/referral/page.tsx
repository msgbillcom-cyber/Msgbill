"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";

export default function ReferralPage() {
    const { profile } = useAuth();
    const { addToast } = useToast();
    
    const referralCode = profile?.company_name?.toUpperCase().replace(/\s/g, '') || "MSGBILL2026";
    const referralLink = `https://msgbill.com/signup?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        addToast({
            title: "Copied!",
            message: "Referral link copied to clipboard.",
            type: "success"
        });
    };

    return (
        <div className="space-y-8">
            <PageHeader
                title="Refer & Earn"
                description="Invite other business owners to MsgBill and get Pro rewards."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none shadow-glow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Give 1 Month, Get 1 Month Free 🎁</CardTitle>
                            <CardDescription className="text-primary-100 text-lg">
                                When a friend joins MsgBill using your link, both of you get 1 month of Pro features for free.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 relative z-10">
                            <div className="flex gap-2">
                                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 font-mono text-sm truncate">
                                    {referralLink}
                                </div>
                                <Button onClick={handleCopy} variant="secondary" className="shadow-lg">
                                    Copy Link
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="flex items-center gap-2"><span className="text-xl">🚀</span> 124 Businesses Joined via Referrals</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Total Referrals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-secondary-900">0</div>
                                <p className="text-xs text-secondary-500 mt-1">Start sharing to earn rewards</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Rewards Earned</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-primary-600">0 Months</div>
                                <p className="text-xs text-secondary-500 mt-1">Pro subscription value: ₹0</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-primary-100 bg-primary-50/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Milestone Rewards 🏆</CardTitle>
                            <CardDescription>Achieve these milestones to unlock exclusive founder badges and longer Pro access.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { count: 5, reward: "3 Months Pro + 'Bronze Partner' Badge", color: "bg-orange-100 text-orange-700" },
                                { count: 20, reward: "1 Year Pro + 'Silver Partner' Badge", color: "bg-slate-100 text-slate-700" },
                                { count: 50, reward: "Lifetime Pro + 'Gold Partner' Badge", color: "bg-yellow-100 text-yellow-700" },
                            ].map((m) => (
                                <div key={m.count} className="flex items-center justify-between p-4 bg-white rounded-xl border border-secondary-100 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${m.color}`}>
                                            {m.count}
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary-900">{m.reward}</p>
                                            <p className="text-xs text-secondary-500">Refer {m.count} businesses</p>
                                        </div>
                                    </div>
                                    <div className="h-2 w-24 bg-secondary-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500 w-0" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>How it works</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { step: "1", text: "Share your unique referral link with fellow entrepreneurs." },
                                { step: "2", text: "They sign up and create their first 5 invoices." },
                                { step: "3", text: "Both of you get 1 month of MsgBill Pro added to your account automatically." }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold flex-shrink-0">
                                        {item.step}
                                    </div>
                                    <p className="text-sm text-secondary-600 leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
