"use client";

import React from "react";
import Button from "@/components/ui/Button";
import "@/app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-secondary-50 p-4">
          <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-secondary-200">
            <div className="w-20 h-20 bg-error-100 text-error-600 rounded-full flex items-center justify-center mx-auto text-4xl">
              🔥
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-secondary-900">Critical System Error</h1>
              <p className="text-secondary-600">
                A critical error occurred in the application root.
              </p>
            </div>
            <div className="pt-4">
              <Button onClick={() => reset()} variant="primary" fullWidth>
                Restart Application
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
