import { faqItems } from "../data/faq";
import type { Service } from "../data/services";
import { site } from "../data/site";

export const absoluteUrl = (path = "/"): string => {
  if (path === "/" || path === "") {
    return `${site.url}/`;
  }

  const withSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withSlash.endsWith("/") ? withSlash : `${withSlash}/`;

  // Keep asset paths (images, icons) without forcing a trailing slash.
  if (/\.[a-z0-9]+$/i.test(withSlash)) {
    return new URL(withSlash, site.url).toString();
  }

  return new URL(normalized, site.url).toString();
};

export const buildLocalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "MassageTherapy",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: "TUKURA Masajes",
  description: site.seo.defaultDescription,
  url: site.url,
  telephone: site.contact.phoneHref.replace("tel:", ""),
  email: site.contact.email,
  image: absoluteUrl(site.seo.ogImage),
  logo: absoluteUrl("/icons/logo.svg"),
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Madre de Dios, 7, Centro Apófisis",
    addressLocality: "Jerez de la Frontera",
    addressRegion: "Cádiz",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.seo.geo.latitude,
    longitude: site.seo.geo.longitude,
  },
  areaServed: {
    "@type": "City",
    name: "Jerez de la Frontera",
  },
  sameAs: [site.contact.instagram.href],
});

export const buildFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildServiceJsonLd = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.description,
  provider: {
    "@type": "MassageTherapy",
    name: site.name,
    url: site.url,
  },
  areaServed: {
    "@type": "City",
    name: "Jerez de la Frontera",
  },
  offers: {
    "@type": "Offer",
    price: service.price.replace("€", "").trim(),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(`/masajes/${service.id}`),
  },
  image: absoluteUrl(service.image),
});

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.seo.defaultDescription,
  inLanguage: "es-ES",
  publisher: {
    "@id": `${site.url}/#business`,
  },
});
