"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProfile, Profile } from "@/lib/profile";
import SettingsSection from "@/components/innstillinger/SettingsSection";
import UpdateNavnForm from "@/components/innstillinger/UpdateNavnForm";
import UpdateEmailForm from "@/components/innstillinger/UpdateEmailForm";
import UpdatePasswordForm from "@/components/innstillinger/UpdatePasswordForm";
import DeleteAccountSection from "@/components/innstillinger/DeleteAccountSection";

export default function Innstillinger() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile();
      if (!data) {
        router.push("/login");
        return;
      }
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-2 border-dark-green border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-16">

      {/* Topp */}
      <div className="bg-white border-b border-zinc-100 px-8 py-4 2xl:px-16">
        <Link href="/profil" className="flex items-center gap-2 text-zinc-500 hover:text-dark-green transition-colors text-sm w-fit">
          <ChevronLeft size={16} />
          Tilbake til profil
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-zinc-900">Innstillinger</h1>

        <SettingsSection
          title="Navn"
          description="Oppdater ditt visningsnavn"
        >
          <UpdateNavnForm currentNavn={profile?.navn} />
        </SettingsSection>

        <SettingsSection
          title="E-post"
          description="Oppdater e-postadressen din"
        >
          <UpdateEmailForm currentEmail={profile?.email} />
        </SettingsSection>

        <SettingsSection
          title="Passord"
          description="Endre passordet ditt"
        >
          <UpdatePasswordForm />
        </SettingsSection>

        <SettingsSection
          title="Slett konto"
          description="Permanent sletting av din konto og all tilhørende data"
        >
          <DeleteAccountSection />
        </SettingsSection>

      </div>
    </main>
  );
}