import { SentenceTransformerEmbeddings } from "@/lib/embeddings";
import { LlmGroq } from "@/lib/llm";

export const EMBEDDING_MODEL = new SentenceTransformerEmbeddings({
  mode: "api",
  modelName: "intfloat/multilingual-e5-large",
  apiKey: process.env.HUGGINGFACEHUB_API_TOKEN,
});

export const LLM = new LlmGroq("llama-3.3-70b-versatile");
