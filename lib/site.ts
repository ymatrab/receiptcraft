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
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
