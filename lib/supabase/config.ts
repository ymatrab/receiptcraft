/**
 * Whether Supabase env vars are present. Lets the app run (and the static
 * marketing/builder pages keep working) before the backend is wired up — auth
 * helpers short-circuit to "anonymous" when this is false.
 */
export const supabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
