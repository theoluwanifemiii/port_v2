import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfolioShell } from "../../components/PortfolioShell";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Oluwapelumi Adesokan",
    role: "Fullstack Developer",
    company: "Sujimoto Group",
    text: "It was a pleasure working with Oluwanifemi at Motopay. He is a highly skilled professional with strong technical abilities and excellent problem-solving skills. Oluwanifemi consistently delivered high-quality work on our projects and showed remarkable attention to detail. His collaborative nature and positive attitude made him a valuable team member.",
  },
  {
    name: "Oluwafemi Oluwatobi",
    role: "Product Designer",
    company: "Excel Minds",
    text: "I've had the pleasure of working alongside Nifemi, and he's one of the most talented and collaborative designers I've met. His attention to detail, strong UX instincts, and ability to turn complex problems into elegant solutions consistently impressed me. Beyond his design skills, Nifemi is a great team player, always open to feedback and generous with his insights. He'd be an asset to any design team.",
  },
  {
    name: "Timothy Fabiyi",
    role: "Product Manager",
    company: "",
    text: "I had the opportunity to work with Oluwanifemi, and he stood out as a thoughtful and talented product designer. He has a strong sense for clean, user-focused design and consistently brings clarity to complex problems. His ability to balance user needs with business goals makes him a valuable partner in any product team. Beyond his design skills, he's collaborative, receptive to feedback, and always brings positive energy to the team. I'd happily work with him again!",
  },
  {
    name: "Orji Aso",
    role: "Snr. Software Test Engineer",
    company: "Moniepoint",
    text: "I had the pleasure of working closely with Oluwanifemi on the Backoffice project at Motopay. He consistently demonstrated exceptional skills as a Product Designer, contributing significantly to both the design and overall user experience of the platform. One of his key strengths was his ability to collaborate effectively with cross-functional teams. He showed a keen ability to translate complex user requirements into clean, functional designs, was always open to feedback, and we had productive discussions on resolving design-related QA issues. Whenever we encountered a bug or design inconsistency, he worked quickly and iteratively to make improvements — always ensuring the final outcome aligned with both user and business goals.",
  },
  {
    name: "Aduragbemi Abiola",
    role: "Founder · Ex Interswitch",
    company: "Adura Studios",
    text: "It's an absolute joy to witness Oluwanifemi's remarkable growth over the years within the design space. His curiosity, user-centered passion, and collaborative spirit have set him on an extraordinary path. Oluwanifemi's dedication to creating user-centric, delightful experiences and his willingness to learn as well as not internalize feedback is truly commendable. I strongly recommend him for your team and on your projects.",
  },
  {
    name: "Oluwaseyi Adisa",
    role: "Software Engineer",
    company: "",
    text: "Oluwanifemi possesses a unique blend of creativity, technical expertise, and a deep understanding of user-centric design principles. His ability to transform difficult ideas into visually appealing and user-friendly designs is absolutely admirable. Beyond his technical prowess, his drive to stay up to date with the latest design trends and tools is impressive. He continuously seeks opportunities to expand his skill set, which greatly contributes to the innovative and fresh approach he brings to each project.",
  },
];

const capabilities = [
  "Design Systems",
  "Product Strategy",
  "Frontend Development",
  "AI-assisted Development",
  "Rapid Prototyping",
];

const buildingStack = [
  { category: "Design", items: "Figma · FigJam" },
  { category: "Frontend", items: "React · TypeScript · Tailwind CSS · Next.js" },
  { category: "Backend", items: "Node.js · Prisma · PostgreSQL" },
  { category: "AI Workflow", items: "Cursor · Claude · ChatGPT · v0" },
  { category: "Focus", items: "Fintech · B2B SaaS · Internal Tools · Automation · AI Products" },
];

export const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const timer = setTimeout(next, 10000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const t = testimonials[activeIndex];

  return (
    <PortfolioShell contentClassName="max-w-[1000px]">
      <style>{`
        @keyframes slideProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="reveal-up">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">About</p>
          <Link
            to="/work-with-me"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[#151618] no-underline transition-colors hover:bg-[#111214] hover:text-white"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available
          </Link>
        </div>

        <h1 className="section-title mt-6 text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.03em] text-[#111214]">
          I build products that solve difficult problems.
        </h1>
      </section>

      {/* ── Bio + meta ────────────────────────────────────────────────── */}
      <section className="mt-16 grid gap-12 border-t border-black/10 pt-12 lg:grid-cols-[1fr_260px] reveal-up reveal-up-delay-1">
        <div className="space-y-5 text-[15px] leading-[1.7] text-[#595e66]">
          <p>
            I'm{" "}
            <span className="font-medium text-[#111214]">Oluwanifemi Osunsanya</span>, a Product
            Designer and Product Builder who works at the intersection of product strategy, design,
            and engineering.
          </p>
          <p>
            I care less about creating beautiful interfaces than I do about creating products people
            actually use. My work starts long before Figma. I enjoy understanding messy problems,
            questioning assumptions, mapping systems, and designing products that make complex
            workflows feel obvious.
          </p>
          <p>
            Over the past four years, I've designed products across fintech, SaaS, and operational
            software, helping businesses simplify payments, internal operations, customer support,
            and financial workflows. My experience spans everything from consumer payment experiences
            to internal tools, design systems, and products used by operations teams every day.
          </p>
          <p className="font-medium text-[#111214]">
            More recently, I've started building the products I design.
          </p>
          <p>
            Using React, TypeScript, Node.js, AI-assisted development, and modern frontend tools, I
            prototype and ship production-ready experiences myself. Building has fundamentally
            changed how I design. I think more carefully about trade-offs, engineering constraints,
            system architecture, and what it actually takes to move an idea from concept to
            production.
          </p>
          <p>
            I enjoy working with founders because the conversations are rarely about pixels.
            They're about priorities, business models, user behaviour, operational complexity, and
            deciding what deserves to exist in the first place. Design is simply one of the tools I
            use to solve those problems.
          </p>
          <p>
            Right now I'm building{" "}
            <Link
              to="/lab/momentos"
              className="font-medium text-[#111214] underline underline-offset-2"
            >
              MomentOS
            </Link>
            , a celebration automation platform that helps individuals and organizations celebrate
            the people who matter to them through automated reminders, messaging, gifting, and
            shared experiences. It started as a birthday automation tool and evolved into something
            much bigger after speaking with users and discovering the broader problem wasn't
            birthdays, but helping people consistently show up for the people they care about.
          </p>
          <p>
            Beyond product work, I write about product thinking, design systems, AI, and how the
            role of designers is evolving from interface makers into product builders.
          </p>
          <p className="font-medium text-[#111214]">
            I'm looking to work with ambitious startups building products that matter, especially
            teams that value curiosity, speed, systems thinking, and people who are willing to own
            problems from idea to production.
          </p>
        </div>

        <div className="space-y-8 pt-0.5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#9a9fa6]">Experience</p>
            <p className="mt-0.5 text-sm text-[#1a1d22]">4+ years</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#9a9fa6]">Capabilities</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-black/12 bg-[#f4f4f0] px-2.5 py-1 text-[11px] text-[#4f545d]"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#9a9fa6]">Building Stack</p>
            <dl className="mt-2 space-y-3">
              {buildingStack.map(({ category, items }) => (
                <div key={category}>
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-[#b0b4ba]">{category}</dt>
                  <dd className="mt-0.5 text-[12px] leading-relaxed text-[#3a3d44]">{items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="mt-24 reveal-up reveal-up-delay-2">
        <div className="flex min-h-[480px] flex-col border-t border-black/10 pt-10">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Testimonials</p>

          <blockquote
            key={activeIndex}
            className="mt-10 flex-1 text-[clamp(1.35rem,2.4vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[#111214]"
            style={{ animation: "fadeUp 0.45s ease forwards" }}
          >
            {t.text}
          </blockquote>

          {/* Progress bar */}
          <div className="mt-10 h-px overflow-hidden bg-black/10">
            <div
              key={`prog-${activeIndex}`}
              className="h-full origin-left bg-[#111214]"
              style={{ animation: "slideProgress 10s linear forwards" }}
            />
          </div>

          {/* Counter | Arrows | Attribution */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
              {activeIndex + 1} / {testimonials.length}
            </p>

            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-[#111214] transition-colors hover:bg-[#111214] hover:text-white"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-[#111214] transition-colors hover:bg-[#111214] hover:text-white"
              >
                →
              </button>
            </div>

            <div
              key={`attr-${activeIndex}`}
              className="text-right"
              style={{ animation: "fadeUp 0.45s ease forwards" }}
            >
              <p className="text-sm font-medium text-[#111214]">{t.name}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-[#9a9fa6]">
                {t.role}
                {t.company ? ` · ${t.company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PortfolioShell>
  );
};
