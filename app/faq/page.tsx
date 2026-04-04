import Hero from "@/components/Hero";
import FAQKategori from "@/components/faq/FAQKategori";
import KontaktOss from "@/components/kontaktOss" 
import { faqData, kategorier } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <main className="w-full">
      <Hero
              title="Ofte stilte spørsmål"
              description="Her finner du svar på de vanligste spørsmålene om GrøntTak og grønne tak i Trondheim.
          Finner du ikke svaret du leter etter? Ta gjerne kontakt med oss."
              imageSrc="/img/faq.png"
              imageAlt="Illustrasjon av FAQ med snakkeboble, forstørrelsesglass og plantebok som symboliserer veiledning om plantevalg."
            />
      <section className="px-16 py-16 2xl:px-32">
        <div className="max-w-3xl flex flex-col gap-12">
          {kategorier.map(kategori => (
            <FAQKategori
              key={kategori}
              kategori={kategori}
              items={faqData.filter(item => item.kategori === kategori)}
            />
          ))}
        </div>
      </section>

      <KontaktOss/>
    </main>
  );
}