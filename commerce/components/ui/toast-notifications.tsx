"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-400",
    title: "text-green-800",
    message: "text-green-700",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200", 
    icon: "text-red-400",
    title: "text-red-800",
    message: "text-red-700",
    iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-400", 
    title: "text-yellow-800",
    message: "text-yellow-700",
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-400",
    title: "text-blue-800", 
    message: "text-blue-700",
    iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const styles = toastStyles[toast.type];

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const toastContent = (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out ${
        isVisible && !isLeaving 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className={`w-5 h-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h4 className={`text-sm font-medium ${styles.title}`}>
              {toast.title}
            </h4>
            {toast.message && (
              <p className={`mt-1 text-sm ${styles.message}`}>
                {toast.message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={`${styles.title} hover:opacity-75 transition-opacity`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
}

// Toast Container Component
export function ToastContainer({ toasts, onRemoveToast }: { toasts: Toast[]; onRemoveToast: (id: string) => void }) {
  return (
    <>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={onRemoveToast}
        />
      ))}
    </>
  );
}

// Hook to use toast notifications
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, type, title, message, duration };
    
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showToast("success", title, message, duration);
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showToast("error", title, message, duration);
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showToast("warning", title, message, duration);
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showToast("info", title, message, duration);
  };

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
  };
}
