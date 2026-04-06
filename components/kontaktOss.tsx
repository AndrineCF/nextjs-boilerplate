import Image from "next/image";
import Logo from "@/components/Logo";

export default function KontaktOss() {
  return (
    <section className="w-full px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:gap-12">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Har du spørsmål? Ta kontakt med oss!
        </h2>

        <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-16 lg:gap-24">
          {/* Bilde */}
          <div className="w-full max-w-sm">
            <Image
              src="/img/kontakt.png"
              alt="Kontakt oss"
              width={400}
              height={400}
              className="rounded-lg flex-shrink-0 hidden md:block"
            />
          </div>

          {/* Kontaktinfo */}
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 border-b border-zinc-200 py-4">
                <Logo width={70} imageSrc="/ikoner/telefon.png" imageAlt=""/>
                <span className="text-base md:text-lg">34243242</span>
            </div>

            <div className="flex items-center gap-4 border-b border-zinc-200 py-4">
                <Logo width={70} imageSrc="/ikoner/kart.png" imageAlt=""/>
                <span className="text-base md:text-lg">Gløshaug 1, 7030 Trondheim </span>
            </div>

            <div className="flex items-center gap-4 border-b border-zinc-200 py-4">
                <Logo width={70} imageSrc="/ikoner/email.png" imageAlt=""/>
                <span className="break-all text-base md:text-lg">kundservice@grøntak.no</span>
            </div>

            <div className="flex items-center gap-4 border-b border-zinc-200 py-4">
                <Logo width={70} imageSrc="/ikoner/klokke.png" imageAlt=""/>
                <span className="text-base md:text-lg">man-fre 9-18</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}