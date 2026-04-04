import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/lib/auth";

export interface Settings {
  navn: string;
  email: string;
}

export async function updateNavn(navn: string) {
  const user = await getUser();
  if (!user) throw new Error("Ikke innlogget");

  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ navn })
    .eq("id", user.id);

  if (error) throw new Error("Kunne ikke oppdatere navn");
}

export async function updateEmail(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ email });
  if (error) throw new Error("Kunne ikke oppdatere e-post");
}

export async function updatePassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error("Kunne ikke oppdatere passord");
}

export async function deleteAccount() {
  const supabase = createClient();
  const { error } = await supabase.rpc("delete_user");
  if (error) throw new Error("Kunne ikke slette konto");
}