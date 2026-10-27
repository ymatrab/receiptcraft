/**
 * The generic templates the builder offers as one-tap chips.
 *
 * A hand-kept copy of TEMPLATES.slice(0, 14)'s slug, name and icon, because
 * importing lib/templates into the builder ships every template and every brand
 * receipt (~90 KB compressed) to a page that only ever shows one. The template
 * itself is fetched on demand from /api/template. lib/templates checks at build
 * time that this list still matches, so a renamed or removed template fails the
 * build instead of leaving a dead chip.
 */
export const BUILDER_TEMPLATE_CHIPS: readonly { slug: string; shortName: string; icon: string }[] = [
  { slug: "grocery-store", shortName: "Grocery", icon: "🛒" },
  { slug: "restaurant", shortName: "Restaurant", icon: "🍽️" },
  { slug: "coffee-shop", shortName: "Coffee", icon: "☕" },
  { slug: "gas-station", shortName: "Gas", icon: "⛽" },
  { slug: "taxi", shortName: "Taxi", icon: "🚕" },
  { slug: "hotel", shortName: "Hotel", icon: "🏨" },
  { slug: "retail-store", shortName: "Retail", icon: "🏬" },
  { slug: "pharmacy", shortName: "Pharmacy", icon: "💊" },
  { slug: "bar", shortName: "Bar", icon: "🍺" },
  { slug: "salon", shortName: "Salon", icon: "💇" },
  { slug: "auto-repair", shortName: "Auto", icon: "🔧" },
  { slug: "oil-change-receipt", shortName: "Oil Change", icon: "🛢️" },
  { slug: "rent-receipt-india", shortName: "Rent (India)", icon: "🏠" },
  { slug: "fuel-bill", shortName: "Fuel Bill", icon: "⛽" },
];
