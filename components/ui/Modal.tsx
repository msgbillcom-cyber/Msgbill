"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    closeOnOverlayClick = true,
    showCloseButton = true,
}) => {
    const sizeStyles = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
    };

    // Handle ESC key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeOnOverlayClick ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className={cn(
                    "relative bg-white dark:bg-secondary-900 rounded-xl shadow-2xl",
                    "w-full animate-slide-in-from-bottom",
                    "max-h-[90vh] overflow-hidden flex flex-col",
                    sizeStyles[size],
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                aria-describedby={description ? "modal-description" : undefined}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-start justify-between p-6 border-b border-border">
                        <div className="flex-1">
                            {title && (
                                <h2
                                    id="modal-title"
                                    className="text-2xl font-semibold text-secondary-900 dark:text-white"
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    id="modal-description"
                                    className="mt-1 text-sm text-secondary-600 dark:text-secondary-400"
                                >
                                    {description}
                                </p>
                            )}
                        </div>

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="ml-4 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5 text-secondary-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-secondary-50 dark:bg-secondary-800/50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
