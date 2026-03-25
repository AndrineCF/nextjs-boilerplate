import { LLM } from "@/lib/config";

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await LLM.invoke(message);

  return Response.json({ response });
}