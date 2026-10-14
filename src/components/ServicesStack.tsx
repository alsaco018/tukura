import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import type { Service } from "../data/services";

type ServicesStackProps = {
  services: readonly Service[];
};

const ServiceBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-lighter px-4 py-1 text-[14px] font-medium leading-5 tracking-[1px] text-theme-black">
    {label}
  </span>
);

export const ServicesStack = ({ services }: ServicesStackProps) => (
  <ScrollStack
    useWindowScroll
    smoothScroll={false}
    itemDistance={72}
    itemStackDistance={18}
    stackPosition="16%"
    itemScale={0.04}
    baseScale={0.9}
    dimAmount={0.12}
    holdDistance={160}
    className="mx-auto w-full"
  >
    {services.map((service) => {
      const href = `/masajes/${service.id}`;

      return (
        <ScrollStackItem
          key={service.id}
          itemClassName="rounded-bl-[40px] rounded-tr-[40px] bg-theme-white"
        >
          <a
            href={href}
            className="group flex w-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Ver detalle de ${service.title}`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
              <img
                src={service.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                width={720}
                height={405}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 text-left text-theme-black">
                <p className="kicker">{service.kicker}</p>
                <h3 className="text-2xl font-semibold leading-8 sm:text-[28px] sm:leading-9">
                  {service.title}
                </h3>
                <p className="text-base font-normal leading-6">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ServiceBadge label={service.price} />
                <ServiceBadge label={service.duration} />
              </div>
            </div>
          </a>
        </ScrollStackItem>
      );
    })}
  </ScrollStack>
);
