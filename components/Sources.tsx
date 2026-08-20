import { SOURCES, getSources, lastVerified, type SourceId } from "@/lib/sources";

/**
 * Citation primitives.
 *
 * `Cite` is the one that matters: an in-body link to the authority backing the
 * sentence it sits in. A footer list alone is a weaker signal for both readers
 * and the engines that summarise the page — use `SourceList` as the companion,
 * not the substitute.
 *
 * Authority links are deliberately NOT nofollowed (unlike competitor links in
 * lib/comparisons.ts) — the association with the issuing body is the point.
 */

const NEW_TAB = "(opens in a new tab)";

function label(id: SourceId, children?: React.ReactNode) {
  if (children) return children;
  const s = SOURCES[id];
  return s ? s.title : null;
}

export function Cite({
  id,
  children,
  className,
}: {
  id: SourceId;
  /** Custom link text. Defaults to the document title. */
  children?: React.ReactNode;
  className?: string;
}) {
  const source = SOURCES[id];
  if (!source) return <>{children ?? null}</>;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener"
      title={`${source.publisher} — verified ${source.verifiedAt}`}
      className={
        className ??
        "font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-600"
      }
    >
      {label(id, children)}
      <span className="sr-only"> {NEW_TAB}</span>
    </a>
  );
}

/**
 * A sentence that attributes a claim to a source, with the link inline in the
 * prose rather than parked in a footnote. Write the sentence with `{source}`
 * where the link belongs:
 *
 *   <CitedSentence id="fcra-1681c-g" sentence="This is required by {source}." />
 */
export function CitedSentence({ id, sentence }: { id: SourceId; sentence: string }) {
  const parts = sentence.split("{source}");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? <Cite id={id} /> : null}
        </span>
      ))}
    </>
  );
}

/**
 * Renders body copy that carries inline citation markers, so data-driven text
 * (template guidance, for example) can cite an authority mid-sentence instead
 * of parking every link in a footer list — which is the weaker signal.
 *
 *   "An auto-gratuity is a service charge, not a tip
 *    {cite:irs-rr-2012-18|Revenue Ruling 2012-18}."
 *
 * `{cite:id}` links using the document title; `{cite:id|text}` overrides the
 * link text, which is what you usually want mid-sentence — some of these titles
 * run to a full line. Blank lines separate paragraphs. An unknown id falls back
 * to its plain link text rather than throwing, matching getSources().
 */
const CITE_MARKER = /\{cite:([a-z0-9-]+)(?:\|([^}]*))?\}/g;

function withCitations(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  CITE_MARKER.lastIndex = 0;

  while ((m = CITE_MARKER.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [full, id, linkText] = m;
    out.push(
      <Cite key={`${id}-${m.index}`} id={id as SourceId}>
        {linkText || undefined}
      </Cite>
    );
    last = m.index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function CitedText({ body, className }: { body: string; className?: string }) {
  return (
    <>
      {body.split(/\n\n+/).map((para, i) => (
        <p key={i} className={className}>
          {withCitations(para)}
        </p>
      ))}
    </>
  );
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SourceList({
  ids,
  heading = "Sources & references",
  note,
}: {
  ids: readonly SourceId[];
  heading?: string;
  /** Optional line explaining what the sources were consulted for. */
  note?: string;
}) {
  const sources = getSources(ids);
  if (sources.length === 0) return null;

  const checked = formatDate(lastVerified(ids));

  return (
    <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-xl font-bold text-slate-900">
        {heading}
      </h2>
      {note ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{note}</p> : null}

      <ol className="mt-4 space-y-3 text-sm">
        {sources.map((s) => (
          <li key={s.id} className="border-l-2 border-slate-200 pl-4">
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-indigo-600 hover:underline"
            >
              {s.title}
              <span className="sr-only"> {NEW_TAB}</span>
            </a>
            <p className="mt-0.5 text-slate-500">
              {s.publisher}
              {s.jurisdiction ? ` · ${s.jurisdiction}` : ""}
            </p>
            <p className="mt-1 leading-relaxed text-slate-600">{s.supports}</p>
          </li>
        ))}
      </ol>

      {checked ? (
        <p className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
          Sources last checked {checked}. We re-verify every link monthly and update
          the dates above. Citing these rules is not legal or tax advice — see our{" "}
          <a href="/editorial-policy" className="text-indigo-600 hover:underline">
            editorial policy
          </a>
          .
        </p>
      ) : null}
    </section>
  );
}
