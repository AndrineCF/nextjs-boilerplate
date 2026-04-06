"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn } from "lucide-react";
import { getProfile, getInitials, Profile } from "@/lib/profile";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProfile() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const data = await getProfile();
        setProfile(data);
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="w-full bg-white border-b-2 border-brand-green sticky top-0 z-50">
      <div className="relative flex items-center justify-between px-6 py-3 md:px-10 md:py-4">

        <Link href="/">
          <Image src="/logoer/full-logo.svg" alt="GrøntTak logo" width={120} height={40} className="md:w-[140px]" />
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-800 hover:text-brand-green transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="w-0.5 h-6 bg-black" />

          {profile ? (
            <Link href="/profil" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-dark-green flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-semibold">{getInitials(profile)}</span>
              </div>
            </Link>
          ) : (
            <Link href="/login" className="text-zinc-800 hover:text-brand-green transition-colors">
              <LogIn size={22} />
            </Link>
          )}
        </div>

        {menuOpen && (
          <div className="absolute top-full right-0 w-full md:w-48 md:right-10 mt-1 bg-white shadow-lg border border-zinc-100 py-2 md:rounded-lg">
            <Link href="/flora-kart" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>FloraKart</Link>
            <Link href="/om-prosjektet" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Om oss</Link>
            <Link href="/om-verktoy" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Om verktøyet</Link>
            <Link href="/faq" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>FAQ</Link>
            {profile ? (
              <Link href="/profil" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Min profil</Link>
            ) : (
              <Link href="/login" className="block px-6 py-3 md:px-4 md:py-2 text-zinc-700 hover:bg-light-green hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Logg inn</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}