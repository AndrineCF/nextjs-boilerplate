import Image from "next/image";

export default function KontaktOss() {
  return (
   <section className="flex flex-col w-full items-center px-6 py-16 gap-12">

      <h2 className="text-3xl font-bold">Har du spørsmål? Ta kontakt med oss!</h2>

      <div className="flex items-center justify-center gap-24 w-full">

        {/* Bilde venstre */}
        <Image src="/img/kontakt.png" alt="" width={400} height={400} />

        {/* Kontaktinfo høyre */}
        <div className="flex flex-col w-80">

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/telefon.png" alt="" width={70} height={70} />
            <span className="text-lg">34243242</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/kart.png" alt="" width={70} height={70} />
            <span className="text-lg">Gløshaug 1, 7030 Trondheim</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/email.png" alt="" width={70} height={70} />
            <span className="text-lg">kundservice@grøntak.no</span>
          </div>

          <div className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <Image src="/ikoner/klokke.png" alt="" width={70} height={70} />
            <span className="text-lg">man-fre 9-18</span>
          </div>

        </div>
      </div>

    </section>)};