import Image from "next/image";
import Hero from "@/components/Hero";

export default function OmProsjektet() {
  return (
    <main className="w-full">
      
      <Hero
        title="Om prosjektet"
        description="Prosjektet GrøntTak handler om å gjøre det enklere å velge riktig vegetasjon til grønne tak ut ifra selvvagte preferanser og behov. Dette innebærer bl.a. anbefalt jorddybde, veksthøyde samt behov for solforhold og vedlikehold."
        imageSrc="/img/illustrasjon.png"
        imageAlt="Illustrasjon av folk med planter"
      />

      {/* Hva handler prosjektet om */}
      <section className="flex items-center gap-40 px-16 py-20 2xl:px-44">
        
        {/* Bilde venstre */}
        <div className="flex-shrink-0">
          <Image
            src="/img/gronnetak.png"
            alt="Grønne tak i by"
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Tekst høyre */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Hva handler prosjekt om?</h2>
          <div className="w-full h-1 bg-dark-green" />
          <p className="text-lg leading-relaxed text-zinc-700">
            Implementering av grønne tak har i de siste år økt i popularitet, 
            spesielt i urbane strøk som en pustende, estetisk og grønn del av bylivet. 
            I takt med fortetting og færre grønne flater er grønne tak et viktig 
            miljøtiltak i byer fordi de styrker lokal flora og biologisk mangfold 
            ved å skape nye leveområder for planter og insekter. I tillegg til påvist 
            positiv effekt på menneskers mentale helse ved å være en aktiv del av 
            hverdagen bidrar vegetasjonen til bedre bymiljø ved å fange svevestøv, 
            binde CO₂ og håndtere overvann.
          </p>
        </div>

      </section>

       {/* Vårt datagrunnlag */}
      <section className="flex items-center gap-40 px-16 py-20 2xl:px-44">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">Vårt datagrunnlag</h2>
          <div className="w-full h-1 bg-dark-green" />
          <div className="flex flex-col gap-4">
            <p className="text-lg leading-relaxed text-zinc-700">
              Datagrunnlaget for verktøyet er basert på artsobservasjoner fra Artsdatabanken, hentet gjennom karttjenesten Artskart. Datasettene ble filtrert til å omfatte karplanter registrert i Trondheim kommune fra 1975 og frem til i dag, noe som ga et utgangspunkt på rundt 70 000 observasjoner.
            </p>
            <p className="text-lg leading-relaxed text-zinc-700">
              For å gjøre datasettet relevant for bruk på grønne tak ble det gjennomført en stegvis filtreringsprosess. Fremmede arter og rødlistede arter (RE, CR, EN og VU) ble fjernet, sammen med arter som ikke egner seg for takmiljøer, som trær, skogbunnsarter og planter med høyt fuktighetsbehov. Videre ble artene vurdert etter stedegenhet og tilpasning til tørre, næringsfattige vekstforhold
            </p>
            <p className="text-lg leading-relaxed text-zinc-700">
              Til slutt ble listen avgrenset til arter som også er tilgjengelige på markedet. Resultatet er et datasett på 58 stedegne 
plantearter som kan fungere på grønne tak i Trondheim. For hver art er det lagt til informasjon om blant annet solforhold, jorddybde, vindeksponering, pollinatorverdi og etableringsmetode, slik at de kan filtreres og brukes i planlegging av habitattak.
            </p>
          </div>
        </div>
      </section>
      
      <section className="flex flex-col w-full items-center px-6 py-16 gap-12 bg-light-yellow">
        <h2 className="text-3xl font-bold">Våre verdier</h2>
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
      </section>

      {/* FN bærekraftsmål */}
      <section className="flex items-center justify-center  gap-30 px-16 py-20 2xl:px-40">
            
        {/* Tekst venstre */}
        <div className="flex-shrink-0 w-48">
          <h2 className="text-2xl font-bold text-center">FN bærekraftsmål for prosjekt</h2>
        </div>

        {/* Grid med ikoner høyre */}
        <div className="grid grid-cols-3 gap-20">
          <Image src="/img/fn/fn11.png" alt="Bærekraftige byer og lokalsamfunn" width={180} height={180} className="rounded-md" />
          <Image src="/img/fn/fn13.png" alt="Stoppe klimaendringene" width={180} height={180} className="rounded-md" />
          <Image src="/img/fn/fn7.png" alt="Ren energi til alle" width={180} height={180} className="rounded-md" />
          <Image src="/img/fn/fn15.png" alt="Livet på land" width={180} height={180} className="rounded-md" />
          <Image src="/img/fn/fn3.png" alt="God helse og livskvalitet" width={180} height={180} className="rounded-md" />
          <Image src="/img/fn/fn6.png" alt="Rent vann og gode sanitærforhold" width={180} height={180} className="rounded-md" />
        </div>

      </section>

    </main>
  );
}