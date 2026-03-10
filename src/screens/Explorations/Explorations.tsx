import { useMemo, useState } from "react";
import { PortfolioShell } from "../../components/PortfolioShell";
import CurvedWall from "../../components/CurvedWall/CurvedWall";

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

interface PosterItem {
  name: string;
  category: string;
}

const inferCategory = (name: string) => {
  const value = name.toLowerCase();

  if (value.includes("img") || value.includes("wa")) return "Photography";
  if (value.includes("artboard") || value.includes("missions")) return "Series";
  if (value.includes("work sample") || value.includes("campaign")) return "Campaign";
  return "Poster";
};

const posters: PosterItem[] = explorationPosters.map((name) => ({
  name,
  category: inferCategory(name),
}));

const posterSrc = (name: string) => encodeURI(`/My explorations/${name}`);

const readableName = (name: string) =>
  name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const Explorations = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posters.map((poster) => poster.category)))],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return posters.filter((poster) => {
      const matchesCategory = activeFilter === "All" || poster.category === activeFilter;
      const matchesQuery =
        normalized.length === 0 ||
        poster.name.toLowerCase().includes(normalized) ||
        readableName(poster.name).toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

  const mulberry32 = (seed: number) => {
    let t = seed;
    return () => {
      t += 0x6d2b79f5;
      let x = Math.imul(t ^ (t >>> 15), t | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  };

  const wallImages = useMemo(() => {
    const list = filtered.map((poster) => ({
      src: posterSrc(poster.name),
      alt: readableName(poster.name),
    }));

    if (list.length < 2) return list;
    const rnd = mulberry32(shuffleSeed || 1);
    const next = list.slice();
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }, [filtered, shuffleSeed]);

  return (
    <PortfolioShell contentClassName="!max-w-none !px-0 !py-0">
      <section className="relative h-[calc(100vh-4rem-1px)] w-full overflow-hidden bg-[#E7E7E2]">
        {filtered.length === 0 ? (
          <div className="grid h-full w-full place-items-center px-6">
            <div className="hairline-card w-full max-w-xl rounded-2xl px-6 py-16 text-center">
              <p className="text-sm text-[#5b6068]">No result found. Try another keyword.</p>
            </div>
          </div>
        ) : (
          <>
            <CurvedWall
              images={wallImages}
              cols={22}
              rows={4}
              fit={0.55}
              minRadius={420}
              maxRadius={1500}
              bgColor="#E7E7E2"
              openedImageWidth="min(520px, calc(100vw - 56px))"
              openedImageHeight="min(720px, calc(100vh - 160px))"
              imageBorderRadius="16px"
              openedImageBorderRadius="26px"
              grayscale={false}
            />

            {/* Controls — float above the wall, pointer-events isolated */}
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between">
              {/* Top: search + filters */}
              <div className="pointer-events-auto mx-auto w-full max-w-[1080px] px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">
                <div className="rounded-3xl border border-black/10 bg-[#f8f8f5]/85 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#70747b]">
                        Explorations
                      </p>
                      <p className="mt-1 text-sm text-[#1a1d21]">
                        {filtered.length} pieces · Drag to explore · Click to expand
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShuffleSeed((seed) => seed + 1)}
                      className="rounded-full border border-black/15 bg-[#121316] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                    >
                      Shuffle
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search by title"
                      className="w-full rounded-full border border-black/15 bg-white/70 px-5 py-3 text-sm text-[#1a1d21] outline-none placeholder:text-[#868c95] focus:border-[#111214] focus:ring-4 focus:ring-black/5"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveFilter("All");
                      }}
                      className="rounded-full border border-black/15 bg-[#f7f7f3] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#151618]"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {categories.map((category) => {
                      const active = category === activeFilter;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActiveFilter(category)}
                          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs ${
                            active
                              ? "border-[#111214] bg-[#111214] text-white"
                              : "border-black/15 bg-[#f7f7f3] text-[#5b6068]"
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom: tip */}
              <div className="mx-auto w-full max-w-[1080px] px-4 pb-7 sm:px-6 lg:px-8">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e737b]">
                  Tip: Use ESC to close an opened image
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </PortfolioShell>
  );
};
