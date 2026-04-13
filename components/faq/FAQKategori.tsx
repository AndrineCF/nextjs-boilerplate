import FAQItem from "@/components/faq/FAQItem";
import type { FAQItemData } from "@/lib/data/faqData";

interface Props {
  kategori: string;
  items: FAQItemData[];
}

export default function FAQKategori({ kategori, items }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="border-b border-zinc-200 pb-2 text-xl font-bold text-dark-green">
        {kategori}
      </h2>
      {items.map((item, i) => (
        <FAQItem key={i} item={item} />
      ))}
    </div>
  );
}