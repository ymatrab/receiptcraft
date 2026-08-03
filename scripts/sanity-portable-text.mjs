/**
 * Minimal Markdown → Sanity Portable Text converter for the blog seeder.
 * Supports exactly the syntax our articles use:
 *   "## " h2, "### " h3, "- " bullets, "1. " numbered lists,
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

/** Convert a markdown-lite string into an array of Portable Text blocks. */
export function toPortableText(md, resolveImage) {
  const blocks = [];
  // Paragraphs are separated by blank lines; list items are one per line.
  for (const rawChunk of md.split(/\n\s*\n/)) {
    const chunk = rawChunk.trim();
    if (!chunk) continue;
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (img) blocks.push(imageBlock(img[2], img[1], resolveImage));
      else if (line.startsWith("## ")) blocks.push(block(line.slice(3), "h2"));
      else if (line.startsWith("### ")) blocks.push(block(line.slice(4), "h3"));
      else if (line.startsWith("- ")) blocks.push(block(line.slice(2), "normal", "bullet"));
      else if (/^\d+\.\s/.test(line)) blocks.push(block(line.replace(/^\d+\.\s/, ""), "normal", "number"));
      else blocks.push(block(line, "normal"));
    }
  }
  return blocks;
}

export const withKeys = (faqs) =>
  faqs.map((f) => ({ _key: key(), _type: "object", question: f.q, answer: f.a }));
