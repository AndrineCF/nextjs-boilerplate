export interface FAQItemData {
  spørsmål: string;
  svar: string;
  kategori: string;
}

export const faqData: FAQItemData[] = [
  {
    kategori: "Om GrøntTak",
    spørsmål: "Hva er GrøntTak?",
    svar: "GrøntTak er et verktøy som hjelper deg å velge riktig vegetasjon til grønne tak i Trondheim. Vi gir deg anbefalinger basert på lokale forhold, solforhold, jorddybde og dine egne preferanser.",
  },
  {
    kategori: "Om GrøntTak",
    spørsmål: "Hvem kan bruke GrøntTak?",
    svar: "GrøntTak er for alle — enten du er privatperson, arkitekt, entreprenør eller kommuneansatt. Alle som ønsker å planlegge eller lære mer om grønne tak i Trondheim kan bruke verktøyet.",
  },
  {
    kategori: "Om GrøntTak",
    spørsmål: "Er GrøntTak gratis å bruke?",
    svar: "Ja, GrøntTak er helt gratis å bruke. Du kan opprette en konto og få tilgang til alle funksjoner uten kostnad.",
  },
  {
    kategori: "Planter og data",
    spørsmål: "Hvilke planter anbefaler GrøntTak?",
    svar: "GrøntTak anbefaler stedegne plantearter som er registrert i Trondheim kommune. Alle anbefalte planter er tilgjengelige på markedet og egner seg for tørre, næringsfattige vekstforhold på tak.",
  },
  {
    kategori: "Planter og data",
    spørsmål: "Hvor kommer plantedataen fra?",
    svar: "Datagrunnlaget er basert på artsobservasjoner fra Artsdatabanken, hentet gjennom karttjenesten Artskart. Datasettene er filtrert til å omfatte karplanter registrert i Trondheim kommune fra 1975 og frem til i dag.",
  },
  {
    kategori: "Planter og data",
    spørsmål: "Hvor mye jorddybde trenger jeg?",
    svar: "Det varierer fra plante til plante. GrøntTak gir deg informasjon om anbefalt jorddybde for hver enkelt art, slik at du kan velge planter som passer til din takkonstruksjon.",
  },
  {
    kategori: "Planter og data",
    spørsmål: "Fungerer grønne tak i Trondheims klima?",
    svar: "Ja! GrøntTak fokuserer nettopp på stedegne arter som er tilpasset klimaet i Trondheim. Disse plantene er hardføre og tåler lokale vind- og temperaturforhold.",
  },
  {
    kategori: "Grønne tak",
    spørsmål: "Hva er et grønt tak?",
    svar: "Et grønt tak er et tak som er helt eller delvis dekket av vegetasjon og vekstmedium. Grønne tak bidrar til biologisk mangfold, reduserer overvann, fanger svevestøv, binder CO₂ og gir bedre isolasjon.",
  },
  {
    kategori: "Grønne tak",
    spørsmål: "Hva koster det å bygge et grønt tak?",
    svar: "Kostnaden varierer avhengig av størrelse, type tak og valg av planter. GrøntTak hjelper deg å velge riktige planter, men vi anbefaler å kontakte en fagperson for prisestimater.",
  },
  {
    kategori: "FloraKart",
    spørsmål: "Hvordan bruker jeg FloraKart?",
    svar: "Gå til FloraKart-siden og still spørsmål om hvilke planter som passer for ditt tak. Du kan spørre om solforhold, jorddybde, pollinatorverdi og mye mer. Verktøyet bruker kunstig intelligens til å gi deg relevante anbefalinger.",
  },
  {
    kategori: "Kontakt",
    spørsmål: "Kan jeg kontakte GrøntTak?",
    svar: "Ja, du kan nå oss på kontakt@grøntak.no eller via kontaktskjemaet på nettsiden. Vi er tilgjengelige mandag til fredag mellom 09:00 og 18:00.",
  },
];

export const kategorier = [...new Set(faqData.map((item) => item.kategori))];