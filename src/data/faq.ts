export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "traer",
    question: "¿Necesito traer algo para mi sesión de quiromasaje?",
    answer:
      "Solo ven con ropa cómoda. En el centro disponemos de todo lo necesario para tu sesión: toallas, aceites y un espacio acondicionado para que solo te preocupes de disfrutar.",
  },
  {
    id: "embarazo",
    question: "¿Puedo hacerme un masaje si estoy embarazada?",
    answer:
      "¡Sí, pero con cariño extra! A partir del segundo trimestre podemos adaptar nuestras técnicas para mimar tu espalda y piernas cansadas. Eso sí, te pedimos que nos avises al reservar y, si tienes cualquier duda, que lo consultes antes con tu médico de confianza",
  },
  {
    id: "dolor",
    question: "¿Duele el quiromasaje relajante?",
    answer:
      "No debería doler. Adaptamos la presión a tu tolerancia y a lo que tu cuerpo necesita en cada momento. Si en algún punto sientes molestia, nos lo dices y ajustamos al instante.",
  },
  {
    id: "despues",
    question: "¿Cómo debo cuidarme después del masaje?",
    answer:
      "Bebe agua, evita esfuerzos intensos el resto del día y date permiso para ir más despacio. Es normal sentir más sueño o emoción: el cuerpo está integrando la sesión.",
  },
];
