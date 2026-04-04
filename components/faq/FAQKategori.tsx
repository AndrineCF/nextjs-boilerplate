import FAQItem from "./FAQItem";
import { FAQItem as FAQItemType } from "@/lib/faq-data";

interface Props {
  kategori: string;
  items: FAQItemType[];
}

export default function FAQKategori({ kategori, items }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-dark-green border-b border-zinc-200 pb-2">
        {kategori}
      </h2>
      {items.map((item, i) => (
        <FAQItem key={i} item={item} />
      ))}
    </div>
  );
}