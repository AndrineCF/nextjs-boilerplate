import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export async function GET() {
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACEHUB_API_TOKEN,
    model: process.env.LARGE_LLM ?? "BAAI/bge-base-en-v1.5"
  });
  console.log(embeddings);
  const result = await embeddings.embedQuery("test setning");

  return Response.json({ result });
}