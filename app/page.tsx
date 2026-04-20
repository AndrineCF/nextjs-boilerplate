import Image from "next/image";
import KontaktOss from "@/components/kontaktOss";

// ─── Konstanter ────────────────────────────────────────────────
const FEATURES = [
  { src: "/ikoner/kart.png", label: "Lokal tilpasning" },
  { src: "/ikoner/plante.png", label: "Smarte plantevalg" },
  { src: "/ikoner/jordklode.png", label: "Miljøgevinst" },
] as const;

// ─── Delkomponenter ─────────────────────────────────────────────
function FeatureItem({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={src} alt="" width={150} height={150} aria-hidden />
      <span className="text-lg">{label}</span>
    </div>
  );
}

// ─── Seksjoner ──────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative flex min-h-[400px] w-full flex-col items-center gap-8 bg-cover bg-center px-6 py-12 md:flex-row md:px-16 md:py-20 lg:px-24 2xl:px-32"
      style={{ backgroundImage: "url('/img/bakgrunn.png')" }}
    >
      <Image
        src="/img/bygging.png"
        alt="Bygning med grønt tak"
        width={500}
        height={400}
        className="hidden w-full max-w-sm flex-shrink-0 rounded-lg md:block"
        priority
      />
      <div className="flex flex-col gap-4 text-center text-black md:text-left">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Gjør taket grønt med oss!
        </h1>
        <p className="text-base leading-relaxed md:text-lg">
          Med GrøntTak kan du enkelt forvandle taket ditt til et levende økosystem. Få oversikt over riktige planter og løsninger som styrker biologisk mangfold og gjør byggeprosjekter til en del av løsningen på naturkrisen.
        </p>
        <p className="text-base italic md:text-right md:text-lg">
          Velg smart – bygg grønt.
        </p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-6 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">
        Fremtidens tak er grønne
      </h2>
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-center sm:gap-16">
        {FEATURES.map((feature) => (
          <FeatureItem key={feature.src} {...feature} />
        ))}
      </div>
        <a
        href="/om-prosjektet"
        className="text-xl font-bold transition-colors hover:text-brand-green">
        Les mer her →
      </a>
    </section>
  );
}

function ToolSection() {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-light-yellow px-6 py-12 md:py-16">
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-xl border border-black bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-2xl font-bold">Test vårt verktøy her!</h2>
          <p className="text-zinc-600">
            Utforsk hvilke planter som passer best for ditt tak. Velg et område
            og få forslag til lokal flora.
          </p>
            <a
            href="/flora-kart"
            className="text-lg font-bold transition-colors hover:text-brand-green">
            Trykk her →
          </a>
        </div>
        <div className="flex flex-shrink-0 justify-center">
          <Image src="/ikoner/verktoy.png" alt="" width={100} height={100} aria-hidden />
        </div>
      </div>
    </section>
  );
}

// ─── Side ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <ToolSection />
      <KontaktOss />
    </main>
  );
}