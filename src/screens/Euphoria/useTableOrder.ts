import { useCallback, useEffect, useRef, useState } from "react";
import { ORDER_KEY, clockNow } from "./theme";

export interface OrderItem {
  name: string;
  /** Upper-case category or group the item came from. */
  cat: string;
  amount: number;
  qty: number;
  note: string;
}

export interface Round {
  time: string;
  items: OrderItem[];
}

export interface TableOrder {
  /** Items chosen but not yet confirmed by a server, keyed "CAT|Name". */
  order: Record<string, OrderItem>;
  stage: "draft" | "called";
  /** Rounds the server has confirmed and sent to the kitchen. */
  sent: Round[];
  bill: "none" | "requested" | "done";
}

export const EMPTY_ORDER: TableOrder = { order: {}, stage: "draft", sent: [], bill: "none" };

const normalize = (v: Partial<TableOrder> | null | undefined): TableOrder => ({
  order: v?.order ?? {},
  stage: v?.stage ?? "draft",
  sent: v?.sent ?? [],
  bill: v?.bill ?? "none",
});

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

/**
 * The table's running order. When `live`, it is persisted to localStorage so
 * the food and drinks menus share one order and the staff tablet can see it;
 * preset screens (in the screen index) keep it in memory only.
 */
export function useTableOrder(live: boolean, seed?: Partial<TableOrder>) {
  const [state, setState] = useState<TableOrder>(() => normalize(seed));
  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    if (!live) return;
    const stored = readStoredOrder();
    if (stored) setState(stored);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ORDER_KEY) return;
      try {
        setState(normalize(JSON.parse(e.newValue || "{}")));
      } catch {
        /* ignore malformed writes */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [live]);

  const save = useCallback(
    (patch: Partial<TableOrder>) => {
      const next: TableOrder = { ...ref.current, ...patch };
      if (!Object.keys(next.order).length && next.stage === "called") next.stage = "draft";
      ref.current = next;
      setState(next);
      if (live) writeStoredOrder(next);
    },
    [live],
  );

  /** What the server does on the tablet: move the selection into a confirmed round. */
  const confirmRound = useCallback(() => {
    const s = ref.current;
    const keys = Object.keys(s.order);
    if (!keys.length) return;
    save({ sent: s.sent.concat([{ time: clockNow(), items: keys.map((k) => s.order[k]) }]), order: {}, stage: "draft" });
  }, [save]);

  return { state, save, confirmRound };
}
