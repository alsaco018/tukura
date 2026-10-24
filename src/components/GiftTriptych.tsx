"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import {
  ExteriorCenter,
  ExteriorLeft,
  ExteriorRight,
  GIFT_PAPER,
  GiftSvgPanel,
  InteriorCenter,
  InteriorLeft,
  InteriorRight,
} from "./GiftCardPanels";

export type GiftFoldState = "closed" | "opening" | "open" | "closing";

type GiftTriptychProps = {
  foldState: GiftFoldState;
  onFoldTransitionEnd?: (next: "open" | "closed") => void;
  /** Ref to the center panel — used to scroll it into the viewport middle. */
  centerPanelRef?: Ref<HTMLDivElement | null>;
  className?: string;
};

const OPEN_DURATION_MS = 1600;
const CLOSE_DURATION_MS = 1100;
/** Let flaps start unfolding before the size zoom kicks in. */
const ZOOM_DELAY_MS = 220;
const ZOOM_DURATION_MS = 1200;

const sizeClass =
  "h-[min(72vw,20rem)] w-[min(72vw,20rem)] sm:h-[22rem] sm:w-[22rem] md:h-[24rem] md:w-[24rem]";

/** Wide stage at closed panel size — flaps open first, then we zoom. */
const midStageClass =
  "h-[min(72vw,20rem)] w-[calc(3*min(72vw,20rem))] sm:h-[22rem] sm:w-[66rem] md:h-[24rem] md:w-[72rem]";

/**
 * Zoomed open panels: center copy fills most of the viewport on mobile;
 * side flaps stay reachable via horizontal scroll.
 */
const openPanelClass =
  "h-[min(100vw,30rem)] w-[min(100vw,30rem)] sm:h-[34rem] sm:w-[34rem] md:h-[38rem] md:w-[38rem]";

const openStageClass =
  "h-[min(100vw,30rem)] w-[calc(3*min(100vw,30rem))] sm:h-[34rem] sm:w-[102rem] md:h-[38rem] md:w-[114rem]";

const sizeTransitionClass =
  "transition-[width,height] duration-[var(--gift-zoom-duration)] ease-[var(--gift-zoom-ease)] motion-reduce:transition-none";

/**
 * Double-sided flap face. Both faces stay mounted; backface-visibility
 * picks the visible side during rotateY (no opacity swap mid-fold).
 */
const FlapFace = ({
  children,
  back = false,
}: {
  children: ReactNode;
  back?: boolean;
}) => (
  <div
    className={[
      "absolute inset-0 overflow-visible",
      "[backface-visibility:hidden]",
      back ? "[transform:rotateY(180deg)]" : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </div>
);

export const GiftTriptych = ({
  foldState,
  onFoldTransitionEnd,
  centerPanelRef,
  className = "",
}: GiftTriptychProps) => {
  const isAnimating = foldState === "opening" || foldState === "closing";
  const [flapsOpen, setFlapsOpen] = useState(foldState === "open");
  /** Size zoom runs after flaps begin — avoids an abrupt jump to full zoom. */
  const [sizeZoomed, setSizeZoomed] = useState(foldState === "open");

  useEffect(() => {
    if (foldState === "open") {
      setFlapsOpen(true);
      setSizeZoomed(true);
      return;
    }
    if (foldState === "closed") {
      setFlapsOpen(false);
      setSizeZoomed(false);
      return;
    }
    if (foldState === "closing") {
      // Defer one frame so the browser paints the open pose before closing.
      const id = window.requestAnimationFrame(() => setFlapsOpen(false));
      return () => window.cancelAnimationFrame(id);
    }
    if (foldState === "opening") {
      setFlapsOpen(false);
      setSizeZoomed(false);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setFlapsOpen(true);
        setSizeZoomed(true);
        return;
      }
      const flapId = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setFlapsOpen(true));
      });
      const zoomTimer = window.setTimeout(() => setSizeZoomed(true), ZOOM_DELAY_MS);
      return () => {
        window.cancelAnimationFrame(flapId);
        window.clearTimeout(zoomTimer);
      };
    }
  }, [foldState]);

  useEffect(() => {
    if (foldState !== "opening" && foldState !== "closing") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration =
      reduced
        ? 40
        : foldState === "opening"
          ? Math.max(OPEN_DURATION_MS, ZOOM_DELAY_MS + ZOOM_DURATION_MS)
          : CLOSE_DURATION_MS;
    const target = foldState === "opening" ? "open" : "closed";
    const timer = window.setTimeout(() => {
      onFoldTransitionEnd?.(target);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [foldState, onFoldTransitionEnd]);

  const flapDurationMs =
    foldState === "closing" ? CLOSE_DURATION_MS : OPEN_DURATION_MS;
  const isOpen = flapsOpen;
  /*
   * Keep the wide layout while flaps fold shut so width doesn't collapse
   * mid-rotate (that was the visible jump). Shrink only once fully closed.
   */
  const layoutExpanded =
    foldState === "opening" ||
    foldState === "open" ||
    foldState === "closing";
  const showZoomedSize =
    sizeZoomed || foldState === "open" || foldState === "closing";

  return (
    <div
      className={`gift-triptych relative mx-auto w-full ${className}`.trim()}
      data-fold={foldState}
      style={
        {
          "--gift-flap-duration": `${flapDurationMs}ms`,
          "--gift-zoom-duration": `${ZOOM_DURATION_MS}ms`,
          "--gift-ease":
            foldState === "closing"
              ? "cubic-bezier(0.33, 1, 0.68, 1)"
              : "cubic-bezier(0.22, 1, 0.36, 1)",
          /* Soft ease-out so the zoom decelerates into the final size */
          "--gift-zoom-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
        } as CSSProperties
      }
      aria-busy={isAnimating}
    >
      <div
        className={[
          "relative mx-auto overflow-visible",
          sizeTransitionClass,
          "[perspective:1600px]",
          !layoutExpanded
            ? sizeClass
            : showZoomedSize
              ? openStageClass
              : midStageClass,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={centerPanelRef}
          className={[
            "absolute top-0 left-1/2 -translate-x-1/2",
            sizeTransitionClass,
            !layoutExpanded
              ? sizeClass
              : showZoomedSize
                ? openPanelClass
                : sizeClass,
            "[transform-style:preserve-3d]",
            layoutExpanded ? "snap-center" : "",
            layoutExpanded
              ? ""
              : "overflow-hidden rounded-sm shadow-[0_16px_40px_-12px_rgba(77,49,20,0.35)]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className="absolute inset-0 z-[1] overflow-hidden rounded-sm"
            style={{ backgroundColor: GIFT_PAPER }}
          >
            <InteriorCenter />
          </div>

          <div
            className={[
              "gift-triptych__flap gift-triptych__flap--left absolute inset-y-0 left-0 z-[2] w-full",
              "origin-right [transform-style:preserve-3d]",
              "transition-transform duration-[var(--gift-flap-duration)] ease-[var(--gift-ease)]",
              "motion-reduce:transition-none",
              isOpen
                ? "[transform:translateX(-100%)_rotateY(0deg)]"
                : "[transform:translateX(-100%)_rotateY(180deg)]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <FlapFace>
              <InteriorLeft />
            </FlapFace>
            <FlapFace back>
              <ExteriorLeft />
            </FlapFace>
          </div>

          <div
            className={[
              "gift-triptych__flap gift-triptych__flap--right absolute inset-y-0 left-0 z-[2] w-full",
              "origin-left [transform-style:preserve-3d]",
              "transition-transform duration-[var(--gift-flap-duration)] ease-[var(--gift-ease)]",
              "motion-reduce:transition-none",
              isOpen
                ? "[transform:translateX(100%)_rotateY(0deg)]"
                : "[transform:translateX(100%)_rotateY(-180deg)]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <FlapFace>
              <InteriorRight />
            </FlapFace>
            <FlapFace back>
              <ExteriorRight />
            </FlapFace>
          </div>
        </div>
      </div>

      <style>{`
        .gift-triptych[data-fold="opening"] .gift-triptych__flap--left {
          transition-delay: 40ms;
        }
        .gift-triptych[data-fold="opening"] .gift-triptych__flap--right {
          transition-delay: 120ms;
        }
        /* Close: reverse of open — right returns first, then left */
        .gift-triptych[data-fold="closing"] .gift-triptych__flap--right {
          transition-delay: 40ms;
        }
        .gift-triptych[data-fold="closing"] .gift-triptych__flap--left {
          transition-delay: 120ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .gift-triptych__flap {
            transition: none !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Closed front = exterior flaps stacked (die-cuts meet as a full square).
 * Logo lives on the back of the center panel.
 */
export const GiftCardFront = () => (
  <div
    className={`relative ${sizeClass} overflow-hidden rounded-sm shadow-[0_16px_40px_-12px_rgba(77,49,20,0.35)]`}
  >
    <div className="absolute inset-0">
      <GiftSvgPanel face="exterior" panel="left" shadow={false} />
    </div>
    <div className="absolute inset-0">
      <GiftSvgPanel face="exterior" panel="right" shadow={false} />
    </div>
    <span className="sr-only">Anverso de la tarjeta regalo TUKURA</span>
  </div>
);

/** Closed back = exterior center (logo) from the SVG. */
export const GiftCardBack = () => (
  <div className="relative h-full w-full min-h-full min-w-full overflow-hidden">
    <ExteriorCenter />
    <span className="sr-only">Reverso de la tarjeta regalo TUKURA</span>
  </div>
);

export default GiftTriptych;
