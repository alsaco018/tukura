import { useEffect, useState } from "react";
import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";

export type SpaceGalleryImage = {
  src: string;
  alt: string;
};

type SpaceGalleryProps = {
  images: readonly SpaceGalleryImage[];
};

type GallerySize = {
  cardWidth: number;
  cardHeight: number;
  heightClass: string;
  depth: number;
  spread: number;
};

const MOBILE_SIZE: GallerySize = {
  cardWidth: 420,
  cardHeight: 300,
  heightClass: "h-[300px]",
  depth: 160,
  spread: 56,
};

const DESKTOP_SIZE: GallerySize = {
  cardWidth: 600,
  cardHeight: 440,
  heightClass: "h-[300px] md:h-[480px]",
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

  const items = images.map(({ src, alt }) => ({
    image: src,
    alt,
  }));

  return (
    <div className="w-full overflow-visible px-2 py-6 sm:px-3 sm:py-8">
      <div className={`w-full overflow-visible ${size.heightClass}`}>
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
          ariaLabel="Galería del espacio de masajes TUKURA en Jerez de la Frontera"
          className="min-h-0"
        />
      </div>
    </div>
  );
};
