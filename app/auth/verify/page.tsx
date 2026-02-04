"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

function VerifyContent() {
    const supabase = createClientSideClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !otp) {
            addToast({
                title: "Error",
                type: "error",
                message: "Please enter both email and OTP code",
            });
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'signup', // or 'email'
            });

            if (error) throw error;

            addToast({
                title: "Success",
                type: "success",
                message: "Email verified successfully.",
            });
            
            // Redirect to onboarding or dashboard
            router.push("/onboarding");
        } catch (error: any) {
            console.error("Verification error:", error);
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            addToast({
                title: "Error",
                type: "error",
                message: "Email address is missing",
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email,
            });

            if (error) throw error;

            addToast({
                title: "Code Sent",
                type: "success",
                message: "A new verification code has been sent to your email.",
            });
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden relative">
            {/* Left Side - Animated Background */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600 relative overflow-hidden items-center justify-center p-12">
                {/* Floating Gradient Orbs */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float-slow animation-delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300/20 rounded-full blur-2xl animate-float animation-delay-500" />

                {/* Content */}
                <div className="relative z-10 text-white text-center space-y-6 animate-slide-in-from-left">
                    <div className="inline-block p-4 bg-white/90 backdrop-blur-md rounded-2xl mb-6">
                        <Image
                            src="/logo-final.png"
                            alt="MsgBill"
                            width={300}
                            height={120}
                            className="w-64 h-auto object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold leading-tight">
                        Verify Your Email
                    </h1>
                    <p className="text-xl text-primary-100">
                        Enter the code sent to your email to complete registration
                    </p>
                </div>
            </div>

            {/* Right Side - Verification Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-secondary-50 to-white relative">
                {/* Background decoration */}
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-100/30 rounded-full blur-3xl pointer-events-none" />

                <div className="w-full max-w-md relative z-10 animate-scale-in">
                    {/* Back to Login Link */}
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors mb-6 group"
                    >
                        <svg
                            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span className="font-medium">Back to Login</span>
                    </Link>

                    {/* Glassmorphic Card */}
                    <div className="glass-strong rounded-3xl p-8 shadow-premium">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                                Enter Verification Code
                            </h2>
                            <p className="text-secondary-600">
                                We sent a 6-digit code to <br />
                                <span className="font-semibold text-primary-600">{email}</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerify} className="space-y-5">
                            <div className="space-y-2">
                                <Input
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    className="h-12 px-4 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Input
                                    label="Verification Code"
                                    type="text"
                                    placeholder="123456"
                                    required
                                    fullWidth
                                    value={otp}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                                    className="h-12 px-4 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl tracking-widest text-center text-lg font-bold"
                                />
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                isLoading={loading}
                                size="lg"
                                className="h-12 text-lg font-semibold shadow-lg shadow-primary-500/30"
                            >
                                Verify Email
                            </Button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-secondary-600 text-sm">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={loading}
                                    className="text-primary-600 font-semibold hover:text-primary-700 hover:underline transition-all disabled:opacity-50"
                                >
                                    Resend Code
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
