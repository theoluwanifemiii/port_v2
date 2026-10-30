import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { EMAIL, LINKEDIN_URL, RESUME_URL, SiteFooter, SiteHeader } from "../../components/site/SiteChrome";
import { IconExternal } from "../../components/site/icons";
import "./Contact.css";

const NEEDS = [
  { value: "", label: "Choose one" },
  { value: "Product design", label: "Product design" },
  { value: "UX audit", label: "UX audit" },
  { value: "Design system", label: "Design system" },
  { value: "Design and build", label: "Design and build" },
  { value: "Something else", label: "Something else" },
];

const STEPS = [
  "You share the problem and where the product is today.",
  "We have a short call to understand the users, the team and the constraints.",
  "I send a clear plan with scope, approach and timeline.",
];

// Saved on the visitor's device so a reload doesn't lose their answers.
const DRAFT_KEY = "contact-draft";

interface FormState {
  name: string;
  email: string;
  company: string;
  need: string;
  message: string;
}

const emptyForm: FormState = { name: "", email: "", company: "", need: "", message: "" };

function loadDraft(): FormState {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? { ...emptyForm, ...(JSON.parse(raw) as Partial<FormState>) } : emptyForm;
  } catch {
    return emptyForm;
  }
}

export const Contact: FC = () => {
  const [form, setForm] = useState<FormState>(loadDraft);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* storage unavailable */
    }
  }, [form]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // The existing /send-email endpoint takes name, email, company, project and budget.
      const project = form.need ? `What they need: ${form.need}\n\n${form.message}` : form.message;
      const res = await fetch(`${import.meta.env.VITE_CONVEX_SITE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          project,
          budget: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setForm(emptyForm);
      setStatus("sent");
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("error");
    }
  };

  return (
    <div className="d4 d4-contact">
      <SiteHeader active="contact" />

      <main className="wrap">
        <div className="split">
          {/* Invitation */}
          <div className="invite">
            <p className="mono eyebrow">(CONTACT)</p>
            <h1 className="balance">
              Have a product that needs untangling? <span className="soft">Let's talk.</span>
            </h1>
            <p className="intro-p">
              Tell me about your product, who uses it and where it gets stuck. I work with startups
              and product teams in fintech, healthcare and B2B SaaS.
            </p>
            <a href={`mailto:${EMAIL}`} className="ulink big-email">
              {EMAIL}
            </a>

            <div className="next">
              <p className="mono next-title">WHAT HAPPENS NEXT</p>
              <ol className="steps">
                {STEPS.map((step, i) => (
                  <li key={step}>
                    <span className="mono n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mono socials" style={{ marginTop: 24 }}>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  LINKEDIN <IconExternal />
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                  RESUME <IconExternal />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="form-card">
            <p className="mono form-title">START A PROJECT</p>
            {status === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p className="notice notice-success" role="status">
                  Thanks, your message is on its way. I'll reply by email.
                </p>
                <button type="button" className="mono text-btn" onClick={() => setStatus("idle")}>
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <label className="field">
                  <span className="field-label">Your name</span>
                  <input
                    className="input"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span className="field-label">Email</span>
                  <input
                    className="input"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span className="field-label">Company or product</span>
                  <input
                    className="input"
                    name="company"
                    autoComplete="organization"
                    placeholder="Optional"
                    value={form.company}
                    onChange={onChange}
                  />
                </label>
                <label className="field">
                  <span className="field-label">What do you need?</span>
                  <select className="input" name="need" value={form.need} onChange={onChange}>
                    {NEEDS.map((n) => (
                      <option key={n.label} value={n.value}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="field-label">Tell me about it</span>
                  <textarea
                    className="input"
                    name="message"
                    required
                    placeholder="Who uses the product, what's getting in their way, and when you'd like to start."
                    value={form.message}
                    onChange={onChange}
                  />
                </label>
                {status === "error" && (
                  <p className="notice notice-error" role="alert">
                    Something went wrong sending that. Please try again, or email me at {EMAIL}.
                  </p>
                )}
                <button type="submit" className="d4-btn" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <SiteFooter right="LAGOS, NIGERIA · WAT (UTC+1)" />
    </div>
  );
};
