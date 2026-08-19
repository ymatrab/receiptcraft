"use client";

import { useId } from "react";
import type { SectionType } from "@/lib/sections";
import { SECTION_LABEL } from "@/lib/sections";
import Modal from "@/components/Modal";
import {
  BarcodeIcon,
  CalendarIcon,
  CardIcon,
  CartIcon,
  CloseIcon,
  DocumentIcon,
  ImageIcon,
  InfoIcon,
  MessageIcon,
  PenIcon,
  QrIcon,
  SpacerIcon,
  TagIcon,
  type IconComponent,
} from "@/components/Icons";

const ORDER: SectionType[] = [
  "header",
  "datetime",
  "twocol",
  "items",
  "payment",
  "message",
  "footer",
  "barcode",
  "qr",
  "image",
  "signature",
  "spacer",
];

// SVG rather than the emoji/Unicode mix this used to carry (🏷️ … ▮▯▮ ◳ ␣):
// those rendered at different weights per platform, went tofu on some, and
// couldn't inherit colour. These all draw on currentColor at one stroke width.
const ICON: Record<SectionType, IconComponent> = {
  header: TagIcon,
  datetime: CalendarIcon,
  twocol: InfoIcon,
  items: CartIcon,
  payment: CardIcon,
  message: MessageIcon,
  footer: DocumentIcon,
  barcode: BarcodeIcon,
  qr: QrIcon,
  image: ImageIcon,
  signature: PenIcon,
  spacer: SpacerIcon,
};

export default function AddSectionModal({
  onPick,
  onClose,
}: {
  onPick: (type: SectionType) => void;
  onClose: () => void;
}) {
  const titleId = useId();

  return (
    <Modal
      onClose={onClose}
      labelledBy={titleId}
      panelClassName="max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-lg font-bold text-slate-900">
          What section do you want to add?
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-2">
        {ORDER.map((type) => {
          const Icon = ICON[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => onPick(type)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Icon className="h-5 w-5 shrink-0 text-slate-500" />
              Add {SECTION_LABEL[type]} section
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
