export interface Faq {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: Faq[] = [
  {
    question: "Is Makecepeit really free?",
    answer:
      "Yes. Every feature is free: all 12+ templates, unlimited line items, live preview, and unlimited PDF and PNG downloads. There is no trial, no premium tier, no watermark and no hidden cost.",
  },
  {
    question: "Do I need to create an account to make a receipt?",
    answer:
      "No. You can create and download receipts instantly without signing up, entering an email address or providing any personal information. Your receipt data is processed entirely in your browser and never uploaded to our servers.",
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
      "No. Downloaded receipts are completely clean, with no watermark, logo or branding from Makecepeit anywhere on the document.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. The receipt builder runs entirely in your browser. The details you type — business names, items, prices — are never sent to or stored on our servers, and they disappear when you close the page.",
  },
];
