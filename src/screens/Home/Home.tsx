import { CSSProperties, FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EMAIL, LINKEDIN_URL, RESUME_URL, SiteHeader } from "../../components/site/SiteChrome";
import { IconArrow, IconExternal } from "../../components/site/icons";
import "./Home.css";

interface WorkRow {
  title: string;
  desc: string;
  outcome?: string;
  meta: string;
  year: string;
  img: string;
  alt: string;
  /** Internal route. */
  to?: string;
  /** External link. */
  href?: string;
  cta: string;
  /** Arrow after the CTA: into a case study, or out to another site. */
  ctaIcon?: "arrow" | "external";
}

const ROWS: WorkRow[] = [
  {
    title: "Digitvant Pay",
    desc: "Full verification before an account meant people left before they saw any value. I led the mobile and web redesign around progressive onboarding, with a shared design system for engineering.",
    outcome: "1K beta users to 10K+ active users",
    meta: "PRODUCT DESIGNER · MOBILE AND WEB BANKING",
    year: "2025",
    img: "/home/digitvant-pay.webp",
    alt: "Digitvant Pay app on a phone",
    to: "/work/digitvant-pay",
    cta: "CASE STUDY",
    ctaIcon: "arrow",
  },
  {
    title: "Plenti",
    desc: "Eleven departments had to coordinate every customer order. I designed the internal platform that connects them, with each team seeing only what its role needs.",
    outcome: "11 modules, 3 role based portals, 150+ screens",
    meta: "OPERATIONS PLATFORM · ROLES · DESIGN SYSTEM",
    year: "2026",
    img: "/home/plenti.webp",
    alt: "Plenti dashboard on a monitor",
    to: "/work/plenti",
    cta: "CASE STUDY",
    ctaIcon: "arrow",
  },
  {
    title: "Vital Swap",
    desc: "Fragmented tools caused delays, repeated tasks and low visibility. I designed one back office for admins, agents and merchants, with clear permissions and role specific views.",
    outcome: "Faster onboarding for staff and agents, fewer errors",
    meta: "BACK OFFICE · THREE ROLES · PERMISSIONS",
    year: "2025",
    img: "/home/vital-swap.webp",
    alt: "Vital Swap back office on a laptop",
    to: "/work/vital-swap",
    cta: "CASE STUDY",
    ctaIcon: "arrow",
  },
  {
    title: "Moto Ride",
    desc: "Three delivery products needed riders without three rider networks. I designed one rider pool and operations platform for MotoBites, Plenti and Mr Meat, with an engine that decides who carries what and shows why.",
    outcome: "One rider pool for 3 services, 17 component design system",
    meta: "OPERATIONS PLATFORM · DISPATCH · DESIGN SYSTEM",
    year: "2026",
    img: "/case/moto-ride/overview.webp",
    alt: "Moto Ride operations overview dashboard",
    to: "/work/moto-ride",
    cta: "CASE STUDY",
    ctaIcon: "arrow",
  },
  {
    title: "One Drug Store",
    desc: "A checkout redesign to reduce friction and build trust at the point of payment.",
    meta: "CHECKOUT · E COMMERCE · CONVERSION",
    year: "2025",
    img: "/home/one-drug-store.jpg",
    alt: "One Drug Store checkout on a phone",
    cta: "CASE STUDY SOON",
  },
  {
    title: "Creative Pay",
    desc: "A UX concept for matching creators with meaningful opportunities.",
    meta: "CONCEPT",
    year: "2023",
    img: "/home/creative-pay.jpg",
    alt: "Creative Pay landing page",
    href: "https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study",
    cta: "BEHANCE",
    ctaIcon: "external",
  },
];

const INTRO_WORDS = ["I", "design", "the", "systems", "behind", "complex", "products"];
const INTRO_SEEN_KEY = "hasSeenHomeIntro";

type Phase = "init" | "hold" | "move" | "done";

function shouldPlayIntro(hash: string): boolean {
  if (hash === "#work") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {
    /* no matchMedia */
  }
  try {
    if (sessionStorage.getItem(INTRO_SEEN_KEY)) return false;
  } catch {
    /* storage blocked: play it */
  }
  return true;
}

/**
 * The headline appears alone, word by word, then travels into its place in
 * the hero while the rest of the page fades in. Plays once per session.
 */
function useIntro(hash: string) {
  const [phase, setPhase] = useState<Phase>(() => (shouldPlayIntro(hash) ? "init" : "done"));
  const [introW, setIntroW] = useState<string>("auto");
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (phase !== "init") return;
    let gone = false;
    const timers: number[] = [];
    const measure = () => {
      if (h1Ref.current) setIntroW(`${h1Ref.current.offsetWidth}px`);
    };

    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      /* ignore */
    }

    timers.push(
      window.setTimeout(() => {
        measure();
        setPhase("hold");
      }, 120)
    );

    const fonts: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const fontsOrTimeout = Promise.race([
      fonts.catch(() => undefined),
      new Promise((r) => timers.push(window.setTimeout(r, 3000))),
    ]);
    const minHold = new Promise((r) => timers.push(window.setTimeout(r, 2000)));

    Promise.all([fontsOrTimeout, minHold]).then(() => {
      if (gone) return;
      measure();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (gone) return;
          if (!h1Ref.current || !introRef.current) {
            setPhase("done");
            return;
          }
          const h = h1Ref.current.getBoundingClientRect();
          const o = introRef.current.getBoundingClientRect();
          setOffset({ dx: Math.round(h.left - o.left), dy: Math.round(h.top - o.top) });
          setPhase("move");
          timers.push(window.setTimeout(() => setPhase("done"), 1050));
        })
      );
    });

    return () => {
      gone = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
    // Runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { phase, introW, offset, h1Ref, introRef };
}

const RowLink: FC<{
  row: WorkRow;
  className: string;
  onEnter: () => void;
  children: ReactNode;
}> = ({ row, className, onEnter, children }) => {
  const handlers = { onMouseEnter: onEnter, onFocus: onEnter };
  if (row.to) {
    return (
      <Link to={row.to} className={className} {...handlers}>
        {children}
      </Link>
    );
  }
  if (row.href) {
    return (
      <a href={row.href} target="_blank" rel="noopener noreferrer" className={className} {...handlers}>
        {children}
      </a>
    );
  }
  return (
    <div className={className} onMouseEnter={onEnter}>
      {children}
    </div>
  );
};

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export const Home: FC = () => {
  const location = useLocation();
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const { phase, introW, offset, h1Ref, introRef } = useIntro(location.hash);

  // Arriving from another page via "Work" lands on /#work: scroll to the list.
  useLayoutEffect(() => {
    if (location.hash !== "#work") return;
    const id = window.setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ block: "start" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [location.hash]);

  return (
    <div className="d4 d4-home">
      <div className="first" data-phase={phase}>
        {phase !== "done" && (
          <div className="intro" data-phase={phase} aria-hidden="true">
            <p
              ref={introRef}
              className="intro-text"
              style={{ width: introW, transform: `translate(${offset.dx}px, ${offset.dy}px)` }}
            >
              {INTRO_WORDS.map((word, i) => (
                <span key={word}>
                  <span className="iw" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                  {i < INTRO_WORDS.length - 1 ? " " : ""}
                </span>
              ))}
              <span className="intro-rest">, then build them into software people can use.</span>
            </p>
          </div>
        )}

        <SiteHeader onHome className="rv" style={delay("0s")} />

        {/* Hero: portrait anchors, text leads */}
        <section className="wrap hero-section">
          <div className="hero">
            <figure className="hero-fig rv" style={delay(".08s")}>
              <img
                src="/home/olu-portrait.jpg"
                alt="Black and white studio portrait of Olu Osunsanya"
                width={960}
                height={1200}
              />
              <figcaption className="mono">
                <span>OLU · LAGOS, NG</span>
                <span>FIG. 01</span>
              </figcaption>
            </figure>

            <div className="hero-copy">
              <p className="mono eyebrow rv" style={delay(".5s")}>
                PRODUCT DESIGNER WHO BUILDS
              </p>
              <h1 ref={h1Ref} className="hero-h1">
                I design the systems behind complex products
                <span className="h1-rest">
                  , then build them into software <span className="soft">people can use.</span>
                </span>
              </h1>
              <p className="hero-body rv" style={delay(".6s")}>
                I work across product design and engineering, building fintech and B2B products
                around complex workflows, permissions and operational needs. From defining the
                experience to implementing the interface, I help teams turn messy problems into
                software they can ship. I'm also building MomentOS and Fig2MD.
              </p>
              <div className="hero-ctas rv" style={delay(".7s")}>
                <a href="#work" className="d4-btn">
                  See the work
                </a>
                <Link to="/contact" className="ulink with-ico" style={{ fontSize: 15, fontWeight: 500 }}>
                  Let's talk about your product <IconArrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Selected work */}
      <section id="work" className="wrap work">
        <div className="mono work-head">
          <h2>(01) SELECTED WORK</h2>
          <span className="muted">2023 TO 2026</span>
        </div>

        <div onMouseLeave={() => setActiveRow(null)}>
          {ROWS.map((row, i) => {
            const dimmed = activeRow !== null && activeRow !== i;
            return (
              <RowLink
                key={row.title}
                row={row}
                className={`row${dimmed ? " is-dimmed" : ""}`}
                onEnter={() => setActiveRow(i)}
              >
                <span className="mono row-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="row-main">
                  <span className="row-title">{row.title}</span>
                  <span className="row-desc">{row.desc}</span>
                  {row.outcome && (
                    <span className="row-outcome">
                      <span className="mono k">OUTCOME</span>
                      <span className="v">{row.outcome}</span>
                    </span>
                  )}
                  <span className="mono row-meta">{row.meta}</span>
                  <img className="m-thumb" src={row.img} alt={row.alt} loading="lazy" />
                </span>
                <span className="mono row-side">
                  <span className="muted">{row.year}</span>
                  <span className="row-cta with-ico">
                    {row.cta}
                    {row.ctaIcon === "arrow" && <IconArrow />}
                    {row.ctaIcon === "external" && <IconExternal />}
                  </span>
                </span>
                {activeRow === i && <img className="peek" src={row.img} alt="" />}
              </RowLink>
            );
          })}
        </div>
      </section>

      {/* Personal */}
      <section className="wrap offclock">
        <div className="offclock-inner">
          <h2 className="mono">(02) OFF THE CLOCK</h2>
          <p>
            Long Sunday runs, a properly smoky <span>jollof</span>, loud{" "}
            <span>Arsenal matchdays</span> and <span>teaching</span> what I learn, out loud.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="wrap contact">
        <div className="contact-inner">
          <div className="contact-lead">
            <p className="mono eyebrow">(03) CONTACT</p>
            <p className="balance contact-title">Have a product that needs untangling? Let's talk.</p>
            <a href={`mailto:${EMAIL}`} className="ulink contact-email">
              {EMAIL}
            </a>
          </div>
          <div className="mono socials">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LINKEDIN <IconExternal />
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              RESUME <IconExternal />
            </a>
          </div>
        </div>
      </section>

      <footer className="wrap mono d4-footer">
        <div>
          <span>© 2026 OLUWANIFEMI OSUNSANYA</span>
          <span>DESIGNED AND BUILT BY OLU</span>
        </div>
      </footer>
    </div>
  );
};
