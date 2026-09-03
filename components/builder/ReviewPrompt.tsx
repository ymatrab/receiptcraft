"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";
import { analytics } from "@/lib/analytics";

/**
 * Asks for a public review once, straight after a download that actually gave
 * the user what they came for.
 *
 * WHY IT ONLY EVER POINTS OUTWARD
 *
 * Ratings collected on our own site about ourselves cannot produce review rich
 * results — Google excludes self-serving reviews, and marking them up invites a
 * manual action. A third-party profile is the thing that earns a ranking page
 * for "makecepeit review" and gives an answer engine something to cite. So this
 * links out and stores no rating of its own, and nothing here is ever expressed
 * as AggregateRating schema. That also keeps us honest against the promise in
 * app/editorial-policy: we do not invent reviews, ratings or testimonials.
 *
 * WHY EVERYONE WHO SEES IT GETS THE SAME LINK
 *
 * There is deliberately no "how was it?" step in front of the link. Asking for
 * a sentiment first and forwarding only the positive answers is review gating,
 * which breaks Trustpilot's guidelines and the FTC's consumer-review rule. The
 * only segmentation is *when* we ask, never *who gets the good link*.
 *
 * WHEN IT APPEARS (all four must hold — enforced by the caller in
 * SectionBuilder.tsx, which owns the download outcome):
 *   - SITE.reviewUrl is set
 *   - the user is logged in and NOT Pro (the owner's call: don't nag payers)
 *   - the download came out clean, not watermarked
 *   - it has not been shown before
 *
 * The clean-download condition is the load-bearing one. A free user only gets a
 * watermark once their free credits are gone, so asking then would be asking
 * someone at the exact moment they hit a limit — a reliable way to farm
 * one-star reviews.
 */

const ASKED_KEY = "mkc_review_asked";

/**
 * Whether this browser has already been asked.
 *
 * Fails CLOSED: if storage throws (private mode, blocked site data) we report
 * "already asked". Guessing the other way would re-show the prompt after every
 * single download for exactly the users whose browser cannot remember the
 * dismissal, which is far worse than never asking them.
 */
export function reviewAlreadyAsked(): boolean {
  try {
    return localStorage.getItem(ASKED_KEY) === "1";
  } catch {
    return true;
  }
}

function markAsked(): void {
  try {
    localStorage.setItem(ASKED_KEY, "1");
  } catch {
    /* nothing to do — worst case this browser is asked once more */
  }
}

export default function ReviewPrompt({ onClose }: { onClose: () => void }) {
  // Mark on mount, not on dismiss: someone who ignores the card has answered
  // just as clearly as someone who closes it, and should not meet it again.
  //
  // Guarded on reviewUrl as well as the caller, because the effect runs before
  // the early return below: mounting this with no destination configured would
  // otherwise burn the once-ever flag and log a view for a card that rendered
  // nothing, permanently silencing the prompt for that browser.
  useEffect(() => {
    if (!SITE.reviewUrl) return;
    markAsked();
    analytics.reviewPromptShown();
  }, []);

  if (!SITE.reviewUrl) return null;

  return (
    // Not a dialog: a modal here would block someone who wants to download a
    // second format, which is a normal thing to do right after the first. Same
    // top-centre slot as the toast, one layer below it — a successful export
    // raises no toast, so in practice they never collide.
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[55] flex justify-center px-4">
      <section
        aria-label="Leave a review"
        className="pointer-events-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg"
      >
        <p className="text-sm font-medium leading-relaxed text-slate-700">
          Glad that worked. If {SITE.name} saved you time, a short review helps
          other people find it.
        </p>
        <div className="mt-3 flex gap-2">
          <a
            href={SITE.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              analytics.reviewPromptClicked();
              onClose();
            }}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Write a review
          </a>
          <button
            type="button"
            onClick={() => {
              analytics.reviewPromptDismissed();
              onClose();
            }}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            No thanks
          </button>
        </div>
      </section>
    </div>
  );
}
