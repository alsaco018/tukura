export type CartaService = {
  id: string;
  title: string;
  lead?: string;
  description: string;
  price: string;
  duration: string;
};

export const carta = {
  cover: {
    subtitle: "Masaje & Bienestar",
    title: "Carta de masajes",
    slogan: "Tu cuerpo. Tu ritmo. Tu momento.",
  },
  intro: {
    kicker: "El masaje en TUKURA",
    greeting: "¡Hola! Soy Patri Guillén",
    body: [
      "Educadora Social y Quiromasajista, la persona que da vida a TUKURA y quien te acompañará en cada sesión.",
      "Fue de ahí donde empezó a nacer TUKURA: de un anhelo de crear espacios y momentos más amables y seguros. Donde podamos bajar el ritmo, escuchar lo que necesitamos y permitirnos recibir cuidado.",
    ],
    principles: [
      "Acompañar sin imponer.",
      "Cuidar sin invadir.",
      "Sostener sin juzgar.",
    ],
    quote: "Tu cuerpo también cuenta tu historia.",
  },
  services: [
    {
      id: "personalizado",
      title: "Masaje personalizado",
      description:
        "Parte de ti y de lo que tu cuerpo necesita ahora: liberar tensión, favorecer la movilidad o recuperar ligereza. Combinamos técnicas de quiromasaje, zonas, presiones y ritmos allí donde más lo necesitas.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "ritual",
      title: "Ritual corporal holístico",
      lead: "La esencia de TUKURA.",
      description:
        "Un recorrido de cuerpo completo, de pies a cabeza. Una experiencia envolvente para bajar el ritmo, dejar atrás el ruido externo y sumergirte en una profunda sensación de calma.",
      price: "55 €",
      duration: "75 minutos",
    },
    {
      id: "craneofacial",
      title: "Conexión craneofacial",
      lead: "Cuando sientes demasiadas responsabilidades en la cabeza.",
      description:
        "Recorre la parte alta de la espalda, hombros, cervicales, nuca, cabeza, mandíbula y rostro. Pensado para soltar y recuperar una relajación profunda.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "vertebral",
      title: "Masaje vertebral",
      lead: "Tu columna necesita movilidad y expansión.",
      description:
        "Trabajo específico del eje vertebral, del sacro al occipital. Liberamos tensiones, favorecemos la descompresión y mejoramos la sensación de movilidad y amplitud.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "kobido",
      title: "Kobido facial",
      lead: "El arte japonés del masaje facial.",
      description:
        "Técnica japonesa sobre piel seca, con movimientos rápidos y drenaje en rostro, cuello, escote y cabeza. Deja el rostro más ligero, despierto y revitalizado.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "prenatal",
      title: "Masaje prenatal",
      lead: "Cuidar tu cuerpo durante el embarazo.",
      description:
        "Sesión específica con posiciones cómodas y un trabajo suave y adaptado, prestando atención a las zonas que acumulan mayor sobrecarga en esta etapa.",
      price: "45 €",
      duration: "60 minutos",
    },
  ] satisfies CartaService[],
  contact: {
    kicker: "Contacto y reservas",
    phoneDisplay: "641 984 714",
    phoneHref: "https://wa.me/34641984714",
    address: "C/ Madre de Dios, n° 7. Centro Apófisis.",
    instagram: {
      handle: "@tukura_bienestar",
      href: "https://instagram.com/tukura_bienestar",
    },
    closing: "Tu cuerpo es tu hogar. ¡Habítalo!",
  },
  maintenanceNote:
    "La web completa está en preparación. Mientras tanto, aquí tienes la carta de masajes para pedirnos cita.",
} as const;
