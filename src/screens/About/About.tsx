import { FC } from "react";
import { Link } from "react-router-dom";
import { LINKEDIN_URL, RESUME_URL, SiteFooter, SiteHeader } from "../../components/site/SiteChrome";
import "./About.css";

const PRINCIPLES = [
  {
    title: "People before pixels",
    body: "I start with how the work actually gets done: who touches it, where it breaks, and what each role needs to see.",
  },
  {
    title: "Systems, not screens",
    body: "Roles, permissions, states and edge cases first, so every screen is a view of one coherent system.",
  },
  {
    title: "Design it, then build it",
    body: "I take designs into working React, so the handoff is short and the product stays true to the decisions behind it.",
  },
];

const CAPABILITIES = [
  {
    label: "WHAT I DO",
    items: ["Product design", "Product strategy", "UX audits", "Design systems", "Frontend development"],
  },
  {
    label: "INDUSTRIES",
    items: ["Fintech and banking", "Payments", "B2B SaaS", "Internal tools", "Healthcare"],
  },
  {
    label: "TOOLS",
    items: [
      "Figma and Framer",
      "React and Next.js",
      "TypeScript and Tailwind",
      "Node.js and PostgreSQL",
      "Claude, Cursor and v0",
    ],
  },
];

const QUOTES = [
  {
    quote:
      "He has a strong sense for clean, user-focused design and consistently brings clarity to complex problems.",
    name: "Timothy Fabiyi",
    role: "PRODUCT MANAGER",
  },
  {
    quote:
      "He showed a keen ability to translate complex user requirements into clean, functional designs…",
    name: "Orji Aso",
    role: "SNR. SOFTWARE TEST ENGINEER · MONIEPOINT",
  },
  {
    quote:
      "Oluwanifemi consistently delivered high-quality work on our projects and showed remarkable attention to detail.",
    name: "Oluwapelumi Adesokan",
    role: "FULLSTACK DEVELOPER · SUJIMOTO GROUP",
  },
];

export const About: FC = () => (
  <div className="d4 d4-about">
    <SiteHeader active="about" />

    <main className="wrap">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-grid">
          <div className="about-copy">
            <p className="mono eyebrow">(ABOUT)</p>
            <h1 className="balance">
              A designer <span className="soft">who builds.</span>
            </h1>
            <p className="lead">
              I design products by starting with people, not pixels. Most of my work lives in
              complex operational spaces: internal dashboards, fintech admin logic, permission
              models and the structured workflows teams depend on.
            </p>
            <p className="body">
              Over four years I have designed across banking, payments, insurance, healthcare and
              SaaS, helping startups move from idea to shipped product. I work across strategy, UX
              and frontend, and I ship production ready interfaces in React and TypeScript. Right
              now I'm building MomentOS as its only designer and engineer, and running OlusWorks,
              my independent practice.
            </p>
            <div className="ctas">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="d4-btn">
                View resume
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ulink"
                style={{ fontSize: 15, fontWeight: 500 }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
          <figure className="hero-fig">
            <img
              src="/about/olu-seated.jpg"
              alt="Black and white studio photo of Olu seated on a wooden chair"
            />
            <figcaption className="mono">
              <span>OLU · LAGOS, NG</span>
              <span>FIG. 02</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How I work */}
      <section className="sec">
        <h2 className="label">(01) HOW I WORK</h2>
        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <span className="mono muted" style={{ fontSize: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Capabilities */}
      <section className="sec">
        <h2 className="label">(02) CAPABILITIES</h2>
        <div className="caps">
          {CAPABILITIES.map((group) => (
            <div key={group.label}>
              <span className="mono eyebrow">{group.label}</span>
              <p>
                {group.items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < group.items.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kind words */}
      <section className="sec">
        <h2 className="label">(03) KIND WORDS</h2>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure key={q.name} className="quote">
              <blockquote>“{q.quote}”</blockquote>
              <figcaption>
                <span className="who">{q.name}</span>
                <span className="mono role">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Off the clock */}
      <section className="sec">
        <h2 className="label">(04) OFF THE CLOCK</h2>
        <p className="offclock-big">
          Long Sunday runs, a properly smoky <span className="ink">jollof</span>, loud{" "}
          <span className="ink">Arsenal matchdays</span> and <span className="ink">teaching</span>{" "}
          what I learn, out loud.
        </p>
      </section>

      {/* Contact */}
      <section className="about-contact">
        <div className="contact-lead">
          <p className="mono eyebrow">(05) CONTACT</p>
          <p className="balance contact-title">Have a product that needs untangling? Let's talk.</p>
        </div>
        <Link to="/contact" className="d4-btn">
          Start a conversation
        </Link>
      </section>
    </main>

    <SiteFooter />
  </div>
);
