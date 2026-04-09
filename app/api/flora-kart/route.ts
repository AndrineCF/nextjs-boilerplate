import { LLM, EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const supabase = await getSupabase();
    const { message } = await request.json();

    const queryEmbedding = await EMBEDDING_MODEL.embedText(message);

    const { data: documents, error: supabaseError } = await supabase.rpc("search_documents", {
      query_embedding: queryEmbedding,
      match_count: 5,
    });

    if (supabaseError) {
      console.error("Supabase feil:", supabaseError);
      return Response.json({ error: supabaseError.message }, { status: 500 });
    }

    const context = documents?.map((d: { content: string }) => d.content).join("\n") ?? "";

    console.log("Antall dokumenter:", documents?.length);
    console.log("Context funnet:", context);
    const response = await LLM.invoke(
  message,
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