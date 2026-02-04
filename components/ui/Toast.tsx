"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    title: string;
    message?: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
    undefined,
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = (
    { children },
) => {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);
        setTimeout(() => removeToast(id), 5000);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            "flex flex-col gap-1 p-4 rounded-lg shadow-lg border animate-slide-in-from-right",
                            toast.type === "success" &&
                                "bg-success-50 border-success-200 text-success-800",
                            toast.type === "error" &&
                                "bg-error-50 border-error-200 text-error-800",
                            toast.type === "warning" &&
                                "bg-warning-50 border-warning-200 text-warning-800",
                            toast.type === "info" &&
                                "bg-primary-50 border-primary-200 text-primary-800",
                        )}
                    >
                        <div className="flex items-start justify-between">
                            <span className="font-semibold text-sm">
                                {toast.title}
                            </span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-current opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {toast.message && (
                            <p className="text-xs opacity-90">
                                {toast.message}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
