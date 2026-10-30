import { FC, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { IMG } from "./theme";
import { DoubleRule } from "./ui";

/**
 * The menu cover. Plays once when someone opens the Euphoria menu: the
 * cover's details settle in, then it swings open on its left spine like a
 * leather-bound menu, revealing the page that is already loaded underneath.
 *
 * Tap, click or any key opens it straight away. Skipped for reduced motion.
 */
export const MenuCover: FC<{ onDone: () => void }> = ({ onDone }) => {
  const shadeRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Tapping before the cover opens jumps straight to the opening.
  const open = useCallback(() => {
    const tl = tlRef.current;
    if (tl && tl.time() < tl.labels.open) tl.seek("open");
  }, []);

  useEffect(() => {
    const leaf = leafRef.current;
    const shade = shadeRef.current;
    if (!leaf || !shade) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const details = leaf.querySelectorAll<HTMLElement>("[data-cover-detail]");
    gsap.set(details, { opacity: 0, y: 12 });
    gsap.set(leaf, { rotateY: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({ onComplete: onDone });
    tlRef.current = tl;
    tl.to(details, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "expo.out" })
      .addLabel("open", "+=0.55")
      // The hinge is the screen's left edge, so the cover is out of view by
      // ~95°. Stopping just past that keeps the whole swing on screen.
      .to(leaf, { rotateY: -100, duration: 1.6, ease: "power2.inOut" }, "open")
      .to(shade, { opacity: 0, duration: 1.3, ease: "power1.inOut" }, "open+=0.2");

    window.addEventListener("keydown", open);
    return () => {
      window.removeEventListener("keydown", open);
      tl.kill();
      tlRef.current = null;
    };
  }, [onDone, open]);

  return (
    <div
      className="fixed inset-0 z-[80] cursor-pointer overflow-hidden"
      style={{ perspective: "2200px" }}
      onPointerDown={open}
      role="presentation"
      aria-hidden="true"
    >
      {/* Dims the page until the cover lifts off it */}
      <div ref={shadeRef} className="absolute inset-0 bg-eu-black/80" />

      <div ref={leafRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {/* Front of the cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-eu-green px-6 text-center text-eu-ivory" style={{ backfaceVisibility: "hidden" }}>
          <img src={IMG.mark} alt="" className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[580px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
          {/* Spine */}
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/45 to-transparent" />
          {/* Double gilt frame */}
          <div className="pointer-events-none absolute inset-3.5 border border-eu-pink/45" />
          <div className="pointer-events-none absolute inset-[20px] border border-eu-pink/25" />

          <div data-cover-detail className="relative pl-[0.42em] font-eu-display text-[11px] tracking-[0.42em] text-eu-pink">
            OLD IKOYI
          </div>
          <img data-cover-detail src={IMG.logo} alt="" className="relative mt-7 h-[158px] w-[236px] object-cover" style={{ objectPosition: "50% 100%" }} />
          <div data-cover-detail className="relative mt-8">
            <DoubleRule width={200} line="bg-eu-ivory/[0.35]" diamond={6} />
          </div>
          <div data-cover-detail className="relative mt-6 font-eu-serif text-[19px] italic text-eu-ivory">
            The Menu
          </div>
          <div data-cover-detail className="absolute bottom-12 left-0 right-0 font-eu-serif text-sm italic text-eu-ivory/60">
            A Sujimoto creation
          </div>
        </div>

        {/* Inside of the cover (shows if the viewport is wider than the swing) */}
        <div
          className="absolute inset-0 bg-eu-black"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/60 to-transparent" />
          <div className="absolute inset-3.5 border border-eu-pink/20" />
        </div>
      </div>
    </div>
  );
};
