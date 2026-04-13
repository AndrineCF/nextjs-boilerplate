import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// ─── Validering ─────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Mangler Supabase-miljøvariabler. Sjekk NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY i .env.local"
  );
}

// ─── Singleton ──────────────────────────────────────────────────
let supabaseClient: SupabaseClient | undefined;

export function createClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient;

  supabaseClient = createBrowserClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}