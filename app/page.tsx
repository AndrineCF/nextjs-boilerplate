import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">

      <section
      className="flex flex-col w-full items-center px-6 py-12 min-h-screen md:min-h-[600px] md:px-20 md:py-16"
      style={{
        backgroundImage: `url('/img/bakgrunn.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Innhold */}
      <div className="relative z-10 flex flex-col gap-8 w-full md:flex-row md:gap-16 md:max-w-7xl md:mx-auto">

        {/* Bilde venstre */}
        <Image
          src="/img/bygging.png"
          alt="Grønt tak"
          width={500}
          height={400}
          className="rounded-lg flex-shrink-0 hidden md:block"
        />

        {/* Tekst høyre */}
        <div className="flex flex-col gap-4 text-black text-center md:text-left">
          <h1 className="text-3xl font-bold md:text-4xl">"Gjør taket grønt med oss!</h1>
          <p className="text-base leading-relaxed md:text-lg">Med GrøntTak får du oversikt over lokal flora, anbefalinger for samplanting og miljøeffekt. Planlegg et grønt tak som styrker biologisk mangfold.</p>
          <p className="italic text-base md:text-lg md:text-right">Velg område. Få forslag. Bygg grønnere.</p>
        </div>

      </div>
    </section>

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
        <div className="flex items-center justify-between bg-white rounded-xl border border-black p-8 max-w-2xl w-full gap-8">
          
          {/* Tekst venstre */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Test vårt verktøy her!</h2>
            <p className="text-zinc-600">
              Utforsk hvilke planter som passer best for ditt tak. Velg et område og få forslag til lokal flora som bidrar til biologisk mangfold og et grønnere bymiljø.
            </p>
            <a href="/om-verktoy" className="text-lg font-bold hover:text-brand-green transition-colors">
              Trykk her →
            </a>
          </div>

          {/* Ikon høyre */}
          <div className="flex-shrink-0">
            <Image src="/ikoner/verktoy.png" alt="" width={120} height={120} />
          </div>

        </div>
    </section>
    
     <section className="flex flex-col w-full items-center px-6 py-16 gap-12">

      <h2 className="text-3xl font-bold">Har du spørsmål? Ta kontakt med oss!</h2>

      <div className="flex items-center justify-center gap-24 w-full">

        {/* Bilde venstre */}
        <Image src="/img/kontakt.png" alt="" width={400} height={400} />

        {/* Kontaktinfo høyre */}
        <div className="flex flex-col w-80">

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/telefon.png" alt="" width={70} height={70} />
            <span className="text-lg">34243242</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/kart.png" alt="" width={70} height={70} />
            <span className="text-lg">Gløshaug 1, 7030 Trondheim</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/email.png" alt="" width={70} height={70} />
            <span className="text-lg">kundservice@grøntak.no</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/klokke.png" alt="" width={70} height={70} />
            <span className="text-lg">man-fre 9-18</span>
          </div>

        </div>
      </div>

    </section>
    </main>
  );
}