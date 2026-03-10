import { Link } from "react-router-dom";
import { PortfolioShell } from "../../components/PortfolioShell";

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  link?: string;
  external?: boolean;
}

const archiveItems: ArchiveItem[] = [
  {
    id: "xp-portfolio",
    title: "Windows XP Portfolio",
    description: "An earlier version of this portfolio built as a Windows XP desktop — draggable icons, start menu, taskbar, wallpaper switcher, and a working pinball game.",
    year: "2024",
    category: "Experiment",
    link: "/archive/xp",
  },
  {
    id: "creative-pay",
    title: "Creative Pay",
    description: "UX concept for matching creators with meaningful brand opportunities. Focused on reducing friction in the creator–brand matching process.",
    year: "2023",
    category: "Concept",
    link: "https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study",
    external: true,
  },
  {
    id: "one-drug-store",
    title: "One Drug Store Checkout",
    description: "Checkout redesign to reduce friction and improve trust at payment. Explored progressive disclosure and trust signal placement.",
    year: "2025",
    category: "Case Study",
  },
];

export const Archive = () => (
  <PortfolioShell contentClassName="max-w-[1000px]">
    <section className="reveal-up">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">Archive</p>
      <h1 className="section-title mt-3 text-5xl leading-[1.04] text-[#111214] sm:text-6xl">
        Past work, experiments, and concepts.
      </h1>
    </section>

    <section className="mt-16 reveal-up reveal-up-delay-1">
      {archiveItems.map((item, index) => {
        const row = (
          <div
            className="group flex items-center justify-between border-t border-black/10 py-8 transition-opacity duration-300"
          >
            <div className="flex items-start gap-8">
              <span className="mt-1 shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="section-title text-2xl text-[#111214] sm:text-3xl lg:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6f747c]">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
                {item.category}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#9a9fa6]">
                {item.year}
              </span>
            </div>
          </div>
        );

        if (item.link && item.external) {
          return (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="block no-underline">
              {row}
            </a>
          );
        }

        if (item.link) {
          return (
            <Link key={item.id} to={item.link} className="block no-underline">
              {row}
            </Link>
          );
        }

        return <div key={item.id}>{row}</div>;
      })}
      <div className="border-t border-black/10" />
    </section>
  </PortfolioShell>
);
