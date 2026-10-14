import ScrollExpand from "./ScrollExpand";
import ScrollReveal from "./ScrollReveal";

type ServiceScrollExpandProps = {
  image: string;
  kicker: string;
  title: string;
  lead?: string;
};

const ServiceScrollExpand = ({
  image,
  kicker,
  title,
  lead,
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
    {lead ? (
      <ScrollReveal
        as="p"
        text={lead}
        containerClassName="mt-4 max-w-md"
        textClassName="font-sans text-xl font-semibold leading-7 text-theme-white"
      />
    ) : null}
  </ScrollExpand>
);

export default ServiceScrollExpand;
