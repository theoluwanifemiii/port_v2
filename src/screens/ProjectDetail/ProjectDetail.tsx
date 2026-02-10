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
      <PortfolioShell contentClassName="max-w-[900px]">
        <div className="hairline-card rounded-2xl px-6 py-16 text-center">
          <h1 className="section-title text-4xl text-[#111214]">Project not found</h1>
          <Link to="/work" className="mt-4 inline-block text-sm text-[#2f3339] underline">
            Back to projects
          </Link>
        </div>
      </PortfolioShell>
    );
  }

  return (
    <PortfolioShell contentClassName="max-w-[1160px]">
      <section className="reveal-up">
        <Link
          to="/work"
          className="text-[11px] uppercase tracking-[0.14em] text-[#6a6f76] no-underline"
        >
          ← Back to projects
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Case study</p>
            <h1 className="section-title mt-4 text-6xl leading-[0.98] text-[#111214] sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4f545c]">
              {project.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6b7078]">
              {project.summary}
            </p>
          </div>

          <div>
            <p className="text-sm leading-relaxed text-[#4f545c]">{project.context}</p>

            <dl className="mt-8 grid gap-6 border-t border-black/10 pt-6 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7a7f86]">Year</dt>
                <dd className="mt-1 text-[#15181d]">{project.year}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7a7f86]">Client</dt>
                <dd className="mt-1 text-[#15181d]">{project.client}</dd>
              </div>
              {project.website && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7a7f86]">Website</dt>
                  <dd className="mt-1 break-all text-[#15181d]">{project.website}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-12 reveal-up reveal-up-delay-1">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10">
            <div className="h-[70vh] overflow-hidden sm:h-[75vh]">
              <img
                src={project.image}
                alt={`${project.title} interface`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-black/10 pt-8 lg:grid-cols-3 reveal-up reveal-up-delay-2">
        <article>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#70747b]">Challenge</p>
          <p className="mt-3 text-sm leading-relaxed text-[#535860]">{project.challenge}</p>
        </article>

        <article>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#70747b]">Outcome</p>
          <p className="mt-3 text-sm leading-relaxed text-[#535860]">{project.outcome}</p>
        </article>

        <article>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#70747b]">Focus</p>
          <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em] text-[#7b8087]">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] reveal-up reveal-up-delay-2">
        <article>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Approach</p>
          <ul className="mt-4 space-y-4">
            {project.approach.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#4f545c]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#15181d]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Key results</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.results.map((result) => (
              <div key={result} className="text-sm leading-relaxed text-[#4f545c]">
                <p className="border-t border-black/10 pt-3">{result}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {project.challengeImages && project.challengeImages.length > 0 && (
        <section className="mt-12 reveal-up reveal-up-delay-3">
          <div className="mb-3 flex items-center justify-between border-y border-black/10 py-2">
            <p className="text-sm text-[#17191c]">Before snapshots</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">Problem surfaces</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.challengeImages.map((image) => (
              <div key={image} className="overflow-hidden">
                <img src={image} alt={`${project.title} before`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 flex items-center justify-between border-t border-black/10 pt-6 reveal-up reveal-up-delay-3">
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
