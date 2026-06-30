import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const stack = ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "AI Engineering"];

const shipped = [
  { label: "MomentOS", to: "/lab/momentos" },
  { label: "VitalSwap", to: "/work/vital-swap" },
  { label: "Digitvant Pay", to: "/work/digitvant-pay" },
  { label: "Motobills", to: "/work/motobills" },
];

const principles = [
  "Ship before perfect.",
  "Measure before guessing.",
  "Design systems over one-off screens.",
  "Own outcomes, not mockups.",
];

const WHOAMI_COMMAND = "$ whoami";

export const Lab: FC = () => {
  const navigate = useNavigate();
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let i = 0;
    const typeInterval = window.setInterval(() => {
      i += 1;
      setTypedCommand(WHOAMI_COMMAND.slice(0, i));
      if (i >= WHOAMI_COMMAND.length) {
        window.clearInterval(typeInterval);
        window.setTimeout(() => setShowOutput(true), 250);
      }
    }, 60);

    return () => window.clearInterval(typeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#111214] text-[#e7e8ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111214]/90 backdrop-blur-sm">
        <div className="flex w-full items-center px-6 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="flex h-16 shrink-0 items-center gap-3 no-underline"
            aria-label="Home"
          >
            <img
              src="/IMG_7861 2.jpg"
              alt="Oluwanifemi"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="whitespace-nowrap">
              <p className="text-sm font-medium text-white">Oluwanifemi Osunsanya</p>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#9a9ea5]">
                Product Builder
              </p>
            </div>
          </Link>

          <div className="flex flex-1 items-center" />

          <div className="flex h-16 shrink-0 items-center gap-7">
            <button
              type="button"
              role="switch"
              aria-checked={true}
              onClick={() => navigate("/")}
              aria-label="Switch to Designer mode"
              className="hidden h-16 items-center gap-2 border-l border-white/10 pl-7 md:flex"
            >
              <span className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-white/15 bg-white/10">
                <span className="inline-block h-3.5 w-3.5 translate-x-[18px] transform rounded-full bg-white" />
              </span>
              <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-[#9a9ea5]">
                Builder mode
              </span>
            </button>

            <Link
              to="/"
              className="text-[11px] uppercase tracking-[0.12em] text-[#9a9ea5] no-underline hover:text-white"
            >
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-[#1c1f24] to-[#13151a] px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span
                className="ml-2 text-[11px] text-[#8a8f98]"
                style={{ fontFamily: "Sometype Mono, monospace" }}
              >
                builder@olusworks:~
              </span>
            </div>

            <div
              className="bg-[#0d0f12] px-5 py-6 text-sm leading-relaxed"
              style={{ fontFamily: "Sometype Mono, monospace" }}
            >
              <p className="text-[#27c93f]">
                {typedCommand}
                <span className="animate-pulse">{typedCommand.length < WHOAMI_COMMAND.length ? "▍" : ""}</span>
              </p>
              <p className={`mt-1 transition-opacity duration-300 ${showOutput ? "opacity-100" : "opacity-0"}`}>
                Oluwanifemi Osunsanya — I help founders turn ideas into products people actually
                use. Based in Lagos, Nigeria.
              </p>

              <p className="mt-6 text-[#27c93f]">$ cat focus.md</p>
              <p className="mt-1">Owning products from first idea to production.</p>

              <p className="mt-6 text-[#27c93f]">$ ls stack/</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[#27c93f]">$ cat principles.md</p>
              <div className="mt-2 space-y-1">
                {principles.map((principle, i) => (
                  <p key={principle}>
                    <span className="text-[#6a6e76]">{String(i + 1).padStart(2, "0")}</span>{" "}
                    {principle}
                  </p>
                ))}
              </div>

              <p className="mt-6 text-[#27c93f]">$ ls shipped/</p>
              <div className="mt-2 space-y-1">
                {shipped.map((project) => (
                  <p key={project.label}>
                    <span className="text-[#27c93f]">✓</span>{" "}
                    <Link to={project.to} className="text-[#5bb6ff] no-underline hover:underline">
                      {project.label}
                    </Link>
                  </p>
                ))}
              </div>

              <p className="mt-6 text-[#27c93f]">$ cat current_project.md</p>
              <p className="mt-1">
                <strong className="text-white">MomentOS</strong> — designed, built, and shipped
                solo from idea to production.
              </p>
              <p className="mt-1">
                <Link to="/lab/momentos" className="text-[#5bb6ff] no-underline hover:underline">
                  Read the full case study →
                </Link>
              </p>
              <p className="mt-1">
                <a
                  href="https://usemomentos.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5bb6ff] no-underline hover:underline"
                >
                  usemomentos.xyz ↗
                </a>
              </p>

              <p className="mt-6 text-[#27c93f]">$ open contact</p>
              <p className="mt-1">
                <Link to="/work-with-me" className="text-[#5bb6ff] no-underline hover:underline">
                  olusworks.xyz/work-with-me
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
