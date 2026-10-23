/**
 * Euphoria digital menu: the table-order model and the one function that
 * changes it. Shared by the Convex mutations (the source of truth) and the
 * browser (optimistic updates, and the offline fallback), so both always
 * agree on what an action does.
 */

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

export type Stage = "draft" | "called";
export type Bill = "none" | "requested" | "done";

export interface TableOrder {
  /** Items chosen but not yet confirmed by a server, keyed "CAT|Name". */
  order: Record<string, OrderItem>;
  stage: Stage;
  /** Rounds the server has confirmed and sent to the kitchen. */
  sent: Round[];
  bill: Bill;
}

/** How a table is stored: the draft as a list, since item keys aren't valid field names. */
export interface TableDoc {
  draft: (OrderItem & { key: string })[];
  stage: Stage;
  sent: Round[];
  bill: Bill;
}

export type GuestAction =
  | { type: "setItem"; key: string; item: OrderItem | null; reopen?: boolean }
  | { type: "callServer" }
  | { type: "cancelCall" }
  | { type: "requestBill" }
  | { type: "closeTable" };

export type StaffAction = { type: "confirmRound"; time: string } | { type: "deliverBill" };

export type TableAction = GuestAction | StaffAction;

export const EMPTY_ORDER: TableOrder = { order: {}, stage: "draft", sent: [], bill: "none" };
export const MAX_QTY = 20;

export const fromDoc = (d: TableDoc | null | undefined): TableOrder => {
  if (!d) return EMPTY_ORDER;
  const order: Record<string, OrderItem> = {};
  d.draft.forEach(({ key, ...item }) => {
    order[key] = item;
  });
  return { order, stage: d.stage, sent: d.sent, bill: d.bill };
};

export const toDoc = (s: TableOrder): TableDoc => ({
  draft: Object.entries(s.order).map(([key, item]) => ({ key, ...item })),
  stage: s.stage,
  sent: s.sent,
  bill: s.bill,
});

export function reduceTable(s: TableOrder, a: TableAction): TableOrder {
  let n: TableOrder = { ...s };
  switch (a.type) {
    case "setItem": {
      const order = { ...s.order };
      if (a.item && a.item.qty >= 1) order[a.key] = { ...a.item, qty: Math.min(MAX_QTY, Math.floor(a.item.qty)) };
      else delete order[a.key];
      n = { ...n, order };
      // Adding after the table was closed out starts a fresh bill.
      if (a.reopen && n.bill === "done") n.bill = "none";
      break;
    }
    case "callServer":
      if (Object.keys(s.order).length) n.stage = "called";
      break;
    case "cancelCall":
      n.stage = "draft";
      break;
    case "requestBill":
      if (s.sent.length) n.bill = "requested";
      break;
    case "closeTable":
      return EMPTY_ORDER;
    case "confirmRound": {
      // Only what the guest actually called the server for.
      const items = Object.values(s.order);
      if (s.stage !== "called" || !items.length) return s;
      n = { ...n, sent: s.sent.concat([{ time: a.time, items }]), order: {}, stage: "draft" };
      break;
    }
    case "deliverBill":
      if (s.bill === "requested") n.bill = "done";
      break;
  }
  if (!Object.keys(n.order).length && n.stage === "called") n.stage = "draft";
  return n;
}
