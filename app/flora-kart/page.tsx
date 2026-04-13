"use client";

import { useState } from "react";
import { type Message } from "@/lib/llm";

export default function FloraKart() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/flora-kart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: `Feil: ${data.error}` },
        ]);
      } else {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Noe gikk galt. Prøv igjen." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen px-16 py-8 gap-6 2xl:px-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">FloraKart</h1>
        <p className="text-zinc-600">
          Spør om hvilke planter som passer for ditt grønne tak i Trondheim.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto bg-zinc-50 rounded-xl p-6">
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 text-zinc-400 text-sm">
            <p>Eksempelspørsmål:</p>
            <button
              onClick={() => setInput("Hvilke planter passer på et solrikt tak?")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Hvilke planter passer på et solrikt tak?
            </button>
            <button
              onClick={() => setInput("Hvilke planter trenger lite jorddybde?")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Hvilke planter trenger lite jorddybde?
            </button>
            <button
              onClick={() => setInput("Hvilke planter er bra for pollinatorer?")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Hvilke planter er bra for pollinatorer?
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-xl max-w-2xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-dark-green text-white self-end"
                : "bg-light-green self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-light-green px-4 py-3 rounded-xl self-start text-zinc-500">
            Skriver...
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Spør om planter for ditt tak..."
          className="flex-1 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-dark-green"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-dark-green text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </main>
  );
}