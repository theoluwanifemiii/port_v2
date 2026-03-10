import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PortfolioShell } from "../../components/PortfolioShell";
import { portfolioProjects } from "../../data/projects";

export const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setImagePos({ x: e.clientX, y: e.clientY });
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
                <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
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
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
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
                {content}
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
                {content}
              </a>
            );
          }

          return (
            <div key={project.id} className="block">
              {content}
            </div>
          );
        })}
        <div className="border-t border-black/10" />
      </section>

      {/* Floating image preview on hover */}
      <div
        className="pointer-events-none fixed z-50 h-[260px] w-[380px] overflow-hidden transition-opacity duration-200"
        style={{
          left: imagePos.x + 28,
          top: imagePos.y - 130,
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
      </div>
    </PortfolioShell>
  );
};
