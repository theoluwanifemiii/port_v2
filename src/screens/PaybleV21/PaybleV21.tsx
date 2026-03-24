import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Zap,
  ChevronDown,
} from "lucide-react";

/* ─── Assets ─── */
const A = {
  reader: "/payble/Payble.121_063143.png",
  device: "/payble/Payble.151_090935.jpg",
  cardStack: "/payble/Payble.179_010451.jpg",
  phone1: "/payble/Payble.129_053927.png",
  phone2: "/payble/Payble.130_053942.png",
  phone3: "/payble/Payble.131_054000.png",
  phone4: "/payble/Payble.132_054010.png",
  heroImg: "/payble/Payble.173_010400.jpg",
};

/* ─── Countdown to launch ─── */
const LAUNCH_DAYS = 10;
function useCountdown() {
  const target = useRef(() => {
    const d = new Date();
    d.setDate(d.getDate() + LAUNCH_DAYS);
    return d.getTime();
  }).current();
  const [t, setT] = useState({ d: LAUNCH_DAYS, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

/* ─── Mouse parallax (direct DOM) — rests at default tilt ─── */
function useParallax() {
  const heroRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLDivElement>(null);
  const c2 = useRef<HTMLDivElement>(null);

  // Default tilt: phone sits on a platform viewed from slightly above-left
  const DEFAULT = "perspective(1100px) rotateX(7deg) rotateY(-10deg)";

  const onMove = useCallback((e: MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    if (phoneRef.current)
      phoneRef.current.style.transform = `perspective(1100px) rotateX(${7 - y * 6}deg) rotateY(${-10 + x * 12}deg) scale(1.02)`;
    if (c1.current) c1.current.style.transform = `translate(${x * -22}px,${y * -13}px)`;
    if (c2.current) c2.current.style.transform = `translate(${x * 16}px,${y * 10}px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (phoneRef.current) phoneRef.current.style.transform = DEFAULT;
    if (c1.current) c1.current.style.transform = "translate(0,0)";
    if (c2.current) c2.current.style.transform = "translate(0,0)";
  }, [DEFAULT]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);

  return { heroRef, phoneRef, c1, c2 };
}

/* ─── Scroll reveal ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rv");
    const io = new IntersectionObserver((ens) => ens.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("rv-in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── FAQ ─── */
const faqs = [
  { q: "How do I get started with Payble?", a: "Download our App from the Play Store or App Store. Go through our two-stage sign-up process — it's quick and easy!" },
  { q: "What services does Payble offer?", a: "Payble offers personal and business banking, instant money transfers, invoicing, virtual and physical cards, and POS card readers — all in one app." },
  { q: "Is Payble suitable for small businesses?", a: "Absolutely. Payble is built for Nigerian small businesses and freelancers who need a simple, powerful way to manage money and accept payments." },
  { q: "How secure is Payble?", a: "We use bank-grade encryption, biometric authentication, and real-time fraud monitoring. All deposits are insured by the NDIC." },
  { q: "Can I accept payments on the go with Payble?", a: "Yes — our smart, NFC-enabled card readers turn any smartphone or tablet into a portable POS terminal." },
  { q: "What kind of support does Payble offer?", a: "We offer 24/7 in-app chat support, an extensive FAQ, and dedicated account managers for business accounts." },
];

export const PaybleV21 = () => {
  const cd = useCountdown();
  const { heroRef, phoneRef, c1, c2 } = useParallax();
  useReveal();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ all: "initial" } as React.CSSProperties}>
      <div className="min-h-screen bg-[#0C0C0E] text-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
          *, *::before, *::after { box-sizing: border-box; }

          .phone-tilt { transform: perspective(1100px) rotateX(7deg) rotateY(-10deg); transition: transform 0.55s cubic-bezier(0.23,1,0.32,1); will-change: transform; }
          .float-c  { transition: transform 0.55s cubic-bezier(0.23,1,0.32,1); will-change: transform; }

          .rv { opacity:0; transform:translateY(26px); transition: opacity .7s ease, transform .7s ease; }
          .rv.rv-in { opacity:1; transform:translateY(0); }
          .rv-d1 { transition-delay:.1s; } .rv-d2 { transition-delay:.18s; } .rv-d3 { transition-delay:.26s; }

          .card-lift { transition: transform .28s ease, box-shadow .28s ease; }
          .card-lift:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(0,0,0,.55); }

          .hero-grid {
            background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
            background-size: 72px 72px;
          }

          @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes floatY2{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
          .fl1 { animation: floatY 5s ease-in-out infinite; }
          .fl2 { animation: floatY2 7s ease-in-out infinite reverse; }

          @keyframes slideInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          .notif-1 { animation: slideInUp .7s ease both; }
          .notif-2 { animation: slideInUp .7s .3s ease both; }
          .notif-3 { animation: slideInUp .7s .6s ease both; }

          @keyframes pulse-g { 0%{box-shadow:0 0 0 0 rgba(74,222,128,.5)} 70%{box-shadow:0 0 0 8px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
          .pulse-g { animation: pulse-g 2s ease infinite; }

          .faq-answer { overflow:hidden; transition: max-height .4s cubic-bezier(0.4,0,0.2,1), opacity .35s ease; }

          .store-btn { transition: transform .2s ease, background .2s ease; }
          .store-btn:hover { transform: translateY(-2px); }
        `}</style>

        {/* ══ Nav ══ */}
        <nav className="fixed top-0 w-full z-50 px-6 py-5">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <span className="text-white font-bold text-xl tracking-tight">Payble</span>
            <div className="hidden md:flex items-center gap-8">
              {["Personal", "Business", "Company"].map(l => (
                <a key={l} href="#" className="text-white/45 text-sm font-medium hover:text-white transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <a href="#" className="text-white/40 text-sm font-medium hover:text-white transition-colors hidden sm:block">Log in</a>
              <a href="#" className="bg-white text-[#0C0C0E] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">Get started</a>
            </div>
          </div>
        </nav>

        {/* ══ Hero ══ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
          {/* Video background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline preload="auto"
            style={{ zIndex: 0 }}
          >
            <source src="/payble/Payble_081411.mp4" type="video/mp4" />
          </video>
          {/* Dark overlays */}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1, background: "rgba(12,12,14,0.72)" }} />
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse 70% 65% at 65% 50%, rgba(79,110,247,.10) 0%, transparent 68%)" }} />
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#0C0C0E]" style={{ zIndex: 1 }} />

          <div className="relative max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-20" style={{ zIndex: 2 }}>

            {/* Text */}
            <div>
              {/* Countdown badge */}
              <div className="inline-flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 mb-8 bg-white/[0.04]">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Launching V2.1 in</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    {[{ v: cd.d, l: "d" }, { v: cd.h, l: "h" }, { v: cd.m, l: "m" }, { v: cd.s, l: "s" }].map(({ v, l }) => (
                      <span key={l} className="text-white font-bold text-lg tabular-nums tracking-tight">
                        {String(v).padStart(2, "0")}<span className="text-white/30 text-xs font-normal ml-0.5">{l}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <span className="text-[11px] font-semibold text-[#4F6EF7]">No Green!</span>
              </div>

              <h1 className="font-bold text-white leading-[0.93] tracking-[-0.04em] mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
                Go cashless<br />with Payble.
              </h1>
              <p className="text-white/40 text-[17px] leading-relaxed mb-10 max-w-[380px]">
                Send, receive, track and manage your money and business, your way.
              </p>

              {/* App store buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <button className="store-btn flex items-center gap-3 bg-white text-[#0C0C0E] px-5 py-3.5 rounded-2xl">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="text-left">
                    <p className="text-[9px] font-medium opacity-60 leading-none">Download on the</p>
                    <p className="text-[13px] font-bold leading-tight">App Store</p>
                  </div>
                </button>
                <button className="store-btn flex items-center gap-3 bg-[#141416] border border-white/10 text-white px-5 py-3.5 rounded-2xl">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l12.5-12.5-2.83-2.83L3.18 23.76zm16.14-10.45-2.47-1.43-3.17 3.17 3.17 3.17 2.5-1.45c.71-.41.71-1.07-.03-1.46zM3.01.27C2.69.49 2.5.88 2.5 1.38v21.26c0 .5.19.89.51 1.11l.12.08L14.3 12.16v-.27L3.13.19l-.12.08zm8.57 8.57L3.01.27l11.29 6.52-2.72 2.05z"/></svg>
                  <div className="text-left">
                    <p className="text-[9px] font-medium opacity-50 leading-none">Get it on</p>
                    <p className="text-[13px] font-bold leading-tight">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Phone + floating cards */}
            <div className="flex justify-center relative" style={{ height: 750 }}>

              {/* Floating card 1 — payment received */}
              <div ref={c1} className="float-c fl1 absolute right-2 lg:right-10 top-8 z-20 bg-[#141416] border border-white/[0.08] rounded-2xl p-4 w-52 shadow-2xl">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full pulse-g" />
                  </div>
                  <span className="text-[10px] text-white/40 font-semibold uppercase tracking-widest">Payment received</span>
                </div>
                <p className="text-white font-bold text-[1.35rem] tracking-tight leading-none">₦350,000</p>
                <p className="text-white/30 text-[11px] mt-1.5 font-medium">from Adewale Okon · just now</p>
              </div>

              {/* Phone */}
              <div ref={phoneRef} className="phone-tilt relative z-10" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="relative overflow-hidden"
                  style={{ width: 295, height: 620, borderRadius: "3.25rem", border: "2px solid rgba(255,255,255,.1)", background: "#080809", boxShadow: "0 40px 120px rgba(0,0,0,.8), 0 0 80px rgba(79,110,247,.15)" }}
                >
                  {/* Dynamic island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black rounded-full" style={{ width: 108, height: 33 }} />
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-7 pt-4">
                    <span className="text-white text-[11px] font-semibold">9:41</span>
                    <span className="text-white/50 text-[11px] font-semibold">▪▪▪</span>
                  </div>

                  {/* App screenshot */}
                  <img
                    src={A.phone1}
                    alt="Payble app"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Rocky cliff / mountain platform */}
                <div className="absolute pointer-events-none" style={{ bottom: -130, left: "50%", transform: "translateX(-50%)", width: 520, zIndex: 20 }}>
                  {/* Screen-glow reflection on rock */}
                  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 260, height: 28, background: "radial-gradient(ellipse, rgba(79,110,247,0.5) 0%, transparent 70%)", filter: "blur(12px)", zIndex: 1 }} />
                  <svg viewBox="0 0 520 140" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", filter: "drop-shadow(0 -8px 40px rgba(0,0,0,0.95))" }}>
                    {/* Rock shadow/depth layer */}
                    <path d="M0,140 L0,105 L18,98 L32,88 L44,92 L55,80 L68,75 L80,82 L92,68 L105,55 L118,62 L128,48 L142,52 L155,42 L168,38 L180,46 L192,32 L205,28 L218,36 L228,22 L240,18 L252,14 L260,10 L268,14 L280,18 L292,22 L302,36 L315,28 L328,32 L340,46 L352,38 L365,42 L378,48 L388,52 L402,55 L415,48 L428,62 L440,68 L452,55 L465,75 L478,80 L488,92 L502,88 L520,105 L520,140 Z" fill="#060608" />
                    {/* Main rock face */}
                    <path d="M0,140 L0,108 L22,100 L36,90 L48,95 L60,82 L74,77 L86,85 L98,70 L112,57 L124,65 L134,50 L148,55 L160,44 L173,40 L185,49 L198,35 L210,30 L222,39 L232,24 L244,20 L256,15 L260,12 L264,15 L276,20 L288,24 L298,39 L310,30 L322,35 L335,49 L347,40 L360,44 L373,55 L386,50 L396,65 L408,57 L422,70 L434,85 L446,77 L460,82 L472,95 L484,90 L498,100 L520,108 L520,140 Z" fill="#0F0F12" />
                    {/* Rock texture highlights — crevices */}
                    <path d="M112,57 L124,65 L128,58 L118,52 Z" fill="#161619" />
                    <path d="M396,65 L408,57 L402,50 L392,58 Z" fill="#161619" />
                    <path d="M232,24 L244,20 L240,32 L228,36 Z" fill="#1A1A1E" />
                    <path d="M276,20 L288,24 L292,36 L280,32 Z" fill="#1A1A1E" />
                    <path d="M160,44 L173,40 L170,52 L157,56 Z" fill="#161619" />
                    <path d="M347,40 L360,44 L363,56 L350,52 Z" fill="#161619" />
                    {/* Top ridge highlight — subtle light catching the peak */}
                    <path d="M240,18 L252,14 L260,10 L268,14 L280,18 L276,20 L264,15 L260,12 L256,15 L244,20 Z" fill="#1E1E24" />
                    {/* Rock crack lines */}
                    <line x1="134" y1="50" x2="128" y2="80" stroke="#090909" strokeWidth="1.5" />
                    <line x1="386" y1="50" x2="392" y2="80" stroke="#090909" strokeWidth="1.5" />
                    <line x1="210" y1="30" x2="198" y2="60" stroke="#0A0A0C" strokeWidth="1" />
                    <line x1="310" y1="30" x2="322" y2="60" stroke="#0A0A0C" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Floating card 2 — balance */}
              <div ref={c2} className="float-c fl2 absolute left-0 lg:-left-4 bottom-16 z-20 bg-[#4F6EF7] rounded-2xl p-5 w-48 shadow-2xl">
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-widest mb-2">Business balance</p>
                <p className="text-white font-bold text-[1.5rem] tracking-tight leading-none">₦2.4M</p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  <span className="text-[10px] text-white/55 font-medium">+12% this month</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Stats strip ══ */}
        <div className="border-y border-white/[0.06] py-10 px-6 bg-[#0C0C0E]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            {[["500K+","Active users"],["₦2B+","Processed daily"],["99.9%","Uptime SLA"],["< 2s","Transfer speed"]].map(([v, l], i) => (
              <div key={l} className={`rv rv-d${i < 3 ? i + 1 : 3}`}>
                <p className="text-3xl font-bold tracking-tight text-white">{v}</p>
                <p className="text-sm text-white/30 mt-1.5 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Daily Driver ══ */}
        <section className="py-32 px-6 bg-[#0C0C0E]">
          <div className="max-w-[1200px] mx-auto">
            <div className="rv mb-14">
              <p className="text-white/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-5">Built for you</p>
              <h2 className="font-bold text-white tracking-[-0.03em] leading-[1.05] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                Your Personal and Business Daily Driver.
              </h2>
              <p className="text-white/40 text-[17px] leading-relaxed mt-4 max-w-xl">
                The Payble all-in-one app lets you manage both your personal and business finances in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="card-lift rv md:col-span-2 bg-[#141416] rounded-[2rem] p-9 relative overflow-hidden min-h-[360px] flex flex-col justify-between group cursor-pointer">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#4F6EF7]/15 flex items-center justify-center mb-7">
                    <LayoutDashboard className="w-5 h-5 text-[#4F6EF7]" />
                  </div>
                  <h3 className="text-[1.35rem] font-bold text-white tracking-tight mb-3">Personal and business banking</h3>
                  <p className="text-white/40 text-[15px] leading-[1.65] max-w-xs">Manage your finances easily, all in one place. Switch accounts in a single tap.</p>
                </div>
                <div className="absolute bottom-0 right-0 w-[50%] bg-[#1C1C20] rounded-tl-2xl border-t border-l border-white/[0.06] p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                    <span className="text-xs font-semibold text-white bg-[#4F6EF7] px-3 py-1 rounded-full">Business</span>
                    <span className="text-xs font-semibold text-white/25 px-3 py-1">Personal</span>
                  </div>
                  <div className="space-y-2">
                    {["@exther11 received $200","Sent invoice to Ayo"].map(t => (
                      <div key={t} className="h-7 bg-white/[0.04] rounded-lg flex items-center px-3">
                        <span className="text-white/30 text-[10px] font-medium truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-lift rv rv-d1 bg-[#4F6EF7] rounded-[2rem] p-9 flex flex-col justify-between min-h-[360px] cursor-pointer">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center mb-7">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[1.35rem] font-bold text-white tracking-tight mb-3">Instant transfers</h3>
                  <p className="text-white/65 text-[15px] leading-[1.65]">Send money in under 2 seconds, any bank, anywhere in Nigeria.</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/15 mt-6">
                  <p className="text-[10px] text-white/45 uppercase tracking-widest font-semibold mb-1.5">Transfer sent</p>
                  <p className="text-[1.8rem] font-bold text-white tracking-tight">₦350,000</p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-xs text-white/45 font-medium">Arrived in 1.8s</span>
                  </div>
                </div>
              </div>

              {[
                { icon: <Globe2 className="w-5 h-5 text-emerald-400"/>, bg:"bg-emerald-500/10", title:"Global payments", desc:"Accept cards and payments from anywhere, in any currency.", delay:"rv-d1" },
                { icon: <TrendingUp className="w-5 h-5 text-amber-400"/>, bg:"bg-amber-500/10", title:"Live analytics", desc:"Track every naira, automatically categorized as it moves.", delay:"rv-d2" },
                { icon: <ShieldCheck className="w-5 h-5 text-purple-400"/>, bg:"bg-purple-500/10", title:"Bank-grade security", desc:"Biometrics, 2FA, and real-time fraud alerts built in.", delay:"rv-d3" },
              ].map(c => (
                <div key={c.title} className={`card-lift rv ${c.delay} bg-[#141416] rounded-[2rem] p-9 min-h-[240px] cursor-pointer`}>
                  <div className={`w-10 h-10 rounded-2xl ${c.bg} flex items-center justify-center mb-7`}>{c.icon}</div>
                  <h3 className="text-[1.1rem] font-bold text-white tracking-tight mb-2.5">{c.title}</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ We Are Payble – card reader (light) ══ */}
        <section className="py-32 px-6 bg-[#F0F0EC] text-[#0C0C0E]">
          <div className="max-w-[1200px] mx-auto">
            <div className="rv mb-20 text-center">
              <p className="text-black/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-4">We are Payble</p>
              <h2 className="font-bold tracking-[-0.035em] leading-[1.05]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                Built for local hustle.<br />Ready for global growth.
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="rv">
                <p className="text-black/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-6">Card readers</p>
                <h3 className="font-bold tracking-[-0.03em] leading-[1.05] mb-6" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)" }}>
                  Turn your phone into a powerful POS.
                </h3>
                <p className="text-black/50 text-[17px] leading-relaxed mb-10 max-w-md">
                  NFC-enabled, portable, and smart. Accept payments from anyone, anywhere, at any time.
                </p>
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {["Supersmart","NFC Enabled","Portable"].map(t => (
                    <span key={t} className="text-[13px] font-semibold text-black/55 border border-black/10 px-4 py-2 rounded-full">{t}</span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-[#0C0C0E] border border-black/15 px-6 py-3.5 rounded-full hover:bg-black/5 transition-colors">
                  Shop card readers <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative rv rv-d2">
                <img src={A.reader} alt="Payble card reader" className="w-full rounded-3xl shadow-2xl shadow-black/10" />
                <div className="absolute -bottom-6 -left-8 w-32 h-56 rounded-3xl overflow-hidden border-2 border-white shadow-2xl rotate-[-7deg]">
                  <img src={A.device} alt="Payble device" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Business Suite + Unlock Potential (dark) ══ */}
        <section className="py-32 px-6 bg-[#0C0C0E]">
          <div className="max-w-[1200px] mx-auto">
            {/* Business suite row */}
            <div className="rv grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-6">Business suite</p>
                <h2 className="font-bold text-white tracking-[-0.035em] leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                  Manage your business and accept payments — anywhere, anytime.
                </h2>
                <p className="text-white/40 text-[17px] leading-relaxed mb-10 max-w-md">
                  Our best-in-class ERP lets you run invoicing, payments, and reporting from a single dashboard.
                </p>
                <ul className="space-y-4 mb-10">
                  {["Accept payments from anyone, anywhere","Manage invoices and track outstanding balances","Full reporting and analytics in one view","Built for individuals with global ambitions"].map(item => (
                    <li key={item} className="flex items-start gap-3 text-white/50 text-[15px] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#4F6EF7] shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-white text-[#0C0C0E] font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/90 transition-colors">Be the first to know</button>
                  <button className="text-white/50 font-semibold px-8 py-4 rounded-full text-sm border border-white/10 hover:border-white/25 hover:text-white transition-all">Join the waitlist</button>
                </div>
              </div>
              <div className="rv rv-d1">
                <img src={A.heroImg} alt="Payble app" className="w-full max-w-md rounded-3xl mx-auto shadow-2xl" />
              </div>
            </div>

            {/* Unlock potential */}
            <div className="rv text-center mb-16">
              <p className="text-white/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-5">Unlock your potential</p>
              <h2 className="font-bold text-white tracking-[-0.04em] leading-[0.93] mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Build wealth.<br />Redefine possibilities.
              </h2>
              <p className="text-white/40 text-lg max-w-md mx-auto">
                Build wealth, achieve goals, and redefine your possibilities. Experience the convenience and efficiency of Payble today.
              </p>
            </div>

            {/* Stacked notifications */}
            <div className="max-w-md mx-auto space-y-3 mb-16">
              {[
                { amt: "₦5,000", msg: "received into your NGN account", scale: "scale-95", opacity: "opacity-70", delay: "notif-1" },
                { amt: "₦2,000,000", msg: "received into your NGN account", scale: "scale-[0.97]", opacity: "opacity-85", delay: "notif-2" },
                { amt: "₦350,000", msg: "received into your NGN account", scale: "scale-100", opacity: "opacity-100", delay: "notif-3" },
              ].map((n) => (
                <div key={n.amt} className={`${n.delay} ${n.scale} ${n.opacity} bg-[#141416] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4`}>
                  <div className="w-10 h-10 bg-green-500/15 rounded-full flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-1">Success</p>
                    <p className="text-white font-semibold text-[15px]">You have successfully received <span className="text-green-400">{n.amt}</span> {n.msg}.</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center rv">
              <button className="bg-white text-[#0C0C0E] font-bold px-10 py-5 rounded-full text-[1.05rem] hover:bg-white/90 transition-all hover:scale-[1.03]">
                Join us now
              </button>
            </div>
          </div>
        </section>

        {/* ══ Cards (light) ══ */}
        <section className="py-32 px-6 bg-[#F0F0EC]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="rv">
              <p className="text-black/30 text-[11px] uppercase tracking-[0.22em] font-medium mb-6">Payble card</p>
              <h2 className="font-bold text-[#0C0C0E] tracking-[-0.035em] leading-[1.05] mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                Cards you can trust.
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0C0C0E]/8 text-[#0C0C0E]/50 mb-6">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />Coming Soon
              </span>
              <p className="text-black/50 text-[17px] leading-relaxed mb-10 max-w-md">
                Access your money globally, anytime, anyplace — in stores, online, or at ATMs.
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-[#0C0C0E] hover:text-black/50 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="rv rv-d2">
              <img src={A.cardStack} alt="Payble cards" className="w-full rounded-3xl shadow-xl shadow-black/10" />
            </div>
          </div>
        </section>

        {/* ══ Download CTA ══ */}
        <section className="py-44 px-6 bg-[#0C0C0E] text-center overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(79,110,247,.1) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-[860px] mx-auto rv">
            <h2 className="font-bold text-white tracking-[-0.045em] leading-[0.92] mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
              What are you<br />waiting for?
            </h2>
            <p className="text-white/35 text-xl mb-12 max-w-sm mx-auto leading-relaxed">
              Download Payble and take the first step towards effortless payment management.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="store-btn flex items-center gap-3 bg-white text-[#0C0C0E] px-6 py-4 rounded-2xl">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="text-left">
                  <p className="text-[9px] font-medium opacity-50 leading-none">Download on the</p>
                  <p className="text-[14px] font-bold leading-tight">App Store</p>
                </div>
              </button>
              <button className="store-btn flex items-center gap-3 bg-[#141416] border border-white/10 text-white px-6 py-4 rounded-2xl">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l12.5-12.5-2.83-2.83L3.18 23.76zm16.14-10.45-2.47-1.43-3.17 3.17 3.17 3.17 2.5-1.45c.71-.41.71-1.07-.03-1.46zM3.01.27C2.69.49 2.5.88 2.5 1.38v21.26c0 .5.19.89.51 1.11l.12.08L14.3 12.16v-.27L3.13.19l-.12.08zm8.57 8.57L3.01.27l11.29 6.52-2.72 2.05z"/></svg>
                <div className="text-left">
                  <p className="text-[9px] font-medium opacity-40 leading-none">Get it on</p>
                  <p className="text-[14px] font-bold leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="py-24 px-6 bg-[#0C0C0E]">
          <div className="max-w-[760px] mx-auto">
            <div className="rv mb-14 text-center">
              <h2 className="font-bold text-white tracking-[-0.03em]" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}>
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-2 rv">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/[0.07] rounded-2xl overflow-hidden bg-[#141416]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                  >
                    <span className="text-white font-semibold text-[15px] pr-6">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className="faq-answer" style={{ maxHeight: openFaq === i ? "200px" : "0", opacity: openFaq === i ? 1 : 0 }}>
                    <p className="px-7 pb-6 text-white/50 text-[15px] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Footer ══ */}
        <footer className="border-t border-white/[0.06] bg-[#0C0C0E] px-6 pt-16 pb-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
              <div className="col-span-2 md:col-span-1">
                <span className="text-white font-bold text-xl tracking-tight block mb-4">Payble</span>
                <p className="text-white/30 text-[13px] leading-relaxed max-w-[220px]">
                  All Deposits Are Insured By The NDIC. Payble is powered by Stella's Microfinance Bank.
                </p>
                <div className="flex gap-4 mt-6">
                  {["f", "in", "𝕏"].map((label, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-xs font-bold">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              {[
                { heading: "Company", links: ["About us", "Contact us", "Careers"] },
                { heading: "Our Product", links: ["Cards", "Card readers", "Payment"] },
                { heading: "Resources", links: ["FAQ's", "Privacy Policy", "Cookie Policy"] },
              ].map(col => (
                <div key={col.heading}>
                  <p className="text-white font-semibold text-sm mb-4">{col.heading}</p>
                  <ul className="space-y-3">
                    {col.links.map(l => <li key={l}><a href="#" className="text-white/35 text-sm hover:text-white transition-colors">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-white/20 text-[12px] leading-relaxed max-w-xl">
                "Payble" is a trademark of MyPayble Technologies Limited. Plot 654 Sani Abacha Way, By FCDA/NTA HQRS, Area 11, Garki Abuja.
              </p>
              <p className="text-white/20 text-sm shrink-0">© 2024, MyPayble Inc.</p>
            </div>
              </div>
        </footer>
      </div>
    </div>
  );
};
