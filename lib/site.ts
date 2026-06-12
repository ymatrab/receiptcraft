export const SITE = {
  name: "ReceiptCraft",
  tagline: "Free Receipt Maker — Create & Download Receipts in Seconds",
  description:
    "Create professional receipts online for free. 12+ receipt templates for restaurants, gas stations, taxis, hotels and more. Live preview, instant PDF & PNG download. No sign-up, no watermark.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://receiptcraft.vercel.app",
  twitter: "@receiptcraft",
  email: "hello@receiptcraft.app",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
