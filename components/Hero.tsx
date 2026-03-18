import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Hero({ title, description, tagline, imageSrc, imageAlt }: HeroProps) {
  return (
    <section
      className="relative w-full flex items-center px-6 py-12 min-h-[400px] md:px-20 md:py-16 md:min-h-[500px]"
      style={{
        backgroundImage: `url('/bakgrunn.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Innhold */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full md:flex-row md:gap-16 md:max-w-7xl md:mx-auto">

        {/* Bilde - skjult på mobil, synlig på desktop */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={400}
          className="rounded-lg flex-shrink-0 hidden md:block"
        />

        {/* Tekst */}
        <div className="flex flex-col gap-4 text-white text-center md:text-left">
          <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
          <p className="text-base leading-relaxed md:text-lg">{description}</p>
          <p className="italic text-base md:text-lg">{tagline}</p>
        </div>

      </div>
    </section>
  );
}