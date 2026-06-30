import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Explorations", href: "/explorations" },
  { label: "Contact", href: "/work-with-me" },
  { label: "Archive", href: "/archive" },
];

const resumeUrl =
  "https://drive.google.com/file/d/1ECIrky5LKSqD7UoULMbYi7zt35m3VXe9/view?usp=sharing";

const nowLabel = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

export const PortfolioTopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isItemActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#efefeb]/90 backdrop-blur-sm">
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
            <p className="text-sm font-medium text-[#151618]">Oluwanifemi Osunsanya</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
              Product Designer
            </p>
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <button
            type="button"
            role="switch"
            aria-checked={false}
            onClick={() => navigate("/lab")}
            aria-label="Switch to Builder mode"
            className="hidden h-16 items-center gap-2 border-l border-r border-black/10 px-7 md:flex"
          >
            <span className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-black/15 bg-[#f7f7f3]">
              <span className="inline-block h-3.5 w-3.5 translate-x-0.5 transform rounded-full bg-[#111214]" />
            </span>
            <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
              Builder mode
            </span>
          </button>

          <div className="hidden h-16 items-center gap-2 border-r border-black/10 px-7 md:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#3FBE00]" />
            <span className="whitespace-nowrap text-sm text-[#1e2023]">Available For Hire</span>
          </div>

          <nav className="hidden h-16 items-center md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex h-16 items-center border-r border-black/10 px-7 text-sm no-underline transition-colors ${
                    active ? "text-[#111214]" : "text-[#666a72] hover:text-[#111214]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex h-16 shrink-0 items-center gap-4">
          <span className="hidden text-sm text-[#4f545d] sm:inline">{nowLabel()}</span>
          <StaggeredMenu
            className="md:hidden"
            position="right"
            items={[
              { label: "Home", ariaLabel: "Go to home page", link: "/" },
              { label: "Projects", ariaLabel: "View projects", link: "/work" },
              { label: "About", ariaLabel: "Learn about me", link: "/about" },
              { label: "Explorations", ariaLabel: "View explorations", link: "/explorations" },
              { label: "Contact", ariaLabel: "Get in touch", link: "/work-with-me" },
              { label: "Archive", ariaLabel: "View Windows XP archive", link: "/archive" },
            ]}
            socialItems={[{ label: "Resume", link: resumeUrl }]}
            displaySocials
            displayItemNumbering
            menuButtonColor="#f7f7f3"
            openMenuButtonColor="#f7f7f3"
            changeMenuColorOnOpen
            colors={["#111214", "#0b0b10"]}
            logoUrl="/IMG_7861 2.jpg"
            accentColor="#0054e3"
          />
          <button
            type="button"
            role="switch"
            aria-checked={false}
            onClick={() => navigate("/lab")}
            aria-label="Switch to Builder mode"
            className="flex items-center gap-2 rounded-full border border-black/15 bg-[#f7f7f3] px-3 py-2 md:hidden"
          >
            <span className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-black/15 bg-white">
              <span className="inline-block h-3.5 w-3.5 translate-x-0.5 transform rounded-full bg-[#111214]" />
            </span>
            <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-[#6a6f76]">
              Builder
            </span>
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-[#151618]/20 bg-[#151618] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-black md:inline-flex"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};
