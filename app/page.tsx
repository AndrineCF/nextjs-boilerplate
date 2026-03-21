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
      <section className="flex flex-col w-full items-center px-6 py-12 min-h-screen md:min-h-[600px] md:px-20 md:py-16">
        <div className="text-2xl font-bold md:text-3xl">Fremtidens tak er grønne</div>
        <div className="flex flex-row">
          <div className="items-center">
            <Image
              src={"/ikoner/kart.png"}
              alt={""}
              width={400}
              height={400}
              className="rounded-lg"
              />
              <div className="text-center">Lokal tilpasning</div>
          </div>
          <div className="items-center">
            <Image
              src={"/ikoner/plante.png"}
              alt={""}
              width={400}
              height={400}
              className="rounded-lg"
              />
              <div className="text-center">Lokal tilpasning</div>
          </div>

          <div className="items-center">
            <Image
              src={"/ikoner/kart.png"}
              alt={""}
              width={400}
              height={400}
              className="rounded-lg"
              />
              <div className="text-center">Lokal tilpasning</div>
          </div>

        </div>

      </section>
    </main>
  );
}