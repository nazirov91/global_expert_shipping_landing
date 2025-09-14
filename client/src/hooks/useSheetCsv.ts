import { useEffect, useMemo, useRef, useState } from "react";

export interface CsvRow {
  [key: string]: string;
}

export interface UseSheetCsvOptions<T extends CsvRow = CsvRow> {
  // Optional transform to map each parsed row
  map?: (row: CsvRow) => T;
  // Disable initial fetch
  enabled?: boolean;
}

// Very small CSV parser that handles quoted fields and commas inside quotes
function parseCsv(text: string): CsvRow[] {
  const lines = text.replace(/\r\n?/g, "\n").trim().split("\n");
  if (!lines.length) return [];

  const parseLine = (line: string) => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result.map((c) => c.trim());
  };

  const headers = parseLine(lines[0]).map((h) => h.replace(/^"|"$/g, ""));
  const data = lines.slice(1).map((line) => {
    const cols = parseLine(line).map((c) => c.replace(/^"|"$/g, ""));
    const obj: CsvRow = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? "";
    });
    return obj;
  });

  return data;
}

export function useSheetCsv<T extends CsvRow = CsvRow>(url: string | undefined, options: UseSheetCsvOptions<T> = {}) {
  const { map, enabled = true } = options;
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cacheKey = useMemo(() => (url ? `${url}` : undefined), [url]);

  async function fetchOnce(signal?: AbortSignal) {
    if (!url) return;
    if (import.meta.env.DEV) {
      console.log("[useSheetCsv] start fetch", { url, cacheBuster: true });
    }
    setLoading(true);
    setError(null);
    try {
      const noCacheUrl = `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`;
      const res = await fetch(noCacheUrl, { cache: "no-store", signal });
      if (import.meta.env.DEV) {
        console.log("[useSheetCsv] response", { status: res.status, ok: res.ok, url: res.url });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (import.meta.env.DEV) {
        console.log("[useSheetCsv] received text length", text.length);
      }
      const parsed = parseCsv(text);
      const mapped = map ? (parsed.map(map) as T[]) : (parsed as T[]);
      setRows(mapped);
      if (import.meta.env.DEV) {
        console.log("[useSheetCsv] parsed rows", { count: mapped.length, sample: mapped[0] });
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Failed to load sheet");
      console.error("[useSheetCsv] error", err);
    } finally {
      setLoading(false);
      if (import.meta.env.DEV) {
        console.log("[useSheetCsv] done", { loading: false });
      }
    }
  }

  useEffect(() => {
    if (!enabled) {
      if (import.meta.env.DEV) console.warn("[useSheetCsv] disabled via options.enabled");
      return;
    }
    if (!cacheKey) {
      if (import.meta.env.DEV) console.warn("[useSheetCsv] no URL provided");
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    fetchOnce(ac.signal);
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, enabled]);

  const refetch = () => {
    if (import.meta.env.DEV) console.log("[useSheetCsv] manual refetch()");
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    fetchOnce(ac.signal);
  };

  return { rows, loading, error, refetch } as const;
}

// Helper: Build a CSV URL from a Google Sheet
// Usage examples:
// - Published sheet (recommended):
//   https://docs.google.com/spreadsheets/d/e/{pubId}/pub?output=csv
// - Direct by id + gid:
//   https://docs.google.com/spreadsheets/d/{sheetId}/export?format=csv&id={sheetId}&gid={gid}
export function buildGoogleCsvUrl(params: { publishedCsvId?: string; sheetId?: string; gid?: string | number }) {
  const { publishedCsvId, sheetId, gid } = params;
  if (publishedCsvId) {
    return `https://docs.google.com/spreadsheets/d/e/${publishedCsvId}/pub?output=csv`;
  }
  if (sheetId && gid != null) {
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&id=${sheetId}&gid=${gid}`;
  }
  throw new Error("Provide either publishedCsvId or sheetId + gid");
}
