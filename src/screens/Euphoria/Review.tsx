import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { api, convex, scannedTable } from "./backend";
import { GOOGLE_REVIEW_URL, IMG, PATHS } from "./theme";
import { BackLink, Eyebrow, IconBack, IconButton, IconExternal, IconPin, IconStar, PhoneShell } from "./ui";

const WORDS = ["Tap a star to rate", "Disappointing", "Below expectations", "Good", "Very good", "Exceptional"];
const ASPECTS = ["Food", "Drinks", "Service", "Ambience", "The Pool", "Music", "Value"];

export type ReviewPreset = "live" | "rated" | "details" | "thanks";

const FILLED = {
  rating: 5,
  aspects: { Food: true, Service: true, "The Pool": true } as Record<string, boolean>,
  text: "The lamb chops were superb and our server knew the menu by heart. The pool at dusk is something else.",
  name: "Adaeze Okafor",
  table: "12",
};

const lineInput =
  "h-11 border-0 border-b border-solid border-eu-ivory/[0.35] bg-transparent p-0 font-eu-sans text-[15px] font-light text-eu-ivory outline-none";
const fieldLabel = "text-[11px] font-medium tracking-[0.16em] text-eu-ivory/70";

/** 18–21: rate the visit, say what stood out, then share on Google. */
export const Review: FC<{ preset?: ReviewPreset }> = ({ preset = "live" }) => {
  const filled = preset === "details" || preset === "thanks";
  const [step, setStep] = useState(preset === "details" ? 1 : preset === "thanks" ? 2 : 0);
  const [rating, setRating] = useState(preset === "rated" || filled ? 5 : 0);
  const [aspects, setAspects] = useState<Record<string, boolean>>(filled ? FILLED.aspects : {});
  const [text, setText] = useState(filled ? FILLED.text : "");
  const [name, setName] = useState(filled ? FILLED.name : "");
  const [table, setTable] = useState(() => (filled ? FILLED.table : preset === "live" ? scannedTable() : ""));
  const [contact, setContact] = useState("");
  const [copied, setCopied] = useState(false);

  const first = name.trim().split(" ")[0];
  const low = rating > 0 && rating <= 3;
  const thanksLine = low
    ? contact.trim()
      ? "We are sorry we fell short. A manager will reach out to you personally."
      : "We are sorry we fell short. Your words are already with our management."
    : "Your review is now with our management. We look forward to welcoming you again.";

  const submit = () => {
    // Preset screens in the screen index never post.
    if (preset === "live" && convex) {
      convex
        .mutation(api.euphoria.submitReview, {
          rating,
          aspects: ASPECTS.filter((a) => aspects[a]),
          text,
          name,
          table,
          contact,
        })
        .catch((e) => console.error("Euphoria: could not send the review", e));
    }
    setStep(2);
  };

  const copy = () => {
    try {
      if (navigator.clipboard && text) navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked: the link still opens */
    }
    setCopied(true);
  };

  return (
    <PhoneShell>
      <div className="sticky top-0 z-[5] flex h-16 items-center justify-between bg-eu-black px-3">
        {step === 1 ? (
          <IconButton label="Previous step" onClick={() => setStep(0)}>
            <IconBack />
          </IconButton>
        ) : step === 0 ? (
          <BackLink />
        ) : (
          <div className="w-11" />
        )}
        <div className="flex gap-2" role="img" aria-label={`Step ${step + 1} of 3`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-0.5 w-[22px] transition-colors duration-300 ${i <= step ? "bg-eu-pink" : "bg-eu-ivory/20"}`} />
          ))}
        </div>
        <div className="w-11" />
      </div>

      {/* Step 1: rating */}
      {step === 0 && (
        <div className="eu-anim-fade-up box-border flex min-h-[700px] flex-col items-center px-6 pb-10 pt-12 text-center">
          <img src={IMG.mark} alt="" aria-hidden="true" className="h-[61px] w-16" />
          <Eyebrow className="mt-8">YOUR TIME AT EUPHORIA</Eyebrow>
          <h1 className="m-0 mt-3 font-eu-display text-[27px] font-normal leading-[1.25] tracking-[0.05em]">
            How Was Your
            <br />
            Experience?
          </h1>
          <div role="radiogroup" aria-label="Rating out of five" className="mt-11 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={n + (n === 1 ? " star" : " stars")}
                onClick={() => setRating(n)}
                className="eu-star flex h-[54px] w-[54px] cursor-pointer items-center justify-center border-none bg-transparent p-0"
              >
                <IconStar size={40} strokeWidth={1} fill={n <= rating ? "#EAB1B4" : "none"} />
              </button>
            ))}
          </div>
          <div className={`mt-4 h-7 font-eu-serif text-[19px] italic ${rating ? "text-eu-pink" : "text-eu-ivory/50"}`}>{WORDS[rating]}</div>
          <div className="min-h-12 flex-1" />
          <button
            type="button"
            onClick={() => rating && setStep(1)}
            disabled={!rating}
            className={`h-14 w-full cursor-pointer border text-xs font-medium tracking-[0.24em] transition-colors duration-300 disabled:cursor-default ${
              rating ? "border-eu-pink bg-eu-pink text-eu-black" : "border-eu-ivory/20 bg-transparent text-eu-ivory/40"
            }`}
          >
            CONTINUE
          </button>
          <p className="m-0 mt-4 text-xs font-light leading-normal text-eu-ivory/55">Every review is read by our management.</p>
        </div>
      )}

      {/* Step 2: details */}
      {step === 1 && (
        <div className="eu-anim-fade-up flex flex-col gap-9 px-6 pb-10 pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1" role="img" aria-label={`Rated ${rating} of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <IconStar key={n} strokeWidth={1.2} fill={n <= rating ? "#EAB1B4" : "none"} />
              ))}
            </div>
            <h1 className="m-0 mt-1 font-eu-display text-2xl font-normal tracking-[0.05em]">What Stood Out?</h1>
            <p className="m-0 font-eu-serif text-base italic text-eu-ivory/[0.68]">Choose as many as you like.</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {ASPECTS.map((a) => {
              const on = !!aspects[a];
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAspects({ ...aspects, [a]: !on })}
                  className={`h-11 cursor-pointer border px-[18px] font-eu-display text-xs tracking-[0.14em] transition-colors duration-200 ${
                    on ? "border-eu-pink bg-eu-pink text-eu-black" : "border-eu-ivory/30 bg-transparent text-eu-ivory"
                  }`}
                >
                  {a.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="eu-rv-text" className="font-eu-display text-[11px] tracking-[0.28em] text-eu-pink">
              YOUR WORDS
            </label>
            <textarea
              id="eu-rv-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="Tell us about the dishes, the service, the evening."
              className="resize-none border border-eu-ivory/[0.16] bg-eu-raised p-4 font-eu-serif text-[17px] leading-normal text-eu-ivory outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="eu-rv-name" className={fieldLabel}>
                NAME
              </label>
              <input id="eu-rv-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" className={lineInput} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="eu-rv-table" className={fieldLabel}>
                TABLE
              </label>
              <input id="eu-rv-table" value={table} onChange={(e) => setTable(e.target.value)} placeholder="Optional" className={lineInput} />
            </div>
          </div>
          <div className="-mt-3 flex flex-col gap-1">
            <label htmlFor="eu-rv-contact" className={fieldLabel}>
              PHONE OR EMAIL
            </label>
            <input
              id="eu-rv-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="If you would like us to follow up"
              className={lineInput}
            />
          </div>

          <button
            type="button"
            onClick={submit}
            className="h-14 w-full cursor-pointer border-none bg-eu-pink text-xs font-medium tracking-[0.24em] text-eu-black"
          >
            SUBMIT REVIEW
          </button>
        </div>
      )}

      {/* Step 3: thank you and Google */}
      {step === 2 && (
        <div className="eu-anim-fade-up flex flex-col items-center px-6 pb-12 pt-10 text-center">
          <div className="eu-anim-seal flex h-24 w-24 items-center justify-center rounded-full bg-eu-green">
            <img src={IMG.mark} alt="" aria-hidden="true" className="h-[52px] w-[54px]" />
          </div>
          <Eyebrow className="mt-7">RECEIVED</Eyebrow>
          <h1 className="m-0 mt-3 font-eu-display text-[26px] font-normal leading-[1.25] tracking-[0.05em]">
            {first ? `Thank You, ${first}.` : "Thank You."}
          </h1>
          <p className="m-0 mt-3.5 max-w-[310px] font-eu-serif text-[17px] leading-[1.55] text-eu-ivory/80">{thanksLine}</p>

          <div className="eu-light mt-10 box-border flex w-full flex-col gap-3.5 bg-eu-ivory px-6 py-7 text-left text-eu-black">
            <div className="flex items-center gap-3">
              <IconPin size={28} color="#0F3B2E" />
              <span className="font-eu-display text-base tracking-[0.08em]">Share it on Google</span>
            </div>
            <p className="m-0 font-eu-serif text-base leading-normal text-[#3A3A3C]">
              We have copied your words for you. Paste them on our Google Maps page so other guests can find their way to us.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copy}
              className="flex h-[52px] items-center justify-center gap-2.5 bg-eu-green text-xs font-medium tracking-[0.2em] text-eu-ivory no-underline"
            >
              {copied ? "COPIED, OPENING GOOGLE" : "COPY AND OPEN GOOGLE"}
              <IconExternal />
            </a>
          </div>

          <Link to={PATHS.home} className="mt-7 inline-flex h-12 items-center text-xs font-medium tracking-[0.22em] text-eu-pink no-underline">
            BACK TO THE MENUS
          </Link>
        </div>
      )}
    </PhoneShell>
  );
};
