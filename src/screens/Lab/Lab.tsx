import { FC, ReactNode, useEffect, useRef, useState } from "react";
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

const helpEntries: [string, string][] = [
  ["whoami", "About me"],
  ["stack", "Tech stack"],
  ["principles", "Design philosophy"],
  ["shipped", "Published work"],
  ["now", "Current focus"],
  ["contact", "Work together"],
  ["clear", "Clear terminal"],
  ["exit", "Return home"],
];

const chipCommands = ["help", "stack", "principles", "shipped", "now", "contact"];

const aliases: Record<string, string> = {
  "ls stack/": "stack",
  "ls stack": "stack",
  "cat principles.md": "principles",
  "ls shipped/": "shipped",
  "ls shipped": "shipped",
  "cat now.md": "now",
  "open contact": "contact",
};

const WHOAMI_COMMAND = "$ whoami";

type HistoryEntry = { command: string; output: ReactNode };

export const Lab: FC = () => {
  const navigate = useNavigate();
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    let i = 0;
    const typeInterval = window.setInterval(() => {
      i += 1;
      setTypedCommand(WHOAMI_COMMAND.slice(0, i));
      if (i >= WHOAMI_COMMAND.length) {
        window.clearInterval(typeInterval);
        window.setTimeout(() => setShowOutput(true), 250);
        window.setTimeout(() => setReady(true), 650);
      }
    }, 60);

    return () => window.clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => timeouts.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [history, ready]);

  const later = (fn: () => void, ms: number) => {
    timeoutsRef.current.push(window.setTimeout(fn, ms));
  };

  const runCommand = (raw: string) => {
    const typed = raw.trim();
    const normalized = typed.toLowerCase().replace(/^\$\s*/, "").replace(/\s+/g, " ").trim();

    if (normalized === "") {
      setHistory((h) => [...h, { command: "", output: null }]);
      return;
    }

    setCommandHistory((h) => [...h, typed]);
    setHistoryIndex(-1);

    const command = aliases[normalized] ?? normalized;
    let output: ReactNode;

    switch (command) {
      case "help":
        output = (
          <div className="mt-1 space-y-0.5">
            {helpEntries.map(([cmd, desc]) => (
              <p key={cmd}>
                <span className="inline-block w-28 text-white">{cmd}</span>
                <span className="text-[#8a8f98]">{desc}</span>
              </p>
            ))}
          </div>
        );
        break;

      case "whoami":
        output = (
          <p className="mt-1">
            Oluwanifemi Osunsanya — I help founders turn ideas into products people actually
            use. Based in Lagos, Nigeria.
          </p>
        );
        break;

      case "stack":
        output = (
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
        );
        break;

      case "principles":
        output = (
          <div className="mt-1 space-y-1">
            {principles.map((principle, i) => (
              <p key={principle}>
                <span className="text-[#6a6e76]">{String(i + 1).padStart(2, "0")}</span>{" "}
                {principle}
              </p>
            ))}
          </div>
        );
        break;

      case "shipped":
        output = (
          <div className="mt-1 space-y-1">
            {shipped.map((project) => (
              <p key={project.label}>
                <span className="text-[#27c93f]">✓</span>{" "}
                <Link to={project.to} className="text-[#5bb6ff] no-underline hover:underline">
                  {project.label}
                </Link>
              </p>
            ))}
          </div>
        );
        break;

      case "now":
        output = (
          <div className="mt-1 space-y-1">
            <p>
              <strong className="text-white">MomentOS</strong> — designed, built, and shipped
              solo from idea to production.
            </p>
            <p>
              <Link to="/lab/momentos" className="text-[#5bb6ff] no-underline hover:underline">
                Read the full case study →
              </Link>
            </p>
            <p>
              <a
                href="https://usemomentos.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5bb6ff] no-underline hover:underline"
              >
                usemomentos.xyz ↗
              </a>
            </p>
          </div>
        );
        break;

      case "contact":
        output = <p className="mt-1 text-[#8a8f98]">opening work-with-me →</p>;
        later(() => navigate("/work-with-me"), 400);
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        output = <p className="mt-1 text-[#8a8f98]">logging out →</p>;
        later(() => navigate("/"), 400);
        break;

      case "sudo hire-me":
        output = (
          <div className="mt-1 space-y-0.5">
            <p className="text-[#27c93f]">permission granted.</p>
            <p className="text-[#8a8f98]">redirecting...</p>
          </div>
        );
        later(() => navigate("/work-with-me"), 700);
        break;

      default:
        output = (
          <div className="mt-1 space-y-1">
            <p>command not found: {normalized}</p>
            <p className="text-[#8a8f98]">Try 'help'</p>
          </div>
        );
    }

    setHistory((h) => [...h, { command: typed, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    inputRef.current?.focus();
  };

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
              className="cursor-text bg-[#0d0f12] px-5 py-6 text-sm leading-relaxed"
              style={{ fontFamily: "Sometype Mono, monospace" }}
              onClick={focusInput}
            >
              {/* Boot sequence */}
              <p className="text-[#27c93f]">
                {typedCommand}
                <span className="animate-pulse">{typedCommand.length < WHOAMI_COMMAND.length ? "▍" : ""}</span>
              </p>
              <p className={`mt-1 transition-opacity duration-300 ${showOutput ? "opacity-100" : "opacity-0"}`}>
                Oluwanifemi Osunsanya — I help founders turn ideas into products people actually
                use. Based in Lagos, Nigeria.
              </p>

              <div className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
                <p className="mt-5 text-[#8a8f98]">
                  Type <span className="text-white">`help`</span> or tap a command.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chipCommands.map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => runCommand(cmd)}
                      className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-[#e7e8ea] transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>

                {/* Command history */}
                {history.map((entry, i) => (
                  <div key={i} className="mt-5">
                    <p className="term-line text-[#27c93f]">$ {entry.command}</p>
                    {entry.output && <div className="term-output">{entry.output}</div>}
                  </div>
                ))}

                {/* Live prompt */}
                <p className="mt-5 text-[#27c93f]">
                  $ <span className="text-[#e7e8ea]">{input}</span>
                  <span className="animate-pulse">▍</span>
                </p>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setHistoryIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="absolute h-px w-px opacity-0"
                  aria-label="Terminal input"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <div ref={bottomRef} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
