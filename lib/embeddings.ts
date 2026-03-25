import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export class Embeddings {
  private model: HuggingFaceInferenceEmbeddings;

  constructor(modelName: string) {
    this.model = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACEHUB_API_TOKEN,
      model: modelName,
    });
  }

  getEmbeddings() {
    return this.model;
  }

  async embedText(text: string) {
    return this.model.embedQuery(text);
  }
}