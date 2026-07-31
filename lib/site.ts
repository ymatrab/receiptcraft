export const SITE = {
  name: "Makecepeit",
  tagline: "Free Receipt Maker — Create & Download Receipts in Seconds",
  // Kept under ~160 chars so it doesn't truncate in SERPs. Used as the default
  // meta description + OpenGraph/Twitter/WebSite-schema description site-wide.
  description:
    "Create professional receipts online for free using 100+ templates — live preview, instant PDF & PNG download, and no sign-up to start.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.makecepeit.com",
  twitter: "@makecepeit",
  email: "hello@makecepeit.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-LD43YK0L5B",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "xd2t5uav4n",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
