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
  vindeksponering?: string;
  jorddybde?: string;
  oppholdssted?: string;
}

// ─── Onboarding-spørsmål ─────────────────────────────────────────────────────

const QUESTIONS = [
  {
    key: "solforhold",
    spørsmål: "☀️ Hva slags solforhold har taket ditt?",
    alternativer: [
      { label: "Full sol", value: "Full sol" },
      { label: "Skygge", value: "Halvskygge" },
      { label: "Varierende solforhold", value: "Full sol – tåler halvskygge" },
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
    key: "jorddybde",
    spørsmål: "🌱 Hvor dypt er jordlaget på taket?",
    alternativer: [
      { label: "Grunt (5–10 cm)", value: "5–10 cm" },
      { label: "Middels (10–20 cm)", value: "10–20 cm" },
      { label: "Dypt (15–30 cm)", value: "15–30 cm" },
    ],
  },
  {
    key: "oppholdssted",
    spørsmål: "🏡 Skal taket brukes som oppholdssted?",
    alternativer: [
      { label: "Ja", value: "ja" },
      { label: "Nei", value: "nei" },
    ],
  },
];

// ─── Komponent ────────────────────────────────────────────────────────────────

export default function FloraKart() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({});
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Velkomstmeldinger er lagret i staten fra start så de aldri forsvinner
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hei! Jeg er FloraKart-assistenten for GrøntTak. 🌿\n\nJeg stiller deg noen korte spørsmål om taket ditt, så finner jeg de best egnede plantene for deg.`,
    },
    {
      role: "assistant",
      content: QUESTIONS[0].spørsmål,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // ── Bygg profilmelding til API ─────────────────────────────────────────────
  function buildProfileMessage(p: UserProfile): string {
    const estetikkInfo =
      p.oppholdssted === "ja"
        ? "Taket skal brukes som oppholdssted, så estetikk er viktig (høy eller middels estetisk verdi)."
        : "Taket skal ikke brukes som oppholdssted, så alle planter kan vurderes uavhengig av estetikk.";

    return `Mitt tak har følgende egenskaper:
- Solforhold: ${p.solforhold}
- Vindeksponering: ${p.vindeksponering}
- Jorddybde: ${p.jorddybde}
- ${estetikkInfo}

Hvilke planter anbefaler du? Inkluder gjerne info om anbefalt substratdybde, vedlikeholdsbehov og pollinatorverdi for hver plante.`;
  }

  // ── Velg svar i onboarding ─────────────────────────────────────────────────
  async function handleOnboardingAnswer(key: string, value: string) {
    const updatedProfile = { ...profile, [key]: value };
    setProfile(updatedProfile);

    const chosenLabel = QUESTIONS[step].alternativer.find(
      (a) => a.value === value
    )?.label;

    const userMsg: ChatMessage = {
      role: "user",
      content: chosenLabel ?? value,
    };

    if (step < QUESTIONS.length - 1) {
      // Gå til neste spørsmål
      const nextQuestion = QUESTIONS[step + 1];
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "assistant", content: nextQuestion.spørsmål },
      ]);
      setStep(step + 1);
    } else {
      // Onboarding ferdig
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          role: "assistant",
          content: "Takk! Jeg finner de beste plantene for taket ditt nå. 🌿",
        },
      ]);
      setOnboardingDone(true);
      await sendProfileToApi(updatedProfile);
    }
  }

  // ── Send profil til API ────────────────────────────────────────────────────
  async function sendProfileToApi(p: UserProfile) {
    setLoading(true);
    const profileMessage = buildProfileMessage(p);

    try {
      const response = await fetch("/api/flora-kart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: profileMessage, history: [] }),
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

        {/* Meldinger */}
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
            {QUESTIONS[step].alternativer.map((alt) => (
              <button
                key={alt.value}
                onClick={() => handleOnboardingAnswer(QUESTIONS[step].key, alt.value)}
                className="border border-dark-green text-dark-green px-4 py-2 rounded-xl hover:bg-dark-green hover:text-white transition-colors text-sm"
              >
                {alt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Input (kun etter onboarding) ──────────────────────────────────── */}
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