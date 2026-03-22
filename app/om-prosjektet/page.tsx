import Image from "next/image";

export default function OmProsjektet() {
  return (
    <main className="w-full">
      
      {/* Hero seksjon */}
      <section className="relative w-full bg-light-green flex items-end px-16 py-16 min-h-[450px]">
        
        {/* Tekst venstre */}
        <div className="flex flex-col gap-6 max-w-lg z-10">
          <h1 className="text-4xl font-bold">Om prosjektet</h1>
          <p className="text-lg leading-relaxed text-zinc-700">
            Prosjektet GrøntTak handler om å gjøre det enklere å velge riktig
            vegetasjon til grønne tak ut ifra selvvagte preferanser og behov.
            Dette innebærer bl.a. anbefalt jorddybde, veksthøyde samt
            behov for solforhold og vedlikehold.
          </p>
        </div>

        {/* Bilde høyre - mot bunnen */}
        <div className="absolute bottom-0 right-16">
          <Image
            src="/illustrasjon.png"
            alt="Illustrasjon av folk med planter"
            width={500}
            height={350}
            className="object-contain"
          />
        </div>

      </section>

    </main>
  );
}