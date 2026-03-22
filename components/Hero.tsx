import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tagline?: string;
}

export default function Hero({ title, description, imageSrc, imageAlt, tagline }: HeroProps) {
  return (
    <section className="relative w-full bg-light-green flex items-end px-16 py-16 min-h-[450px]">
      
      {/* Tekst venstre */}
      <div className="flex flex-col gap-6 max-w-lg z-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg leading-relaxed text-zinc-700">{description}</p>
        {tagline && <p className="italic text-lg">{tagline}</p>}
      </div>

      {/* Bilde høyre - mot bunnen */}
      <div className="absolute bottom-0 right-16">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={350}
          className="object-contain"
        />
      </div>

    </section>
  );
}