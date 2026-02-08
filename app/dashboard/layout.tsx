"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading, signOut } = useAuth();

  const isPro = profile?.subscription_tier === "pro";

  const sections = [
    {
      title: "Main",
      links: [
        {
          label: "Overview",
          href: "/dashboard/overview",
          icon: <span>📊</span>,
        },
        {
          label: "Invoices",
          href: "/dashboard/invoices",
          icon: <span>📄</span>,
        },
        {
          label: "Inventory",
          href: "/dashboard/inventory",
          icon: <span>📦</span>,
          badge: !isPro ? "Pro" : undefined,
        },
        {
          label: "Collections",
          href: "/dashboard/collection",
          icon: <span>🔔</span>,
          badge: "Hot",
        },
        {
          label: "Expenses",
          href: "/dashboard/expenses",
          icon: <span>💸</span>,
        },
        {
          label: "Clients",
          href: "/dashboard/clients",
          icon: <span>👥</span>,
        },
        {
          label: "Reports",
          href: "/dashboard/reports",
          icon: <span>📈</span>,
          badge: !isPro ? "Pro" : undefined,
        },
      ],
    },
    {
      title: "Settings",
      links: [
        {
          label: "Business Profile",
          href: "/dashboard/settings/profile",
          icon: <span>🏢</span>,
        },
        {
          label: "Refer & Earn",
          href: "/dashboard/referral",
          icon: <span>🎁</span>,
          badge: "New",
        },
        {
          label: "Billing",
          href: "/dashboard/settings/billing",
          icon: <span>💳</span>,
          badge: !isPro ? "Update" : "Pro",
        },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout
      sections={sections}
      user={{
        name: profile?.company_name || "Owner",
        email: profile?.email || "",
      }}
      onSignOut={signOut}
    >
      {children}
    </DashboardLayout>
  );
}
