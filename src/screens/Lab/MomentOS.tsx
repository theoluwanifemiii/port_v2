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

              <p className="mt-8 text-[#27c93f]">$ cat origin-story.md</p>

              <p className="mt-4">
                At the beginning of the year, our church held its annual media retreat. As one of
                the in-house product designers, we were discussing what this year's birthday
                templates should look like. Like every year, someone on the media team would have
                to remember whose birthday it was, update the design, export it, and make sure it
                got posted on time. As we talked, I found myself asking a simple question that
                refused to leave my mind:
              </p>
              <Quote>Why are we still doing this manually?</Quote>
              <p className="mt-4">
                That question stayed with me long after the retreat ended. The more I thought
                about it, the more I realized this wasn't just a church problem — it felt like
                something much bigger. So I reached out to a few friends who work in Human
                Resources to understand how birthdays were handled in their organizations. The
                answers were surprisingly similar. Companies that weren't using enterprise HR
                software relied on spreadsheets, Google Calendar reminders, or simply expected
                someone in HR to remember. Sometimes they did. Sometimes they didn't. It wasn't
                that organizations didn't care about their employees — remembering people had
                quietly become another manual responsibility.
              </p>
              <p className="mt-4">That insight became the foundation of MomentOS.</p>
              <p className="mt-4">
                The first version of the product was simple. It automatically remembered
                birthdays, generated personalized messages, and delivered them without requiring
                someone to remember every date. The goal wasn't just to automate email delivery —
                it was to remove the operational burden of remembering people so that celebrations
                could happen consistently.
              </p>
              <p className="mt-4">
                A few weeks after building the first version, I realized I had made a mistake.
              </p>
              <Quote>I wasn't solving a birthday problem. I was solving a celebration problem.</Quote>
              <p className="mt-4">
                Birthdays are only one of many moments that matter. People celebrate wedding
                anniversaries, employee work anniversaries, graduations, promotions, customer
                milestones, volunteer appreciation, baby dedications, and countless other personal
                moments. The more I looked at it, the more obvious it became that birthdays were
                simply the entry point into a much larger opportunity.
              </p>
              <p className="mt-4">
                That realization completely changed the direction of the product. MomentOS
                stopped being a birthday automation platform and became a celebration automation
                platform. Instead of being limited to one recurring event, it became a system
                capable of helping people and organizations celebrate any meaningful occasion
                automatically.
              </p>
              <p className="mt-4">
                As the product evolved, another assumption changed. Initially, I believed
                businesses would be the primary users — after all, the idea came from
                conversations with HR professionals. But the more I reflected on it, the more I
                realized that celebration isn't a business problem. It's a human one.
              </p>
              <p className="mt-4">
                A founder wants to appreciate employees. A church wants to celebrate its members.
                A husband doesn't want to forget his wedding anniversary. A daughter wants to make
                sure her siblings remember their mother's birthday. Friends want to celebrate
                someone's graduation. Families want to make people feel seen.
              </p>
              <Quote>The common thread wasn't business. It was relationships.</Quote>
              <p className="mt-4">
                That insight broadened the vision considerably. MomentOS became something anyone
                could use if they genuinely cared about the people around them.
              </p>
              <p className="mt-4">
                The delivery experience evolved alongside the vision. Email was the obvious
                starting point, but it quickly became clear that people communicate differently.
                Some people rarely open their inbox, while others respond almost instantly to text
                messages. Many important conversations happen on WhatsApp. Rather than forcing
                users into a single communication channel, we expanded the platform to support
                multiple delivery methods, starting with email and SMS while laying the foundation
                for WhatsApp integration. The objective was never simply to send messages. It was
                to reach people where they already communicate.
              </p>
              <p className="mt-4">
                While building the platform, I kept returning to one question:
              </p>
              <Quote>What is a celebration without a gift?</Quote>
              <p className="mt-4">
                That question led us into the next phase of product discovery. Our first instinct
                was to build a gifting marketplace where recipients could request items and
                MomentOS would purchase and deliver them. The idea sounded exciting until we
                started thinking through the operational realities. How would we handle changing
                market prices? How would we guarantee product quality? What happens when someone
                requests something from a local vendor that doesn't have an online store? We
                quickly realized that we weren't trying to build another e-commerce company.
              </p>
              <p className="mt-4">
                Instead, we stepped back and asked what problem we were really trying to solve.
                The answer wasn't purchasing products. It was making it easier for people to give
                meaningful gifts.
              </p>
              <p className="mt-4">
                The solution we landed on was much simpler. Recipients create wishlists containing
                products they genuinely want, ideally linked directly to trusted online stores.
                Friends contribute toward those gifts instead of guessing what to buy. Once enough
                money has been contributed, the recipient redeems the gift themselves. By keeping
                MomentOS in the payment and celebration layer instead of the logistics layer, we
                significantly reduced operational complexity while creating a better experience
                for everyone involved.
              </p>
              <p className="mt-4">
                That discovery process reinforced something I've learned repeatedly while building
                MomentOS.
              </p>
              <Quote>
                The hardest product decisions rarely involve interface design. They involve
                deciding what not to build.
              </Quote>
              <p className="mt-4">
                Today, MomentOS continues to evolve beyond automation. One of the ideas I'm most
                excited about is Birthday Wrapped, inspired by Spotify Wrapped. Every year, people
                receive birthday wishes from friends, family, colleagues, and communities, but
                those moments disappear almost immediately. What if we could preserve them?
              </p>
              <p className="mt-4">
                Imagine opening MomentOS after your birthday and seeing a beautifully designed
                recap of your celebration. Who celebrated you. The messages you received. The
                gifts friends contributed. The people who consistently showed up for you year
                after year. Instead of becoming another notification that disappears, your
                birthday becomes a memory worth revisiting and sharing.
              </p>
              <p className="mt-4">
                At its core, MomentOS has never really been about birthdays, emails, or
                automation.
              </p>
              <Quote>It's about making sure people don't feel invisible.</Quote>
              <p className="mt-4">
                Life gets busy. Meetings pile up. Families grow. Responsibilities increase. People
                forget important dates, not because they don't care, but because life demands
                their attention elsewhere. Technology has become incredibly good at helping us
                communicate faster, yet it has done surprisingly little to help us remain
                intentional with the people we love. I believe technology should strengthen
                relationships, not replace them.
              </p>
              <p className="mt-4">
                If MomentOS can help one employee feel appreciated, one spouse avoid forgetting an
                anniversary, one church consistently celebrate its members, or one friend remind
                another that they matter, then we've built something far more valuable than an
                automation platform.
              </p>
              <Quote>We've built a product that helps people feel seen.</Quote>
              <p className="mt-4">And to me, that's a problem worth solving.</p>

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
