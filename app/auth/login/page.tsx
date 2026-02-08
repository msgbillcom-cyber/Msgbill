"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

function LoginContent() {
  const supabase = createClientSideClient();
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      addToast({ title: "Login Failed", type: "error", message: error });
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("error");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams, addToast]);

  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password",
  );
  const [otpLoading, setOtpLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${next || "/dashboard/overview"}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      addToast({ title: "Error", type: "error", message: error.message });
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      addToast({
        title: "Code Sent",
        type: "success",
        message: "A verification code has been sent to your email.",
      });
      router.push(
        `/auth/verify?email=${encodeURIComponent(email)}&type=magiclink`,
      );
    } catch (error: any) {
      addToast({ title: "Error", type: "error", message: error.message });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      addToast({
        title: "Success",
        type: "success",
        message: "Signed in successfully.",
      });
      router.push(next || "/dashboard/overview");
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
            Welcome Back to
            <br />
            MsgBill
          </h1>
          <p className="text-xl text-primary-100">
            The simplest way to manage your invoices and get paid faster
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-secondary-50 to-white relative">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-scale-in">
          {/* Back to Home Link */}
          <Link
            href="/"
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
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Glassmorphic Card */}
          <div className="glass-strong rounded-3xl p-8 shadow-premium">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-secondary-600">
                Log in to access your MsgBill account
              </p>
            </div>

            <div className="flex p-1 bg-secondary-100 rounded-xl mb-8">
              <button
                onClick={() => setLoginMethod("password")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === "password"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-secondary-500 hover:text-secondary-700"
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setLoginMethod("otp")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === "otp"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-secondary-500 hover:text-secondary-700"
                }`}
              >
                Email OTP
              </button>
            </div>

            <form
              onSubmit={
                loginMethod === "password" ? handleLogin : handleOtpLogin
              }
              className="space-y-5"
            >
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
                  className="h-12 px-4 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                />
              </div>

              {loginMethod === "password" && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      fullWidth
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      className="h-12 px-4 pr-12 bg-white/80 backdrop-blur-sm border-2 border-secondary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-secondary-400 hover:text-secondary-600 transition-colors"
                    >
                      {showPassword ? (
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
                      ) : (
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
                </div>
              )}

              {loginMethod === "password" && (
                <div className="flex items-center justify-between text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                isLoading={loginMethod === "password" ? loading : otpLoading}
                className="h-12 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-base shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all rounded-xl"
              >
                {loginMethod === "password"
                  ? loading
                    ? "Signing in..."
                    : "Sign In"
                  : otpLoading
                    ? "Sending code..."
                    : "Send Verification Code"}
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-secondary-500">
                    Or sign in with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-secondary-200 rounded-xl hover:border-secondary-300 hover-lift transition-smooth"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-secondary-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors underline-offset-2"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
