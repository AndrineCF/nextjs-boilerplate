"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/flora-kart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const assistantMessage: Message = { role: "assistant", content: data.response };
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  }

  return (
    <main className="flex flex-col h-screen max-w-3xl mx-auto px-6 py-8 gap-4">
      
      <h1 className="text-2xl font-bold">Chat</h1>

      {/* Meldinger */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-xl max-w-xl ${
              msg.role === "user"
                ? "bg-brand-green text-white self-end"
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

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Skriv en melding..."
          className="flex-1 border border-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green"
        />
        <button
          onClick={sendMessage}
          className="bg-brand-green text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>

    </main>
  );
}