import { FC } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";

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
    <div className="flex flex-col w-full min-h-screen px-6 sm:px-12 lg:px-16 xl:px-24" style={{ background: '#5a7fdc' }}>
      <div className="xp-window max-w-7xl w-full mx-auto mt-8 mb-8 min-h-[calc(100vh-4rem)]">
        <div className="xp-title-bar">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Olu's Portfolio - Microsoft Internet Explorer
            </span>
          </div>
          <div className="flex gap-1">
            <button className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] border border-[#1a4db5] text-white text-xs font-bold">_</button>
            <button className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] border border-[#1a4db5] text-white text-xs font-bold">□</button>
            <button className="w-6 h-5 bg-[#d93831] hover:bg-[#c02820] border border-[#b02018] text-white text-xs font-bold">×</button>
          </div>
        </div>

        <header className="w-full px-6 pt-8 pb-4 border-b-2 border-[#b4b4b4]" style={{ background: 'var(--xp-gray)' }}>
          <Navigation items={navigationItems} />
        </header>

        <main className="flex flex-col w-full px-6 py-12" style={{ background: 'var(--xp-gray)', minHeight: '60vh' }}>
          <div className="flex flex-col items-start w-full gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1">
              <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-b from-[#69d669] to-[#3cb538] rounded border border-[#2d8c2d] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">O</span>
                  </div>
                  <h1 className="font-black text-[#003da8] text-5xl lg:text-6xl" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                    I'm Olu
                  </h1>
                </div>

                <p className="font-normal text-gray-800 text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  I help startups and SaaS teams simplify complexity through
                  thoughtful, user-centered design. Every screen I craft tells a story
                  where users feel seen and products feel effortless.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/work"
                  className="xp-button-green no-underline inline-block"
                >
                  View My Work
                </Link>
                <Link
                  to="/work-with-me"
                  className="xp-button no-underline inline-flex items-center"
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-gradient-to-br from-[#0054e3] to-[#5a7fdc] rounded-lg border-4 border-white shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect x="15" y="25" width="50" height="35" rx="3" fill="#ece9d8"/>
                      <rect x="15" y="25" width="50" height="12" rx="3" fill="url(#header-gradient)"/>
                      <defs>
                        <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0997ff"/>
                          <stop offset="100%" stopColor="#0053ee"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="text-white font-bold" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="xp-taskbar px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="xp-start-button flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" fill="transparent"/>
                <path d="M3 3 L17 10 L3 17 Z" fill="white"/>
              </svg>
              start
            </button>
          </div>
          <div className="text-white text-xs font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </footer>
      </div>
    </div>
  );
};
