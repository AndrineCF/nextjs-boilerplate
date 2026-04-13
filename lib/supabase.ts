import { createClient } from "@supabase/supabase-js";

export async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Mangler NEXT_PUBLIC_SUPABASE_URL i .env.local");
  if (!key) throw new Error("Mangler SUPABASE_SERVICE_ROLE_KEY i .env.local");

  return createClient(url, key);
}