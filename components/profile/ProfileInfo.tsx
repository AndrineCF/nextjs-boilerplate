"use client";

import { useState } from "react";
import { User, Mail, Calendar, Pencil, Check, X } from "lucide-react";
import { Profile, formatMemberSince } from "@/lib/profile";
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
    } catch (e) {
      setError("Kunne ikke lagre navn. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h2 className="font-semibold text-zinc-900">Kontoinformasjon</h2>
      </div>
      <div className="divide-y divide-zinc-50">

        {/* Navn */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-dark-green" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-zinc-400">Navn</p>
            {editingNavn ? (
              <div className="flex flex-col gap-1">
                <input
                  value={navn}
                  onChange={e => setNavn(e.target.value)}
                  className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-dark-green w-full mt-1"
                  autoFocus
                />
                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}
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
                className="w-8 h-8 rounded-lg bg-dark-green flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                <Check size={16} className="text-white" />
              </button>
              <button
                onClick={() => {
                  setEditingNavn(false);
                  setNavn(profile.navn ?? "");
                  setError("");
                }}
                className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
              >
                <X size={16} className="text-zinc-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingNavn(true)}
              className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              <Pencil size={16} className="text-zinc-600" />
            </button>
          )}
        </div>

        {/* E-post */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">E-post</p>
            <p className="text-sm font-medium text-zinc-800">{profile.email}</p>
          </div>
        </div>

        {/* Medlem siden */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
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