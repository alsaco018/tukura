export type Service = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  detail: string[];
  lead?: string;
  price: string;
  duration: string;
  image: string;
  imageAlt?: string;
  /** Tailwind object-position utility, e.g. "object-[center_72%]" */
  imagePosition?: string;
};

export const services: Service[] = [
  {
    id: "personalizado",
    kicker: "escucha a tu cuerpo",
    title: "Masaje personalizado",
    lead: "Escucha a tu cuerpo",
    description:
      "Hay días en los que sabes exactamente dónde se acumula la tensión: los hombros tras horas frente al ordenador, la espalda tras la jornada, las piernas tras entrenar. Trabajo esa zona para liberar tensión acumulada, favorecer la movilidad y devolverte ligereza. Te vas con el cuerpo más suelto y con una sensación de alivio.",
    detail: [
      "Hay días en los que sabes exactamente dónde se acumula la tensión: los hombros tras horas frente al ordenador, la espalda tras la jornada, las piernas tras entrenar.",
      "Trabajo esa zona para liberar tensión acumulada, favorecer la movilidad y devolverte ligereza.",
      "Te vas con el cuerpo más suelto y con una sensación de alivio.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/personalizado/masaje-personalizado-tukura-jerez.webp",
    imageAlt:
      "Masaje personalizado en espalda y zona lumbar realizado a un cliente en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
  },
  {
    id: "ritual",
    kicker: "La esencia de TUKURA",
    title: "Ritual corporal holístico",
    lead: "La esencia de TUKURA",
    description:
      "Un recorrido de cuerpo completo, de los pies a la cabeza. Un espacio para bajar el ritmo y dejar atrás el ruido externo, mientras notas cómo tu cuerpo va soltando tensión, hasta terminar en una profunda sensación de calma, tranquilidad y paz. Muchas personas se van flotando.",
    detail: [
      "Un recorrido de cuerpo completo, de los pies a la cabeza.",
      "Un espacio para bajar el ritmo y dejar atrás el ruido externo, mientras notas cómo tu cuerpo va soltando tensión, hasta terminar en una profunda sensación de calma, tranquilidad y paz.",
      "Muchas personas se van flotando.",
    ],
    price: "55€",
    duration: "75 min",
    image: "/images/holistico/masaje-ritual-holistico-tukura-jerez.webp",
    imageAlt:
      "Manos de Patri Guillén realizando el ritual corporal holístico a un cliente en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
    imagePosition: "object-bottom",
  },
  {
    id: "vertebral",
    kicker: "Tu columna necesita movilidad y expansión",
    title: "Masaje vertebral",
    lead: "Tu columna necesita movilidad y expansión",
    description:
      "Un masaje específico que recorre el eje vertebral, del sacro a la zona occipital, con un trabajo manual más profundo. Busco liberar tensiones, favorecer la descompresión de la columna y mejorar la sensación de movilidad y amplitud. Para sentir la espalda liberada de tensión.",
    detail: [
      "Un masaje específico que recorre el eje vertebral, del sacro a la zona occipital, con un trabajo manual más profundo.",
      "Busco liberar tensiones, favorecer la descompresión de la columna y mejorar la sensación de movilidad y amplitud.",
      "Para sentir la espalda liberada de tensión.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/vertebral/masaje-vertebral-tukura-jerez.webp",
    imageAlt:
      "Masaje vertebral en la columna y espalda realizado a un cliente en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
  },
  {
    id: "craneofacial",
    kicker: "Cuando sientes demasiadas responsabilidades en la cabeza",
    title: "Conexión craneofacial",
    lead: "Cuando sientes demasiadas responsabilidades en la cabeza",
    description:
      "Para cuando cuesta soltar: hombros elevados, nuca cargada, mandíbula apretada. Recorro la parte alta de la espalda, cervicales, cabeza y rostro para que dejes de darle vueltas a todo y llegues a una relajación profunda. Una forma de irte a otro mundo un rato: la mente más quieta y el cuerpo en calma.",
    detail: [
      "Para cuando cuesta soltar: hombros elevados, nuca cargada, mandíbula apretada.",
      "Recorro la parte alta de la espalda, cervicales, cabeza y rostro para que dejes de darle vueltas a todo y llegues a una relajación profunda.",
      "Una forma de irte a otro mundo un rato: la mente más quieta y el cuerpo en calma.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/craneofacial/masaje-craneofacial-tukura-jerez.webp",
    imageAlt:
      "Masaje craneofacial en cuello y cabeza realizado a un cliente en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
  },
  {
    id: "kobido",
    kicker: "El arte japonés del masaje facial",
    title: "Kobido facial",
    lead: "El arte japonés del masaje facial",
    description:
      "Una técnica japonesa sobre piel seca, con movimientos rápidos, rítmicos y precisos, percusiones y drenaje, en rostro, cuello, escote y cabeza. Relaja toda la cara, también la mandíbula, una de las zonas donde más tensión guardamos. El rostro es de las partes más sensibles del cuerpo, y por eso se nota tanto. Deja una sensación de rostro más ligero, despierto y revitalizado.",
    detail: [
      "Una técnica japonesa sobre piel seca, con movimientos rápidos, rítmicos y precisos, percusiones y drenaje, en rostro, cuello, escote y cabeza.",
      "Relaja toda la cara, también la mandíbula, una de las zonas donde más tensión guardamos. El rostro es de las partes más sensibles del cuerpo, y por eso se nota tanto.",
      "Deja una sensación de rostro más ligero, despierto y revitalizado.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/kobido/masaje-kobido-facial-tukura-jerez.webp",
    imageAlt:
      "Masaje Kobido facial japonés realizado por Patri Guillén a una clienta en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
  },
  {
    id: "prenatal",
    kicker: "Cuidar tu cuerpo durante el embarazo",
    title: "Masaje prenatal",
    lead: "Cuidar tu cuerpo durante el embarazo",
    description:
      "Durante el embarazo la espalda se carga y las piernas pesan más. Una sesión con posiciones cómodas y un trabajo suave y adaptado, con atención a las zonas de mayor sobrecarga, para darte un descanso absoluto.",
    detail: [
      "Durante el embarazo la espalda se carga y las piernas pesan más.",
      "Una sesión con posiciones cómodas y un trabajo suave y adaptado, con atención a las zonas de mayor sobrecarga, para darte un descanso absoluto.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/prenatal/masaje-prenatal-tukura-jerez.webp",
    imageAlt:
      "Masaje prenatal en piernas y pantorrilla realizado a una clienta embarazada en la sala de TUKURA, centro de masajes en Jerez de la Frontera",
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);
