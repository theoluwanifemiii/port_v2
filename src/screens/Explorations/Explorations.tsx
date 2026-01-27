import React, { useEffect, useState } from "react";
import { Navigation } from "../../components/Navigation";
import { WindowControls } from "../../components/WindowControls";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/about", isNative: true },
  { text: "My explorations", href: "/explorations", isNative: true },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

const explorationPosters = [
  " Instagram.png",
  "0.png",
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6png.png",
  "7.png",
  "Artboard 1.png",
  "Artboard 10 copy.png",
  "Artboard 10Open Heavens.png",
  "Artboard 11.png",
  "Artboard 111.png",
  "Artboard 12.png",
  "Artboard 14.png",
  "Artboard 16Missions.png",
  "Artboard 17.png",
  "Artboard 17Missions.png",
  "Artboard 18Missions.png",
  "Artboard 19Missions.png",
  "Artboard 2.png",
  "Artboard 20Missions.png",
  "Artboard 21Missions.png",
  "Artboard 22 copyMissions.png",
  "Artboard 22Missions.png",
  "Artboard 24.png",
  "Artboard 2God Of Wonde.png",
  "Artboard 4.png",
  "Artboard 5.png",
  "Artboard 5Open Heavens.png",
  "Artboard 6 copy.png",
  "Artboard 6Open Heavens.png",
  "Artboard 7Open Heavens.png",
  "Artboard 8.png",
  "Artboard 8Open Heavens.png",
  "Artboard 9Open Heavens.png",
  "Artboard9.png",
  "Bible Text.png",
  "Brain  Teaser.png",
  "Carol 2022-1.jpg",
  "IMG-20221231-WA0001.jpg",
  "IMG-20230103-WA0023.jpg",
  "IMG-20230103-WA0024.jpg",
  "IMG-20230103-WA0025.jpg",
  "IMG-20230108-WA0001.jpg",
  "IMG-20230205-WA0043.jpg",
  "IMG-20230207-WA0005.jpg",
  "IMG-20230207-WA0006.jpg",
  "IMG-20230207-WA0007.jpg",
  "IMG-20230208-WA0011.jpg",
  "IMG-20230724-WA0024.jpg",
  "IMG-20230726-WA0036.jpg",
  "IMG_7434.PNG",
  "IMG_9336.PNG",
  "IMG_9340.PNG",
  "IMG_9341.PNG",
  "Joyous Noel_.jpg",
  "Mother_s daypng-04.png",
  "Mother_s daypng-05.png",
  "My Designs.png",
  "Noche De Cine.png",
  "Oluwanifemi Osunsanya.png",
  "Overflow.png",
  "Photizo Is Coiming.png",
  "Sep-01.png",
  "Sep-02.png",
  "Song for the week (2).png",
  "Thanks Giving_.png",
  "The great commission.png",
  "WGS 12-01.jpg",
  "WelcomeMissions.png",
  "Work Sample .png",
  "Work Sample 2 _Eden Monday.png",
  "Work Sample 2 _Limited menu.png",
  "Work Sample 3.png",
  "Work Sample _BF is Live.png",
  "Work Sample _EBF.png",
  "Work Sample _Glovo and Chowdeck .png",
  "call of volunteers-13-13.jpg",
  "may designArtboard 1.png",
  "sit back.png",
  "tote bags_.jpg",
  "welcome .png",
];

const posterSrc = (name: string) => encodeURI(`/My explorations/${name}`);

export const Explorations = () => {
  const [activePoster, setActivePoster] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePoster(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const rows = [
    explorationPosters.slice(0, 24),
    explorationPosters.slice(24, 48),
    explorationPosters.slice(48),
  ].filter((row) => row.length > 0);

  return (
    <div className="flex flex-col w-full min-h-screen px-2 sm:px-6 lg:px-12" style={{ background: "#5a7fdc" }}>
      <div className="xp-window max-w-7xl w-full mx-auto mt-2 sm:mt-8 mb-2 sm:mb-8 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-4rem)]">
        <WindowControls title="My Explorations - Microsoft Internet Explorer" />

        <header className="w-full px-3 sm:px-6 pt-4 sm:pt-8 pb-3 sm:pb-4 border-b-2 border-[#b4b4b4] hidden sm:block" style={{ background: "var(--xp-gray)" }}>
          <Navigation items={navigationItems} />
        </header>

        <main className="w-full px-3 sm:px-6 py-4 sm:py-8 overflow-y-auto" style={{ background: "var(--xp-gray)", maxHeight: "calc(100vh - 8rem)" }}>
          <style>{`
            .explore-stage {
              position: relative;
              background: rgba(237, 233, 216, 0.8);
              border: 2px solid #d1c8b3;
              box-shadow: inset 0 0 0 1px #e2d8c3;
              overflow: hidden;
              border-radius: 18px;
            }

            .explore-stage::before {
              content: "";
              position: absolute;
              inset: 0;
              background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
              background-size: 120px 120px;
              opacity: 0.5;
              pointer-events: none;
            }

            .explore-row {
              display: flex;
              width: 100%;
              overflow: hidden;
              position: relative;
              z-index: 1;
            }

            .explore-track {
              display: flex;
              gap: 24px;
              padding: 20px 0;
              width: max-content;
              animation: scroll-left 35s linear infinite;
            }

            .explore-row.reverse .explore-track {
              animation: scroll-right 38s linear infinite;
            }

            .explore-row.fast .explore-track {
              animation-duration: 26s;
            }

            .explore-row.slow .explore-track {
              animation-duration: 46s;
            }

            .explore-card {
              width: 180px;
              height: 240px;
              border-radius: 16px;
              overflow: hidden;
              background: #111827;
              box-shadow: 0 10px 24px rgba(0,0,0,0.18);
              transform: translateZ(0);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            @media (min-width: 768px) {
              .explore-card { width: 210px; height: 280px; }
            }

            @media (min-width: 1024px) {
              .explore-card { width: 240px; height: 320px; }
            }

            .explore-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .explore-card:hover {
              transform: translateY(-6px) scale(1.02);
              box-shadow: 0 14px 32px rgba(0,0,0,0.25);
            }

            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            @keyframes scroll-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }

            .explore-overlay {
              position: fixed;
              inset: 0;
              background: rgba(9, 9, 9, 0.85);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 100;
              padding: 24px;
            }

            .explore-modal {
              max-width: 96vw;
              max-height: 92vh;
              border-radius: 18px;
              overflow: hidden;
              box-shadow: 0 30px 80px rgba(0,0,0,0.25);
              background: transparent;
            }

            .explore-modal img {
              max-width: 96vw;
              max-height: 92vh;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
              background: transparent;
            }
          `}</style>
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-md">
              <h1 className="font-bold text-[#003da8] text-3xl sm:text-4xl mb-4 flex items-center gap-3" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
                <span className="text-2xl">🖼️</span> My explorations
              </h1>

              <div className="mb-4 p-3 bg-[#fffacd] border border-[#b4b4b4]">
                <p className="text-sm text-gray-800" style={{ fontFamily: "Sometype Mono, Courier New, monospace" }}>
                  🗂️ Loading poster archive…
                </p>
              </div>

              <div className="explore-stage">
                {rows.map((row, index) => (
                  <div
                    key={`row-${index}`}
                    className={`explore-row ${index % 2 === 1 ? "reverse" : ""} ${index % 3 === 0 ? "fast" : index % 3 === 2 ? "slow" : ""}`}
                  >
                    <div className="explore-track">
                      {[...row, ...row].map((poster, posterIndex) => (
                        <button
                          key={`${poster}-${posterIndex}`}
                          type="button"
                          className="explore-card"
                          onClick={() => setActivePoster(poster)}
                        >
                          <img
                            src={posterSrc(poster)}
                            alt={`Poster ${poster}`}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="xp-taskbar px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="xp-start-button flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" fill="transparent" />
                <path d="M3 3 L17 10 L3 17 Z" fill="white" />
              </svg>
              start
            </button>
          </div>
          <div className="text-white text-xs font-medium" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </footer>
      </div>

      {activePoster && (
        <div className="explore-overlay" onClick={() => setActivePoster(null)}>
          <div className="explore-modal" onClick={(event) => event.stopPropagation()}>
            <img src={posterSrc(activePoster)} alt={`Poster ${activePoster}`} />
          </div>
        </div>
      )}
    </div>
  );
};
