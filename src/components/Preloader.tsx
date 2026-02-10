import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;
    let hasScheduledExit = false;

    const durationMs = 2600;
    const startedAt = performance.now();

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const ratio = Math.min(elapsed / durationMs, 1);
      const nextProgress = Math.round(ratio * 100);

      setProgress((current) => (current === nextProgress ? current : nextProgress));

      if (ratio < 1) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      if (!hasScheduledExit) {
        hasScheduledExit = true;
        exitTimer = setTimeout(() => {
          setIsExiting(true);
          completeTimer = setTimeout(onComplete, 500);
        }, 250);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (exitTimer) clearTimeout(exitTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#E7E7E2] transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-5xl px-6">
        <p
          className="mb-8 text-center text-lg uppercase tracking-[0.05em] text-[#1b1b1b] sm:mb-10 sm:text-2xl"
          style={{ fontFamily: "Geist, Instrument Sans, sans-serif" }}
        >
          PRELOADER
        </p>

        <div className="relative h-[420px] w-full overflow-hidden rounded-[18px] border-[3px] border-[#2f2f2f] bg-transparent sm:h-[500px]">
          <div
            className="absolute left-0 top-[34%] h-[2px] bg-[#6f6f6f] transition-[width] duration-150"
            style={{ width: `${26 + progress * 0.26}%` }}
          />
          <div className="absolute left-0 top-[46%] h-[1px] w-[43%] bg-[#a7a7a7]" />

          <div className="absolute bottom-12 right-8 text-right sm:bottom-14 sm:right-10">
            <div
              className="text-4xl leading-[0.95] text-[#111214] sm:text-6xl"
              style={{ fontFamily: "Geist, Instrument Sans, sans-serif", letterSpacing: "-0.04em" }}
            >
              <span>LOADING</span>
              <span className="ml-6">{progress}%</span>
            </div>
            <p
              className="mt-1 text-4xl leading-[0.95] text-[#111214] sm:text-6xl"
              style={{ fontFamily: "Geist, Instrument Sans, sans-serif", letterSpacing: "-0.04em" }}
            >
              PLEASE WAIT...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
