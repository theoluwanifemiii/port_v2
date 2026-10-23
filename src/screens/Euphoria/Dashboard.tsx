import { FC, useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";
import { api, convex, useLive } from "./backend";
import { Connecting, PinScreen, useStaffAccess } from "./StaffAccess";
import { IMG } from "./theme";
import { IconStar } from "./ui";

type Status = "new" | "follow" | "replied";
interface GuestReview {
  id: string;
  name: string;
  src: "qr" | "google";
  rating: number;
  when: string;
  table: string;
  tags: string[];
  text: string;
  contact: string;
  status: Status;
}

const SAMPLE: GuestReview[] = [
  { id: "1", name: "Adaeze O.", src: "qr", rating: 5, when: "Sat, 7:42 pm", table: "Table 12", tags: ["Food", "Service"], text: "The lamb shank was outstanding and our server knew the menu by heart. The pool at dusk is something else.", contact: "", status: "new" },
  { id: "2", name: "Tunde B.", src: "google", rating: 5, when: "Sat, 3:10 pm", table: "", tags: ["Ambience", "Drinks"], text: "Best brunch spot in Ikoyi. Cocktails were perfect and the setting is beautiful.", contact: "", status: "new" },
  { id: "3", name: "Guest", src: "qr", rating: 2, when: "Fri, 9:05 pm", table: "Table 4", tags: ["Service"], text: "Food was good but we waited almost forty minutes for mains with no update.", contact: "0802 000 0000", status: "follow" },
  { id: "4", name: "Kemi A.", src: "qr", rating: 4, when: "Fri, 1:20 pm", table: "Table 7", tags: ["Food", "Value"], text: "Business lunch was quick and elegant. Would love one more dessert option.", contact: "", status: "replied" },
  { id: "5", name: "Michael E.", src: "google", rating: 3, when: "Thu, 8:47 pm", table: "", tags: ["Music"], text: "Lovely place, music was a little loud for conversation.", contact: "", status: "new" },
  { id: "6", name: "Zainab M.", src: "qr", rating: 5, when: "Thu, 7:15 pm", table: "Table 2", tags: ["Drinks", "The Pool"], text: "The PMS cocktail is my new favourite. Thank you for a wonderful birthday evening.", contact: "", status: "replied" },
];
const TAGS = ["Food", "Drinks", "Service", "Ambience", "The Pool", "Music", "Value"];
const STATUS: Record<Status, { label: string; cls: string }> = {
  new: { label: "New", cls: "text-eu-navy" },
  follow: { label: "Priority: call back requested", cls: "text-eu-claret border-b-2 border-eu-claret" },
  replied: { label: "Replied", cls: "text-eu-green" },
};

const avg = (list: GuestReview[]) => (list.length ? (list.reduce((a, r) => a + r.rating, 0) / list.length).toFixed(1) : "–");

const whenLabel = (t: number) => {
  const d = new Date(t);
  const day = d.toLocaleDateString("en-GB", { weekday: "short" });
  const h = d.getHours();
  const m = d.getMinutes();
  return `${day}, ${(h % 12) || 12}:${m < 10 ? "0" : ""}${m} ${h < 12 ? "am" : "pm"}`;
};

const Bar: FC<{ label: string; count: number; width: string; fill: string; labelW: string }> = ({ label, count, width, fill, labelW }) => (
  <div className="flex items-center gap-3 text-[13px]">
    <span className={`${labelW} text-eu-muted`}>{label}</span>
    <span className="h-2 flex-1 bg-[#EFEBE2]">
      <span className={`block h-2 ${fill}`} style={{ width }} />
    </span>
    <span className="w-6 text-right font-medium">{count}</span>
  </div>
);

/** 22: management's view of every guest review, QR and Google side by side. */
export const Dashboard: FC<{ demo?: boolean }> = ({ demo = false }) => {
  const access = useStaffAccess(demo);
  const remote = access.status === "ready";
  const [src, setSrc] = useState<"all" | "qr" | "google">("all");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [statusOverride, setStatusOverride] = useState<Record<string, Status>>({});
  const live = useLive(api.euphoria.listReviews, remote ? { key: access.key } : "skip");

  if (access.status === "checking") return <Connecting />;
  if (access.status === "needPin") return <PinScreen title="Guest Reviews" message={access.message} onSubmit={access.setKey} />;

  const source: GuestReview[] = remote
    ? (live.data ?? []).map((r) => ({
        id: r._id,
        name: r.name || "Guest",
        src: r.source,
        rating: r.rating,
        when: whenLabel(r._creationTime),
        table: r.table ? "Table " + r.table : "",
        tags: r.aspects,
        text: r.text,
        contact: r.contact,
        status: r.status,
      }))
    : SAMPLE;
  // Live statuses come from the server, so every manager sees the same list.
  const all = remote ? source : source.map((r) => ({ ...r, status: statusOverride[r.id] || r.status }));

  const setStatus = (id: string, status: Status) => {
    if (!remote) setStatusOverride({ ...statusOverride, [id]: status });
    else if (convex) {
      convex
        .mutation(api.euphoria.setReviewStatus, { key: access.key, id: id as Id<"euphoriaReviews">, status })
        .catch((e) => console.error("Euphoria: could not update the review", e));
    }
  };
  const google = all.filter((r) => r.src === "google");
  const open = all.filter((r) => r.status !== "replied");
  const follow = all.filter((r) => r.status === "follow");
  const shown = all.filter((r) => (src === "all" || r.src === src) && (!onlyOpen || r.status !== "replied"));

  const ratingCounts = [5, 4, 3, 2, 1].map((n) => ({ n, c: all.filter((r) => r.rating === n).length }));
  const max = Math.max(0, ...ratingCounts.map((x) => x.c));
  const tagCounts = TAGS.map((t) => ({ t, c: all.filter((r) => r.tags.includes(t)).length }))
    .filter((x) => x.c)
    .sort((a, b) => b.c - a.c);
  const tmax = tagCounts.length ? tagCounts[0].c : 1;

  const kpis = [
    { label: "OVERALL RATING", value: avg(all), note: all.length + (remote ? " reviews" : " reviews this week"), alert: false },
    { label: "FROM TABLE QR", value: String(all.length - google.length), note: "Average " + avg(all.filter((r) => r.src === "qr")), alert: false },
    { label: "GOOGLE MAPS", value: avg(google), note: remote && !google.length ? "Not connected yet" : google.length + " new on Google", alert: false },
    { label: "AWAITING RESPONSE", value: String(open.length), note: follow.length + " asked for a call back", alert: follow.length > 0 },
  ];

  const navLink = "flex h-11 items-center px-4 text-[13px] font-light tracking-[0.06em] text-eu-ivory/[0.78] no-underline";

  return (
    <div className="eu-light flex min-h-[100dvh] flex-wrap bg-eu-ivory font-eu-sans text-eu-black">
      {/* Side menu */}
      <aside className="box-border flex max-w-full flex-[1_1_240px] flex-col gap-10 bg-eu-green px-7 py-9 text-eu-ivory">
        <div className="flex items-center gap-3.5">
          <img src={IMG.mark} alt="" aria-hidden="true" className="h-[34px] w-9" />
          <div className="flex flex-col gap-0.5">
            <span className="font-eu-display text-base tracking-[0.22em]">EUPHORIA</span>
            <span className="text-[11px] font-light tracking-[0.08em] text-eu-ivory/70">Management</span>
          </div>
        </div>
        <nav aria-label="Dashboard" className="flex flex-col gap-1">
          <a
            href="#reviews"
            aria-current="page"
            className="flex h-11 items-center gap-3 border-l-2 border-eu-pink bg-eu-ivory/10 px-3.5 text-[13px] font-medium tracking-[0.06em] text-eu-ivory no-underline"
          >
            Guest reviews
            <span className="ml-auto bg-eu-pink px-2 py-0.5 text-[11px] text-eu-black">{open.length}</span>
          </a>
          <a href="#menus" className={navLink}>Menus and prices</a>
          <a href="#qr" className={navLink}>Table QR codes</a>
          <a href="#settings" className={navLink}>Settings</a>
        </nav>
        <div className="mt-auto font-eu-serif text-[13px] italic text-eu-ivory/60">A Sujimoto creation</div>
      </aside>

      {/* Content */}
      <main id="reviews" className="box-border min-w-0 flex-[999_1_560px] px-[clamp(20px,4vw,64px)] pb-[72px] pt-12">
        <header className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="font-eu-display text-[11px] tracking-[0.32em] text-eu-claret">GUEST VOICE</div>
            <h1 className="m-0 font-eu-display text-[34px] font-normal tracking-[0.05em]">Reviews</h1>
            <p className="m-0 font-eu-serif text-[17px] text-eu-muted">Reviews from the table QR codes and Google Maps, side by side.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-eu-black/20 px-2.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-eu-muted">
              {remote ? "LIVE" : "SAMPLE DATA"}
            </span>
            <span className="text-[13px] text-eu-muted">
              {remote ? (
                "Google Maps reviews: not connected yet"
              ) : (
                <>
                  Google synced <strong className="font-medium text-eu-black">[time]</strong>
                </>
              )}
            </span>
            {remote && (
              <button
                type="button"
                onClick={access.signOut}
                className="h-11 cursor-pointer border border-eu-green bg-transparent px-3 text-[11px] font-medium tracking-[0.14em] text-eu-green"
              >
                LOCK
              </button>
            )}
          </div>
        </header>

        {/* KPIs */}
        <section aria-label="Summary" className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-l border-t border-eu-black/[0.14]">
          {kpis.map((k) => (
            <div key={k.label} className="flex flex-col gap-2.5 border-b border-r border-eu-black/[0.14] bg-white p-6">
              <span className="text-[11px] font-medium tracking-[0.16em] text-eu-muted">{k.label}</span>
              <span className={`font-eu-display text-4xl tracking-[0.02em] ${k.alert ? "text-eu-claret" : "text-eu-black"}`}>{k.value}</span>
              <span className="text-xs font-light text-eu-muted">{k.note}</span>
            </div>
          ))}
        </section>

        {/* Breakdown */}
        <section className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          <div className="flex flex-col gap-3.5 border border-eu-black/[0.14] bg-white p-6">
            <h2 className="m-0 mb-1.5 font-eu-display text-[15px] font-normal tracking-[0.12em]">Rating Spread</h2>
            {ratingCounts.map(({ n, c }) => (
              <Bar key={n} label={`${n} star`} count={c} width={(max ? Math.round((c / max) * 100) : 0) + "%"} fill="bg-eu-green" labelW="w-[52px]" />
            ))}
          </div>
          <div className="flex flex-col gap-3.5 border border-eu-black/[0.14] bg-white p-6">
            <h2 className="m-0 mb-1.5 font-eu-display text-[15px] font-normal tracking-[0.12em]">What Guests Mention</h2>
            {tagCounts.map((x) => (
              <Bar key={x.t} label={x.t} count={x.c} width={Math.round((x.c / tmax) * 100) + "%"} fill="bg-eu-claret" labelW="w-[84px]" />
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-eu-black/[0.14]">
            <div role="tablist" aria-label="Source" className="flex gap-7">
              {([["all", "ALL"], ["qr", "TABLE QR"], ["google", "GOOGLE"]] as const).map(([key, label]) => {
                const on = src === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setSrc(key)}
                    className={`-mb-px h-12 cursor-pointer border-0 border-b-2 border-solid bg-transparent p-0 font-eu-display text-xs tracking-[0.18em] ${
                      on ? "border-eu-green text-eu-black" : "border-transparent text-eu-muted"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <label className="flex h-11 cursor-pointer items-center gap-2.5 text-[13px] text-eu-muted">
              <input type="checkbox" checked={onlyOpen} onChange={() => setOnlyOpen(!onlyOpen)} className="h-[18px] w-[18px] accent-eu-green" />
              Needs a response only
            </label>
          </div>

          <ul className="m-0 list-none p-0">
            {shown.map((r) => {
              const st = STATUS[r.status];
              const done = r.status === "replied";
              return (
                <li key={r.id} className="eu-row flex flex-wrap gap-x-8 gap-y-5 border-b border-eu-black/[0.12] px-2 py-6">
                  <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
                    <div className="flex gap-[3px]" role="img" aria-label={`${r.rating} of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <IconStar key={n} size={15} color="#0F3B2E" fill={n <= r.rating ? "#0F3B2E" : "none"} />
                      ))}
                    </div>
                    <span className="font-eu-display text-[15px] tracking-[0.06em]">{r.name}</span>
                    <span className="text-xs font-light text-eu-muted">{[r.when, r.table].filter(Boolean).join("  ·  ")}</span>
                    <span
                      className={`self-start px-2 py-[3px] text-[10px] font-medium tracking-[0.16em] ${
                        r.src === "google" ? "bg-eu-navy text-eu-ivory" : "bg-eu-pink text-eu-black"
                      }`}
                    >
                      {r.src === "google" ? "GOOGLE MAPS" : "TABLE QR"}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-[999_1_360px] flex-col gap-2.5">
                    <p className="m-0 max-w-[70ch] font-eu-serif text-[17px] leading-[1.55] text-[#1A1A1C]">{r.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span key={t} className="border border-eu-black/[0.18] px-2 py-[3px] text-[11px] tracking-[0.08em] text-eu-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    {r.contact && (
                      <span className="text-xs text-eu-muted">
                        Contact: <span className="font-medium text-eu-black">{r.contact}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-[1_1_180px] flex-col items-start gap-2.5">
                    <span className={`pb-0.5 text-xs font-medium ${st.cls}`}>{st.label}</span>
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, done ? "new" : "replied")}
                      className={`h-11 cursor-pointer border border-eu-green px-4 text-[11px] font-medium tracking-[0.16em] ${
                        done ? "bg-transparent text-eu-green" : "bg-eu-green text-eu-ivory"
                      }`}
                    >
                      {done ? "REOPEN" : r.src === "google" ? "REPLY ON GOOGLE" : "MARK REPLIED"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {shown.length === 0 && (
            <p className="m-0 px-2 py-10 font-eu-serif text-[17px] italic text-eu-muted">
              {all.length ? "Every review in this view has a response. Well done." : remote && live.data === undefined ? "Loading reviews…" : "No reviews yet. They appear here as guests leave them."}
            </p>
          )}
        </section>
      </main>
    </div>
  );
};
