"use client";

import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import { deleteAccount } from "@/lib/settings";
import { useRouter } from "next/navigation";

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
      setError(String(e));
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
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
          className="flex items-center gap-2 text-red-600 border border-red-200 px-6 py-3 rounded-xl hover:bg-red-50 transition-all w-fit font-medium text-sm"
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
              className="bg-red-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-60"
            >
              {loading ? "Sletter..." : "Ja, slett kontoen min"}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="border border-zinc-200 text-zinc-700 font-semibold py-2.5 px-6 rounded-xl hover:bg-zinc-50 transition-all text-sm"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}