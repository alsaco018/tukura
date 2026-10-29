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
    <div className="w-full overflow-visible px-2 py-6 sm:px-3 sm:py-8">
      <div className="h-[320px] w-full overflow-visible sm:h-[380px]">
        <DepthCarousel
          items={items}
          cardWidth={440}
          cardHeight={320}
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
    </div>
  );
};
