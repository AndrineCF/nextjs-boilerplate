"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { updateNavnSchema, UpdateNavnFormData } from "@/lib/validation";
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
      setError(String(e));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={16} />
          Navn oppdatert!
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
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
          className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
            errors.navn
              ? "border-red-400 focus:ring-red-100"
              : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
          }`}
        />
        {errors.navn && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.navn.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-dark-green text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all w-fit px-8 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Lagre navn"}
      </button>
    </div>
  );
}