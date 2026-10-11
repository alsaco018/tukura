export type Service = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "personalizado",
    kicker: "escucha a tu cuerpo",
    title: "Masaje personalizado",
    description:
      "Un masaje a tu medida que alivia tensiones, mejora tu movilidad y devuelve ligereza a tu cuerpo combinando técnicas según tus necesidades reales. ¿Empezamos?",
    price: "45€",
    duration: "60 min",
    image: "/images/service-personalizado.png",
  },
  {
    id: "ritual",
    kicker: "La esencia de TUKURA",
    title: "Ritual corporal holístico",
    description:
      "Un recorrido de pies a cabeza para liberar tensión y bajar el ritmo. Una experiencia envolvente de calma, ligereza y cuidado solo para ti. Respira y disfruta",
    price: "55€",
    duration: "75 min",
    image: "/images/service-ritual.png",
  },
  {
    id: "vertebral",
    kicker: "Bienestar para tu columna",
    title: "Masaje vertebral",
    description:
      "Masaje vertebral profundo del sacro al occipital. Libera tensiones, descomprime la columna y regula tu sistema nervioso. Técnicas adaptadas a ti para ganar movilidad y amplitud",
    price: "45€",
    duration: "60 min",
    image: "/images/service-vertebral.png",
  },
  {
    id: "craneofacial",
    kicker: "Sobrecarga mental",
    title: "Conexión craneofacial",
    description:
      "Días de tensión acumulada. Esta sesión alivia la parte alta de la espalda, hombros, cuello y rostro para relajar cuerpo y mente. Desconecta y descansa profundamente",
    price: "45€",
    duration: "60 min",
    image: "/images/service-craneofacial.png",
  },
  {
    id: "kobido",
    kicker: "El arte japonés del masaje facial",
    title: "Kobido facial",
    description:
      "Masaje facial japonés en piel seca. Con movimientos rápidos y drenaje en rostro, cuello y cabeza, estimula la circulación y revitaliza para un aspecto ligero y despierto",
    price: "45€",
    duration: "60 min",
    image: "/images/service-kobido.png",
  },
  {
    id: "prenatal",
    kicker: "Cuidarte durante el embarazo",
    title: "Masaje prenatal",
    description:
      "Durante el embarazo tu cuerpo cambia y necesita descanso. Este masaje suave y adaptado alivia tu espalda y piernas, acompañándote con amor en esta hermosa etapa",
    price: "45€",
    duration: "60 min",
    image: "/images/service-prenatal.png",
  },
];
