import ScrollExpand from "./ScrollExpand";
import ScrollReveal from "./ScrollReveal";

type ServiceScrollExpandProps = {
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  title: string;
};

const ServiceScrollExpand = ({
  image,
  imageAlt,
  imagePosition,
  title,
}: ServiceScrollExpandProps) => (
  <ScrollExpand
    src={image}
    alt={imageAlt ?? title}
    mediaType="image"
    objectPositionClassName={imagePosition}
    useWindowScroll
    startWidth={48}
    startHeight={62}
    startRadius={40}
    scrollDistance={1.1}
    holdDistance={0.25}
    overlayScrim={0}
    className="min-h-dvh"
  >
    <ScrollReveal
      as="h1"
      text={title}
      textClassName="max-w-lg font-display text-[44px] font-normal leading-[1.15] text-theme-white [font-family:var(--font-display)] md:text-6xl"
    />
  </ScrollExpand>
);

export default ServiceScrollExpand;
