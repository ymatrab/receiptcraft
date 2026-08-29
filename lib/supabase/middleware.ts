import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured } from "./config";

/**
 * Refreshes the Supabase auth session on every request and forwards the
 * refreshed cookies to both the browser and downstream Server Components.
 * Called from the root middleware.ts.
 *
 * Returns the user alongside the response. It was already being fetched and
 * thrown away, and middleware.ts needs it to gate /account — doing that here
 * rather than in the page is what keeps the redirect a real HTTP redirect. A
 * `redirect()` inside a page that has a loading.tsx sits under a Suspense
 * boundary, so Next streams a 200 with the skeleton and only redirects once the
 * client payload arrives — which strands a no-JS visitor on a loading screen
 * for a page they cannot see.
 */
export async function updateSession(
  request: NextRequest
): Promise<{ response: NextResponse; user: { id: string } | null }> {
  let response = NextResponse.next({ request });

  // Backend not wired up yet — skip auth entirely so the site still serves.
  // `user: null` would read as "signed out" and bounce people to a login page
  // that cannot work, so say so with the flag the caller checks instead.
  if (!supabaseConfigured) return { response, user: null };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: do not run code between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user: user ? { id: user.id } : null };
}
