"use client";

import { useState } from "react";
import { User, Mail, Calendar, Pencil, Check, X } from "lucide-react";
import { type Profile, formatMemberSince } from "@/lib/profile";
import { updateNavn } from "@/lib/settings";

interface Props {
  profile: Profile;
}

export default function ProfileInfo({ profile }: Props) {
  const [editingNavn, setEditingNavn] = useState(false);
  const [navn, setNavn] = useState(profile.navn ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSaveNavn() {
    setLoading(true);
    setError("");
    try {
      await updateNavn(navn);
      setEditingNavn(false);
    } catch {
      setError("Kunne ikke lagre navn. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setEditingNavn(false);
    setNavn(profile.navn ?? "");
    setError("");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <div className="border-b border-zinc-100 px-6 py-4">
        <h2 className="font-semibold text-zinc-900">Kontoinformasjon</h2>
      </div>
      <div className="divide-y divide-zinc-50">

        {/* Navn */}
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-light-green">
            <User size={16} className="text-dark-green" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-zinc-400">Navn</p>
            {editingNavn ? (
              <div className="flex flex-col gap-1">
                <input
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-1.5 text-sm focus:border-dark-green focus:outline-none"
                  autoFocus
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
            ) : (
              <p className="text-sm font-medium text-zinc-800">{profile.navn ?? "Ikke satt"}</p>
            )}
          </div>
          {editingNavn ? (
            <div className="flex gap-2">
              <button
                onClick={handleSaveNavn}
                disabled={loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-green transition-opacity hover:opacity-90 disabled:opacity-60"
                aria-label="Lagre navn"
              >
                <Check size={16} className="text-white" />
              </button>
              <button
                onClick={handleCancel}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 transition-colors hover:bg-zinc-200"
                aria-label="Avbryt"
              >
                <X size={16} className="text-zinc-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingNavn(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 transition-colors hover:bg-zinc-200"
              aria-label="Rediger navn"
            >
              <Pencil size={16} className="text-zinc-600" />
            </button>
          )}
        </div>

        {/* E-post */}
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-light-green">
            <Mail size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">E-post</p>
            <p className="text-sm font-medium text-zinc-800">{profile.email}</p>
          </div>
        </div>

        {/* Medlem siden */}
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-light-green">
            <Calendar size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Medlem siden</p>
            <p className="text-sm font-medium text-zinc-800">{formatMemberSince(profile.opprettet_at)}</p>
          </div>
        </div>

      </div>
    </div>
  );
}