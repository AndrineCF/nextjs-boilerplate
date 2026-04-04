"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQItem as FAQItemType } from "@/lib/faq-data";

export default function FAQItem({ item }: { item: FAQItemType }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <span className="font-medium text-zinc-900">{item.spørsmål}</span>
        {open ? (
          <ChevronUp size={20} className="text-brand-green flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-zinc-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200">
          <p className="text-zinc-600 leading-relaxed">{item.svar}</p>
        </div>
      )}
    </div>
  );
}