

import { FC } from "react";
import { Navigation } from "../../components/Navigation";

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
      {/* Header Navigation */}
      <header className="w-full mt-10 sm:mt-14 lg:mt-20">
        <Navigation
          items={navigationItems}
          className="flex justify-between items-center w-full text-base sm:text-lg lg:text-xl gap-8"
        />
      </header>

      {/* Main Section */}
      <main className="flex flex-col w-full mt-auto pb-12 sm:pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-end w-full gap-4">
          {/* Headline */}
          <h1
            className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black tracking-tighter leading-[0.85] whitespace-nowrap flex-shrink-0"
            style={{
              fontSize: "clamp(4rem, 10vw, 13rem)",
            }}
          >
            I&apos;m Olu
          </h1>

          {/* Text with 16px spacing */}
          <div className="lg:ml-4">
            <p className="w-full lg:max-w-[520px] xl:max-w-[600px] [font-family:'Sometype_Mono',monospace] font-normal text-gray-700 text-base sm:text-lg lg:text-xl tracking-tight leading-relaxed">
              I help startups and SaaS teams simplify complexity through
              thoughtful, user-centered design. Every screen I craft tells a
              story where users feel seen and products feel effortless.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
