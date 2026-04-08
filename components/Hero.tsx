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
    <section className="relative w-full flex items-end px-16 py-28 lg:px-24 lg:py-48 2xl:px-44 min-h-[400px] lg:min-h-[600px]"
      style={{
        backgroundImage: `url('/img/bakgrunn.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      {/* Tekst venstre */}
      <div className="flex flex-col gap-10 max-w-xl lg:max-w-2xl 2xl:max-w-3xl z-10">
        <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold">{title}</h1>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-zinc-700">{description}</p>
        {tagline && <p className="italic text-sm md:text-base lg:text-lg">{tagline}</p>}
      </div>

      {/* Bilde høyre - mot bunnen */}
      <div className="absolute bottom-0 right-30">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={350}
          className="rounded-lg flex-shrink-0 hidden md:block"
        />
      </div>

    </section>
  );
}