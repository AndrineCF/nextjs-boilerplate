import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-light-green mt-16">
      <div className="max-w-7xl mx-auto px-10 py-12 flex flex-col gap-10">

        {/* Topp: logo + kolonner */}
        <div className="flex justify-between items-start">
          
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Image src="/logo.svg" alt="GrøntTak logo" width={120} height={40} />
            <p className="text-sm text-zinc-600 max-w-xs">
              Gjør taket grønt — for miljøet, biologisk mangfold og fremtiden.
            </p>
          </div>

          {/* Lenker */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-brand-green mb-1">Utforsk</h3>
              <Link href="/flora-kart" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FloraKart</Link>
              <Link href="/om-prosjektet" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Om prosjektet</Link>
              <Link href="/faq" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">FAQ</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-brand-green mb-1">Kontakt</h3>
              <a href="mailto:kontakt@grøntak.no" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">hei@grøntak.no</a>
              <a href="mailto:kontakt@grøntak.no" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">34243242</a>
              <a href="mailto:kontakt@grøntak.no" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">Gløshaug 1, 7030 trondheim</a>
              <a href="mailto:kontakt@grøntak.no" className="text-sm text-zinc-700 hover:text-brand-green transition-colors">man-fre 9-18</a>
            </div>
          </div>
        </div>

        {/* Skillelinje */}
        <div className="w-full h-px bg-brand-green opacity-20" />

        {/* Bunn: copyright */}
        <div className="flex justify-between items-center text-xs text-zinc-500">
          <span>© 2025 GrøntTak. Alle rettigheter reservert.</span>
          <span>Laget med 🌿 for miljøet</span>
        </div>

      </div>
    </footer>
  );
}