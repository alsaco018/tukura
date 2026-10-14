export type Review = {
  id: string;
  name: string;
  body: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "María García",
    body: "Placeholder de reseña. Sustituye este texto por una opinión real de una clienta cuando esté disponible.",
    rating: 5,
  },
  {
    id: "2",
    name: "Laura Pérez",
    body: "Placeholder de reseña. Sustituye este texto por una opinión real de una clienta cuando esté disponible.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana López",
    body: "Placeholder de reseña. Sustituye este texto por una opinión real de una clienta cuando esté disponible.",
    rating: 5,
  },
];
