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

    const response = await LLM.invoke(
      message,
      `Du er FloraKart-assistenten for GrøntTak, et verktøy som hjelper folk velge riktige planter for grønne tak i Trondheim.

REGLER DU MÅ FØLGE:
- Svar KUN basert på planteinformasjonen du får oppgitt nedenfor
- Hvis spørsmålet ikke handler om planter eller grønne tak, si at du kun kan hjelpe med plantevalg for grønne tak
- Hvis du ikke finner relevant informasjon i dataen, si tydelig: "Jeg finner ikke informasjon om dette i databasen vår"
- Ikke finn opp eller gjett informasjon om planter som ikke er i dataen
- Svar alltid på norsk
- Vær hjelpsom og konkret - gi spesifikke plantenavn og egenskaper når du kan
- Hvis brukeren spør om noe utenfor tema, si høflig at du kun er her for å hjelpe med plantevalg for grønne tak i Trondheim

PLANTEINFORMASJON FRA DATABASEN:
${context === "" ? "Ingen relevant planteinformasjon funnet for dette spørsmålet." : context}`
    );

    return Response.json({ response });

  } catch (error) {
    console.error("Feil:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}