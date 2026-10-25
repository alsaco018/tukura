import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";

type GiftSlide = {
  title: string;
  image: string;
  alt?: string;
};

type GiftSliderProps = {
  slides: readonly GiftSlide[];
};

export const GiftSlider = ({ slides }: GiftSliderProps) => {
  if (slides.length === 0) {
    return null;
  }

  const items = slides.map((item) => ({
    image: item.image,
    alt: item.alt ?? item.title,
  }));

  const hasMultipleSlides = slides.length > 1;

  return (
    <div className="h-[360px] w-full sm:h-[420px]">
      <DepthCarousel
        items={items}
        cardWidth={460}
        cardHeight={360}
        radius={CARD_RADIUS}
        tint="#4d3114"
        depth={160}
        spread={56}
        visibleCards={3}
        autoplay={hasMultipleSlides}
        autoplayDelay={5000}
        loop={hasMultipleSlides}
        showControls={hasMultipleSlides}
        showIndicators={hasMultipleSlides}
        controlsTone="accent-2"
        ariaLabel="Tarjetas regalo"
        className="min-h-0"
      />
    </div>
  );
};
