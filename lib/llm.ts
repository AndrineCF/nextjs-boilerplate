export class LlmGroq {
  private apiKey: string;
  private model: string;

  constructor(model: string) {
    this.apiKey = process.env.GROQ_API_KEY ?? "";
    this.model = model;
  }

  async invoke(message: string, systemPrompt?: string) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt ?? "Du er en hjelpsom assistent for GrøntTak." },
          { role: "user", content: message },
        ],
        max_tokens: 512,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}