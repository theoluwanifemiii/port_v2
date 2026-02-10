import React from "react";
import { PortfolioShell } from "../../components/PortfolioShell";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  text: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Oluwafemi Oluwatobi",
    role: "Product Designer",
    company: "Teckholic",
    text: "Nifemi is one of the most talented and collaborative designers I have worked with. His UX instincts and ability to simplify complex product challenges consistently stand out.",
  },
  {
    name: "Timothy Fabiyi",
    role: "Product Manager",
    company: "",
    text: "He brings clarity to complex problems, balances user needs with business goals, and is a strong cross-functional partner throughout the design process.",
  },
  {
    name: "Oluseyi Adisa",
    role: "Frontend Engineer",
    company: "",
    text: "Oluwanifemi combines creativity with practical execution. His design solutions are thoughtful, implementation-friendly, and focused on real user outcomes.",
  },
];

const profileItems = [
  ["Experience", "3+ years across fintech, SaaS, healthtech"],
  ["Core Skills", "UX strategy, interaction design, design systems"],
  ["Tools", "Figma, FigJam, Framer, Notion, Miro"],
  ["Current Focus", "Clear workflows for high-stakes product actions"],
];

const TestimonialCard = ({ name, role, company, text }: TestimonialProps) => (
  <article className="hairline-card rounded-2xl p-5">
    <div className="flex items-center gap-3 border-b border-black/10 pb-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#151618] text-sm text-white">
        {name.charAt(0)}
      </span>
      <div>
        <p className="text-sm font-medium text-[#151618]">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#686d75]">
          {role}
          {company ? ` · ${company}` : ""}
        </p>
      </div>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-[#575c64]">{text}</p>
  </article>
);

export const About = () => {
  return (
    <PortfolioShell contentClassName="max-w-[980px]">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] reveal-up">
        <article>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">About</p>
          <h1 className="section-title mt-3 text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
            Designing products people trust when every click matters.
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#595e66]">
            <p>
              I am Oluwanifemi Osunsanya, a product designer focused on clarity,
              consistency, and execution. I work at the intersection of UX strategy,
              interaction design, and business impact.
            </p>
            <p>
              My recent work includes fintech back offices, internet banking redesigns,
              and operations-heavy admin products where usability directly affects speed and
              confidence.
            </p>
            <p>
              Outside product teams, I build visual experiments and poster concepts to keep
              my design instincts sharp.
            </p>
          </div>
        </article>

        <aside className="hairline-card rounded-3xl p-6">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e737b]">Profile snapshot</p>
          <div className="mt-5 space-y-4">
            {profileItems.map(([label, value]) => (
              <div key={label} className="border-b border-black/10 pb-3 last:border-b-0 last:pb-0">
                <p className="text-[11px] uppercase tracking-[0.1em] text-[#6d7279]">{label}</p>
                <p className="mt-1 text-sm text-[#1a1d22]">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-12 border-t border-black/10 pt-8 reveal-up reveal-up-delay-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[#151618]">Testimonials</p>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">People I worked with</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>
    </PortfolioShell>
  );
};
