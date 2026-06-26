export const SITE = {
  name: "Makecepeit",
  tagline: "Free Receipt Maker — Create & Download Receipts in Seconds",
  description:
    "Create professional receipts online for free. 100+ receipt templates for restaurants, gas stations, taxis, hotels and more. Live preview, instant PDF & PNG download. No sign-up to start — go Pro to remove the watermark.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.makecepeit.com",
  twitter: "@makecepeit",
  email: "hello@makecepeit.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-LD43YK0L5B",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "xd2t5uav4n",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
