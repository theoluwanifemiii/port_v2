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

const meta: [string, string][] = [
  ["Role", "Product Designer"],
  ["Experience", "3+ years"],
  ["Focus", "Fintech · SaaS · Healthtech"],
  ["Tools", "Figma · Framer · Notion"],
];

export const About = () => (
  <PortfolioShell contentClassName="max-w-[1000px]">

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
        Building digital products that solve real problems.
      </h1>
    </section>

    {/* ── Bio + meta ────────────────────────────────────────────────── */}
    <section className="mt-16 grid gap-12 border-t border-black/10 pt-12 lg:grid-cols-[1fr_200px] reveal-up reveal-up-delay-1">
      <div className="space-y-5 text-[15px] leading-[1.7] text-[#595e66]">
        <p>
          I'm{" "}
          <span className="font-medium text-[#111214]">Oluwanifemi</span>, a product designer
          focused on building digital products that solve real problems. My work sits at the
          intersection of design, product thinking, and execution. I care deeply about how products
          work, not just how they look.
        </p>
        <p>
          Over the last few years, I've worked across fintech and digital platforms, designing
          experiences that help people move money, make decisions, and interact with complex systems
          more easily. I enjoy tackling messy problems, simplifying workflows, and turning ideas
          into products that can actually ship.
        </p>
        <p>
          My approach to design is grounded in momentum. Great ideas don't matter if they never
          make it to users, so I focus on reducing the distance between concept and production.
          That means collaborating closely with engineers, thinking in systems, and designing
          solutions that are practical to build and scale.
        </p>
        <p>
          Beyond interfaces, I'm interested in how products evolve over time — structure, clarity,
          and design systems that allow teams to move faster without sacrificing quality.
        </p>
        <p>
          When I'm not designing, I spend time writing about product thinking, reflecting on how
          the role of designers is changing, and exploring how AI and new tools are reshaping the
          way we build products.
        </p>
        <p className="font-medium text-[#111214]">
          I'm currently open to working with startups and teams that value thoughtful design, fast
          execution, and products that genuinely improve people's lives.
        </p>
      </div>

      <dl className="space-y-4 pt-0.5">
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#9a9fa6]">{label}</dt>
            <dd className="mt-0.5 text-sm text-[#1a1d22]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* ── Photos (coming soon) ──────────────────────────────────────── */}
    {/* <section className="mt-16 reveal-up reveal-up-delay-2">
      <div
        className="grid grid-cols-4 gap-3"
        style={{ gridTemplateRows: "repeat(2, 220px)" }}
      >
        {bentoSpans.map((span, i) => (
          <div key={i} className={`${span} overflow-hidden rounded-2xl bg-[#deded9]`}>
            <img
              src={photos[i]?.src}
              alt={photos[i]?.alt}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section> */}

    {/* ── Testimonials ──────────────────────────────────────────────── */}
    <section className="mt-20 reveal-up reveal-up-delay-2">
      <div className="flex items-baseline justify-between border-t border-black/10 pt-8">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">What people say</p>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9fa6]">
          {testimonials.length} testimonials
        </p>
      </div>

      <div className="mt-2">
        {testimonials.map((t) => (
          <div key={t.name} className="border-t border-black/10 py-8 last:border-b lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
            <p className="text-[15px] leading-[1.7] text-[#595e66] lg:max-w-xl">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="mt-4 lg:mt-0 lg:pt-0.5">
              <p className="text-sm font-medium text-[#111214]">{t.name}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-[#9a9fa6]">
                {t.role}
                {t.company ? ` · ${t.company}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

  </PortfolioShell>
);
