// Migriert von Vite zu Next.js.
// Lazy-Initialisierung: Der Client wird erst beim ersten Zugriff erstellt,
// damit der Build nicht scheitert, wenn die Env-Vars (noch) nicht gesetzt sind
// (z.B. beim Prerender von Seiten, die das Modal nicht aufrufen).
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let _supabase: SupabaseClient<Database> | null = null;

function getSupabase(): SupabaseClient<Database> {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase ist nicht konfiguriert. Bitte NEXT_PUBLIC_SUPABASE_URL und ' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY in der .env.local setzen.'
    );
  }

  _supabase = createClient<Database>(url, key, {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return _supabase;
}

/**
 * Proxy, damit bestehende Imports `import { supabase } from "@/integrations/supabase/client"`
 * unverändert weiterfunktionieren. Erster Zugriff triggert getSupabase().
 */
export const supabase: SupabaseClient<Database> = new Proxy(
  {} as SupabaseClient<Database>,
  {
    get(_target, prop) {
      const client = getSupabase() as unknown as Record<string | symbol, unknown>;
      const value = client[prop];
      return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(client) : value;
    },
  }
);
