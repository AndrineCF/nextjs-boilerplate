import { createClient } from "@/utils/supabase/client";

export async function loginUser(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Feil e-post eller passord. Prøv igjen.");

  return data;
}

export async function registerUser(
  email: string,
  password: string,
  fornavn: string,
  etternavn: string,
  telefon?: string,
  organisasjon?: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error("Kunne ikke registrere bruker. Prøv igjen.");

  if (data.user) {
    await supabase
      .from("profiles")
      .update({
        navn: `${fornavn} ${etternavn}`,
        telefon: telefon || null,
        organisasjon: organisasjon || null,
      })
      .eq("id", data.user.id);
  }

  return data;
}

export async function logoutUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function resetPassword(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/oppdater-passord`,
  });

  if (error) throw new Error("Kunne ikke sende e-post. Prøv igjen.");
}