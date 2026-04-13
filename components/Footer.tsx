import Image from "next/image";
import Link from "next/link";
import Img from "@/components/Img";

// ─── Konstanter ─────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/flora-kart", label: "FloraKart" },
  { href: "/om-prosjektet", label: "Om oss" },
  { href: "/om-verktoy", label: "Om verktøyet" },
  { href: "/faq", label: "FAQ" },
] as const;

const CONTACT_ITEMS = [
  { icon: "/ikoner/email.png", text: "kontakt@grøntak.no" },
  { icon: "/ikoner/telefon.png", text: "34243242" },
  { icon: "/ikoner/kart.png", text: "Gløshaug 1, 7030 Trondheim" },
  { icon: "/ikoner/klokke.png", text: "man-fre 9-18" },
] as const;

const LINK_CLASS = "text-sm text-zinc-700 transition-colors hover:text-brand-green";

// ─── Delkomponenter ─────────────────────────────────────────────
function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-2 text-sm text-zinc-700">
      <Image
        src={icon}
        alt=""
        aria-hidden
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
      />
      <span>{text}</span>
    </span>
  );
}

// ─── Footer ─────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-light-green">
      <div className="flex flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          <div className="flex max-w-xs flex-col gap-3">
            <Img width={120} imageSrc="/logoer/full-logo.svg" imageAlt="GrøntTak" />
            <p className="text-sm text-zinc-600">
              Gjør taket grønt — for miljøet, biologisk mangfold og fremtiden.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Utforsk</h3>
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={LINK_CLASS}>
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-brand-green">Kontakt</h3>
              {CONTACT_ITEMS.map((item) => (
                <ContactItem key={item.icon} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-brand-green opacity-20" />

        <div className="flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 GrøntTak. Alle rettigheter reservert.</span>
          <span>Laget med ❤️ for miljøet</span>
        </div>
      </div>
    </footer>
  );
}