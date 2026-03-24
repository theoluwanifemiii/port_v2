import React, { useState } from "react";
import { PortfolioShell } from "../../components/PortfolioShell";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
      "I've had the pleasure of working alongside Nifemi. His UX instincts and ability to turn complex product problems into elegant solutions always stood out.",
    name: "Oluwafemi Oluwatobi",
    role: "Product Designer",
    company: "Teckholic",
  },
  {
    quote:
      "He brings clarity to complex problems and balances user needs with business goals. He is a strong partner across product and engineering.",
    name: "Timothy Fabiyi",
    role: "Product Manager",
  },
  {
    quote:
      "Oluwanifemi combines creativity and practical execution. His solutions are thoughtful, implementation-friendly, and focused on real user outcomes.",
    name: "Oluseyi Adisa",
    role: "Frontend Engineer",
  },
  {
    quote:
      "His curiosity, collaboration style, and user-centered mindset consistently elevate projects. I highly recommend him for product teams.",
    name: "Aduragbemi Abiola",
    role: "Product Designer",
    company: "Interswitch",
  },
];

export const WorkWithMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        "https://uwcrhwvsogxdyzxyuhtr.supabase.co/functions/v1/send-contact-email",
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

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        project: "",
        budget: "",
      });
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

      <section className="mt-8 grid gap-4 overflow-x-hidden reveal-up reveal-up-delay-1 lg:flex lg:items-start">
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
                  <div className="mt-2 min-h-0 overflow-hidden max-h-[180px] sm:max-h-[200px] lg:max-h-[220px]">
                    <p
                      className="break-words text-2xl leading-[1.24] text-[#17191d] lg:text-[2rem]"
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
