"use client";

import type { SectionType } from "@/lib/sections";
import { SECTION_LABEL } from "@/lib/sections";

const ORDER: SectionType[] = [
  "header",
  "datetime",
  "twocol",
  "items",
  "payment",
  "message",
  "barcode",
  "qr",
  "image",
  "signature",
  "spacer",
];

const ICON: Record<SectionType, string> = {
  header: "🏷️",
  datetime: "🗓️",
  twocol: "ℹ️",
  items: "🛒",
  payment: "💳",
  message: "💬",
  barcode: "▮▯▮",
  qr: "◳",
  image: "🖼️",
  signature: "✒️",
  spacer: "␣",
};

export default function AddSectionModal({
  onPick,
  onClose,
}: {
  onPick: (type: SectionType) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-center text-lg font-bold text-slate-900">
          What section do you want to add?
        </h3>
        <div className="space-y-2">
          {ORDER.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onPick(type)}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50"
            >
              <span className="w-6 text-center text-base" aria-hidden="true">
                {ICON[type]}
              </span>
              Add {SECTION_LABEL[type]} section
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
