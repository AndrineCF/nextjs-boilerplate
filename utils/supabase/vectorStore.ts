import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@/utils/supabase/client";

let supabaseClient = createClient();

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});