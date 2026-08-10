import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LottiePlayer } from "../../components/LottiePlayer";
import { PortfolioShell } from "../../components/PortfolioShell";
import { useAvailability } from "../../hooks/useAvailability";

const showcaseAnimations = [
  { title: "Vital Swap", path: "/Vitalswap.json", href: "/work/vital-swap" },
  { title: "Digitvant Scene", path: "/Scene.json", href: "/work/digitvant-pay" },
  { title: "Motobills", path: "/motobills.json", href: "/work/motobills" },
];

export const Home: FC = () => {
  const [activeAnimationIndex, setActiveAnimationIndex] = useState(0);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const availability = useAvailability();
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);
  const activeAnimation = showcaseAnimations[activeAnimationIndex];

  const handleProjectMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cursorLabelRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cursorLabelRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -140%)`;
  };

  useEffect(() => {
    if (isShowcaseHovered) return;

    const intervalId = window.setInterval(() => {
      setActiveAnimationIndex((current) =>
        current === showcaseAnimations.length - 1 ? 0 : current + 1
      );
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isShowcaseHovered]);

  return (
    <PortfolioShell contentClassName="max-w-[1160px]">
      <div className="mx-auto w-full max-w-[960px]">
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] reveal-up">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Product Designer · Lagos, Nigeria</p>
          <h1 className="section-title mt-3 max-w-3xl text-5xl leading-[1.02] text-[#111214] sm:text-6xl">
           I design products by starting with people, not pixels.
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Product Design",
              "UX Strategy",
              "Dashboard UX",
              "Design Systems",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/15 bg-[#f7f7f3] px-3 py-1 text-xs text-[#5b6169]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-[#535860] lg:pt-1">
          <p>
            Product Designer based in Lagos, Nigeria — designing intuitive fintech and B2B experiences.
          </p>
          <p>
            Led a 72-hour redesign that resulted in 1,000+ beta user signups.
          </p>
          <p>
            Currently focused on partnering with crypto-focused startups, healthcare platforms, and B2B SaaS products.
          </p>

          <Link
            to="/work-with-me"
            className={`press-scale inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] no-underline transition-colors ${
              availability.isFull
                ? "border-black/10 bg-[#f4f4f0] text-[#6a7077]"
                : "border-black/20 bg-[#111214] text-white"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                availability.status === "full"
                  ? "bg-[#9a9fa6]"
                  : availability.status === "limited"
                  ? "bg-amber-400"
                  : availability.status === "loading"
                  ? "bg-[#9a9fa6]"
                  : "bg-emerald-400"
              }`}
            />
            {availability.status === "loading" ? "Available for projects" : availability.label}
          </Link>
        </div>
      </section>
      </div>

      <section className="mt-4 pb-2 reveal-up reveal-up-delay-1 sm:mt-5">
        <div className="w-full border-y border-black/10 bg-[#f4f4f0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="w-full">
            <article
              className="overflow-hidden rounded-2xl border border-black/10 bg-[#fafaf7]"
              onMouseEnter={() => setIsShowcaseHovered(true)}
              onMouseLeave={() => setIsShowcaseHovered(false)}
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
                  {activeAnimation.title}
                </p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
                  {activeAnimationIndex + 1} / {showcaseAnimations.length}
                </p>
              </div>
              <Link
                to={activeAnimation.href}
                className="group relative block overflow-hidden border-t border-black/10 no-underline"
                onMouseEnter={() => setIsProjectHovered(true)}
                onMouseLeave={() => setIsProjectHovered(false)}
                onMouseMove={handleProjectMouseMove}
              >
                <LottiePlayer
                  animationPath={activeAnimation.path}
                  autoplay
                  loop
                  pauseOnHover={false}
                  className="h-[20rem] w-full sm:h-[26rem] lg:h-[32rem]"
                />
                <span
                  ref={cursorLabelRef}
                  className={`pointer-events-none absolute left-0 top-0 z-10 hidden whitespace-nowrap rounded-full border border-black/20 bg-[#111214] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity duration-150 sm:inline-flex ${
                    isProjectHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  View project
                </span>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </PortfolioShell>
  );
};
