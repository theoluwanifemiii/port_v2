import { httpAction } from "./_generated/server";

// ─── Shared styles ────────────────────────────────────────────────────────────

const baseStyles = `
  body { margin:0; padding:0; background:#E7E7E2; font-family:"Geist","Instrument Sans","Segoe UI",Arial,sans-serif; color:#111214; }
  .wrapper { width:100%; padding:32px 16px; }
  .container { max-width:640px; margin:0 auto; background:#F7F7F3; border:1px solid #d6d6d1; border-radius:18px; overflow:hidden; }
  .header { padding:24px 28px 16px; border-bottom:1px solid #e0dfdb; }
  .eyebrow { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6a6f76; }
  .title { margin:10px 0 0; font-size:22px; font-weight:600; }
  .content { padding:24px 28px 8px; }
  .field { padding:14px 16px; border:1px solid #e2e1dd; border-radius:12px; background:#fff; margin-bottom:12px; }
  .label { display:block; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6a6f76; margin-bottom:6px; }
  .value { font-size:14px; color:#111214; line-height:1.6; white-space:pre-wrap; }
  .footer { padding:16px 28px 24px; font-size:11px; color:#6a6f76; }
  .button { display:inline-block; padding:12px 20px; background:#111214; color:#fff !important; text-decoration:none; border-radius:999px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; font-weight:600; }
  .signature { margin-top:24px; border-top:1px solid #e0dfdb; padding-top:16px; color:#6a6f76; font-size:12px; }
  a { color:#111214; }
`;

function safe(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
}

// ─── Email templates ──────────────────────────────────────────────────────────

function questionnaireOwnerEmail(
  name: string,
  email: string,
  company: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
) {
  const fields = questionnaire
    .map(
      ({ label, value }) =>
        `<div class="field"><span class="label">${label}</span><div class="value">${safe(value)}</div></div>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
<body><div class="wrapper"><div class="container">
  <div class="header">
    <div class="eyebrow">Client Brief · ${projectType}</div>
    <h2 class="title">${name} sent a project brief</h2>
  </div>
  <div class="content">
    <div class="field"><span class="label">Name</span><span class="value">${name}</span></div>
    <div class="field"><span class="label">Email</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
    ${company ? `<div class="field"><span class="label">Company</span><span class="value">${company}</span></div>` : ""}
    ${fields}
  </div>
  <div class="footer">Sent from olusworks.xyz/client-brief · Reply to respond directly to ${email}</div>
</div></div></body></html>`;
}

function questionnaireClientEmail(
  name: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
) {
  const fields = questionnaire
    .map(
      ({ label, value }) =>
        `<div class="field"><span class="label">${label}</span><div class="value">${safe(value)}</div></div>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
<body><div class="wrapper"><div class="container">
  <div class="header">
    <div class="eyebrow">Your Brief · ${projectType}</div>
    <h2 class="title">Here's what you submitted</h2>
  </div>
  <div class="content">
    <p style="font-size:14px;color:#3e4248;line-height:1.6;margin:0 0 20px;">
      Hi ${name}, thanks for filling out the brief. I'll review your answers and follow up within 24–48 hours.
      Here's a copy of everything you submitted:
    </p>
    ${fields}
    <p style="margin:20px 0 28px;"><a href="https://olusworks.xyz" class="button">View Portfolio</a></p>
    <div class="signature">
      <strong>Oluwanifemi Osunsanya</strong><br/>
      Product Designer &amp; Builder<br/>
      <a href="https://olusworks.xyz">olusworks.xyz</a>
    </div>
  </div>
  <div class="footer">You're receiving this because you submitted a brief at olusworks.xyz/client-brief</div>
</div></div></body></html>`;
}

function contactOwnerEmail(
  name: string,
  email: string,
  company: string,
  project: string,
  budget: string
) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
<body><div class="wrapper"><div class="container">
  <div class="header">
    <div class="eyebrow">Portfolio Inquiry</div>
    <h2 class="title">New contact form submission</h2>
  </div>
  <div class="content">
    <div class="field"><span class="label">Name</span><span class="value">${name}</span></div>
    <div class="field"><span class="label">Email</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
    ${company ? `<div class="field"><span class="label">Company</span><span class="value">${company}</span></div>` : ""}
    ${budget ? `<div class="field"><span class="label">Budget Range</span><span class="value">${budget}</span></div>` : ""}
    <div class="field"><span class="label">Project Details</span><div class="value">${safe(project)}</div></div>
  </div>
  <div class="footer">Sent from olusworks.xyz · Reply to respond directly to ${email}</div>
</div></div></body></html>`;
}

function contactAutoReply(name: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
<body><div class="wrapper"><div class="container">
  <div class="header"><h1 class="title">Thanks for reaching out</h1></div>
  <div class="content" style="font-size:14px;line-height:1.6;color:#3e4248;padding:24px 28px;">
    <p>Hi ${name},</p>
    <p>Thanks for getting in touch. I've received your message and will review the details shortly.</p>
    <p>I typically respond within <strong>24–48 hours</strong>.</p>
    <p style="margin:22px 0 28px;"><a href="https://olusworks.xyz" class="button">View Portfolio</a></p>
    <div class="signature">
      <strong>Oluwanifemi Osunsanya</strong><br/>
      Product Designer<br/>
      <a href="https://olusworks.xyz">olusworks.xyz</a> ·
      <a href="https://www.linkedin.com/in/oluwanifemiosunsanya/">LinkedIn</a>
    </div>
  </div>
  <div class="footer">Automated confirmation — your message was received.</div>
</div></div></body></html>`;
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

export const sendEmail = httpAction(async (_ctx, request) => {
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
