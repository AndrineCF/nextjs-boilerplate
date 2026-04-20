import { LLM, EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase } from "@/lib/supabase";
import { type Message } from "@/lib/llm";

// Konverterer norsk plantenavn til URL for bildet i public/planter/
function findImageUrl(norskNavn: string): string {
  const filnavn = norskNavn.trim().charAt(0).toUpperCase() + norskNavn.trim().slice(1);
  return `/planter/${filnavn}.png`;
}

// Sjekker hvilke av de hentede plantene som faktisk nevnes i LLM-svaret
function findMentionedPlants(
  response: string,
  documents: { metadata: { norsk_navn?: string } }[]
): { navn: string; imageUrl: string }[] {
  const responseLower = response.toLowerCase();

  return documents
    .filter((doc) => {
      const navn = doc.metadata?.norsk_navn;
      if (!navn) return false;
      // Sjekk om plantenavnet finnes i svaret
      return responseLower.includes(navn.toLowerCase());
    })
    .map((doc) => ({
      navn: doc.metadata.norsk_navn!,
      imageUrl: findImageUrl(doc.metadata.norsk_navn!),
    }));
}

export async function POST(request: Request) {
  try {
    const supabase = await getSupabase();

    const {
      message,
      history = [],
    }: { message: string; history: Message[] } = await request.json();

    if (!message?.trim()) {
      return Response.json({ error: "Melding mangler." }, { status: 400 });
    }

    // Embed brukerens spørsmål til en vektor for similarity search
    const queryEmbedding = await EMBEDDING_MODEL.embedQuery(message);

    // Søk i Supabase etter de 5 mest relevante plantene
    const { data: documents, error: supabaseError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: queryEmbedding,
        match_count: 5,
        filter: {},
      }
    );

    if (supabaseError) {
      console.error("Supabase feil:", supabaseError);
      return Response.json({ error: supabaseError.message }, { status: 500 });
    }

    console.log("Antall dokumenter hentet:", documents?.length ?? 0);

    // Slå sammen innholdet fra alle dokumenter til én konteksttekst
    const context =
      documents
        ?.map((d: { content: string }) => d.content)
        .join("\n---\n") ?? "";

    // Send spørsmål, historikk og plantekontekst til Groq
    const response = await LLM.invoke(
      message,
      history,
      `Du er FloraKart-assistenten for GrøntTak. Du hjelper folk velge planter for grønne tak i Trondheim.

KRITISKE REGLER - DISSE MÅ DU ALLTID FØLGE:
1. Du skal KUN nevne planter som er listet i PLANTEINFORMASJON nedenfor
2. Hvis en plante ikke er i listen, skal du IKKE nevne den
3. Du skal ALDRI finne opp eller gjette planteegenskaper
4. Hvis du ikke finner relevante planter i dataen, si: "Jeg finner ingen passende planter for dette i databasen vår"
5. Svar alltid på norsk
6. Hold deg til tema - planter og grønne tak i Trondheim
7. Avslutt ALLTID svaret ditt med denne setningen på en ny linje: "For best mulig tilpasning til det lokale miljøet anbefales det å rådføre seg med en økolog."
8. Still gjerne oppfølgingsspørsmål om prosjektet hvis du trenger mer informasjon for å gi gode planteforslag, som solforhold, jorddybde eller vindeksponering.

PLANTEINFORMASJON FRA DATABASEN (kun disse plantene eksisterer):
${context === ""
  ? "INGEN PLANTER FUNNET - Si at du ikke har data om dette"
  : context}

Basér svaret ditt KUN på plantene listet ovenfor. Ikke nevn andre planter.`
    );

    // Finn alle planter som faktisk ble nevnt i svaret og hent bilder
    const mentionedPlants = findMentionedPlants(response, documents ?? []);
    console.log("Nevnte planter:", mentionedPlants.map((p) => p.navn));

    return Response.json({ response, plants: mentionedPlants });
  } catch (error) {
    console.error("Feil:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}