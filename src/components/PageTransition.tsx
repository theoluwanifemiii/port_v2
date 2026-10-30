import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { projectCaseStudies } from "../data/projects";

/**
 * Route transition: a white sheet that names the destination, then lifts away.
 *
 *  - The sheet already covers the screen on the first frame of the new route,
 *    so the page swap underneath is never seen. A mono label for the
 *    destination fades in, a hairline draws under it, and the sheet lifts
 *    upwards (a hairline marks its edge) to reveal the page. About one second in all.
 *  - Non-blocking: the new page renders immediately underneath, and the
 *    overlay never takes pointer events.
 *  - Interruptible: keyed to the route, so a second navigation restarts it.
 *  - Skipped on the first page load (the preloader and Home intro own that
 *    moment) and for people who prefer reduced motion.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const LINE_DRAW = 0.45;
const LIFT_START = 0.5;
const LIFT_DURATION = 0.6;

const NAMED: Record<string, string> = {
  "/": "(HOME)",
  "/work": "(WORK)",
  "/about": "(ABOUT)",
  "/contact": "(CONTACT)",
  "/work-with-me": "(CONTACT)",
  "/lab": "(LAB)",
  "/archive": "(ARCHIVE)",
};

function labelFor(path: string): string {
  const clean = path.replace(/\/+$/, "") || "/";
  if (NAMED[clean]) return NAMED[clean];
  const caseMatch = clean.match(/^\/work\/([^/]+)$/);
  if (caseMatch) {
    const title = projectCaseStudies[caseMatch[1]]?.title;
    return title ? `(CASE STUDY) ${title.toUpperCase()}` : "(WORK)";
  }
  const last = clean.split("/").pop() ?? "";
  return `(${last.replace(/[-_]+/g, " ").toUpperCase()})`;
}

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export const PageTransition = ({ children, routeKey }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();
  // The route the app opened on: no transition for that one.
  const [firstKey] = React.useState(routeKey);
  const show = !shouldReduceMotion && routeKey !== firstKey;

  return (
    <>
      {show && <RouteSheet key={routeKey} label={labelFor(routeKey)} />}
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </>
  );
};

const RouteSheet = ({ label }: { label: string }) => (
  <motion.div
    className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center border-b border-[#191919] bg-white"
    aria-hidden="true"
    initial={{ y: "0%" }}
    animate={{ y: "-101%" }}
    transition={{ delay: LIFT_START, duration: LIFT_DURATION, ease: EASE_IN_OUT }}
  >
    <motion.div
      className="flex w-[min(320px,70vw)] flex-col items-start gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -24] }}
      transition={{
        duration: LIFT_START + LIFT_DURATION,
        times: [0, 0.2, LIFT_START / (LIFT_START + LIFT_DURATION), 1],
        ease: EASE_OUT,
      }}
    >
      <span
        className="text-[12px] tracking-[0.06em] text-[#191919]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {label}
      </span>
      <motion.span
        className="block h-px w-full origin-left bg-[#191919]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: LINE_DRAW, ease: EASE_OUT }}
      />
    </motion.div>
  </motion.div>
);
