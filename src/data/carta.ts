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
      "TUKURA nace del deseo de crear espacios y momentos más amables y seguros. Lugares donde no tengamos que llegar con todo resuelto, donde podamos parar y descansar.",
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
      lead: "Escucha a tu cuerpo",
      description:
        "Hay días en los que sabes exactamente dónde se acumula la tensión: los hombros tras horas frente al ordenador, la espalda tras la jornada, las piernas tras entrenar. Trabajo esa zona para liberar tensión acumulada, favorecer la movilidad y devolverte ligereza. Te vas con el cuerpo más suelto y con una sensación de alivio.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "ritual",
      title: "Ritual corporal holístico",
      lead: "La esencia de TUKURA",
      description:
        "Un recorrido de cuerpo completo, de los pies a la cabeza. Un espacio para bajar el ritmo y dejar atrás el ruido externo, mientras notas cómo tu cuerpo va soltando tensión, hasta terminar en una profunda sensación de calma, tranquilidad y paz. Muchas personas se van flotando.",
      price: "55 €",
      duration: "75 minutos",
    },
    {
      id: "vertebral",
      title: "Masaje vertebral",
      lead: "Tu columna necesita movilidad y expansión",
      description:
        "Un masaje específico que recorre el eje vertebral, del sacro a la zona occipital, con un trabajo manual más profundo. Busco liberar tensiones, favorecer la descompresión de la columna y mejorar la sensación de movilidad y amplitud. Para sentir la espalda liberada de tensión.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "craneofacial",
      title: "Conexión craneofacial",
      lead: "Cuando sientes demasiadas responsabilidades en la cabeza",
      description:
        "Para cuando cuesta soltar: hombros elevados, nuca cargada, mandíbula apretada. Recorro la parte alta de la espalda, cervicales, cabeza y rostro para que dejes de darle vueltas a todo y llegues a una relajación profunda. Una forma de irte a otro mundo un rato: la mente más quieta y el cuerpo en calma.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "kobido",
      title: "Kobido facial",
      lead: "El arte japonés del masaje facial",
      description:
        "Una técnica japonesa sobre piel seca, con movimientos rápidos, rítmicos y precisos, percusiones y drenaje, en rostro, cuello, escote y cabeza. Relaja toda la cara, también la mandíbula, una de las zonas donde más tensión guardamos. El rostro es de las partes más sensibles del cuerpo, y por eso se nota tanto. Deja una sensación de rostro más ligero, despierto y revitalizado.",
      price: "45 €",
      duration: "60 minutos",
    },
    {
      id: "prenatal",
      title: "Masaje prenatal",
      lead: "Cuidar tu cuerpo durante el embarazo",
      description:
        "Durante el embarazo la espalda se carga y las piernas pesan más. Una sesión con posiciones cómodas y un trabajo suave y adaptado, con atención a las zonas de mayor sobrecarga, para darte un descanso absoluto.",
      price: "45 €",
      duration: "60 minutos",
    },
  ] satisfies CartaService[],
  contact: {
    kicker: "Contacto y reservas",
    phoneDisplay: "641 984 714",
    phoneHref: "#contacto",
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
