import { FC } from "react";
import { Link } from "react-router-dom";

const role = [
  "Product Strategy",
  "UX Research",
  "Product Design",
  "Design System",
  "Frontend Engineering",
  "Backend Engineering",
];

const myRole = [
  "Product Strategy",
  "User Research",
  "Information Architecture",
  "UX Design",
  "UI Design",
  "Design System",
  "Frontend Development",
  "Backend Development",
  "Database Design",
  "AI Workflow Design",
  "Product Testing",
  "QA",
  "Deployment",
];

const Quote: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-4 border-l-2 border-[#27c93f] pl-3 text-white">{children}</p>
);

export const MomentOS: FC = () => {
  return (
    <div className="min-h-screen bg-[#111214] text-[#e7e8ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111214]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[760px] items-center justify-between px-6">
          <Link
            to="/lab"
            className="text-[11px] uppercase tracking-[0.14em] text-[#9a9ea5] no-underline hover:text-white"
          >
            ← Back to the Lab
          </Link>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#6a6e76]">
            2026 — Ongoing
          </span>
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
                builder@olusworks: ~/projects/momentos
              </span>
            </div>

            <div
              className="bg-[#0d0f12] px-5 py-6 text-sm leading-relaxed text-[#d7dadf]"
              style={{ fontFamily: "Sometype Mono, monospace" }}
            >
              <p className="text-[#27c93f]">$ cat README.md</p>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-lg font-semibold text-white">MomentOS</p>
                <a
                  href="https://usemomentos.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5bb6ff] no-underline hover:underline"
                >
                  usemomentos.xyz 
                </a>
              </div>
              <p className="mt-1">How a church birthday template became a celebration platform.</p>
              <p className="mt-4">Role: {role.join(" · ")}</p>
              <p className="mt-1">Duration: 2026 · Ongoing</p>

              <p className="mt-8 text-[#27c93f]">$ cat origin.md</p>
              <p className="mt-4">
                At our church's annual media retreat, we were planning this year's birthday
                templates — the same routine as always: someone remembers the date, updates the
                design, exports it, posts it on time.
              </p>
              <Quote>Why are we still doing this manually?</Quote>
              <p className="mt-4">
                I asked friends in HR how their companies handled it. Same story everywhere:
                spreadsheets, calendar reminders, or someone expected to just remember.
                Remembering people had quietly become manual labour. So I built the first version
                of MomentOS — it remembered birthdays, generated personalised messages, and
                delivered them automatically.
              </p>

              <p className="mt-8 text-[#27c93f]">$ cat pivot.md</p>
              <p className="mt-4">A few weeks in, I realised I had made a mistake.</p>
              <Quote>I wasn't solving a birthday problem. I was solving a celebration problem.</Quote>
              <p className="mt-4">
                Anniversaries, work milestones, graduations, dedications — birthdays were just the
                entry point. And the users weren't only businesses. A founder appreciating
                employees. A church celebrating its members. A husband who won't forget his
                anniversary again.
              </p>
              <Quote>The common thread wasn't business. It was relationships.</Quote>
              <p className="mt-4">
                Delivery followed the same logic: email first, then SMS, with WhatsApp next —
                reach people where they already communicate.
              </p>

              <p className="mt-8 text-[#27c93f]">$ cat decisions.md</p>
              <Quote>What is a celebration without a gift?</Quote>
              <p className="mt-4">
                Our first instinct was a gifting marketplace: recipients request items, we buy and
                deliver them. Then the operational reality — changing prices, quality guarantees,
                vendors with no online store. We weren't building an e-commerce company. The real
                problem was making meaningful gifts easier: recipients build wishlists, friends
                contribute, the recipient redeems. MomentOS stays in the celebration and payment
                layer — never logistics.
              </p>
              <Quote>
                The hardest product decisions rarely involve interface design. They involve
                deciding what not to build.
              </Quote>

              <p className="mt-8 text-[#27c93f]">$ cat roadmap.md</p>
              <p className="mt-4">
                Next: <strong className="text-white">Birthday Wrapped</strong> — a
                Spotify-Wrapped-style recap of your celebration. Who celebrated you, the messages,
                the gifts, the people who show up year after year. A birthday that becomes a
                memory instead of a disappearing notification.
              </p>

              <p className="mt-8 text-[#27c93f]">$ cat why.md</p>
              <Quote>It's about making sure people don't feel invisible.</Quote>
              <p className="mt-4">
                People forget dates not because they don't care, but because life is loud. If
                MomentOS helps one employee feel appreciated or one friend remind another that
                they matter, we've built something more valuable than automation.
              </p>
              <Quote>We've built a product that helps people feel seen.</Quote>

              <p className="mt-8 text-[#27c93f]">$ cat role.md</p>
              <p className="mt-1">
                MomentOS is entirely designed and engineered by me. I owned every layer of the
                product, end to end.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {myRole.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-8 text-[#27c93f]">$ open contact</p>
              <p className="mt-1">
                <Link to="/work-with-me" className="text-[#5bb6ff] no-underline hover:underline">
                  olusworks.xyz/work-with-me
                </Link>
              </p>
              <p className="mt-1">
                <Link to="/lab" className="text-[#5bb6ff] no-underline hover:underline">
                  ← back to the Lab
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
