import React, { useCallback, useRef } from "react";

interface TerminalEnvironmentProps {
  children: React.ReactNode;
}

/**
 * The ambient workspace behind the terminal windows on /lab and
 * /lab/momentos — a faint grid, a vignette that pulls focus to center, and
 * a soft spotlight that follows the cursor.
 *
 * The spotlight position is written straight to a CSS custom property on
 * the DOM node in the mousemove handler, bypassing React state entirely.
 * A radial-gradient position update is compositor-cheap, and routing it
 * through setState would mean a re-render on every pointer move for a
 * purely decorative background — not worth it.
 */
export const TerminalEnvironment: React.FC<TerminalEnvironmentProps> = ({ children }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const node = spotlightRef.current;
    if (!node) return;
    node.style.setProperty("--spot-x", `${e.clientX}px`);
    node.style.setProperty("--spot-y", `${e.clientY}px`);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#0a0b0d] text-[#e7e8ea]"
      onMouseMove={handlePointerMove}
    >
      <div className="workspace-grid pointer-events-none fixed inset-0" aria-hidden="true" />
      <div
        ref={spotlightRef}
        className="workspace-spotlight pointer-events-none fixed inset-0"
        aria-hidden="true"
      />
      <div className="workspace-vignette pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
