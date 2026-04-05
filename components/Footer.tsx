import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-light-green">
      <div className="px-10 py-12 flex flex-col gap-10">

        {/* Topp: logo + lenker */}
        <div className="flex justify-between items-start px-20">

          {/* Logo + tagline - venstre */}
          <div className="flex flex-col gap-3">
            <Image src="/logoer/full-logo.svg" alt="GrøntTak logo" width={120} height={40} />
            <p className="text-sm text-zinc-600 max-w-xs">
              Gjør taket grønt — for miljøet, biologisk mangfold og fremtiden.
            </p>
          </div>

          {/* Lenker - høyre */}
          <div className="flex gap-16 px-40">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Utforsk</h3>
              <Link href="/flora-kart" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FloraKart</Link>
              <Link href="/om-prosjektet" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Om Grønttak</Link>
              <Link href="/om-verktoy" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Om verktøy</Link>
              <Link href="/faq" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FAQ</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Kontakt</h3>
              <a href="mailto:kontakt@grøntak.no" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-brand-green transition-colors">
                <Image src="/ikoner/email.png" alt="" width={44} height={44} />
                kontakt@grøntak.no
              </a>
              <a href="tel:34243242" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-brand-green transition-colors">
                <Image src="/ikoner/telefon.png" alt="" width={44} height={44}  />
                34243242
              </a>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image src="/ikoner/kart.png" alt="" width={44} height={44}  />
                Gløshaug 1, 7030 Trondheim
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image src="/ikoner/klokke.png" alt="" width={44} height={44} />
                man-fre 9-18
              </span>
            </div>
          </div>

        </div>

        {/* Skillelinje */}
        <div className="w-full h-px bg-brand-green opacity-20" />

        {/* Bunn: copyright */}
        <div className="flex justify-between items-center text-xs text-zinc-500 ">
          <span>© 2025 GrøntTak. Alle rettigheter reservert.</span>
          <span>Laget med 🌿 for miljøet</span>
        </div>

      </div>
    </footer>
  );
}