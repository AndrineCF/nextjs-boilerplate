import Link from "next/link";
import { Leaf, Settings, ChevronRight } from "lucide-react";

export default function ProfileLinks() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <div className="border-b border-zinc-100 px-6 py-4">
        <h2 className="font-semibold text-zinc-900">Hurtiglenker</h2>
      </div>
      <div className="divide-y divide-zinc-50">
        <Link href="/flora-kart" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-green">
              <Leaf size={16} className="text-dark-green" />
            </div>
            <span className="text-sm font-medium text-zinc-800">FloraKart</span>
          </div>
          <ChevronRight size={16} className="text-zinc-400" />
        </Link>
        <Link href="/innstillinger" className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-green">
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