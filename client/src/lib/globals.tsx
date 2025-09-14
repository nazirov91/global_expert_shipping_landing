import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useSheetCsv } from "@/hooks/useSheetCsv";

type GlobalsMap = Record<string, string>;

interface GlobalsContextValue {
  globals: GlobalsMap;
  businessName: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const GlobalsContext = createContext<GlobalsContextValue | undefined>(undefined);

export function GlobalsProvider({ children }: { children: React.ReactNode }) {
  const sheetUrl = import.meta.env.VITE_SHEET_GLOBALS as string | undefined;
  const { rows, loading, error, refetch } = useSheetCsv(sheetUrl);
  if (import.meta.env.DEV) {
    console.log("[GlobalsProvider] VITE_SHEET_GLOBALS:", sheetUrl);
  }

  const globals = useMemo<GlobalsMap>(() => {
    // Expect key/value rows; fallback to first row object if not key/value
    if (!rows || rows.length === 0) return {};
    const hasKeyValue = rows[0].hasOwnProperty("key") && rows[0].hasOwnProperty("value");
    if (hasKeyValue) {
      return Object.fromEntries(rows.map((r) => [r.key, r.value]));
    }
    return { ...rows[0] } as GlobalsMap;
  }, [rows]);

  const businessName = globals.business_name?.trim() || "Global Expert Shipping";

  const value: GlobalsContextValue = {
    globals,
    businessName,
    loading,
    error,
    refetch,
  };

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (error) console.error("[GlobalsProvider] error:", error);
  }, [error]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    console.log("[GlobalsProvider] rows updated:", rows);
  }, [rows]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    console.log("[GlobalsProvider] globals map:", globals);
    console.log("[GlobalsProvider] businessName:", businessName);
  }, [businessName]);

  return <GlobalsContext.Provider value={value}>{children}</GlobalsContext.Provider>;
}

export function useGlobals() {
  const ctx = useContext(GlobalsContext);
  if (!ctx) throw new Error("useGlobals must be used within a GlobalsProvider");
  return ctx;
}
