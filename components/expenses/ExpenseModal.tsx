"use client";

import React, { useState } from "react";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/components/auth/AuthProvider";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  expenseToEdit?: any;
}

const CATEGORIES = [
  "Rent",
  "Utilities",
  "Salary",
  "Equipment",
  "Marketing",
  "Travel",
  "Software",
  "Office Supplies",
  "Maintenance",
  "Other",
];

export default function ExpenseModal({
  isOpen,
  onClose,
  onSuccess,
  expenseToEdit,
}: ExpenseModalProps) {
  const supabase = createClientSideClient();
  const { orgId } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: expenseToEdit?.date || new Date().toISOString().split("T")[0],
    category: expenseToEdit?.category || "Other",
    amount: expenseToEdit?.amount || "",
    description: expenseToEdit?.description || "",
    receipt_url: expenseToEdit?.receipt_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!orgId) throw new Error("Organization ID missing");

      const payload = {
        org_id: orgId,
        ...formData,
        amount: parseFloat(formData.amount),
      };

      let error;
      if (expenseToEdit) {
        const { error: updateError } = await supabase
          .from("expenses")
          .update(payload)
          .eq("id", expenseToEdit.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("expenses")
          .insert(payload);
        error = insertError;
      }

      if (error) throw error;

      addToast({
        title: expenseToEdit ? "Expense Updated" : "Expense Added",
        type: "success",
        message: "Your expense has been recorded successfully.",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      addToast({
        title: "Error",
        type: "error",
        message: error.message || "Failed to save expense.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expenseToEdit ? "Edit Expense" : "Add New Expense"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this expense for?"
            className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
