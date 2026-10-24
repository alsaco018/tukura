import { useEffect, useState } from "react";
import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";

type SpaceGalleryProps = {
  images: readonly string[];
};

type GallerySize = {
  cardWidth: number;
  cardHeight: number;
  heightClass: string;
  depth: number;
  spread: number;
};

const MOBILE_SIZE: GallerySize = {
  cardWidth: 460,
  cardHeight: 340,
  heightClass: "h-[320px]",
  depth: 160,
  spread: 56,
};

const DESKTOP_SIZE: GallerySize = {
  cardWidth: 640,
  cardHeight: 470,
  heightClass: "h-[320px] md:h-[520px]",
  depth: 200,
  spread: 72,
};

export const SpaceGallery = ({ images }: SpaceGalleryProps) => {
  const [size, setSize] = useState<GallerySize>(MOBILE_SIZE);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setSize(media.matches ? DESKTOP_SIZE : MOBILE_SIZE);
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const items = images.map((image, index) => ({
    image,
    alt: `Sala de masajes TUKURA en Jerez de la Frontera (${index + 1})`,
  }));

  return (
    <div className={`w-full ${size.heightClass}`}>
      <DepthCarousel
        items={items}
        cardWidth={size.cardWidth}
        cardHeight={size.cardHeight}
        radius={CARD_RADIUS}
        tint="#4d3114"
        depth={size.depth}
        spread={size.spread}
        visibleCards={3}
        autoplay
        autoplayDelay={5000}
        loop
        showControls
        showIndicators
        ariaLabel="Galería del espacio"
        className="min-h-0"
      />
    </div>
  );
};
