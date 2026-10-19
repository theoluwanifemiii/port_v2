import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAvailability } from "../../hooks/useAvailability";
import "./Home.css";

const EMAIL = "Olu@olusworks.xyz";

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
    cta: "CASE STUDY →",
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
    cta: "CASE STUDY →",
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
    cta: "CASE STUDY →",
  },
  {
    title: "Motobills Admin",
    desc: "Key inventory actions took several manual steps. I designed an inventory module with instant balance visibility and reliable paths for restocking and pricing.",
    outcome: "Faster restocking across core bill categories",
    meta: "ADMIN UX · INVENTORY · FINTECH",
    year: "2024",
    img: "/home/motobills.webp",
    alt: "Motobills dashboard on a laptop",
    to: "/work/motobills",
    cta: "CASE STUDY →",
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
    cta: "BEHANCE ↗",
  },
];

function lagosTime(): string {
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: "Africa/Lagos",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function useLagosTime(): string {
  const [time, setTime] = useState(lagosTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(lagosTime()), 30000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const AvailabilityStatus: FC = () => {
  const availability = useAvailability();
  const label =
    availability.status === "loading" ? "Available for projects" : availability.label;
  return (
    <Link to="/work-with-me" className="status">
      <span className={`dot dot-${availability.status}`} aria-hidden="true" />
      {label}
    </Link>
  );
};

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

export const Home: FC = () => {
  const time = useLagosTime();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="d4-home">
      <div className="first">
        {/* Navigation */}
        <header className="wrap d4-header">
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <Link to="/" className="brand">
              olu.
            </Link>
            <nav aria-label="Primary" className="mono d-nav">
              <a href="#work">Work</a>
              <Link to="/about">About</Link>
              <Link to="/work-with-me">Contact</Link>
            </nav>
          </div>
          <div className="d-status">
            <span className="mono muted" style={{ fontSize: 12, letterSpacing: "0.02em" }}>
              {time} · Lagos, NG
            </span>
            <AvailabilityStatus />
          </div>
          <button
            type="button"
            className="m-menu-btn"
            aria-controls="m-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            MENU
          </button>
        </header>

        {menuOpen && (
          <div id="m-menu" className="m-menu" role="dialog" aria-modal="true" aria-label="Site menu">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link to="/" className="brand" onClick={closeMenu}>
                olu.
              </Link>
              <button type="button" className="m-menu-btn" onClick={closeMenu} autoFocus>
                CLOSE
              </button>
            </div>
            <nav aria-label="Mobile" className="m-nav">
              <a href="#work" className="m-link" onClick={closeMenu}>
                <span className="m-num">01</span>Work
              </a>
              <Link to="/about" className="m-link" onClick={closeMenu}>
                <span className="m-num">02</span>About
              </Link>
              <Link to="/work-with-me" className="m-link" onClick={closeMenu}>
                <span className="m-num">03</span>Contact
              </Link>
            </nav>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 48,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <AvailabilityStatus />
              <a
                href={`mailto:${EMAIL}`}
                className="ulink"
                style={{ alignSelf: "flex-start", fontSize: 20, letterSpacing: "-0.02em" }}
              >
                {EMAIL}
              </a>
              <span className="mono muted" style={{ fontSize: 12, letterSpacing: "0.04em" }}>
                {time} · LAGOS, NG
              </span>
            </div>
          </div>
        )}

        {/* Hero: portrait anchors, text leads */}
        <section className="wrap hero-section">
          <div className="hero">
            <figure className="hero-fig">
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
              <p className="mono eyebrow">PRODUCT DESIGNER WHO BUILDS</p>
              <h1 className="balance">
                I design the systems behind complex products, then build them into software{" "}
                <span>people can use.</span>
              </h1>
              <p className="hero-body">
                I work across product design and engineering, building fintech and B2B products
                around complex workflows, permissions and operational needs. From defining the
                experience to implementing the interface, I help teams turn messy problems into
                software they can ship. I'm also building MomentOS and Fig2MD.
              </p>
              <div className="hero-ctas">
                <a href="#work" className="d4-btn">
                  See the work
                </a>
                <Link to="/work-with-me" className="ulink" style={{ fontSize: 15, fontWeight: 500 }}>
                  Let's talk about your product →
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
                      <span className="mono label">OUTCOME</span>
                      <span className="value">{row.outcome}</span>
                    </span>
                  )}
                  <span className="mono row-meta">{row.meta}</span>
                  <img className="m-thumb" src={row.img} alt={row.alt} loading="lazy" />
                </span>
                <span className="mono row-side">
                  <span className="muted">{row.year}</span>
                  <span className="row-cta">{row.cta}</span>
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

      {/* Contact and footer */}
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
            <a
              href="https://www.linkedin.com/in/oluwanifemiosunsanya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
            <a
              href="https://drive.google.com/file/d/1ECIrky5LKSqD7UoULMbYi7zt35m3VXe9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESUME ↗
            </a>
          </div>
        </div>
        <div className="mono footer">
          <span>© 2026 OLUWANIFEMI OSUNSANYA</span>
          <span>DESIGNED AND BUILT BY OLU</span>
        </div>
      </section>
    </div>
  );
};
