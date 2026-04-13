"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { updateEmailSchema, type UpdateEmailFormData } from "@/lib/validation";
import { updateEmail } from "@/lib/settings";

export default function UpdateEmailForm({ currentEmail }: { currentEmail?: string }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateEmailFormData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: currentEmail ?? "" },
  });

  async function onSubmit(data: UpdateEmailFormData) {
    setError("");
    setSuccess(false);
    try {
      await updateEmail(data.email);
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
          E-post oppdatert! Sjekk innboksen din for bekreftelse.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">E-post</label>
        <input
          {...register("email")}
          type="email"
          placeholder="navn@epost.no"
          className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-400 focus:ring-red-100"
              : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
          }`}
        />
        {errors.email && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle size={14} />
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-dark-green px-8 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Lagre e-post"}
      </button>
    </div>
  );
}