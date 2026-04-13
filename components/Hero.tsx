import Img from "@/components/Img";

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  backgroundSrc?: string;
  tagline?: string;
}

export default function Hero({
  title,
  description,
  imageSrc,
  imageAlt,
  backgroundSrc = "/img/bakgrunn.png",
  tagline,
}: HeroProps) {
  return (
    <section
      className="relative flex min-h-[400px] w-full items-end px-16 py-28 lg:min-h-[600px] lg:px-24 lg:py-48 2xl:px-44"
      style={{
        backgroundImage: `url('${backgroundSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 flex max-w-xl flex-col gap-10 lg:max-w-2xl 2xl:max-w-3xl">
        <h1 className="text-4xl font-bold lg:text-5xl 2xl:text-6xl">{title}</h1>
        <p className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
          {description}
        </p>
        {tagline && (
          <p className="text-sm italic md:text-base lg:text-lg">{tagline}</p>
        )}
      </div>

      <div className="absolute bottom-0 right-32">
        <Img
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          width={500}
          height={350}
          className="hidden rounded-lg md:block"
          priority
        />
      </div>
    </section>
  );
}