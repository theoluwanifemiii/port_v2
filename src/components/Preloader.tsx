import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const restore = () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };

    const first = root.querySelector<HTMLElement>(".pl-name-first");
    const last  = root.querySelector<HTMLElement>(".pl-name-last");
    const rule  = root.querySelector<HTMLElement>(".pl-rule");
    const role  = root.querySelector<HTMLElement>(".pl-role");

    // Set initial states before showing
    gsap.set([first, last, rule, role], { opacity: 0 });
    gsap.set([first, last], { y: 32 });
    gsap.set(rule, { scaleX: 0, transformOrigin: "left" });
    gsap.set(role, { y: 10 });

    setVisible(true);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(first, { opacity: 1, y: 0, duration: 1.0 });
    tl.to(last,  { opacity: 1, y: 0, duration: 1.0 }, "-=0.75");
    tl.to(rule,  { opacity: 1, scaleX: 1, duration: 0.85, ease: "expo.inOut" }, "-=0.5");
    tl.to(role,  { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    // Hold so the full name is readable
    tl.to({}, { duration: 1.0 });

    // Wipe the panel away top-down with clip-path — no translate, no settling
    gsap.set(root, { clipPath: "inset(0% 0 0 0)" });
    tl.to(root, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.7,
      ease: "power2.in",
      onComplete() {
        restore();
        onComplete();
      },
    });

    return () => {
      tl.kill();
      restore();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className={`pl-root ${visible ? "pl-visible" : ""}`}>
      <div className="pl-inner">
        <div className="pl-name-first">Oluwanifemi</div>
        <div className="pl-name-last">Osunsanya</div>
        <div className="pl-rule" />
        <p className="pl-role">Product Designer</p>
      </div>
    </div>
  );
};
