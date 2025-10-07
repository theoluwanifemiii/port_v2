import { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationItem {
  text: string;
  href: string;
  isNative: boolean;
}

const navigationItems: NavigationItem[] = [
  { text: "What have I done", href: "/work", isNative: true },
  { text: "Who am I ?", href: "#", isNative: false },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

export const Home: FC = () => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-6 sm:px-12 lg:px-16 xl:px-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="[font-family:'Neue_Montreal',Helvetica] text-lg sm:text-xl font-bold text-black mb-4 md:mb-0">
            Olu
          </div>

          {/* Navigation */}
          <ul className="flex flex-col md:flex-row md:space-x-12 w-full md:w-auto text-sm [font-family:'Sometype_Mono',monospace] text-gray-700">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className="text-center py-2 md:py-0 relative group cursor-pointer"
              >
                {item.isNative ? (
                  <Link
                    to={item.href}
                    className="transition-colors duration-300 group-hover:text-black"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="transition-colors duration-300 group-hover:text-black"
                  >
                    {item.text}
                  </a>
                )}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col w-full mt-48 sm:mt-56 lg:mt-64">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8 lg:gap-16">
          {/* Headline */}
          <h1
            className="[font-family:'Neue_Montreal',Helvetica] font-black text-black tracking-tighter leading-[0.85] whitespace-nowrap"
            style={{
              fontSize: "clamp(4rem, 10vw, 13rem)",
            }}
          >
            I&apos;m Olu
          </h1>

          {/* Supporting Text */}
          <p className="w-full lg:max-w-[520px] xl:max-w-[600px] [font-family:'Sometype_Mono',monospace] text-gray-700 text-base sm:text-lg lg:text-xl font-normal tracking-tight leading-relaxed">
            I help startups and SaaS teams simplify complexity through
            thoughtful, user-centered design. Every screen I craft tells a story
            where users feel seen and products feel effortless.
          </p>
        </div>
      </main>
    </div>
  );
};
