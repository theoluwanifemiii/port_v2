import { FC, ReactNode, useState } from "react";
import { Dashboard } from "./Dashboard";
import { Landing } from "./Landing";
import { MenuScreen } from "./MenuScreen";
import { Review } from "./Review";
import { BusinessLunch, Brunch } from "./SetMenus";
import { Staff } from "./Staff";
import { IMG } from "./theme";
import { FrameContext, FrameMode, IconArrow, IconBack } from "./ui";

type Kind = "phone" | "tall" | "tablet" | "desktop";
type Step = [label: string, kind: Kind, render: () => ReactNode];

const tall = (kind: "food" | "drinks", i: number) => () => <MenuScreen kind={kind} category={i} full />;

const FLOWS: [num: string, name: string, steps: Step[]][] = [
  ["1", "Arrive and browse", [
    ["QR landing", "phone", () => <Landing />],
    ["Food menu (live prototype)", "phone", () => <MenuScreen kind="food" />],
    ["Search the menu", "phone", () => <MenuScreen kind="food" preset="search" />],
    ["Dish detail, add to order", "phone", () => <MenuScreen kind="food" preset="sheet" />],
    ["Drinks menu (live prototype)", "phone", () => <MenuScreen kind="drinks" />],
    ["Drink detail, add to order", "phone", () => <MenuScreen kind="drinks" preset="sheet" />],
  ]],
  ["1a", "Food menu pages", [
    "Choice of Breakfast", "Starters", "Salads", "Pasta", "Burgers", "Pizza", "Main Course", "Fishes", "Signature Dishes", "Taste of Africa", "Sides", "Dessert",
  ].map((name, i): Step => [name, "tall", tall("food", i)])],
  ["1b", "Drinks menu pages", [
    "Signature Cocktails", "Classic Cocktails", "Mocktails", "Smoothies and Milkshakes", "Juices, Soft Drinks and Coffee", "Wine", "Champagne",
    "Cognac", "Whisky", "Tequila", "Vodka, Gin and Cream", "Shots", "Cigars",
  ].map((name, i): Step => [name, "tall", tall("drinks", i)])],
  ["2", "Order and dine", [
    ["Items added, order bar", "phone", () => <MenuScreen kind="food" preset="added" />],
    ["Review your selection", "phone", () => <MenuScreen kind="food" preset="review" />],
    ["Server on the way", "phone", () => <MenuScreen kind="food" preset="called" />],
    ["Confirmed, with the kitchen", "phone", () => <MenuScreen kind="food" preset="kitchen" />],
    ["Adding a second round", "phone", () => <MenuScreen kind="food" preset="round2" />],
    ["Bill requested", "phone", () => <MenuScreen kind="food" preset="bill" />],
    ["Thank you, close the table", "phone", () => <MenuScreen kind="food" preset="done" />],
  ]],
  ["3", "Set menus", [
    ["Business lunch", "phone", () => <BusinessLunch />],
    ["Courses chosen", "phone", () => <BusinessLunch preset="chosen" />],
    ["Show your server", "phone", () => <BusinessLunch preset="show" />],
    ["Saturday brunch", "phone", () => <Brunch />],
  ]],
  ["4", "Share a review", [
    ["Rate your visit", "phone", () => <Review />],
    ["Rating chosen", "phone", () => <Review preset="rated" />],
    ["What stood out", "phone", () => <Review preset="details" />],
    ["Thank you, share on Google", "phone", () => <Review preset="thanks" />],
  ]],
  ["5", "Staff view", [
    ["Reviews dashboard", "desktop", () => <Dashboard demo />],
    ["Floor calls (staff tablet)", "tablet", () => <Staff demo />],
  ]],
];

interface Flat {
  name: string;
  kind: Kind;
  render: () => ReactNode;
  flow: number;
  flowNum: string;
  flowName: string;
  step: number;
  total: number;
}
const ALL: Flat[] = FLOWS.flatMap(([flowNum, flowName, steps], flow) =>
  steps.map(([name, kind, render], i) => ({ name, kind, render, flow, flowNum, flowName, step: i + 1, total: steps.length })),
);
const indexOf = (flow: number, step: number) => ALL.findIndex((s) => s.flow === flow && s.step === step);

const FRAME: Record<Kind, { cls: string; mode: FrameMode }> = {
  phone: { cls: "h-[844px] w-[390px] overflow-hidden rounded-[28px]", mode: "device" },
  tall: { cls: "h-[844px] w-[390px] overflow-auto rounded-[28px]", mode: "device" },
  tablet: { cls: "h-[820px] w-[1180px] overflow-auto rounded-[20px]", mode: "device" },
  desktop: { cls: "w-[1440px] overflow-auto rounded-lg", mode: "page" },
};

const navBtn = "eu-nav h-11 cursor-pointer border border-eu-ivory/40 bg-transparent text-[11px] font-medium text-eu-ivory";

/** 00: every flow, step by step, each screen in its device frame. */
export const ScreenIndex: FC = () => {
  const [at, setAt] = useState(-1);
  const cur = at >= 0 ? ALL[at] : null;

  const go = (i: number) => {
    setAt(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!cur) {
    return (
      <div className="min-h-[100dvh] bg-eu-black font-eu-sans text-eu-ivory">
        <header className="flex flex-wrap items-end justify-between gap-6 bg-eu-green px-[clamp(20px,5vw,72px)] pb-12 pt-14">
          <div className="flex items-center gap-6">
            <img src={IMG.mark} alt="" aria-hidden="true" className="h-[61px] w-16" />
            <div className="flex flex-col gap-2">
              <div className="font-eu-display text-[11px] tracking-[0.32em] text-eu-pink">EUPHORIA DIGITAL MENU</div>
              <h1 className="m-0 font-eu-display text-[clamp(28px,4vw,40px)] font-normal tracking-[0.06em]">Screen Index</h1>
            </div>
          </div>
          <p className="m-0 max-w-[440px] font-eu-serif text-[17px] italic leading-normal text-eu-ivory/[0.82]">
            Every flow, step by step. Choose a step to open its screen, then return here with Index.
          </p>
        </header>

        <main className="flex flex-col gap-14 px-[clamp(20px,5vw,72px)] pb-20 pt-12">
          {FLOWS.map(([num, name, steps], fi) => (
            <section key={num} aria-label={name} className="eu-anim-fade-up flex flex-col gap-[18px]">
              <div className="flex flex-wrap items-baseline gap-3.5 border-b border-eu-pink/45 pb-3.5">
                <span className="font-eu-display text-[13px] tracking-[0.24em] text-eu-pink">FLOW {num}</span>
                <h2 className="m-0 flex-1 font-eu-display text-2xl font-normal tracking-[0.06em]">{name}</h2>
                <span className="text-[13px] font-light text-eu-ivory/60">
                  {steps.length} {steps.length === 1 ? "step" : "steps"}
                </span>
              </div>
              <ol className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 p-0">
                {steps.map(([label], si) => (
                  <li key={label + si}>
                    <button
                      type="button"
                      onClick={() => go(indexOf(fi, si + 1))}
                      className="eu-index-step flex min-h-24 w-full cursor-pointer flex-col justify-between gap-3 border border-eu-ivory/[0.12] bg-eu-panel px-[18px] py-4 text-left text-eu-ivory"
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-eu-display text-[11px] tracking-[0.24em] text-eu-pink">STEP {si + 1}</span>
                        <IconArrow size={16} className="eu-arr" />
                      </span>
                      <span className="text-[15px] font-normal leading-[1.35]">{label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </main>
      </div>
    );
  }

  const frame = FRAME[cur.kind];
  return (
    <div className="min-h-[100dvh] bg-eu-black font-eu-sans text-eu-ivory">
      <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-4 bg-eu-green px-[clamp(16px,4vw,48px)] py-3.5">
        <button type="button" onClick={() => go(-1)} className={`${navBtn} flex items-center gap-2.5 px-[18px] tracking-[0.2em]`}>
          <IconBack size={16} strokeWidth={1.5} />
          INDEX
        </button>
        <div className="flex min-w-[200px] flex-1 flex-col gap-[3px]">
          <span className="font-eu-display text-[10px] tracking-[0.26em] text-eu-pink">
            FLOW {cur.flowNum}&nbsp;&nbsp;{cur.flowName.toUpperCase()}&nbsp;&nbsp;·&nbsp;&nbsp;STEP {cur.step} OF {cur.total}
          </span>
          <span className="font-eu-display text-lg tracking-[0.06em]">{cur.name}</span>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => at > 0 && go(at - 1)}
            disabled={at <= 0}
            aria-label="Previous screen"
            className={`${navBtn} px-4 tracking-[0.18em] disabled:opacity-40`}
          >
            PREVIOUS
          </button>
          <button
            type="button"
            onClick={() => at < ALL.length - 1 && go(at + 1)}
            disabled={at >= ALL.length - 1}
            aria-label="Next screen"
            className="h-11 cursor-pointer border-none bg-eu-pink px-[18px] text-[11px] font-medium tracking-[0.18em] text-eu-black disabled:opacity-40"
          >
            NEXT
          </button>
        </div>
      </header>

      <div className="flex flex-wrap items-start justify-center gap-9 px-[clamp(16px,4vw,48px)] pb-16 pt-9">
        <div key={at} className={`eu-frame eu-anim-fade max-w-full flex-none border border-eu-ivory/[0.16] bg-eu-black ${frame.cls}`}>
          <FrameContext.Provider value={frame.mode}>{cur.render()}</FrameContext.Provider>
        </div>

        <aside aria-label="Steps in this flow" className="flex min-w-[240px] flex-[0_1_300px] flex-col gap-1.5">
          <div className="border-b border-eu-pink/40 pb-2.5 font-eu-display text-[11px] tracking-[0.26em] text-eu-pink">
            FLOW {cur.flowNum}&nbsp;&nbsp;{cur.flowName.toUpperCase()}
          </div>
          {ALL.filter((s) => s.flow === cur.flow).map((s) => {
            const here = s.step === cur.step;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => go(indexOf(s.flow, s.step))}
                aria-current={here ? "step" : undefined}
                className={`eu-nav flex min-h-11 cursor-pointer items-center gap-3 border-none px-2.5 py-2 text-left ${
                  here ? "bg-eu-pink/[0.12] text-eu-ivory" : "bg-transparent text-eu-ivory/75"
                }`}
              >
                <span className="w-[58px] flex-none font-eu-display text-[10px] tracking-[0.18em] text-eu-pink">STEP {s.step}</span>
                <span className="text-[13px] font-light leading-[1.35]">{s.name}</span>
              </button>
            );
          })}
          {cur.kind === "tall" && (
            <p className="m-0 mt-3.5 font-eu-serif text-sm italic leading-normal text-eu-ivory/60">
              This page is longer than a phone screen. Scroll inside the frame to see all of it.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};
