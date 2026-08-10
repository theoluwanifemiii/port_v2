import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

/**
 * Scroll-triggered entrance, once, the moment an element enters the
 * viewport — as opposed to the old `.reveal-up` CSS class, which animated
 * everything at mount regardless of scroll position. On a long case study
 * that meant every section below the fold had already "arrived" off-screen
 * before anyone scrolled to it — the animation was invisible where it
 * mattered most.
 *
 * With this, scrolling through a case study plays out like walking through
 * it: each chapter settles into place as it's reached.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as = "div",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      // No bottom margin shrink here. A negative bottom margin ("-10%")
      // requires the element to scroll past a point *higher* than the
      // viewport's actual bottom edge before it's considered "in view" —
      // which works fine when there's more page below to keep scrolling
      // through, but creates a permanent dead zone for the LAST element on
      // a page: the browser hits its natural scroll limit before the
      // element can ever cross that raised threshold, so it never fires.
      // `amount: 0.2` alone (20% of the element visible in the real
      // viewport) triggers reliably regardless of what's below it.
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1], delay }}
    >
      {children}
    </MotionTag>
  );
};
