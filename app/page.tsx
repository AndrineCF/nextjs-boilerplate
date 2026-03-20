import Hero from "@/components/Hero";

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
    </main>
  );
}