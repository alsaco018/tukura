export const site = {
  name: "TUKURA",
  tagline: "Tu cuerpo te está pidiendo una",
  displayWord: "pausa",
  description:
    "Centro de masajes y bienestar. Un espacio seguro y amable para bajar el ritmo y recibir cuidado.",
  cta: {
    label: "Pide cita",
    href: "https://wa.me/34641984714",
  },
  contact: {
    email: "info@tukura.es",
    whatsapp: "https://wa.me/34641984714",
  },
  social: [
    {
      label: "Instagram",
      href: "https://instagram.com/tukura_bienestar",
      icon: "/icons/social-2.svg",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/34641984714",
      icon: "/icons/social-1.svg",
    },
  ],
  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Quien soy", href: "#quien-soy" },
    { label: "El espacio", href: "#espacio" },
    { label: "Tarjeta regalo", href: "#regalo" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Contacto", href: "https://wa.me/34641984714" },
    { label: "Cookies", href: "#" },
  ],
  address: "C/ Madre de Dios, n° 7. Centro Apófisis.",
  maintenance: {
    kicker: "Carta de masajes",
    title: "Estamos preparando la web",
    body: "Mientras terminamos la web completa, consulta la carta y pide cita por WhatsApp.",
    ctaLabel: "Pide cita",
  },
  about: {
    kicker: "quién soy",
    name: "Patricia Guillén",
    body: "Educadora Social y Quiromasajista, durante los últimos años he acompañado a personas y familias en momentos vitales complejos. En este camino fui descubriendo algo que despertó en mí una gran curiosidad: cómo todo lo que vivimos, lo que sentimos y aquello que sostenemos día a día también se expresa a través del cuerpo",
    quote: "“Tu cuerpo también cuenta tu historia”",
    image: "/images/about.jpg",
  },
  space: {
    kicker: "el espacio",
    title: "Un lugar donde relajarte",
    paragraphs: [
      "El ritmo diario, el estrés y el cansancio se reflejan en el cuerpo: hombros tensos, mandíbula apretada o fatiga. De esa necesidad de pausa nace TUKURA, un espacio seguro y amable para bajar el ritmo y recibir cuidado sin tener que resolverlo todo.",
      "Entendemos el masaje desde una mirada integral, viendo el cuerpo como un todo. Mediante el tacto consciente y la escucha, acompañamos a tu cuerpo a aflojar, respirar y recuperar su bienestar.",
    ],
    images: [
      "/images/space-1.png",
      "/images/space-2.png",
      "/images/space-3.png",
    ],
  },
  gift: {
    kicker: "Tarjeta regalo",
    title: "Regala bienestar",
    intro:
      "Un regalo que cuida. Elige una experiencia o deja que la persona elija.",
    badges: ["Digital", "Email", "Whatsapp", "Recoger en el centro"],
    options: [
      {
        title: "Regala un masaje",
        description: "Elije tu regalo",
        badges: ["60 min"],
      },
      {
        title: "Elije el importe",
        description: "Válida para cualquier servicio",
        badges: [],
      },
    ],
    note: "Las tarjetas regalo digitales se envían por email o WhatsApp, listas para regalar. También puedes recogerlas impresas en el centro. Válidas durante 6 meses.",
  },
} as const;
