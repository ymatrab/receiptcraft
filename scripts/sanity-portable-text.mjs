/**
 * Minimal Markdown → Sanity Portable Text converter for the blog seeder.
 * Supports exactly the syntax our articles use:
 *   "## " h2, "### " h3, "> " blockquote, "- " bullets, "1. " numbered lists,
 *   GFM pipe tables (a "| a | b |" row followed by a "| --- | --- |" divider),
 *   [text](href) links, **bold**, blank-line-separated paragraphs,
 *   and "![alt](path)" on its own line for an inline body image.
 */
import { randomBytes } from "node:crypto";

const key = () => randomBytes(6).toString("hex");

/** Parse inline [links](href) and **bold** into spans + markDefs. */
function parseInline(text) {
  const children = [];
  const markDefs = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      children.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    }
    if (m[1] !== undefined) {
      const defKey = key();
      markDefs.push({ _key: defKey, _type: "link", href: m[2] });
      children.push({ _type: "span", _key: key(), text: m[1], marks: [defKey] });
    } else {
      children.push({ _type: "span", _key: key(), text: m[3], marks: ["strong"] });
    }
    last = re.lastIndex;
  }
  if (last < text.length) {
    children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  }
  if (children.length === 0) {
    children.push({ _type: "span", _key: key(), text: "", marks: [] });
  }
  return { children, markDefs };
}

function block(text, style, listItem) {
  const { children, markDefs } = parseInline(text);
  const b = { _type: "block", _key: key(), style, markDefs, children };
  if (listItem) {
    b.listItem = listItem;
    b.level = 1;
  }
  return b;
}

/**
 * Build a Portable Text image block. `resolveImage(path)` maps a local asset
 * path to an uploaded Sanity asset id; when it can't (e.g. --dry, before upload)
 * the block keeps `_localPath` so the caller can still inspect it.
 */
function imageBlock(path, alt, resolveImage) {
  const b = { _type: "image", _key: key(), alt };
  const ref = resolveImage?.(path);
  if (ref) b.asset = { _type: "reference", _ref: ref };
  else b._localPath = path;
  return b;
}

/** Split a pipe-table row "| a | b |" into trimmed cell strings. */
function splitRow(line) {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

/** A "| --- | :--: |" divider row that separates a table header from its body. */
const isTableDivider = (line) => /^\|?[\s:|-]+\|?$/.test(line.trim()) && line.includes("-") && line.includes("|");

/**
 * Portable Text table block. The first row is the header. Cells are plain
 * strings; the blog renderer draws the first row as <thead> and the rest as
 * body rows. Kept string-only because our table cells carry no inline marks.
 */
function tableBlock(rows) {
  return {
    _type: "table",
    _key: key(),
    rows: rows.map((cells) => ({ _key: key(), _type: "tableRow", cells })),
  };
}

/** Convert a markdown-lite string into an array of Portable Text blocks. */
export function toPortableText(md, resolveImage) {
  const blocks = [];
  // One block per non-empty line; blank lines just separate. A pipe table spans
  // several adjacent lines, so it is consumed as a run with look-ahead.
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    // Pipe table: a "| … |" row immediately followed by a "| --- | --- |" divider.
    if (line.startsWith("|") && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const rows = [splitRow(line)];
      i += 2; // consume the header row and the divider
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i].trim()));
        i++;
      }
      blocks.push(tableBlock(rows));
      continue;
    }
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) blocks.push(imageBlock(img[2], img[1], resolveImage));
    else if (line.startsWith("## ")) blocks.push(block(line.slice(3), "h2"));
    else if (line.startsWith("### ")) blocks.push(block(line.slice(4), "h3"));
    else if (line.startsWith("> ")) blocks.push(block(line.slice(2), "blockquote"));
    else if (line.startsWith("- ")) blocks.push(block(line.slice(2), "normal", "bullet"));
    else if (/^\d+\.\s/.test(line)) blocks.push(block(line.replace(/^\d+\.\s/, ""), "normal", "number"));
    else blocks.push(block(line, "normal"));
    i++;
  }
  return blocks;
}

export const withKeys = (faqs) =>
  faqs.map((f) => ({ _key: key(), _type: "object", question: f.q, answer: f.a }));
