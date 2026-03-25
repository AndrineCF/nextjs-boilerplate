import { LlmGroq } from "./llm";
import { Embeddings } from "./embeddings";

export const LLM = new LlmGroq("llama-3.1-8b-instant");
export const EMBEDDING_MODEL = new Embeddings("intfloat/multilingual-e5-large");