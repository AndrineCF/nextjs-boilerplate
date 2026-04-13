"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Trash2 } from "lucide-react";
import { deleteAccount } from "@/lib/settings";

export default function DeleteAccountSection() {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteAccount();
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      <p className="text-sm text-zinc-500">
        Når kontoen er slettet kan den ikke gjenopprettes. All din data vil bli permanent slettet.
      </p>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="flex w-fit items-center gap-2 rounded-xl border border-red-200 px-6 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
        >
          <Trash2 size={16} />
          Slett konto
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-red-600">Er du sikker? Dette kan ikke angres.</p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sletter..." : "Ja, slett kontoen min"}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="rounded-xl border border-zinc-200 px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}