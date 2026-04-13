import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/lib/auth";

// ─── Types ──────────────────────────────────────────────────────
export interface Profile {
  email: string;
  navn?: string;
  opprettet_at: string;
}

// ─── Profil ─────────────────────────────────────────────────────
export async function getProfile(): Promise<Profile | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("navn")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Kunne ikke hente profil:", error.message);
    return null;
  }

  return {
    email: user.email ?? "",
    navn: data?.navn,
    opprettet_at: user.created_at,
  };
}

// ─── Hjelpefunksjoner ───────────────────────────────────────────
export function getInitials(profile: Profile): string {
  if (profile.navn) {
    const initials = profile.navn
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    if (initials) return initials;
  }

  return (profile.email[0] ?? "?").toUpperCase();
}

export function formatMemberSince(date: string): string {
  return new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
  });
}