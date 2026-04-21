import Image from "next/image";
import Img from "@/components/Img";

// ─── Konstanter ─────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: "/ikoner/telefon.svg", text: "34243242" },
  { icon: "/ikoner/kart.svg", text: "Gløshaug 1, 7030 Trondheim" },
  { icon: "/ikoner/email.svg", text: "kundservice@grøntak.no" },
  { icon: "/ikoner/klokke.svg", text: "man-fre 9-18" },
] as const;

// ─── Delkomponenter ─────────────────────────────────────────────
function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-200 py-4">
      <Img width={70} imageSrc={icon} imageAlt="" />
      <span className="break-words text-base md:text-lg">{text}</span>
    </div>
  );
}

// ─── Seksjon ────────────────────────────────────────────────────
export default function KontaktOss() {
  return (
    <section className="w-full px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:gap-12">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Har du spørsmål? Ta kontakt med oss!
        </h2>

        <div className="flex w-full flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16 lg:gap-24">
          <Image
            src="/img/kontakt.png"
            alt="Kontakt oss"
            width={400}
            height={400}
            className="hidden w-full max-w-sm flex-shrink-0 rounded-lg md:block"
          />

          <div className="w-full max-w-md">
            {CONTACT_ITEMS.map((item) => (
              <ContactItem key={item.icon} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}