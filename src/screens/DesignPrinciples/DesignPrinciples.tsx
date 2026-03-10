import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PortfolioShell } from "../../components/PortfolioShell";

interface Principle {
  name: string;
  infographicLabel: string;
  summary: string;
  whyItMatters: string;
  howToUse: string[];
  example: string;
}

interface SlideDefinition {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
}

interface AccentStyle {
  chip: string;
  line: string;
}

const publicationDate = "08/15/2025";

const keyTakeaways = [
  "Understand the 12 principles: emphasis, balance and alignment, contrast, repetition, proportion, movement, white space, hierarchy, framing, typography, color and shape.",
  "Use each principle to guide attention and strengthen communication.",
  "Use the expanded five principles (hierarchy, framing, typography, color and shape) to refine the original seven.",
  "Apply a practical workflow from message definition to final visual checks.",
];

const workflowSteps = [
  "Define your message in one sentence and identify what the audience must notice first.",
  "Sketch quick layout thumbnails to test balance, alignment and movement before styling.",
  "Choose one or two typefaces and a limited color system to keep contrast and repetition clean.",
  "Group related content for proportion, then create breathing room with deliberate white space.",
  "Review at a distance, squint test the hierarchy, and adjust until the eye flows naturally.",
];

const principles: Principle[] = [
  {
    name: "Emphasis",
    infographicLabel: "Emphasis",
    summary:
      "Create a focal point and clear order of importance so viewers know where to start.",
    whyItMatters:
      "Without emphasis, every element competes equally and the message becomes muddy.",
    howToUse: [
      "Define the single most important message before designing.",
      "Use size, weight, placement or color to make that element dominant.",
      "Reduce visual competition around the focal element.",
    ],
    example:
      "On a concert poster, make the band name dominant before venue, date and ticket details.",
  },
  {
    name: "Balance and Alignment",
    infographicLabel: "Balance",
    summary:
      "Distribute visual weight and align elements to keep compositions stable and readable.",
    whyItMatters:
      "Imbalanced layouts feel accidental and force users to work harder to understand structure.",
    howToUse: [
      "Treat each item as carrying visual weight from size, color and texture.",
      "Use symmetry for calm structure or asymmetry for dynamic but controlled tension.",
      "Align edges and baselines so relationships are obvious.",
    ],
    example:
      "A dashboard with aligned cards and even spacing feels more trustworthy and easier to scan.",
  },
  {
    name: "Contrast",
    infographicLabel: "Contrast",
    summary:
      "Use differences in color, scale, type and spacing to create distinction and clarity.",
    whyItMatters:
      "Contrast improves readability and helps people immediately spot priority information.",
    howToUse: [
      "Ensure text has strong contrast against its background.",
      "Pair only one or two strong typefaces, then vary weights intentionally.",
      "Use contrast to separate primary actions from secondary actions.",
    ],
    example:
      "High-contrast call-to-action buttons outperform muted buttons in dense interfaces.",
  },
  {
    name: "Repetition",
    infographicLabel: "Repeat",
    summary:
      "Repeat key styles and patterns to unify the design and reinforce structure.",
    whyItMatters:
      "Repetition turns isolated style choices into a coherent system users can learn quickly.",
    howToUse: [
      "Reuse heading styles, spacing values and button behaviors across screens.",
      "Limit palettes and components so repeated patterns become recognizable.",
      "Convert recurring one-off decisions into reusable design tokens.",
    ],
    example:
      "Keeping all section headers in the same style makes long pages easier to navigate.",
  },
  {
    name: "Proportion",
    infographicLabel: "Proportion",
    summary:
      "Scale elements relative to each other so visual importance matches content importance.",
    whyItMatters:
      "Good proportion prevents noise and supports hierarchy without extra ornamentation.",
    howToUse: [
      "Group related information and size those groups by priority.",
      "Reserve larger dimensions for high-value actions and messages.",
      "Avoid oversizing decorative elements that distract from core tasks.",
    ],
    example:
      "A compact ticket-information block under a large headline preserves focus and clarity.",
  },
  {
    name: "Movement",
    infographicLabel: "Movement",
    summary:
      "Guide the eye through a deliberate sequence so viewers absorb information in the right order.",
    whyItMatters:
      "Movement creates narrative and helps users complete tasks with less hesitation.",
    howToUse: [
      "Arrange elements so attention travels from top priority to supporting details.",
      "Use spacing, arrows, and directional layout cues to guide scanning behavior.",
      "Check where the eye gets stuck and rebalance that area.",
    ],
    example:
      "In checkout flows, clear progression from summary to payment to confirmation reduces drop-off.",
  },
  {
    name: "White Space",
    infographicLabel: "Whitespace",
    summary:
      "Use intentional empty areas to create hierarchy, grouping and visual relief.",
    whyItMatters:
      "White space improves comprehension and can make interfaces feel more premium and calm.",
    howToUse: [
      "Increase spacing around critical content to signal importance.",
      "Separate unrelated sections with deliberate gaps instead of extra decoration.",
      "Avoid filling every area just because space is available.",
    ],
    example:
      "Giving form fields breathing room reduces input errors and improves completion rate.",
  },
  {
    name: "Hierarchy",
    infographicLabel: "Hierarchy",
    summary:
      "Rank elements so users know what to notice first, second and third.",
    whyItMatters:
      "Clear hierarchy reduces cognitive effort and prevents critical content from being missed.",
    howToUse: [
      "Prioritize one dominant headline before supporting details.",
      "Use scale, weight, and placement to separate primary and secondary information.",
      "Reserve strongest contrast for key actions and decision points.",
    ],
    example:
      "A pricing table with one highlighted plan speeds decisions and reduces comparison fatigue.",
  },
  {
    name: "Framing",
    infographicLabel: "Framing",
    summary:
      "Use boundaries and spacing to focus attention and separate content context.",
    whyItMatters:
      "Framing helps users parse complex layouts quickly by creating clear visual containers.",
    howToUse: [
      "Group related content in cards, blocks, or bounded sections.",
      "Use negative space as an implied frame around priority elements.",
      "Apply borders or background tints only where separation improves clarity.",
    ],
    example:
      "Framed warning banners in settings pages increase visibility of risky actions.",
  },
  {
    name: "Typography",
    infographicLabel: "Type",
    summary:
      "Use type hierarchy, spacing, and weight to shape readability and tone.",
    whyItMatters:
      "Typography controls scannability and greatly impacts whether content feels effortless to read.",
    howToUse: [
      "Limit type families and rely on weight/size for hierarchy.",
      "Use a consistent type scale for headings, body text, and captions.",
      "Set comfortable line length and line height for sustained reading.",
    ],
    example:
      "A clear type system in onboarding screens helps new users understand flows faster.",
  },
  {
    name: "Color",
    infographicLabel: "Color",
    summary:
      "Apply color intentionally for emphasis, grouping, meaning, and brand recall.",
    whyItMatters:
      "Disciplined color systems reduce noise and make state changes immediately recognizable.",
    howToUse: [
      "Assign semantic colors for status states like success, warning, and error.",
      "Use accent color sparingly on primary actions and key data points.",
      "Check color contrast ratios to maintain accessibility.",
    ],
    example:
      "Color-coded transaction states help operations teams triage issues at a glance.",
  },
  {
    name: "Shape",
    infographicLabel: "Shape",
    summary:
      "Use shape language to create rhythm, structure, and recognizable interface personality.",
    whyItMatters:
      "Consistent shapes reinforce patterns and reduce interpretation time across screens.",
    howToUse: [
      "Standardize corner radius and icon geometry across components.",
      "Repeat shape motifs to build continuity across pages.",
      "Use shape contrast to distinguish different content groups.",
    ],
    example:
      "Consistent rounded controls and pill tags make interactive elements easier to spot.",
  },
];

const infographicAccents: AccentStyle[] = [
  {
    chip: "border-[#0054e3]/30 bg-[#e8efff] text-[#1d3973]",
    line: "bg-[#0054e3]/25",
  },
  {
    chip: "border-[#2474d3]/30 bg-[#e6f1ff] text-[#13406e]",
    line: "bg-[#2474d3]/25",
  },
  {
    chip: "border-[#0f8a78]/30 bg-[#e7f7f4] text-[#0f5f56]",
    line: "bg-[#0f8a78]/25",
  },
  {
    chip: "border-[#678817]/30 bg-[#f1f8e3] text-[#4d6118]",
    line: "bg-[#678817]/25",
  },
  {
    chip: "border-[#d47a1e]/30 bg-[#fff3e8] text-[#75461a]",
    line: "bg-[#d47a1e]/25",
  },
  {
    chip: "border-[#cc4a2b]/30 bg-[#ffece7] text-[#712818]",
    line: "bg-[#cc4a2b]/25",
  },
  {
    chip: "border-[#8a58be]/30 bg-[#f2ebff] text-[#4e3171]",
    line: "bg-[#8a58be]/25",
  },
];

const emphasisGrid = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
];

const EmphasisVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Emphasis Visual
    </p>
    <div className="mx-auto mt-4 grid w-full max-w-[430px] grid-cols-5 gap-2 sm:gap-3">
      {emphasisGrid.map((row, rowIndex) =>
        row.map((cell) => {
          const isFocus = rowIndex === 1 && cell === 8;
          if (isFocus) {
            return (
              <div key={`focus-${cell}`} className="relative aspect-square">
                <div
                  className="absolute inset-[10%] bg-[#f4a633]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 60% 12%, 74% 6%, 78% 20%, 92% 22%, 88% 36%, 100% 50%, 88% 64%, 92% 78%, 78% 80%, 74% 94%, 60% 88%, 50% 100%, 40% 88%, 26% 94%, 22% 80%, 8% 78%, 12% 64%, 0% 50%, 12% 36%, 8% 22%, 22% 20%, 26% 6%, 40% 12%)",
                  }}
                />
              </div>
            );
          }

          return (
            <div
              key={`shape-${cell}`}
              className="aspect-square rounded-[28px] bg-[#313f5f]"
            />
          );
        })
      )}
    </div>
  </div>
);

const BalanceAlignmentVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Balance and Alignment Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[520px] space-y-5">
      <div className="h-12 rounded-full bg-[#66b8d9] sm:h-14" />
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`aligned-circle-${index}`}
            className="aspect-square rounded-full bg-[#313f5f]"
          />
        ))}
      </div>
      <div className="h-12 rounded-full bg-[#66b8d9] sm:h-14" />
    </div>
  </div>
);

const ContrastVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Contrast Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[560px]">
      <div className="relative aspect-[2/1] overflow-hidden rounded-[20px]">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#313f5f]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#66b8d9]" />
        <div className="absolute left-1/4 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#66b8d9]" />
        <div className="absolute left-3/4 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#313f5f]" />
      </div>
    </div>
  </div>
);

const RepetitionVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Repetition Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[620px]">
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 7 }).map((__, col) => {
            const isOrange = (row + col) % 2 === 0;
            return (
              <div key={`repeat-cell-${row}-${col}`} className="relative aspect-square">
                <div
                  className={`absolute inset-[16%] rotate-45 rounded-[14px] ${
                    isOrange ? "bg-[#f4a633]" : "bg-[#313f5f]"
                  }`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  </div>
);

const ProportionVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Proportion Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {Array.from({ length: 8 }).map((_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const isLargeCircle = (row + col) % 2 === 0;

          return (
            <div key={`proportion-cell-${index}`} className="aspect-square">
              {isLargeCircle ? (
                <div className="h-full w-full rounded-full bg-[#f4a633]" />
              ) : (
                <div className="grid h-full w-full grid-cols-2 gap-[10%] p-[4%]">
                  {Array.from({ length: 4 }).map((__, circleIndex) => (
                    <div
                      key={`small-circle-${index}-${circleIndex}`}
                      className="aspect-square rounded-full bg-[#313f5f]"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const MovementVisual = () => {
  const arrowCells = new Set([1, 9, 17, 25]);

  return (
    <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
        Movement Visual
      </p>
      <div className="mx-auto mt-5 w-full max-w-[760px]">
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: 28 }).map((_, index) => {
            if (arrowCells.has(index)) {
              return (
                <div key={`movement-arrow-${index}`} className="relative aspect-square">
                  <div className="absolute bottom-[16%] right-[14%] h-[12%] w-[54%] bg-[#313f5f]" />
                  <div className="absolute bottom-[16%] right-[14%] h-[54%] w-[12%] bg-[#313f5f]" />
                  <div className="absolute bottom-[42%] right-[20%] h-[12%] w-[50%] origin-right rotate-45 bg-[#313f5f]" />
                </div>
              );
            }

            return (
              <div key={`movement-circle-${index}`} className="aspect-square rounded-full bg-[#66b8d9]" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WhiteSpaceVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      White Space Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="aspect-[16/9] rounded-[24px] bg-[#313f5f] p-[7%]">
        <div className="grid h-full grid-rows-[1fr_1fr] gap-[12%]">
          <div className="rounded-[24px] bg-[#d3d3c7]" />
          <div className="grid grid-cols-[0.92fr_1.58fr] gap-[9%]">
            <div className="rounded-[22px] bg-[#d3d3c7]" />
            <div className="rounded-[22px] bg-[#d3d3c7]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HierarchyVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Hierarchy Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="space-y-3 sm:space-y-4">
        <div className="h-16 rounded-[22px] bg-[#f4a633] sm:h-20" />
        <div className="h-12 rounded-[20px] bg-[#313f5f] sm:h-14" />
        <div className="h-9 rounded-[18px] bg-[#66b8d9] sm:h-11" />
        <div className="h-6 rounded-[14px] bg-[#313f5f] sm:h-8" />
        <div className="h-3 rounded-full bg-[#f25e25] sm:h-4" />
      </div>
    </div>
  </div>
);

const FramingVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Framing Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px] rounded-full bg-[#d3d3c7]">
        <div className="absolute left-[6%] top-[28%] h-[52%] w-[52%] rounded-full bg-[#313f5f]" />
        <div className="absolute left-[34%] top-[6%] h-[30%] w-[30%] rounded-full bg-[#313f5f]" />
        <div className="absolute left-[59%] top-[16%] h-[24%] w-[24%] rounded-full bg-[#ff5a23]" />
        <div className="absolute left-[68%] top-[42%] h-[19%] w-[19%] rounded-full bg-[#f4a633]" />
        <div className="absolute left-[34%] top-[74%] h-[24%] w-[24%] rounded-full bg-[#e8e8e8]" />
        <div className="absolute left-[55%] top-[54%] h-[36%] w-[36%] rounded-full bg-[#66b8d9]" />
        <div className="absolute left-[45%] top-[39%] h-[16%] w-[16%] rounded-full bg-[#313f5f]" />
        <div className="absolute left-[63%] top-[44%] h-[9%] w-[9%] rounded-full bg-[#ececec]" />
      </div>
    </div>
  </div>
);

const TypographyVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Typography Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="aspect-[16/9] rounded-[24px] bg-[#313f5f] px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex h-full flex-col items-center justify-center text-[#ecece3]">
          <p className="text-6xl font-semibold leading-[0.95] tracking-[-0.02em] sm:text-8xl">
            Heading
          </p>
          <p className="mt-6 text-3xl font-semibold leading-tight sm:text-5xl">
            Subheading
          </p>
          <p className="mt-7 text-xl font-normal leading-relaxed sm:text-3xl">
            Body copy
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ColorVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Color Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[760px]">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[560px]">
        <div className="absolute bottom-[16%] left-1/2 h-[62%] w-[34%] -translate-x-1/2 rounded-[22px] bg-[#313f5f] [transform-origin:50%_100%] [transform:rotate(40deg)]" />
        <div className="absolute bottom-[16%] left-1/2 h-[66%] w-[34%] -translate-x-1/2 rounded-[22px] bg-[#efefef] [transform-origin:50%_100%] [transform:rotate(23deg)]" />
        <div className="absolute bottom-[16%] left-1/2 h-[69%] w-[34%] -translate-x-1/2 rounded-[22px] bg-[#66b8d9] [transform-origin:50%_100%] [transform:rotate(8deg)]" />
        <div className="absolute bottom-[16%] left-1/2 h-[72%] w-[34%] -translate-x-1/2 rounded-[22px] bg-[#ff5a23] [transform-origin:50%_100%] [transform:rotate(-12deg)]" />
        <div className="absolute bottom-[16%] left-1/2 h-[75%] w-[34%] -translate-x-1/2 rounded-[22px] bg-[#f4a633] [transform-origin:50%_100%] [transform:rotate(-38deg)]">
          <div className="absolute bottom-[12%] right-[17%] h-[13%] w-[13%] rounded-full bg-[#313f5f]" />
        </div>
      </div>
    </div>
  </div>
);

const ShapeVisual = () => (
  <div className="rounded-2xl border border-black/10 bg-[#f4f4ef] p-4 sm:p-5">
    <p className="text-[11px] uppercase tracking-[0.12em] text-[#686e76]">
      Shape Visual
    </p>
    <div className="mx-auto mt-5 w-full max-w-[720px]">
      <div className="grid grid-cols-3 items-end gap-4 sm:gap-8">
        <div className="aspect-square rounded-[14px] bg-[#66b8d9] sm:rounded-[18px]" />
        <div
          className="aspect-square rounded-[18px] bg-[#313f5f]"
          style={{
            clipPath: "polygon(50% 6%, 98% 95%, 2% 95%)",
          }}
        />
        <div className="aspect-square rounded-full bg-[#f4a633]" />
      </div>
    </div>
  </div>
);

export const DesignPrinciples = () => {
  const shouldReduceMotion = useReducedMotion();

  const slides = useMemo<SlideDefinition[]>(() => {
    const principleSlides = principles.map((principle) => ({
      id: principle.name.toLowerCase().replace(/\s+/g, "-"),
      label: principle.name,
      eyebrow: "12 Principles of Design",
      title: principle.name,
      subtitle: principle.summary,
      content:
        principle.name === "Emphasis" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Repetition creates a pattern, while one contrasting element becomes
                  the focal point. This is emphasis in action.
                </p>
              </div>
            </article>

            <EmphasisVisual />
          </div>
        ) : principle.name === "Balance and Alignment" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Equal spacing and shared center alignment create stability. Repeated
                  elements with matched margins make the composition feel balanced.
                </p>
              </div>
            </article>

            <BalanceAlignmentVisual />
          </div>
        ) : principle.name === "Contrast" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Contrast becomes clear when opposite values sit side by side.
                  Inverting foreground and background keeps both sides equally
                  legible while creating strong visual distinction.
                </p>
              </div>
            </article>

            <ContrastVisual />
          </div>
        ) : principle.name === "Repetition" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Repeated shapes and alternating colors create a predictable
                  rhythm. Consistency across the grid makes the composition feel
                  unified and intentional.
                </p>
              </div>
            </article>

            <RepetitionVisual />
          </div>
        ) : principle.name === "Proportion" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Large forms can carry the same visual weight as grouped smaller
                  forms. Proportion is about relative scale and how elements share
                  attention within a composition.
                </p>
              </div>
            </article>

            <ProportionVisual />
          </div>
        ) : principle.name === "Movement" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Directional cues create a visual path. Repeating arrows through a
                  field of similar elements guides the eye from one point to the
                  next in a controlled sequence.
                </p>
              </div>
            </article>

            <MovementVisual />
          </div>
        ) : principle.name === "White Space" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Space is an active design element. The intentional gaps between
                  containers create hierarchy, improve scanability, and prevent
                  visual overload without adding extra decoration.
                </p>
              </div>
            </article>

            <WhiteSpaceVisual />
          </div>
        ) : principle.name === "Hierarchy" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Hierarchy is visible when scale and emphasis step down clearly.
                  Large, bold elements lead attention first, then progressively
                  smaller elements carry supporting information.
                </p>
              </div>
            </article>

            <HierarchyVisual />
          </div>
        ) : principle.name === "Framing" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  A shared outer boundary groups diverse elements into one coherent
                  unit. Framing creates context first, then lets differences inside
                  the frame communicate relationships and priority.
                </p>
              </div>
            </article>

            <FramingVisual />
          </div>
        ) : principle.name === "Typography" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Typography hierarchy should show priority at a glance.
                  Distinct size and weight differences make the reading order clear
                  from heading to body copy.
                </p>
              </div>
            </article>

            <TypographyVisual />
          </div>
        ) : principle.name === "Color" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  A limited palette can still feel expressive when hues are chosen
                  intentionally. Color relationships set mood, create emphasis,
                  and make interfaces easier to interpret quickly.
                </p>
              </div>
            </article>

            <ColorVisual />
          </div>
        ) : principle.name === "Shape" ? (
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-black/10 bg-[#fbfbf8] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Reading
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  Distinct geometric shapes create immediate visual variety and
                  aid recognition. Combining square, triangle, and circle forms
                  adds structure while preserving clear differentiation.
                </p>
              </div>
            </article>

            <ShapeVisual />
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                Why It Matters
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1f2328]">
                {principle.whyItMatters}
              </p>
              <div className="mt-4 rounded-xl bg-[#f3f3ef] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#676d75]">
                  Use Case
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#23282e]">
                  {principle.example}
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#6a7078]">
                How To Apply
              </p>
              <ol className="mt-3 space-y-3">
                {principle.howToUse.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm leading-relaxed text-[#21262c]"
                  >
                    <span className="mr-2 text-xs font-semibold text-[#5f646c]">
                      0{index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        ),
    }));

    return [
      {
        id: "cover",
        label: "Cover",
        eyebrow: `Published ${publicationDate}`,
        title: "The 12 Principles of Design and How to Use Them",
        subtitle:
          "A slide-based walkthrough for creating seamless user experiences.",
        content: (
          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="rounded-2xl border border-black/10 bg-white/75 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-[#20242a]">
                Design is creative, but it is also intentional. Strong design does
                more than look good. It helps people understand information quickly
                and complete actions with confidence.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#20242a]">
                These principles give structure to your creative decisions so every
                screen has direction, balance and purpose.
              </p>
            </article>

            <aside className="rounded-2xl border border-black/10 bg-[#16181c] p-4 text-white sm:p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-white/70">
                This deck covers
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>12 principles with practical UX examples</li>
                <li>Visual infographic for fast recall</li>
                <li>Practical application guidance for each principle</li>
                <li>A repeatable method you can apply immediately</li>
              </ul>
            </aside>
          </div>
        ),
      },
      {
        id: "key-takeaways",
        label: "Takeaways",
        eyebrow: "Key Takeaways",
        title: "What You Should Walk Away With",
        subtitle:
          "Use these principles to make your communication clearer and your layouts stronger.",
        content: (
          <div className="grid gap-3 sm:grid-cols-2">
            {keyTakeaways.map((item, index) => (
              <article
                key={item}
                className="rounded-2xl border border-black/10 bg-white/75 p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#656b73]">
                  Point 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#20242a]">{item}</p>
              </article>
            ))}
          </div>
        ),
      },
      {
        id: "infographic",
        label: "Infographic",
        eyebrow: "Principles of Design Infographic",
        title: "At a Glance: 12 Principles",
        subtitle:
          "Each principle reinforces the others to create a seamless user experience.",
        content: (
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="mx-auto w-full max-w-[460px]">
              <div className="relative mx-auto aspect-square w-full rounded-full border border-black/10 bg-[#f6f6f2] shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
                <div className="absolute left-1/2 top-1/2 z-10 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/15 bg-[#111214] px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white sm:w-32">
                  Seamless
                  <br />
                  UX
                </div>
                {principles.map((principle, index) => {
                  const angle =
                    (index / principles.length) * Math.PI * 2 - Math.PI / 2;
                  const orbitDistance = principles.length > 8 ? 42 : 38;
                  const xPercent = 50 + Math.cos(angle) * orbitDistance;
                  const yPercent = 50 + Math.sin(angle) * orbitDistance;
                  const angleDeg = (angle * 180) / Math.PI;
                  const accent =
                    infographicAccents[index % infographicAccents.length];

                  return (
                    <div key={principle.name}>
                      <div
                        className={`absolute left-1/2 top-1/2 h-[2px] origin-left ${accent.line}`}
                        style={{
                          width: "27%",
                          transform: `rotate(${angleDeg}deg)`,
                        }}
                      />
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${xPercent}%`,
                          top: `${yPercent}%`,
                        }}
                      >
                        <span
                          className={`inline-flex items-center justify-center rounded-full border px-2 py-1 text-center font-semibold leading-tight ${
                            principles.length > 8
                              ? "w-16 text-[9px] sm:w-20 sm:text-[10px]"
                              : "w-20 text-[10px] sm:w-28 sm:text-[11px]"
                          } ${accent.chip}`}
                        >
                          {principle.infographicLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              {principles.map((principle, index) => (
                <div
                  key={`${principle.name}-legend`}
                  className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-[#22272d]"
                >
                  <span className="mr-2 text-xs font-semibold text-[#5d636c]">
                    0{index + 1}
                  </span>
                  {principle.name}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      ...principleSlides,
      {
        id: "how-to-use",
        label: "How To Use",
        eyebrow: "Practical Workflow",
        title: "How to Apply the Principles on Real Projects",
        subtitle: "Use this five-step method for logos, posters, product pages and dashboards.",
        content: (
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-black/10 bg-white/80 p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#666c75]">
                  Step 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#20242a]">{step}</p>
              </article>
            ))}
          </div>
        ),
      },
    ];
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = slides.length;
  const currentSlide = slides[activeSlide];
  const progress = ((activeSlide + 1) / slideCount) * 100;
  const isFirstSlide = activeSlide === 0;
  const isLastSlide = activeSlide === slideCount - 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index > slideCount - 1) return;
      setActiveSlide(index);
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    setActiveSlide((current) => (current < slideCount - 1 ? current + 1 : current));
  }, [slideCount]);

  const goPrevious = useCallback(() => {
    setActiveSlide((current) => (current > 0 ? current - 1 : current));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToSlide(slideCount - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, goToSlide, slideCount]);

  return (
    <PortfolioShell contentClassName="!max-w-none !px-0 !py-0">
      <section className="relative h-[calc(100vh-4rem-1px)] overflow-hidden bg-[#e7e7e2]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,84,227,0.12),transparent_42%),radial-gradient(circle_at_86%_20%,rgba(205,74,43,0.1),transparent_45%),radial-gradient(circle_at_42%_88%,rgba(111,134,39,0.1),transparent_45%)]" />

        <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#6a6f77]">
              Design Principles Presentation
            </p>
            <p className="text-xs text-[#4f555d]">
              Slide {activeSlide + 1} of {slideCount}
            </p>
          </div>

          <div className="relative mt-3 flex-1 overflow-hidden rounded-[28px] border border-black/10 bg-[#f8f8f5]/95 shadow-[0_28px_90px_rgba(0,0,0,0.12)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={currentSlide.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, x: 16 }
                }
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, x: -18 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.1 }
                    : { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }
                }
                className="absolute inset-0 overflow-y-auto p-5 sm:p-8 lg:p-10"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6c7179]">
                  {currentSlide.eyebrow}
                </p>
                <h1 className="section-title mt-2 max-w-4xl text-4xl leading-[1.03] text-[#111214] sm:text-5xl lg:text-[3.5rem]">
                  {currentSlide.title}
                </h1>
                {currentSlide.subtitle ? (
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#545a63] sm:text-base">
                    {currentSlide.subtitle}
                  </p>
                ) : null}
                <div className="mt-6">{currentSlide.content}</div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrevious}
                disabled={isFirstSlide}
                className="rounded-full border border-black/15 bg-[#151618] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={isLastSlide}
                className="rounded-full border border-black/15 bg-[#f7f7f3] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#151618] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>

            <div>
              <div className="h-1.5 w-full rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-[#0054e3] transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-[#656a72]">
                Use Left/Right arrows or Home/End keys
              </p>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive ? "w-8 bg-[#111214]" : "w-2.5 bg-black/25 hover:bg-black/45"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PortfolioShell>
  );
};
