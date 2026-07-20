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
          {project.year} — {project.client}{project.role ? ` — ${project.role}` : ""}
        </span>
      </div>

      {/* Title */}
      <section className="mt-10 reveal-up flex items-center justify-between gap-6">
        <div>
          <h1 className="section-title text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
            {project.tags.join(" · ")}
          </p>
        </div>
        {project.website && (
          <a
            href={`https://${project.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-[#111214] no-underline transition-colors hover:bg-[#111214] hover:text-white"
          >
            View project
          </a>
        )}
      </section>

      {/* Lead — larger editorial text */}
      <section className="mt-10 reveal-up reveal-up-delay-1">
        <p className="text-[17px] leading-[1.75] text-[#525760]">
          {project.summary}
        </p>
      </section>

      {/* Pull quote — unforgettable sentence */}
      {project.pullQuote && (
        <section className="mt-10 reveal-up reveal-up-delay-1">
          <blockquote className="border-l-2 border-[#111214] pl-6">
            <p className="text-lg leading-relaxed text-[#9a9fa6] italic sm:text-xl">
              "{project.pullQuote}"
            </p>
          </blockquote>
        </section>
      )}

      {/* Hero image — full bleed */}
      <section className="mt-12 reveal-up reveal-up-delay-1">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <img
            src={project.image}
            alt={`${project.title}`}
            className="w-full object-cover aspect-[1728/1029]"
          />
        </div>
      </section>

      {/* My Role */}
      {(project.roleDescription || project.responsibilities) && (
        <section className="mt-20 reveal-up reveal-up-delay-2">
          <Chapter label="My Role" />
          {project.roleDescription && (
            <p className="mt-5 text-[15px] leading-[1.8] text-[#525760]">{project.roleDescription}</p>
          )}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.responsibilities.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-black/10 px-3.5 py-1.5 text-[13px] text-[#525760]"
                >
                  {r}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Context — The Problem */}
      <section className="mt-20 reveal-up reveal-up-delay-2">
        <Chapter label="The Problem" />
        <p className="mt-5 text-[15px] leading-[1.8] text-[#525760]">{project.context}</p>
      </section>

      {/* Cost of the Problem */}
      {project.costOfProblem && (
        <section className="mt-16 reveal-up reveal-up-delay-2">
          <Chapter label="The Cost of the Problem" />
          <p className="mt-5 text-[15px] leading-[1.8] text-[#525760]">{project.costOfProblem}</p>
        </section>
      )}

      {/* Challenge — key question callout */}
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
        </section>
      )}

      {/* Approach — each step as a beat in the story */}
      <section className="mt-20 reveal-up reveal-up-delay-2">
        <Chapter label="Design Process" />
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
        <Chapter label="The Solution" />
        <p className="mt-6 text-2xl leading-[1.5] text-[#1a1d21] sm:text-3xl">
          {project.outcome}
        </p>
        {project.outcomeParagraphs && project.outcomeParagraphs.length > 0 && (
          <div className="mt-8 space-y-4">
            {project.outcomeParagraphs.map((para, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-[#525760]">{para}</p>
            ))}
          </div>
        )}
      </section>

      {/* Gallery scroll strip */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="mt-14 reveal-up reveal-up-delay-2">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
            <div
              className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]"
              style={{ animationDuration: `${project.galleryImages.length * 6}s` }}
            >
              {[...project.galleryImages, ...project.galleryImages].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${(i % project.galleryImages!.length) + 1}`}
                  className="h-[420px] w-auto flex-shrink-0 object-cover rounded-2xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results — supporting proof */}
      <section className="mt-14 reveal-up reveal-up-delay-2">
        <Chapter label="Impact" />
        <ul className="mt-6 space-y-4">
          {project.results.map((result) => (
            <li key={result} className="flex gap-4 text-[15px] leading-[1.7] text-[#525760]">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#9a9fa6]" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key Takeaway */}
      {project.keyTakeaway && (
        <section className="mt-14 reveal-up reveal-up-delay-2">
          <Chapter label="Key Takeaway" />
          <p className="mt-5 text-[15px] leading-[1.8] text-[#525760]">{project.keyTakeaway}</p>
        </section>
      )}

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
