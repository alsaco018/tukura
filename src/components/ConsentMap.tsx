import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { MAPS_CONSENT_EVENT } from "./CookieConsentInit";

type ConsentMapProps = {
  embedUrl: string;
  address: string;
  mapUrl: string;
};

export const ConsentMap = ({ embedUrl, address, mapUrl }: ConsentMapProps) => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAllowed(CookieConsent.acceptedService("googlemaps", "functional"));
    };

    sync();

    const handleConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ accepted: boolean }>).detail;
      setAllowed(Boolean(detail?.accepted));
    };

    window.addEventListener(MAPS_CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(MAPS_CONSENT_EVENT, handleConsent);
  }, []);

  const handleEnableMaps = () => {
    CookieConsent.acceptService("googlemaps", "functional");
    setAllowed(true);
  };

  const handleOpenPreferences = () => {
    CookieConsent.showPreferences();
  };

  if (allowed) {
    return (
      <iframe
        title={`Mapa de ubicación: ${address}`}
        src={embedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-brand-medium px-6 text-center text-theme-black">
      <p className="max-w-sm text-sm leading-6">
        El mapa de Google Maps solo se carga si aceptas las cookies funcionales.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleEnableMaps}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-theme-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Cargar mapa
        </button>
        <button
          type="button"
          onClick={handleOpenPreferences}
          className="rounded-full border border-theme-black/20 bg-theme-white px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Preferencias
        </button>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
};
