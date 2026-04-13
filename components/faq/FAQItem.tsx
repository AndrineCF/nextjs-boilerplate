"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQItemData } from "@/lib/data/faqData";

export default function FAQItem({ item }: { item: FAQItemData }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-zinc-50"
        aria-expanded={open}
      >
        <span className="font-medium text-zinc-900">{item.spørsmål}</span>
        {open ? (
          <ChevronUp size={20} className="flex-shrink-0 text-brand-green" />
        ) : (
          <ChevronDown size={20} className="flex-shrink-0 text-zinc-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4">
          <p className="leading-relaxed text-zinc-600">{item.svar}</p>
        </div>
      )}
    </div>
  );
}