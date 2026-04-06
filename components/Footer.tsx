import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-light-green">
      <div className="px-6 py-10 md:px-10 md:py-12 flex flex-col gap-10">

        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">

          <div className="flex flex-col gap-3">
            <Logo width={120} imageSrc="/logoer/full-logo.svg" imageAlt=""/>
            <p className="text-sm text-zinc-600 max-w-xs">
              Gjør taket grønt — for miljøet, biologisk mangfold og fremtiden.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Utforsk</h3>
              <Link href="/flora-kart" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FloraKart</Link>
              <Link href="/om-prosjektet" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Om oss</Link>
              <Link href="/om-verktoy" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Om verktøyet</Link>
              <Link href="/faq" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FAQ</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Kontakt</h3>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Logo width={40} imageSrc="/ikoner/email.png" imageAlt=""/>
                kontakt@grøntak.no
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Logo width={40} imageSrc="/ikoner/telefon.png" imageAlt=""/>
                34243242
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Logo width={40} imageSrc="/ikoner/kart.png" imageAlt=""/>
                Gløshaug 1, 7030 Trondheim
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Logo width={40} imageSrc="/ikoner/klokke.png" imageAlt=""/>
                man-fre 9-18
              </span>
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-brand-green opacity-20" />

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-xs text-zinc-500">
          <span>© 2025 GrøntTak. Alle rettigheter reservert.</span>
          <span>Laget med 🌿 for miljøet</span>
        </div>

      </div>
    </footer>
  );
}