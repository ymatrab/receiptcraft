import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { supabaseConfigured } from "@/lib/supabase/config";

/** Signed-in-only areas, gated here rather than inside the pages. */
const PROTECTED = ["/account"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const { pathname, search } = request.nextUrl;
  const needsAuth = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (needsAuth && supabaseConfigured && !user) {
    /**
     * Gate here, not in the page.
     *
     * The pages still call redirect() as a backstop, but that redirect now sits
     * under the Suspense boundary app/account/loading.tsx creates — so Next
     * streams a 200 carrying the loading skeleton and only bounces once the
     * client payload runs. A visitor without JavaScript sits on a skeleton of a
     * page they are not allowed to see, forever. Redirecting before the render
     * starts makes it a real HTTP redirect again.
     */
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(`${pathname}${search}`)}`;

    const redirect = NextResponse.redirect(url);
    // Carry the refreshed auth cookies onto the redirect. Dropping them here is
    // the classic Supabase SSR mistake: the session refresh is silently lost and
    // the user is bounced again on their next request.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static assets and image optimization files.
     * This keeps the auth session fresh across the whole app.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
