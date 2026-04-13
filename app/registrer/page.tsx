"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validation";
import { registerUser } from "@/lib/auth";
import Img from "@/components/Img";

// ─── Delkomponenter ─────────────────────────────────────────────
function FormField({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label}{" "}
        {optional && <span className="text-zinc-400">(valgfri)</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Input-klasser ───────────────────────────────────────────────
function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-100"
      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
  }`;
}

// ─── Suksessvisning ─────────────────────────────────────────────
function SuccessView() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-light-green">
          <CheckCircle size={32} className="text-dark-green" />
        </div>
        <h1 className="text-2xl font-bold">Konto opprettet!</h1>
        <p className="text-zinc-500">Du kan nå logge inn med din nye konto.</p>
        <Link
          href="/login"
          className="rounded-xl bg-dark-green px-8 py-3 font-semibold text-white transition-all hover:opacity-90"
        >
          Gå til innlogging
        </Link>
      </div>
    </main>
  );
}

// ─── Registrer ──────────────────────────────────────────────────
export default function Registrer() {
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setGeneralError("");
    try {
      await registerUser(
        data.email,
        data.password,
        data.fornavn,
        data.etternavn,
        data.telefon,
        data.organisasjon,
      );
      setSuccess(true);
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  if (success) return <SuccessView />;

  return (
    <main className="flex min-h-screen">

      {/* Venstre side */}
      <div className="flex w-full max-w-xl flex-col justify-between px-16 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-zinc-900">Opprett konto</h1>
            <p className="text-zinc-500">Registrer deg for å komme i gang</p>
          </div>

          {generalError && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={18} className="flex-shrink-0" />
              {generalError}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* Fornavn og etternavn */}
            <div className="flex gap-4">
              <FormField label="Fornavn" error={errors.fornavn?.message}>
                <input
                  {...register("fornavn")}
                  type="text"
                  placeholder="Ola"
                  className={inputClass(!!errors.fornavn)}
                />
              </FormField>
              <FormField label="Etternavn" error={errors.etternavn?.message}>
                <input
                  {...register("etternavn")}
                  type="text"
                  placeholder="Nordmann"
                  className={inputClass(!!errors.etternavn)}
                />
              </FormField>
            </div>

            {/* Telefon og organisasjon */}
            <div className="flex gap-4">
              <FormField label="Telefon" error={errors.telefon?.message} optional>
                <input
                  {...register("telefon")}
                  type="tel"
                  placeholder="+47 000 00 000"
                  className={inputClass(!!errors.telefon)}
                />
              </FormField>
              <FormField label="Organisasjon" error={errors.organisasjon?.message} optional>
                <input
                  {...register("organisasjon")}
                  type="text"
                  placeholder="Firma AS"
                  className={inputClass(!!errors.organisasjon)}
                />
              </FormField>
            </div>

            {/* E-post */}
            <FormField label="E-post" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                placeholder="navn@epost.no"
                className={inputClass(!!errors.email)}
              />
            </FormField>

            {/* Passord */}
            <FormField label="Passord" error={errors.password?.message}>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(!!errors.password)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-600"
                  aria-label={showPassword ? "Skjul passord" : "Vis passord"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormField>

            {/* Bekreft passord */}
            <FormField label="Bekreft passord" error={errors.confirmPassword?.message}>
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClass(!!errors.confirmPassword)}
              />
            </FormField>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-dark-green py-3.5 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Registrerer..." : "Registrer deg"}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-sm text-zinc-400">eller</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Link
              href="/login"
              className="w-full rounded-xl border-2 border-dark-green py-3.5 text-center font-semibold text-dark-green transition-all hover:bg-light-green"
            >
              Logg inn
            </Link>
            <p className="text-sm text-zinc-500">Har du allerede en konto?</p>
          </div>
        </div>

        <p className="text-xs text-zinc-400">© 2025 GrøntTak. Alle rettigheter reservert.</p>
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