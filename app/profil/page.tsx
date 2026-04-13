"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Profile, getProfile } from "@/lib/profile";
import { logoutUser } from "@/lib/auth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLinks from "@/components/profile/ProfileLinks";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function Profil() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
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
    void fetchProfile();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await logoutUser();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dark-green border-t-transparent" />
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-zinc-50 pb-16">
      <div className="relative h-48 w-full">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-8 2xl:px-0">
        <ProfileHeader profile={profile} onLogout={handleLogout} loggingOut={loggingOut} />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-6">
            <ProfileInfo profile={profile} />
            <ProfileLinks />
          </div>
          <ProfileSidebar />
        </div>
      </div>
    </main>
  );
}