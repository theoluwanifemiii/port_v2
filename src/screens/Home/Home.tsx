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
      {/* Header */}
      <header className="w-full mt-10 sm:mt-14 lg:mt-20">
        <nav className="flex flex-col sm:flex-row sm:items-center w-full bg-red-400 transition-all duration-300 ease-in-out">
          {/* Logo */}
          <div className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-lg sm:text-xl cursor-pointer transition-colors duration-300 hover:text-gray-800 sm:flex-none">
            Olu
          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col sm:flex-row justify-between sm:flex-1 sm:ml-20 mt-4 sm:mt-0 w-full gap-4 sm:gap-0">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className="text-center [font-family:'Sometype_Mono',monospace] text-gray-500 text-base sm:text-lg font-normal tracking-tight leading-relaxed hover:text-black transition-colors duration-300 ease-in-out"
              >
                {item.isNative ? (
                  <Link to={item.href}>{item.text}</Link>
                ) : (
                  <a href={item.href}>{item.text}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col w-full mt-auto pb-12 sm:pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-end w-full gap-8 lg:gap-8">
          {/* Headline */}
          <h1
            className="[font-family:'Neue_Montreal',Helvetica] font-black text-black tracking-tighter leading-[0.85] whitespace-nowrap flex-shrink-0"
            style={{
              fontSize: "235px",
            }}
          >
            I&apos;m Olu
          </h1>

          {/* Paragraph */}
          <p className="w-full [font-family:'Sometype_Mono',monospace] font-normal text-gray-700 text-base sm:text-lg lg:text-xl tracking-tight leading-relaxed transition-all duration-300 ease-in-out">
            I help startups and SaaS teams simplify complexity through
            thoughtful, user-centered design. Every screen I craft tells a story
            where users feel seen and products feel effortless.
          </p>
        </div>
      </main>
    </div>
  );
};
