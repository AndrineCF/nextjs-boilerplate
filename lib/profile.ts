import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/lib/auth";

export interface Profile {
  email: string;
  navn?: string;
  opprettet_at: string;
}

export async function getProfile(): Promise<Profile | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    email: user.email ?? "",
    navn: data?.navn,
    opprettet_at: user.created_at,
  };
}

export function getInitials(profile: Profile): string {
  return profile.navn
    ? profile.navn.split(" ").map(n => n[0]).join("").toUpperCase()
    : (profile.email?.[0] ?? "?").toUpperCase();
}

export function formatMemberSince(date: string): string {
  return new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
  });
}