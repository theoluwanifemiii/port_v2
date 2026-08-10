import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Intro panel.
 *
 * Budget: ~880ms end to end, dismissible at any point by click, tap, or key.
 * It does not lock scroll — the visitor never loses control of the page.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(false);

  // Jump straight to the end of the timeline; onComplete still fires.
  const skip = useCallback(() => {
    timelineRef.current?.progress(1);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const first = root.querySelector<HTMLElement>(".pl-name-first");
    const last  = root.querySelector<HTMLElement>(".pl-name-last");
    const rule  = root.querySelector<HTMLElement>(".pl-rule");
    const role  = root.querySelector<HTMLElement>(".pl-role");

    gsap.set([first, last, rule, role], { opacity: 0 });
    gsap.set([first, last], { y: 18 });
    gsap.set(rule, { scaleX: 0, transformOrigin: "left" });
    gsap.set(role, { y: 6 });
    gsap.set(root, { clipPath: "inset(0% 0 0 0)" });

    setVisible(true);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    timelineRef.current = tl;

    tl.to(first, { opacity: 1, y: 0, duration: 0.35 })
      .to(last,  { opacity: 1, y: 0, duration: 0.35 }, "-=0.25")
      .to(rule,  { opacity: 1, scaleX: 1, duration: 0.30, ease: "expo.inOut" }, "-=0.20")
      .to(role,  { opacity: 1, y: 0, duration: 0.25 }, "-=0.20")
      .to(root, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.28,
        ease: "power2.in",
        onComplete,
      });

    // Any keypress dismisses.
    const onKeyDown = () => skip();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      tl.kill();
      timelineRef.current = null;
    };
  }, [onComplete, skip]);

  return (
    <div
      ref={rootRef}
      className={`pl-root ${visible ? "pl-visible" : ""}`}
      onClick={skip}
      onPointerDown={skip}
      role="presentation"
      aria-hidden="true"
    >
      <div className="pl-inner">
        <div className="pl-name-first">Oluwanifemi</div>
        <div className="pl-name-last">Osunsanya</div>
        <div className="pl-rule" />
        <p className="pl-role">Product Designer</p>
      </div>
    </div>
  );
};
