import { LLM, EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
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
      `Du er en hjelpsom assistent for GrøntTak som hjelper folk velge riktige planter for grønne tak i Trondheim.
      Svar på norsk. Bruk denne planteinformasjonen til å svare:
      ${context}
      Hvis du ikke finner relevant informasjon, si at du ikke har data om det.`
    );

    return Response.json({ response });

  } catch (error) {
    console.error("Feil:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}