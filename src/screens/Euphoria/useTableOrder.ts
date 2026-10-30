import { useCallback, useEffect, useRef, useState } from "react";
import {
  EMPTY_ORDER,
  GuestAction,
  TableAction,
  TableOrder,
  fromDoc,
  reduceTable,
  toDoc,
} from "../../../convex/euphoriaLogic";
import { api, convex, useLive } from "./backend";
import { ORDER_KEY } from "./theme";

export type { OrderItem, Round, TableOrder, TableAction } from "../../../convex/euphoriaLogic";
export { EMPTY_ORDER };

const normalize = (v: Partial<TableOrder> | null | undefined): TableOrder => ({
  order: v?.order ?? {},
  stage: v?.stage ?? "draft",
  sent: v?.sent ?? [],
  bill: v?.bill ?? "none",
});

/* Offline fallback: the order lives in this browser only. */

export const readStoredOrder = (): TableOrder | null => {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
};

export const writeStoredOrder = (v: TableOrder) => {
  try {
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(v));
  } catch {
    /* storage unavailable: the order still works for this screen */
  }
};

interface Options {
  /** A real guest session (not a preset screen in the screen index). */
  live: boolean;
  seed?: Partial<TableOrder>;
  table: string;
}

/**
 * The table's running order.
 *
 * - Live, with the backend deployed: stored in Convex, so the staff tablet
 *   sees it from any device and its confirmations come straight back here.
 *   Changes show instantly (optimistic) and settle when the server agrees.
 * - Live, no backend: stored in this browser (the food and drinks menus
 *   still share it), and `remote` is false so the menu can simulate staff.
 * - Preset screens: in memory only.
 */
export function useTableOrder({ live, seed, table }: Options) {
  const wantRemote = live && !!convex;
  const { data, error } = useLive(api.euphoria.getTable, wantRemote ? { table } : "skip");
  const remote = wantRemote && !error;

  const [local, setLocal] = useState<TableOrder>(() => normalize(seed));
  const ref = useRef(local);
  ref.current = local;

  useEffect(() => {
    if (!live || remote) return;
    const stored = readStoredOrder();
    if (stored) setLocal(stored);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ORDER_KEY) return;
      try {
        setLocal(normalize(JSON.parse(e.newValue || "{}")));
      } catch {
        /* ignore malformed writes */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [live, remote]);

  const dispatch = useCallback(
    (action: TableAction) => {
      if (remote && convex) {
        convex
          .mutation(
            api.euphoria.act,
            // Staff actions only ever run here in the offline simulation.
            { table, action: action as GuestAction },
            {
              optimisticUpdate: (store) => {
                const cur = store.getQuery(api.euphoria.getTable, { table });
                if (cur === undefined) return;
                store.setQuery(api.euphoria.getTable, { table }, toDoc(reduceTable(fromDoc(cur), action)));
              },
            },
          )
          .catch((e) => console.error("Euphoria: could not update the order", e));
        return;
      }
      const next = reduceTable(ref.current, action);
      ref.current = next;
      setLocal(next);
      if (live) writeStoredOrder(next);
    },
    [remote, table, live],
  );

  const state = remote ? fromDoc(data) : local;
  return { state, dispatch, remote, loading: remote && data === undefined };
}
