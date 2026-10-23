import { FC } from "react";
import { Link } from "react-router-dom";
import { IMG, PATHS } from "./theme";
import { DoubleRule, Eyebrow, IconArrow, IconInstagram, IconPin, IconStar, PhoneShell } from "./ui";

const MENUS = [
  { num: "I", title: "Euphoria Food Menu", line: "From breakfast to the Taste of Africa", to: PATHS.food, img: IMG.signature, pos: "center 40%" },
  { num: "II", title: "Euphoria Drinks Menu", line: "Cocktails, wine, champagne and cigars", to: PATHS.drinks, img: IMG.cocktail, pos: "center 30%" },
  { num: "III", title: "Business Lunch", line: "Weekdays, [hours to confirm]", to: PATHS.lunch, img: IMG.diningRoom, pos: "center 55%" },
  { num: "IV", title: "Saturday Brunch Menu", line: "Saturdays by the pool, [hours to confirm]", to: PATHS.brunch, img: IMG.pool, pos: "center 60%" },
];

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

/** 01 Scan: the page a guest lands on from the table QR code. */
export const Landing: FC = () => (
  <PhoneShell>
    {/* Welcome */}
    <header className="relative flex flex-col items-center overflow-hidden bg-eu-green px-6 pb-10 pt-14 text-center">
      <img src={IMG.mark} alt="" aria-hidden="true" className="absolute left-[-2px] top-[140px] h-[402px] w-[420px] max-w-none opacity-[0.06]" />
      <div className="pl-[0.42em] font-eu-display text-[11px] tracking-[0.42em] text-eu-pink">OLD IKOYI</div>
      <img
        src={IMG.logo}
        alt="Euphoria, Pool Restaurant Lounge"
        className="relative mt-7 h-[158px] w-[236px] object-cover"
        style={{ objectPosition: "50% 100%" }}
      />
      <DoubleRule width={200} line="bg-eu-ivory/[0.35]" diamond={6} className="relative mt-8" />
      <p className="relative m-0 mt-6 font-eu-serif text-[19px] italic leading-[1.45] text-eu-ivory">
        {greeting()}, and welcome.
        <br />
        Your table awaits its first order.
      </p>
    </header>

    {/* Menus */}
    <section className="px-4 pb-2 pt-12">
      <div className="flex flex-col gap-2 px-2">
        <Eyebrow>THE MENUS</Eyebrow>
        <h1 className="m-0 font-eu-display text-[26px] font-normal leading-[1.25] tracking-[0.06em]">Choose Your Menu</h1>
      </div>
      <nav aria-label="Menus" className="mt-7 flex flex-col gap-7">
        {MENUS.map((m) => (
          <Link key={m.to} to={m.to} className="eu-plate block text-eu-ivory no-underline">
            <div className="h-[196px] overflow-hidden bg-eu-raised">
              <img src={m.img} alt="" className="eu-photo block h-full w-full object-cover" style={{ objectPosition: m.pos }} />
            </div>
            <div className="flex items-start gap-4 px-2 pt-[18px]">
              <div className="w-7 pt-1 font-eu-display text-[13px] tracking-[0.08em] text-eu-pink">{m.num}</div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="font-eu-display text-[19px] leading-[1.25] tracking-[0.08em]">{m.title}</div>
                <div className="font-eu-serif text-[15px] italic leading-[1.4] text-eu-ivory/[0.68]">{m.line}</div>
              </div>
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center border border-eu-pink/50">
                <IconArrow />
              </div>
            </div>
          </Link>
        ))}
      </nav>
    </section>

    {/* Review invitation */}
    <section className="mx-4 mt-12 flex flex-col items-center gap-3 bg-eu-green px-6 py-9 text-center">
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <IconStar key={n} />
        ))}
      </div>
      <Eyebrow className="mt-1">YOUR EVENING</Eyebrow>
      <h2 className="m-0 font-eu-display text-[22px] font-normal tracking-[0.06em]">Share Your Experience</h2>
      <p className="m-0 max-w-[290px] font-eu-serif text-base leading-normal text-eu-ivory/80">
        Your words go straight to our management. You may also share them on Google.
      </p>
      <Link
        to={PATHS.review}
        className="mt-3 inline-flex h-[52px] items-center gap-3 bg-eu-pink px-7 font-eu-sans text-xs font-medium tracking-[0.22em] text-eu-black no-underline"
      >
        LEAVE A REVIEW
      </Link>
    </section>

    {/* Visit */}
    <footer className="flex flex-col gap-7 px-6 pb-14 pt-12">
      <div className="flex flex-col gap-1.5">
        <Eyebrow>RESERVATIONS</Eyebrow>
        <a href="tel:+2348039999987" className="py-1.5 font-eu-display text-xl tracking-[0.06em] text-eu-ivory no-underline">
          0803 999 9987
        </a>
        <a href="tel:+2348115780020" className="py-1.5 font-eu-display text-xl tracking-[0.06em] text-eu-ivory no-underline">
          0811 578 0020
        </a>
      </div>
      <div className="h-px bg-eu-ivory/[0.14]" />
      <div className="flex flex-col gap-3.5 text-sm font-light text-eu-ivory/80">
        <div className="flex items-center gap-3.5">
          <IconPin />
          <span>23 MacDonald Road, Ikoyi, Lagos</span>
        </div>
        <a href="https://instagram.com/euphoriarestaurantlagos" className="flex items-center gap-3.5 text-eu-ivory/80 no-underline">
          <IconInstagram />
          <span>@euphoriarestaurantlagos</span>
        </a>
      </div>
      <div className="mt-5 flex flex-col items-center gap-3.5">
        <img src={IMG.mark} alt="" aria-hidden="true" className="h-[38px] w-10 opacity-80" />
        <div className="font-eu-serif text-sm italic text-eu-ivory/60">A Sujimoto creation</div>
      </div>
    </footer>
  </PhoneShell>
);
