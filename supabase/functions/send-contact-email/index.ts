import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, company, project, budget } = await req.json()

    console.log('Received form submission:', { name, email, company, budget })

    if (!name || !email || !project) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // 1. Send email to yourself
    console.log('Sending notification email to works@olusworks.xyz...')
    
    const notificationRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Oluwanifemi Portfolio <noreply@mail.olusworks.xyz>',
        to: ['works@olusworks.xyz'],
        reply_to: email,
        subject: `New Portfolio Contact: ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background: #E7E7E2;
                  font-family: "Geist", "Instrument Sans", "Segoe UI", Arial, sans-serif;
                  color: #111214;
                }
                .wrapper {
                  width: 100%;
                  padding: 32px 16px;
                }
                .container {
                  max-width: 640px;
                  margin: 0 auto;
                  background: #F7F7F3;
                  border: 1px solid #d6d6d1;
                  border-radius: 18px;
                  overflow: hidden;
                }
                .header {
                  padding: 24px 28px 12px;
                  border-bottom: 1px solid #e0dfdb;
                }
                .eyebrow {
                  font-size: 11px;
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                  color: #6a6f76;
                }
                .title {
                  margin: 10px 0 0;
                  font-size: 22px;
                }
                .content {
                  padding: 24px 28px 8px;
                }
                .field {
                  padding: 14px 16px;
                  border: 1px solid #e2e1dd;
                  border-radius: 12px;
                  background: #fff;
                  margin-bottom: 12px;
                }
                .label {
                  display: block;
                  font-size: 11px;
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                  color: #6a6f76;
                  margin-bottom: 6px;
                }
                .value {
                  font-size: 14px;
                  color: #111214;
                }
                .footer {
                  padding: 16px 28px 24px;
                  font-size: 11px;
                  color: #6a6f76;
                }
                a { color: #111214; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <div class="eyebrow">Portfolio Inquiry</div>
                    <h2 class="title">New contact form submission</h2>
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
                    ${company ? `
                    <div class="field">
                      <span class="label">Company</span>
                      <span class="value">${company}</span>
                    </div>
                    ` : ''}
                    ${budget ? `
                    <div class="field">
                      <span class="label">Budget Range</span>
                      <span class="value">${budget}</span>
                    </div>
                    ` : ''}
                    <div class="field">
                      <span class="label">Project Details</span>
                      <div class="value">${project.replace(/\n/g, '<br/>')}</div>
                    </div>
                  </div>
                  <div class="footer">
                    Sent from olusworks.xyz · Reply to respond directly to ${email}
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    const notificationData = await notificationRes.json()
    console.log('Notification response:', notificationRes.status, notificationData)

    if (!notificationRes.ok) {
      console.error('Failed to send notification email:', notificationData)
      throw new Error(notificationData.message || 'Failed to send notification email')
    }

    console.log('Notification email sent successfully')

    // 2. Send auto-reply to the person who filled out the form
    console.log('Sending auto-reply to', email)
    
    const autoReplyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
       from: 'Oluwanifemi <hello@mail.olusworks.xyz>',
       to: [email],
       reply_to: 'works@olusworks.xyz',
       subject: 'Thanks for reaching out!',
       
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background: #E7E7E2;
                  font-family: "Geist", "Instrument Sans", "Segoe UI", Arial, sans-serif;
                  color: #111214;
                }
                .wrapper {
                  width: 100%;
                  padding: 32px 16px;
                }
                .container {
                  max-width: 640px;
                  margin: 0 auto;
                  background: #F7F7F3;
                  border: 1px solid #d6d6d1;
                  border-radius: 18px;
                  overflow: hidden;
                }
                .header {
                  padding: 28px;
                  border-bottom: 1px solid #e0dfdb;
                }
                .title {
                  margin: 0;
                  font-size: 24px;
                }
                .content {
                  padding: 24px 28px;
                  font-size: 14px;
                  line-height: 1.6;
                  color: #3e4248;
                }
                .content p { margin: 0 0 16px; }
                .button {
                  display: inline-block;
                  padding: 12px 20px;
                  background: #111214;
                  color: #fff !important;
                  text-decoration: none;
                  border-radius: 999px;
                  font-size: 12px;
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                  font-weight: 600;
                }
                .signature {
                  margin-top: 24px;
                  border-top: 1px solid #e0dfdb;
                  padding-top: 16px;
                  color: #6a6f76;
                  font-size: 12px;
                }
                .footer {
                  padding: 16px 28px 24px;
                  font-size: 11px;
                  color: #6a6f76;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <h1 class="title">Thanks for reaching out</h1>
                  </div>
                  <div class="content">
                    <p>Hi ${name},</p>
                    <p>Thanks for getting in touch. I&apos;ve received your message and will review the details shortly.</p>
                    <p>I typically respond within <strong>24–48 hours</strong>. In the meantime, feel free to explore more of my work.</p>
                    <p style="margin: 22px 0 28px;">
                      <a href="https://olusworks.xyz" class="button">View Portfolio</a>
                    </p>
                    <p>If you have additional context before we connect, just reply to this email.</p>
                    <div class="signature">
                      <strong>Oluwanifemi Osunsanya</strong><br/>
                      Product Designer<br/>
                      <a href="https://olusworks.xyz" style="color:#111214;">olusworks.xyz</a> ·
                      <a href="https://www.linkedin.com/in/oluwanifemiosunsanya/" style="color:#111214;">LinkedIn</a>
                    </div>
                  </div>
                  <div class="footer">
                    This is an automated confirmation that your message was received.
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    const autoReplyData = await autoReplyRes.json()
    console.log('Auto-reply response:', autoReplyRes.status, autoReplyData)

    if (!autoReplyRes.ok) {
      console.error('Failed to send auto-reply:', autoReplyData)
      // Don't throw error here - notification email was sent successfully
    } else {
      console.log('Auto-reply sent successfully')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        notificationId: notificationData.id,
        autoReplyId: autoReplyData.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Email error:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
