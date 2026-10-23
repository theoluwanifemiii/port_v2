import { useEffect, useState } from "react";
import { ConvexReactClient } from "convex/react";
import type { FunctionReference, FunctionReturnType } from "convex/server";
import { api } from "../../../convex/_generated/api";
import { TABLE } from "./theme";

/**
 * Connection to the site's Convex deployment. VITE_CONVEX_SITE_URL (already
 * set for the contact form) points at the HTTP host; the realtime client
 * uses the matching .convex.cloud host.
 */
const env = import.meta.env;
const url: string =
  env.VITE_CONVEX_URL || String(env.VITE_CONVEX_SITE_URL || "").replace(/\.convex\.site\/?$/, ".convex.cloud");

export const convex = url.includes(".convex.cloud") ? new ConvexReactClient(url) : null;
export { api };

/**
 * Subscribe to a Convex query. Unlike `useQuery`, errors are returned
 * instead of thrown, so the menu can fall back to working on its own when
 * the backend isn't deployed yet. Pass "skip" to not subscribe.
 */
export function useLive<Q extends FunctionReference<"query">>(query: Q, args: Q["_args"] | "skip") {
  const [data, setData] = useState<FunctionReturnType<Q> | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const argsKey = args === "skip" ? "skip" : JSON.stringify(args);

  useEffect(() => {
    setData(undefined);
    setError(null);
    if (!convex || args === "skip") return;
    const watch = convex.watchQuery(query, args);
    const read = () => {
      try {
        setData(watch.localQueryResult());
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      }
    };
    read();
    return watch.onUpdate(read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, argsKey]);

  return { data, error };
}

export const isUnauthorized = (e: Error | null) => !!e && /Unauthorized/.test(e.message);

/* ───────────── Table number ─────────────
   Each table's QR code opens /euphoria?table=7. The number is kept for the
   visit so every menu page knows which table is ordering. */

const TABLE_KEY = "euphoria-table";

export function rememberTableFromUrl(search: string) {
  const t = new URLSearchParams(search).get("table");
  if (t && /^[A-Za-z0-9-]{1,8}$/.test(t)) {
    try {
      window.sessionStorage.setItem(TABLE_KEY, t);
    } catch {
      /* private mode: falls back to the default table */
    }
  }
}

/** The table from the QR code the guest scanned, or "" if they came another way. */
export function scannedTable(): string {
  try {
    return window.sessionStorage.getItem(TABLE_KEY) || "";
  } catch {
    return "";
  }
}

/** The table orders go to; defaults to table 12 until each table has its own code. */
export const currentTable = () => scannedTable() || TABLE;

/* ───────────── Staff PIN ───────────── */

const STAFF_KEY = "euphoria-staff-key";

export function useStaffKey() {
  const [key, setKeyState] = useState(() => {
    try {
      return window.localStorage.getItem(STAFF_KEY) || "";
    } catch {
      return "";
    }
  });
  const setKey = (k: string) => {
    try {
      if (k) window.localStorage.setItem(STAFF_KEY, k);
      else window.localStorage.removeItem(STAFF_KEY);
    } catch {
      /* the PIN just won't be remembered */
    }
    setKeyState(k);
  };
  return [key, setKey] as const;
}
