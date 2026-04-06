"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validation";
import { loginUser } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import SessionExpiredToast from "@/components/SessionExpiredToast";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setGeneralError("");
    try {
      await loginUser(data.email, data.password);
      router.push(redirect);
    } catch (error) {
      if (error instanceof Error) {
        setGeneralError(error.message);  // ← bare meldingen, ikke "Error: ..."
      } else {
        setGeneralError("Noe gikk galt. Prøv igjen.");
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-zinc-900">Velkommen tilbake</h1>
        <p className="text-zinc-500">Logg inn for å planlegge ditt grønne tak</p>
      </div>

      {generalError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          {generalError}
        </div>
      )}

      <div className="flex flex-col gap-5">

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

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-zinc-700">Passord</label>
            <Link href="/glemt-passord" className="text-sm text-dark-green hover:underline">
              Glemt passord?
            </Link>
          </div>
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

        <div className="flex items-center gap-2">
          <input type="checkbox" id="rememberMe" className="w-4 h-4 accent-dark-green" />
          <label htmlFor="rememberMe" className="text-sm text-zinc-600">Husk meg</label>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-dark-green text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logger inn..." : "Logg inn"}
        </button>

      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-sm text-zinc-400">eller</span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link
          href="/registrer"
          className="w-full border-2 border-dark-green text-dark-green font-semibold py-3.5 rounded-xl hover:bg-light-green transition-all text-center"
        >
          Registrer ny bruker
        </Link>
        <p className="text-sm text-zinc-500">Har du ikke en konto ennå?</p>
      </div>

    </div>
  );
}

export default function Login() {
  return (
    <>
      <Suspense>
        <SessionExpiredToast />
      </Suspense>
      <main className="flex min-h-screen">

        <div className="flex flex-col w-full max-w-xl px-16 py-12 justify-between">

          <Link href="/">
            <Image src="/logoer/full-logo.svg" alt="GrøntTak" width={160} height={50} />
          </Link>

          <Suspense fallback={<div />}>
            <LoginForm />
          </Suspense>

          <p className="text-xs text-zinc-400">© 2025 GrøntTak. Alle rettigheter reservert.</p>

        </div>

        <div className="flex-1 relative hidden md:block">
          <Image src="/img/login.png" alt="Grønt tak" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark-green/40 flex flex-col justify-end p-16">
            <blockquote className="text-white text-2xl font-semibold max-w-sm leading-relaxed">
              "Fremtidens byer er grønne — start med taket."
            </blockquote>
          </div>
        </div>

      </main>
    </>
  );
}