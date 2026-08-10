import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * Route transition — the wipe + philosophy quote.
 *
 * This is not dead time to minimize — it's the moment someone reads your
 * design philosophy in your own words, and it's meant to be sat with, not
 * rushed through. The whole sequence runs ~3.4s: enough to read both lines
 * at a normal pace, let them land, and then watch the next page arrive.
 *
 *  - Non-blocking. `children` render immediately on every route change —
 *    the overlay is a purely decorative layer on top, `pointer-events: none`
 *    throughout. The new page is already there and scrollable/interactive
 *    the instant it mounts; nobody's input is ever held up by this — the
 *    length is a deliberate choice, not latency.
 *  - Interruptible. The overlay is keyed to `routeKey`, so a second
 *    navigation mid-sequence unmounts the old timeline outright and starts
 *    the new one clean — no queued animations, no stale state.
 *  - Reduced motion. Skips the overlay entirely; content still swaps
 *    instantly underneath.
 *
 * Sequence: the panel is already covering the screen at first paint (no
 * animated entrance — the swap underneath is invisible), the quote fades
 * in slowly, holds for a full 2 seconds, then begins fading out as the
 * columns wipe away in the same downward direction they always have,
 * revealing the page that's been sitting there the whole time.
 */

const WIPE_COLUMN_COUNT = 6;
const wipeColumns = Array.from({ length: WIPE_COLUMN_COUNT }, (_, i) => i);

const philosophyQuotes = [
  {
    quote: "Design that works, not just design that looks good.",
    subquote:
      "I design products that are clear, scalable, and measurable - where user experience and business impact move together.",
  },
  {
    quote: "Good design should disappear into the experience.",
    subquote: "Clarity and usability beat decorative UI every time.",
  },
  {
    quote: "Design is a business lever.",
    subquote: "Decisions tied to conversion, retention, and efficiency.",
  },
  {
    quote: "Systems over screens.",
    subquote: "Reusable patterns that keep teams fast and products consistent.",
  },
];

const EASE_EMPHASIZED = [0.22, 1, 0.36, 1] as const;

// Quote: fade in → hold → fade out, as one keyframed opacity/position pass.
// The hold is the point — two full seconds of nothing else happening, so
// both lines can actually be read rather than glimpsed.
const QUOTE_FADE_IN = 0.4;
const QUOTE_HOLD = 2.0;

const COLUMN_STAGGER = 0.05;
const COLUMN_DURATION = 0.75;
// Full time the reveal wipe takes, from the first column moving to the
// last one finishing: (N-1) staggered starts + one column's own duration.
const REVEAL_DURATION = (WIPE_COLUMN_COUNT - 1) * COLUMN_STAGGER + COLUMN_DURATION; // 1.00s

// The quote's fade-out is set to exactly match the wipe's reveal duration,
// and both start at the same instant. Text and panels dissolve together —
// if the fade-out were shorter than the wipe (as it was before), the quote
// finishes vanishing before the panels finish clearing, and there's a beat
// of plain black screen with nothing on it in between. This is the fix.
const QUOTE_FADE_OUT = REVEAL_DURATION;
const QUOTE_TOTAL = QUOTE_FADE_IN + QUOTE_HOLD + QUOTE_FADE_OUT; // 3.40s

const REVEAL_START = QUOTE_FADE_IN + QUOTE_HOLD; // 2.40s
// Total experience: REVEAL_START + REVEAL_DURATION = 3.40s

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export const PageTransition = ({ children, routeKey }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {!shouldReduceMotion && <RouteWipe key={routeKey} />}
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </>
  );
};

const RouteWipe = () => {
  const quote = React.useMemo(() => {
    const index = Math.floor(Math.random() * philosophyQuotes.length);
    return philosophyQuotes[index] ?? philosophyQuotes[0];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      <div className="absolute inset-0 flex">
        {wipeColumns.map((columnIndex) => (
          <motion.div
            key={columnIndex}
            className="h-full flex-1 bg-[#111214]"
            initial={{ y: "0%" }}
            animate={{
              y: "100%",
              transition: {
                duration: COLUMN_DURATION,
                ease: EASE_EMPHASIZED,
                delay: REVEAL_START + columnIndex * COLUMN_STAGGER,
              },
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [24, 0, 0, -24],
          transition: {
            duration: QUOTE_TOTAL,
            times: [
              0,
              QUOTE_FADE_IN / QUOTE_TOTAL,
              (QUOTE_FADE_IN + QUOTE_HOLD) / QUOTE_TOTAL,
              1,
            ],
            ease: EASE_EMPHASIZED,
          },
        }}
      >
        <div className="max-w-2xl">
          <p className="text-2xl leading-[1.2] text-white sm:text-3xl">{quote.quote}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            {quote.subquote}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
