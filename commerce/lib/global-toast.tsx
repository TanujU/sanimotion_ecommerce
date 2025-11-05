"use client";

import { createContext, useContext, ReactNode } from "react";
import { useToast, ToastContainer } from "components/ui/toast-notifications";

const GlobalToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function GlobalToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  return (
    <GlobalToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onRemoveToast={toast.removeToast} />
    </GlobalToastContext.Provider>
  );
}

export function useGlobalToast() {
  const context = useContext(GlobalToastContext);
  if (!context) {
    throw new Error("useGlobalToast must be used within GlobalToastProvider");
  }
  return context;
}

