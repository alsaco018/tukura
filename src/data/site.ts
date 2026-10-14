export const site = {
  name: "TUKURA",
  tagline: "Tu cuerpo te está pidiendo una",
  displayWord: "pausa",
  description:
    "Centro de masajes y bienestar. Un espacio seguro y amable para bajar el ritmo y recibir cuidado.",
  cta: {
    label: "Reserva",
    href: "/inicio#contacto",
  },
  contact: {
    email: "info@tukura.es",
    phone: "641 984 714",
    phoneHref: "tel:+34641984714",
    whatsapp: "https://wa.me/34641984714",
    instagram: {
      label: "@tukura_bienestar",
      href: "https://instagram.com/tukura_bienestar",
    },
    address: "C/ Madre de Dios, n° 7. Centro Apófisis.",
    mapImage: "/images/contact-map.png",
    kicker: "contacta con nosotros",
    title: "Pide cita y regálate una pausa",
  },
  social: [
    {
      label: "WhatsApp",
      href: "https://wa.me/34641984714",
      icon: "/icons/whatsapp-white.svg",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/tukura_bienestar",
      icon: "/icons/instagram-white.svg",
    },
    {
      label: "Email",
      href: "mailto:info@tukura.es",
      icon: "/icons/email-white.svg",
    },
  ],
  nav: [
    { label: "Nuestros servicios", href: "/inicio#servicios" },
    { label: "Quién soy", href: "/historia" },
    { label: "Nuestra historia", href: "/historia" },
    { label: "El espacio", href: "/inicio#espacio" },
    { label: "Tarjeta regalo", href: "/inicio#regalo" },
    { label: "Contacta con nosotros", href: "/inicio#contacto" },
  ],
  footerNav: [
    { label: "Servicios", href: "/inicio#servicios" },
    { label: "Quién soy", href: "/historia" },
    { label: "Nuestra historia", href: "/historia" },
    { label: "El espacio", href: "/inicio#espacio" },
    { label: "Tarjeta regalo", href: "/inicio#regalo" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Aviso legal", href: "#" },
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
  story: {
    kicker: "nuestra historia",
    lines: [
      { accent: "Acompañar", rest: " sin imponer" },
      { accent: "Cuidar", rest: " sin invadir" },
      { accent: "Sostener", rest: " sin juzgar" },
    ],
    paragraphs: [
      "Tu cuerpo guarda el estrés diario.",
      "En TUKURA creamos espacios seguros para bajar el ritmo y recibir cuidado.",
      "Mediante masajes integrales y tacto consciente, acompañamos a tu cuerpo a aflojar, respirar y recuperar su bienestar.",
    ],
    ctaLabel: "Leer más",
    ctaHref: "/historia",
    decoration: "/images/story-decoration.svg",
  },
  space: {
    kicker: "el espacio",
    title: "Un lugar donde relajarte",
    paragraphs: [
      "El ritmo diario, el estrés y el cansancio se reflejan en el cuerpo: hombros tensos, mandíbula apretada o fatiga. De esa necesidad de pausa nace TUKURA, un espacio seguro y amable para bajar el ritmo y recibir cuidado sin tener que resolverlo todo",
      "Entendemos el masaje desde una mirada integral, viendo el cuerpo como un todo. Mediante el tacto consciente y la escucha, acompañamos a tu cuerpo a aflojar, respirar y recuperar su bienestar",
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
    intro: "Un regalo que cuida. Elige una experiencia o deja que la persona elija",
    badges: ["Digital", "Recoger en el centro"],
    slides: [
      {
        kicker: "Elije tu regalo",
        title: "Regala un masaje",
        description:
          "Regala bienestar, elige el quiromasaje relajante perfecto para sorprender a quien tú quieras",
        ctaLabel: "Reserva",
        image: "/images/gift-slider.png",
      },
      {
        kicker: "Elije el importe",
        title: "Tarjeta a tu medida",
        description:
          "Válida para cualquier servicio. Tú eliges el importe y la persona decide su momento de bienestar",
        ctaLabel: "Reserva",
        image: "/images/gift-slider.png",
      },
    ],
    note: "Las tarjetas regalo digitales se envían por email o WhatsApp, listas para regalar. También puedes recogerlas impresas en el centro. Válidas durante 6 meses",
  },
} as const;
