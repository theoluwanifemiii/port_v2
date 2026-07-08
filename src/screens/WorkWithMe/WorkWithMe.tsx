import React, { useState, useEffect } from "react";
import { PortfolioShell } from "../../components/PortfolioShell";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Extend Window type for Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

// Load Calendly script + CSS once
function useCalendly() {
  useEffect(() => {
    if (!document.getElementById("calendly-css")) {
      const link = document.createElement("link");
      link.id = "calendly-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("calendly-js")) {
      const script = document.createElement("script");
      script.id = "calendly-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
}

const CALENDLY_URL = "https://calendly.com/theoluwanifemi/strategy-call";

function BookingBanner() {
  useCalendly();
  const [dismissed, setDismissed] = useState(false);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  if (dismissed) return null;

  return (
    <section className="reveal-up reveal-up-delay-1 mt-10 mb-8">
      <div className="hairline-card rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 relative">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-[#9aa0a8] transition-colors hover:bg-black/5 hover:text-[#111214]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b] mb-3">
            Free 30-Min Session
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#111214] leading-snug max-w-md">
            Want a second pair of eyes on your product before you fill the form?
          </h2>
          <p className="mt-3 text-sm text-[#585d65] max-w-sm leading-relaxed">
            Book a free strategy call. I'll look at your actual product and tell you exactly what I see — no prep needed.
          </p>
        </div>
        <button
          onClick={openCalendly}
          className="shrink-0 rounded-xl bg-[#15171b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black whitespace-nowrap"
        >
          Book a free call →
        </button>
      </div>
    </section>
  );
}

const inputClassName =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#191c20] outline-none transition-all placeholder:text-[#8a9098] focus:border-[#121316] focus:ring-4 focus:ring-black/5";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "It was a pleasure working with Oluwanifemi at Motopay. He is a highly skilled professional with strong technical abilities and excellent problem-solving skills. Oluwanifemi consistently delivered high-quality work on our projects and showed remarkable attention to detail. His collaborative nature and positive attitude made him a valuable team member.",
    name: "Oluwapelumi Adesokan",
    role: "Fullstack Developer",
    company: "Sujimoto Group",
  },
  {
    quote:
      "I've had the pleasure of working alongside Nifemi, and he's one of the most talented and collaborative designers I've met. His attention to detail, strong UX instincts, and ability to turn complex problems into elegant solutions consistently impressed me. Beyond his design skills, Nifemi is a great team player, always open to feedback and generous with his insights. He'd be an asset to any design team.",
    name: "Oluwafemi Oluwatobi",
    role: "Product Designer",
    company: "Excel Minds",
  },
  {
    quote:
      "I had the opportunity to work with Oluwanifemi, and he stood out as a thoughtful and talented product designer. He has a strong sense for clean, user-focused design and consistently brings clarity to complex problems. His ability to balance user needs with business goals makes him a valuable partner in any product team. Beyond his design skills, he's collaborative, receptive to feedback, and always brings positive energy to the team.",
    name: "Timothy Fabiyi",
    role: "Product Manager",
  },
  {
    quote:
      "I had the pleasure of working closely with Oluwanifemi on the Backoffice project at Motopay. He consistently demonstrated exceptional skills as a Product Designer, contributing significantly to both the design and overall user experience of the platform. His ability to translate complex user requirements into clean, functional designs was impressive — and whenever we encountered a bug or design inconsistency, he worked quickly and iteratively to make improvements.",
    name: "Orji Aso",
    role: "Snr. Software Test Engineer",
    company: "Moniepoint",
  },
  {
    quote:
      "It's an absolute joy to witness Oluwanifemi's remarkable growth over the years within the design space. His curiosity, user-centered passion, and collaborative spirit have set him on an extraordinary path. His dedication to creating user-centric, delightful experiences and his willingness to learn is truly commendable. I strongly recommend him for your team and on your projects.",
    name: "Aduragbemi Abiola",
    role: "Founder · Ex Interswitch",
    company: "Adura Studios",
  },
  {
    quote:
      "Oluwanifemi possesses a unique blend of creativity, technical expertise, and a deep understanding of user-centric design principles. His ability to transform difficult ideas into visually appealing and user-friendly designs is absolutely admirable. He continuously seeks opportunities to expand his skill set, which greatly contributes to the innovative and fresh approach he brings to each project.",
    name: "Oluwaseyi Adisa",
    role: "Software Engineer",
  },
];

// ─── Draft persistence ────────────────────────────────────────────────────────
// Saved to the visitor's own device so a reload or coming back later doesn't lose their answers.

const CONTACT_DRAFT_KEY = "work-with-me-draft";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
}

function loadContactDraft(): ContactFormData | null {
  try {
    const raw = localStorage.getItem(CONTACT_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as ContactFormData) : null;
  } catch {
    return null;
  }
}

const emptyContactForm: ContactFormData = {
  name: "",
  email: "",
  company: "",
  project: "",
  budget: "",
};

export const WorkWithMe = () => {
  const [formData, setFormData] = useState<ContactFormData>(
    () => loadContactDraft() ?? emptyContactForm
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [draftRestored, setDraftRestored] = useState(() => Boolean(loadContactDraft()));

  useEffect(() => {
    try {
      localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(formData));
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) — nothing to do
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CONVEX_SITE_URL}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      localStorage.removeItem(CONTACT_DRAFT_KEY);
      setSubmitStatus("success");
      setFormData(emptyContactForm);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PortfolioShell contentClassName="max-w-[980px]">
      <section className="reveal-up">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Contact</p>
        <h1 className="section-title mt-3 text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
          Let&apos;s design something users genuinely enjoy using.
        </h1>
      </section>

      <BookingBanner />

      <section className="mt-2 grid gap-4 overflow-x-hidden reveal-up reveal-up-delay-2 lg:flex lg:items-start">
        <aside className="hairline-card w-full min-w-0 overflow-hidden rounded-3xl p-6 lg:w-[380px] lg:max-w-[380px] lg:flex-shrink-0 lg:basis-[380px] lg:p-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            speed={700}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            className="h-[400px] w-full max-w-full [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet-active]:!bg-[#111214] [&_.swiper-pagination-bullet]:!bg-black/30"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={`${testimonial.name}-${index}`} className="!h-full">
                <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] pb-8">
                  <p className="text-4xl text-black/20">“</p>
                  <div className="mt-2 min-h-0 overflow-hidden">
                    <p
                      className="break-words text-xl leading-[1.3] text-[#17191d] sm:text-2xl lg:text-[2rem]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center gap-3 shrink-0">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#15171b] text-sm font-semibold text-white">
                      {testimonial.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() || "")
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#15181d]">{testimonial.name}</p>
                      <p className="text-xs text-[#6a7077]">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 space-y-3 text-sm leading-relaxed text-[#585d65]">
            <p>I partner with startups and product teams on:</p>
            <ul className="space-y-1">
              <li>• Dashboard and admin UX</li>
              <li>• Product redesign and growth flows</li>
              <li>• Design systems and handoff quality</li>
            </ul>
          </div>
        </aside>

        <article className="hairline-card w-full min-w-0 rounded-3xl p-6 lg:flex-1 lg:p-8">
          {draftRestored && submitStatus === "idle" && (
            <p className="mb-4 flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs text-[#5c6370]">
              <span>Picked up where you left off. Your answers are saved on this device as you go.</span>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(CONTACT_DRAFT_KEY);
                  setFormData(emptyContactForm);
                  setDraftRestored(false);
                }}
                className="ml-3 shrink-0 whitespace-nowrap text-[#9a9fa6] underline hover:text-[#111214]"
              >
                Start over
              </button>
            </p>
          )}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-[#24282d]">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm text-[#24282d]">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-[#24282d]">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="project" className="mb-2 block text-sm text-[#24282d]">
                How can I help?
              </label>
              <textarea
                id="project"
                name="project"
                rows={6}
                required
                value={formData.project}
                onChange={handleChange}
                placeholder="Tell me about your product and what support you need..."
                className={`${inputClassName} resize-none`}
              />
            </div>

            <div>
              <label htmlFor="budget" className="mb-2 block text-sm text-[#24282d]">
                Budget range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select a range</option>
                <option value="under-500">Under $1,000</option>
                <option value="500-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-plus">$10,000+</option>
                <option value="We don't have a budget in mind">We don't have a budget in mind </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-xl bg-[#15171b] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Proceed with inquiry"}
            </button>

            {submitStatus === "success" && (
              <p className="rounded-xl border border-[#2d7f4b]/20 bg-[#eaf8ef] px-4 py-2 text-sm text-[#1e653b]">
                Thanks. I&apos;ll get back to you shortly.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="rounded-xl border border-[#bc3b3b]/20 bg-[#fdeeee] px-4 py-2 text-sm text-[#8f2828]">
                Something went wrong. Please email works@olusworks.xyz directly.
              </p>
            )}

            <p className="text-xs text-[#6c727a]">
              By submitting, you agree to be contacted about your project inquiry.
            </p>
          </form>
        </article>
      </section>
    </PortfolioShell>
  );
};
