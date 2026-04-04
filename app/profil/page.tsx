"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, Profile } from "@/lib/profile"
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
    fetchProfile();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await logoutUser();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-2 border-dark-green border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-zinc-50 pb-16">
      <div className="w-full h-48 relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-8 2xl:px-0">
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