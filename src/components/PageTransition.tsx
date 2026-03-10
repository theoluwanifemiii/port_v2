import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import React from "react";

const wipeColumns = [0, 1, 2, 3, 4, 5];
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

const wipeDuration = 0.85;
const wipeStagger = 0.05;

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export const PageTransition = ({ children, routeKey }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();
  const activeQuote = React.useMemo(() => {
    const index = Math.floor(Math.random() * philosophyQuotes.length);
    return philosophyQuotes[index] ?? philosophyQuotes[0];
  }, [routeKey]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.7 } }}
        exit={{ opacity: 1 }}
        style={{ width: "100%", height: "100%" }}
      >
        {!shouldReduceMotion && (
          <>
            <div className="pointer-events-none fixed inset-0 z-[60] flex">
              {wipeColumns.map((columnIndex) => (
                <motion.div
                  key={`wipe-${routeKey}-${columnIndex}`}
                  className="h-full flex-1 bg-[#111214]"
                  initial={{ y: "0%" }}
                  animate={{
                    y: ["0%", "100%"],
                    transition: {
                      duration: wipeDuration,
                      ease: [0.22, 1, 0.36, 1],
                      delay: columnIndex * wipeStagger,
                    },
                  }}
                  exit={{
                    y: "0%",
                    transition: {
                      duration: 0.85,
                      ease: [0.4, 0, 0.2, 1],
                      delay: columnIndex * wipeStagger,
                    },
                  }}
                />
              ))}
            </div>
            <motion.div
              className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center px-6 text-center"
              key={`quote-${routeKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{
                opacity: [0, 1, 1, 0],
                y: [28, 8, 8, -28],
                transition: {
                  duration: 1.7,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.18, 0.72, 1],
                },
              }}
            >
              <div className="max-w-2xl">
                <p className="mt-3 text-2xl leading-[1.2] text-white sm:text-3xl">
                  {activeQuote.quote}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  {activeQuote.subquote}
                </p>
              </div>
            </motion.div>
          </>
        )}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, transition: { delay: 0.35 } }
          }
          exit={shouldReduceMotion ? undefined : { opacity: 0, transition: { duration: 0.45 } }}
          style={{ width: "100%", height: "100%" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};