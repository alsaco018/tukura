"use client";

/**
 * Gift-card faces from Illustrator SVGs in /public/images/gift-card/.
 * Exterior panels stay as <img> (art-only). Interior is inlined so page
 * @font-face (TAN Paradiso / Poppins) applies to SVG <text>.
 */

import { useId, useMemo, type CSSProperties } from "react";
import interiorSvgRaw from "../../public/images/gift-card/interior.svg?raw";

/** Same stock as the SVG paper fill (#fbf4ee). */
export const GIFT_PAPER = "#fbf4ee";

const PANEL_SIZE = 413.24;
const PANEL_Y = 13.63;

const PANEL_X = {
  left: 17.94,
  center: 431.18,
  right: 844.41,
} as const;

const ASSETS = {
  exterior: {
    href: "/images/gift-card/exterior.svg",
    width: 1275.59,
    height: 439.98,
  },
  interior: {
    href: "/images/gift-card/interior.svg",
    width: 1275.59,
    height: 439.52,
  },
} as const;

type Face = keyof typeof ASSETS;
type Panel = keyof typeof PANEL_X;

type GiftSvgPanelProps = {
  face: Face;
  panel: Panel;
  alt?: string;
  shadow?: boolean;
  /** Solid paper under the art (center only — flaps keep die-cut holes). */
  fillPaper?: boolean;
  className?: string;
};

const cropStyle = (
  width: number,
  height: number,
  panelX: number,
): CSSProperties => {
  const scale = 100 / PANEL_SIZE;
  return {
    width: `${width * scale}%`,
    height: `${height * scale}%`,
    left: `${-panelX * scale}%`,
    top: `${-PANEL_Y * scale}%`,
  };
};

/** Make clipPath / root ids unique when the same SVG is mounted 3×. */
const uniquifyInteriorSvg = (raw: string, uid: string): string => {
  const id = uid.replace(/:/g, "");
  return raw
    .replace(/<\?xml[\s\S]*?\?>/i, "")
    .replace(/\sxmlns:xlink="[^"]*"/, "")
    .replace(/id="Capa_1"/g, `id="gift-interior-${id}"`)
    .replace(/id="clippath"/g, `id="gift-clip-${id}"`)
    .replace(/url\(#clippath\)/g, `url(#gift-clip-${id})`);
};

export const GiftSvgPanel = ({
  face,
  panel,
  alt = "",
  shadow = true,
  fillPaper = false,
  className = "",
}: GiftSvgPanelProps) => {
  const asset = ASSETS[face];
  const x = PANEL_X[panel];
  const uid = useId();
  const interiorMarkup = useMemo(() => {
    if (face !== "interior") return null;
    return uniquifyInteriorSvg(interiorSvgRaw, uid);
  }, [face, uid]);

  return (
    <div
      className={["relative h-full w-full", className].filter(Boolean).join(" ")}
      style={
        shadow
          ? { filter: "drop-shadow(0 14px 28px rgba(77, 49, 20, 0.28))" }
          : undefined
      }
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={fillPaper ? { backgroundColor: GIFT_PAPER } : undefined}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        {face === "interior" && interiorMarkup ? (
          <div
            className="pointer-events-none absolute max-w-none select-none [&_svg]:h-full [&_svg]:w-full"
            style={cropStyle(asset.width, asset.height, x)}
            // Inline SVG so TAN Paradiso / Poppins from the document apply.
            dangerouslySetInnerHTML={{ __html: interiorMarkup }}
            aria-hidden
          />
        ) : (
          <img
            src={asset.href}
            alt={alt}
            draggable={false}
            className="pointer-events-none absolute max-w-none select-none"
            style={cropStyle(asset.width, asset.height, x)}
            aria-hidden={alt ? undefined : true}
          />
        )}
      </div>
    </div>
  );
};

export const ExteriorLeft = () => (
  <GiftSvgPanel face="exterior" panel="left" />
);

export const ExteriorCenter = ({ large: _large = false }: { large?: boolean }) => (
  <GiftSvgPanel
    face="exterior"
    panel="center"
    fillPaper
    alt="Reverso de la tarjeta regalo TUKURA"
  />
);

export const ExteriorRight = () => (
  <GiftSvgPanel face="exterior" panel="right" />
);

export const InteriorLeft = () => (
  <GiftSvgPanel
    face="interior"
    panel="left"
    shadow={false}
    alt="Interior izquierdo de la tarjeta regalo"
  />
);

export const InteriorCenter = () => (
  <GiftSvgPanel
    face="interior"
    panel="center"
    fillPaper
    shadow={false}
    alt="Mensaje interior de la tarjeta regalo"
  />
);

export const InteriorRight = () => (
  <GiftSvgPanel
    face="interior"
    panel="right"
    shadow={false}
    alt="Interior derecho de la tarjeta regalo"
  />
);
