import { internalQuery, internalMutation } from "./_generated/server";

const TOTAL_SLOTS = 3;

/** Read current slot availability. Returns default if DB not yet seeded. */
export const get = internalQuery({
  args: {},
  handler: async (ctx) => {
    const row = await ctx.db.query("slots").first();
    if (!row) return { available: TOTAL_SLOTS, total: TOTAL_SLOTS };
    return { available: row.available, total: row.total };
  },
});

/** Decrement available slots by 1. Creates the row on first call if needed. */
export const decrement = internalMutation({
  args: {},
  handler: async (ctx) => {
    const row = await ctx.db.query("slots").first();
    if (!row) {
      // First-ever submission — seed the table with total - 1
      await ctx.db.insert("slots", {
        available: TOTAL_SLOTS - 1,
        total: TOTAL_SLOTS,
      });
      return;
    }
    if (row.available > 0) {
      await ctx.db.patch(row._id, { available: row.available - 1 });
    }
  },
});
