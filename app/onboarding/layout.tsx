import React from "react";
import { Metadata } from "next";

// Utility pages: keep them out of search results (also disallowed in app/robots.ts).
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
