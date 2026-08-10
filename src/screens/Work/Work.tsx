import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PortfolioShell } from "../../components/PortfolioShell";
import { MagneticHover } from "../../components/MagneticHover";
import { portfolioProjects } from "../../data/projects";

export const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Preview position is driven by motion values + a spring, not React state.
  // Position updates never touch the render cycle, and `translate3d` is a
  // compositor-only property — no layout, no lag between cursor and card.
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springX = useSpring(previewX, { stiffness: 300, damping: 30, mass: 0.4 });
  const springY = useSpring(previewY, { stiffness: 300, damping: 30, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    previewX.set(e.clientX + 28);
    previewY.set(e.clientY - 130);
  };

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
        className="mt-16 reveal-up reveal-up-delay-1"
        onMouseMove={handleMouseMove}
      >
        {portfolioProjects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;

          const content = (
            <div
              className="group flex items-center justify-between py-8 border-t border-black/10 transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.35 : 1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start gap-8">
                <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#767b83]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="section-title text-3xl leading-tight text-[#111214] sm:text-4xl lg:text-[2.75rem]">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#6f747c]">{project.subtitle}</p>
                </div>
              </div>

              <div className="hidden shrink-0 items-center gap-8 sm:flex">
                <div className="flex gap-3 text-[10px] uppercase tracking-[0.16em] text-[#8a8f96]">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#767b83]">
                  {project.year}
                </span>
              </div>
            </div>
          );

          if (project.projectId) {
            return (
              <Link
                key={project.id}
                to={`/work/${project.projectId}`}
                className="block no-underline"
              >
                <MagneticHover strength={0.05}>{content}</MagneticHover>
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
                className="block no-underline"
              >
                <MagneticHover strength={0.05}>{content}</MagneticHover>
              </a>
            );
          }

          return (
            <div key={project.id} className="block">
              <MagneticHover strength={0.05}>{content}</MagneticHover>
            </div>
          );
        })}
        <div className="border-t border-black/10" />
      </section>

      {/* Floating image preview on hover — tracks the cursor via spring, never React state */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-[260px] w-[380px] overflow-hidden will-change-transform transition-opacity duration-200"
        style={{
          x: springX,
          y: springY,
          opacity: hoveredIndex !== null && portfolioProjects[hoveredIndex]?.image ? 1 : 0,
        }}
      >
        {hoveredIndex !== null && portfolioProjects[hoveredIndex]?.image && (
          <img
            src={portfolioProjects[hoveredIndex].image}
            alt={portfolioProjects[hoveredIndex].title}
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>
    </PortfolioShell>
  );
};
