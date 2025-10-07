import { FC } from "react";
import { Link } from "react-router-dom";

interface NavigationItem {
  text: string;
  href: string;
  isNative: boolean;
}

const navigationItems: NavigationItem[] = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "#", isNative: false },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

export const Home: FC = () => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-6 sm:px-12 lg:px-16 xl:px-24">
      {/* Header */}
      <header className="w-full mt-10 sm:mt-14 lg:mt-20">
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-7xl mx-auto gap-6 sm:gap-0 transition-all duration-300 ease-in-out">
          {/* Logo */}
          <div className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-lg sm:text-xl cursor-pointer transition-colors duration-300 hover:text-gray-800">
            Olu
          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col sm:flex-row justify-between sm:justify-end items-start sm:items-center w-full sm:w-auto gap-3 sm:gap-16 transition-all duration-300 ease-in-out">
            {navigationItems.map((item, index) => (
              <li key={index}>
                {item.isNative ? (
                  <Link
                    to={item.href}
                    className="[font-family:'Sometype_Mono',monospace] text-gray-500 text-base sm:text-lg font-normal tracking-tight leading-relaxed hover:text-black transition-colors duration-300 ease-in-out"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="[font-family:'Sometype_Mono',monospace] text-gray-500 text-base sm:text-lg font-normal tracking-tight leading-relaxed hover:text-black transition-colors duration-300 ease-in-out"
                  >
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col w-full mt-auto pb-12 sm:pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8 lg:gap-16">
          {/* Headline */}
          <h1
            className="[font-family:'Neue_Montreal',Helvetica] font-black text-black tracking-tighter leading-[0.85] whitespace-nowrap flex-shrink-0"
            style={{
              fontSize: "clamp(4rem, 10vw, 13rem)",
            }}
          >
            I&apos;m Olu
          </h1>

          {/* Paragraph */}
          <p className="w-full lg:max-w-[520px] xl:max-w-[600px] [font-family:'Sometype_Mono',monospace] font-normal text-gray-700 text-base sm:text-lg lg:text-xl tracking-tight leading-relaxed transition-all duration-300 ease-in-out">
            I help startups and SaaS teams simplify complexity through
            thoughtful, user-centered design. Every screen I craft tells a story
            where users feel seen and products feel effortless.
          </p>
        </div>
      </main>
    </div>
  );
};