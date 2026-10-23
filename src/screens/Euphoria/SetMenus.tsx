import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IMG, PATHS } from "./theme";
import { DoubleRule, Eyebrow, PhoneShell, TopBar } from "./ui";

/* ───────────────────────── Business lunch ───────────────────────── */

const COURSES = [
  { key: "starter", title: "Starter", dishes: [["[Starter one]", "[Short description]"], ["[Starter two]", "[Short description]"], ["[Starter three]", "[Short description]"]] },
  { key: "main", title: "Main", dishes: [["[Main one]", "[Short description]"], ["[Main two]", "[Short description]"], ["[Main three]", "[Short description]"]] },
  { key: "dessert", title: "Dessert", dishes: [["[Dessert one]", "[Short description]"], ["[Dessert two]", "[Short description]"]] },
];

export type LunchPreset = "live" | "chosen" | "show";

/** 14–16: pick two or three courses, then show the choice to a server. */
export const BusinessLunch: FC<{ preset?: LunchPreset }> = ({ preset = "live" }) => {
  const [three, setThree] = useState(true);
  const [sel, setSel] = useState<Record<string, number>>(preset === "live" ? {} : { starter: 0, main: 1, dessert: 0 });
  const [showing, setShowing] = useState(preset === "show");

  const visible = three ? COURSES : COURSES.slice(0, 2);
  const picked = visible.filter((c) => sel[c.key] !== undefined).map((c) => ({ course: c.title.toUpperCase(), name: c.dishes[sel[c.key]][0] }));
  const done = picked.length;

  const formats = [
    { label: "TWO COURSES", price: "[₦ PRICE]", val: false },
    { label: "THREE COURSES", price: "[₦ PRICE]", val: true },
  ];

  return (
    <PhoneShell
      scrollPad={96}
      overlay={
        <>
          {/* Selection bar */}
          <div className="absolute bottom-0 left-0 right-0 z-[6] flex items-center gap-4 border-t border-eu-pink/[0.35] bg-eu-green pb-[18px] pl-6 pr-4 pt-3.5">
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-eu-display text-[10px] tracking-[0.28em] text-eu-pink">YOUR LUNCH</span>
              <span className="text-[13px] font-light">
                {done} of {visible.length} courses chosen
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowing(!showing)}
              className={`h-12 cursor-pointer border border-eu-pink px-[18px] text-[11px] font-medium tracking-[0.2em] ${
                done ? "bg-eu-pink text-eu-black" : "bg-transparent text-eu-pink"
              }`}
            >
              SHOW SERVER
            </button>
          </div>

          {/* Show to server */}
          {showing && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Your lunch order"
              className="eu-light eu-anim-fade absolute inset-0 z-10 box-border flex flex-col items-center bg-eu-ivory px-8 pb-10 pt-[72px] text-center text-eu-black"
            >
              <img src={IMG.mark} alt="" aria-hidden="true" className="h-[46px] w-12" />
              <div className="mt-6 font-eu-display text-[11px] tracking-[0.32em] text-eu-claret">FOR YOUR SERVER</div>
              <h2 className="m-0 mt-2.5 font-eu-display text-2xl font-normal tracking-[0.06em]">Business Lunch</h2>
              <div className="mt-1.5 font-eu-serif text-base italic text-eu-muted">{three ? "Three courses" : "Two courses"}</div>
              <div className="mt-8 w-full border-t border-eu-black/15">
                {picked.map((p) => (
                  <div key={p.course} className="flex justify-between gap-4 border-b border-eu-black/15 py-[18px] text-left">
                    <span className="pt-[3px] font-eu-display text-[11px] tracking-[0.2em] text-eu-muted">{p.course}</span>
                    <span className="text-right font-eu-display text-[15px] tracking-[0.04em]">{p.name}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowing(false)}
                className="mt-auto h-[52px] w-full cursor-pointer border-none bg-eu-black text-xs font-medium tracking-[0.22em] text-eu-ivory"
              >
                BACK TO MENU
              </button>
            </div>
          )}
        </>
      }
    >
      <TopBar title="BUSINESS LUNCH" />

      <div className="h-[220px] overflow-hidden">
        <img src={IMG.diningRoom} alt="The Euphoria dining room" className="block h-full w-full object-cover" style={{ objectPosition: "center 55%" }} />
      </div>

      <div className="flex flex-col items-center gap-2.5 px-6 pt-8 text-center">
        <Eyebrow>WEEKDAYS&nbsp;&nbsp;[HOURS]</Eyebrow>
        <h1 className="m-0 font-eu-display text-[28px] font-normal tracking-[0.06em]">Business Lunch</h1>
        <p className="m-0 max-w-[300px] font-eu-serif text-base italic leading-normal text-eu-ivory/[0.72]">
          A composed lunch, served with the pace of your day in mind.
        </p>
      </div>

      {/* Format selector */}
      <div role="radiogroup" aria-label="Choose your format" className="mx-6 mt-7 grid grid-cols-2 border border-eu-pink/40">
        {formats.map((f) => {
          const on = three === f.val;
          return (
            <button
              key={f.label}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setThree(f.val)}
              className={`flex h-[76px] cursor-pointer flex-col items-center justify-center gap-1 border-none transition-colors duration-[250ms] ${
                on ? "bg-eu-pink text-eu-black" : "bg-transparent text-eu-ivory"
              }`}
            >
              <span className="font-eu-display text-[13px] tracking-[0.14em]">{f.label}</span>
              <span className="text-xs font-normal tracking-[0.06em]">{f.price}</span>
            </button>
          );
        })}
      </div>

      {/* Courses */}
      {visible.map((c) => (
        <section key={c.key} className="eu-anim-rise-sm pt-10">
          <div className="flex items-baseline justify-between px-6 pb-1.5">
            <h2 className="m-0 font-eu-display text-[19px] font-normal tracking-[0.1em]">{c.title}</h2>
            <span className="font-eu-serif text-sm italic text-eu-ivory/60">Choose one</span>
          </div>
          <div role="radiogroup" aria-label={c.title}>
            {c.dishes.map((d, i) => {
              const on = sel[c.key] === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setSel({ ...sel, [c.key]: i })}
                  className={`flex w-full cursor-pointer items-center gap-4 border-0 border-b border-solid border-eu-ivory/10 px-6 py-5 text-left text-eu-ivory transition-colors duration-[250ms] ${
                    on ? "bg-eu-pink/[0.08]" : "bg-transparent"
                  }`}
                >
                  <span className={`flex h-5 w-5 flex-none rotate-45 items-center justify-center border ${on ? "border-eu-pink" : "border-eu-ivory/[0.35]"}`}>
                    <span className={`h-2.5 w-2.5 ${on ? "bg-eu-pink" : "bg-transparent"}`} />
                  </span>
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="font-eu-display text-[15px] tracking-[0.06em]">{d[0]}</span>
                    <span className="font-eu-serif text-sm italic text-eu-ivory/60">{d[1]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <p className="mx-6 mt-10 text-center font-eu-serif text-sm italic leading-normal text-eu-ivory/55">
        Kindly inform your server of any allergies or dietary requirements.
      </p>
    </PhoneShell>
  );
};

/* ───────────────────────── Saturday brunch ───────────────────────── */

const PACKAGES = [
  { name: "[Package one]", price: "[₦ PRICE]", desc: "[What the package includes, for example brunch plates and a welcome drink]" },
  { name: "[Package two]", price: "[₦ PRICE]", desc: "[What the package includes, for example free flowing drinks for a set time]" },
];
const BRUNCH = {
  kitchen: [["[Brunch dish]", "[Short description]", "[₦]"], ["[Brunch dish]", "[Short description]", "[₦]"], ["[Brunch dish]", "[Short description]", "[₦]"], ["[Brunch dish]", "[Short description]", "[₦]"]],
  bar: [["[Brunch cocktail]", "[Short description]", "[₦]"], ["[Brunch cocktail]", "[Short description]", "[₦]"], ["[Mimosa or spritz]", "[Short description]", "[₦]"]],
};
const TABS = [["kitchen", "FROM THE KITCHEN"], ["bar", "FROM THE BAR"]] as const;

/** 17: Saturday brunch by the pool. */
export const Brunch: FC = () => {
  const [pkg, setPkg] = useState(0);
  const [tab, setTab] = useState<"kitchen" | "bar">("kitchen");

  return (
    <PhoneShell
      bg="bg-eu-green"
      scrollPad={96}
      overlay={
        <div className="absolute bottom-0 left-0 right-0 z-[6] flex items-center gap-4 border-t border-eu-pink/[0.35] bg-eu-black pb-[18px] pl-6 pr-4 pt-3.5">
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="font-eu-display text-[10px] tracking-[0.28em] text-eu-pink">THIS SATURDAY</span>
            <span className="text-[13px] font-light">{PACKAGES[pkg].name} selected</span>
          </div>
          <a
            href="tel:+2348115780020"
            className="inline-flex h-12 items-center bg-eu-pink px-5 text-[11px] font-medium tracking-[0.2em] text-eu-black no-underline"
          >
            RESERVE
          </a>
        </div>
      }
    >
      <TopBar title="SATURDAY BRUNCH" bg="bg-eu-green" border="border-eu-ivory/[0.14]" />

      <div className="h-[300px] overflow-hidden">
        <img src={IMG.pool} alt="The Euphoria pool terrace" className="block h-full w-full object-cover" style={{ objectPosition: "center 60%" }} />
      </div>

      <div className="flex flex-col items-center gap-2.5 px-6 pt-9 text-center">
        <Eyebrow>EVERY SATURDAY&nbsp;&nbsp;[HOURS]</Eyebrow>
        <h1 className="m-0 font-eu-display text-[30px] font-normal leading-[1.2] tracking-[0.06em]">
          Brunch by
          <br />
          the Pool
        </h1>
        <p className="m-0 max-w-[300px] font-eu-serif text-base italic leading-normal text-eu-ivory/[0.78]">
          Relax, recharge and indulge under the blue skies of Old Ikoyi.
        </p>
        <DoubleRule width={160} line="bg-eu-pink/60" className="mt-2.5" />
      </div>

      {/* Packages */}
      <section className="px-4 pt-9">
        <h2 className="m-0 mx-2 mb-4 font-eu-display text-[11px] font-normal tracking-[0.32em] text-eu-pink">THE PACKAGES</h2>
        <div role="radiogroup" aria-label="Brunch packages" className="flex flex-col gap-3">
          {PACKAGES.map((p, i) => {
            const on = pkg === i;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPkg(i)}
                className={`flex w-full cursor-pointer flex-col gap-2.5 border px-5 py-[22px] text-left transition-colors duration-[250ms] ${
                  on ? "border-eu-ivory bg-eu-ivory text-eu-black" : "border-eu-ivory/30 bg-transparent text-eu-ivory"
                }`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-eu-display text-[17px] tracking-[0.08em]">{p.name}</span>
                  <span className="font-eu-display text-[15px]">{p.price}</span>
                </span>
                <span className="font-eu-serif text-[15px] italic leading-[1.45] opacity-85">{p.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Kitchen / Bar */}
      <section className="pt-11">
        <div role="tablist" aria-label="Brunch menu" className="mx-6 grid grid-cols-2 border-b border-eu-ivory/[0.18]">
          {TABS.map(([key, label]) => {
            const on = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(key)}
                className={`-mb-px h-12 cursor-pointer border-0 border-b border-solid bg-transparent font-eu-display text-xs tracking-[0.24em] ${
                  on ? "border-eu-pink text-eu-pink" : "border-transparent text-eu-ivory/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <ul key={tab} role="tabpanel" className="eu-anim-fade m-0 list-none p-0">
          {BRUNCH[tab].map((it, i) => (
            <li key={i} className="flex flex-col gap-1.5 border-b border-eu-ivory/10 px-6 py-5">
              <span className="flex items-baseline gap-4">
                <span className="flex-1 font-eu-display text-[15px] tracking-[0.06em]">{it[0]}</span>
                <span className="font-eu-display text-[15px] text-eu-pink">{it[2]}</span>
              </span>
              <span className="font-eu-serif text-[15px] italic text-eu-ivory/[0.66]">{it[1]}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center px-6 pt-12">
        <Link
          to={PATHS.review}
          className="inline-flex h-12 items-center border border-eu-pink/60 px-[22px] text-[11px] font-medium tracking-[0.22em] text-eu-pink no-underline"
        >
          LEAVE A REVIEW
        </Link>
      </div>
    </PhoneShell>
  );
};
