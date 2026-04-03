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

export async function registerUser(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error("Kunne ikke registrere bruker. Prøv igjen.");

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