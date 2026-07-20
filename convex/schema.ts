import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  slots: defineTable({
    available: v.number(),
    total: v.number(),
  }),
});
