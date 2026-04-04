import { LogOut, Leaf } from "lucide-react";
import { Profile, getInitials, formatMemberSince } from  "@/lib/profile";

interface Props {
  profile: Profile;
  onLogout: () => void;
  loggingOut: boolean;
}

export default function ProfileHeader({ profile, onLogout, loggingOut }: Props) {
  return (
    <div className="flex items-end gap-6 -mt-16 mb-8">
      <div className="w-32 h-32 rounded-2xl bg-light-green border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
        <span className="text-4xl font-bold text-dark-green">{getInitials(profile)}</span>
      </div>
      <div className="pb-2 flex justify-between items-end w-full">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{profile.navn ?? "Min profil"}</h1>
          <p className="text-zinc-500 flex items-center gap-1.5 text-sm">
            <Leaf size={14} className="text-dark-green" />
            GrøntTak-bruker siden {formatMemberSince(profile.opprettet_at)}
          </p>
        </div>
        <button
          onClick={onLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500 transition-colors border border-zinc-200 px-4 py-2 rounded-xl hover:border-red-200 hover:bg-red-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Logger ut..." : "Logg ut"}
        </button>
      </div>
    </div>
  );
}