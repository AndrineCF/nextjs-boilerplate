"use client";

import { useState } from "react";
import Image from "next/image";
import { type Message } from "@/lib/llm";

interface Plant {
  navn: string;
  imageUrl: string;
}

interface ChatMessage extends Message {
  plants?: Plant[];
}

export default function FloraKart() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hei! Jeg er FloraKart-assistenten for GrøntTak. 🌿

Fortell meg om prosjektet ditt, så hjelper jeg deg med å finne planter som passer på ditt tak.

Her er noen ting du kan beskrive:
- Hvor mye sol får taket ditt?
- Hvor dypt er jordlaget?
- Er taket utsatt for vind?
- Ønsker du planter som er gode for pollinatorer?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Holder styr på hvilket bilde som er åpnet i lightbox
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
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
          history: messages.map(({ role, content }) => ({ role, content })),
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
          {
            role: "assistant",
            content: data.response,
            plants: data.plants ?? [],
          },
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

      {/* ── Lightbox ────────────────────────────────────────────────────────── */}
      {selectedPlant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedPlant(null)}
        >
          <div
            className="relative flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lukk-knapp */}
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:opacity-70 transition-opacity"
            >
              ✕
            </button>

            {/* Stort bilde */}
            <div className="relative w-[600px] h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedPlant.imageUrl}
                alt={selectedPlant.navn}
                fill
                className="object-cover"
              />
            </div>

            {/* Plantenavn under bildet */}
            <span className="text-white text-lg font-semibold capitalize">
              {selectedPlant.navn}
            </span>
          </div>
        </div>
      )}

      {/* ── Topp ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">FloraKart</h1>
        <p className="text-zinc-600">
          Spør om hvilke planter som passer for ditt grønne tak i Trondheim.
        </p>
      </div>

      {/* ── Meldinger ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto bg-zinc-50 rounded-xl p-6">

        {/* Eksempelspørsmål vises kun når bare velkomstmeldingen er der */}
        {messages.length === 1 && (
          <div className="flex flex-col gap-3 text-zinc-400 text-sm mt-2">
            <p>Eksempler:</p>
            <button
              onClick={() => setInput("Jeg har et solrikt tak med 10 cm jorddybde og vil ha planter som er gode for pollinatorer.")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Jeg har et solrikt tak med 10 cm jorddybde og vil ha planter som er gode for pollinatorer.
            </button>
            <button
              onClick={() => setInput("Taket mitt er i halvskygge og utsatt for vind. Hva anbefaler du?")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Taket mitt er i halvskygge og utsatt for vind. Hva anbefaler du?
            </button>
            <button
              onClick={() => setInput("Jeg ønsker planter som bidrar til økt biologisk mangfold og krever lite vedlikehold.")}
              className="text-left hover:text-brand-green transition-colors"
            >
              → Jeg ønsker planter som bidrar til økt biologisk mangfold og krever lite vedlikehold.
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 max-w-2xl ${
              msg.role === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            {/* Tekstboble */}
            <div
              className={`px-4 py-3 rounded-xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-dark-green text-white"
                  : "bg-light-green"
              }`}
            >
              {msg.content}
            </div>

            {/* Bilderekke – klikk for å åpne lightbox */}
            {msg.plants && msg.plants.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-1">
                {msg.plants.map((plant) => (
                  <button
                    key={plant.navn}
                    onClick={() => setSelectedPlant(plant)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="rounded-xl overflow-hidden w-36 h-28 relative ring-2 ring-transparent group-hover:ring-dark-green transition-all">
                      <Image
                        src={plant.imageUrl}
                        alt={plant.navn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).closest("div")!.style.display = "none";
                        }}
                      />
                    </div>
                    {/* Plantenavn under bildet */}
                    <span className="text-xs text-zinc-500 capitalize group-hover:text-dark-green transition-colors">
                      {plant.navn}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="bg-light-green px-4 py-3 rounded-xl self-start text-zinc-500">
            Skriver...
          </div>
        )}
      </div>

      {/* ── Input ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Beskriv prosjektet ditt og få planteforslag..."
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