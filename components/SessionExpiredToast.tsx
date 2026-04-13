"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

export default function SessionExpiredToast() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("redirect")) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-lg">
      <AlertCircle size={18} className="flex-shrink-0 text-amber-500" />
      <span className="text-zinc-700">Sesjonen din har utløpt. Logg inn igjen.</span>
      <button
        onClick={() => setShow(false)}
        className="ml-auto text-zinc-400 hover:text-zinc-600"
        aria-label="Lukk varsel"
      >
        <X size={16} />
      </button>
    </div>
  );
}