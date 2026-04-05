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
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-zinc-200 shadow-lg px-4 py-3 rounded-xl text-sm max-w-sm">
      <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
      <span className="text-zinc-700">Sesjonen din har utløpt. Logg inn igjen.</span>
      <button onClick={() => setShow(false)} className="text-zinc-400 hover:text-zinc-600 ml-auto">
        <X size={16} />
      </button>
    </div>
  );
} 