import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "../styles/cookieconsent-theme.css";
import { legalEntity } from "../data/legal";

const MAPS_CONSENT_EVENT = "tukura:maps-consent";

const dispatchMapsConsent = (accepted: boolean) => {
  window.dispatchEvent(
    new CustomEvent(MAPS_CONSENT_EVENT, { detail: { accepted } }),
  );
};

const CookieConsentInit = () => {
  useEffect(() => {
    void CookieConsent.run({
      mode: "opt-in",
      autoShow: true,
      hideFromBots: true,
      disablePageInteraction: false,
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "bottom left",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        functional: {
          enabled: false,
          readOnly: false,
          services: {
            googlemaps: {
              label: "Google Maps (mapa de ubicación)",
              onAccept: () => dispatchMapsConsent(true),
              onReject: () => dispatchMapsConsent(false),
            },
          },
        },
      },
      language: {
        default: "es",
        translations: {
          es: {
            consentModal: {
              title: "Tu privacidad en TUKURA",
              description:
                "Usamos cookies necesarias para el funcionamiento del sitio y, solo si lo aceptas, cookies funcionales (mapa de Google Maps). Puedes aceptar todas, rechazar las opcionales o configurar tu elección. Más detalle en nuestra Política de cookies (pie de página).",
              acceptAllBtn: "Aceptar todas",
              acceptNecessaryBtn: "Rechazarlas",
              showPreferencesBtn: "Configurar",
            },
            preferencesModal: {
              title: "Preferencias de cookies",
              acceptAllBtn: "Aceptar todas",
              acceptNecessaryBtn: "Solo necesarias",
              savePreferencesBtn: "Guardar preferencias",
              closeIconLabel: "Cerrar",
              serviceCounterLabel: "Servicios",
              sections: [
                {
                  title: "Uso de cookies",
                  description:
                    "Las cookies permiten el funcionamiento del sitio y, si lo autorizas, servicios opcionales. Las necesarias siempre están activas. Puedes cambiar tu elección en cualquier momento desde el pie de página («Cookies»).",
                },
                {
                  title: "Cookies necesarias / técnicas",
                  description:
                    "Imprescindibles para la navegación, la seguridad básica y recordar tu decisión de consentimiento (p. ej. cc_cookie). No se pueden desactivar.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies funcionales",
                  description:
                    "Permiten cargar el mapa de Google Maps en la sección de contacto. Si las rechazas, podrás abrir la ubicación en Google Maps desde el enlace de la dirección. No usamos cookies de análisis ni de publicidad en este momento.",
                  linkedCategory: "functional",
                },
                {
                  title: "Más información",
                  description: `Consulta la Política de cookies completa en el pie de página. Dudas: <a href="mailto:${legalEntity.email}">${legalEntity.email}</a>.`,
                },
              ],
            },
          },
        },
      },
      onConsent: () => {
        dispatchMapsConsent(CookieConsent.acceptedService("googlemaps", "functional"));
      },
      onChange: () => {
        dispatchMapsConsent(CookieConsent.acceptedService("googlemaps", "functional"));
      },
    });
  }, []);

  return null;
};

export default CookieConsentInit;
export { MAPS_CONSENT_EVENT };
