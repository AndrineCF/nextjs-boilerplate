import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";
import { Embeddings } from "@langchain/core/embeddings";

// ─── Typer ───────────────────────────────────────────────────────────────────

type EmbeddingMode = "api" | "local";

interface EmbeddingsConfig {
  modelName: string;
  mode: EmbeddingMode;
  storedPathModel?: string; // Kun nødvendig ved "local"
  apiKey?: string;          // Kun nødvendig ved "api"
}

// ─── Klasse ───────────────────────────────────────────────────────────────────

export class SentenceTransformerEmbeddings extends Embeddings {
  private localModel?: FeatureExtractionPipeline;
  private apiModel?: HuggingFaceInferenceEmbeddings;
  private config: EmbeddingsConfig;

  constructor(config: EmbeddingsConfig) {
    super({});
    this.config = config;

    if (config.mode === "api") {
      console.log("🌐 Using HuggingFace Inference API...");
      this.apiModel = new HuggingFaceInferenceEmbeddings({
        apiKey: config.apiKey ?? process.env.HUGGINGFACEHUB_API_TOKEN,
        model: config.modelName,
      });
      console.log("✅ API embeddings ready");
    }
  }

  /**
   * Kun nødvendig ved mode = "local".
   * Laster ned og initialiserer lokal modell.
   */
  async initialize(): Promise<void> {
    if (this.config.mode !== "local") return;

    console.log("💻 Loading local embeddings model...");
    this.localModel = await pipeline(
      "feature-extraction",
      this.config.modelName,
      { cache_dir: this.config.storedPathModel }
    );
    console.log("✅ Local embeddings model loaded");
  }

  getModel() {
    return this.config.mode === "api" ? this.apiModel : this.localModel;
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    if (this.config.mode === "api" && this.apiModel) {
      return this.apiModel.embedDocuments(documents);
    }

    if (this.config.mode === "local" && this.localModel) {
      return Promise.all(
        documents.map(async (doc) => {
          const output = await this.localModel!(doc, {
            pooling: "mean",
            normalize: true,
          });
          return Array.from(output.data) as number[];
        })
      );
    }

    throw new Error(
      'Model not initialized. Call initialize() first for "local" mode.'
    );
  }

  async embedQuery(query: string): Promise<number[]> {
    if (this.config.mode === "api" && this.apiModel) {
      return this.apiModel.embedQuery(query);
    }

    if (this.config.mode === "local" && this.localModel) {
      const output = await this.localModel(query, {
        pooling: "mean",
        normalize: true,
      });
      return Array.from(output.data) as number[];
    }

    throw new Error(
      'Model not initialized. Call initialize() first for "local" mode.'
    );
  }
}
