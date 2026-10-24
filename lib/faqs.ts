import { BRAND_COUNT, TEMPLATE_COUNT } from "@/lib/counts";
import { FREE_LIMITS, PLANS, formatPlanPrice } from "@/lib/plans";

const WEEK = formatPlanPrice(PLANS.pro_weekly);
const MONTH = formatPlanPrice(PLANS.pro_monthly);
const YEAR = formatPlanPrice(PLANS.pro_yearly);

export interface Faq {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: Faq[] = [
  {
    question: "Is Makecepeit free?",
    answer:
      `Yes, Makecepeit is free to use. All ${TEMPLATE_COUNT} receipt templates and ${BRAND_COUNT} brand-style layouts, unlimited line items and the live preview work with no account and no email address. The AI generator needs a free account: it gives you 3 receipts a month, and unlimited on Pro. Downloading needs no account either: free downloads (PDF, PNG or JPG) include a small Makecepeit watermark in the background. A watermark-free download needs Pro — a one-time pass of ${WEEK} for 7 days, ${MONTH} for a month or ${YEAR} for a year, paid at checkout with no account needed and never renewed automatically. Pro also unlocks unlimited AI receipt generation. There is no trial period that expires: the free tier stays free.`,
  },
  {
    question: "Do I need to create an account to make a receipt?",
    answer:
      `No. You can build, preview and download a receipt with no sign-up; free downloads include a small watermark. A watermark-free download needs Pro, from ${WEEK} for 7 days, and you can pay at checkout without an account. A free account is only needed for the AI generator (${FREE_LIMITS.aiGenerationsPerMonth} receipts a month) and to save receipts to reopen later.`,
  },
  {
    question: "What file formats can I download my receipt in?",
    answer:
      "You can download your receipt in four formats: PDF (sized to the receipt), a print-ready PDF centered on an A4 page for office printers, PNG with a transparent-friendly background, and JPG with a white background. All image exports are rendered at 3x resolution, so they stay sharp when printed, zoomed or attached to expense reports and emails. The PDF is the best choice for expense software and formal records; PNG is ideal when you need to place the receipt into a design, presentation or document.",
  },
  {
    question: "Is it legal to make your own receipt?",
    answer:
      "Yes — creating a receipt is legal when it documents something real. Legitimate uses include replacing a lost or faded receipt for a purchase that actually happened, issuing receipts to customers as a small business or freelancer without a point-of-sale system, writing rent or cash-payment receipts, keeping personal bookkeeping records, and producing props for film, theatre or design mockups that are never presented as real documents. What makes a receipt illegal is intent to deceive: using a fabricated receipt to claim reimbursement for purchases you never made, inflate business expenses, evade taxes, fake a return or warranty claim, or mislead any person or institution is fraud in every jurisdiction. The document itself is neutral — how you use it is what matters, and you are solely responsible for that use.",
  },
  {
    question: "Can I change the currency, tax rate and tip?",
    answer:
      "Yes. Makecepeit supports 10 currencies including USD, EUR, GBP and INR, a custom tax label (Sales Tax, VAT, GST) with any rate, flat discounts, and tips. Totals are recalculated instantly as you type.",
  },
  {
    question: "How long does it take to create a receipt?",
    answer:
      "Under a minute for most receipts. Pick a template that matches your business type, adjust the pre-filled items and details, and download. Starting from scratch typically takes two to three minutes.",
  },
  {
    question: "Will my receipt have a watermark?",
    answer:
      `Free downloads include a small Makecepeit watermark, with or without an account. Pro removes it completely — every download is watermark-free, with no branding anywhere on the document. Pro starts at ${WEEK} for 7 days and never renews on its own.`,
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "Not unless you ask for it. The receipt builder runs in your browser, so the details you type — business names, items, prices — stay on your device. Data only reaches our servers if you use the optional AI generator (your short description) or choose to save a receipt to your account.",
  },
];
