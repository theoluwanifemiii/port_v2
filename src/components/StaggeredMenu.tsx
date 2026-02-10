import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  className?: string;
}

const isExternalLink = (link: string) =>
  /^https?:\/\//i.test(link) || link.startsWith("mailto:") || link.startsWith("tel:") || link.startsWith("//");

const EASE_PANEL = [0.2, 0.9, 0.2, 1] as const;
const EASE_ITEM = [0.2, 0.85, 0.2, 1] as const;

export default function StaggeredMenu({
  position = "right",
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = "#f7f7f3",
  openMenuButtonColor = "#f7f7f3",
  changeMenuColorOnOpen = true,
  colors = ["#151618", "#0b0b10"],
  logoUrl,
  accentColor = "#0054e3",
  onMenuOpen,
  onMenuClose,
  className,
}: StaggeredMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const menuId = useId();
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  // Close on route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Scroll lock + escape key handling while menu is open.
  useEffect(() => {
    if (!isOpen) return;
    onMenuOpen?.();

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const t = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      onMenuClose?.();
    };
  }, [isOpen, onMenuClose, onMenuOpen]);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  const gradient = useMemo(() => {
    if (!colors || colors.length === 0) return "#151618";
    if (colors.length === 1) return colors[0];
    return `linear-gradient(135deg, ${colors.join(", ")})`;
  }, [colors]);

  const panelEdge = position === "right" ? "right-0" : "left-0";
  const panelFrom = position === "right" ? "100%" : "-100%";

  const containerVariants = useMemo<Variants>(
    () => ({
      closed: {
        opacity: 0,
        transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2, when: "afterChildren" as const },
      },
      open: {
        opacity: 1,
        transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.28, when: "beforeChildren" as const },
      },
    }),
    [shouldReduceMotion]
  );

  const menuVariants = useMemo<Variants>(
    () => ({
      closed: {
        x: panelFrom,
        transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_PANEL },
      },
      open: {
        x: "0%",
        transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_PANEL },
      },
    }),
    [panelFrom, shouldReduceMotion]
  );

  const listVariants = useMemo<Variants>(
    () => ({
      closed: { transition: { staggerChildren: 0, staggerDirection: -1 } },
      open: { transition: shouldReduceMotion ? undefined : { staggerChildren: 0.06, delayChildren: 0.15 } },
    }),
    [shouldReduceMotion]
  );

  const itemVariants = useMemo<Variants>(
    () => ({
      closed: { opacity: 0, y: 16 },
      open: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_ITEM },
      },
    }),
    [shouldReduceMotion]
  );

  const buttonInk = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  const overlay = portalEl
    ? createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key={`staggered-menu-${menuId}`}
              className="fixed inset-0 z-[99999]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={containerVariants}
              aria-hidden={false}
            >
              <div className="absolute inset-0 bg-black/55" onClick={close} />

              <motion.aside
                className={`absolute top-0 ${panelEdge} h-full w-[92vw] max-w-[420px] overflow-hidden border-l border-white/10 bg-[#0b0b10] shadow-[0_40px_120px_rgba(0,0,0,0.6)]`}
                variants={menuVariants}
                role="dialog"
                aria-modal="true"
                id={`staggered-menu-panel-${menuId}`}
                aria-label="Mobile navigation"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 opacity-90" style={{ background: gradient }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.35),transparent_60%)]" />

                <div className="relative flex h-full flex-col p-3">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#f7f7f3] px-6 pb-8 pt-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ background: gradient }} />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt=""
                            className="h-10 w-10 rounded-xl border border-black/10 object-cover"
                          />
                        ) : (
                          <div className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-[#151618] text-xs font-semibold text-[#f7f7f3]">
                            Menu
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#6a6f76]">Navigate</p>
                          <p className="text-sm font-medium text-[#151618]">Olu's Portfolio</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={close}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#151618] text-[#f7f7f3]"
                        aria-label="Close menu"
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path
                            d="M5 5L15 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M15 5L5 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>

                  <motion.ul className="mt-10 space-y-2" variants={listVariants} initial={false}>
                    {items.map((item, idx) => {
                      const numbering = displayItemNumbering ? (
                        <span className="mr-3 inline-flex w-7 justify-end text-[11px] font-semibold tracking-[0.18em] text-[#6a6f76]">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      ) : null;

                      const commonClass =
                        "group flex w-full items-center rounded-2xl px-3 py-3 text-left text-2xl font-semibold tracking-[-0.03em] text-[#151618] no-underline transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10";

                      const label = (
                        <span className="inline-flex items-center gap-3">
                          {numbering}
                          <span className="relative">
                            <span className="relative z-10">{item.label}</span>
                            <span
                              className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white/90 transition-[width] duration-300 group-hover:w-full"
                              style={{ backgroundColor: accentColor }}
                            />
                          </span>
                        </span>
                      );

                      return (
                        <motion.li key={item.link} variants={itemVariants}>
                          {isExternalLink(item.link) ? (
                            <a
                              ref={idx === 0 ? firstLinkRef : undefined}
                              href={item.link}
                              className={commonClass}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={item.ariaLabel || item.label}
                              onClick={close}
                            >
                              {label}
                            </a>
                          ) : (
                            <Link
                              ref={idx === 0 ? (firstLinkRef as any) : undefined}
                              to={item.link}
                              className={commonClass}
                              aria-label={item.ariaLabel || item.label}
                              onClick={close}
                            >
                              {label}
                            </Link>
                          )}
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  {displaySocials && socialItems.length > 0 ? (
                    <div className="mt-auto pt-8">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#6a6f76]">Links</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {socialItems.map((s) => (
                          <a
                            key={s.link}
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-black/10 bg-[#151618] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f7f7f3] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto pt-8" />
                  )}
                </div>
                </div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        portalEl
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#151618]/20 bg-[#151618] transition-colors hover:bg-black ${className || ""}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={`staggered-menu-panel-${menuId}`}
        style={{ color: buttonInk }}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <div className="relative h-4 w-4">
          <motion.span
            className="absolute left-0 top-[3px] h-[2px] w-4 rounded bg-current"
            animate={isOpen ? { rotate: 45, top: "7px" } : { rotate: 0, top: "3px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }}
          />
          <motion.span
            className="absolute left-0 top-[9px] h-[2px] w-4 rounded bg-current"
            animate={isOpen ? { rotate: -45, top: "7px" } : { rotate: 0, top: "9px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }}
          />
        </div>
      </button>
      {overlay}
    </>
  );
}
