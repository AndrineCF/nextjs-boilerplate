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
      "Implementering av grønne tak har i de siste år økt i popularitet, spesielt i urbane strøk som en pustende, estetisk og grønn del av bylivet.",
      "I takt med fortetting og færre grønne flater er grønne tak et viktig miljøtiltak i byer fordi de styrker lokal flora og biologisk mangfold ved å skape nye leveområder for planter og insekter.",
      "I tillegg til påvist positiv effekt på menneskers mentale helse bidrar vegetasjonen til bedre bymiljø ved å fange svevestøv, binde CO₂ og håndtere overvann.",
    ],
  },
  {
    title: "Vårt datagrunnlag",
    imageSrc: null,
    imageAlt: null,
    imageRight: false,
    paragraphs: [
      "Datagrunnlaget for verktøyet er basert på artsobservasjoner fra Artsdatabanken, hentet gjennom karttjenesten Artskart. Datasettene ble filtrert til å omfatte karplanter registrert i Trondheim kommune fra 1975 og frem til i dag, noe som ga et utgangspunkt på rundt 70 000 observasjoner.",
      "For å gjøre datasettet relevant for bruk på grønne tak ble det gjennomført en stegvis filtreringsprosess. Fremmede arter og rødlistede arter (RE, CR, EN og VU) ble fjernet, sammen med arter som ikke egner seg for takmiljøer, som trær, skogbunnsarter og planter med høyt fuktighetsbehov. Videre ble artene vurdert etter stedegenhet og tilpasning til tørre, næringsfattige vekstforhold.",
      "Til slutt ble listen avgrenset til arter som også er tilgjengelige på markedet. Resultatet er et datasett på 58 stedegne plantearter som kan fungere på grønne tak i Trondheim. For hver art er det lagt til informasjon om blant annet solforhold, jorddybde, vindeksponering, pollinatorverdi og etableringsmetode, slik at de kan filtreres og brukes i planlegging av habitattak.",
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
        description="Prosjektet GrøntTak handler om å gjøre det enklere å velge riktig vegetasjon til grønne tak ut ifra selvvalgte preferanser og behov. Dette innebærer bl.a. anbefalt jorddybde, veksthøyde samt behov for solforhold og vedlikehold."
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