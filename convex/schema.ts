import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const menuItem = { name: v.string(), cat: v.string(), amount: v.number(), qty: v.number(), note: v.string() };

export default defineSchema({
  slots: defineTable({
    available: v.number(),
    total: v.number(),
  }),

  // Euphoria digital menu: one row per restaurant table's running order.
  euphoriaTables: defineTable({
    table: v.string(),
    draft: v.array(v.object({ key: v.string(), ...menuItem })),
    stage: v.union(v.literal("draft"), v.literal("called")),
    sent: v.array(v.object({ time: v.string(), items: v.array(v.object(menuItem)) })),
    bill: v.union(v.literal("none"), v.literal("requested"), v.literal("done")),
    /** When the table started waiting on a server (called, or asked for the bill). */
    since: v.optional(v.number()),
    updatedAt: v.number(),
  }).index("by_table", ["table"]),

  // Euphoria digital menu: reviews left from the table QR codes.
  euphoriaReviews: defineTable({
    rating: v.number(),
    aspects: v.array(v.string()),
    text: v.string(),
    name: v.string(),
    table: v.string(),
    contact: v.string(),
    source: v.union(v.literal("qr"), v.literal("google")),
    status: v.union(v.literal("new"), v.literal("follow"), v.literal("replied")),
  }),
});
