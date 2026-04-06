import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-light-green">
      <div className="flex flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo
              width={120}
              imageSrc="/logoer/full-logo.svg"
              imageAlt="GrøntTak"
            />
            <p className="text-sm text-zinc-600">
              Gjør taket grønt — for miljøet, biologisk mangfold og fremtiden.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Utforsk</h3>

              <Link
                href="/flora-kart"
                className="text-sm text-zinc-700 transition-colors hover:text-brand-green"
              >
                FloraKart
              </Link>

              <Link
                href="/om-prosjektet"
                className="text-sm text-zinc-700 transition-colors hover:text-brand-green"
              >
                Om oss
              </Link>

              <Link
                href="/om-prosjektet"
                className="text-sm text-zinc-700 transition-colors hover:text-brand-green"
              >
                Om verktøyet
              </Link>

              <Link
                href="/faq"
                className="text-sm text-zinc-700 transition-colors hover:text-brand-green"
              >
                FAQ
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Kontakt</h3>

              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image
                  src="/ikoner/email.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <span>kontakt@grøntak.no</span>
              </span>

              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image
                  src="/ikoner/telefon.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <span>34243242</span>
              </span>

              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image
                  src="/ikoner/kart.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <span>Gløshaug 1, 7030 Trondheim</span>
              </span>

              <span className="flex items-center gap-2 text-sm text-zinc-700">
                <Image
                  src="/ikoner/klokke.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <span>man-fre 9-18</span>
              </span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-brand-green opacity-20" />

        <div className="flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 GrøntTak. Alle rettigheter reservert.</span>
          <span>Laget med for miljøet</span>
        </div>
      </div>
    </footer>
  );
}