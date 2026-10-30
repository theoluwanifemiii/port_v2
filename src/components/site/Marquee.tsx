import { Children, CSSProperties, FC, ReactNode, cloneElement, isValidElement } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds per item for one full loop; more items scroll for longer at the same speed. */
  secondsPerItem?: number;
  /** Space between items, in px. */
  gap?: number;
  className?: string;
  label?: string;
}

/**
 * An auto-scrolling horizontal strip. The items render twice so the loop
 * is seamless (the second copy is hidden from screen readers), it pauses
 * on hover or keyboard focus, and with reduced motion it becomes a plain
 * horizontally scrollable row instead.
 */
export const Marquee: FC<MarqueeProps> = ({
  children,
  secondsPerItem = 7,
  gap = 20,
  className = "",
  label,
}) => {
  const items = Children.toArray(children);
  const style = {
    "--marquee-gap": `${gap}px`,
    "--marquee-duration": `${Math.max(items.length, 1) * secondsPerItem}s`,
  } as CSSProperties;

  const copy = (hidden: boolean) =>
    items.map((item, i) => (
      <div className="marquee-item" key={`${hidden ? "b" : "a"}-${i}`} aria-hidden={hidden || undefined}>
        {hidden && isValidElement(item) ? hideFromA11y(item) : item}
      </div>
    ));

  return (
    <div className={`marquee ${className}`} style={style} role="region" aria-label={label}>
      <div className="marquee-track">
        {copy(false)}
        <div className="marquee-dupe">{copy(true)}</div>
      </div>
    </div>
  );
};

/** The duplicate copy must not be reachable by Tab or announced twice. */
function hideFromA11y(el: React.ReactElement) {
  const props = el.props as { alt?: string };
  return cloneElement(el as React.ReactElement<Record<string, unknown>>, {
    tabIndex: -1,
    ...(props.alt !== undefined ? { alt: "" } : {}),
  });
}
