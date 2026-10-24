"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookingForm } from "./BookingForm";
import {
  GiftCardBack,
  GiftTriptych,
  type GiftFoldState,
} from "./GiftTriptych";
import { TiltedCard } from "./TiltedCard";

type GiftCardExperienceProps = {
  /** Optional server-resolved name; client URL param still wins when present. */
  initialName?: string;
};

const FALLBACK_TITLE = "Un regalo para ti, disfrútalo";

const readNameFromLocation = (): string => {
  if (typeof window === "undefined") return "";
  try {
    const raw = new URL(window.location.href).searchParams.get("name");
    if (!raw) return "";
    return raw.trim();
  } catch {
    return "";
  }
};

const buildTitle = (name: string): string => {
  const cleaned = name.replace(/\s+/g, " ").trim();
  if (!cleaned) return FALLBACK_TITLE;
  return `Para ${cleaned}, disfrútalo`;
};

export const GiftCardExperience = ({
  initialName = "",
}: GiftCardExperienceProps) => {
  const [name, setName] = useState(() => {
    const fromUrl = readNameFromLocation();
    return fromUrl || initialName.trim();
  });
  const [foldState, setFoldState] = useState<GiftFoldState>("closed");
  const [flipped, setFlipped] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncName = () => {
      const fromUrl = readNameFromLocation();
      setName(fromUrl || initialName.trim());
    };
    syncName();
    window.addEventListener("popstate", syncName);
    return () => window.removeEventListener("popstate", syncName);
  }, [initialName]);

  const title = useMemo(() => buildTitle(name), [name]);
  const isFoldAnimating =
    foldState === "opening" || foldState === "closing";
  const isOpenView = foldState !== "closed";
  const canFlip = foldState === "closed" && !isFoldAnimating;

  const centerOpenScroll = useCallback((behavior: ScrollBehavior = "smooth") => {
    const panel = centerPanelRef.current;
    const scroller = scrollRef.current;
    if (!panel || !scroller) return;

    const panelRect = panel.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const panelCenter =
      panelRect.left + panelRect.width / 2 - scrollerRect.left + scroller.scrollLeft;
    const nextLeft = Math.max(0, panelCenter - scroller.clientWidth / 2);
    scroller.scrollTo({ left: nextLeft, behavior });
  }, []);

  useEffect(() => {
    if (foldState !== "opening" && foldState !== "open") return;

    let raf = 0;
    let running = true;
    const startedAt = performance.now();
    // Follow the zoom growth without discrete jumps.
    const tick = () => {
      if (!running) return;
      centerOpenScroll("auto");
      if (performance.now() - startedAt < 1700) {
        raf = window.requestAnimationFrame(tick);
      } else {
        centerOpenScroll("smooth");
      }
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };
  }, [foldState, centerOpenScroll]);

  const handleFoldTransitionEnd = useCallback((next: "open" | "closed") => {
    setFoldState(next);
    if (next === "closed") setFlipped(false);
  }, []);

  const handleOpen = () => {
    if (foldState !== "closed" || isFoldAnimating) return;
    setFlipped(false);
    setFoldState("opening");
  };

  const handleFlip = (next: boolean) => {
    if (!canFlip) return;
    setFlipped(next);
  };

  const showOpenButton = foldState === "closed";

  return (
    <div className="flex w-full flex-col items-center gap-10 pb-10 pt-28 md:pb-14 md:pt-32">
      <header className="mx-auto flex w-full max-w-lg flex-col items-center gap-3 px-5 text-center md:max-w-2xl">
        <p className="kicker text-theme-black">Tarjeta regalo</p>
        <h1 className="font-display text-3xl font-normal leading-tight text-theme-black sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="max-w-md text-base leading-6 text-theme-black/75">
          Pulsa para girar la tarjeta y ver el otro lado. Pulsa el botón de
          Abrir para desplegar el tríptico.
        </p>
      </header>

      {/* True full-width stage (sibling of the narrow column, not breakout math) */}
      <div
        ref={scrollRef}
        className={[
          "w-full max-w-[100vw] py-6",
          isOpenView
            ? [
                "overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
                "snap-x snap-mandatory",
              ].join(" ")
            : "flex justify-center overflow-x-visible px-5",
        ].join(" ")}
        aria-label={
          isOpenView
            ? "Tarjeta regalo abierta. Desplaza horizontalmente para ver todo el tríptico."
            : undefined
        }
      >
        <div
          className={
            isOpenView
              ? "w-max min-w-full pb-2"
              : "flex w-full max-w-lg justify-center md:max-w-2xl"
          }
        >
          <TiltedCard
            captionText={foldState === "closed" ? "Dar la vuelta" : ""}
            showTooltip={foldState === "closed"}
            flipOnClick={foldState === "closed"}
            flipped={flipped}
            onFlip={handleFlip}
            backContent={foldState === "closed" ? <GiftCardBack /> : null}
            rotateAmplitude={isOpenView ? 0 : 22}
            smoothness={0.8}
            axis="horizontal"
            trackWindow={false}
            floating={!isOpenView}
            intro={false}
            scaleOnHover={foldState === "closed" ? 1.04 : 1}
            glare={foldState === "closed" ? 0.4 : 0.15}
            shadow={foldState === "closed" ? 0.5 : 0.3}
            radius={4}
            perspective={900}
            containerWidth="auto"
            containerHeight="auto"
            imageWidth="auto"
            imageHeight="auto"
            disabled={isFoldAnimating || isOpenView}
            ariaLabel={
              foldState === "closed"
                ? flipped
                  ? "Reverso de la tarjeta regalo. Pulsa para dar la vuelta."
                  : "Anverso de la tarjeta regalo. Pulsa para dar la vuelta."
                : "Tríptico de la tarjeta regalo abierto"
            }
          >
            <GiftTriptych
              foldState={foldState}
              onFoldTransitionEnd={handleFoldTransitionEnd}
              centerPanelRef={centerPanelRef}
            />
          </TiltedCard>
        </div>
      </div>

      {showOpenButton ? (
        <button
          type="button"
          className={[
            "inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-accent px-10 py-2.5",
            "text-base font-semibold leading-6 text-theme-white transition-colors",
            "hover:bg-accent-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            "disabled:cursor-not-allowed disabled:opacity-60",
          ].join(" ")}
          aria-label="Abrir la tarjeta regalo"
          aria-busy={isFoldAnimating}
          disabled={isFoldAnimating}
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleOpen();
            }
          }}
        >
          Abrir
        </button>
      ) : null}

      <section
        className="mx-auto w-full max-w-lg border-t border-accent-2/25 px-5 pt-10 md:max-w-2xl"
        aria-labelledby="gift-booking-title"
      >
        <div className="mb-6 flex flex-col gap-2 text-center">
          <p className="kicker text-theme-black">Reservar</p>
          <h2
            id="gift-booking-title"
            className="text-2xl font-semibold leading-8 text-theme-black md:text-3xl"
          >
            Has recibido una tarjeta regalo
          </h2>
          <p className="text-base leading-6 text-theme-black/75">
            Rellena el formulario para ponerte en contacto y agendar tu cita
          </p>
        </div>
        <BookingForm preselectedServiceId="tarjeta-regalo" />
      </section>
    </div>
  );
};

export default GiftCardExperience;
