import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

function safe(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
}

// ─── Shared shell ─────────────────────────────────────────────────────────────
// Headspace-inspired: dark hero header · white body · single CTA · clean footer

function shell({
  eyebrow,
  headline,
  subline,
  body,
  ctaHref,
  ctaLabel,
  footerNote,
}: {
  eyebrow: string;
  headline: string;
  subline?: string;
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  footerNote: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:#E8E8E3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111214;">

  <!-- wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E8E8E3;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

        <!-- ── HERO HEADER ──────────────────────────────────────── -->
        <tr>
          <td style="background:#111214;padding:48px 48px 44px;text-align:center;">
            <!-- wordmark -->
            <div style="margin-bottom:32px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#E8E8E3;vertical-align:middle;margin-right:8px;"></span>
              <span style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#9a9fa6;vertical-align:middle;">Oluwanifemi</span>
            </div>
            <!-- eyebrow -->
            <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#5a5f67;">${eyebrow}</p>
            <!-- headline -->
            <h1 style="margin:0;font-size:32px;font-weight:600;line-height:1.15;letter-spacing:-0.02em;color:#F7F7F3;">${headline}</h1>
            ${subline ? `<p style="margin:14px 0 0;font-size:15px;color:#6a6f76;line-height:1.5;">${subline}</p>` : ""}
          </td>
        </tr>

        <!-- ── BODY ────────────────────────────────────────────── -->
        <tr>
          <td style="background:#ffffff;padding:40px 48px 8px;">
            ${body}
            ${ctaHref && ctaLabel ? `
            <!-- CTA -->
            <div style="text-align:center;padding:32px 0 8px;">
              <a href="${ctaHref}" style="display:inline-block;background:#111214;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.08em;padding:15px 32px;border-radius:999px;">${ctaLabel}</a>
            </div>` : ""}
          </td>
        </tr>

        <!-- ── SIGNATURE ───────────────────────────────────────── -->
        <tr>
          <td style="background:#ffffff;padding:24px 48px 36px;border-top:1px solid #f0f0eb;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#111214;">Oluwanifemi Osunsanya</p>
                  <p style="margin:3px 0 0;font-size:12px;color:#6a7077;">Product Designer &amp; Builder</p>
                  <p style="margin:5px 0 0;font-size:12px;">
                    <a href="https://olusworks.xyz" style="color:#111214;text-decoration:none;">olusworks.xyz</a>
                    <span style="color:#c8ccd2;margin:0 6px;">·</span>
                    <a href="https://www.linkedin.com/in/oluwanifemiosunsanya/" style="color:#6a7077;text-decoration:none;">LinkedIn</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ──────────────────────────────────────────── -->
        <tr>
          <td style="background:#F7F7F3;padding:20px 48px 24px;border-top:1px solid #e8e8e3;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9a9fa6;line-height:1.6;">${footerNote}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

// ─── Q&A fields shared renderer ───────────────────────────────────────────────

function qaFields(questionnaire: { label: string; value: string }[]) {
  return questionnaire
    .map(
      ({ label, value }) => `
      <div style="background:#F8F8F5;border:1px solid #EBEBЕ6;border-radius:12px;padding:16px 18px;margin-bottom:12px;">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9fa6;">${label}</p>
        <p style="margin:0;font-size:14px;color:#111214;line-height:1.65;">${safe(value)}</p>
      </div>`
    )
    .join("");
}

// ─── Info fields (for owner notifications) ────────────────────────────────────

function infoField(label: string, value: string, isLink = false) {
  return `
  <div style="background:#F8F8F5;border:1px solid #EBEBЕ6;border-radius:12px;padding:14px 18px;margin-bottom:10px;">
    <p style="margin:0 0 5px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9fa6;">${label}</p>
    <p style="margin:0;font-size:14px;color:#111214;line-height:1.6;">${isLink ? `<a href="mailto:${value}" style="color:#111214;">${value}</a>` : value}</p>
  </div>`;
}

// ─── Email templates ──────────────────────────────────────────────────────────

function questionnaireOwnerEmail(
  name: string,
  email: string,
  company: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
) {
  const body = `
    ${infoField("From", name)}
    ${infoField("Email", email, true)}
    ${company ? infoField("Company", company) : ""}
    <div style="height:8px;"></div>
    ${qaFields(questionnaire)}
  `;

  return shell({
    eyebrow: `Client Brief · ${projectType}`,
    headline: `${name} sent<br/>a project brief`,
    body,
    footerNote: `Sent from olusworks.xyz/client-brief · Reply to respond directly to ${email}`,
  });
}

function questionnaireClientEmail(
  name: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
) {
  const body = `
    <p style="margin:0 0 28px;font-size:15px;color:#4a5058;line-height:1.7;text-align:center;">
      Hi ${name}, I've received your brief and will follow up within 24–48 hours.<br/>
      Here's a copy of everything you submitted.
    </p>
    ${qaFields(questionnaire)}
  `;

  return shell({
    eyebrow: `Your ${projectType} Brief`,
    headline: "Brief received.<br/>I'll be in touch.",
    body,
    ctaHref: "https://olusworks.xyz",
    ctaLabel: "View Portfolio →",
    footerNote: "You're receiving this because you submitted a brief at olusworks.xyz/client-brief",
  });
}

function contactOwnerEmail(
  name: string,
  email: string,
  company: string,
  project: string,
  budget: string
) {
  const body = `
    ${infoField("From", name)}
    ${infoField("Email", email, true)}
    ${company ? infoField("Company", company) : ""}
    ${budget ? infoField("Budget Range", budget) : ""}
    <div style="background:#F8F8F5;border:1px solid #EBEBЕ6;border-radius:12px;padding:16px 18px;margin-bottom:10px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9fa6;">Project Details</p>
      <p style="margin:0;font-size:14px;color:#111214;line-height:1.65;">${safe(project)}</p>
    </div>
  `;

  return shell({
    eyebrow: "Portfolio Inquiry",
    headline: `New message<br/>from ${name}`,
    body,
    footerNote: `Sent from olusworks.xyz · Reply to respond directly to ${email}`,
  });
}

function contactAutoReply(name: string) {
  const body = `
    <p style="margin:0 0 16px;font-size:15px;color:#4a5058;line-height:1.7;text-align:center;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#4a5058;line-height:1.7;text-align:center;">
      Thanks for getting in touch. I've received your message and will review the details shortly.
    </p>
    <p style="margin:0;font-size:15px;color:#4a5058;line-height:1.7;text-align:center;">
      I typically respond within <strong style="color:#111214;">24–48 hours</strong>.<br/>
      In the meantime, feel free to explore more of my work.
    </p>
  `;

  return shell({
    eyebrow: "Portfolio · olusworks.xyz",
    headline: "Got your message.<br/>I'll be in touch.",
    body,
    ctaHref: "https://olusworks.xyz",
    ctaLabel: "View Portfolio →",
    footerNote: "You received this because you submitted an inquiry at olusworks.xyz",
  });
}

// ─── Resend helper ────────────────────────────────────────────────────────────

async function sendViaResend(payload: {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Resend error");
  return data;
}

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

// ─── HTTP Action ──────────────────────────────────────────────────────────────

export const sendEmail = httpAction(async (ctx, request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      company = "",
      project,
      budget,
      projectType,
      questionnaire,
    } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Missing name or email" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const isQuestionnaire =
      typeof projectType === "string" && Array.isArray(questionnaire);

    if (isQuestionnaire) {
      // Notify Olu
      await sendViaResend({
        from: "Oluwanifemi Portfolio <noreply@mail.olusworks.xyz>",
        to: ["Olu@olusworks.xyz"],
        reply_to: email,
        subject: `New Client Brief: ${projectType} — ${name}`,
        html: questionnaireOwnerEmail(name, email, company, projectType, questionnaire),
      });

      // Client copy (non-fatal if it fails)
      try {
        await sendViaResend({
          from: "Oluwanifemi <hello@mail.olusworks.xyz>",
          to: [email],
          reply_to: "Olu@olusworks.xyz",
          subject: `Your brief: ${projectType}`,
          html: questionnaireClientEmail(name, projectType, questionnaire),
        });
      } catch (e) {
        console.error("Client copy failed:", e);
      }

      // Decrement available project slots
      try {
        await ctx.runMutation(internal.slots.decrement, {});
      } catch (e) {
        console.error("Slot decrement failed:", e);
      }
    } else {
      if (!project) {
        return new Response(JSON.stringify({ error: "Missing project field" }), {
          status: 400,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      // Notify Olu
      await sendViaResend({
        from: "Oluwanifemi Portfolio <noreply@mail.olusworks.xyz>",
        to: ["works@olusworks.xyz"],
        reply_to: email,
        subject: `New Portfolio Contact: ${name}`,
        html: contactOwnerEmail(name, email, company, project, budget ?? ""),
      });

      // Auto-reply (non-fatal)
      try {
        await sendViaResend({
          from: "Oluwanifemi <hello@mail.olusworks.xyz>",
          to: [email],
          reply_to: "works@olusworks.xyz",
          subject: "Thanks for reaching out!",
          html: contactAutoReply(name),
        });
      } catch (e) {
        console.error("Auto-reply failed:", e);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("sendEmail error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message ?? "Internal error" }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});
