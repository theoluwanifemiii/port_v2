import React from "react";

const navigationItems = [
  { text: "What have i done" },
  { text: "Who am i ?" },
  { text: "My explorations" },
  { text: "Work with me" },
];

export const Home = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-6 sm:px-12 lg:px-16">
      <header className="w-full mt-12 sm:mt-16 lg:mt-20">
        <nav className="w-full max-w-6xl mx-auto">
          <ul className="flex justify-between w-full">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-500 text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed cursor-pointer hover:text-gray-900 transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex flex-col w-full mt-auto pb-12 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-16">
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
