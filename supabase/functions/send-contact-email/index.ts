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
        from: 'Oluwanifemi Portfolio <noreply@olusworks.xyz>',
        to: ['works@olusworks.xyz'],
        reply_to: email,
        subject: `New Portfolio Contact: ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: 'Tahoma', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(to right, #0997ff, #0053ee); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .header h2 { margin: 0; font-size: 20px; }
                .content { background: #f5f5f5; padding: 20px; border: 2px solid #7f9db9; border-top: none; }
                .field { margin-bottom: 15px; padding: 12px; background: white; border: 1px solid #d4d0c8; }
                .label { font-weight: bold; color: #003da8; display: block; margin-bottom: 5px; }
                .value { color: #000; }
                .footer { margin-top: 20px; padding: 15px; text-align: center; font-size: 11px; color: #666; background: #ece9d8; border: 1px solid #d4d0c8; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>📬 New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Name:</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="field">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #0054e3; text-decoration: none;">${email}</a></span>
                  </div>
                  ${company ? `
                  <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">${company}</span>
                  </div>
                  ` : ''}
                  ${budget ? `
                  <div class="field">
                    <span class="label">Budget Range:</span>
                    <span class="value">${budget}</span>
                  </div>
                  ` : ''}
                  <div class="field">
                    <span class="label">Project Details:</span>
                    <div class="value">${project.replace(/\n/g, '<br/>')}</div>
                  </div>
                </div>
                <div class="footer">
                  <p style="margin: 0;">Sent from your portfolio at <strong>olusworks.xyz</strong></p>
                  <p style="margin: 5px 0 0 0;">Click reply to respond directly to ${email}</p>
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
        from: 'Oluwanifemi Osunsanya <works@olusworks.xyz>',
        to: [email],
        subject: 'Thanks for reaching out!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: 'Tahoma', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(to right, #0997ff, #0053ee); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; }
                .content { background: white; padding: 30px 20px; border: 2px solid #7f9db9; border-top: none; }
                .content p { margin-bottom: 15px; color: #000; font-size: 14px; }
                .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #d4d0c8; }
                .signature strong { color: #003da8; }
                .footer { margin-top: 20px; padding: 15px; text-align: center; font-size: 11px; color: #666; background: #ece9d8; border: 1px solid #d4d0c8; }
                .button { display: inline-block; padding: 12px 24px; background: linear-gradient(to bottom, #3fb73f, #2d8c2d); color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✉️ Thanks for reaching out!</h1>
                </div>
                <div class="content">
                  <p>Hi ${name},</p>
                  
                  <p>Thanks for getting in touch! I've received your message and really appreciate you taking the time to reach out.</p>
                  
                  <p>I'll review your project details and get back to you within <strong>24-48 hours</strong>. In the meantime, feel free to explore more of my work:</p>
                  
                  <div style="text-align: center; margin: 25px 0;">
                    <a href="https://olusworks.xyz" class="button">View My Portfolio</a>
                  </div>
                  
                  <p>If you have any additional information or questions before we connect, just reply to this email.</p>
                  
                  <div class="signature">
                    <p style="margin-bottom: 5px;">Best regards,</p>
                    <p style="margin: 0;"><strong>Oluwanifemi Osunsanya</strong></p>
                    <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">Product Designer</p>
                    <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                      <a href="https://olusworks.xyz" style="color: #0054e3; text-decoration: none;">olusworks.xyz</a> | 
                      <a href="https://www.linkedin.com/in/oluwanifemiosunsanya/" style="color: #0054e3; text-decoration: none;">LinkedIn</a>
                    </p>
                  </div>
                </div>
                <div class="footer">
                  <p style="margin: 0;">This is an automated response confirming receipt of your message.</p>
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