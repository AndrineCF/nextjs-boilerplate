import Link from "next/link";
import { Shield, Leaf } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
        <div className="border-b border-zinc-100 px-6 py-4">
          <h2 className="font-semibold text-zinc-900">Sikkerhet</h2>
        </div>
        <div className="flex flex-col gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-dark-green" />
            <span className="text-sm text-zinc-600">Passord er satt</span>
          </div>
          <Link href="/glemt-passord" className="text-sm font-medium text-dark-green hover:underline">
            Endre passord →
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-dark-green p-6">
        <Leaf size={24} className="text-light-green" />
        <div>
          <h3 className="font-bold text-white">Utforsk FloraKart</h3>
          <p className="mt-1 text-sm text-white/70">Finn de beste plantene for ditt tak</p>
        </div>
        <Link
          href="/flora-kart"
          className="rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-dark-green transition-colors hover:bg-light-green"
        >
          Gå til FloraKart
        </Link>
      </div>
    </div>
  );
}