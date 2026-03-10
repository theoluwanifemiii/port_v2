import { Link, useParams } from "react-router-dom";
import { PortfolioShell } from "../../components/PortfolioShell";
import { projectCaseStudies, portfolioProjects } from "../../data/projects";

const getProjectTitle = (projectId?: string) => {
  if (!projectId) return "";
  const project = portfolioProjects.find((item) => item.projectId === projectId);
  return project?.title || "";
};

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectCaseStudies[projectId] : undefined;

  if (!project) {
    return (
      <PortfolioShell contentClassName="max-w-[760px]">
        <div className="py-32 text-center">
          <h1 className="section-title text-4xl text-[#111214]">Project not found</h1>
          <Link to="/work" className="mt-4 inline-block text-sm text-[#2f3339] underline">
            Back to projects
          </Link>
        </div>
      </PortfolioShell>
    );
  }

  return (
    <PortfolioShell contentClassName="max-w-[760px]">

      {/* Back + metadata */}
      <div className="reveal-up flex items-center justify-between">
        <Link
          to="/work"
          className="text-[11px] uppercase tracking-[0.14em] text-[#6a6f76] no-underline"
        >
          ← Back
        </Link>
        <span className="text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
          {project.year} — {project.client}
        </span>
      </div>

      {/* Title */}
      <section className="mt-10 reveal-up">
        <h1 className="section-title text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
          {project.tags.join(" · ")}
        </p>
      </section>

      {/* Lead — larger editorial text */}
      <section className="mt-10 reveal-up reveal-up-delay-1">
        <p className="text-xl leading-relaxed text-[#2f3339] sm:text-2xl">
          {project.summary}
        </p>
      </section>

      {/* Hero image — full bleed */}
      <section className="mt-12 reveal-up reveal-up-delay-1">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <img
            src={project.image}
            alt={`${project.title}`}
            className="h-[72vh] w-full object-cover"
          />
        </div>
      </section>

      {/* Context — setting the scene */}
      <section className="mt-20 reveal-up reveal-up-delay-2">
        <Chapter label="The context" />
        <p className="mt-5 text-[15px] leading-[1.8] text-[#525760]">{project.context}</p>
      </section>

      {/* Challenge — displayed as a callout statement */}
      <section className="mt-20 reveal-up reveal-up-delay-2">
        <Chapter label="The challenge" />
        <p className="mt-6 text-2xl leading-[1.5] text-[#1a1d21] sm:text-3xl">
          {project.challenge}
        </p>
      </section>

      {/* Before images — the evidence */}
      {project.challengeImages && project.challengeImages.length > 0 && (
        <section className="mt-12 reveal-up reveal-up-delay-2">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.challengeImages.map((image, i) => (
                <img
                  key={image}
                  src={image}
                  alt={`Before — ${i + 1}`}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4 / 3" }}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
            Before — problem surfaces
          </p>
        </section>
      )}

      {/* Approach — each step as a beat in the story */}
      <section className="mt-20 reveal-up reveal-up-delay-2">
        <Chapter label="How we approached it" />
        <ol className="mt-8 space-y-10">
          {project.approach.map((item, i) => (
            <li key={item} className="flex gap-6">
              <span className="mt-0.5 shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#b0b5bb]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-[1.8] text-[#525760]">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Outcome — the big moment */}
      <section className="mt-24 reveal-up reveal-up-delay-2">
        <Chapter label="What changed" />
        <p className="mt-6 text-2xl leading-[1.5] text-[#1a1d21] sm:text-3xl">
          {project.outcome}
        </p>
      </section>

      {/* Results — supporting proof */}
      <section className="mt-14 reveal-up reveal-up-delay-2">
        <Chapter label="The results" />
        <ul className="mt-6 space-y-4">
          {project.results.map((result) => (
            <li key={result} className="flex gap-4 text-[15px] leading-[1.7] text-[#525760]">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#9a9fa6]" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / Next */}
      <section className="mt-24 flex items-center justify-between border-t border-black/[0.07] pt-8 reveal-up reveal-up-delay-3">
        {project.previousProjectId ? (
          <Link
            to={`/work/${project.previousProjectId}`}
            className="text-sm text-[#2f3339] no-underline hover:underline"
          >
            ← {getProjectTitle(project.previousProjectId)}
          </Link>
        ) : (
          <span />
        )}
        {project.nextProjectId ? (
          <Link
            to={`/work/${project.nextProjectId}`}
            className="text-sm text-[#2f3339] no-underline hover:underline"
          >
            {getProjectTitle(project.nextProjectId)} →
          </Link>
        ) : (
          <span />
        )}
      </section>

    </PortfolioShell>
  );
};

const Chapter = ({ label }: { label: string }) => (
  <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a9fa6]">{label}</p>
);
