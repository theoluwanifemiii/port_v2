import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { useGesture } from "@use-gesture/react";
import "./CurvedWall.css";

export type CurvedWallImage = string | { src: string; alt?: string };

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

type WallItem = { col: number; row: number; src: string; alt: string };

function buildWallItems(pool: CurvedWallImage[], cols: number, rows: number): WallItem[] {
  if (pool.length === 0) {
    return Array.from({ length: cols * rows }, (_, i) => ({
      col: i % cols,
      row: Math.floor(i / cols),
      src: "",
      alt: "",
    }));
  }

  const normalized = pool.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : { src: img.src || "", alt: img.alt || "" }
  );

  // Avoid placing the same image in adjacent cells
  const total = cols * rows;
  const filled = normalized.slice();
  while (filled.length < total) filled.push(...normalized);

  for (let i = 1; i < total; i++) {
    if (filled[i].src === filled[i - 1].src) {
      for (let j = i + 1; j < total; j++) {
        if (filled[j].src !== filled[i].src) {
          [filled[i], filled[j]] = [filled[j], filled[i]];
          break;
        }
      }
    }
  }

  return Array.from({ length: total }, (_, i) => ({
    col: i % cols,
    row: Math.floor(i / cols),
    src: filled[i]?.src ?? "",
    alt: filled[i]?.alt ?? "",
  }));
}

export interface CurvedWallProps {
  images?: CurvedWallImage[];
  cols?: number;
  rows?: number;
  fit?: number;
  minRadius?: number;
  maxRadius?: number;
  /** height / width ratio for each tile. Default 1.4 (portrait) */
  tileAspect?: number;
  /** Gap fraction relative to tile width. Default 0.08 */
  tileGapFactor?: number;
  bgColor?: string;
  dragSensitivity?: number;
  dragDampening?: number;
  enlargeTransitionMs?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  /** Continuously rotate the wall. Default false. */
  autoRotate?: boolean;
  /** Auto-rotation speed in degrees per second. Default 5. */
  autoRotateSpeed?: number;
  children?: ReactNode;
}

export default function CurvedWall({
  images = [],
  cols = 22,
  rows = 4,
  fit = 0.55,
  minRadius = 420,
  maxRadius = 1500,
  tileAspect = 1.4,
  tileGapFactor = 0.09,
  bgColor = "#e7e7e2",
  dragSensitivity = 22,
  dragDampening = 2,
  enlargeTransitionMs = 300,
  openedImageWidth,
  openedImageHeight,
  imageBorderRadius = "16px",
  openedImageBorderRadius = "26px",
  grayscale = false,
  autoRotate = false,
  autoRotateSpeed = 5,
  children,
}: CurvedWallProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const cylinderRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const rotYRef = useRef(0);
  const startRotYRef = useRef(0);
  const startPosXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const autoRotateRAF = useRef<number | null>(null);
  const autoRotateLastTime = useRef<number | null>(null);
  const openedNaturalSizeRef = useRef<{ w: number; h: number } | null>(null);
  const currentOpenIndexRef = useRef(-1);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("cw-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("cw-scroll-lock");
  }, []);

  const items = useMemo(() => buildWallItems(images, cols, rows), [images, cols, rows]);

  const applyCylinderTransform = (yDeg: number) => {
    const el = cylinderRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--cw-radius) * -1)) rotateY(${yDeg}deg)`;
    }
  };

  // ── Resize observer: compute radius + tile sizes ─────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;

      const w = Math.max(1, cr.width);

      let radius = w * fit;
      radius = clamp(radius, minRadius, maxRadius);

      const arcPerCol = (2 * Math.PI) / cols;
      const tileW = Math.round(radius * arcPerCol * (1 - tileGapFactor));
      const tileH = Math.round(tileW * tileAspect);
      const tileStepY = Math.round(tileH * (1 + tileGapFactor));

      root.style.setProperty("--cw-radius", `${radius}px`);
      root.style.setProperty("--cw-tile-w", `${tileW}px`);
      root.style.setProperty("--cw-tile-h", `${tileH}px`);
      root.style.setProperty("--cw-tile-step-y", `${tileStepY}px`);
      root.style.setProperty("--cw-tile-radius", imageBorderRadius);
      root.style.setProperty("--cw-enlarge-radius", openedImageBorderRadius);
      root.style.setProperty("--cw-image-filter", grayscale ? "grayscale(1)" : "none");
      root.style.setProperty("--cw-bg", bgColor);

      applyCylinderTransform(rotYRef.current);

      // Re-position open overlay if any
      const enlargedOverlay = viewerRef.current?.querySelector(".cw-enlarge") as HTMLElement | null;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();
        if (openedImageWidth && openedImageHeight) {
          const tmp = document.createElement("div");
          tmp.style.cssText = `position:absolute;width:${openedImageWidth};height:${openedImageHeight};visibility:hidden;`;
          document.body.appendChild(tmp);
          const tmpRect = tmp.getBoundingClientRect();
          document.body.removeChild(tmp);
          enlargedOverlay.style.left = `${frameR.left - mainR.left + (frameR.width - tmpRect.width) / 2}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top + (frameR.height - tmpRect.height) / 2}px`;
        } else if (openedNaturalSizeRef.current) {
          const { w, h } = openedNaturalSizeRef.current;
          enlargedOverlay.style.left = `${frameR.left - mainR.left + (frameR.width - w) / 2}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top + (frameR.height - h) / 2}px`;
          enlargedOverlay.style.width = `${w}px`;
          enlargedOverlay.style.height = `${h}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    minRadius,
    maxRadius,
    cols,
    tileAspect,
    tileGapFactor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
    bgColor,
  ]);

  useEffect(() => {
    applyCylinderTransform(rotYRef.current);
  }, []);

  // ── Inertia ──────────────────────────────────────────────────────────
  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);

      const step = () => {
        vX *= frictionMul;
        if (Math.abs(vX) < stopThreshold || ++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextY = wrapAngleSigned(rotYRef.current + vX / 200);
        rotYRef.current = nextY;
        applyCylinderTransform(nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, stopInertia]
  );

  // ── Drag ─────────────────────────────────────────────────────────────
  useGesture(
    {
      onDragStart: ({ event }: any) => {
        if (focusedElRef.current) return;
        stopInertia();
        draggingRef.current = true;
        movedRef.current = false;
        startRotYRef.current = rotYRef.current;
        startPosXRef.current = event.clientX;
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }: any) => {
        if (focusedElRef.current || !draggingRef.current || startPosXRef.current == null) return;
        const dxTotal = event.clientX - startPosXRef.current;

        if (!movedRef.current && dxTotal * dxTotal > 16) movedRef.current = true;

        const nextY = wrapAngleSigned(startRotYRef.current + dxTotal / dragSensitivity);
        if (rotYRef.current !== nextY) {
          rotYRef.current = nextY;
          applyCylinderTransform(nextY);
        }

        if (last) {
          draggingRef.current = false;
          let [vMagX] = velocity as [number, number];
          const [dirX] = direction as [number, number];
          let vx = vMagX * dirX;
          if (Math.abs(vx) < 0.001 && Array.isArray(movement)) {
            const [mx] = movement as [number, number];
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005) startInertia(vx);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  // ── Close / scrim ────────────────────────────────────────────────────
  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const overlay = viewerRef.current?.querySelector(".cw-enlarge") as HTMLElement | null;
      if (!overlay) return;
      const originalPos = originalTilePositionRef.current;

      if (!originalPos) {
        overlay.remove();
        el.style.visibility = "";
        el.style.zIndex = "0";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        unlockScroll();
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current?.getBoundingClientRect();
      if (!rootRect) return;

      const origRel = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };
      const overlayRel = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };

      const animDiv = document.createElement("div");
      animDiv.className = "cw-enlarge-closing";
      animDiv.style.cssText = `position:absolute;left:${overlayRel.left}px;top:${overlayRel.top}px;width:${overlayRel.width}px;height:${overlayRel.height}px;z-index:9999;border-radius:var(--cw-enlarge-radius,26px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;`;

      const origImg = overlay.querySelector("img");
      if (origImg) {
        const img = origImg.cloneNode() as HTMLImageElement;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;";
        animDiv.appendChild(img);
      }

      overlay.remove();
      rootRef.current?.appendChild(animDiv);
      void animDiv.getBoundingClientRect();

      requestAnimationFrame(() => {
        animDiv.style.left = `${origRel.left}px`;
        animDiv.style.top = `${origRel.top}px`;
        animDiv.style.width = `${origRel.width}px`;
        animDiv.style.height = `${origRel.height}px`;
        animDiv.style.opacity = "0";
      });

      const cleanup = () => {
        animDiv.remove();
        originalTilePositionRef.current = null;
        openedNaturalSizeRef.current = null;
        el.style.visibility = "";
        el.style.opacity = "0";
        el.style.zIndex = "0";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        requestAnimationFrame(() => {
          el.style.transition = "opacity 300ms ease-out";
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            setTimeout(() => {
              el.style.transition = "";
              el.style.opacity = "";
              openingRef.current = false;
              if (!draggingRef.current && rootRef.current?.getAttribute("data-enlarging") !== "true") {
                document.body.classList.remove("cw-scroll-lock");
              }
            }, 300);
          });
        });
      };
      animDiv.addEventListener("transitionend", cleanup, { once: true });
    };

    scrim.addEventListener("click", close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  // ── Open tile ────────────────────────────────────────────────────────
  const openItem = useCallback(
    (el: HTMLElement) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();

      focusedElRef.current = el;
      el.style.visibility = "hidden";
      el.style.zIndex = "0";

      const tileR = el.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        el.style.visibility = "";
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      };

      const tileImages = Array.from(mainRef.current?.querySelectorAll(".cw-tile__image") ?? []);
      currentOpenIndexRef.current = tileImages.indexOf(el);

      const overlay = document.createElement("div");
      overlay.className = "cw-enlarge";
      overlay.style.cssText = `position:absolute;left:${frameR.left - mainR.left}px;top:${frameR.top - mainR.top}px;width:${frameR.width}px;height:${frameR.height}px;opacity:0;z-index:30;will-change:transform,opacity;transform-origin:top left;transition:transform ${enlargeTransitionMs}ms ease,opacity ${enlargeTransitionMs}ms ease;`;

      const rawSrc = (el.querySelector("img") as HTMLImageElement | null)?.src || "";
      const img = document.createElement("img");
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current?.appendChild(overlay);

      const sx0 = tileR.width / frameR.width || 1;
      const sy0 = tileR.height / frameR.height || 1;
      overlay.style.transform = `translate(${tileR.left - frameR.left}px, ${tileR.top - frameR.top}px) scale(${sx0}, ${sy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
        rootRef.current?.setAttribute("data-enlarging", "true");
      }, 16);

      // Determine the final display size: explicit props → natural image size → frame size
      const tileImg = el.querySelector("img") as HTMLImageElement | null;
      const natW = tileImg?.naturalWidth ?? 0;
      const natH = tileImg?.naturalHeight ?? 0;

      let finalW: number;
      let finalH: number;

      if (openedImageWidth || openedImageHeight) {
        // Use explicit CSS string sizes via a temp element measurement
        const tmp = document.createElement("div");
        tmp.style.cssText = `position:absolute;width:${openedImageWidth || `${frameR.width}px`};height:${openedImageHeight || `${frameR.height}px`};visibility:hidden;`;
        document.body.appendChild(tmp);
        const r = tmp.getBoundingClientRect();
        document.body.removeChild(tmp);
        finalW = r.width;
        finalH = r.height;
      } else if (natW > 0 && natH > 0) {
        const maxW = window.innerWidth - 56;
        const maxH = window.innerHeight - 80;
        const scale = Math.min(maxW / natW, maxH / natH, 1);
        finalW = Math.round(natW * scale);
        finalH = Math.round(natH * scale);
      } else {
        finalW = frameR.width;
        finalH = frameR.height;
      }

      openedNaturalSizeRef.current = { w: finalW, h: finalH };

      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTrans = overlay.style.transition;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease,top ${enlargeTransitionMs}ms ease,width ${enlargeTransitionMs}ms ease,height ${enlargeTransitionMs}ms ease`;
        requestAnimationFrame(() => {
          overlay.style.left = `${frameR.left - mainR.left + (frameR.width - finalW) / 2}px`;
          overlay.style.top = `${frameR.top - mainR.top + (frameR.height - finalH) / 2}px`;
          overlay.style.width = `${finalW}px`;
          overlay.style.height = `${finalH}px`;
        });
        overlay.addEventListener("transitionend", () => { overlay.style.transition = prevTrans; }, { once: true });
      };
      overlay.addEventListener("transitionend", onFirstEnd);
    },
    [enlargeTransitionMs, lockScroll, openedImageWidth, openedImageHeight, unlockScroll]
  );

  // ── Navigate between images while overlay is open ───────────────────
  const navigateOpen = useCallback(
    (dir: 1 | -1) => {
      const currentEl = focusedElRef.current;
      if (!currentEl || currentOpenIndexRef.current < 0) return;

      const tileImages = Array.from(
        mainRef.current?.querySelectorAll(".cw-tile__image") ?? []
      ) as HTMLElement[];
      if (tileImages.length <= 1) return;

      const currentSrc = (currentEl.querySelector("img") as HTMLImageElement | null)?.src ?? "";
      let nextIdx = currentOpenIndexRef.current;
      for (let step = 1; step <= tileImages.length; step++) {
        const candidate = ((currentOpenIndexRef.current + dir * step) + tileImages.length) % tileImages.length;
        const src = (tileImages[candidate].querySelector("img") as HTMLImageElement | null)?.src ?? "";
        if (src && src !== currentSrc) { nextIdx = candidate; break; }
      }
      if (nextIdx === currentOpenIndexRef.current) return;

      const nextEl = tileImages[nextIdx];
      const overlay = viewerRef.current?.querySelector(".cw-enlarge") as HTMLElement | null;
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();
      if (!overlay || !mainR || !frameR) return;

      // Swap tile visibility
      currentEl.style.visibility = "";
      focusedElRef.current = nextEl;
      currentOpenIndexRef.current = nextIdx;
      nextEl.style.visibility = "hidden";
      const nextR = nextEl.getBoundingClientRect();
      originalTilePositionRef.current = { left: nextR.left, top: nextR.top, width: nextR.width, height: nextR.height };

      // Compute natural size for new image
      const nextImg = nextEl.querySelector("img") as HTMLImageElement | null;
      const rawSrc = nextImg?.src ?? "";
      const natW = nextImg?.naturalWidth ?? 0;
      const natH = nextImg?.naturalHeight ?? 0;
      let finalW: number, finalH: number;
      if (natW > 0 && natH > 0) {
        const s = Math.min((window.innerWidth - 56) / natW, (window.innerHeight - 80) / natH, 1);
        finalW = Math.round(natW * s);
        finalH = Math.round(natH * s);
      } else {
        finalW = frameR.width; finalH = frameR.height;
      }
      openedNaturalSizeRef.current = { w: finalW, h: finalH };

      // Cross-fade image
      const overlayImg = overlay.querySelector("img") as HTMLImageElement | null;
      if (overlayImg) {
        overlayImg.style.transition = "opacity 150ms ease";
        overlayImg.style.opacity = "0";
        setTimeout(() => { overlayImg.src = rawSrc; overlayImg.style.opacity = "1"; }, 150);
      }

      // Animate overlay to new size
      overlay.style.transition = `left 280ms ease, top 280ms ease, width 280ms ease, height 280ms ease`;
      requestAnimationFrame(() => {
        overlay.style.left = `${frameR.left - mainR.left + (frameR.width - finalW) / 2}px`;
        overlay.style.top  = `${frameR.top  - mainR.top  + (frameR.height - finalH) / 2}px`;
        overlay.style.width  = `${finalW}px`;
        overlay.style.height = `${finalH}px`;
      });
      overlay.addEventListener("transitionend", () => {
        overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      }, { once: true });
    },
    [enlargeTransitionMs]
  );

  // Keyboard: ESC already in scrim effect; add ← → here
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!focusedElRef.current) return;
      if (e.key === "ArrowLeft")  navigateOpen(-1);
      if (e.key === "ArrowRight") navigateOpen(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateOpen]);

  const onTileClick = useCallback(
    (e: { currentTarget: HTMLElement }) => {
      if (draggingRef.current || movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItem(e.currentTarget);
    },
    [openItem]
  );

  const onTilePointerUp = useCallback(
    (e: { currentTarget: HTMLElement; pointerType?: string }) => {
      if (e.pointerType !== "touch") return;
      if (draggingRef.current || movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItem(e.currentTarget);
    },
    [openItem]
  );

  const onTileKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (openingRef.current) return;
      openItem(e.currentTarget);
    },
    [openItem]
  );

  // ── Auto-rotate ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoRotate) return;

    const step = (t: number) => {
      const busy = draggingRef.current || !!focusedElRef.current || !!inertiaRAF.current;
      if (!busy) {
        if (autoRotateLastTime.current !== null) {
          const dt = t - autoRotateLastTime.current;
          const nextY = wrapAngleSigned(rotYRef.current + (autoRotateSpeed * dt) / 1000);
          rotYRef.current = nextY;
          applyCylinderTransform(nextY);
        }
        autoRotateLastTime.current = t;
      } else {
        autoRotateLastTime.current = null;
      }
      autoRotateRAF.current = requestAnimationFrame(step);
    };

    autoRotateRAF.current = requestAnimationFrame(step);
    return () => {
      if (autoRotateRAF.current) cancelAnimationFrame(autoRotateRAF.current);
    };
  }, [autoRotate, autoRotateSpeed]);

  useEffect(() => () => { document.body.classList.remove("cw-scroll-lock"); }, []);

  const rootStyle = useMemo(
    () =>
      ({
        ["--cw-cols" as any]: String(cols),
        ["--cw-rows" as any]: String(rows),
        ["--cw-tile-radius" as any]: imageBorderRadius,
        ["--cw-enlarge-radius" as any]: openedImageBorderRadius,
        ["--cw-image-filter" as any]: grayscale ? "grayscale(1)" : "none",
        ["--cw-bg" as any]: bgColor,
      }) satisfies CSSProperties,
    [cols, rows, grayscale, imageBorderRadius, openedImageBorderRadius, bgColor]
  );

  return (
    <div ref={rootRef} className="cw-root" style={rootStyle}>
      <main ref={mainRef} className="cw-main">
        <div className="cw-stage">
          <div ref={cylinderRef} className="cw-cylinder">
            {items.map((item, i) => {
              const colAngle = item.col * (360 / cols);
              const rowYFactor = item.row - (rows - 1) / 2;
              return (
                <div
                  key={`${item.col},${item.row},${i}`}
                  className="cw-tile"
                  style={
                    {
                      ["--cw-col-angle" as any]: `${colAngle}deg`,
                      ["--cw-row-y" as any]: `calc(${rowYFactor} * var(--cw-tile-step-y))`,
                    } satisfies CSSProperties
                  }
                >
                  <div
                    className="cw-tile__image"
                    role="button"
                    tabIndex={0}
                    aria-label={item.alt || "Open image"}
                    onClick={onTileClick as any}
                    onPointerUp={onTilePointerUp as any}
                    onKeyDown={onTileKeyDown}
                  >
                    <img
                      src={item.src}
                      draggable={false}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {children ? <div className="cw-ui">{children}</div> : null}

        <div className="cw-viewer" ref={viewerRef}>
          <div ref={scrimRef} className="cw-scrim" />
          <div ref={frameRef} className="cw-frame" />
          <button
            type="button"
            aria-label="Previous image"
            className="cw-nav cw-nav--prev"
            onClick={(e) => { e.stopPropagation(); navigateOpen(-1); }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="cw-nav cw-nav--next"
            onClick={(e) => { e.stopPropagation(); navigateOpen(1); }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
