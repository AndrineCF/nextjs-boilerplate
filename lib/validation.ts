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
  fornavn: z
    .string()
    .min(1, "Fornavn er påkrevd")
    .max(50, "Fornavn kan ikke være lengre enn 50 tegn"),
  etternavn: z
    .string()
    .min(1, "Etternavn er påkrevd")
    .max(50, "Etternavn kan ikke være lengre enn 50 tegn"),
  telefon: z
    .string()
    .min(8, "Telefonnummer må være minst 8 siffer")
    .max(15, "Telefonnummer kan ikke være lengre enn 15 siffer")
    .regex(/^[0-9+\s]*$/, "Ugyldig telefonnummer")
    .optional()
    .or(z.literal("")),
  organisasjon: z
    .string()
    .max(100, "Organisasjonsnavn kan ikke være lengre enn 100 tegn")
    .optional()
    .or(z.literal("")),
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

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-post er påkrevd")
    .email("Ugyldig e-postadresse"),
});

export const updateNavnSchema = z.object({
  navn: z.string().min(1, "Navn er påkrevd").max(50, "Navn kan ikke være lengre enn 50 tegn"),
});

export const updateEmailSchema = z.object({
  email: z.string().min(1, "E-post er påkrevd").email("Ugyldig e-postadresse"),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(6, "Passord må være minst 6 tegn"),
  confirmPassword: z.string().min(1, "Bekreft passord er påkrevd"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passordene stemmer ikke overens",
  path: ["confirmPassword"],
});

export type UpdateNavnFormData = z.infer<typeof updateNavnSchema>;
export type UpdateEmailFormData = z.infer<typeof updateEmailSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;