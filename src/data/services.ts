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
};

export const services: Service[] = [
  {
    id: "personalizado",
    kicker: "escucha a tu cuerpo",
    title: "Masaje personalizado",
    lead: "Un masaje a tu medida",
    description:
      "Un masaje a tu medida que alivia tensiones, mejora tu movilidad y devuelve ligereza a tu cuerpo combinando técnicas según tus necesidades reales. ¿Empezamos?",
    detail: [
      "Parte de ti y de lo que tu cuerpo necesita ahora: liberar tensión, favorecer la movilidad o recuperar ligereza.",
      "Combinamos técnicas de quiromasaje, zonas, presiones y ritmos allí donde más lo necesitas.",
      "Cada sesión se adapta en el momento, escuchando cómo responde tu cuerpo para ofrecer el cuidado que realmente pide.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/service-personalizado.png",
  },
  {
    id: "ritual",
    kicker: "La esencia de TUKURA",
    title: "Ritual corporal holístico",
    lead: "La esencia de TUKURA.",
    description:
      "Un recorrido de pies a cabeza para liberar tensión y bajar el ritmo. Una experiencia envolvente de calma, ligereza y cuidado solo para ti. Respira y disfruta",
    detail: [
      "Un recorrido de cuerpo completo, de pies a cabeza.",
      "Una experiencia envolvente para bajar el ritmo, dejar atrás el ruido externo y sumergirte en una profunda sensación de calma.",
      "Ideal cuando necesitas una pausa larga y un cuidado integral de todo el cuerpo.",
    ],
    price: "55€",
    duration: "75 min",
    image: "/images/service-ritual.png",
  },
  {
    id: "vertebral",
    kicker: "Bienestar para tu columna",
    title: "Masaje vertebral",
    lead: "Tu columna necesita movilidad y expansión.",
    description:
      "Masaje vertebral profundo del sacro al occipital. Libera tensiones, descomprime la columna y regula tu sistema nervioso. Técnicas adaptadas a ti para ganar movilidad y amplitud",
    detail: [
      "Trabajo específico del eje vertebral, del sacro al occipital.",
      "Liberamos tensiones, favorecemos la descompresión y mejoramos la sensación de movilidad y amplitud.",
      "Técnicas adaptadas a ti para ganar espacio, ligereza y regulación del sistema nervioso.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/service-vertebral.png",
  },
  {
    id: "craneofacial",
    kicker: "Sobrecarga mental",
    title: "Conexión craneofacial",
    lead: "Cuando sientes demasiadas responsabilidades en la cabeza.",
    description:
      "Días de tensión acumulada. Esta sesión alivia la parte alta de la espalda, hombros, cuello y rostro para relajar cuerpo y mente. Desconecta y descansa profundamente",
    detail: [
      "Recorre la parte alta de la espalda, hombros, cervicales, nuca, cabeza, mandíbula y rostro.",
      "Pensado para soltar la sobrecarga mental y recuperar una relajación profunda.",
      "Una sesión cuidada para días de tensión acumulada en la zona alta del cuerpo.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/service-craneofacial.png",
  },
  {
    id: "kobido",
    kicker: "El arte japonés del masaje facial",
    title: "Kobido facial",
    lead: "El arte japonés del masaje facial.",
    description:
      "Masaje facial japonés en piel seca. Con movimientos rápidos y drenaje en rostro, cuello y cabeza, estimula la circulación y revitaliza para un aspecto ligero y despierto",
    detail: [
      "Técnica japonesa sobre piel seca, con movimientos rápidos y drenaje en rostro, cuello, escote y cabeza.",
      "Estimula la circulación y deja el rostro más ligero, despierto y revitalizado.",
      "Una experiencia facial que cuida también cuello y cabeza para un resultado más completo.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/service-kobido.png",
  },
  {
    id: "prenatal",
    kicker: "Cuidarte durante el embarazo",
    title: "Masaje prenatal",
    lead: "Cuidar tu cuerpo durante el embarazo.",
    description:
      "Durante el embarazo tu cuerpo cambia y necesita descanso. Este masaje suave y adaptado alivia tu espalda y piernas, acompañándote con amor en esta hermosa etapa",
    detail: [
      "Sesión específica con posiciones cómodas y un trabajo suave y adaptado.",
      "Prestamos atención a las zonas que acumulan mayor sobrecarga en esta etapa, como espalda y piernas.",
      "Un acompañamiento amable para cuidar tu cuerpo y darte descanso durante el embarazo.",
    ],
    price: "45€",
    duration: "60 min",
    image: "/images/service-prenatal.png",
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);
