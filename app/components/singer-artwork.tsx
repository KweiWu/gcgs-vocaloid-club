import Image from "next/image";

type Props = {
  singerId: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const singerImages: Record<string, string> = {
  "hatsune-miku": "/images/singers/hatsune-miku.png",
  "kagamine-rin": "/images/singers/kagamine-rin.png",
  "kagamine-len": "/images/singers/kagamine-len.png",
  "megurine-luka": "/images/singers/megurine-luka.png",
  meiko: "/images/singers/meiko.png",
  kaito: "/images/singers/kaito.png",
};

export function SingerArtwork({
  singerId,
  alt,
  className = "",
  sizes = "(max-width: 768px) 80vw, 40vw",
  priority = false,
}: Props) {
  const src = singerImages[singerId];

  if (!src) return null;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain object-bottom"
      />
    </div>
  );
}
