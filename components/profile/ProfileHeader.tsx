"use client";

import Link from "next/link";
import { LogOut, Leaf } from "lucide-react";
import { type Profile, getInitials, formatMemberSince } from "@/lib/profile";

interface Props {
  profile: Profile;
  onLogout: () => void;
  loggingOut: boolean;
}

export default function ProfileHeader({ profile, onLogout, loggingOut }: Props) {
  return (
    <div className="-mt-16 mb-8 flex items-end gap-6">
      <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-light-green shadow-lg">
        <span className="text-4xl font-bold text-dark-green">{getInitials(profile)}</span>
      </div>
      <div className="flex w-full items-end justify-between pb-2">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{profile.navn ?? "Min profil"}</h1>
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Leaf size={14} className="text-dark-green" />
            GrøntTak-bruker siden {formatMemberSince(profile.opprettet_at)}
          </p>
        </div>
        <button
          onClick={onLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={16} />
          {loggingOut ? "Logger ut..." : "Logg ut"}
        </button>
      </div>
    </div>
  );
}