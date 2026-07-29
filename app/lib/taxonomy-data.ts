// Content model for the One YCP industry-practice alignment survey.
// Ported from the original YCP_Industry_Alignment_Tool_1.html data arrays.

export type MatrixCellStatus = "ok" | "div" | "gap";

export interface MatrixCell {
  v: string;
  s: MatrixCellStatus;
  m?: string;
}

export interface MatrixRow {
  c: string;
  cells: MatrixCell[];
}

// Screen 1 — comparison matrix. status: 'ok' | 'div' | 'gap'
// m = short note shown on hover (the specific issue)
export const MATRIX: MatrixRow[] = [
  {
    c: "Automotive & Mobility",
    cells: [
      { v: "Automotive & Mobility", s: "ok" },
      { v: "Automotive & Mobility", s: "ok" },
      { v: "Automotive & Mobility", s: "ok" },
      { v: "Automotive & Mobility", s: "ok" },
      { v: "Mobility", s: "div", m: "Shortened label — same practice" },
    ],
  },
  {
    c: "Aerospace & Defense",
    cells: [
      { v: "Aerospace & Defense", s: "div", m: "On the public site only" },
      { v: "—", s: "gap", m: "Not in the credentials pack" },
      { v: "—", s: "gap", m: "No HUB sector" },
      { v: "—", s: "gap", m: "No expert category" },
      { v: "—", s: "gap", m: "Not a focus line" },
    ],
  },
  {
    c: "Construction & Infrastructure",
    cells: [
      { v: "Construction & Infrastructure", s: "ok" },
      { v: "Construction + Infrastructure", s: "div", m: "Split across two separate tiles" },
      { v: "Construction & Infrastructure", s: "ok" },
      { v: "Construction & Infrastructure", s: "ok" },
      { v: "via 'Industrial' ?", s: "div", m: "Not explicit — unclear if inside Industrial" },
    ],
  },
  {
    c: "Real Estate",
    cells: [
      { v: "—", s: "gap", m: "Not listed on the website" },
      { v: "—", s: "gap", m: "Not in the credentials pack" },
      { v: "Real Estate", s: "div", m: "Only HUB has it — parent practice undefined" },
      { v: "—", s: "gap", m: "No expert category" },
      { v: "—", s: "gap", m: "Not a focus line" },
    ],
  },
  {
    c: "Consumer & Retail",
    cells: [
      { v: "Consumer & Retail", s: "ok" },
      { v: "Consumer & Retail", s: "ok" },
      { v: "Consumer Goods & Service", s: "div", m: "Different label" },
      { v: "Consumer & Retail", s: "ok" },
      { v: "Consumer & Retail", s: "ok" },
    ],
  },
  {
    c: "Food, Beverage & Restaurants",
    cells: [
      { v: "Restaurant & Food Services", s: "div", m: "Standalone industry on the site" },
      { v: "F&B", s: "div", m: "Separate credentials tile" },
      { v: "Food, Bev & Tobacco / Hotels & Restaurants", s: "div", m: "Two separate HUB sectors" },
      { v: "—", s: "gap", m: "No expert category" },
      { v: "in Consumer & Retail", s: "ok", m: "Folded into Consumer" },
    ],
  },
  {
    c: "Energy & Natural Resources",
    cells: [
      { v: "Energy & Natural Resources", s: "ok" },
      { v: "Energy & Materials", s: "div", m: "Different label" },
      { v: "Chemicals & Energy / Oil&Gas / Mining / Utilities", s: "div", m: "Fragmented into four HUB sectors" },
      { v: "Chemicals & Energy", s: "div", m: "Different label" },
      { v: "Energy & Materials", s: "div", m: "Different label" },
    ],
  },
  {
    c: "Financial Services",
    cells: [
      { v: "Financial Services", s: "ok" },
      { v: "Investment & Finance", s: "div", m: "Different label — also merges in PE" },
      { v: "Financial Services", s: "ok" },
      { v: "Financial Services", s: "ok" },
      { v: "—", s: "gap", m: "Not a focus line" },
    ],
  },
  {
    c: "Private Equity & Investors",
    cells: [
      { v: "Private Equity & Investments", s: "div", m: "Listed as an industry — conflicts with proposed treatment" },
      { v: "inside Investment & Finance", s: "div", m: "Bundled with Financial Services" },
      { v: "Private Equity and Investors", s: "div", m: "Its own HUB sector" },
      { v: "Private Equity & Investment", s: "div", m: "Its own expert category" },
      { v: "—", s: "gap", m: "Not a focus line" },
    ],
  },
  {
    c: "Healthcare & Life Sciences",
    cells: [
      { v: "Healthcare", s: "div", m: "'Life Sciences' not explicit" },
      { v: "Healthcare", s: "div", m: "'Life Sciences' not explicit" },
      { v: "Healthcare / Pharma, Chemicals & Research", s: "div", m: "Pharma split into a separate sector" },
      { v: "Healthcare", s: "ok" },
      { v: "Healthcare", s: "ok" },
    ],
  },
  {
    c: "Industrials",
    cells: [
      { v: "Industrials", s: "ok" },
      { v: "Industrials", s: "ok" },
      { v: "Manufacturing / Ind. Equipment / Electrical", s: "div", m: "Fragmented into three HUB sectors" },
      { v: "Manufacturing", s: "div", m: "Different label" },
      { v: "Industrial", s: "div", m: "Shortened label" },
    ],
  },
  {
    c: "Public Sector & Institutions",
    cells: [
      { v: "Public Sector", s: "ok" },
      { v: "Public Sector", s: "ok" },
      { v: "Government & Education", s: "div", m: "Different label" },
      { v: "—", s: "gap", m: "No expert category — yet it's a named MSD focus" },
      { v: "Public Sector", s: "ok" },
    ],
  },
  {
    c: "Transportation & Logistics",
    cells: [
      { v: "Transportation & Logistics", s: "ok" },
      { v: "Logistics", s: "div", m: "Narrower label — transport omitted" },
      { v: "Distribution / Aviation", s: "div", m: "Split across two HUB sectors" },
      { v: "—", s: "gap", m: "No expert category" },
      { v: "Logistics & Transportation", s: "div", m: "Word order differs" },
    ],
  },
  {
    c: "Technology, Media & Telecom",
    cells: [
      { v: "TMT", s: "ok" },
      { v: "TMT", s: "ok" },
      { v: "TMT", s: "ok" },
      { v: "TMT", s: "ok" },
      { v: "TMT", s: "ok" },
    ],
  },
  {
    c: "Professional Services / Advisors",
    cells: [
      { v: "—", s: "gap", m: "Not on the site" },
      { v: "—", s: "gap", m: "Not in the credentials pack" },
      { v: "Advisors / Professional Services / Call Centres", s: "div", m: "Treated as industries — not a real client vertical" },
      { v: "—", s: "gap", m: "No expert category" },
      { v: "—", s: "gap", m: "Not a focus line" },
    ],
  },
];

export interface Practice {
  id: string;
  name: string;
  def: string;
  hub: string[];
  why: string;
  rolls?: string[];
}

// Screen 3 — the 10 proposed practices. hub[] = the HUB sub-industries (OXD) that roll up.
export const PRACTICES: Practice[] = [
  {
    id: "auto",
    name: "Automotive & Mobility",
    def: "Vehicle OEMs, components & suppliers, EV & charging, and mobility services.",
    hub: ["Automotive & Mobility"],
    why: "Universal across every internal source and every peer firm — unchanged.",
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    def: "The built environment and the firms that develop and build it: buildings, social & urban infrastructure, real estate, industrial/factory construction, building materials, and diversified EPC & developers.",
    rolls: ["Includes real estate and diversified EPC / developers"],
    hub: ["Construction & Infrastructure", "Real Estate"],
    why: "Merges the two separate credential tiles into one. Scope is set by the asset-purpose rule below — the residual built environment once energy and transport assets are removed.",
  },
  {
    id: "consumer",
    name: "Consumer & Retail",
    def: "Consumer goods & CPG, retail, packaged food & beverage, restaurants & food service, hospitality & leisure, luxury, and gems & jewellery.",
    hub: ["Consumer Goods & Service", "Food, Beverage & Tobacco", "Hotels, Restaurants & Leisure", "Gems & Jewellery"],
    why: "Folds packaged F&B and Restaurant & Food Services in — consistent with how GFI already operates, and with every peer (food is never a standalone top-level practice).",
  },
  {
    id: "energy",
    name: "Energy & Natural Resources",
    def: "Power generation incl. renewables, transmission & distribution / grid, oil & gas, mining & metals, chemicals, water & utilities, and agriculture.",
    hub: ["Chemicals & Energy", "Oil, Gas & Petrochemicals", "Mining & Raw Material", "Utilities", "Agriculture, Farming & Forestry"],
    why: "Adopts the website / market-standard label and consolidates HUB's separate energy & resource sub-industries. Captures all energy-purpose assets under the boundary rule.",
  },
  {
    id: "fs",
    name: "Financial Services (BFSI)",
    def: "Banking, insurance, asset & wealth management, capital markets, NBFCs, and fintech.",
    hub: ["Financial Services"],
    why: "Scoped cleanly to BFSI. Private Equity is removed as an industry and handled as an ownership attribute — see the block below.",
  },
  {
    id: "health",
    name: "Healthcare & Life Sciences",
    def: "Providers & payers, medical devices / medtech, pharmaceuticals, biotech, and diagnostics.",
    hub: ["Healthcare", "Pharma, Chemicals & Research"],
    why: "The public site says just 'Healthcare'; adding '& Life Sciences' makes clear that pharmaceuticals, biotech and medical devices are in scope, not only providers and payers.",
  },
  {
    id: "industrials",
    name: "Industrials",
    def: "Industrial goods & equipment, manufacturing, machinery, electrical & electronics, packaging/paper/printing, textiles, and defense manufacturing.",
    rolls: ["Includes defense manufacturing (the defense side of Aerospace & Defense)"],
    hub: ["Manufacturing", "Industrial Equipment", "Electrical & Electronics", "Packaging, Paper, Printing", "Textiles"],
    why: "Adopts the website label and consolidates HUB's fragmented manufacturing sub-industries into one practice.",
  },
  {
    id: "public",
    name: "Public Sector & Institutions",
    def: "Government & agencies, education, multilaterals & DFIs (ADB, IFC, JICA), associations, and NGOs & charities.",
    hub: ["Government & Education", "Associations, Organisations & Charities"],
    why: "Named a global focus but missing from the Expert database — this closes the gap and gives multilateral, government and institutional work a clear home.",
  },
  {
    id: "transport",
    name: "Transportation & Logistics",
    def: "Transport infrastructure and operations (roads, highways, rail, metro, airports, ports), aviation & airlines, logistics, warehousing, 3PL, and freight.",
    rolls: ["Includes aviation / airlines (the aerospace side of Aerospace & Defense)"],
    hub: ["Aviation", "Distribution"],
    why: "Standalone at senior peers. Captures all movement-purpose assets under the boundary rule.",
  },
  {
    id: "tmt",
    name: "Technology, Media & Telecommunications",
    def: "Software, hardware, semiconductors, internet & platforms, media & entertainment, and telecom.",
    hub: ["Technology, Media & Telecommunications"],
    why: "Universal and already identical across all five sources — no change.",
  },
];

// HUB sub-industries handled as cross-cutting tags / by primary business (not a standalone practice)
export const HUB_CROSSCUTTING: string[] = [
  "Private Equity and Investors",
  "Advisors",
  "Professional Services",
  "Call Centres",
  "Conglomerate",
  "Holding Companies",
  "Others",
];

export type VerdictKey = "agree" | "change" | "object";

export const VERDICT_OPTS: { k: VerdictKey; label: string }[] = [
  { k: "agree", label: "Agree" },
  { k: "change", label: "Suggest a change" },
  { k: "object", label: "Object" },
];

// Fixed extra review items shown alongside the 10 practices in Screen 3
export const RULE_ITEM_ID = "rule";
export const ATTR_ITEM_ID = "attr";

// Full ordered list of every item a reviewer gives a verdict on
export const REVIEW_ITEM_IDS: string[] = [RULE_ITEM_ID, ...PRACTICES.map((p) => p.id), ATTR_ITEM_ID];

// Human-readable label for each review item, keyed by id — used on the results page
export const REVIEW_ITEM_LABELS: Record<string, string> = {
  [RULE_ITEM_ID]: "Infrastructure classification rule",
  [ATTR_ITEM_ID]: "Cross-cutting attributes (PE & Aerospace/Defense split)",
  ...Object.fromEntries(PRACTICES.map((p) => [p.id, p.name])),
};
