import { useState } from "react";
import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";

type GiftSlide = {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
};

type GiftSliderProps = {
  slides: readonly GiftSlide[];
  ctaHref: string;
};

export const GiftSlider = ({ slides, ctaHref }: GiftSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex] ?? slides[0];
  const isExternal = ctaHref.startsWith("http");

  if (!slide) {
    return null;
  }

  const items = slides.map((item) => ({
    image: item.image,
    alt: item.title,
  }));

  return (
    <div className="flex w-full flex-col gap-6">
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
          autoplay
          autoplayDelay={5000}
          loop
          showControls
          showIndicators
          ariaLabel="Tarjetas regalo"
          className="min-h-0"
          onChange={(index) => setActiveIndex(index)}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col gap-4 text-theme-white">
          <p className="kicker">{slide.kicker}</p>
          <h3 className="text-2xl font-semibold leading-8">{slide.title}</h3>
          <p className="text-base font-normal leading-6">{slide.description}</p>
        </div>

        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-theme-white px-8 py-2 text-base font-semibold leading-6 text-theme-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-white"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {slide.ctaLabel}
        </a>
      </div>
    </div>
  );
};
