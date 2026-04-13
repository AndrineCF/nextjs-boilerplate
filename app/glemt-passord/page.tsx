"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validation";
import { resetPassword } from "@/lib/auth";
import Img from "@/components/Img";

// ─── Delkomponenter ─────────────────────────────────────────────
function SuccessView() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-light-green">
        <CheckCircle size={32} className="text-dark-green" />
      </div>
      <h2 className="text-2xl font-bold">E-post sendt!</h2>
      <p className="max-w-sm text-zinc-500">
        Vi har sendt deg en lenke for å tilbakestille passordet ditt. Sjekk innboksen din.
      </p>
    </div>
  );
}

// ─── Skjema ─────────────────────────────────────────────────────
function ForgotPasswordForm() {
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
      setGeneralError(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  if (success) return <SuccessView />;

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-zinc-900">Glemt passord?</h1>
        <p className="text-zinc-500">
          Skriv inn e-posten din så sender vi deg en lenke for å tilbakestille passordet.
        </p>
      </div>

      {generalError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
        className="w-full rounded-xl bg-dark-green py-3.5 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sender..." : "Send tilbakestillingslenke"}
      </button>
    </div>
  );
}

// ─── Side ───────────────────────────────────────────────────────
export default function GlemtPassord() {
  return (
    <main className="flex min-h-screen">

      {/* Venstre side */}
      <div className="flex w-full max-w-xl flex-col justify-between px-16 py-12">
        <Link href="/">
          <Img imageSrc="/logoer/full-logo.svg" imageAlt="GrøntTak" width={160} height={50} />
        </Link>

        <ForgotPasswordForm />

        <Link
          href="/login"
          className="w-full rounded-xl border-2 border-dark-green py-3.5 text-center font-semibold text-dark-green transition-all hover:bg-light-green"
        >
          Tilbake til innlogging
        </Link>
      </div>

      {/* Høyre side - bilde */}
      <div className="relative hidden flex-1 md:block">
        <Img
          imageSrc="/img/login.png"
          imageAlt="Grønt tak"
          width={1200}
          height={800}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-dark-green/40 p-16">
          <blockquote className="max-w-sm text-2xl font-semibold leading-relaxed text-white">
            "Fremtidens byer er grønne — start med taket."
          </blockquote>
        </div>
      </div>

    </main>
  );
}