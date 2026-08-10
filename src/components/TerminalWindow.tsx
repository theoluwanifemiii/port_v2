import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React from "react";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  soundOn: boolean;
  onToggleSound: () => void;
  bodyClassName?: string;
  bodyRef?: React.Ref<HTMLDivElement>;
  onBodyClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MAX_TILT = 3.5; // degrees — subtle, a screen catching light, not a gimmick

/**
 * The terminal "glass" — chrome bar with traffic lights + a mute toggle,
 * a CRT scanline/flicker pass over the body, and a gentle pointer-driven
 * 3D tilt so the whole window reads as a floating physical screen rather
 * than a flat card. Tilt and flicker both back off under reduced motion;
 * the scanlines (a static texture, not motion) stay.
 */
export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  children,
  soundOn,
  onToggleSound,
  bodyClassName,
  bodyRef,
  onBodyClick,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const rotateXMV = useMotionValue(0);
  const rotateYMV = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rotateXMV, springConfig);
  const rotateY = useSpring(rotateYMV, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYMV.set(px * MAX_TILT * 2);
    rotateXMV.set(-py * MAX_TILT * 2);
  };

  const resetTilt = () => {
    rotateXMV.set(0);
    rotateYMV.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className="overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-[#1c1f24] to-[#13151a] px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span
          className="ml-2 truncate text-[11px] text-[#8a8f98]"
          style={{ fontFamily: "Sometype Mono, monospace" }}
        >
          {title}
        </span>
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundOn ? "Mute terminal sound" : "Unmute terminal sound"}
          aria-pressed={soundOn}
          className="press-scale ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#8a8f98] transition-colors hover:bg-white/10 hover:text-white"
        >
          {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>
      </div>

      <div
        ref={bodyRef}
        onClick={onBodyClick}
        className={`crt-scanlines ${shouldReduceMotion ? "" : "crt-flicker"} relative cursor-text bg-[#0d0f12] px-5 py-6 text-sm leading-relaxed ${bodyClassName ?? ""}`}
        style={{ fontFamily: "Sometype Mono, monospace" }}
      >
        {children}
      </div>
    </motion.div>
  );
};
