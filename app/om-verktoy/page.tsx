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
      "Verktøyet vårt gjør det enklere å velge riktige plantearter ved å samle relevante alternativer og gjøre dem søkbare og sammenlignbare. Gjennom dialog får du forslag basert på forhold som solforhold, vindeksponering, jorddybde, veksthøyde, etableringsmetode, vedlikeholdsbehov og pollinatorverdi.",
      "I takt med økende fortetting og færre grønne flater blir det viktig å integrere natur i det vi bygger. Grønne tak kan bidra til å styrke biologisk mangfold ved å skape nye leveområder for planter og insekter.",
      "Ved å gjøre riktige plantevalg mer tilgjengelige i tidlig fase, kan verktøyet bidra til mer miljøvennlige byggeprosjekter og gjøre det enklere å oppfylle relevante miljøkrav. Resultatet er et mer treffsikkert plantevalg som gjør det enklere å nå prosjektmål, enten det gjelder lavt vedlikehold, estetikk eller økt økologisk verdi."
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
      "Ved å gjøre riktige plantevalg mer tilgjengelige i tidlig fase, kan verktøyet bidra til mer miljøvennlige byggeprosjekter og gjøre det enklere å oppfylle relevante miljøkrav. Resultatet er et mer treffsikkert plantevalg som gjør det enklere å nå prosjektmål, enten det gjelder lavt vedlikehold, estetikk eller økt økologisk verdi.",
      "Ulike prosjekter kan prioritere lavt vedlikehold, et bestemt estetisk uttrykk eller økt tilrettelegging for biologisk mangfold, for eksempel gjennom god støtte til pollinatorer. For å oppnå dette er det viktig å bruke planter med lokalt genetisk opphav, slik at de er best mulig tilpasset forholdene og bidrar til å styrke lokale økosystemer.",
      "For best mulig lokal tilpasning anbefales det å rådføre seg med økologer eller andre fagpersoner som kan gjøre befaring på tomten i tidlig fase. Dette gir et bedre grunnlag for riktige valg"
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
        description="Alle tak har ulike forutsetninger, og plantevalg bør tilpasses deretter. FloraKart tar utgangspunkt i et utvalg arter som egner seg for grønne tak, og gir anbefalinger tilpasset forholdene på ditt spesifikke tak.
        Dette inkluderer blant annet solforhold, vindeksponering, jorddybde, vedlikeholdsbehov og ønsket uttrykk. Verktøyet gir også innsikt i egenskaper ved de ulike artene, som pollinatorverdi og vekstforhold, slik at du kan ta mer informerte valg"
        imageSrc="/ikoner/plante-verktoy.svg"
        imageAlt="Illustrasjon av folk med planter"
      />
      {SECTIONS.map((section) => (
        <ContentSection key={section.title} {...section} />
      ))}
    </main>
  );
}