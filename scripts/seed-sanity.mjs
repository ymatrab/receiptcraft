/**
 * Seed the Sanity dataset with the blog author + categories.
 * Zero dependencies — plain fetch against Sanity's HTTP mutations API.
 *
 * Setup (one time):
 *   1. https://sanity.io/manage → project 3pvc71cl → API → Tokens → Add API token
 *      Name: "seed", Permissions: Editor. Copy the token.
 *   2. Add to .env.local:  SANITY_API_WRITE_TOKEN=sk...
 *   3. Run:  node scripts/seed-sanity.mjs
 *
 * Idempotent: uses createIfNotExists with stable _ids, safe to re-run.
 */
import { readFileSync } from "node:fs";

const PROJECT_ID = "3pvc71cl";
const DATASET = "production";
const API_VERSION = "2024-10-01";

// Read the token from the environment, falling back to .env.local.
let token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    token = env.match(/^SANITY_API_WRITE_TOKEN=(.+)$/m)?.[1]?.trim();
  } catch {
    /* no .env.local */
  }
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "Create one at https://sanity.io/manage (project 3pvc71cl → API → Tokens, permission: Editor)\n" +
      "then add SANITY_API_WRITE_TOKEN=sk... to .env.local and re-run."
  );
  process.exit(1);
}

const category = (id, title, description) => ({
  createIfNotExists: {
    _id: `category-${id}`,
    _type: "category",
    title,
    slug: { _type: "slug", current: id },
    description,
  },
});

const mutations = [
  {
    createIfNotExists: {
      _id: "author-sara-artheta",
      _type: "author",
      name: "Sara Artheta",
      bio: "Founder & Editor of Makecepeit. Background in small-business bookkeeping and expense reporting; writes the receipt guides and reviews every template for realism.",
    },
  },
  category("basics", "Basics", "What receipts are, their parts, types and terminology."),
  category("lost-receipts", "Lost Receipts", "Finding, reprinting and replacing lost receipts, store by store."),
  category("expenses", "Expenses", "Expense reports, reimbursement rules and receipt requirements at work."),
  category("small-business", "Small Business", "Writing and issuing receipts as a business, landlord or freelancer."),
  category("taxes", "Taxes", "Which receipts to keep for taxes, retention rules, audits and deductions."),
  category("how-to", "How-To", "Step-by-step guides to making every kind of receipt."),
  category("digital", "Digital", "E-receipts, thermal printers, scanning apps and receipt technology."),
  category("legal", "Legal", "Receipt law, fraud awareness and responsible use."),
];

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  }
);

const body = await res.json();
if (!res.ok) {
  console.error("Seed failed:", JSON.stringify(body, null, 2));
  process.exit(1);
}
console.log(`✓ Seeded ${mutations.length} documents (author + 8 categories).`);
console.log("Verify: https://3pvc71cl.api.sanity.io/v2024-10-01/data/query/production?query=*%5B_type%3D%3D%22category%22%5D%7Btitle%7D");
