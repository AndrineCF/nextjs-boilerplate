import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">
      <Hero
        title="Gjør taket grønt med oss!"
        description="Med GrøntTak får du oversikt over lokal flora, anbefalinger for samplanting og miljøeffekt. Planlegg et grønt tak som styrker biologisk mangfold."
        tagline="Velg område. Få forslag. Bygg grønnere."
        imageSrc="/bygging.png"
        imageAlt="Grønt tak"
      />
      <section className="flex flex-col w-full items-center px-6 py-16 gap-12">
        
        <h2 className="text-3xl font-bold">Fremtidens tak er grønne</h2>

        <div className="flex flex-row justify-center gap-24">
          
          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/kart.png" alt="" width={350} height={350} />
            <span className="text-lg">Lokal tilpasning</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/plante.png" alt="" width={350} height={350}  />
            <span className="text-lg">Smarte plantevalg</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Image src="/ikoner/jordklode.png" alt="" width={350} height={350}  />
            <span className="text-lg">Miljøgevinst</span>
          </div>

        </div>

        <a href="/om-prosjektet" className="text-xl font-bold hover:text-brand-green transition-colors">
          Les mer her →
        </a>
      </section>
      
      <section className="flex flex-col w-full items-center px-6 py-16 gap-12 bg-light-yellow">

      </section>
      <section className="flex flex-col w-full items-center px-6 py-16 gap-12">

      </section>
    </main>
  );
}