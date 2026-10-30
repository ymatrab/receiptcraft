import type { Delivery } from "@/lib/chat";

const LABEL: Record<Delivery, string> = {
  sent: "Sent",
  delivered: "Sent",
  seen: "Seen",
};

/**
 * The usual messenger receipt under a message you sent:
 *   ✓  grey — sent, the other side isn't around
 *   ✓✓ grey — sent, the other side is on the site
 *   ✓✓ blue — seen, they had the chat open
 */
export default function Ticks({ state }: { state: Delivery }) {
  return (
    <p
      className={`mt-0.5 pr-1 text-right text-[11px] ${
        state === "seen" ? "font-medium text-sky-600" : "text-slate-500"
      }`}
    >
      <span aria-hidden className="mr-1 tracking-[-0.2em]">
        {state === "sent" ? "✓" : "✓✓"}
      </span>
      {LABEL[state]}
    </p>
  );
}
