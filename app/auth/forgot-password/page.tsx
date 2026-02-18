"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const supabase = createClientSideClient();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast({ title: "Error", type: "error", message: "Please enter your email" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/overview`,
      });
      if (error) throw error;
      setSent(true);
      addToast({
        title: "Email Sent",
        type: "success",
        message: "Check your email for a password reset link.",
      });
    } catch (error: any) {
      addToast({ title: "Error", type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-secondary-50 to-white">
      <Link href="/" className="mb-8">
        <Image src="/logo-final.png" alt="MsgBill" width={180} height={72} priority />
      </Link>
      <div className="w-full max-w-md glass-strong rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-secondary-900 mb-2">Reset Password</h1>
        <p className="text-secondary-600 mb-6">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
        {sent ? (
          <div className="text-center py-4">
            <p className="text-success-600 font-medium mb-4">Check your inbox!</p>
            <Link href="/auth/login">
              <Button variant="outline">Back to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              fullWidth
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth isLoading={loading}>
              Send Reset Link
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-secondary-500">
          <Link href="/auth/login" className="text-primary-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
