"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { updateNavnSchema, type UpdateNavnFormData } from "@/lib/validation";
import { updateNavn } from "@/lib/settings";

export default function UpdateNavnForm({ currentNavn }: { currentNavn?: string }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateNavnFormData>({
    resolver: zodResolver(updateNavnSchema),
    defaultValues: { navn: currentNavn ?? "" },
  });

  async function onSubmit(data: UpdateNavnFormData) {
    setError("");
    setSuccess(false);
    try {
      await updateNavn(data.navn);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle size={16} />
          Navn oppdatert!
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">Navn</label>
        <input
          {...register("navn")}
          type="text"
          placeholder="Ola Nordmann"
          className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
            errors.navn
              ? "border-red-400 focus:ring-red-100"
              : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
          }`}
        />
        {errors.navn && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle size={14} />
            {errors.navn.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-dark-green px-8 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Lagre navn"}
      </button>
    </div>
  );
}