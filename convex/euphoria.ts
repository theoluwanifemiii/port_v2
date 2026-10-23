/// <reference types="node" /> // process.env, when the browser app type-checks this file via the generated api
import { ConvexError, v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { TableAction, TableDoc, fromDoc, reduceTable, toDoc } from "./euphoriaLogic";

/**
 * Euphoria digital menu backend.
 *
 * Guests (no login) read and change their own table's order and leave reviews.
 * Staff screens (the floor-calls tablet and the reviews dashboard) pass the
 * staff PIN, checked against the EUPHORIA_STAFF_KEY environment variable,
 * because reviews hold guests' phone numbers and emails.
 */

const item = { name: v.string(), cat: v.string(), amount: v.number(), qty: v.number(), note: v.string() };

const guestAction = v.union(
  v.object({ type: v.literal("setItem"), key: v.string(), item: v.union(v.object(item), v.null()), reopen: v.optional(v.boolean()) }),
  v.object({ type: v.literal("callServer") }),
  v.object({ type: v.literal("cancelCall") }),
  v.object({ type: v.literal("requestBill") }),
  v.object({ type: v.literal("closeTable") }),
);
const staffAction = v.union(
  v.object({ type: v.literal("confirmRound"), time: v.string() }),
  v.object({ type: v.literal("deliverBill") }),
);
const reviewStatus = v.union(v.literal("new"), v.literal("follow"), v.literal("replied"));

const clip = (s: string, n: number) => s.trim().slice(0, n);
const cleanTable = (t: string) => {
  const table = clip(t, 8);
  if (!/^[A-Za-z0-9-]+$/.test(table)) throw new ConvexError("Invalid table");
  return table;
};

function assertStaff(key: string) {
  const expected = process.env.EUPHORIA_STAFF_KEY;
  if (!expected) throw new ConvexError("Staff PIN is not set up. Set EUPHORIA_STAFF_KEY on the Convex deployment.");
  if (key !== expected) throw new ConvexError("Unauthorized");
}

const findTable = (ctx: QueryCtx, table: string) =>
  ctx.db.query("euphoriaTables").withIndex("by_table", (q) => q.eq("table", table)).unique();

async function applyAction(ctx: MutationCtx, table: string, action: TableAction) {
  const row = await findTable(ctx, table);
  const prev = fromDoc(row);
  const next = reduceTable(prev, action);
  if (next === prev) return;

  // Clip free text so one table can't store unbounded data.
  const doc: TableDoc = toDoc(next);
  doc.draft = doc.draft.slice(0, 60).map((i) => ({ ...i, key: clip(i.key, 200), name: clip(i.name, 120), cat: clip(i.cat, 60), note: clip(i.note, 200) }));

  const now = Date.now();
  const waiting = (s: typeof next) => s.stage === "called" || s.bill === "requested";
  const startedWaiting =
    (next.stage === "called" && prev.stage !== "called") || (next.bill === "requested" && prev.bill !== "requested");
  const since = startedWaiting ? now : waiting(next) ? row?.since ?? now : undefined;

  if (row) await ctx.db.replace(row._id, { table, ...doc, since, updatedAt: now });
  else await ctx.db.insert("euphoriaTables", { table, ...doc, since, updatedAt: now });
}

/* ───────────── Guests ───────────── */

export const getTable = query({
  args: { table: v.string() },
  handler: async (ctx, { table }): Promise<TableDoc | null> => {
    const row = await findTable(ctx, clip(table, 8));
    return row ? { draft: row.draft, stage: row.stage, sent: row.sent, bill: row.bill } : null;
  },
});

export const act = mutation({
  args: { table: v.string(), action: guestAction },
  handler: async (ctx, { table, action }) => applyAction(ctx, cleanTable(table), action),
});

export const submitReview = mutation({
  args: {
    rating: v.number(),
    aspects: v.array(v.string()),
    text: v.string(),
    name: v.string(),
    table: v.string(),
    contact: v.string(),
  },
  handler: async (ctx, a) => {
    const rating = Math.round(a.rating);
    if (rating < 1 || rating > 5) throw new ConvexError("Rating must be 1 to 5");
    const contact = clip(a.contact, 120);
    await ctx.db.insert("euphoriaReviews", {
      rating,
      aspects: a.aspects.slice(0, 10).map((s) => clip(s, 30)),
      text: clip(a.text, 2000),
      name: clip(a.name, 80),
      table: clip(a.table, 8),
      contact,
      source: "qr",
      // A low rating with a way to reach the guest goes to the top of the list.
      status: rating <= 3 && contact ? "follow" : "new",
    });
  },
});

/* ───────────── Staff ───────────── */

export const activeCalls = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    assertStaff(key);
    const rows = await ctx.db.query("euphoriaTables").collect();
    return rows
      .filter((r) => (r.stage === "called" && r.draft.length > 0) || r.bill === "requested")
      .map((r) => {
        const isOrder = r.stage === "called" && r.draft.length > 0;
        return {
          table: r.table,
          type: isOrder ? (r.sent.length ? "more" : "order") : "bill",
          since: r.since ?? r.updatedAt,
          items: isOrder ? r.draft.map(({ key: _k, ...i }) => i) : r.sent.flatMap((s) => s.items),
        } as const;
      })
      .sort((a, b) => a.since - b.since);
  },
});

export const staffAct = mutation({
  args: { key: v.string(), table: v.string(), action: staffAction },
  handler: async (ctx, { key, table, action }) => {
    assertStaff(key);
    await applyAction(ctx, cleanTable(table), action);
  },
});

export const listReviews = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    assertStaff(key);
    return await ctx.db.query("euphoriaReviews").order("desc").take(200);
  },
});

export const setReviewStatus = mutation({
  args: { key: v.string(), id: v.id("euphoriaReviews"), status: reviewStatus },
  handler: async (ctx, { key, id, status }) => {
    assertStaff(key);
    await ctx.db.patch(id, { status });
  },
});

/** Lets the staff screens check a PIN before showing anything. */
export const checkStaffKey = query({
  args: { key: v.string() },
  handler: async (_ctx, { key }) => {
    assertStaff(key);
    return true;
  },
});
