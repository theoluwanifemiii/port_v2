import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PortfolioShell } from "../../components/PortfolioShell";
import { portfolioProjects } from "../../data/projects";

export const Work = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
  const rafRef = useRef<number | null>(null);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const scrollMultiplier = 1.35;
  const maxSkew = 2.2;
  const skewRef = useRef(0);
  const shiftRef = useRef(0);
  const lastScrollRef = useRef({ y: 0, time: 0 });

  useEffect(() => {
    const updateMeasurements = () => {
      const nextViewportWidth = window.innerWidth;
      const trackWidth = nextViewportWidth * portfolioProjects.length;
      setViewportWidth(nextViewportWidth);
      setScrollDistance(Math.max(0, trackWidth - nextViewportWidth));
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (timestamp: number) => {
      if (!sectionRef.current || !trackRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + rect.height - window.innerHeight;
      const progress = end > start
        ? Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
        : 0;

      const translateX = -scrollDistance * progress;
      trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;

      const now = timestamp || performance.now();
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollRef.current.y;
      const deltaTime = Math.max(16, now - lastScrollRef.current.time);
      const velocity = delta / deltaTime;
      const targetSkew = Math.max(-maxSkew, Math.min(maxSkew, velocity * 1.2));
      const targetShift = targetSkew * -6;
      const damping = 0.18;

      skewRef.current += (targetSkew - skewRef.current) * damping;
      shiftRef.current += (targetShift - shiftRef.current) * damping;

      trackRef.current.style.setProperty("--panel-skew", `${skewRef.current}deg`);
      trackRef.current.style.setProperty("--panel-shift", `${shiftRef.current}px`);

      lastScrollRef.current = { y: currentScroll, time: now };
    };

    const loop = (time: number) => {
      handleScroll(time);
      rafRef.current = window.requestAnimationFrame(loop);
    };

    lastScrollRef.current = { y: window.scrollY, time: performance.now() };
    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollDistance]);

  const updateCursorPosition = (x: number, y: number, scale = 1) => {
    cursorPosRef.current = { x, y };
    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
  };

  const handlePanelMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsCursorActive(true);
    updateCursorPosition(event.clientX, event.clientY, 1.02);
  };

  const handlePanelMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    updateCursorPosition(event.clientX, event.clientY, 1.02);
  };

  const handlePanelMouseLeave = () => {
    setIsCursorActive(false);
    updateCursorPosition(cursorPosRef.current.x, cursorPosRef.current.y, 0.92);
  };

  const trackWidth = useMemo(
    () => viewportWidth * portfolioProjects.length,
    [viewportWidth]
  );

  return (
    <PortfolioShell contentClassName="max-w-[1000px]">
      <section className="reveal-up">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Projects</p>
        <h1 className="section-title mt-3 max-w-3xl text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
          Case studies built around clarity, speed, and business impact.
        </h1>
      </section>

      <section
        ref={sectionRef}
        className="relative mt-8 reveal-up reveal-up-delay-1"
        style={{ height: `calc(100vh + ${scrollDistance * scrollMultiplier}px)` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <div
              ref={trackRef}
              className="flex items-stretch"
              style={{
                width: `${trackWidth}px`,
                willChange: "transform",
              }}
            >
              {portfolioProjects.map((project, index) => {
                const isMinimal = index === 2;
                const isReversed = index % 2 !== 0;
                const panelLayout = isReversed ? "lg:flex-row-reverse" : "lg:flex-row";
                const tile = (
                  <div className="flex h-screen w-screen shrink-0 items-center">
                    <div
                      className={`mx-auto flex w-full max-w-[1280px] flex-col items-start gap-8 px-8 sm:px-12 lg:items-center lg:gap-16 ${panelLayout}`}
                      style={{
                        transform: "skewY(var(--panel-skew)) translateY(var(--panel-shift))",
                        transformOrigin: "center",
                      }}
                    >
                      <div className={`${isMinimal ? "max-w-sm" : "max-w-xl"}`}>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#6a6f76]">
                          {project.year}
                        </p>
                        <h2 className="section-title mt-4 text-5xl leading-[0.98] text-[#151618] sm:text-6xl lg:text-7xl">
                          {project.title}
                        </h2>
                        {!isMinimal && (
                          <>
                            <p className="mt-4 text-sm leading-relaxed text-[#6f747c] sm:text-base">
                              {project.subtitle}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.18em] text-[#8a8f96]">
                              {project.tags.map((tag) => (
                                <span key={`${project.id}-${tag}`}>{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="w-full lg:w-[56vw] lg:max-w-[720px]">
                        <div className="h-[70vh] w-full overflow-hidden sm:h-[74vh] lg:h-[78vh]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`h-full w-full object-cover ${
                              isMinimal ? "scale-[1.06] object-[center_30%]" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );

                if (project.projectId) {
                  return (
                    <Link
                      key={project.id}
                      to={`/work/${project.projectId}`}
                      className="no-underline"
                      onMouseEnter={handlePanelMouseEnter}
                      onMouseMove={handlePanelMouseMove}
                      onMouseLeave={handlePanelMouseLeave}
                    >
                      {tile}
                    </Link>
                  );
                }

                if (project.href) {
                  return (
                    <a
                      key={project.id}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                      onMouseEnter={handlePanelMouseEnter}
                      onMouseMove={handlePanelMouseMove}
                      onMouseLeave={handlePanelMouseLeave}
                    >
                      {tile}
                    </a>
                  );
                }

                return (
                  <div
                    key={project.id}
                    className="no-underline"
                    onMouseEnter={handlePanelMouseEnter}
                    onMouseMove={handlePanelMouseMove}
                    onMouseLeave={handlePanelMouseLeave}
                  >
                    {tile}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          ref={cursorRef}
          className={`pointer-events-none fixed left-0 top-0 z-[80] hidden whitespace-nowrap rounded-full border border-black/20 bg-[#111214] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-[opacity,transform] duration-150 ease-out md:inline-flex ${
            isCursorActive ? "opacity-100" : "opacity-0"
          }`}
        >
          View project
        </div>
        <div className="pointer-events-none absolute bottom-10 right-0 pr-6 text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
          Scroll to explore
        </div>
      </section>
    </PortfolioShell>
  );
};
