import { User, Mail, Calendar } from "lucide-react";
import { Profile, formatMemberSince } from  "@/lib/profile";

interface Props {
  profile: Profile;
}

export default function ProfileInfo({ profile }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h2 className="font-semibold text-zinc-900">Kontoinformasjon</h2>
      </div>
      <div className="divide-y divide-zinc-50">
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Navn</p>
            <p className="text-sm font-medium text-zinc-800">{profile.navn ?? "Ikke satt"}</p>
          </div>
        </div>
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">E-post</p>
            <p className="text-sm font-medium text-zinc-800">{profile.email}</p>
          </div>
        </div>
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center flex-shrink-0">
            <Calendar size={16} className="text-dark-green" />
          </div>
          <div>
            <p className="text-xs text-zinc-400">Medlem siden</p>
            <p className="text-sm font-medium text-zinc-800">{formatMemberSince(profile.opprettet_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}