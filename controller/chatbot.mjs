import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_TOKEN, // Defaults to process.env.HUGGINGFACEHUB_API_KEY
  model: process.env.LARGE_LLM // Defaults to `BAAI/bge-base-en-v1.5` if not provided
});

console.log(embeddings)