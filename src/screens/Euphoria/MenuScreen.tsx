import { FC, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DRINKS, FOOD, MenuCategory, MenuGroup, MenuRow } from "./menuData";
import { IMG, PATHS, ROMAN, TABLE, naira } from "./theme";
import { OrderItem, Round, TableOrder, useTableOrder } from "./useTableOrder";
import {
  DoubleRule,
  Eyebrow,
  IconArrow,
  IconBell,
  IconButton,
  IconCheck,
  IconClose,
  IconMinus,
  IconPlus,
  IconReceipt,
  IconSearch,
  PhoneShell,
  TopBar,
} from "./ui";

export type MenuKind = "food" | "drinks";
export type MenuPreset = "live" | "search" | "sheet" | "added" | "review" | "called" | "kitchen" | "round2" | "bill" | "done";

interface Dish {
  key: string;
  name: string;
  desc: string;
  price: string;
  amount: number;
  tag: string;
  catUpper: string;
  img: string;
  pos: string;
}

const COPY = {
  food: {
    title: "FOOD MENU",
    searchLabel: "Search the menu",
    searchId: "eu-food-q",
    placeholder: "Try prawns, suya, steak",
    navLabel: "Food categories",
    footer: "Kindly inform your server of any allergies or dietary requirements.",
    noun: ["dish", "dishes"],
    searchHint: "Search across every page of the menu.",
    calledLine: "Keep this list open. They will confirm each item with you before it goes to the kitchen.",
    kitchenLine: "Everything below is with the kitchen. Add more whenever you like.",
    noteId: "eu-kitchen-note",
    noteLabel: "NOTE FOR THE KITCHEN",
    notePlaceholder: "No pepper, medium rare, sauce on the side",
    closeLabel: "Close dish details",
    photoBg: "bg-eu-raised",
  },
  drinks: {
    title: "DRINKS MENU",
    searchLabel: "Search the drinks menu",
    searchId: "eu-drinks-q",
    placeholder: "Try negroni, Dom Pérignon, Macallan",
    navLabel: "Drink categories",
    footer: "Enjoy responsibly. Your server will gladly advise on pairings.",
    noun: ["drink", "drinks"],
    searchHint: "Search across every page of the list.",
    calledLine: "Keep this list open. They will confirm each item with you before it goes to the bar and kitchen.",
    kitchenLine: "Everything below is with the kitchen and bar. Add more whenever you like.",
    noteId: "eu-bar-note",
    noteLabel: "NOTE FOR THE BAR",
    notePlaceholder: "No ice, extra lime, less sweet",
    closeLabel: "Close drink details",
    photoBg: "bg-black",
  },
} as const;

const makeDish = (kind: MenuKind, c: MenuCategory, g: MenuGroup, row: MenuRow): Dish => {
  const catUpper = (kind === "drinks" && g.title ? g.title : c.title).toUpperCase();
  return {
    key: catUpper + "|" + row[0],
    name: row[0],
    desc: row[1] || "",
    price: naira(row[2]),
    amount: row[2],
    tag: row[3] || "",
    catUpper,
    img: c.img,
    pos: c.pos,
  };
};

/* ── Preset states, used by the screen index to show each step of the flow ── */

interface Seed {
  cat?: number;
  searching?: boolean;
  query?: string;
  sheet?: Dish;
  sheetQty?: number;
  sheetNote?: string;
  orderOpen?: boolean;
  order?: Partial<TableOrder>;
}

const foodItem = (title: string, name: string, qty: number, note = ""): OrderItem => {
  const c = FOOD.find((x) => x.title === title)!;
  const r = c.groups[0].items.find((x) => x[0] === name)!;
  return { name: r[0], cat: c.title.toUpperCase(), amount: r[2], qty, note };
};
const asOrder = (list: OrderItem[]) => Object.fromEntries(list.map((i) => [i.cat + "|" + i.name, i]));

const seedFor = (kind: MenuKind, preset: MenuPreset): Seed => {
  if (kind === "drinks") {
    if (preset === "search") return { searching: true, query: "martini" };
    if (preset === "sheet") {
      const c = DRINKS[0];
      return { sheet: makeDish(kind, c, c.groups[0], c.groups[0].items[0]), sheetQty: 2, sheetNote: "Less sweet" };
    }
    return {};
  }
  const A = foodItem("Main Course", "Grilled Lamb Chops", 2, "One medium, one well done");
  const B = foodItem("Taste of Africa", "Seafood Okro", 1, "Pounded yam");
  const Cc = foodItem("Starters", "Tempura Prawns", 1);
  const D = foodItem("Dessert", "Duo Chocolate Cake", 2);
  const E = foodItem("Dessert", "Tiramisu", 1);
  const r1: Round = { time: "8:14 pm", items: [A, B, Cc] };
  const r2: Round = { time: "9:02 pm", items: [D, E] };
  switch (preset) {
    case "search": return { searching: true, query: "prawn" };
    case "sheet": return { cat: 1, sheet: makeDish(kind, FOOD[1], FOOD[1].groups[0], FOOD[1].groups[0].items[2]), sheetQty: 2, sheetNote: "Red wine for both" };
    case "added": return { cat: 6, order: { order: asOrder([A, B, Cc]) } };
    case "review": return { cat: 6, orderOpen: true, order: { order: asOrder([A, B, Cc]) } };
    case "called": return { cat: 6, orderOpen: true, order: { order: asOrder([A, B, Cc]), stage: "called" } };
    case "kitchen": return { cat: 6, orderOpen: true, order: { sent: [r1] } };
    case "round2": return { cat: 11, orderOpen: true, order: { sent: [r1], order: asOrder([D, E]) } };
    case "bill": return { cat: 6, orderOpen: true, order: { sent: [r1, r2], bill: "requested" } };
    case "done": return { cat: 6, orderOpen: true, order: { sent: [r1, r2], bill: "done" } };
    default: return {};
  }
};

/* ── Small pieces ── */

const StepButton: FC<{ label: string; onClick: () => void; plus?: boolean; big?: boolean }> = ({ label, onClick, plus, big }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`eu-step flex cursor-pointer items-center justify-center border-none bg-transparent p-0 ${big ? "h-[54px] w-[46px]" : "h-10 w-11"}`}
  >
    {plus ? <IconPlus size={big ? 16 : 14} /> : <IconMinus size={big ? 16 : 14} />}
  </button>
);

const ghostBtn =
  "h-14 cursor-pointer border border-eu-ivory/[0.35] bg-transparent text-[11px] font-medium tracking-[0.18em] text-eu-ivory";
const pinkBtn = "h-14 cursor-pointer border-none bg-eu-pink text-[11px] font-medium tracking-[0.18em] text-eu-black";

const StatusCard: FC<{ eyebrow: string; title: [string, string]; line: string; icon: ReactNode }> = ({ eyebrow, title, line, icon }) => (
  <div className="eu-anim-fade mx-4 mt-5 flex flex-col items-center gap-2.5 bg-eu-green px-6 py-[30px] text-center">
    <div className="eu-anim-pulse flex h-[68px] w-[68px] items-center justify-center rounded-full border border-eu-pink/60">{icon}</div>
    <Eyebrow className="mt-2">{eyebrow}</Eyebrow>
    <h2 className="m-0 font-eu-display text-[22px] font-normal leading-[1.3] tracking-[0.05em]">
      {title[0]}
      <br />
      {title[1]}
    </h2>
    <p className="m-0 font-eu-serif text-base leading-normal text-eu-ivory/[0.82]">{line}</p>
  </div>
);

/* ── Screen ── */

interface MenuScreenProps {
  kind: MenuKind;
  preset?: MenuPreset;
  /** Open on this category (index into the menu). */
  category?: number;
  /** Lay out one whole menu page at full height (screen index only). */
  full?: boolean;
  /** Pretend a server confirms the order and brings the bill (the live prototype). */
  simulateServer?: boolean;
}

export const MenuScreen: FC<MenuScreenProps> = ({ kind, preset = "live", category, full = false, simulateServer = true }) => {
  const data = kind === "food" ? FOOD : DRINKS;
  const copy = COPY[kind];
  const live = preset === "live" && !full;
  const seed = useMemo(() => seedFor(kind, preset), [kind, preset]);

  const startCat = seed.cat ?? (category !== undefined && category >= 0 && category < data.length ? category : 0);
  const [cat, setCat] = useState(startCat);
  const [searching, setSearching] = useState(!!seed.searching);
  const [query, setQuery] = useState(seed.query ?? "");
  const [sheet, setSheet] = useState<Dish | null>(seed.sheet ?? null);
  const [sheetQty, setSheetQty] = useState(seed.sheetQty ?? 1);
  const [sheetNote, setSheetNote] = useState(seed.sheetNote ?? "");
  const [orderOpen, setOrderOpen] = useState(!!seed.orderOpen);
  const { state: s, save, confirmRound } = useTableOrder(live, seed.order);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const simulate = live && simulateServer;

  const toTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  const goCat = (i: number) => {
    setCat(i);
    toTop();
  };

  /* Order totals and the state the bar/panel are in */
  const keys = Object.keys(s.order);
  let count = 0, draftTotal = 0, sentTotal = 0, sentCount = 0;
  keys.forEach((k) => {
    count += s.order[k].qty;
    draftTotal += s.order[k].qty * s.order[k].amount;
  });
  s.sent.forEach((r) => r.items.forEach((o) => {
    sentCount += o.qty;
    sentTotal += o.qty * o.amount;
  }));
  const hasSent = s.sent.length > 0;
  const hasAny = count > 0 || hasSent;
  const mode = s.bill === "done" ? "done" : s.stage === "called" ? "called" : count ? "draft" : s.bill === "requested" ? "bill" : "kitchen";
  const bar = {
    done: ["THANK YOU", "Tap to share your experience"],
    called: ["SERVER ON THE WAY", "Your list is ready to confirm"],
    draft: [hasSent ? "NEW SELECTION" : "YOUR ORDER", (count === 1 ? "1 item" : count + " items") + (hasSent ? " to add, tap to review" : ", tap to review")],
    bill: ["BILL REQUESTED", "Your server is bringing it"],
    kitchen: ["WITH THE KITCHEN", "Tap for your order or the bill"],
  }[mode];

  // The panel closes itself once the order is empty.
  useEffect(() => {
    if (!hasAny) setOrderOpen(false);
  }, [hasAny]);

  const setQty = (k: string, q: number) => {
    const n = { ...s.order };
    if (q < 1) delete n[k];
    else n[k] = { ...n[k], qty: Math.min(20, q) };
    save({ order: n });
  };

  const openDish = (d: Dish) => {
    const held = s.order[d.key];
    setSheet(d);
    setSheetQty(held ? held.qty : 1);
    setSheetNote(held ? held.note : "");
  };
  const sheetInOrder = !!(sheet && s.order[sheet.key]);
  const addToOrder = () => {
    if (!sheet) return;
    save({
      order: { ...s.order, [sheet.key]: { name: sheet.name, cat: sheet.catUpper, amount: sheet.amount, qty: sheetQty, note: sheetNote.trim() } },
      bill: s.bill === "done" ? "none" : s.bill,
    });
    setSheet(null);
  };
  const removeFromSheet = () => {
    if (!sheet) return;
    const n = { ...s.order };
    delete n[sheet.key];
    save({ order: n });
    setSheet(null);
  };

  const callServer = () => {
    save({ stage: "called" });
    window.clearTimeout(timer.current);
    if (simulate) timer.current = window.setTimeout(confirmRound, 5000);
  };
  const cancelCall = () => {
    window.clearTimeout(timer.current);
    save({ stage: "draft" });
  };
  const requestBill = () => {
    save({ bill: "requested" });
    window.clearTimeout(timer.current);
    if (simulate) timer.current = window.setTimeout(() => save({ bill: "done" }), 6000);
  };
  const finish = () => {
    window.clearTimeout(timer.current);
    save({ order: {}, sent: [], stage: "draft", bill: "none" });
  };

  /* Menu content */
  const c = data[cat];
  const next = data[cat + 1];
  const q = query.trim().toLowerCase();
  const results: Dish[] = [];
  if (searching && q) {
    data.forEach((x) => x.groups.forEach((g) => g.items.forEach((r) => {
      if ((r[0] + " " + (r[1] || "")).toLowerCase().includes(q)) results.push(makeDish(kind, x, g, r));
    })));
  }

  const qtyBadge = (d: Dish) => {
    const held = s.order[d.key];
    return held ? (
      <span aria-label="In your order" className="flex-none bg-eu-pink px-[7px] py-0.5 text-[11px] font-medium tracking-[0.06em] text-eu-black">
        × {held.qty}
      </span>
    ) : null;
  };

  const dishButton = (d: Dish) => (
    <button
      type="button"
      onClick={() => openDish(d)}
      className="eu-dish flex w-full cursor-pointer flex-col gap-2 border-none bg-transparent text-left text-eu-ivory"
      style={{ padding: d.desc ? "22px 24px" : "18px 24px" }}
    >
      <span className="flex items-baseline gap-4">
        <span className="eu-dname flex-1 font-eu-display text-[15px] leading-[1.35] tracking-[0.06em] transition-colors duration-200">{d.name}</span>
        {qtyBadge(d)}
        <span className="whitespace-nowrap font-eu-display text-[15px] tracking-[0.02em] text-eu-pink">{d.price}</span>
      </span>
      {d.tag && (
        <span className="self-start bg-eu-pink px-2 py-[3px] text-[10px] font-medium tracking-[0.2em] text-eu-black">{d.tag}</span>
      )}
      {d.desc && (
        <span className="line-clamp-3 pr-10 font-eu-serif text-[15px] italic leading-normal text-eu-ivory/[0.68]">{d.desc}</span>
      )}
    </button>
  );

  const dishList = (g: MenuGroup) => (
    <ul className="m-0 list-none p-0">
      {g.items.map((r) => {
        const d = makeDish(kind, c, g, r);
        return (
          <li key={d.key} className="border-b border-eu-ivory/10">
            {dishButton(d)}
          </li>
        );
      })}
    </ul>
  );

  const header = (
    <TopBar
      title={copy.title}
      right={
        <IconButton
          label={copy.searchLabel}
          onClick={() => {
            setSearching(!searching);
            setQuery("");
          }}
        >
          <IconSearch />
        </IconButton>
      }
    >
      {searching ? (
        <div className="eu-anim-fade flex flex-col gap-1 px-6 pb-4 pt-1">
          <label htmlFor={copy.searchId} className="font-eu-display text-[10px] tracking-[0.3em] text-eu-pink">
            SEARCH
          </label>
          <input
            id={copy.searchId}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            autoComplete="off"
            autoFocus={live}
            className="h-11 border-0 border-b border-solid border-eu-ivory/40 bg-transparent p-0 font-eu-serif text-lg text-eu-ivory outline-none"
          />
        </div>
      ) : (
        <nav aria-label={copy.navLabel} className="eu-scroll flex gap-[22px] overflow-x-auto whitespace-nowrap px-6">
          {data.map((x, i) => {
            const on = i === cat;
            return (
              <button
                key={x.chip}
                type="button"
                onClick={() => goCat(i)}
                aria-pressed={on}
                className={`h-11 flex-none cursor-pointer border-0 border-b border-solid bg-transparent p-0 font-eu-display text-[11px] tracking-[0.18em] ${
                  on ? "border-eu-pink text-eu-pink" : "border-transparent text-eu-ivory/[0.62]"
                }`}
              >
                {x.chip}
              </button>
            );
          })}
        </nav>
      )}
    </TopBar>
  );

  const categoryView = (
    <div key={cat} className="eu-anim-fade-slow">
      <div className={`h-[236px] overflow-hidden ${copy.photoBg}`}>
        <img src={c.img} alt={c.title} className="block h-full w-full object-cover" style={{ objectPosition: c.pos }} />
      </div>
      <div className="flex flex-col items-center gap-2.5 px-6 pb-2 pt-8 text-center">
        <Eyebrow>
          {ROMAN[cat]}&nbsp;&nbsp;OF&nbsp;&nbsp;{ROMAN[data.length - 1]}
        </Eyebrow>
        <h1 className="m-0 font-eu-display text-[28px] font-normal leading-[1.2] tracking-[0.06em]">{c.title}</h1>
        {c.sub && <p className="m-0 max-w-[300px] font-eu-serif text-base italic leading-[1.45] text-eu-ivory/70">{c.sub}</p>}
        <DoubleRule width={160} className="mt-2.5" />
      </div>

      {kind === "food" ? (
        <div className="pt-2">{dishList(c.groups[0])}</div>
      ) : (
        c.groups.map((g, gi) => (
          <section key={gi} className="pt-4">
            {g.title && (
              <h2 className="m-0 flex items-center gap-3.5 px-6 pb-1 pt-6 font-eu-serif text-[19px] font-normal italic text-eu-pink">
                {g.title}
                <span className="h-px flex-1 bg-eu-pink/30" />
              </h2>
            )}
            {dishList(g)}
          </section>
        ))
      )}

      {next && (
        <div className="px-6 pt-10">
          <button
            type="button"
            onClick={() => goCat(cat + 1)}
            className="flex h-[72px] w-full cursor-pointer items-center justify-between border-none bg-eu-green px-6 text-eu-ivory"
          >
            <span className="flex flex-col items-start gap-1">
              <span className="font-eu-display text-[10px] tracking-[0.3em] text-eu-pink">NEXT</span>
              <span className="font-eu-display text-[17px] tracking-[0.08em]">{next.title}</span>
            </span>
            <IconArrow size={20} />
          </button>
        </div>
      )}
    </div>
  );

  const searchView = (
    <div className="pt-4">
      <div className="px-6 pb-2 font-eu-serif text-[15px] italic text-eu-ivory/[0.68]">
        {q ? `${results.length} ${results.length === 1 ? copy.noun[0] : copy.noun[1]} found` : copy.searchHint}
      </div>
      <ul className="m-0 list-none p-0">
        {results.map((d) => (
          <li key={d.key} className="border-b border-eu-ivory/10">
            <button
              type="button"
              onClick={() => openDish(d)}
              className="eu-dish flex w-full cursor-pointer flex-col gap-1.5 border-none bg-transparent px-6 py-5 text-left text-eu-ivory"
            >
              <span className="font-eu-display text-[10px] tracking-[0.26em] text-eu-pink">{d.catUpper}</span>
              <span className="flex items-baseline gap-4">
                <span className="eu-dname flex-1 font-eu-display text-[15px] leading-[1.35] tracking-[0.06em]">{d.name}</span>
                <span className="whitespace-nowrap font-eu-display text-[15px] text-eu-pink">{d.price}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  /* Overlays: order bar, order panel, dish sheet */

  const orderBar = hasAny && (
    <button
      type="button"
      onClick={() => setOrderOpen(true)}
      aria-label="Review your order"
      className="eu-anim-rise absolute bottom-4 left-3 right-3 z-[8] flex h-16 cursor-pointer items-center gap-3.5 border border-eu-pink/45 bg-eu-green px-[18px] text-eu-ivory"
    >
      <span className="flex h-8 w-8 flex-none items-center justify-center bg-eu-pink font-eu-display text-sm text-eu-black">
        {String(count || sentCount)}
      </span>
      <span className="flex flex-1 flex-col items-start gap-[3px]">
        <span className="font-eu-display text-[10px] tracking-[0.26em] text-eu-pink">{bar[0]}</span>
        <span className="text-[13px] font-light">{bar[1]}</span>
      </span>
      <span className="whitespace-nowrap font-eu-display text-base">{naira(draftTotal + sentTotal)}</span>
    </button>
  );

  const showIntro = mode === "draft" || mode === "kitchen";
  const introLine =
    mode === "kitchen"
      ? copy.kitchenLine
      : hasSent
        ? "Your new choices are below. Call your server to confirm them."
        : "Review your choices, then call your server to confirm them.";

  const orderPanel = orderOpen && hasAny && (
    <div role="dialog" aria-modal="true" aria-label="Your order" className="eu-anim-rise absolute inset-0 z-[15] flex flex-col bg-eu-black">
      <div className="flex h-16 flex-none items-center justify-between border-b border-eu-ivory/[0.12] px-3">
        <IconButton label="Back to the menu" onClick={() => setOrderOpen(false)}>
          <IconClose />
        </IconButton>
        <div className="pl-[0.3em] font-eu-display text-[13px] tracking-[0.3em]">YOUR ORDER</div>
        <div className="w-11" />
      </div>

      <div className="eu-scroll flex-1 overflow-y-auto">
        {mode === "bill" && (
          <StatusCard eyebrow={`TABLE ${TABLE}`} title={["Your Bill Is", "on Its Way"]} line="Your server will bring it to your table shortly." icon={<IconReceipt />} />
        )}
        {mode === "done" && (
          <div className="eu-anim-fade mx-4 mt-5 flex flex-col items-center gap-3 bg-eu-ivory px-6 py-[34px] text-center text-eu-black">
            <img src={IMG.mark} alt="" aria-hidden="true" className="h-[50px] w-[52px]" />
            <div className="mt-1.5 font-eu-display text-[11px] tracking-[0.32em] text-eu-claret">TABLE {TABLE}</div>
            <h2 className="m-0 font-eu-display text-[22px] font-normal leading-[1.3] tracking-[0.05em]">
              Thank You for
              <br />
              Dining With Us
            </h2>
            <p className="m-0 font-eu-serif text-base leading-normal text-[#3A3A3C]">
              We hope to welcome you back to Euphoria soon. How was your evening?
            </p>
            <Link
              to={PATHS.review}
              className="mt-2 inline-flex h-[50px] items-center bg-eu-green px-6 text-[11px] font-medium tracking-[0.2em] text-eu-ivory no-underline"
            >
              SHARE YOUR EXPERIENCE
            </Link>
          </div>
        )}
        {mode === "called" && (
          <StatusCard
            eyebrow={`TABLE ${TABLE}`}
            title={["Your Server Is", "on the Way"]}
            line={copy.calledLine}
            icon={<img src={IMG.mark} alt="" aria-hidden="true" className="h-9 w-[38px]" />}
          />
        )}
        {showIntro && (
          <div className="flex flex-col gap-2 px-6 pb-2 pt-7">
            <Eyebrow>TABLE {TABLE}</Eyebrow>
            <h1 className="m-0 font-eu-display text-[26px] font-normal tracking-[0.05em]">Your Order</h1>
            <p className="m-0 font-eu-serif text-base italic leading-[1.45] text-eu-ivory/[0.68]">{introLine}</p>
          </div>
        )}

        {count > 0 && (
          <>
            <h2 className="m-0 flex items-center gap-3.5 px-6 pt-5 font-eu-serif text-lg font-normal italic text-eu-pink">
              {hasSent ? "Adding to your order" : "Your selection"}
              <span className="h-px flex-1 bg-eu-pink/30" />
            </h2>
            <ul className="m-0 mt-1 list-none p-0">
              {keys.map((k) => {
                const o = s.order[k];
                return (
                  <li key={k} className="flex flex-col gap-2.5 border-b border-eu-ivory/10 px-6 py-5">
                    <span className="font-eu-display text-[10px] tracking-[0.24em] text-eu-pink/85">{o.cat}</span>
                    <div className="-mt-1 flex items-baseline gap-4">
                      <span className="flex-1 font-eu-display text-[15px] leading-[1.35] tracking-[0.05em]">{o.name}</span>
                      <span className="whitespace-nowrap font-eu-display text-[15px] text-eu-pink">{naira(o.qty * o.amount)}</span>
                    </div>
                    {o.note && <span className="font-eu-serif text-[15px] italic text-eu-ivory/70">Note: {o.note}</span>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-eu-ivory/25">
                        <StepButton label={`One less ${o.name}`} onClick={() => setQty(k, o.qty - 1)} />
                        <span className="w-7 text-center font-eu-display text-[15px]">{o.qty}</span>
                        <StepButton label={`One more ${o.name}`} onClick={() => setQty(k, o.qty + 1)} plus />
                      </div>
                      <button
                        type="button"
                        onClick={() => setQty(k, 0)}
                        className="h-11 cursor-pointer border-none bg-transparent text-xs tracking-[0.06em] text-eu-ivory/60 underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-baseline justify-between px-6 pt-5">
              <span className="text-[11px] font-medium tracking-[0.2em] text-eu-ivory/70">THIS SELECTION</span>
              <span className="font-eu-display text-xl text-eu-pink">{naira(draftTotal)}</span>
            </div>
          </>
        )}

        {hasSent && (
          <section aria-label="Confirmed with the kitchen" className="mt-7 border-y border-eu-ivory/[0.08] bg-eu-panel pb-[18px] pt-[22px]">
            <div className="flex items-center gap-2.5 px-6">
              <IconCheck />
              <span className="font-eu-display text-[11px] tracking-[0.3em] text-eu-pink">WITH THE KITCHEN</span>
            </div>
            {s.sent.map((r, i) => (
              <Fragment key={i}>
                <div className="px-6 pb-1 pt-3.5 text-[11px] font-light tracking-[0.06em] text-eu-ivory/55">
                  {(s.sent.length > 1 ? `Round ${i + 1}, c` : "C") + "onfirmed at " + r.time}
                </div>
                <ul className="m-0 list-none p-0">
                  {r.items.map((o, j) => (
                    <li key={j} className="flex flex-col gap-1 px-6 py-3">
                      <div className="flex items-baseline gap-3">
                        <span className="w-[30px] flex-none font-eu-display text-[13px] text-eu-pink">{o.qty} ×</span>
                        <span className="flex-1 font-eu-display text-sm leading-[1.35] tracking-[0.04em] text-eu-ivory/[0.88]">{o.name}</span>
                        <span className="whitespace-nowrap font-eu-display text-sm text-eu-ivory/70">{naira(o.qty * o.amount)}</span>
                      </div>
                      {o.note && <span className="pl-[42px] font-eu-serif text-sm italic text-eu-ivory/60">Note: {o.note}</span>}
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
            <div className="flex items-baseline justify-between px-6 pt-3.5">
              <span className="text-[11px] font-medium tracking-[0.2em] text-eu-ivory/70">CONFIRMED</span>
              <span className="font-eu-display text-lg text-eu-ivory/90">{naira(sentTotal)}</span>
            </div>
          </section>
        )}

        {hasSent && count > 0 && (
          <div className="flex items-baseline justify-between px-6 pt-5">
            <span className="text-[11px] font-medium tracking-[0.2em] text-eu-ivory/70">TOTAL SO FAR</span>
            <span className="font-eu-display text-[22px] text-eu-pink">{naira(sentTotal + draftTotal)}</span>
          </div>
        )}
        <p className="mx-6 mb-8 mt-[18px] text-xs font-light leading-normal text-eu-ivory/55">
          Your server confirms every order and the final bill at your table.
        </p>
      </div>

      <div className="flex flex-none gap-3 border-t border-eu-ivory/[0.12] bg-eu-black px-4 pb-5 pt-3.5">
        {mode === "draft" && (
          <>
            <button type="button" onClick={() => setOrderOpen(false)} className={`${ghostBtn} px-[18px]`}>
              ADD MORE
            </button>
            <button type="button" onClick={callServer} className={`${pinkBtn} flex flex-1 items-center justify-center gap-2.5`}>
              <IconBell />
              CALL MY SERVER
            </button>
          </>
        )}
        {mode === "called" && (
          <>
            <button type="button" onClick={() => setOrderOpen(false)} className={`${ghostBtn} flex-1`}>
              ADD MORE
            </button>
            <button
              type="button"
              onClick={cancelCall}
              className="h-14 cursor-pointer border-none bg-transparent px-3 text-[11px] font-medium tracking-[0.14em] text-eu-ivory/65"
            >
              CANCEL CALL
            </button>
          </>
        )}
        {mode === "kitchen" && (
          <>
            <button type="button" onClick={() => setOrderOpen(false)} className={`${ghostBtn} px-[18px]`}>
              ADD MORE
            </button>
            <button type="button" onClick={requestBill} className={`${pinkBtn} flex-1`}>
              REQUEST THE BILL
            </button>
          </>
        )}
        {mode === "bill" && (
          <button type="button" onClick={() => setOrderOpen(false)} className={`${ghostBtn} flex-1`}>
            BACK TO THE MENU
          </button>
        )}
        {mode === "done" && (
          <button type="button" onClick={finish} className={`${ghostBtn} flex-1`}>
            CLOSE MY TABLE
          </button>
        )}
      </div>
    </div>
  );

  const dishSheet = sheet && (
    <div className="absolute inset-0 z-20 flex flex-col justify-end">
      <button
        type="button"
        onClick={() => setSheet(null)}
        aria-label="Close"
        className="eu-anim-fade absolute inset-0 cursor-pointer border-none bg-eu-black/[0.78]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={sheet.name}
        onKeyDown={(e) => e.key === "Escape" && setSheet(null)}
        className="eu-scroll eu-anim-rise relative max-h-[min(760px,92%)] overflow-y-auto border-t border-eu-pink/40 bg-eu-raised"
      >
        <div className={`relative h-[250px] overflow-hidden ${kind === "drinks" ? "bg-black" : ""}`}>
          <img src={sheet.img} alt="" className="block h-full w-full object-cover" style={{ objectPosition: sheet.pos }} />
          <button
            type="button"
            onClick={() => setSheet(null)}
            aria-label={copy.closeLabel}
            className="absolute right-3.5 top-3.5 flex h-11 w-11 cursor-pointer items-center justify-center border border-eu-ivory/25 bg-eu-black p-0"
          >
            <IconClose size={16} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col gap-3.5 px-6 pb-9 pt-7">
          <div className="font-eu-display text-[10px] tracking-[0.3em] text-eu-pink">{sheet.catUpper}</div>
          <h2 className="m-0 font-eu-display text-[25px] font-normal leading-[1.25] tracking-[0.05em]">{sheet.name}</h2>
          {sheet.desc && <p className="m-0 font-eu-serif text-[17px] leading-[1.55] text-eu-ivory/[0.82]">{sheet.desc}</p>}
          <div className="font-eu-display text-[22px] text-eu-pink">{sheet.price}</div>
          <div className="mt-1 h-px bg-eu-ivory/[0.12]" />
          <div className="flex flex-col gap-1">
            <label htmlFor={copy.noteId} className="text-[11px] font-medium tracking-[0.16em] text-eu-ivory/70">
              {copy.noteLabel}
            </label>
            <input
              id={copy.noteId}
              value={sheetNote}
              onChange={(e) => setSheetNote(e.target.value)}
              placeholder={copy.notePlaceholder}
              autoComplete="off"
              className="h-11 border-0 border-b border-solid border-eu-ivory/[0.35] bg-transparent p-0 font-eu-serif text-[17px] text-eu-ivory outline-none"
            />
          </div>
          <div className="mt-2.5 flex gap-3">
            <div className="box-border flex h-14 flex-none items-center border border-eu-ivory/30">
              <StepButton label="One less" onClick={() => setSheetQty(Math.max(1, sheetQty - 1))} big />
              <span aria-live="polite" className="w-[30px] text-center font-eu-display text-lg">
                {sheetQty}
              </span>
              <StepButton label="One more" onClick={() => setSheetQty(Math.min(20, sheetQty + 1))} plus big />
            </div>
            <button
              type="button"
              onClick={addToOrder}
              className="h-14 flex-1 cursor-pointer whitespace-pre border-none bg-eu-pink text-[11px] font-medium tracking-[0.16em] text-eu-black"
            >
              {(sheetInOrder ? "UPDATE ORDER" : "ADD TO ORDER") + "   " + naira(sheet.amount * sheetQty)}
            </button>
          </div>
          {sheetInOrder && (
            <button
              type="button"
              onClick={removeFromSheet}
              className="h-11 cursor-pointer self-center border-none bg-transparent text-xs tracking-[0.06em] text-eu-ivory/65 underline underline-offset-4"
            >
              Remove from my order
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <PhoneShell
      full={full}
      scrollRef={scrollRef}
      scrollPad={hasAny ? 96 : 0}
      overlay={
        <>
          {orderBar}
          {orderPanel}
          {dishSheet}
        </>
      }
    >
      {header}
      {searching ? searchView : categoryView}
      <div className="flex flex-col items-center gap-4 px-6 pb-16 pt-14 text-center">
        <p className="m-0 max-w-[280px] font-eu-serif text-sm italic leading-normal text-eu-ivory/55">{copy.footer}</p>
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
