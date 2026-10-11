type SpaceGalleryProps = {
  images: readonly string[];
};

export const SpaceGallery = ({ images }: SpaceGalleryProps) => {
  return (
    <div
      className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [scrollbar-width:thin]"
      role="list"
      aria-label="Galería del espacio"
      tabIndex={0}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className="h-[228px] w-[304px] shrink-0 snap-start overflow-hidden rounded-[40px]"
          role="listitem"
        >
          <img
            src={src}
            alt={`Espacio TUKURA ${index + 1}`}
            className="h-full w-full object-cover"
            width={304}
            height={228}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};
