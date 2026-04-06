"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validation";
import { registerUser } from "@/lib/auth";

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
      setGeneralError(String(error));
    }
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-light-green flex items-center justify-center">
            <CheckCircle size={32} className="text-dark-green" />
          </div>
          <h1 className="text-2xl font-bold">Konto opprettet!</h1>
          <p className="text-zinc-500">Du kan nå logge inn med din nye konto.</p>
          <Link
            href="/login"
            className="bg-dark-green text-white font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-all"
          >
            Gå til innlogging
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">

      {/* Venstre side */}
      <div className="flex flex-col w-full max-w-xl px-16 py-12 justify-between">

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-zinc-900">Opprett konto</h1>
            <p className="text-zinc-500">Registrer deg for å komme i gang</p>
          </div>

          {generalError && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              {generalError}
            </div>
          )}

          <div className="flex flex-col gap-5">

            {/* Fornavn og etternavn */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-zinc-700">Fornavn</label>
                <input
                  {...register("fornavn")}
                  type="text"
                  placeholder="Ola"
                  className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
                    errors.fornavn
                      ? "border-red-400 focus:ring-red-100"
                      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                  }`}
                />
                {errors.fornavn && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.fornavn.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-zinc-700">Etternavn</label>
                <input
                  {...register("etternavn")}
                  type="text"
                  placeholder="Nordmann"
                  className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
                    errors.etternavn
                      ? "border-red-400 focus:ring-red-100"
                      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                  }`}
                />
                {errors.etternavn && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.etternavn.message}
                  </p>
                )}
              </div>
            </div>

            {/* Telefon og organisasjon */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-zinc-700">
                  Telefon <span className="text-zinc-400">(valgfri)</span>
                </label>
                <input
                  {...register("telefon")}
                  type="tel"
                  placeholder="+47 000 00 000"
                  className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
                    errors.telefon
                      ? "border-red-400 focus:ring-red-100"
                      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                  }`}
                />
                {errors.telefon && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.telefon.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-zinc-700">
                  Organisasjon <span className="text-zinc-400">(valgfri)</span>
                </label>
                <input
                  {...register("organisasjon")}
                  type="text"
                  placeholder="Firma AS"
                  className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
                    errors.organisasjon
                      ? "border-red-400 focus:ring-red-100"
                      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                  }`}
                />
                {errors.organisasjon && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.organisasjon.message}
                  </p>
                )}
              </div>
            </div>

            {/* E-post */}
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

            {/* Passord */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Passord</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full pr-12 ${
                    errors.password
                      ? "border-red-400 focus:ring-red-100"
                      : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Bekreft passord */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Bekreft passord</label>
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-100"
                    : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-dark-green text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registrerer..." : "Registrer deg"}
            </button>

          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-sm text-zinc-400">eller</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Link
              href="/login"
              className="w-full border-2 border-dark-green text-dark-green font-semibold py-3.5 rounded-xl hover:bg-light-green transition-all text-center"
            >
              Logg inn
            </Link>
            <p className="text-sm text-zinc-500">Har du allerede en konto?</p>
          </div>

        </div>

        <p className="text-xs text-zinc-400">© 2025 GrøntTak. Alle rettigheter reservert.</p>

      </div>

      {/* Høyre side - bilde */}
      <div className="flex-1 relative hidden md:block">
        <Image src="/img/login.png" alt="Grønt tak" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark-green/40 flex flex-col justify-end p-16">
          <blockquote className="text-white text-2xl font-semibold max-w-sm leading-relaxed">
            "Fremtidens byer er grønne — start med taket."
          </blockquote>
        </div>
      </div>
    </main>
  );
}