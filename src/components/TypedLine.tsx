import { useEffect, useRef, useState } from "react";

interface TypedLineProps {
  text: string;
  /** Starts (or restarts) the reveal when it flips true. */
  active: boolean;
  /** ms per character. */
  speed?: number;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
  /** Fired once per revealed character — hook a keystroke sound to this. */
  onChar?: () => void;
  /** Skip the animation and show the full string immediately (reduced motion). */
  instant?: boolean;
}

/**
 * Reveals `text` one character at a time once `active` becomes true, with a
 * blinking cursor at the write head while typing. Used for anything that
 * should read as a terminal executing a command rather than a page just
 * fading in — the boot log in Lab, the `$ cat file.md` headers in MomentOS.
 */
export const TypedLine: React.FC<TypedLineProps> = ({
  text,
  active,
  speed = 28,
  className,
  cursorClassName,
  onComplete,
  onChar,
  instant = false,
}) => {
  const [count, setCount] = useState(instant ? text.length : 0);
  const startedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onCharRef = useRef(onChar);
  onCompleteRef.current = onComplete;
  onCharRef.current = onChar;

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }
    if (!active || startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setCount(i);
      onCharRef.current?.();
      if (i >= text.length) {
        window.clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [active, instant, text, speed]);

  const done = count >= text.length;

  return (
    <span className={className}>
      {text.slice(0, count)}
      {!instant && !done && (
        <span className={cursorClassName ?? "animate-pulse"} aria-hidden="true">
          ▍
        </span>
      )}
    </span>
  );
};
