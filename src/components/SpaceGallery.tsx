import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";

type SpaceGalleryProps = {
  images: readonly string[];
};

export const SpaceGallery = ({ images }: SpaceGalleryProps) => {
  const items = images.map((image, index) => ({
    image,
    alt: `Espacio TUKURA ${index + 1}`,
  }));

  return (
    <div className="h-[320px] w-full sm:h-[400px]">
      <DepthCarousel
        items={items}
        cardWidth={460}
        cardHeight={340}
        radius={CARD_RADIUS}
        tint="#4d3114"
        depth={160}
        spread={56}
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
