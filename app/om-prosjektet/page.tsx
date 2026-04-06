import Image from "next/image";
import Hero from "@/components/Hero";
import Logo from "@/components/Logo";

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
      <section className="flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:gap-16 md:px-16 md:py-20 2xl:px-32">
        <div className="flex-shrink-0 flex justify-center">
          <Image
            src="/img/gronnetak.png"
            alt="Grønne tak i by"
            width={450}
            height={400}
            className="rounded-lg object-cover w-full max-w-sm md:max-w-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">Hva handler prosjektet om?</h2>
          <div className="w-16 h-1 bg-dark-green" />
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              Implementering av grønne tak har i de siste år økt i popularitet, spesielt i urbane strøk som en pustende, estetisk og grønn del av bylivet.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              I takt med fortetting og færre grønne flater er grønne tak et viktig miljøtiltak i byer fordi de styrker lokal flora og biologisk mangfold ved å skape nye leveområder for planter og insekter.
            </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              I tillegg til påvist positiv effekt på menneskers mentale helse bidrar vegetasjonen til bedre bymiljø ved å fange svevestøv, binde CO₂ og håndtere overvann.
            </p>
          </div>
        </div>
      </section>

  

       {/* Vårt datagrunnlag */}
      <section className="flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:gap-16 md:px-16 md:py-20 2xl:px-32">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">vårt datagrunnlag</h2>
          <div className="w-16 h-1 bg-dark-green" />
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
Datagrunnlaget for verktøyet er basert på artsobservasjoner fra Artsdatabanken, hentet gjennom karttjenesten Artskart. Datasettene ble filtrert til å omfatte karplanter registrert i Trondheim kommune fra 1975 og frem til i dag, noe som ga et utgangspunkt på rundt 70 000 observasjoner.           </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              For å gjøre datasettet relevant for bruk på grønne tak ble det gjennomført en stegvis filtreringsprosess. Fremmede arter og rødlistede arter (RE, CR, EN og VU) ble fjernet, sammen med arter som ikke egner seg for takmiljøer, som trær, skogbunnsarter og planter med høyt fuktighetsbehov. Videre ble artene vurdert etter stedegenhet og tilpasning til tørre, næringsfattige vekstforhold
            </p>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              Til slutt ble listen avgrenset til arter som også er tilgjengelige på markedet. Resultatet er et datasett på 58 stedegne plantearter som kan fungere på grønne tak i Trondheim. For hver art er det lagt til informasjon om blant annet solforhold, jorddybde, vindeksponering, pollinatorverdi og etableringsmetode, slik at de kan filtreres og brukes i planlegging av habitattak.
            </p>
          </div>
        </div>
      </section>
      
      {/* Våre verdier */}
      <section className="w-full bg-light-yellow px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:gap-12">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Våre verdier
          </h2>

          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="flex flex-col items-center gap-4">
              <Logo width={200} imageSrc="/ikoner/stedegenNatur.svg" imageAlt=""/>
              <span className="text-center text-base md:text-lg">
                Stedegen natur
              </span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Logo width={200} imageSrc="/ikoner/stedstilpassede.svg" imageAlt=""/>
              <span className="text-center text-base md:text-lg">
                Biologisk mangfold
              </span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Logo width={200} imageSrc="/ikoner/bymiljo.svg" imageAlt=""/>
              <span className="text-center text-base md:text-lg">
                Bedre bymiljø
              </span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Logo width={200} imageSrc="/ikoner/stedstilpassede.svg" imageAlt=""/>
              <span className="text-center text-base md:text-lg">
                Stedstilpassede løsninger
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FN bærekraftsmål */}
      <section className="flex flex-col gap-8 items-center px-6 py-12 md:flex-row md:justify-center md:gap-16 md:px-16 md:py-20 2xl:px-32">
        <div className="flex-shrink-0 w-full max-w-xs text-center md:text-left md:w-48">
          <h2 className="text-2xl font-bold">FN bærekraftsmål for prosjekt</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <Logo width={120} imageSrc="/img/fn/fn3.png" imageAlt="FN bærekraftigmål 3: God helse og livskvalitet"/>
          <Logo width={120} imageSrc="/img/fn/fn6.png" imageAlt="FN bærekraftigmål 6: Rent vann og gode sanitærforhold"/>
          <Logo width={120} imageSrc="/img/fn/fn7.png" imageAlt="FN bærekraftigmål 7: Ren energi til alle"/>
          <Logo width={120} imageSrc="/img/fn/fn11.png" imageAlt="FN bærekraftigmål 11: Bærekraftige byer og lokalsamfunn"/>
          <Logo width={120} imageSrc="/img/fn/fn13.png" imageAlt="FN bærekraftigmål 13: Stoppe klimaendringene"/>
          <Logo width={120} imageSrc="/img/fn/fn15.png" imageAlt="FN bærekraftigmål 15: Livet på land"/>
        </div>
      </section>

    </main>
  );
}