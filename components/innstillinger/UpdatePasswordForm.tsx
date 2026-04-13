"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { updatePasswordSchema, type UpdatePasswordFormData } from "@/lib/validation";
import { updatePassword } from "@/lib/settings";

export default function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  async function onSubmit(data: UpdatePasswordFormData) {
    setError("");
    setSuccess(false);
    try {
      await updatePassword(data.password);
      setSuccess(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle size={16} />
          Passord oppdatert!
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">Nytt passord</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full rounded-xl border px-4 py-3 pr-12 transition-all focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-400 focus:ring-red-100"
                : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
            }`}
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
        {errors.password && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle size={14} />
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">Bekreft nytt passord</label>
        <input
          {...register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className={`w-full rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
            errors.confirmPassword
              ? "border-red-400 focus:ring-red-100"
              : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
          }`}
        />
        {errors.confirmPassword && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle size={14} />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-dark-green px-8 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Oppdater passord"}
      </button>
    </div>
  );
}