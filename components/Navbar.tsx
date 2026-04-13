"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { getProfile, getInitials, type Profile } from "@/lib/profile";
import { createClient } from "@/utils/supabase/client";
import Img from "@/components/Img";

// ─── Konstanter ─────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/flora-kart", label: "FloraKart" },
  { href: "/om-prosjektet", label: "Om oss" },
  { href: "/om-verktoy", label: "Om verktøyet" },
  { href: "/faq", label: "FAQ" },
] as const;

const NAV_LINK_CLASS =
  "block px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-light-green hover:text-brand-green md:px-4 md:py-2";

// ─── Delkomponenter ─────────────────────────────────────────────
function Avatar({ profile }: { profile: Profile }) {
  return (
    <Link href="/profil" className="transition-opacity hover:opacity-80">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-green md:h-9 md:w-9">
        <span className="text-xs font-semibold text-white md:text-sm">
          {getInitials(profile)}
        </span>
      </div>
    </Link>
  );
}

function DropdownMenu({
  profile,
  onClose,
}: {
  profile: Profile | null;
  onClose: () => void;
}) {
  return (
    <div className="absolute right-0 top-full mt-1 w-full border border-zinc-100 bg-white py-2 shadow-lg md:right-10 md:w-48 md:rounded-lg">
      {NAV_LINKS.map(({ href, label }) => (
        <Link key={href} href={href} className={NAV_LINK_CLASS} onClick={onClose}>
          {label}
        </Link>
      ))}
      {profile ? (
        <Link href="/profil" className={NAV_LINK_CLASS} onClick={onClose}>
          Min profil
        </Link>
      ) : (
        <Link href="/login" className={NAV_LINK_CLASS} onClick={onClose}>
          Logg inn
        </Link>
      )}
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Kunne ikke hente profil:", error);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();

    void refreshProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setProfile(null);
        return;
      }

      const shouldRefresh =
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED";

      if (shouldRefresh) {
        setTimeout(() => void refreshProfile(), 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-brand-green bg-white">
      <div className="relative flex items-center justify-between px-6 py-3 md:px-10 md:py-4">
        <Link href="/">
          <Img
            imageSrc="/logoer/full-logo.svg"
            imageAlt="GrøntTak logo"
            width={120}
            className="h-auto md:w-[140px]"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-zinc-800 transition-colors hover:text-brand-green"
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="h-6 w-0.5 bg-black" aria-hidden />

          {profile ? (
            <Avatar profile={profile} />
          ) : (
            <Link href="/login" className="text-zinc-800 transition-colors hover:text-brand-green">
              <LogIn size={22} />
            </Link>
          )}
        </div>

        {menuOpen && (
          <DropdownMenu profile={profile} onClose={() => setMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
}