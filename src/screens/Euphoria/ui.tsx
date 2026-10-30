import { FC, ReactNode, Ref, SVGProps, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { IMG } from "./theme";

/* ───────────────────────── Global styles ─────────────────────────
   Fonts, keyframes and the few hover/focus rules that can't be
   expressed as utilities. Everything is scoped under `.eu`. */

export const EuphoriaStyles: FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Poppins:wght@300;400;500&family=Sorts+Mill+Goudy:ital@0;1&display=swap');

    .eu-scroll{scrollbar-width:none}
    .eu-scroll::-webkit-scrollbar{display:none}
    .eu a:focus-visible,.eu button:focus-visible,.eu input:focus-visible,.eu textarea:focus-visible{outline:2px solid #EAB1B4;outline-offset:3px;border-radius:0}
    .eu .eu-light a:focus-visible,.eu .eu-light button:focus-visible{outline-color:#14213D}
    .eu input::placeholder,.eu textarea::placeholder{color:rgba(250,248,243,0.45)}
    .eu-plate .eu-photo{transition:transform 900ms cubic-bezier(.2,.7,.2,1)}
    .eu-plate:hover .eu-photo{transform:scale(1.04)}
    .eu-dish:hover .eu-dname{color:#EAB1B4}
    .eu-step:hover{background:rgba(250,248,243,0.08)}
    .eu-row:hover{background:#F3F0E8}
    .eu-call:hover{background:#FFFFFF}
    .eu-star{transition:transform 260ms cubic-bezier(.3,1.6,.5,1)}
    .eu-star:active{transform:scale(0.88)}
    .eu-index-step{transition:background 200ms,border-color 200ms}
    .eu-index-step:hover{background:rgba(234,177,180,0.08);border-color:rgba(234,177,180,0.6)}
    .eu-index-step .eu-arr{transition:transform 200ms}
    .eu-index-step:hover .eu-arr{transform:translateX(4px)}
    .eu-nav:hover{background:rgba(250,248,243,0.08)}
    .eu-frame{scrollbar-width:thin;scrollbar-color:rgba(234,177,180,0.4) transparent}

    @keyframes eu-rise{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
    @keyframes eu-rise-sm{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}
    @keyframes eu-fade{from{opacity:0}to{opacity:1}}
    @keyframes eu-fade-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    @keyframes eu-fade-up-sm{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    @keyframes eu-pulse{0%,100%{box-shadow:0 0 0 0 rgba(234,177,180,0.45)}50%{box-shadow:0 0 0 12px rgba(234,177,180,0)}}
    @keyframes eu-seal{from{opacity:0;transform:scale(0.7) rotate(-20deg)}to{opacity:1;transform:none}}
    @keyframes eu-ping{0%,100%{opacity:1}50%{opacity:0.35}}
    .eu-anim-rise{animation:eu-rise 420ms cubic-bezier(.2,.8,.2,1)}
    .eu-anim-rise-sm{animation:eu-rise-sm 400ms ease}
    .eu-anim-fade{animation:eu-fade 300ms ease}
    .eu-anim-fade-slow{animation:eu-fade 450ms ease}
    .eu-anim-fade-up{animation:eu-fade-up 450ms ease}
    .eu-anim-fade-up-sm{animation:eu-fade-up-sm 300ms ease}
    .eu-anim-pulse{animation:eu-pulse 2.2s ease-in-out infinite}
    .eu-anim-seal{animation:eu-seal 600ms cubic-bezier(.3,1.4,.5,1)}
    .eu-anim-ping{animation:eu-ping 1.6s ease-in-out infinite}
    @media (prefers-reduced-motion: reduce){
      .eu [class*="eu-anim-"]{animation:none !important}
    }
  `}</style>
);

/* ───────────────────────── Frames ─────────────────────────
   Guest screens run in three contexts:
   - "page":   a real route on a phone (fills the viewport, capped width on desktop)
   - "device": inside the screen index, as a fixed 390×844 phone frame
   - "full":   inside the screen index, a whole menu page laid out at full height */

export type FrameMode = "page" | "device" | "full";
export const FrameContext = createContext<FrameMode>("page");
export const useFrame = () => useContext(FrameContext);

interface PhoneShellProps {
  /** Tailwind background class for the screen (and the page around it). */
  bg?: string;
  full?: boolean;
  scrollRef?: Ref<HTMLDivElement>;
  /** Room at the bottom of the scroller for a pinned bar. */
  scrollPad?: number;
  /** Pinned bars, sheets and dialogs that sit above the scroller. */
  overlay?: ReactNode;
  children: ReactNode;
}

export const PhoneShell: FC<PhoneShellProps> = ({ bg = "bg-eu-black", full, scrollRef, scrollPad = 0, overlay, children }) => {
  const frame = useFrame();
  const mode: FrameMode = full ? "full" : frame;
  const size =
    mode === "page"
      ? "mx-auto h-[100dvh] w-full max-w-[430px]"
      : mode === "device"
        ? "h-[844px] w-[390px]"
        : "w-[390px]";
  const scroller = mode === "full" ? "relative" : "eu-scroll absolute inset-0 overflow-y-auto";

  const screen = (
    <div className={`relative overflow-hidden font-eu-sans text-eu-ivory ${size} ${bg}`}>
      <div ref={scrollRef} className={`box-border ${scroller}`} style={{ paddingBottom: scrollPad }}>
        {children}
      </div>
      {overlay}
    </div>
  );

  return mode === "page" ? <div className={`min-h-[100dvh] ${bg}`}>{screen}</div> : screen;
};

/* ───────────────────────── Pieces ───────────────────────── */

export const Eyebrow: FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`font-eu-display text-[11px] tracking-[0.32em] text-eu-pink ${className}`}>{children}</div>
);

/** The double hairline with a diamond in the middle. */
export const DoubleRule: FC<{ width: number; line?: string; diamond?: number; className?: string }> = ({
  width,
  line = "bg-eu-pink/55",
  diamond = 5,
  className = "",
}) => {
  const side = (
    <div className="flex flex-1 flex-col gap-[3px]">
      <div className={`h-px ${line}`} />
      <div className={`h-px ${line}`} />
    </div>
  );
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ width }} aria-hidden="true">
      {side}
      <div className="rotate-45 bg-eu-pink" style={{ width: diamond, height: diamond }} />
      {side}
    </div>
  );
};

/** Sticky screen header: back to the menus, the mark and a title. */
export const TopBar: FC<{
  title: string;
  bg?: string;
  border?: string;
  right?: ReactNode;
  children?: ReactNode;
}> = ({ title, bg = "bg-eu-black", border = "border-eu-ivory/[0.12]", right, children }) => (
  <div className={`sticky top-0 z-[5] border-b ${border} ${bg}`}>
    <div className="flex h-16 items-center justify-between px-3">
      <BackLink />
      <div className="flex flex-col items-center gap-0.5">
        <img src={IMG.mark} alt="" aria-hidden="true" className="h-[19px] w-5" />
        <div className="pl-[0.3em] font-eu-display text-[13px] tracking-[0.3em]">{title}</div>
      </div>
      {right ?? <div className="w-11" />}
    </div>
    {children}
  </div>
);

export const IconButton: FC<{ label: string; onClick: () => void; children: ReactNode; className?: string }> = ({
  label,
  onClick,
  children,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`flex h-11 w-11 cursor-pointer items-center justify-center border-none bg-transparent p-0 ${className}`}
  >
    {children}
  </button>
);

export const BackLink: FC<{ to?: string; label?: string }> = ({ to = "/euphoria", label = "All menus" }) => (
  <Link to={to} aria-label={label} className="flex h-11 w-11 items-center justify-center">
    <IconBack />
  </Link>
);

/* ───────────────────────── Icons (stroke, aria-hidden) ───────────────────────── */

type IconProps = SVGProps<SVGSVGElement> & { size?: number; color?: string };

const Svg: FC<IconProps & { children: ReactNode }> = ({ size = 22, color = "#FAF8F3", strokeWidth = 1.4, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} aria-hidden="true" {...rest}>
    {children}
  </svg>
);

export const IconBack: FC<IconProps> = (p) => (
  <Svg strokeLinecap="square" {...p}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const IconArrow: FC<IconProps> = (p) => (
  <Svg size={18} color="#EAB1B4" strokeWidth={1.5} strokeLinecap="square" {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
);
export const IconSearch: FC<IconProps> = (p) => (
  <Svg size={21} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" strokeLinecap="square" />
  </Svg>
);
export const IconClose: FC<IconProps> = (p) => (
  <Svg size={18} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Svg>
);
export const IconMinus: FC<IconProps> = (p) => (
  <Svg size={14} strokeWidth={1.5} {...p}>
    <path d="M5 12h14" />
  </Svg>
);
export const IconPlus: FC<IconProps> = (p) => (
  <Svg size={14} strokeWidth={1.5} {...p}>
    <path d="M5 12h14M12 5v14" />
  </Svg>
);
export const IconCheck: FC<IconProps> = (p) => (
  <Svg size={18} color="#EAB1B4" strokeWidth={1.5} strokeLinecap="square" {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Svg>
);
export const IconBell: FC<IconProps> = (p) => (
  <Svg size={18} color="#0B0B0C" {...p}>
    <path d="M4 17h16M6 17a6 6 0 0112 0M12 8V6M10 6h4" />
  </Svg>
);
export const IconReceipt: FC<IconProps> = (p) => (
  <Svg size={30} color="#EAB1B4" strokeWidth={1.2} {...p}>
    <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z" />
    <path d="M9 8h6M9 11.5h6M9 15h4" />
  </Svg>
);
export const IconPin: FC<IconProps> = (p) => (
  <Svg size={20} color="#EAB1B4" strokeWidth={1.3} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
export const IconInstagram: FC<IconProps> = (p) => (
  <Svg size={20} color="#EAB1B4" strokeWidth={1.3} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="#EAB1B4" />
  </Svg>
);
export const IconExternal: FC<IconProps> = (p) => (
  <Svg size={14} strokeWidth={1.6} strokeLinecap="square" {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Svg>
);
export const IconStar: FC<IconProps & { fill?: string }> = ({ fill = "none", size = 16, color = "#EAB1B4", strokeWidth = 1.3, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" aria-hidden="true" {...rest}>
    <path d="M12 2.8l2.75 6.1 6.65.6-5.05 4.4 1.5 6.5L12 17l-5.85 3.4 1.5-6.5-5.05-4.4 6.65-.6z" />
  </svg>
);
