"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b-2 border-brand-green sticky top-0 z-50">
      <div className="relative flex items-center justify-between px-10 py-4">
        
        {/* Logo - venstre */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logoer/full-logo.svg" alt="GrøntTak logo" width={140} height={45} />
        </Link>

        {/* Høyre side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-800 hover:text-brand-green transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="w-0.5 h-6 bg-black" />

          <Link href="/login" className="text-zinc-800 hover:text-brand-green transition-colors">
            <LogIn size={24} />
          </Link>
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-zinc-100 py-2">
            <Link href="/" className="block px-4 py-2 text-zinc-700 hover:bg-green-50 hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Hjem</Link>
            <Link href="/flora-kart" className="block px-4 py-2 text-zinc-700 hover:bg-green-50 hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>FloraKart</Link>
            <Link href="/om-prosjektet" className="block px-4 py-2 text-zinc-700 hover:bg-green-50 hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Om Prosjektet</Link>
            <Link href="/om-verktoy" className="block px-4 py-2 text-zinc-700 hover:bg-green-50 hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>Om Verktøy</Link>
            <Link href="/faq" className="block px-4 py-2 text-zinc-700 hover:bg-green-50 hover:text-brand-green font-medium transition-colors" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </div>
        )}
      </div>
    </nav>
  );
}