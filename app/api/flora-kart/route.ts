import { LLM, EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = getSupabase();
  const { message } = await request.json();

  // Lag embedding av spørsmålet
  const queryEmbedding = await EMBEDDING_MODEL.embedText(message);

  // Søk i Supabase
  const { data: documents } = await supabase.rpc("search_documents", {
    query_embedding: queryEmbedding,
    match_count: 5,
  });

  // Bygg kontekst fra relevante dokumenter
  const context = documents?.map((d: { content: string }) => d.content).join("\n") ?? "";

  // Send til LLM med kontekst
  const response = await LLM.invoke(
    message,
    `Du er en hjelpsom assistent for GrøntTak som hjelper folk velge riktige planter for grønne tak i Trondheim.
    Svar på norsk. Bruk denne planteinformasjonen til å svare:
    ${context}
    Hvis du ikke finner relevant informasjon, si at du ikke har data om det.`
  );

  return Response.json({ response });
}