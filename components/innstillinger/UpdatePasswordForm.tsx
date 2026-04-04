"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { updatePasswordSchema, UpdatePasswordFormData } from "@/lib/validation";
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
      setError(String(e));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={16} />
          Passord oppdatert!
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm">
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
            className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all w-full pr-12 ${
              errors.password
                ? "border-red-400 focus:ring-red-100"
                : "border-zinc-200 focus:border-dark-green focus:ring-dark-green/10"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
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
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">Bekreft nytt passord</label>
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
        className="bg-dark-green text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all w-fit px-8 disabled:opacity-60"
      >
        {isSubmitting ? "Lagrer..." : "Oppdater passord"}
      </button>
    </div>
  );
}