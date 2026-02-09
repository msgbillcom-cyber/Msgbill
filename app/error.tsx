"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-secondary-200 animate-scale-in">
        <div className="w-20 h-20 bg-error-100 text-error-600 rounded-full flex items-center justify-center mx-auto text-4xl">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-secondary-900">Something went wrong</h1>
          <p className="text-secondary-600">
            An unexpected error occurred. We've been notified.
          </p>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="p-4 bg-secondary-50 rounded-lg text-left overflow-auto max-h-40">
            <p className="text-xs font-mono text-error-700">{error.message}</p>
          </div>
        )}
        <div className="pt-4 flex gap-3 justify-center">
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload Page
          </Button>
          <Button onClick={() => reset()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
