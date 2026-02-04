"use client";

import React, { useState, useEffect } from "react";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import PageHeader from "@/components/layout/PageHeader";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function ReportsPage() {
    const supabase = createClientSideClient();
    const { orgId } = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [reportData, setReportData] = useState<{
        summary: {
            revenue: number;
            expenses: number;
            profit: number;
            margin: number;
        };
        monthly: {
            month: string;
            revenue: number;
            expenses: number;
            profit: number;
        }[];
    }>({
        summary: { revenue: 0, expenses: 0, profit: 0, margin: 0 },
        monthly: []
    });

    const fetchReportData = async () => {
        if (!orgId) return;
        setLoading(true);
        
        try {
            // 1. Fetch Paid Invoices for the year
            const startOfYear = `${year}-01-01`;
            const endOfYear = `${year}-12-31`;

            const { data: invoices, error: invError } = await supabase
                .from("invoices")
                .select("grand_total, paid_at")
                .eq("org_id", orgId)
                .eq("status", "paid")
                .gte("paid_at", startOfYear)
                .lte("paid_at", endOfYear);

            if (invError) throw invError;

            // 2. Fetch Expenses for the year
            const { data: expenses, error: expError } = await supabase
                .from("expenses")
                .select("amount, date")
                .eq("org_id", orgId)
                .gte("date", startOfYear)
                .lte("date", endOfYear);

            if (expError) throw expError;

            // 3. Aggregate Data
            const monthlyData = Array.from({ length: 12 }, (_, i) => {
                const monthName = new Date(year, i).toLocaleString('default', { month: 'short' });
                return {
                    month: monthName,
                    revenue: 0,
                    expenses: 0,
                    profit: 0
                };
            });

            let totalRevenue = 0;
            let totalExpenses = 0;

            invoices?.forEach(inv => {
                const monthIndex = new Date(inv.paid_at).getMonth();
                const amount = Number(inv.grand_total);
                monthlyData[monthIndex].revenue += amount;
                totalRevenue += amount;
            });

            expenses?.forEach(exp => {
                const monthIndex = new Date(exp.date).getMonth();
                const amount = Number(exp.amount);
                monthlyData[monthIndex].expenses += amount;
                totalExpenses += amount;
            });

            // Calculate profit for each month
            monthlyData.forEach(m => {
                m.profit = m.revenue - m.expenses;
            });

            const totalProfit = totalRevenue - totalExpenses;
            const margin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

            setReportData({
                summary: {
                    revenue: totalRevenue,
                    expenses: totalExpenses,
                    profit: totalProfit,
                    margin: margin
                },
                monthly: monthlyData
            });

        } catch (error) {
            console.error("Error fetching report:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [orgId, year]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Profit & Loss Report"
                description={`Financial overview for ${year}`}
                action={
                    <div className="flex gap-2">
                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value={2026}>2026</option>
                            <option value={2025}>2025</option>
                            <option value={2024}>2024</option>
                        </select>
                        <Button variant="outline" onClick={fetchReportData}>
                            Refresh
                        </Button>
                    </div>
                }
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-500 text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(reportData.summary.revenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-500 text-sm font-medium">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(reportData.summary.expenses)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-500 text-sm font-medium">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${reportData.summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(reportData.summary.profit)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-500 text-sm font-medium">Profit Margin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${reportData.summary.margin >= 0 ? 'text-primary-600' : 'text-red-600'}`}>
                            {reportData.summary.margin.toFixed(1)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Breakdown Chart (CSS Bar Chart) */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2 mt-4">
                        {reportData.monthly.map((month, idx) => {
                            const maxVal = Math.max(
                                ...reportData.monthly.map(m => Math.max(m.revenue, m.expenses))
                            ) || 1; // Avoid division by zero
                            
                            const revHeight = (month.revenue / maxVal) * 100;
                            const expHeight = (month.expenses / maxVal) * 100;

                            return (
                                <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative">
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded p-2 z-10 whitespace-nowrap">
                                        <div className="font-bold">{month.month}</div>
                                        <div className="text-green-400">Rev: {formatCurrency(month.revenue)}</div>
                                        <div className="text-red-400">Exp: {formatCurrency(month.expenses)}</div>
                                        <div className="border-t border-gray-700 mt-1 pt-1">
                                            Profit: {formatCurrency(month.profit)}
                                        </div>
                                    </div>
                                    
                                    <div className="w-full flex justify-center gap-1 h-full items-end px-1">
                                        <div 
                                            className="w-1/2 bg-green-500 rounded-t opacity-80 hover:opacity-100 transition-all"
                                            style={{ height: `${revHeight}%` }}
                                        />
                                        <div 
                                            className="w-1/2 bg-red-500 rounded-t opacity-80 hover:opacity-100 transition-all"
                                            style={{ height: `${expHeight}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 font-medium">{month.month}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center gap-6 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            <span>Expenses</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium text-gray-500">Month</th>
                            <th className="px-6 py-3 font-medium text-gray-500 text-right">Revenue</th>
                            <th className="px-6 py-3 font-medium text-gray-500 text-right">Expenses</th>
                            <th className="px-6 py-3 font-medium text-gray-500 text-right">Net Profit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {reportData.monthly.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{row.month}</td>
                                <td className="px-6 py-4 text-right text-green-600 font-medium">
                                    {row.revenue > 0 ? formatCurrency(row.revenue) : "-"}
                                </td>
                                <td className="px-6 py-4 text-right text-red-600 font-medium">
                                    {row.expenses > 0 ? formatCurrency(row.expenses) : "-"}
                                </td>
                                <td className={`px-6 py-4 text-right font-bold ${row.profit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                    {formatCurrency(row.profit)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t font-bold">
                        <tr>
                            <td className="px-6 py-4">Total</td>
                            <td className="px-6 py-4 text-right text-green-700">{formatCurrency(reportData.summary.revenue)}</td>
                            <td className="px-6 py-4 text-right text-red-700">{formatCurrency(reportData.summary.expenses)}</td>
                            <td className="px-6 py-4 text-right text-gray-900">{formatCurrency(reportData.summary.profit)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
