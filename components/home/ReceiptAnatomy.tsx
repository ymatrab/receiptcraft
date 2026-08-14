/**
 * A schematic of a receipt with each zone numbered, paired with the definition
 * list in the parent section.
 *
 * Drawn as styled elements rather than annotating a live `ReceiptDocPaper`:
 * marker positions have to line up with zones exactly, and overlaying a render
 * whose height depends on its content makes that alignment fragile. Here the
 * structure is fixed, so a number always sits on the zone it names.
 */

const ZONES: { n: number; label: string; rows: React.ReactNode }[] = [
  {
    n: 1,
    label: "Header",
    rows: (
      <div className="text-center">
        <div className="text-[11px] font-bold tracking-wide text-slate-900">DAILY GRIND COFFEE CO.</div>
        <div className="mt-0.5 text-[9px] text-slate-500">412 Oak Street, Austin TX</div>
        <div className="text-[9px] text-slate-500">(512) 555-0177</div>
      </div>
    ),
  },
  {
    n: 2,
    label: "Identifiers",
    rows: (
      <div className="space-y-0.5 text-[9px] text-slate-600">
        <div className="flex justify-between"><span>Receipt #</span><span>482916</span></div>
        <div className="flex justify-between"><span>Date / time</span><span>2026-06-12 09:41</span></div>
        <div className="flex justify-between"><span>Register</span><span>2 · Maya</span></div>
      </div>
    ),
  },
  {
    n: 3,
    label: "Line items",
    rows: (
      <div className="space-y-0.5 text-[9px] text-slate-700">
        <div className="flex justify-between"><span>Caffe Latte (Grande)</span><span>5.25</span></div>
        <div className="flex justify-between"><span>Cappuccino (Tall)</span><span>4.50</span></div>
        <div className="flex justify-between"><span>Butter Croissant ×2</span><span>7.50</span></div>
      </div>
    ),
  },
  {
    n: 4,
    label: "Totals",
    rows: (
      <div className="space-y-0.5 text-[9px] text-slate-700">
        <div className="flex justify-between"><span>Subtotal</span><span>17.25</span></div>
        <div className="flex justify-between"><span>Sales Tax 8.25%</span><span>1.42</span></div>
        <div className="flex justify-between text-[11px] font-bold text-slate-900">
          <span>TOTAL</span>
          <span>18.67</span>
        </div>
      </div>
    ),
  },
  {
    n: 5,
    label: "Payment",
    rows: (
      <div className="space-y-0.5 text-[9px] text-slate-600">
        <div className="flex justify-between"><span>Credit Card</span><span>18.67</span></div>
        <div className="flex justify-between"><span>Card</span><span>•••• 4821</span></div>
      </div>
    ),
  },
  {
    n: 6,
    label: "Footer",
    rows: (
      <div className="text-center">
        <div className="text-[9px] italic text-slate-500">Fuel your day. See you tomorrow!</div>
        <div className="mt-2 flex h-7 items-end justify-center gap-[2px]" aria-hidden="true">
          {/* Deterministic bar widths — a random pattern would change on every
              render and make the schematic flicker between builds. */}
          {[3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1, 1, 2].map((w, i) => (
            <span
              key={i}
              className="block bg-slate-800"
              style={{ width: `${w}px`, height: i % 3 === 0 ? "100%" : "82%" }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export default function ReceiptAnatomy() {
  return (
    // pl-9 reserves the gutter the markers hang into, so they can sit outside
    // the paper without ever clipping against the section padding on mobile.
    <div className="relative mx-auto w-full max-w-[320px] pl-9">
      <div className="receipt-shadow rounded-sm bg-[#fffefb] px-5 py-6">
        <div className="space-y-3">
          {ZONES.map((zone, i) => (
            <div key={zone.n}>
              {i > 0 && <div className="mb-3 border-t border-dashed border-slate-300" />}
              <div className="relative">
                {/* The marker hangs outside the paper so it never covers a line
                    of the receipt it is pointing at. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[34px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white ring-4 ring-white"
                >
                  {zone.n}
                </span>
                {zone.rows}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
