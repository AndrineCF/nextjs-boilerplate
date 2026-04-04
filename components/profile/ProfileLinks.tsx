import Link from "next/link";
import { Leaf, Settings, ChevronRight } from "lucide-react";

export default function ProfileLinks() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h2 className="font-semibold text-zinc-900">Hurtiglenker</h2>
      </div>
      <div className="divide-y divide-zinc-50">
        <Link href="/flora-kart" className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center">
              <Leaf size={16} className="text-dark-green" />
            </div>
            <span className="text-sm font-medium text-zinc-800">FloraKart</span>
          </div>
          <ChevronRight size={16} className="text-zinc-400" />
        </Link>
        <Link href="/innstillinger" className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-light-green flex items-center justify-center">
              <Settings size={16} className="text-dark-green" />
            </div>
            <span className="text-sm font-medium text-zinc-800">Innstillinger</span>
          </div>
          <ChevronRight size={16} className="text-zinc-400" />
        </Link>
      </div>
    </div>
  );
}