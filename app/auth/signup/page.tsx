"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

function SignupContent() {
    const supabase = createClientSideClient();
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    const handleGoogleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) throw error;
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreedToTerms) {
            addToast({
                title: "Terms Required",
                type: "error",
                message:
                    "Please agree to the Terms of Service and Privacy Policy",
            });
            return;
        }

        setLoading(true);

        try {
            // Using OTP instead of password signup for better email verification
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
                    data: {
                        full_name: name,
                        password: password, // Store password for later
                    },
                },
            });

            if (error) throw error;

            addToast({
                title: "Check Your Email",
                type: "success",
                message: "We sent you a verification code. Please check your inbox.",
            });

            router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
        } catch (error: any) {
            addToast({ title: "Error", type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return { label: "", color: "" };
        if (password.length < 6) {
            return { label: "Weak", color: "bg-error-500" };
        }
        if (password.length < 10) {
            return { label: "Medium", color: "bg-warning-500" };
        }
        return { label: "Strong", color: "bg-success-500" };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen flex overflow-hidden relative">
            {/* Left Side - Animated Background */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-700 relative overflow-hidden items-center justify-center p-12">
                {/* Floating Gradient Orbs */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-float-slow animation-delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/20 rounded-full blur-2xl animate-float animation-delay-500" />

                {/* Geometric shapes */}
                <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rounded-2xl rotate-12 animate-float-slow" />
                <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/10 rounded-full animate-float animation-delay-300" />

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
                        Start Your Journey<br />with MsgBill
                    </h1>
                    <p className="text-xl text-primary-100">
                        Join 500+ businesses who trust us to manage their
                        invoicing
                    </p>
                    <div className="flex items-center justify-center gap-8 pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-sm text-primary-200">
                                Happy Users
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">10K+</div>
                            <div className="text-sm text-primary-200">
                                Invoices Created
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-secondary-50 to-white relative">
                {/* Background decoration */}
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-100/30 rounded-full blur-3xl pointer-events-none" />

                <div className="w-full max-w-md relative z-10 animate-scale-in">
                    {/* Glassmorphic Card */}
                    <div className="glass-strong rounded-3xl p-8 shadow-premium">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                                Create Account
                            </h2>
                            <p className="text-secondary-600">
                                Start invoicing in minutes - completely free
                            </p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <Input
                                    label="Full Name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    fullWidth
                                    value={name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setName(e.target.value)}
                                    className="h-12 px-4 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Input
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setEmail(e.target.value)}
                                    className="h-12 px-4 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Input
                                        label="Password"
                                        type={showPassword
                                            ? "text"
                                            : "password"}
                                        placeholder="••••••••"
                                        required
                                        fullWidth
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => setPassword(e.target.value)}
                                        className="h-12 px-4 pr-12 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)}
                                        className="absolute right-3 top-10 text-secondary-400 hover:text-secondary-600 transition-colors"
                                    >
                                        {showPassword
                                            ? (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    />
                                                </svg>
                                            )
                                            : (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            )}
                                    </button>
                                </div>
                                <div className="mt-2 flex gap-1 h-1">
                                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${password.length > 0 ? passwordStrength.color : 'bg-secondary-200'}`} />
                                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${password.length >= 6 ? passwordStrength.color : 'bg-secondary-200'}`} />
                                    <div className={`h-full flex-1 rounded-full transition-all duration-300 ${password.length >= 10 ? passwordStrength.color : 'bg-secondary-200'}`} />
                                </div>
                                <div className="flex justify-between text-xs text-secondary-500 mt-1">
                                    <span>Password strength: <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.label || 'None'}</span></span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-100 transition-colors"
                                />
                                <label htmlFor="terms" className="text-sm text-secondary-600">
                                    I agree to the <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                isLoading={loading}
                                size="lg"
                                className="h-12 text-lg font-semibold shadow-lg shadow-primary-500/30"
                            >
                                Create Account
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-secondary-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-secondary-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                className="h-12 font-medium hover:bg-secondary-50 border-2"
                                onClick={handleGoogleSignUp}
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign up with Google
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-secondary-600">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-primary-600 font-semibold hover:text-primary-700 hover:underline transition-all"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    );
}
