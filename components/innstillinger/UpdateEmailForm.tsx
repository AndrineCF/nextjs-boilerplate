"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { updateEmailSchema, UpdateEmailFormData } from "@/lib/validation";
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
      setError(String(e));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={16} />
          E-post oppdatert! Sjekk innboksen din for bekreftelse.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
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
          className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
            errors.email
              ? "border-red-400 focus:ring-red-100"
              : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-dark-green text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all w-fit px-8 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Lagre e-post"}
      </button>
    </div>
  );
}