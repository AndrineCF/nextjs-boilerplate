import Link from "next/link";
import { Shield, Leaf } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-900">Sikkerhet</h2>
        </div>
        <div className="px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-dark-green" />
            <span className="text-sm text-zinc-600">Passord er satt</span>
          </div>
          <Link href="/glemt-passord" className="text-sm text-dark-green hover:underline font-medium">
            Endre passord →
          </Link>
        </div>
      </div>

      <div className="bg-dark-green rounded-2xl p-6 flex flex-col gap-4">
        <Leaf size={24} className="text-light-green" />
        <div>
          <h3 className="font-bold text-white">Utforsk FloraKart</h3>
          <p className="text-sm text-white/70 mt-1">Finn de beste plantene for ditt tak</p>
        </div>
        <Link href="/flora-kart" className="bg-white text-dark-green text-sm font-semibold py-2.5 rounded-xl text-center hover:bg-light-green transition-colors">
          Gå til FloraKart
        </Link>
      </div>

    </div>
  );
}