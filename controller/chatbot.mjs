import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_TOKEN,
  model: process.env.LARGE_LLM ?? "BAAI/bge-base-en-v1.5"
});

console.log(embeddings);