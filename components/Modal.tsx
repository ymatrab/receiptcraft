"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  /** Called for Escape, backdrop click, and any close control the caller renders. */
  onClose: () => void;
  /** id of the caller's visible heading — becomes the dialog's accessible name. */
  labelledBy: string;
  panelClassName?: string;
  children: ReactNode;
}

/**
 * Accessible modal shell: dialog semantics, Escape to close, a focus trap,
 * focus restore on unmount and a background scroll lock.
 *
 * Extracted because the builder had three hand-rolled modals (add section,
 * watermark prompt, login prompt) that were each just a positioned div — no
 * role, no Escape, no trap — so keyboard users tabbed straight through to the
 * page behind the scrim and screen readers never announced a dialog at all.
 */
export default function Modal({ onClose, labelledBy, panelClassName = "", children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Remember what had focus so it can be handed back on close — otherwise
  // focus falls to the top of the document and keyboard users lose their place.
  const restoreRef = useRef<HTMLElement | null>(null);
  // Keep the latest onClose without re-running the effect (and so re-trapping
  // focus) every time the parent re-renders with a new closure.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      // mouseDown rather than click: a click handler also fires when a drag
      // that *started* inside the panel ends on the backdrop, closing the
      // dialog on what the user experienced as a text selection.
      onMouseDown={() => closeRef.current()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={panelClassName}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
