import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, LucideProps, X } from "lucide-react";
import { FC } from "react";

/**
 * Lucide icons for the site, sized to the text around them (1em) with a
 * thin stroke to match the type. Decorative: the link text carries the meaning.
 */
const base = (props: LucideProps): LucideProps => ({
  size: "1em",
  strokeWidth: 1.5,
  "aria-hidden": true,
  focusable: false,
  ...props,
  className: `d4-ico ${props.className ?? ""}`,
});

/** Next, continue, go to an internal page. */
export const IconArrow: FC<LucideProps> = (props) => <ArrowRight {...base(props)} />;
/** Opens another site or file (new tab). */
export const IconExternal: FC<LucideProps> = (props) => <ArrowUpRight {...base(props)} />;
/** Back. */
export const IconBack: FC<LucideProps> = (props) => <ArrowLeft {...base(props)} />;
/** Close a dialog. */
export const IconClose: FC<LucideProps> = (props) => <X {...base(props)} />;
/** Previous / next in a viewer. */
export const IconPrev: FC<LucideProps> = (props) => <ChevronLeft {...base(props)} />;
export const IconNext: FC<LucideProps> = (props) => <ChevronRight {...base(props)} />;
