"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-50 p-4 text-center">
      <div className="space-y-6 max-w-md w-full animate-scale-in">
        <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto text-5xl">
          🔍
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-secondary-900">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-800">Page Not Found</h2>
          <p className="text-secondary-600">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="pt-4 flex gap-3 justify-center">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
          <Link href="/dashboard/overview">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
