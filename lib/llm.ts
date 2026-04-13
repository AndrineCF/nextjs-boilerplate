// ─── Typer ───────────────────────────────────────────────────────────────────

export interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Klasse ───────────────────────────────────────────────────────────────────

export class LlmGroq {
  private apiKey: string;
  private model: string;

  constructor(model: string) {
    this.apiKey = process.env.GROQ_API_KEY ?? "";
    this.model = model;
  }

  /**
   * Sender melding til Groq med valgfri samtalehistorikk og system prompt.
   *
   * @param message      - Brukerens siste melding
   * @param history      - Tidligere meldinger i samtalen
   * @param systemPrompt - Valgfri system prompt
   */
  async invoke(
    message: string,
    history: Message[] = [],
    systemPrompt?: string
  ): Promise<string> {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content:
                systemPrompt ?? "Du er en hjelpsom assistent for GrøntTak.",
            },
            ...history,
            { role: "user", content: message },
          ],
          max_tokens: 512,
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API feil: ${response.status} – ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content ?? "Ingen respons fra modellen.";
  }
}
