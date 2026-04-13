"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PROGRESS_STEPS = [
  { value: 30, delay: 0 },
  { value: 70, delay: 100 },
  { value: 100, delay: 300 },
] as const;

const RESET_DELAY = 500; // 300ms til 100% + 200ms før reset

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timers: ReturnType<typeof setTimeout>[] = [];

    PROGRESS_STEPS.forEach(({ value, delay }) => {
      timers.push(setTimeout(() => setProgress(value), delay));
    });

    timers.push(
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, RESET_DELAY)
    );

    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full">
      <div
        className="h-full bg-brand-green transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}