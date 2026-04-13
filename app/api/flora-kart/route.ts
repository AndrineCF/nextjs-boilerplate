import { LLM, EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase } from "@/lib/supabase";
import { type Message } from "@/lib/llm";

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

    const queryEmbedding = await EMBEDDING_MODEL.embedQuery(message);

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

    const context =
      documents
        ?.map((d: { content: string }) => d.content)
        .join("\n---\n") ?? "";

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

PLANTEINFORMASJON FRA DATABASEN (kun disse plantene eksisterer):
${context === ""
  ? "INGEN PLANTER FUNNET - Si at du ikke har data om dette"
  : context}

Basér svaret ditt KUN på plantene listet ovenfor. Ikke nevn andre planter.`
    );

    return Response.json({ response });
  } catch (error) {
    console.error("Feil:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}