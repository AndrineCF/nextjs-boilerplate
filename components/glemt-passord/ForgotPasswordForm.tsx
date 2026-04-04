"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validation";
import { resetPassword } from "@/lib/auth";

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setGeneralError("");
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (error) {
      setGeneralError(String(error));
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-light-green flex items-center justify-center">
          <CheckCircle size={32} className="text-dark-green" />
        </div>
        <h2 className="text-2xl font-bold">E-post sendt!</h2>
        <p className="text-zinc-500 max-w-sm">
          Vi har sendt deg en lenke for å tilbakestille passordet ditt. Sjekk innboksen din.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-zinc-900">Glemt passord?</h1>
        <p className="text-zinc-500">Skriv inn e-posten din så sender vi deg en lenke for å tilbakestille passordet.</p>
      </div>

      {generalError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          {generalError}
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
        className="bg-dark-green text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sender..." : "Send tilbakestillingslenke"}
      </button>
    </div>
  );
}