import React from "react";
import { Navigation } from "../../components/Navigation";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/", isNative: true },
  { text: "My explorations", href: "/", isNative: false },
  { text: "Work with me", href: "/", isNative: false },
];

export const Home = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-6 sm:px-12 lg:px-16">
      <header className="w-full mt-12 sm:mt-16 lg:mt-20">
        <Navigation items={navigationItems} />
      </header>

      <main className="flex flex-col w-full mt-auto pb-12 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 lg:gap-16">
          <h1 className="[font-family:'Linked',Helvetica] font-black text-black text-[80px] sm:text-[120px] lg:text-[180px] xl:text-[220px] tracking-tighter leading-[0.85] whitespace-nowrap flex-shrink-0">
            I&apos;m Olu
          </h1>

          <p className="w-full lg:w-auto lg:max-w-[500px] xl:max-w-[600px] [font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base sm:text-lg lg:text-xl tracking-tight leading-relaxed pb-4 lg:pb-8">
            I help startups and SaaS teams simplify complexity through thoughtful, user-centered design. Every screen I craft tells a story where users feel seen and products feel effortless.
          </p>
        </div>
      </main>
    </div>
  );
};
