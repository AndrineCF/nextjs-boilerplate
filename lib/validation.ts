import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-post er påkrevd")
    .email("Ugyldig e-postadresse"),
  password: z
    .string()
    .min(1, "Passord er påkrevd")
    .min(6, "Passordet må være minst 6 tegn"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "E-post er påkrevd")
    .email("Ugyldig e-postadresse"),
  password: z
    .string()
    .min(1, "Passord er påkrevd")
    .min(6, "Passordet må være minst 6 tegn"),
  confirmPassword: z.string().min(1, "Bekreft passord er påkrevd"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passordene stemmer ikke overens",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;