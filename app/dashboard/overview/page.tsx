"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { LIMITS } from "@/lib/limits";
import Link from "next/link";

export default function DashboardOverview() {
  const { profile } = useAuth();
  const supabase = createClientSideClient();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    activeClients: 0,
  });
  const [allInvoices, setAllInvoices] = useState<any[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);
  const [overdueInvoices, setOverdueInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check for subscription success
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("subscription") === "success") {
      addToast({
        title: "Welcome to Pro! 🚀",
        type: "success",
        message: "Your subscription is active. Enjoy unlimited access!",
      });
      // Remove the query param without full reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      // Force refresh profile/limits
      router.refresh();
    }
  }, [addToast, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!profile?.org_id) {
        // If the profile is still loading, keep the loading state true
        // If the profile is loaded but has no org_id, then show empty stats
        return;
      }

      setLoading(true);
      try {
        // 1. Fetch Invoices
        const { data: invoices, error: invError } = await supabase
          .from("invoices")
          .select("*, clients(name)")
          .eq("org_id", profile.org_id)
          .order("created_at", { ascending: false });

        if (invError) throw invError;

        const currentAllInvoices = invoices || [];
        setAllInvoices(currentAllInvoices);

        // 2. Fetch Clients count
        const { count: clientCount, error: clientError } = await supabase
          .from("clients")
          .select("*", { count: "exact", head: true })
          .eq("org_id", profile.org_id);

        let revenue = 0;
        let paid = 0;
        let unpaid = 0;
        const overdue: any[] = [];

        const now = new Date();

        currentAllInvoices.forEach((inv: any) => {
          if (inv.status === "paid") {
            revenue += inv.grand_total;
            paid++;
          } else {
            unpaid++;
            if (
              inv.due_date &&
              new Date(inv.due_date) < now &&
              inv.status !== "paid"
            ) {
              overdue.push(inv);
            }
          }
        });

        setStats({
          totalRevenue: revenue,
          totalInvoices: currentAllInvoices.length,
          paidInvoices: paid,
          unpaidInvoices: unpaid,
          activeClients: clientCount || 0,
        });

        setRecentInvoices(currentAllInvoices.slice(0, 5));
        setOverdueInvoices(overdue.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        addToast({
          title: "Fetch Error",
          type: "error",
          message: "Failed to load dashboard data.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      fetchDashboardData();
    } else {
      // If there's no profile at all, we might be in an inconsistent state
      // but the middleware/auth provider should handle the redirect.
      // We just ensure we don't show "No activity" if we're still waiting.
    }
  }, [profile, supabase, addToast]);

  const cards = [
    {
      title: "Total Invoices",
      value: stats.totalInvoices.toString(),
      icon: "📄",
      color: "bg-primary-50 text-primary-700",
    },
    {
      title: "Paid Invoices",
      value: stats.paidInvoices.toString(),
      icon: "✅",
      color: "bg-success-50 text-success-700",
    },
    {
      title: "Unpaid / Pending",
      value: stats.unpaidInvoices.toString(),
      icon: "⏳",
      color: "bg-warning-50 text-warning-700",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: "💰",
      color: "bg-secondary-900 text-white",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${getGreeting()}, ${profile?.company_name || "Owner"}`}
        description="Monitor your invoicing performance and track payments."
        action={
          <Link href="/dashboard/invoices/new">
            <Button leftIcon={<span>➕</span>} className="shadow-glow">
              New Invoice
            </Button>
          </Link>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Card
            key={i}
            className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-default animate-slide-in-from-bottom"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${card.color}`}
                >
                  {card.icon}
                </div>
                <span className="text-xs font-bold text-secondary-400 uppercase tracking-widest">
                  {card.title}
                </span>
              </div>
              <div className="text-2xl font-black text-secondary-900">
                {loading ? (
                  <div className="h-8 w-24 bg-secondary-100 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tables Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overdue Invoices */}
          {(loading || overdueInvoices.length > 0) && (
            <Card className="border-error-100 bg-error-50/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-error-700 flex items-center gap-2">
                  <span>⚠️</span> Overdue Invoices
                </CardTitle>
                {!loading && (
                  <Badge variant="error" size="sm" dot>
                    {overdueInvoices.length} critical
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <Table headers={["ID", "Client", "Amount", "Status", "Due"]}>
                  {loading ? (
                    [1, 2].map((i) => (
                      <tr key={i} className="border-b border-secondary-100">
                        <td className="p-4">
                          <div className="h-4 w-16 bg-secondary-200 rounded animate-pulse" />
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-32 bg-secondary-200 rounded animate-pulse" />
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-20 bg-secondary-200 rounded animate-pulse" />
                        </td>
                        <td className="p-4">
                          <div className="h-6 w-16 bg-secondary-200 rounded animate-pulse" />
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-24 bg-secondary-200 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    overdueInvoices.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50"
                      >
                        <td className="p-4 font-bold">{row.invoice_number}</td>
                        <td className="p-4">{row.clients?.name}</td>
                        <td className="p-4 font-semibold text-primary-600">
                          {formatCurrency(row.grand_total)}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              row.status === "paid" ? "success" : "secondary"
                            }
                            size="sm"
                            dot
                          >
                            {row.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-error-600 font-medium">
                          {formatDate(row.due_date)}
                        </td>
                      </tr>
                    ))
                  )}
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link href="/dashboard/invoices">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table headers={["ID", "Client", "Amount", "Status"]}>
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-secondary-100">
                      <td className="p-4">
                        <div className="h-4 w-16 bg-secondary-200 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-32 bg-secondary-200 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-20 bg-secondary-200 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-6 w-16 bg-secondary-200 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : recentInvoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-secondary-500"
                    >
                      No activity tracked yet.
                    </td>
                  </tr>
                ) : (
                  recentInvoices.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50"
                    >
                      <td className="p-4 font-bold">{row.invoice_number}</td>
                      <td className="p-4">{row.clients?.name}</td>
                      <td className="p-4 font-semibold text-primary-600">
                        {formatCurrency(row.grand_total)}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            row.status === "paid" ? "success" : "secondary"
                          }
                          size="sm"
                          dot
                        >
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card className="bg-primary-600 text-white border-none shadow-glow overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">Quick Start ⚡️</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm opacity-90 leading-relaxed">
                Get paid faster by sharing professional invoices via WhatsApp.
              </p>
              <div className="space-y-2 pt-4">
                <Link href="/dashboard/invoices/new" className="block">
                  <Button
                    variant="secondary"
                    fullWidth
                    className="text-primary-900 font-bold"
                  >
                    Create Invoice
                  </Button>
                </Link>
                <Link href="/dashboard/clients" className="block">
                  <Button
                    variant="ghost"
                    fullWidth
                    className="text-white hover:bg-white/10"
                  >
                    Manage Clients
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none shadow-glow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span>🚀</span> Upgrade to Pro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-primary-100">
                Unlock premium features to grow your business faster.
              </p>
              <ul className="text-xs space-y-2 text-primary-50">
                <li className="flex items-center gap-2">
                  <span>✨</span> Premium Templates
                </li>
                <li className="flex items-center gap-2">
                  <span>📊</span> Financial Reports
                </li>
                <li className="flex items-center gap-2">
                  <span>📦</span> Inventory Management
                </li>
              </ul>
              <Link href="/dashboard/settings/billing" className="block pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="text-primary-900 font-bold hover:bg-white"
                >
                  View Plans
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
