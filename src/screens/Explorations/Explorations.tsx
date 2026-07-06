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

const wallImages = posters.map((poster) => ({
  src: posterSrc(poster.name),
  alt: readableName(poster.name),
}));

export const Explorations = () => (
  <PortfolioShell contentClassName="!max-w-none !px-0 !py-0">
    <section className="relative h-[calc(100vh-4rem-1px)] w-full overflow-hidden bg-[#E7E7E2]">
      <CurvedWall
        images={wallImages}
        cols={21}
        rows={4}
        fit={0.55}
        minRadius={420}
        maxRadius={1500}
        bgColor="#E7E7E2"
        imageBorderRadius="16px"
        openedImageBorderRadius="26px"
        grayscale={false}
        autoRotate={true}
        autoRotateSpeed={5}
      />
    </section>
  </PortfolioShell>
);