import DepthCarousel, { CARD_RADIUS } from "./DepthCarousel";
import type { Review } from "../data/reviews";

type ReviewsSliderProps = {
  reviews: readonly Review[];
};

const ReviewCard = ({ review }: { review: Review }) => (
  <article className="flex h-full flex-col gap-4 bg-theme-white p-6">
    <div
      className="flex items-center"
      aria-label={`${review.rating} de 5 estrellas`}
    >
      {Array.from({ length: review.rating }).map((_, index) => (
        <img
          key={`${review.id}-star-${index}`}
          src="/icons/star.svg"
          alt=""
          width={24}
          height={24}
          className="size-6"
          loading="lazy"
        />
      ))}
    </div>
    <div className="flex flex-col gap-2 text-base leading-6 text-theme-black">
      <p className="font-semibold">{review.name}</p>
      <p className="font-normal">{review.body}</p>
    </div>
  </article>
);

export const ReviewsSlider = ({ reviews }: ReviewsSliderProps) => {
  const items = reviews.map((review) => ({
    alt: `Reseña de ${review.name}`,
    content: <ReviewCard review={review} />,
  }));

  return (
    <div className="w-full overflow-visible px-2 py-6 sm:px-3 sm:py-8">
      <div className="h-[240px] w-full overflow-visible sm:h-[260px]">
        <DepthCarousel
          items={items}
          cardWidth={360}
          cardHeight={200}
          radius={CARD_RADIUS}
          depth={160}
          spread={56}
          visibleCards={3}
          blur={0}
          falloff={0.12}
          autoplay
          autoplayDelay={5000}
          loop
          showControls
          showIndicators
          ariaLabel="Reseñas de clientas"
          cardClassName="bg-theme-white shadow-[0_16px_32px_-18px_rgba(77,49,20,0.35)]"
          className="min-h-0"
        />
      </div>
    </div>
  );
};
