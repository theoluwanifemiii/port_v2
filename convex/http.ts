import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { sendEmail } from "./emailActions";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

const http = httpRouter();

// ── Email ─────────────────────────────────────────────────────────────────────

http.route({
  path: "/send-email",
  method: "POST",
  handler: sendEmail,
});

http.route({
  path: "/send-email",
  method: "OPTIONS",
  handler: sendEmail,
});

// ── Slots ─────────────────────────────────────────────────────────────────────

http.route({
  path: "/slots",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const slots = await ctx.runQuery(internal.slots.get, {});
    return new Response(JSON.stringify(slots), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/slots",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, { status: 204, headers: cors });
  }),
});

export default http;
