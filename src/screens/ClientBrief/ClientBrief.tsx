import React, { useState } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = "Website Design" | "Operation Dashboard" | "Mobile App Design" | "Other";

interface Question {
  id: string;
  label: string;
  hint?: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

// ─── Questions per project type ───────────────────────────────────────────────

const questionsByType: Record<ProjectType, Question[]> = {
  "Website Design": [
    {
      id: "website_type",
      label: "What type of website do you need?",
      type: "select",
      options: [
        "Portfolio / Personal Brand",
        "Landing Page",
        "E-commerce",
        "Corporate / Company Site",
        "Blog / Content Site",
        "Marketplace",
        "Other",
      ],
    },
    {
      id: "website_goal",
      label: "What is the primary goal of the website?",
      hint: "What should it make happen, attract clients, sell products, build credibility?",
      type: "textarea",
      placeholder: "e.g. We want people to discover our services and book a call with us.",
    },
    {
      id: "target_audience",
      label: "Who is your target audience?",
      hint: "Who is this website for? Be as specific as possible.",
      type: "textarea",
      placeholder: "e.g. Nigerian SME owners aged 28–45 looking for accounting software.",
    },
    {
      id: "branding",
      label: "Do you have existing branding?",
      type: "select",
      options: [
        "Yes, full brand (logo, colors, fonts, guidelines)",
        "Yes, partial (logo only or rough color palette)",
        "No, starting from scratch",
      ],
    },
    {
      id: "pages",
      label: "What pages or sections do you need?",
      type: "textarea",
      placeholder: "e.g. Home, About, Services, Pricing, Blog, Contact, FAQ...",
    },
    {
      id: "references",
      label: "Share any websites you love or want to take inspiration from",
      hint: "Links or names work, also mention what specifically you like about them.",
      type: "textarea",
      placeholder: "e.g. stripe.com, clean layout, clear CTAs. notion.so, product-forward.",
    },
    {
      id: "cms",
      label: "Do you need to update content yourself after launch?",
      type: "select",
      options: ["Yes", "No", "Not sure"],
    },
    {
      id: "development",
      label: "Are you looking for design only, or design + development?",
      type: "select",
      options: [
        "Design only, I have a developer",
        "Design + Development",
        "Not sure yet",
      ],
    },
  ],

  "Operation Dashboard": [
    {
      id: "team",
      label: "What team or department will use this dashboard?",
      type: "text",
      placeholder: "e.g. Operations team, Finance, Customer Support...",
    },
    {
      id: "metrics",
      label: "What data or metrics need to be visible?",
      hint: "Think about what numbers, statuses, or summaries your team checks most.",
      type: "textarea",
      placeholder:
        "e.g. Total transactions today, pending approvals, agent performance, error rates...",
    },
    {
      id: "actions",
      label: "What key actions should users be able to take from the dashboard?",
      type: "textarea",
      placeholder: "e.g. Approve transactions, assign tickets, export reports, flag issues...",
    },
    {
      id: "user_count",
      label: "Roughly how many people will use this?",
      type: "select",
      options: ["1–5", "6–20", "21–50", "50+"],
    },
    {
      id: "integrations",
      label: "Are there any existing systems or tools this needs to connect with?",
      hint: "Any databases, APIs, third-party tools, or internal platforms.",
      type: "textarea",
      placeholder: "e.g. Our internal PostgreSQL database, Salesforce, a custom REST API...",
    },
    {
      id: "current_problem",
      label: "What's broken or missing in how you currently manage this?",
      hint: "I want to understand what pain this is solving.",
      type: "textarea",
      placeholder:
        "e.g. We currently use spreadsheets and it's too slow. There's no single view of what's happening.",
    },
    {
      id: "permissions",
      label: "Do different users need different access levels or views?",
      type: "select",
      options: [
        "Yes, different roles need to see different things",
        "No, everyone sees the same",
        "Not sure yet",
      ],
    },
  ],

  "Mobile App Design": [
    {
      id: "platform",
      label: "What platform are you targeting?",
      type: "select",
      options: ["iOS only", "Android only", "Both iOS and Android"],
    },
    {
      id: "core_action",
      label: "What is the core thing users will do in this app?",
      hint: "The single most important job the app exists to do.",
      type: "textarea",
      placeholder:
        "e.g. Book and manage home services. Send and receive money. Track daily habits.",
    },
    {
      id: "target_users",
      label: "Who are your target users?",
      hint: "Age, lifestyle, context, how and where will they use the app?",
      type: "textarea",
      placeholder:
        "e.g. Young professionals in Lagos who use fintech apps daily and expect speed.",
    },
    {
      id: "branding",
      label: "Do you have existing branding?",
      type: "select",
      options: [
        "Yes full brand (logo, colors, fonts, guidelines)",
        "Yes  partial (logo only or rough colors)",
        "No  starting from scratch",
      ],
    },
    {
      id: "problem",
      label: "What problem does this app solve that isn't being solved well today?",
      hint: "What's the gap or frustration that led you here?",
      type: "textarea",
      placeholder:
        "e.g. Existing solutions are too complex. People still use WhatsApp for this because nothing purpose-built exists.",
    },
    {
      id: "backend",
      label: "Do you already have a backend or API?",
      type: "select",
      options: [
        "Yes — fully built",
        "Yes — partially built",
        "No — not yet",
        "Not sure",
      ],
    },
    {
      id: "references",
      label: "Any apps you admire or want to take design cues from?",
      hint: "App names or links, and what specifically you like about them.",
      type: "textarea",
      placeholder:
        "e.g. Monzo, clear and calm. Cowrywise, great onboarding. Apple Reminders, simple.",
    },
  ],

  Other: [
    {
      id: "description",
      label: "Describe your project in a few sentences",
      type: "textarea",
      placeholder: "What are you building, redesigning, or trying to improve?",
    },
    {
      id: "problem",
      label: "What problem are you solving?",
      hint: "What's broken, slow, confusing, or missing right now?",
      type: "textarea",
      placeholder:
        "e.g. Our current process requires too many steps. Users keep dropping off before completing X.",
    },
    {
      id: "users",
      label: "Who are your users?",
      type: "textarea",
      placeholder: "Who will use what you're building, and in what context?",
    },
    {
      id: "existing_materials",
      label: "Do you have any existing designs or brand materials?",
      type: "select",
      options: ["Yes, full brand", "Yes, some materials", "No, nothing yet"],
    },
  ],
};

const sharedEndQuestions: Question[] = [
  {
    id: "timeline",
    label: "What is your ideal timeline?",
    type: "select",
    options: [
      "As soon as possible",
      "Within 2 weeks",
      "1–2 months",
      "2–3 months",
      "Flexible, no hard deadline",
    ],
  },
  {
    id: "budget",
    label: "Budget range",
    type: "select",
    options: [
      "Under $1,000",
      "$1,000 – $2,500",
      "$2,500 – $5,000",
      "$5,000 – $10,000",
      "$10,000+",
      "Let's discuss",
    ],
  },
  {
    id: "additional",
    label: "Anything else I should know?",
    hint: "Constraints, context, important stakeholders, previous attempts — anything relevant.",
    type: "textarea",
    placeholder: "Optional but often the most useful part.",
    required: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#191c20] outline-none transition-all placeholder:text-[#9aa0a8] focus:border-[#121316] focus:ring-4 focus:ring-black/5";

// ─── Component ────────────────────────────────────────────────────────────────

export const ClientBrief = () => {
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [basicInfo, setBasicInfo] = useState({ name: "", email: "", company: "" });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const activeQuestions = projectType
    ? [...questionsByType[projectType], ...sharedEndQuestions]
    : [];

  const handleBasic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectType) return;
    setStatus("submitting");

    // Build structured Q&A array so the Supabase function can render it cleanly
    const allQuestions = [...questionsByType[projectType], ...sharedEndQuestions];
    const questionnaire = allQuestions
      .filter((q) => answers[q.id])
      .map((q) => ({ label: q.label, value: answers[q.id] }));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_CONVEX_SITE_URL}/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: basicInfo.name,
            email: basicInfo.email,
            company: basicInfo.company,
            projectType,
            questionnaire,
          }),
        }
      );

      if (!res.ok) throw new Error("Send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f0] px-6 text-center">
        <div className="max-w-md">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#111214] text-white text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-medium text-[#111214]">Brief received</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#5c6370]">
            Thanks, {basicInfo.name}. I'll review your answers and follow up at{" "}
            <span className="font-medium text-[#111214]">{basicInfo.email}</span> within 24–48 hours.
          </p>
          <p className="mt-2 text-sm text-[#5c6370]">
            A copy of your answers has been sent to your inbox.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm text-[#111214] transition-colors hover:bg-[#111214] hover:text-white"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[680px]">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="text-xs text-[#9a9fa6] hover:text-[#111214] transition-colors">
            olusworks.xyz
          </Link>
          <h1 className="mt-6 text-3xl font-medium tracking-[-0.02em] text-[#111214] sm:text-4xl">
            Client Brief
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#5c6370]">
            Fill this out before our first call. The more detail you give, the more useful our time together will be.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic info */}
          <section className="rounded-2xl border border-black/8 bg-white p-6 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9fa6]">About you</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#24282d]">Full name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={basicInfo.name}
                  onChange={handleBasic}
                  placeholder="Your name"
                  className={inputBase}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#24282d]">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={basicInfo.email}
                  onChange={handleBasic}
                  placeholder="you@company.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#24282d]">
                Company <span className="font-normal text-[#9a9fa6]">(optional)</span>
              </label>
              <input
                name="company"
                type="text"
                value={basicInfo.company}
                onChange={handleBasic}
                placeholder="Your company or product name"
                className={inputBase}
              />
            </div>
          </section>

          {/* Project type */}
          <section className="rounded-2xl border border-black/8 bg-white p-6 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9fa6]">Project type</p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#24282d]">
                What are you looking to build or improve?
              </label>
              <select
                required
                value={projectType}
                onChange={(e) => {
                  setProjectType(e.target.value as ProjectType | "");
                  setAnswers({});
                }}
                className={inputBase}
              >
                <option value="">Select a project type</option>
                <option>Website Design</option>
                <option>Operation Dashboard</option>
                <option>Mobile App Design</option>
                <option>Other</option>
              </select>
            </div>
          </section>

          {/* Dynamic questions */}
          {projectType && (
            <section className="rounded-2xl border border-black/8 bg-white p-6 space-y-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9fa6]">
                {projectType} — tell me more
              </p>

              {activeQuestions.map((q, i) => (
                <div key={q.id}>
                  <label className="mb-1 block text-sm font-medium text-[#24282d]">
                    {i + 1}. {q.label}
                    {q.required === false && (
                      <span className="ml-1.5 font-normal text-[#9a9fa6]">(optional)</span>
                    )}
                  </label>
                  {q.hint && (
                    <p className="mb-2 text-xs leading-relaxed text-[#8a9098]">{q.hint}</p>
                  )}

                  {q.type === "select" && (
                    <select
                      name={q.id}
                      required={q.required !== false}
                      value={answers[q.id] ?? ""}
                      onChange={handleAnswer}
                      className={inputBase}
                    >
                      <option value="">Select an option</option>
                      {q.options?.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {q.type === "textarea" && (
                    <textarea
                      name={q.id}
                      required={q.required !== false}
                      rows={3}
                      value={answers[q.id] ?? ""}
                      onChange={handleAnswer}
                      placeholder={q.placeholder}
                      className={`${inputBase} resize-none`}
                    />
                  )}

                  {q.type === "text" && (
                    <input
                      name={q.id}
                      type="text"
                      required={q.required !== false}
                      value={answers[q.id] ?? ""}
                      onChange={handleAnswer}
                      placeholder={q.placeholder}
                      className={inputBase}
                    />
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Submit */}
          {projectType && (
            <div className="space-y-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-[#111214] py-3.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit brief →"}
              </button>

              {status === "error" && (
                <p className="rounded-xl border border-[#bc3b3b]/20 bg-[#fdeeee] px-4 py-2.5 text-sm text-[#8f2828]">
                  Something went wrong. Email your brief directly to{" "}
                  <a href="mailto:Olu@olusworks.xyz" className="underline">
                    Olu@olusworks.xyz
                  </a>
                  .
                </p>
              )}

              <p className="text-center text-xs text-[#9a9fa6]">
                Your answers are sent to Olu@olusworks.xyz. A copy goes to your inbox.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};