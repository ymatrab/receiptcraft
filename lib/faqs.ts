export interface Faq {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: Faq[] = [
  {
    question: "Is Makecepeit free?",
    answer:
      "Yes. You can use every template, unlimited line items, live preview and PDF/PNG downloads for free, with no sign-up. Free downloads include a small Makecepeit watermark. Upgrade to Pro to remove the watermark and unlock HD exports, unlimited AI generation and saved receipt history.",
  },
  {
    question: "Do I need to create an account to make a receipt?",
    answer:
      "No. You can create and download receipts instantly without signing up, entering an email address or providing any personal information. An account is only needed if you upgrade to Pro or want to save receipts for later.",
  },
  {
    question: "What file formats can I download my receipt in?",
    answer:
      "You can download your receipt as a high-resolution PNG image or as a PDF document. Both formats are rendered at 3x resolution so they stay sharp when printed or attached to expense reports.",
  },
  {
    question: "Is it legal to make your own receipt?",
    answer:
      "Creating a receipt is legal for legitimate purposes: replacing a lost or faded receipt for a real purchase, issuing receipts as a small business, keeping personal records, or producing props and design mockups. Using a fabricated receipt to claim reimbursement for purchases you never made, evade taxes or defraud anyone is illegal everywhere. You are responsible for how you use the receipts you create.",
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
      "Free downloads include a small Makecepeit watermark. Upgrading to Pro removes it completely, so your PDF and PNG receipts are clean with no branding anywhere on the document.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "Not unless you ask for it. The receipt builder runs in your browser, so the details you type — business names, items, prices — stay on your device. Data only reaches our servers if you use the optional AI generator (your short description) or choose to save a receipt to your account.",
  },
];
