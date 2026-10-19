import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAvailability } from "../../hooks/useAvailability";
import "./site.css";

export const EMAIL = "Olu@olusworks.xyz";
export const LINKEDIN_URL = "https://www.linkedin.com/in/oluwanifemiosunsanya/";
export const RESUME_URL =
  "https://drive.google.com/file/d/1ECIrky5LKSqD7UoULMbYi7zt35m3VXe9/view?usp=sharing";

type NavKey = "work" | "about" | "contact";

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

export function useLagosTime(): string {
  const [time, setTime] = useState(lagosTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(lagosTime()), 30000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export const AvailabilityStatus: FC = () => {
  const availability = useAvailability();
  const label =
    availability.status === "loading" ? "Available for projects" : availability.label;
  return (
    <Link to="/contact" className="status">
      <span className={`dot dot-${availability.status}`} aria-hidden="true" />
      {label}
    </Link>
  );
};

/** Links to the Selected work list on Home. On Home itself it stays an in-page anchor. */
const WorkLink: FC<{ onHome: boolean; className?: string; onClick?: () => void; children: ReactNode; current?: boolean }> = ({
  onHome,
  className,
  onClick,
  children,
  current,
}) =>
  onHome ? (
    <a href="#work" className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to="/#work" className={className} onClick={onClick} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );

interface SiteHeaderProps {
  active?: NavKey;
  onHome?: boolean;
  /** Hide the clock (the case study header shows only the status). */
  showClock?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SiteHeader: FC<SiteHeaderProps> = ({
  active,
  onHome = false,
  showClock = true,
  className = "",
  style,
}) => {
  const time = useLagosTime();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Lock page scroll and let Escape close while the mobile menu is open.
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

  const cur = (key: NavKey) => (active === key ? "page" : undefined);

  return (
    <>
      <header className={`wrap d4-header ${className}`} style={style}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Link to="/" className="brand">
            olu.
          </Link>
          <nav aria-label="Primary" className="mono d-nav">
            <WorkLink onHome={onHome} current={active === "work"}>
              Work
            </WorkLink>
            <Link to="/about" aria-current={cur("about")}>
              About
            </Link>
            <Link to="/contact" aria-current={cur("contact")}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="d-status">
          {showClock && <span className="mono clock">{time} · Lagos, NG</span>}
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
            <WorkLink onHome={onHome} className="m-link" onClick={closeMenu} current={active === "work"}>
              <span className="m-num">01</span>Work
            </WorkLink>
            <Link to="/about" className="m-link" onClick={closeMenu} aria-current={cur("about")}>
              <span className="m-num">02</span>About
            </Link>
            <Link to="/contact" className="m-link" onClick={closeMenu} aria-current={cur("contact")}>
              <span className="m-num">03</span>Contact
            </Link>
          </nav>
          <div className="m-foot">
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
    </>
  );
};

export const SiteFooter: FC<{ right?: ReactNode }> = ({ right = "DESIGNED AND BUILT BY OLU" }) => (
  <footer className="wrap mono d4-footer">
    <div>
      <span>© 2026 OLUWANIFEMI OSUNSANYA</span>
      <span>{right}</span>
    </div>
  </footer>
);
