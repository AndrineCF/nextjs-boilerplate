import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { Embeddings } from "@langchain/core/embeddings";

// ─── Typer ───────────────────────────────────────────────────────────────────

interface EmbeddingsConfig {
  modelName: string;
  apiKey?: string;
}

// ─── Klasse ───────────────────────────────────────────────────────────────────

export class SentenceTransformerEmbeddings extends Embeddings {
  private apiModel: HuggingFaceInferenceEmbeddings;

  constructor(config: EmbeddingsConfig) {
    super({});

    console.log("🌐 Using HuggingFace Inference API...");
    this.apiModel = new HuggingFaceInferenceEmbeddings({
      apiKey: config.apiKey ?? process.env.HUGGINGFACEHUB_API_TOKEN,
      model: config.modelName,
    });
    console.log("✅ API embeddings ready");
  }

  getModel() {
    return this.apiModel;
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    return this.apiModel.embedDocuments(documents);
  }

  async embedQuery(query: string): Promise<number[]> {
    return this.apiModel.embedQuery(query);
  }
}