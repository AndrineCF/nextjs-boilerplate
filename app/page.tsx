import Image from "next/image";
import KontaktOss from "@/components/kontaktOss" 

export default function Home() {
  return (
    <main className="w-full">

      {/* Hero */}
      <section
        className="relative w-full flex flex-col md:flex-row items-center px-6 py-12 gap-8 min-h-[400px] md:px-16 md:py-20 lg:px-24 2xl:px-32"
        style={{
          backgroundImage: `url('/img/bakgrunn.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src="/img/bygging.png"
          alt="Grønt tak"
          width={500}
          height={400}
          className="rounded-lg flex-shrink-0 w-full max-w-sm hidden md:block"
        />
        <div className="flex flex-col gap-4 text-black text-center md:text-left">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Gjør taket grønt med oss!</h1>
          <p className="text-base leading-relaxed md:text-lg">
            Med GrøntTak får du oversikt over lokal flora, anbefalinger for samplanting og miljøeffekt.
            Planlegg et grønt tak som styrker biologisk mangfold.
          </p>
          <p className="italic text-base md:text-lg md:text-right">Velg område. Få forslag. Bygg grønnere.</p>
        </div>
      </section>

      {/* Fremtidens tak */}
      <section className="flex flex-col w-full items-center px-6 py-12 gap-10 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl text-center">Fremtidens tak er grønne</h2>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-center sm:gap-16">
          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/kart.png" alt="" width={150} height={150} />
            <span className="text-lg">Lokal tilpasning</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/plante.png" alt="" width={150} height={150} />
            <span className="text-lg">Smarte plantevalg</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/jordklode.png" alt="" width={150} height={150} />
            <span className="text-lg">Miljøgevinst</span>
          </div>
        </div>
        <a href="/om-prosjektet" className="text-xl font-bold hover:text-brand-green transition-colors">
          Les mer her →
        </a>
      </section>

      {/* Verktøy */}
      <section className="flex flex-col w-full items-center px-6 py-12 gap-8 bg-light-yellow md:py-16">
        <div className="flex flex-col gap-6 bg-white rounded-xl border border-black p-6 w-full max-w-2xl md:flex-row md:items-center md:gap-8 md:p-8">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-2xl font-bold">Test vårt verktøy her!</h2>
            <p className="text-zinc-600">
              Utforsk hvilke planter som passer best for ditt tak. Velg et område og få forslag til lokal flora.
            </p>
            <a href="/flora-kart" className="text-lg font-bold hover:text-brand-green transition-colors">
              Trykk her →
            </a>
          </div>
          <div className="flex-shrink-0 flex justify-center">
            <Image src="/ikoner/verktoy.png" alt="" width={100} height={100} />
          </div>
        </div>
      </section>

      <KontaktOss />

    </main>
  );
}