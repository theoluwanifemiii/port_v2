import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ─── Shared email styles ──────────────────────────────────────────────────────

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
`

// ─── Questionnaire: owner notification email ──────────────────────────────────

function buildQuestionnaireOwnerEmail(
  name: string,
  email: string,
  company: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
): string {
  const qaFields = questionnaire
    .map(
      ({ label, value }) => `
      <div class="field">
        <span class="label">${label}</span>
        <div class="value">${value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>
      </div>`
    )
    .join('')

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
  <body><div class="wrapper"><div class="container">
    <div class="header">
      <div class="eyebrow">Client Brief · ${projectType}</div>
      <h2 class="title">${name} sent a project brief</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name</span>
        <span class="value">${name}</span>
      </div>
      <div class="field">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:${email}">${email}</a></span>
      </div>
      ${company ? `<div class="field"><span class="label">Company</span><span class="value">${company}</span></div>` : ''}
      ${qaFields}
    </div>
    <div class="footer">Sent from olusworks.xyz/client-brief · Reply to respond directly to ${email}</div>
  </div></div></body></html>`
}

// ─── Questionnaire: client copy email ────────────────────────────────────────

function buildQuestionnairClientEmail(
  name: string,
  projectType: string,
  questionnaire: { label: string; value: string }[]
): string {
  const qaFields = questionnaire
    .map(
      ({ label, value }) => `
      <div class="field">
        <span class="label">${label}</span>
        <div class="value">${value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>
      </div>`
    )
    .join('')

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
      ${qaFields}
      <p style="margin:20px 0 28px;">
        <a href="https://olusworks.xyz" class="button">View Portfolio</a>
      </p>
      <div class="signature">
        <strong>Oluwanifemi Osunsanya</strong><br/>
        Product Designer &amp; Builder<br/>
        <a href="https://olusworks.xyz">olusworks.xyz</a>
      </div>
    </div>
    <div class="footer">You're receiving this because you submitted a brief at olusworks.xyz/client-brief</div>
  </div></div></body></html>`
}

// ─── Contact form: owner notification ────────────────────────────────────────

function buildContactOwnerEmail(
  name: string,
  email: string,
  company: string,
  project: string,
  budget: string
): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
  <body><div class="wrapper"><div class="container">
    <div class="header">
      <div class="eyebrow">Portfolio Inquiry</div>
      <h2 class="title">New contact form submission</h2>
    </div>
    <div class="content">
      <div class="field"><span class="label">Name</span><span class="value">${name}</span></div>
      <div class="field"><span class="label">Email</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
      ${company ? `<div class="field"><span class="label">Company</span><span class="value">${company}</span></div>` : ''}
      ${budget ? `<div class="field"><span class="label">Budget Range</span><span class="value">${budget}</span></div>` : ''}
      <div class="field"><span class="label">Project Details</span><div class="value">${project.replace(/\n/g, '<br/>')}</div></div>
    </div>
    <div class="footer">Sent from olusworks.xyz · Reply to respond directly to ${email}</div>
  </div></div></body></html>`
}

// ─── Contact form: auto-reply ─────────────────────────────────────────────────

function buildContactAutoReply(name: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
  <body><div class="wrapper"><div class="container">
    <div class="header"><h1 class="title">Thanks for reaching out</h1></div>
    <div class="content" style="font-size:14px;line-height:1.6;color:#3e4248;">
      <p>Hi ${name},</p>
      <p>Thanks for getting in touch. I've received your message and will review the details shortly.</p>
      <p>I typically respond within <strong>24–48 hours</strong>. In the meantime, feel free to explore more of my work.</p>
      <p style="margin:22px 0 28px;"><a href="https://olusworks.xyz" class="button">View Portfolio</a></p>
      <p>If you have additional context before we connect, just reply to this email.</p>
      <div class="signature">
        <strong>Oluwanifemi Osunsanya</strong><br/>
        Product Designer<br/>
        <a href="https://olusworks.xyz">olusworks.xyz</a> ·
        <a href="https://www.linkedin.com/in/oluwanifemiosunsanya/">LinkedIn</a>
      </div>
    </div>
    <div class="footer">This is an automated confirmation that your message was received.</div>
  </div></div></body></html>`
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { name, email, company = '', project, budget, projectType, questionnaire } = body

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const isQuestionnaire = !!projectType && Array.isArray(questionnaire)

    if (isQuestionnaire) {
      // ── Questionnaire flow ──────────────────────────────────────────────────

      // 1. Notify owner at Olu@olusworks.xyz
      const ownerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Oluwanifemi Portfolio <noreply@mail.olusworks.xyz>',
          to: ['Olu@olusworks.xyz'],
          reply_to: email,
          subject: `New Client Brief: ${projectType} — ${name}`,
          html: buildQuestionnaireOwnerEmail(name, email, company, projectType, questionnaire),
        }),
      })

      const ownerData = await ownerRes.json()
      if (!ownerRes.ok) throw new Error(ownerData.message || 'Failed to send owner notification')

      // 2. Send client a copy of their answers
      const clientRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Oluwanifemi <hello@mail.olusworks.xyz>',
          to: [email],
          reply_to: 'Olu@olusworks.xyz',
          subject: `Your brief: ${projectType}`,
          html: buildQuestionnairClientEmail(name, projectType, questionnaire),
        }),
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) console.error('Failed to send client copy:', clientData)

      return new Response(
        JSON.stringify({ success: true, ownerId: ownerData.id, clientId: clientData.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )

    } else {
      // ── Regular contact form flow ───────────────────────────────────────────

      if (!project) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // 1. Notify owner at works@olusworks.xyz
      const notifRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Oluwanifemi Portfolio <noreply@mail.olusworks.xyz>',
          to: ['works@olusworks.xyz'],
          reply_to: email,
          subject: `New Portfolio Contact: ${name}`,
          html: buildContactOwnerEmail(name, email, company, project, budget ?? ''),
        }),
      })

      const notifData = await notifRes.json()
      if (!notifRes.ok) throw new Error(notifData.message || 'Failed to send notification email')

      // 2. Auto-reply to sender
      const replyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Oluwanifemi <hello@mail.olusworks.xyz>',
          to: [email],
          reply_to: 'works@olusworks.xyz',
          subject: 'Thanks for reaching out!',
          html: buildContactAutoReply(name),
        }),
      })

      const replyData = await replyRes.json()
      if (!replyRes.ok) console.error('Failed to send auto-reply:', replyData)

      return new Response(
        JSON.stringify({ success: true, notificationId: notifData.id, autoReplyId: replyData.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

  } catch (error) {
    console.error('Email error:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
