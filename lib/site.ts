export const SITE = {
  name: "Makecepeit",
  // Deliberately not "Free Receipt Maker …": that is /create's title and H1,
  // and in Aug 2026 Google was showing both pages for "receipt maker", each at
  // position ~89. /create owns the head term; the homepage leads on the brand
  // catalogue, which is what it can win that /create cannot.
  tagline: "Makecepeit — Brand Receipt Templates & Receipt Builder",
  // The default meta description lives in lib/counts.ts as SITE_DESCRIPTION,
  // because it quotes the real brand count and this module is imported by client
  // components — importing the catalogue here would ship it to the browser.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.makecepeit.com",
  twitter: "@makecepeit",
  email: "hello@makecepeit.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-LD43YK0L5B",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "xd2t5uav4n",
  /**
   * Where the post-download review prompt sends people. Empty means the prompt
   * never renders, which is the state this ships in — nothing is visible until
   * a real destination is set here.
   *
   * For Trustpilot, use the deep link to the review form rather than the
   * profile page, so the user lands on the thing we are asking them to do:
   *
   *   https://www.trustpilot.com/evaluate/makecepeit.com
   *
   * That URL works whether or not the profile has been claimed, so reviews can
   * start accumulating before the business account exists. Claiming it later
   * adopts whatever has already been left.
   *
   * Whatever goes here must be a public review destination open to everyone we
   * show it to. Routing only satisfied users to it — asking for a rating first
   * and forwarding just the happy ones — is review gating: against Trustpilot's
   * guidelines and, in the US, the FTC's consumer-review rule. See
   * components/builder/ReviewPrompt.tsx.
   */
  reviewUrl: process.env.NEXT_PUBLIC_REVIEW_URL ?? "",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
