import Hero from "@/components/Hero";
import Img from "@/components/Img";

// ─── Konstanter ─────────────────────────────────────────────────
const SECTIONS = [
  {
    title: "Hva hjelper vårt verktøy med?",
    imageSrc: "/img/Plantevalgapp.png",
    imageAlt: "Plantevalgapp med solskinn og luft",
    imageRight: false,
    paragraphs: [
      "Verktøyet vårt gjør det enklere å velge riktige arter ved å samle relevante plantealternativer og gjøre dem søkbare og sammenlignbare. Du kan filtrere og velge ut fra faktorer som sol, vind, jorddybde, veksthøyde, etableringsmetode, driftstype, samt pollinatorverdi og økologisk rolle.",
      "I takt med fortetting og færre grønne flater er grønne tak et viktig miljøtiltak i byer fordi de styrker lokal flora og biologisk mangfold ved å skape nye leveområder for planter og insekter.",
      "Resultatet er et mer treffsikkert plantevalg bidrar til å oppnå prosjektmålene, enten det er lavt vedlikehold, estetikk eller høy natur- og miljøverdi.",
    ],
  },
  {
    title: "Miljøgevinst",
    imageSrc: null,
    imageAlt: null,
    imageRight: false,
    background: "bg-light-yellow",
    paragraphs: [
      "Riktig plantevalg kan gjøre grønne tak til mer enn et visuelt tiltak. Når artene er tilpasset lokale forhold, kan taket bidra til økt biodiversitet ved å gi mat- og leveområder for pollinerende insekter og støtte lokale økologiske sammenhenger.",
      "Vegetasjon og vekstmedium kan holde tilbake nedbør, forsinke avrenning og øke fordamping, noe som kan avlaste overvannssystemer ved kraftig regn. Grønne tak kan også bidra til opptak og lagring av karbon ved at CO₂ bindes i biomasse og delvis i vekstmediet over tid, samtidig som de kan dempe varmebelastning i byområder gjennom skygge og naturlig kjøling.",
      "I tillegg kan vegetasjonen fange opp partikler og redusere støv, og den kan beskytte takmembranen mot UV-stråling og temperatursvingninger, som kan gi lengre levetid. Miljøgevinsten avhenger likevel av at plantene faktisk etablerer seg og trives, derfor er artsvalg og driftstype avgjørende.",
    ],
  },
  {
    title: "Smarte plantevalg",
    imageSrc: "/img/smartPlante.png",
    imageAlt: "Grønne tak og smarte valg",
    imageRight: true,
    paragraphs: [
      "Valg av planter til grønne tak påvirkes av flere forhold og er avgjørende for om taket blir robust og enkelt å drifte. Med riktig artsvalg tilpasset sol, vind, jorddybde og fuktighet får du bedre etablering, jevnere dekke og mindre behov for vanning og etterplanting.",
      "Ulike prosjekter kan prioritere lavt vedlikehold, et bestemt estetisk uttrykk eller høy økologisk verdi, for eksempel god støtte til pollinatorer. Feil plantevalg gir ofte glisne partier og høyere driftskostnader over tid.",
    ],
  },
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
  background,
}: {
  title: string;
  imageSrc: string | null;
  imageAlt: string | null;
  imageRight: boolean;
  paragraphs: readonly string[];
  background?: string;
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
    <section
      className={`flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:gap-16 md:px-16 md:py-20 2xl:px-32 ${background ?? ""}`}
    >
      {imageRight ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </section>
  );
}

// ─── Side ───────────────────────────────────────────────────────
export default function OmVerktoy() {
  return (
    <main className="w-full">
      <Hero
        title="Vårt verktøy"
        description="Valg av planter til grønne tak avgjør hvor robust og lettdrevet taket blir. Når vegetasjonen tilpasses sol, vind, jorddybde og fuktighet, kan taket tilpasses vedlikeholdønsker, estetikk og ønsket bidrag til det lokale økosystemet. Her vises miljøgevinstene av riktige plantevalg, og hvordan verktøyet vårt hjelper deg å finne arter som passer prosjektet ditt."
        imageSrc="/ikoner/plante-verktoy.svg"
        imageAlt="Illustrasjon av folk med planter"
      />
      {SECTIONS.map((section) => (
        <ContentSection key={section.title} {...section} />
      ))}
    </main>
  );
}