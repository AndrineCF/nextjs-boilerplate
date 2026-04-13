import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/lib/auth";

async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("Ikke innlogget");
  return user;
}

export async function updateNavn(navn: string) {
  const user = await requireUser();

  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ navn })
    .eq("id", user.id);

  if (error) throw new Error("Kunne ikke oppdatere navn");
}

export async function updateEmail(email: string) {
  await requireUser();

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ email });
  if (error) throw new Error("Kunne ikke oppdatere e-post");
}

export async function updatePassword(password: string) {
  await requireUser();

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error("Kunne ikke oppdatere passord");
}

export async function deleteAccount() {
  await requireUser();

  const supabase = createClient();
  const { error } = await supabase.rpc("delete_user");
  if (error) throw new Error("Kunne ikke slette konto");
}