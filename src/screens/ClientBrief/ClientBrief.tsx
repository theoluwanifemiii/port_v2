import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = "Website Design" | "Operation Dashboard" | "Mobile App Design" | "Other";

interface Question {
  id: string;
  label: string;
  hint?: string;
  type: "text" | "textarea" | "select" | "checkbox";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

// ─── Questions per project type ───────────────────────────────────────────────

const questionsByType: Record<ProjectType, Question[]> = {
  "Website Design": [
    // ── Context ──────────────────────────────────────────────────────────────
    {
      id: "business_description",
      label: "Tell me about your business in one paragraph.",
      hint: "What you do, who you serve, and how long you've been doing it.",
      type: "textarea",
      placeholder:
        "e.g. We're a 3-year-old Lagos-based accounting firm serving SMEs. We handle bookkeeping, tax filing, and payroll for 40+ clients.",
    },
    {
      id: "why_now",
      label: "Why are you building this website now?",
      hint: "Something changed. What was it?",
      type: "textarea",
      placeholder:
        "e.g. We just rebranded. We keep losing leads to competitors. Investors want somewhere to send people. Our current site was built in 2019 and looks it.",
    },
    {
      id: "problem",
      label: "What problem are you hoping this website solves?",
      hint: "Not the goal, the problem. What's broken or missing right now?",
      type: "textarea",
      placeholder:
        "e.g. We keep explaining the same thing over and over. Our competitors look more credible. We're not getting enough inquiries. People can't find us online.",
    },
    // ── Success & visitors ───────────────────────────────────────────────────
    {
      id: "success",
      label: "Imagine we're talking 6 months after launch. What would make you say the project was successful?",
      hint: "Be specific. What numbers, behaviours, or outcomes would matter?",
      type: "textarea",
      placeholder:
        "e.g. 3× more enquiries per month. Better-qualified leads. Investors take us seriously. Our team is proud to share the link.",
    },
    {
      id: "single_action",
      label: "When someone lands on your website, what is the ONE thing you want them to do?",
      hint: "One action only. The whole site should pull people toward this.",
      type: "textarea",
      placeholder:
        "e.g. Book a demo. Contact sales. Donate. Download the app. Sign up. Apply. Watch the video.",
    },
    {
      id: "discovery",
      label: "How do customers currently find you?",
      hint: "Be honest. Every answer changes what the homepage needs to do.",
      type: "textarea",
      placeholder:
        "e.g. Mostly referrals and WhatsApp. Some Instagram. A few people find us on Google but not many.",
    },
    // ── Positioning ──────────────────────────────────────────────────────────
    {
      id: "competitors",
      label: "Who are your main competitors?",
      hint: "Names, links, or descriptions. Whoever your customers would consider instead of you.",
      type: "textarea",
      placeholder:
        "e.g. Cowrywise, PiggyVest, and a few local accounting firms. We also lose deals to Excel spreadsheets.",
    },
    {
      id: "differentiator",
      label: "If someone visited your website and a competitor's, why should they choose you?",
      hint: "Not what you do, but why you specifically. What makes the difference?",
      type: "textarea",
      placeholder:
        "e.g. We respond within 2 hours. We've worked with over 100 SMEs. We're the only firm that also handles payroll in-house.",
    },
    {
      id: "frustration",
      label: "What frustrates you most about your current website? If you don't have one, how do customers currently discover your business?",
      type: "textarea",
      placeholder:
        "e.g. It looks unprofessional. The copy is vague. Nobody can find it on Google. We're directing people to our Instagram which isn't designed for this.",
    },
    // ── Content & structure ──────────────────────────────────────────────────
    {
      id: "visitor_info",
      label: "What information does a visitor absolutely need before they'll contact you?",
      hint: "Think like your customer. What questions do they need answered first?",
      type: "textarea",
      placeholder:
        "e.g. What we do, proof that we've done it before, pricing range, how to get started, and that we're based in Lagos.",
    },
    {
      id: "references",
      label: "Share websites you find compelling, and what specifically you like about them.",
      hint: "'I like Apple' tells me nothing. 'I like how Apple simplifies complex technology' tells me everything.",
      type: "textarea",
      placeholder:
        "e.g. stripe.com: the copy treats you like an intelligent adult. paystack.com: clean, builds trust fast. Not the look, I want that feeling.",
    },
    {
      id: "existing_assets",
      label: "What existing assets do you already have?",
      hint: "Be honest. Clients almost always think they have more than they do.",
      type: "checkbox",
      options: [
        "Logo",
        "Brand colours",
        "Brand fonts / guidelines",
        "Photography",
        "Written copy",
        "Testimonials",
        "Case studies",
        "Team photos",
        "Videos",
      ],
    },
    {
      id: "technical_needs",
      label: "What technical features do you need?",
      hint: "Check all that apply.",
      type: "checkbox",
      options: [
        "CMS (content management)",
        "Blog",
        "Booking system",
        "Payment integration",
        "User authentication",
        "Search",
        "Contact form",
        "Analytics / tracking",
        "Multi-language",
        "SEO setup",
        "Dashboard / portal",
        "Custom integrations / API",
      ],
    },
    // ── Project ──────────────────────────────────────────────────────────────
    {
      id: "decision_maker",
      label: "Who will have final say on approving this project?",
      hint: "I need to know who I'm ultimately designing for, and who can say no.",
      type: "textarea",
      placeholder:
        "e.g. Me (founder). Me and my business partner. Our marketing manager. Our board has to sign off.",
    },
    {
      id: "development",
      label: "Are you looking for design only, or design + development?",
      type: "select",
      options: [
        "Design only (I have a developer)",
        "Design + Development",
        "Not sure yet",
      ],
    },
    {
      id: "future",
      label: "Where do you see the business in 2–3 years?",
      hint: "I'm designing something that needs to grow with you, not just work today.",
      type: "textarea",
      placeholder:
        "e.g. We plan to expand to 3 cities and double the team. We want to launch a SaaS product alongside the service.",
    },
    {
      id: "north_star",
      label: "If we could only get one thing absolutely right on this website, what should it be?",
      hint: "Your answer becomes the North Star for every decision we make.",
      type: "textarea",
      placeholder:
        "e.g. That it builds trust immediately. That people understand what we do in 5 seconds. That it actually converts visitors into leads.",
    },
  ],

  "Operation Dashboard": [
    // ── Context ──────────────────────────────────────────────────────────────
    {
      id: "business_context",
      label: "Describe the problem you're trying to solve in one paragraph.",
      hint: "Not the solution, the problem. What's happening right now that isn't working?",
      type: "textarea",
      placeholder:
        "e.g. Our ops team manages 200+ daily transactions across 3 spreadsheets. There's no single view of what's pending, what's failed, or who handled what. Mistakes happen weekly.",
    },
    {
      id: "why_now",
      label: "Why are you solving this now?",
      hint: "Something triggered this. What was it?",
      type: "textarea",
      placeholder:
        "e.g. We just hired 5 new ops agents. We had a critical error last month that cost us. We're scaling and the current system won't survive it.",
    },
    {
      id: "success",
      label: "What does success look like for your team 3 months after this is live?",
      hint: "Specific outcomes: time saved, errors reduced, decisions made faster.",
      type: "textarea",
      placeholder:
        "e.g. Managers can see everything without asking agents. Approvals take minutes not hours. We stop using the spreadsheet entirely.",
    },
    {
      id: "frustration",
      label: "What frustrates your team most about how they currently work?",
      hint: "The real pain, not the polished version.",
      type: "textarea",
      placeholder:
        "e.g. Too many tabs. Data lives in 4 different places. Managers have to chase agents for updates. Reports take hours to compile manually.",
    },
    // ── Users & data ─────────────────────────────────────────────────────────
    {
      id: "team",
      label: "What team or department will use this, and what do they do daily?",
      type: "textarea",
      placeholder:
        "e.g. Our ops team of 8 agents processes loan disbursements. Two managers approve and oversee. Finance team checks end-of-day reports.",
    },
    {
      id: "metrics",
      label: "What data or decisions does this dashboard need to support?",
      hint: "What questions should someone be able to answer in 10 seconds by looking at it?",
      type: "textarea",
      placeholder:
        "e.g. How many transactions are pending right now? Which agents have the most failed cases this week? What's the approval rate today vs. yesterday?",
    },
    {
      id: "actions",
      label: "What key actions should users be able to take, not just see?",
      type: "textarea",
      placeholder:
        "e.g. Approve or reject transactions. Reassign cases. Export daily reports. Flag items for review. Add notes to a record.",
    },
    {
      id: "user_count",
      label: "Roughly how many people will use this?",
      type: "select",
      options: ["1–5", "6–20", "21–50", "50+"],
    },
    {
      id: "integrations",
      label: "What systems, tools, or data sources does this need to connect with?",
      type: "textarea",
      placeholder:
        "e.g. Our PostgreSQL database, a third-party KYC API, Slack for notifications, Google Sheets as a stopgap.",
    },
    {
      id: "permissions",
      label: "Do different users need different views or access levels?",
      type: "select",
      options: [
        "Yes, different roles see different things",
        "No, everyone sees the same",
        "Not sure yet",
      ],
    },
    // ── Project ──────────────────────────────────────────────────────────────
    {
      id: "decision_maker",
      label: "Who will approve this project?",
      type: "textarea",
      placeholder: "e.g. Me (Head of Ops). Me and the CTO. The board needs to sign off on the budget.",
    },
    {
      id: "future",
      label: "Where does the business expect to be in 2 years? Will team size or data volume change significantly?",
      hint: "I want to design something that doesn't need rebuilding when you grow.",
      type: "textarea",
      placeholder:
        "e.g. We expect to 5× our transaction volume and expand to 3 new markets. The ops team will probably double.",
    },
    {
      id: "north_star",
      label: "If this dashboard could only do one thing exceptionally well, what should it be?",
      type: "textarea",
      placeholder:
        "e.g. Give managers a real-time view of what needs attention without them having to ask. Make approvals faster. Eliminate the need for the morning status call.",
    },
  ],

  "Mobile App Design": [
    // ── Context ──────────────────────────────────────────────────────────────
    {
      id: "business_description",
      label: "Describe your app in one paragraph: what it does and who it's for.",
      type: "textarea",
      placeholder:
        "e.g. A mobile app for Nigerian freelancers to invoice clients, track payments, and manage their income tax, all in one place.",
    },
    {
      id: "why_now",
      label: "Why are you building this now?",
      hint: "Something changed what was it?",
      type: "textarea",
      placeholder:
        "e.g. We just raised a pre-seed. A competitor launched but got it wrong. We've been validating manually and it's time to build. The market just opened up.",
    },
    {
      id: "problem",
      label: "What problem does this app solve that isn't being solved well today?",
      hint: "What's the gap? Why does this need to exist?",
      type: "textarea",
      placeholder:
        "e.g. Freelancers use WhatsApp to chase payments and Excel to track income. Nothing is built for the informal way Nigerians actually work.",
    },
    {
      id: "current_behaviour",
      label: "How do your target users currently solve this problem without your app?",
      hint: "Understanding the workaround tells me what the app is really competing with.",
      type: "textarea",
      placeholder:
        "e.g. They use Excel, Google Sheets, WhatsApp Business, or just memory. Some use Wave or QuickBooks but find them too complex.",
    },
    // ── Users & success ──────────────────────────────────────────────────────
    {
      id: "target_users",
      label: "Who are your target users, and what does their day look like?",
      hint: "The more specific, the better the design decisions.",
      type: "textarea",
      placeholder:
        "e.g. Freelance designers and developers in Lagos aged 22–35. They work from cafés, use their phones more than laptops, and get paid via bank transfer or Paystack.",
    },
    {
      id: "core_action",
      label: "What is the single most important thing a user must be able to do in this app?",
      hint: "The one job the app exists to do. Everything else is secondary.",
      type: "textarea",
      placeholder:
        "e.g. Send a professional invoice in under 60 seconds. Track whether a client has paid. Get a reminder when a payment is overdue.",
    },
    {
      id: "success",
      label: "What does success look like 6 months after launch?",
      hint: "Specific numbers or behaviours, not 'users love it'.",
      type: "textarea",
      placeholder:
        "e.g. 5,000 active users. Average of 3 invoices sent per user per month. 40% of users return weekly. App Store rating above 4.2.",
    },
    // ── Positioning ──────────────────────────────────────────────────────────
    {
      id: "competitors",
      label: "Who are your competitors, both direct and indirect?",
      type: "textarea",
      placeholder:
        "e.g. Wave, QuickBooks, FreshBooks (too complex). Excel and WhatsApp (the real competition). A few local apps that never got traction.",
    },
    {
      id: "differentiator",
      label: "Why would someone choose your app over what they're using today?",
      type: "textarea",
      placeholder:
        "e.g. It's built for how Nigerians actually get paid. It's simpler. It sends payment reminders automatically. It works offline.",
    },
    // ── Technical ────────────────────────────────────────────────────────────
    {
      id: "platform",
      label: "What platform are you targeting?",
      type: "select",
      options: ["iOS only", "Android only", "Both iOS and Android"],
    },
    {
      id: "backend",
      label: "Do you already have a backend or API?",
      type: "select",
      options: [
        "Yes, fully built",
        "Yes, partially built",
        "No, not yet",
        "Not sure",
      ],
    },
    {
      id: "branding",
      label: "Do you have existing branding?",
      type: "select",
      options: [
        "Yes, full brand (logo, colors, fonts, guidelines)",
        "Yes, partial (logo only or rough colors)",
        "No, starting from scratch",
      ],
    },
    {
      id: "references",
      label: "Any apps you admire, and what specifically you like about them.",
      hint: "Not 'I like Monzo'. Tell me what Monzo does that you want this app to feel like.",
      type: "textarea",
      placeholder:
        "e.g. Monzo: feels calm and in control. Cowrywise: onboarding is smooth, doesn't overwhelm. Paystack: every interaction feels considered.",
    },
    // ── Project ──────────────────────────────────────────────────────────────
    {
      id: "decision_maker",
      label: "Who will approve this project?",
      type: "textarea",
      placeholder:
        "e.g. Me (founder). Me and my co-founder. We have an investor who'll want to review the design direction.",
    },
    {
      id: "north_star",
      label: "If this app could only get one thing absolutely right, what should it be?",
      type: "textarea",
      placeholder:
        "e.g. That it feels fast and effortless. That first-time users don't need instructions. That it makes freelancers feel more professional.",
    },
  ],

  Other: [
    {
      id: "description",
      label: "Describe the problem or opportunity in one paragraph.",
      hint: "Not what you want to build, the problem that needs solving.",
      type: "textarea",
      placeholder:
        "e.g. Our customer onboarding takes 4 days and requires 3 people. Competitors do it in under an hour. We're losing deals because of it.",
    },
    {
      id: "why_now",
      label: "Why are you tackling this now?",
      type: "textarea",
      placeholder:
        "e.g. We just hired a new ops lead. We lost a major client over it. We finally have budget. We're preparing for a Series A.",
    },
    {
      id: "success",
      label: "What does success look like, specifically?",
      hint: "Numbers, behaviours, or outcomes. Not feelings.",
      type: "textarea",
      placeholder:
        "e.g. Onboarding time drops from 4 days to same-day. NPS improves by 20 points. The ops team stops manually chasing documents.",
    },
    {
      id: "users_pain",
      label: "Who are the users, and what's frustrating them today?",
      type: "textarea",
      placeholder:
        "e.g. New customers who feel the process is slow and confusing. Internal ops agents who spend 60% of their time on data entry that should be automated.",
    },
    {
      id: "decision_maker",
      label: "Who will approve this project?",
      type: "textarea",
      placeholder: "e.g. Me. Me and my co-founder. The CTO needs to sign off on technical direction.",
    },
    {
      id: "existing_materials",
      label: "Do you have any existing designs, brand materials, or documentation?",
      type: "select",
      options: [
        "Yes, full brand and existing designs",
        "Yes, some materials",
        "No, starting from scratch",
      ],
    },
    {
      id: "north_star",
      label: "If we could only get one thing absolutely right, what should it be?",
      type: "textarea",
      placeholder:
        "e.g. That it actually gets adopted by the team. That it eliminates the manual step that causes the most delays. That it scales without needing a rebuild.",
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
    label: "Anything else that would help me understand this better?",
    hint: "Previous attempts, internal politics, constraints, things that have already been decided. Anything that would change how I think about this.",
    type: "textarea",
    placeholder: "Optional but usually the most useful part of the whole brief.",
    required: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#191c20] outline-none transition-all placeholder:text-[#9aa0a8] focus:border-[#121316] focus:ring-4 focus:ring-black/5";

// ─── Draft persistence ────────────────────────────────────────────────────────
// Saved to the visitor's own device so a reload or coming back later doesn't lose their answers.

const DRAFT_KEY = "client-brief-draft";

interface Draft {
  projectType: ProjectType | "";
  basicInfo: { name: string; email: string; company: string };
  answers: Record<string, string>;
}

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ClientBrief = () => {
  const [projectType, setProjectType] = useState<ProjectType | "">(
    () => loadDraft()?.projectType ?? ""
  );
  const [basicInfo, setBasicInfo] = useState(
    () => loadDraft()?.basicInfo ?? { name: "", email: "", company: "" }
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => loadDraft()?.answers ?? {}
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [draftRestored, setDraftRestored] = useState(() => Boolean(loadDraft()));

  useEffect(() => {
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ projectType, basicInfo, answers })
      );
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) — nothing to do
    }
  }, [projectType, basicInfo, answers]);

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

  const toggleCheckbox = (id: string, option: string) => {
    const current = answers[id] ? answers[id].split(", ") : [];
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    setAnswers({ ...answers, [id]: next.join(", ") });
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
      localStorage.removeItem(DRAFT_KEY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setProjectType("");
    setBasicInfo({ name: "", email: "", company: "" });
    setAnswers({});
    setDraftRestored(false);
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
          {draftRestored && status === "idle" && (
            <p className="mt-4 flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs text-[#5c6370]">
              <span>Picked up where you left off. Your answers are saved on this device as you go.</span>
              <button
                type="button"
                onClick={clearDraft}
                className="ml-3 shrink-0 whitespace-nowrap text-[#9a9fa6] underline hover:text-[#111214]"
              >
                Start over
              </button>
            </p>
          )}
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
                {projectType} tell me more
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

                  {q.type === "checkbox" && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {q.options?.map((opt) => {
                        const selected = (answers[q.id] ?? "")
                          .split(", ")
                          .filter(Boolean)
                          .includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleCheckbox(q.id, opt)}
                            className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                              selected
                                ? "border-[#111214] bg-[#111214] text-white"
                                : "border-black/10 bg-white text-[#24282d] hover:border-black/30"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
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
                  Something went wrong. Your answers are saved on this device, so you can try again anytime, or email your brief directly to{" "}
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