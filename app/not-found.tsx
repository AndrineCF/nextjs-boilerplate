import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 gap-8 text-center">

      {/* Logo */}
      <Link href="/">
        <Image src="/logoer/full-logo.svg" alt="GrøntTak" width={160} height={50} />
      </Link>

      {/* Ikon */}
      <div className="w-24 h-24 rounded-full bg-light-green flex items-center justify-center">
        <Leaf size={48} className="text-dark-green" />
      </div>

      {/* Tekst */}
      <div className="flex flex-col gap-3 max-w-md">
        <h1 className="text-6xl font-bold text-dark-green">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-900">Siden finnes ikke</h2>
        <p className="text-zinc-500 leading-relaxed">
          Siden du leter etter eksisterer ikke eller har blitt flyttet.
          Gå tilbake til forsiden og prøv igjen.
        </p>
      </div>

      {/* Knapper */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/"
          className="bg-dark-green text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all text-center"
        >
          Gå til forsiden
        </Link>
        <Link
          href="/flora-kart"
          className="border-2 border-dark-green text-dark-green font-semibold py-3.5 rounded-xl hover:bg-light-green transition-all text-center"
        >
          Utforsk FloraKart
        </Link>
      </div>

    </main>
  );
}