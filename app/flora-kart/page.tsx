"use client";

import { useState } from "react";
import Image from "next/image";
import { type Message } from "@/lib/llm";

// ─── Typer ───────────────────────────────────────────────────────────────────

interface Plant {
  navn: string;
  imageUrl: string;
}

interface ChatMessage extends Message {
  plants?: Plant[];
}

interface UserProfile {
  solforhold?: string;
  jorddybde?: string;
  vindeksponering?: string;
  pollinatorverdi?: string;
  driftstype?: string;
  estetisk?: string;
}

// ─── Onboarding-spørsmål ─────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: "solforhold",
    spørsmål: "☀️ Hvor mye sol får taket ditt?",
    alternativer: [
      { label: "Full sol", value: "Full sol" },
      { label: "Halvskygge", value: "Halvskygge" },
      { label: "Full sol – tåler halvskygge", value: "Full sol – tåler halvskygge" },
    ],
  },
  {
    key: "jorddybde",
    spørsmål: "🌱 Hvor dypt er jordlaget på taket?",
    alternativer: [
      { label: "Grunt (5–10 cm)", value: "5–10 cm" },
      { label: "Middels (10–20 cm)", value: "10–20 cm" },
      { label: "Dypt (15–30 cm)", value: "15–30 cm" },
    ],
  },
  {
    key: "vindeksponering",
    spørsmål: "💨 Hvor vindutsatt er taket?",
    alternativer: [
      { label: "Lite vind", value: "Lav" },
      { label: "Middels vind", value: "Middels" },
      { label: "Mye vind", value: "Høy" },
    ],
  },
  {
    key: "pollinatorverdi",
    spørsmål: "🐝 Ønsker du planter som er gode for pollinatorer?",
    alternativer: [
      { label: "Ja, høy pollinatorverdi", value: "Høy" },
      { label: "Middels pollinatorverdi", value: "Middels" },
      { label: "Ikke viktig", value: "Lav" },
    ],
  },
  {
    key: "driftstype",
    spørsmål: "🔧 Hvor mye vedlikehold kan du gjøre?",
    alternativer: [
      { label: "Nesten ingen – vedlikeholdsfritt", value: "Nesten vedlikeholdsfri" },
      { label: "Litt – årlig slått", value: "Årlig slått anbefales" },
      { label: "Mer – krever oppfølging", value: "Krever oppfølging" },
    ],
  },
  {
    key: "estetisk",
    spørsmål: "🌸 Hvor viktig er det estetiske utseendet?",
    alternativer: [
      { label: "Veldig viktig – høy estetisk verdi", value: "Høy" },
      { label: "Middels viktig", value: "Middels" },
      { label: "Ikke viktig", value: "Lav" },
    ],
  },
];

// ─── Komponent ────────────────────────────────────────────────────────────────

export default function FloraKart() {
  const [step, setStep] = useState(0); // Hvilket onboarding-spørsmål vi er på
  const [profile, setProfile] = useState<UserProfile>({});
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // ── Velg svar i onboarding ─────────────────────────────────────────────────
  async function handleOnboardingAnswer(key: string, value: string) {
    const updatedProfile = { ...profile, [key]: value };
    setProfile(updatedProfile);

    const currentQuestion = QUESTIONS[step];
    const chosenLabel = currentQuestion.alternativer.find(
      (a) => a.value === value
    )?.label;

    // Legg til bruker- og assistentmelding i chatten
    const userMsg: ChatMessage = {
      role: "user",
      content: chosenLabel ?? value,
    };

    if (step < QUESTIONS.length - 1) {
      // Gå til neste spørsmål
      const nextQuestion = QUESTIONS[step + 1];
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: nextQuestion.spørsmål,
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStep(step + 1);
    } else {
      // Onboarding ferdig – send profilen til API og start chat
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: "Takk! Jeg har nå nok informasjon til å finne de beste plantene for taket ditt. 🌿",
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setOnboardingDone(true);

      // Send automatisk en melding med profilen til API
      await sendProfileToApi(updatedProfile);
    }
  }

  // ── Send profil til API ────────────────────────────────────────────────────
  async function sendProfileToApi(p: UserProfile) {
    setLoading(true);

    const profileMessage = `Mitt tak har følgende egenskaper:
- Solforhold: ${p.solforhold}
- Jorddybde: ${p.jorddybde}
- Vindeksponering: ${p.vindeksponering}
- Ønsket pollinatorverdi: ${p.pollinatorverdi}
- Vedlikeholdsnivå: ${p.driftstype}
- Estetisk verdi: ${p.estetisk}

Hvilke planter anbefaler du?`;

    try {
      const response = await fetch("/api/flora-kart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: profileMessage,
          history: [],
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.error ? `Feil: ${data.error}` : data.response,
          plants: data.plants ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Noe gikk galt. Prøv igjen." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ── Send melding i fri chat ────────────────────────────────────────────────
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

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.error ? `Feil: ${data.error}` : data.response,
          plants: data.plants ?? [],
        },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Noe gikk galt. Prøv igjen." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <main className="flex flex-col h-screen px-16 py-8 gap-6 2xl:px-32">

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {selectedPlant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedPlant(null)}
        >
          <div
            className="relative flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:opacity-70 transition-opacity"
            >
              ✕
            </button>
            <div className="relative w-[600px] h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedPlant.imageUrl}
                alt={selectedPlant.navn}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white text-lg font-semibold capitalize">
              {selectedPlant.navn}
            </span>
          </div>
        </div>
      )}

      {/* ── Topp ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">FloraKart</h1>
        <p className="text-zinc-600">
          Beskriv prosjektet ditt og få oversikt over plantearter som egner seg for ditt tak.
        </p>
      </div>

      {/* ── Chat ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto bg-zinc-50 rounded-xl p-6">

        {/* Velkomstmelding + første spørsmål */}
        {messages.length === 0 && (
          <div className="self-start flex flex-col gap-4 max-w-2xl">
            <div className="bg-light-green px-4 py-3 rounded-xl whitespace-pre-wrap">
              {`Hei! Jeg er FloraKart-assistenten for GrøntTak. 🌿\n\nJeg stiller deg noen korte spørsmål om taket ditt, så finner jeg de best egnede plantene for deg.`}
            </div>
            <div className="bg-light-green px-4 py-3 rounded-xl">
              {currentQuestion.spørsmål}
            </div>
          </div>
        )}

        {/* Tidligere meldinger */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 max-w-2xl ${
              msg.role === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-dark-green text-white"
                  : "bg-light-green"
              }`}
            >
              {msg.content}
            </div>

            {/* Bilderekke */}
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

        {/* Onboarding-knapper */}
        {!onboardingDone && !loading && (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentQuestion.alternativer.map((alt) => (
              <button
                key={alt.value}
                onClick={() => handleOnboardingAnswer(currentQuestion.key, alt.value)}
                className="border border-dark-green text-dark-green px-4 py-2 rounded-xl hover:bg-dark-green hover:text-white transition-colors text-sm"
              >
                {alt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Input (vises kun etter onboarding) ────────────────────────────── */}
      {onboardingDone && (
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            placeholder="Still gjerne oppfølgingsspørsmål..."
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
      )}
    </main>
  );
}