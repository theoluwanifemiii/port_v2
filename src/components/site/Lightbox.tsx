import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconClose, IconNext, IconPrev } from "./icons";
import "./Lightbox.css";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

/**
 * Full-screen image viewer. Esc, the close button or a click on the dark
 * backdrop closes it; arrows (buttons or ← →) move between images. Rendered
 * into <body> so a transformed ancestor (the auto-scrolling strip) can't
 * break its fixed position. Page scroll is locked while open and focus
 * returns to whatever opened it.
 */
export const Lightbox: FC<LightboxProps> = ({ images, index, onChange }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const open = index !== null && images.length > 0;
  const many = images.length > 1;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (many && e.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      else if (many && e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep focus inside the viewer.
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, many, index, images.length, onChange]);

  if (!open) return null;
  const img = images[index];

  return createPortal(
    <div
      ref={dialogRef}
      className="d4-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
    >
      <button ref={closeRef} type="button" className="lb-btn lb-close" aria-label="Close" onClick={() => onChange(null)}>
        <IconClose />
      </button>

      {many && (
        <button
          type="button"
          className="lb-btn lb-prev"
          aria-label="Previous image"
          onClick={() => onChange((index - 1 + images.length) % images.length)}
        >
          <IconPrev />
        </button>
      )}

      <figure className="lb-figure" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
        <img key={img.src} src={img.src} alt={img.alt} />
        <figcaption>
          {many && (
            <span className="lb-count">
              {index + 1} / {images.length}
            </span>
          )}
          <span>{img.alt}</span>
        </figcaption>
      </figure>

      {many && (
        <button
          type="button"
          className="lb-btn lb-next"
          aria-label="Next image"
          onClick={() => onChange((index + 1) % images.length)}
        >
          <IconNext />
        </button>
      )}
    </div>,
    document.body
  );
};
