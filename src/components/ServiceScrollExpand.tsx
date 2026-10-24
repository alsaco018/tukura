import ScrollExpand from "./ScrollExpand";
import ScrollReveal from "./ScrollReveal";

type ServiceScrollExpandProps = {
  image: string;
  kicker: string;
  title: string;
};

const ServiceScrollExpand = ({
  image,
  kicker,
  title,
}: ServiceScrollExpandProps) => (
  <ScrollExpand
    src={image}
    alt={title}
    title={kicker}
    mediaType="image"
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
