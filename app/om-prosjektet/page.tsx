import Hero from "@/components/Hero";
import Img from "@/components/Img";

// ─── Konstanter ─────────────────────────────────────────────────
const SECTIONS = [
  {
    title: "Hva handler prosjektet om?",
    imageSrc: "/img/gronnetak.png",
    imageAlt: "Grønne tak i by",
    imageRight: false,
    paragraphs: [
      "Grønne tak har de siste årene blitt stadig mer utbredt, særlig i områder hvor grønne flater er under press. I nyere tid har det vært økende fokus på sedumtak, spesielt knyttet til overvannshåndtering. Dette prosjektet retter derimot oppmerksomheten mot biotoptak og deres potensiale for å styrke biologisk mangfold.",
      "I takt med økende fortetting og tap av natur blir det stadig viktigere å integrere nye leveområder for planter og insekter i det vi bygger. Biotoptak er utviklet nettopp for dette formålet, ved å etterligne naturlige habitater og styrke biologisk mangfold gjennom bruk av stedegne arter.",
    ],
  },
  {
    title: "Vårt datagrunnlag",
    imageSrc: null,
    imageAlt: null,
    imageRight: false,
    paragraphs: [
      "Datagrunnlaget for verktøyet er basert på artsobservasjoner fra Artsdatabanken, filtrert til karplanter registrert i Trondheim fra 1975 til i dag. Datasettet er videre renset for fremmede arter, rødlistede arter og arter som ikke egner seg for takmiljøer. De gjenværende artene er vurdert etter egnethet for tørre vekstforhold og tilgjengelighet på markedet. Resultatet er et utvalg stedegne plantearter tilpasset grønne tak, med tilhørende informasjon om blant annet solforhold, jorddybde, vindeksponering og pollinatorverdi."
    ],
  },
] as const;

const VALUES = [
  { src: "/ikoner/stedegenNatur.svg", label: "Stedegen natur" },
  { src: "/ikoner/stedstilpassede.svg", label: "Biologisk mangfold" },
  { src: "/ikoner/bymiljo.svg", label: "Bedre bymiljø" },
  { src: "/ikoner/stedstilpassede.svg", label: "Stedstilpassede løsninger" },
] as const;

const FN_GOALS = [
  { src: "/img/fn/fn3.png", alt: "FN bærekraftsmål 3: God helse og livskvalitet" },
  { src: "/img/fn/fn6.png", alt: "FN bærekraftsmål 6: Rent vann og gode sanitærforhold" },
  { src: "/img/fn/fn7.png", alt: "FN bærekraftsmål 7: Ren energi til alle" },
  { src: "/img/fn/fn11.png", alt: "FN bærekraftsmål 11: Bærekraftige byer og lokalsamfunn" },
  { src: "/img/fn/fn13.png", alt: "FN bærekraftsmål 13: Stoppe klimaendringene" },
  { src: "/img/fn/fn15.png", alt: "FN bærekraftsmål 15: Livet på land" },
] as const;

// ─── Delkomponenter ─────────────────────────────────────────────
function Divider() {
  return <div className="h-1 w-16 bg-dark-green" />;
}

function ContentSection({
  title,
  imageSrc,
  imageAlt,
  imageRight,
  paragraphs,
}: {
  title: string;
  imageSrc: string | null;
  imageAlt: string | null;
  imageRight: boolean;
  paragraphs: readonly string[];
}) {
  const textBlock = (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <Divider />
      <div className="flex flex-col gap-4">
        {paragraphs.map((text, i) => (
          <p key={i} className="text-base leading-relaxed text-zinc-700 md:text-lg">
            {text}
          </p>
        ))}
      </div>
    </div>
  );

  const imageBlock = imageSrc && imageAlt && (
    <div className="flex flex-shrink-0 justify-center">
      <Img
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        width={450}
        height={400}
        className="w-full max-w-sm rounded-lg object-cover md:max-w-md"
      />
    </div>
  );

  return (
    <section className="flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:gap-16 md:px-16 md:py-20 2xl:px-32">
      {imageRight ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
    </section>
  );
}

// ─── Side ───────────────────────────────────────────────────────
export default function OmProsjektet() {
  return (
    <main className="w-full">
      <Hero
        title="Om prosjektet"
        description="GrøntTak har som mål å gjøre det enklere å velge riktig vegetasjon for grønne tak. Verktøyet gir beslutningsstøtte i tidlig fase av byggeprosjekter, og synliggjør hvordan biotoptak kan bidra til økt biologisk mangfold i byer. Basert på brukerens behov og preferanser gir løsningen anbefalinger om plantevalg."
        imageSrc="/img/illustrasjon.png"
        imageAlt="Illustrasjon av folk med planter"
      />

      {SECTIONS.map((section) => (
        <ContentSection key={section.title} {...section} />
      ))}

      {/* Våre verdier */}
      <section className="w-full bg-light-yellow px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:gap-12">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Våre verdier</h2>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {VALUES.map(({ src, label }) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <Img width={200} imageSrc={src} imageAlt="" />
                <span className="text-center text-base md:text-lg">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FN bærekraftsmål */}
      <section className="flex flex-col items-center gap-8 px-6 py-12 md:flex-row md:justify-center md:gap-16 md:px-16 md:py-20 2xl:px-32">
        <div className="w-full max-w-xs flex-shrink-0 text-center md:w-48 md:text-left">
          <h2 className="text-2xl font-bold">FN bærekraftsmål for prosjektet</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {FN_GOALS.map(({ src, alt }) => (
            <Img key={src} width={120} imageSrc={src} imageAlt={alt} />
          ))}
        </div>
      </section>
    </main>
  );
}