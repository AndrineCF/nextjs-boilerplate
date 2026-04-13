import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { Embeddings } from "@langchain/core/embeddings";
import { LlmGroq } from "@/lib/llm";

// ─── Embeddings ───────────────────────────────────────────────────────────────

class HFEmbeddings extends Embeddings {
  private model: HuggingFaceInferenceEmbeddings;

  constructor() {
    super({});
    this.model = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACEHUB_API_TOKEN,
      model: "intfloat/multilingual-e5-large",
    });
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    return this.model.embedDocuments(documents);
  }

  async embedQuery(query: string): Promise<number[]> {
    return this.model.embedQuery(query);
  }
}

// ─── Eksporter ────────────────────────────────────────────────────────────────

export const EMBEDDING_MODEL = new HFEmbeddings();
export const LLM = new LlmGroq("llama-3.3-70b-versatile");