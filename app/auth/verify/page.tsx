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

  const [type, setType] = useState<"signup" | "magiclink" | "email">("signup");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
    const typeParam = searchParams.get("type");
    if (typeParam === "magiclink" || typeParam === "email") setType("magiclink");
    if (typeParam === "signup") setType("signup");
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
        type: type, // Now dynamic: signup or magiclink
      });

      if (error) {
        console.error("OTP verification failed:", error.message);
        throw error;
      }

      addToast({
        title: "Success",
        type: "success",
        message: "Email verified successfully.",
      });

      // Session is already set by verifyOtp; go directly to destination (callback expects code, not needed after OTP)
      router.push(type === "signup" ? "/onboarding" : "/dashboard/overview");
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
        type: "signup",
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
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Left Side - Animated Background */}
      <div className="relative items-center justify-center hidden p-12 overflow-hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600">
        {/* Floating Gradient Orbs */}
        <div className="absolute rounded-full top-20 left-20 w-96 h-96 bg-white/10 blur-3xl animate-float" />
        <div className="absolute rounded-full bottom-20 right-20 w-80 h-80 bg-purple-400/20 blur-3xl animate-float-slow animation-delay-1000" />
        <div className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-primary-300/20 blur-2xl animate-float animation-delay-500" />

        {/* Content */}
        <div className="relative z-10 space-y-6 text-center text-white animate-slide-in-from-left">
          <div className="inline-block p-4 mb-6 bg-white/90 backdrop-blur-md rounded-2xl">
            <Image
              src="/logo-final.png"
              alt="MsgBill"
              width={300}
              height={120}
              className="object-contain w-64 h-auto"
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
      <div className="relative flex items-center justify-center flex-1 p-8 bg-gradient-to-br from-secondary-50 to-white">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 rounded-full pointer-events-none w-96 h-96 bg-gradient-to-r from-primary-100/30 blur-3xl" />

        <div className="relative z-10 w-full max-w-md animate-scale-in">
          {/* Back to Login Link */}
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 mb-6 transition-colors text-secondary-600 hover:text-primary-600 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
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
          <div className="p-8 glass-strong rounded-3xl shadow-premium">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-secondary-900">
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="h-12 px-4 transition-all border-2 bg-white/80 backdrop-blur-sm border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 rounded-xl"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(e.target.value)
                  }
                  className="h-12 px-4 text-lg font-bold tracking-widest text-center transition-all border-2 bg-white/80 backdrop-blur-sm border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 rounded-xl"
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
              <p className="text-sm text-secondary-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="font-semibold transition-all text-primary-600 hover:text-primary-700 hover:underline disabled:opacity-50"
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
