/** WhatsApp contact helpers for booking flows. */

export const WHATSAPP_PHONE = "34641984714";

export type BookingMessageInput = {
  massages: readonly string[];
  objections: string;
  firstName: string;
  lastName: string;
};

export const buildWhatsAppUrl = (text?: string): string => {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (!text?.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(text.trim())}`;
};

export const buildServiceWhatsAppUrl = (serviceTitle: string): string =>
  buildWhatsAppUrl(
    `Hola, me gustaría reservar una cita para: ${serviceTitle}. ¿Me ayudas a agendarla?`,
  );

export const buildBookingWhatsAppMessage = ({
  massages,
  objections,
  firstName,
  lastName,
}: BookingMessageInput): string => {
  const lines = [
    "Hola, quiero pedir cita en TUKURA.",
    "",
    `Solicitud: ${massages.join(", ")}`,
  ];

  if (objections.trim()) {
    lines.push(`Objeciones / notas: ${objections.trim()}`);
  }

  lines.push(
    "",
    `Nombre: ${firstName.trim()} ${lastName.trim()}`.trim(),
    "",
    "¡Gracias!",
  );

  return lines.join("\n");
};
