"use client";

import React, { useState, useEffect } from "react";
import { createClientSideClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import ExpenseModal from "@/components/expenses/ExpenseModal";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ExpensesPage() {
  const supabase = createClientSideClient();
  const { orgId } = useAuth();
  const { addToast } = useToast();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<any>(null);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    thisMonth: 0,
  });

  const fetchExpenses = async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("org_id", orgId)
        .order("date", { ascending: false });

      if (error) throw error;

      setExpenses(data || []);

      // Calculate stats
      const total = (data || []).reduce((sum, item) => sum + Number(item.amount), 0);
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonthTotal = (data || [])
        .filter((item) => {
          const d = new Date(item.date);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + Number(item.amount), 0);

      setStats({
        totalExpenses: total,
        thisMonth: thisMonthTotal,
      });

    } catch (error: any) {
      console.error("Error fetching expenses:", error);
      addToast({
        title: "Error",
        type: "error",
        message: "Failed to load expenses.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [orgId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    if (!orgId) return;

    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("org_id", orgId);
      if (error) throw error;
      
      addToast({
        title: "Success",
        type: "success",
        message: "Expense deleted successfully",
      });
      fetchExpenses();
    } catch (error: any) {
      addToast({
        title: "Error",
        type: "error",
        message: error.message,
      });
    }
  };

  const columns = [
    {
      header: "Date",
      accessor: (row: any) => formatDate(row.date),
      className: "w-32",
    },
    {
      header: "Category",
      accessor: (row: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {row.category}
        </span>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      className: "max-w-xs truncate",
    },
    {
      header: "Amount",
      accessor: (row: any) => (
        <span className="font-semibold text-gray-900">
          {formatCurrency(row.amount)}
        </span>
      ),
      className: "text-right",
    },
    {
      header: "Actions",
      accessor: (row: any) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setExpenseToEdit(row);
              setIsModalOpen(true);
            }}
            className="text-gray-500 hover:text-primary-600"
          >
            ✏️
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-gray-500 hover:text-error-600"
          >
            🗑️
          </button>
        </div>
      ),
      className: "text-right w-24",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track your business spending."
        action={
          <Button
            leftIcon={<span>➕</span>}
            onClick={() => {
              setExpenseToEdit(null);
              setIsModalOpen(true);
            }}
          >
            Add Expense
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalExpenses)}
                </div>
                <p className="text-sm text-gray-500">Lifetime expenses</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-primary-600">
                    {formatCurrency(stats.thisMonth)}
                </div>
                <p className="text-sm text-gray-500">
                    {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table headers={["Date", "Category", "Description", "Amount", "Actions"]}>
            {expenses.length === 0 ? (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-secondary-500">
                        {loading ? "Loading..." : "No expenses recorded yet."}
                    </td>
                </tr>
            ) : (
                expenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                        <td className="p-4">{formatDate(expense.date)}</td>
                        <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {expense.category}
                            </span>
                        </td>
                        <td className="p-4 max-w-xs truncate">{expense.description}</td>
                        <td className="p-4 text-right font-semibold text-gray-900">
                            {formatCurrency(expense.amount)}
                        </td>
                        <td className="p-4">
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setExpenseToEdit(expense);
                                        setIsModalOpen(true);
                                    }}
                                    className="text-gray-500 hover:text-primary-600"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="text-gray-500 hover:text-error-600"
                                >
                                    🗑️
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </Table>
      </div>

      {isModalOpen && (
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchExpenses}
          expenseToEdit={expenseToEdit}
        />
      )}
    </div>
  );
}
