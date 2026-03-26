import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  console.log("Supabase URL:", url);
  console.log("Supabase KEY finnes:", !!key);

  if (!url || !key) {
    throw new Error(`Mangler miljøvariabler: URL=${url}, KEY=${!!key}`);
  }

  return createClient(url, key);
}