import { FC, useEffect, useRef, useState } from "react";
import { IMG, TABLE, clockNow, naira } from "./theme";
import { useFrame } from "./ui";
import { OrderItem, TableOrder, readStoredOrder, writeStoredOrder } from "./useTableOrder";

type CallType = "order" | "more" | "bill";
interface Call {
  id: string;
  table: string;
  type: CallType;
  wait: string;
  items: OrderItem[];
  live?: boolean;
}

const SAMPLES: Call[] = [
  { id: "t4", table: "4", type: "order", wait: "4 min", items: [
    { name: "Grilled Lamb Chops", cat: "MAIN COURSE", qty: 2, amount: 48000, note: "One medium, one well done" },
    { name: "Seafood Okro", cat: "TASTE OF AFRICA", qty: 1, amount: 26000, note: "Pounded yam" },
    { name: "Mojito", cat: "CLASSIC COCKTAILS", qty: 2, amount: 12000, note: "" },
  ]},
  { id: "t9", table: "9", type: "bill", wait: "1 min", items: [
    { name: "Taste of Euphoria", cat: "STARTERS", qty: 1, amount: 35000, note: "" },
    { name: "Grilled Tomahawk", cat: "SIGNATURE DISHES", qty: 1, amount: 120000, note: "" },
    { name: "Moët Ice", cat: "NON VINTAGE BLANC", qty: 1, amount: 290000, note: "" },
  ]},
];

const TYPE: Record<CallType, { label: string; text: string; dot: string }> = {
  order: { label: "ORDER TO CONFIRM", text: "text-eu-green", dot: "bg-eu-green" },
  more: { label: "ADDING TO THEIR ORDER", text: "text-eu-green", dot: "bg-eu-green" },
  bill: { label: "BILL REQUESTED", text: "text-eu-claret", dot: "bg-eu-claret" },
};

const sum = (items: OrderItem[]) => items.reduce((a, i) => ({ n: a.n + i.qty, t: a.t + i.qty * i.amount }), { n: 0, t: 0 });

/** The guest's own table (from the shared order) when they've called a server or asked for the bill. */
const liveCall = (v: TableOrder | null): Call | null => {
  if (!v) return null;
  const keys = Object.keys(v.order);
  if (v.stage === "called" && keys.length) {
    return { id: "t" + TABLE, live: true, table: TABLE, type: v.sent.length ? "more" : "order", wait: "Just now", items: keys.map((k) => v.order[k]) };
  }
  if (v.bill === "requested") {
    return { id: "t" + TABLE, live: true, table: TABLE, type: "bill", wait: "Just now", items: v.sent.flatMap((r) => r.items) };
  }
  return null;
};

const outlineBtn = "h-[60px] cursor-pointer border border-eu-green bg-transparent px-[26px] text-xs font-medium tracking-[0.18em] text-eu-green";
const solidBtn = "h-[60px] flex-1 cursor-pointer border-none bg-eu-green text-xs font-medium tracking-[0.18em] text-eu-ivory";

/** 23: the server's tablet. Table 12's calls come live from the guest screens. */
export const Staff: FC = () => {
  const frame = useFrame();
  const [store, setStore] = useState<TableOrder | null>(() => readStoredOrder());
  const [samples, setSamples] = useState(SAMPLES);
  const [selected, setSelected] = useState<string | null>(null);
  const [acked, setAcked] = useState<Record<string, boolean>>({});
  const [clock, setClock] = useState(clockNow);
  const lastRaw = useRef<string>("");

  // Poll so a guest screen in the same tab (the screen index) shows up too.
  useEffect(() => {
    const tick = window.setInterval(() => {
      const v = readStoredOrder();
      const raw = JSON.stringify(v);
      if (raw !== lastRaw.current) {
        lastRaw.current = raw;
        setStore(v);
      }
      setClock(clockNow());
    }, 1200);
    return () => window.clearInterval(tick);
  }, []);

  const write = (v: TableOrder) => {
    writeStoredOrder(v);
    lastRaw.current = JSON.stringify(v);
    setStore(v);
  };

  const live = liveCall(store);
  const list = (live ? [live] : []).concat(samples);
  const selId = selected && list.some((c) => c.id === selected) ? selected : list[0]?.id ?? null;
  const cur = list.find((c) => c.id === selId);

  const drop = () => {
    setSamples(samples.filter((c) => c.id !== selId));
    setSelected(null);
  };
  const confirm = () => {
    if (cur?.live && store) {
      write({ ...store, order: {}, stage: "draft", sent: store.sent.concat([{ time: clockNow(), items: Object.values(store.order) }]) });
      setSelected(null);
    } else drop();
  };
  const deliver = () => {
    if (cur?.live && store) {
      write({ ...store, bill: "done" });
      setSelected(null);
    } else drop();
  };
  const ack = () => selId && setAcked({ ...acked, [selId]: true });

  const size = frame === "page" ? "h-[100dvh] w-full" : "h-[820px] w-[1180px]";

  return (
    <div className={`eu-light flex flex-col overflow-hidden bg-eu-ivory font-eu-sans text-eu-black ${size}`}>
      {/* Top bar */}
      <header className="flex h-[72px] flex-none items-center gap-[18px] overflow-hidden bg-eu-green px-7 text-eu-ivory">
        <img src={IMG.mark} alt="" aria-hidden="true" className="h-[31px] w-8" />
        <span className="font-eu-display text-base tracking-[0.24em]">EUPHORIA</span>
        <span className="h-6 w-px bg-eu-ivory/30" />
        <span className="text-[13px] font-light tracking-[0.08em]">Floor calls</span>
        <span className="flex-1" />
        <span className="hidden border border-eu-ivory/[0.35] px-2.5 py-1.5 text-[11px] font-medium tracking-[0.14em] lg:inline">
          TABLE {TABLE} IS LIVE FROM THE GUEST SCREENS
        </span>
        <span className="hidden text-[13px] font-light sm:inline">[Server name]</span>
        <span className="font-eu-display text-[15px] tracking-[0.06em]">{clock}</span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,40%)_minmax(0,1fr)] md:grid-cols-[380px_minmax(0,1fr)] md:grid-rows-1">
        {/* Queue */}
        <section aria-label="Calls waiting" className="flex min-h-0 flex-col border-b border-eu-black/[0.12] md:border-b-0 md:border-r">
          <div className="flex items-baseline justify-between px-6 pb-3.5 pt-6">
            <h1 className="m-0 font-eu-display text-[22px] font-normal tracking-[0.08em]">Waiting</h1>
            <span className="text-[13px] text-eu-muted">{list.length === 1 ? "1 table" : list.length + " tables"}</span>
          </div>
          <div className="eu-scroll flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4">
            {list.map((c) => {
              const on = c.id === selId;
              const x = sum(c.items);
              const t = TYPE[c.type];
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c.id)}
                  aria-pressed={on}
                  className={`eu-call eu-anim-fade-up-sm flex w-full cursor-pointer flex-col gap-2 border p-[18px] text-left text-eu-black ${
                    on ? "border-eu-green bg-white" : "border-eu-black/[0.14] bg-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`eu-anim-ping h-2 w-2 rounded-full ${t.dot}`} aria-hidden="true" />
                    <span className={`text-[10px] font-medium tracking-[0.18em] ${t.text}`}>{t.label}</span>
                    <span className="flex-1" />
                    <span className="text-xs text-eu-muted">{c.wait}</span>
                  </span>
                  <span className="font-eu-display text-[22px] tracking-[0.06em]">Table {c.table}</span>
                  <span className="text-[13px] font-light text-[#3A3A3C]">
                    {(x.n === 1 ? "1 item" : x.n + " items") + ",  " + naira(x.t)}
                  </span>
                </button>
              );
            })}
            {list.length === 0 && (
              <div className="px-3 py-10 text-center font-eu-serif text-[17px] italic text-eu-muted">Every table is attended to.</div>
            )}
          </div>
        </section>

        {/* Detail */}
        <section aria-label="Call detail" className="flex min-h-0 flex-col">
          {cur ? (
            <>
              <div className="flex items-end justify-between gap-6 border-b border-eu-black/[0.12] px-10 pb-5 pt-8">
                <div className="flex flex-col gap-2">
                  <span className={`font-eu-display text-[11px] tracking-[0.3em] ${TYPE[cur.type].text}`}>{TYPE[cur.type].label}</span>
                  <h2 className="m-0 font-eu-display text-[40px] font-normal tracking-[0.05em]">Table {cur.table}</h2>
                  <span className="text-[13px] font-light text-eu-muted">
                    {(cur.live ? "From the guest's phone" : "Sample call") + ",  waiting " + cur.wait.toLowerCase()}
                  </span>
                </div>
                {acked[cur.id] && (
                  <span className="border border-eu-green px-3 py-2 text-xs font-medium tracking-[0.1em] text-eu-green">YOU ARE ON YOUR WAY</span>
                )}
              </div>

              <div className="eu-scroll flex-1 overflow-y-auto px-10 pb-6 pt-2">
                <ul className="m-0 list-none p-0">
                  {cur.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-5 border-b border-eu-black/10 py-[18px]">
                      <span className="w-11 flex-none font-eu-display text-xl text-eu-green">{it.qty} ×</span>
                      <span className="flex flex-1 flex-col gap-2">
                        <span className="font-eu-display text-[17px] tracking-[0.04em]">{it.name}</span>
                        <span className="text-[11px] tracking-[0.14em] text-eu-muted">{it.cat}</span>
                        {it.note && (
                          <span className="flex items-baseline gap-2.5 self-start bg-[#F7E3E4] px-3 py-2">
                            <span className="text-[10px] font-medium tracking-[0.18em] text-eu-claret">NOTE</span>
                            <span className="font-eu-serif text-base text-eu-black">{it.note}</span>
                          </span>
                        )}
                      </span>
                      <span className="whitespace-nowrap pt-0.5 font-eu-display text-base">{naira(it.qty * it.amount)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between pt-5">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-eu-muted">{cur.type === "bill" ? "BILL TOTAL" : "THIS ORDER"}</span>
                  <span className="font-eu-display text-[26px]">{naira(sum(cur.items).t)}</span>
                </div>
              </div>

              <div className="flex flex-none flex-wrap gap-3.5 border-t border-eu-black/[0.12] bg-eu-ivory px-10 pb-6 pt-[18px]">
                {cur.type === "bill" ? (
                  <>
                    <button type="button" onClick={ack} className={outlineBtn}>PRINTING BILL</button>
                    <button type="button" onClick={deliver} className={solidBtn}>BILL DELIVERED TO TABLE</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={ack} className={outlineBtn}>ON MY WAY</button>
                    <button type="button" onClick={confirm} className={`${solidBtn} flex items-center justify-center gap-3`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF8F3" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
                        <path d="M4 12.5l5 5L20 6.5" />
                      </svg>
                      CONFIRMED WITH GUEST, SEND TO KITCHEN
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3.5 p-10 text-center">
              <img src={IMG.mark} alt="" aria-hidden="true" className="h-[54px] w-14 opacity-50 grayscale" />
              <p className="m-0 font-eu-serif text-[19px] italic text-eu-muted">
                No calls right now. New ones appear here the moment a guest taps Call my server.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
