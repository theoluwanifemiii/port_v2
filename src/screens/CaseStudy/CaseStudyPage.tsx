import { FC, ReactNode, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "../../components/site/SiteChrome";
import { Marquee } from "../../components/site/Marquee";
import { Lightbox } from "../../components/site/Lightbox";
import { ProjectCaseStudy, projectCaseStudies } from "../../data/projects";
import { IconArrow, IconBack, IconExternal } from "../../components/site/icons";
import "./CaseStudy.css";

/** Order matches the Selected work list on Home. */
const CASE_ORDER = [
  "moto-ride",
  "digitvant-pay",
  "plenti",
  "momentos",
  "fig2md",
  "one-drug-store",
  "creative-pay",
];

/** Short outcome lines, matching the Selected work list on Home. */
const SHORT_OUTCOME: Record<string, string> = {
  "digitvant-pay": "1K beta to 10K+ active users",
  plenti: "11 modules, 3 role based portals, 150+ screens",
  "moto-ride": "One rider pool for 3 services",
  momentos: "Live product, designed and built solo",
  fig2md: "80 component pages an agent can follow",
  motobills: "Faster restocking across core bill categories",
};

const pad = (n: number) => String(n).padStart(2, "0");

const CaseFooter: FC = () => (
  <footer className="wrap mono d4-footer">
    <div>
      <span>© 2026 OLUWANIFEMI OSUNSANYA</span>
      <Link to="/contact" style={{ textDecoration: "none" }}>
        LET'S TALK ABOUT YOUR PRODUCT <IconArrow />
      </Link>
    </div>
  </footer>
);

const NotFound: FC = () => (
  <div className="d4 d4-case">
    <SiteHeader active="work" showClock={false} />
    <main className="wrap">
      <section className="case-intro" style={{ paddingBottom: 120 }}>
        <div className="mono crumbs">
          <Link to="/#work" className="with-ico">
            <IconBack /> ALL WORK
          </Link>
        </div>
        <h1 className="balance">Project not found</h1>
        <p className="summary">That case study doesn't exist, or it has moved.</p>
      </section>
    </main>
    <CaseFooter />
  </div>
);

/** Auto-scrolling gallery; click an image to view it large. Holds its own
 *  state so opening the viewer doesn't re-render the rest of the page. */
const CaseGallery: FC<{ title: string; items: { src: string; staged: boolean }[]; backdrop?: boolean }> = ({
  title,
  items,
  backdrop = false,
}) => {
  const [open, setOpen] = useState<number | null>(null);
  const images = items.map(({ src }) => ({
    src: encodeURI(src),
    alt: `${title}: ${src.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}`,
  }));
  return (
    <section className="gallery">
      <Marquee label={`${title} screens`} secondsPerItem={8}>
        {items.map(({ src, staged }, i) => (
          <button
            key={src}
            type="button"
            className={`g-view ${staged ? "stage stage-tile" : "g-plain"}`}
            aria-label={`View larger: ${images[i].alt}`}
            onClick={() => setOpen(i)}
          >
            <img className="g-wide" src={images[i].src} alt={images[i].alt} />
          </button>
        ))}
      </Marquee>
      <Lightbox images={images} index={open} onChange={setOpen} backdrop={backdrop} />
    </section>
  );
};

export const CaseStudyPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectCaseStudies[projectId] : undefined;
  if (!project) return <NotFound />;
  return <CaseStudy project={project} />;
};

const CaseStudy: FC<{ project: ProjectCaseStudy }> = ({ project: p }) => {
  // Sections are numbered in the order they appear, so optional ones don't leave gaps.
  let n = 0;
  const label = (text: string) => `(${pad(++n)}) ${text.toUpperCase()}`;
  const Sec: FC<{ title: string; children: ReactNode; style?: React.CSSProperties }> = ({
    title,
    children,
    style,
  }) => (
    <section className="sec" style={style}>
      <h2 className="label">{title}</h2>
      {children}
    </section>
  );

  const index = CASE_ORDER.indexOf(p.id);
  const cover = p.heroImage ?? p.heroImages?.[0] ?? p.image;
  // Only projects with backdrop on show their gallery screenshots on the beach backdrop.
  const gallery = [
    ...(p.heroImages?.slice(1) ?? []).map((src) => ({ src, staged: false })),
    ...(p.galleryImages ?? []).map((src) => ({ src, staged: p.backdrop === true })),
  ];
  // Next follows the Home list order, wrapping round, skipping projects without a case study.
  const withCase = CASE_ORDER.filter((id) => projectCaseStudies[id]);
  const pos = withCase.indexOf(p.id);
  const next = pos >= 0 && withCase.length > 1 ? projectCaseStudies[withCase[(pos + 1) % withCase.length]] : undefined;
  const nextIndex = next ? CASE_ORDER.indexOf(next.id) : -1;
  const outcome = SHORT_OUTCOME[p.id];

  return (
    <div className="d4 d4-case">
      <SiteHeader active="work" showClock={false} />

      <main className="wrap">
        {/* Intro */}
        <section className="case-intro">
          <div className="mono crumbs">
            <Link to="/#work" className="with-ico">
            <IconBack /> ALL WORK
          </Link>
            {index >= 0 && <span className="muted">CASE STUDY {pad(index + 1)} OF {pad(CASE_ORDER.length)}</span>}
          </div>
          <h1 className="balance">{p.title}</h1>
          <p className="balance summary">{p.summary}</p>
          <dl className="facts">
            <div>
              <dt className="mono">ROLE</dt>
              <dd>{p.role ?? "Product Designer"}</dd>
            </div>
            <div>
              <dt className="mono">YEAR</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt className="mono">SCOPE</dt>
              <dd>{p.subtitle}</dd>
            </div>
            {outcome && (
              <div>
                <dt className="mono">OUTCOME</dt>
                <dd style={{ fontWeight: 500 }}>{outcome}</dd>
              </div>
            )}
            {p.website && (
              <div>
                <dt className="mono">LIVE</dt>
                <dd>
                  <a
                    href={`https://${p.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ulink"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {p.website.split("/")[0]} <IconExternal />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>

        {p.backdrop ? (
          // A UI screenshot sits as a framed window on the scenic backdrop.
          <div className="stage stage-cover">
            <img src={encodeURI(cover)} alt={`${p.title} product overview`} />
          </div>
        ) : (
          <img className="cover" src={encodeURI(cover)} alt={`${p.title} product overview`} />
        )}

        {/* At a glance */}
        {p.statCards && p.statCards.length > 0 && (
          <ul className="stats">
            {p.statCards.map((s) => (
              <li key={s.label}>
                <span className="stat-v">{s.value}</span>
                <span className="mono eyebrow">{s.label.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        )}

        <Sec title={label("Context")} style={{ marginTop: p.statCards ? 0 : 80 }}>
          <div className="prose">
            <p>{p.context}</p>
          </div>
        </Sec>

        {p.costOfProblem && (
          <Sec title={label("Why it mattered")}>
            <div className="prose">
              <p>{p.costOfProblem}</p>
            </div>
          </Sec>
        )}

        <Sec title={label("The challenge")}>
          <p className="balance statement">{p.challenge}</p>
        </Sec>

        {(p.beforeAfter || (p.challengeImages && p.challengeImages.length > 0)) && (
          <Sec title={label(p.beforeAfter ? "Before and after" : "Where it started")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {p.beforeAfter && (
                <div className="ba">
                  <div className="ba-card">
                    <span className="mono eyebrow">BEFORE</span>
                    <ul>
                      {p.beforeAfter.before.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ba-card is-after">
                    <span className="mono eyebrow">AFTER</span>
                    <ul>
                      {p.beforeAfter.after.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {p.challengeImages && p.challengeImages.length > 0 && (
                <div className="shots">
                  {p.challengeImages.map((src, i) => (
                    <figure key={src}>
                      <img src={encodeURI(src)} alt={`The previous ${p.title} experience, ${i + 1}`} loading="lazy" />
                      <figcaption className="mono">THE PREVIOUS EXPERIENCE · {i + 1}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </Sec>
        )}

        <Sec title={label("Approach")}>
          <ol className="approach">
            {p.approach.map((step, i) => (
              <li key={step}>
                <span className="mono muted" style={{ fontSize: 12, paddingTop: 6 }}>
                  {pad(i + 1)}
                </span>
                <div>
                  <p>{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </Sec>

        {p.pullQuote && (
          <figure className="pullquote">
            <blockquote className="balance">“{p.pullQuote}”</blockquote>
            <figcaption className="mono">THE IDEA THAT SHAPED THE WORK</figcaption>
          </figure>
        )}

        {p.timeline && p.timeline.length > 0 && (
          <Sec title={label("Timeline")} style={p.pullQuote ? { borderTop: 0 } : undefined}>
            <ol className="pills">
              {p.timeline.map((t, i) => (
                <li
                  key={t}
                  className={`mono pill${i === p.timeline!.length - 1 ? " is-dark" : ""}`}
                >
                  {pad(i + 1)} {t.toUpperCase()}
                </li>
              ))}
            </ol>
          </Sec>
        )}

        <Sec
          title={label(p.solutionLabel ?? "Outcome")}
          style={p.pullQuote && !p.timeline ? { borderTop: 0 } : undefined}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p className="balance takeaway" style={{ maxWidth: 900 }}>
              {p.outcome}
            </p>
            {p.outcomeParagraphs && p.outcomeParagraphs.length > 0 && (
              <div className="prose">
                {p.outcomeParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </Sec>

        {p.modules && p.modules.length > 0 && (
          <Sec title={label("The modules")}>
            <ol className="modules">
              {p.modules.map((m, i) => (
                <li key={m.name}>
                  <span className="mono muted" style={{ fontSize: 12 }}>
                    {pad(i + 1)}
                  </span>
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                </li>
              ))}
            </ol>
          </Sec>
        )}

        {gallery.length > 0 && <CaseGallery title={p.title} items={gallery} backdrop={p.backdrop === true} />}

        <Sec title={label("Results")}>
          <ol className="results">
            {p.results.map((r, i) => (
              <li key={r}>
                <span className="mono n">{pad(i + 1)}</span>
                <span className="t">{r}</span>
              </li>
            ))}
          </ol>
        </Sec>

        {p.keyTakeaway && (
          <Sec title={label("Key takeaway")}>
            <p className="balance takeaway">{p.keyTakeaway}</p>
          </Sec>
        )}

        {(p.roleDescription || p.responsibilities) && (
          <Sec title={label("My role")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {p.roleDescription && (
                <p style={{ margin: 0, maxWidth: 720, fontSize: 18, lineHeight: 1.65, color: "#3d3d3d" }}>
                  {p.roleDescription}
                </p>
              )}
              {p.responsibilities && (
                <ul className="pills">
                  {p.responsibilities.map((r) => (
                    <li key={r} className="mono pill" style={{ padding: "8px 12px", color: "#191919" }}>
                      {r.toUpperCase()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Sec>
        )}

        {next ? (
          <Link to={`/work/${next.id}`} className="next-link">
            <span style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="mono eyebrow">
                NEXT PROJECT{nextIndex >= 0 ? ` · ${pad(nextIndex + 1)}` : ""}
              </span>
              <span className="big">{next.title}</span>
            </span>
            <span className="arrow" aria-hidden="true">
              <IconArrow strokeWidth={1} />
            </span>
          </Link>
        ) : (
          <Link to="/#work" className="next-link">
            <span style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="mono eyebrow">BACK TO</span>
              <span className="big">All work</span>
            </span>
            <span className="arrow" aria-hidden="true">
              <IconArrow strokeWidth={1} />
            </span>
          </Link>
        )}
      </main>

      <CaseFooter />
    </div>
  );
};
