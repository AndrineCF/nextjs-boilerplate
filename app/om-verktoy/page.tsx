import Image from "next/image";
import Hero from "@/components/Hero";

export default function OmProsjektet() {
  return (
    <main className="w-full">
      
      <Hero
        title="Vårt verktøy"
        description="Valg av planter til grønne tak avgjør hvor robust og lettdrevet taket blir. Når vegetasjonen tilpasses sol, vind, jorddybde og fuktighet, kan taket tilpasses vedlikeholdønsker, estetikk og ønsket bidrag til det lokale økosystemet. 

        Her vises miljøgevinstene av riktige plantevalg, og hvordan verktøyet vårt hjelper deg å finne arter som passer prosjektet ditt."
        imageSrc="/ikoner/plante-verktoy.svg"
        imageAlt="Illustrasjon av folk med planter"
      />
  {/* Hva handler prosjektet om */}
      <section className="flex items-center gap-40 px-16 py-20 2xl:px-44">
        
        {/* Bilde venstre */}
        <div className="flex-shrink-0">
          <Image
            src="/img/Plantevalgapp.png"
            alt="Plantevalgapp med solskinn og luft"
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Tekst høyre */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Hva hjelper vårt verktøy med?</h2>
          <div className="w-full h-1 bg-dark-green" />
            <p className="text-lg leading-relaxed text-zinc-700">
            Verktøyet vårt gjør det enklere å velge riktige arter ved å samle relevante plantealternativer og gjøre dem søkbare og sammenlignbare. Du kan filtrere og velge ut fra faktorer som sol, vind, jorddybde, veksthøyde, etableringsmetode, driftstype, samt pollinatorverdi og økologisk rolle.
            </p>
            <p className="text-lg leading-relaxed text-zinc-700">
            Resultatet er et mer treffsikkert plantevalg bidrar til å oppnå prosjektmålene, enten det er lavt vedlikehold, estetikk eller høy natur- og miljøverdi.
          </p>
        </div>
      </section>

      <section className="flex flex-col w-full items-center px-60 py-20 gap-12 bg-light-yellow">
         <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">Miljøgevinst</h2>
          <div className="w-full h-1 bg-dark-green" />
          <div className="flex flex-col gap-4">
            <p className="text-lg leading-relaxed text-zinc-700">
              Riktig plantevalg kan gjøre grønne tak til mer enn et visuelt tiltak. Når artene er tilpasset lokale forhold, kan taket bidra til økt biodiversitet ved å gi mat- og leveområder for pollinerende insekter og støtte lokale økologiske sammenhenger.
              </p>
            <p className="text-lg leading-relaxed text-zinc-700">
             Vegetasjon og vekstmedium kan holde tilbake nedbør, forsinke avrenning og øke fordamping, noe som kan avlaste overvannssystemer ved kraftig regn. Grønne tak kan også bidra til opptak og lagring av karbon ved at CO₂ bindes i biomasse og delvis i vekstmediet over tid, samtidig som de kan dempe varmebelastning i byområder gjennom skygge og naturlig kjøling.
             </p>
            <p className="text-lg leading-relaxed text-zinc-700">
             I tillegg kan vegetasjonen fange opp partikler og redusere støv, og den kan beskytte takmembranen mot UV-stråling og temperatursvingninger, som kan gi lengre levetid. Miljøgevinsten avhenger likevel av at plantene faktisk etablerer seg og trives, derfor er artsvalg og driftstype avgjørende.
             </p>
          </div>
        </div>
      </section>

       <section className="flex items-center gap-40 px-16 py-20 2xl:px-44">
        
        

        {/* Tekst høyre */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Smarte plantevalg</h2>
          <div className="w-full h-1 bg-dark-green" />
            <p className="text-lg leading-relaxed text-zinc-700">
            Valg av planter til grønne tak påvirkes av flere forhold og er avgjørende for om taket blir robust og enkelt å drifte. Med riktig artsvalg tilpasset sol, vind, jorddybde og fuktighet får du bedre etablering, jevnere dekke og mindre behov for vanning og etterplanting.
            </p>
            <p className="text-lg leading-relaxed text-zinc-700">
            Ulike prosjekter kan prioritere lavt vedlikehold, et bestemt estetisk uttrykk eller høy økologisk verdi, for eksempel god støtte til pollinatorer. Feil plantevalg gir ofte glisne partier og høyere driftskostnader over tid
            </p>
        </div>

        {/* Bilde venstre */}
        <div className="flex-shrink-0">
          <Image
            src="/img/smartPlante.png"
            alt="Grønne tak og smarte valg"
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

    </main>
  );
}