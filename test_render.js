const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
require('ts-node').register({ transpileOnly: true });

const { BRAND_TEMPLATES } = require('./lib/brands.ts');
const { previewFromTemplate } = require('./lib/receipt.ts');
const ReceiptPaper = require('./components/receipt/ReceiptPaper.tsx').default;

const t = BRAND_TEMPLATES[0]; // walmart
const preview = previewFromTemplate(t);

const html = renderToString(createElement(ReceiptPaper, { data: preview }));
console.log(html.includes("logo.clearbit.com") ? "LOGO RENDERED" : "NO LOGO");
console.log(html.includes("GV Whole Milk") ? "ITEMS RENDERED" : "NO ITEMS");
