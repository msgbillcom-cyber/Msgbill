"use client";

import React, { useState } from "react";
import { createClientSideClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";

interface RecordPaymentModalProps {
  invoice: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RecordPaymentModal({
  invoice,
  isOpen,
  onClose,
  onSuccess,
}: RecordPaymentModalProps) {
  const supabase = createClientSideClient();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(invoice.grand_total);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [method, setMethod] = useState("cash");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Record the payment
      const { error: paymentError } = await supabase.from("payments").insert({
        org_id: invoice.org_id,
        invoice_id: invoice.id,
        amount: parseFloat(amount),
        payment_date: date,
        method: method,
        notes: notes || "Manual entry",
        transaction_id: `MANUAL-${Date.now()}`, // Generate a fake ID for manual
      });

      if (paymentError) throw paymentError;

      // 2. Update invoice status
      const { error: invoiceError } = await supabase
        .from("invoices")
        .update({
          status: "paid",
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", invoice.id);

      if (invoiceError) throw invoiceError;

      addToast({
        title: "Payment Recorded",
        type: "success",
        message: "Invoice marked as paid successfully.",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      addToast({
        title: "Error",
        type: "error",
        message: error.message || "Failed to record payment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount Received (₹)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="bank_transfer">Bank Transfer / Cheque</option>
            </select>
          </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Paid in full"
            className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            Mark as Paid
          </Button>
        </div>
      </form>
    </Modal>
  );
}
