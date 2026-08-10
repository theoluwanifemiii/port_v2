import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import React from "react";

interface MagneticHoverProps {
  children: React.ReactNode;
  /** Fraction of the pointer's offset from center that the element follows. */
  strength?: number;
  className?: string;
}

/**
 * A subtle magnetic lean toward the cursor — the element nudges toward
 * wherever it's being pointed at within its own bounds, then springs back
 * to rest on mouse-leave.
 *
 * Uses a spring (`useSpring`, not a CSS transition) driving a motion value,
 * so continuous pointer movement can retarget it mid-flight without a
 * visible seam — a CSS transition would restart from wherever it happened
 * to be and produce a small jump on every mousemove.
 */
export const MagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  strength = 0.08,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Slight underdamp — it's a pointer-following interaction, so a touch of
  // life on settle reads as responsive rather than sluggish.
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};
