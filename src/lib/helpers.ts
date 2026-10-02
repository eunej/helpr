import type { Helper, SeaCountry, TaskCategory } from "@/lib/types";

export const HELPERS: Helper[] = [
  {
    id: "nova",
    name: "Nova",
    kind: "ai",
    specialty: "Resumes & profiles",
    blurb: "Rewrites resumes and LinkedIn blurbs so they sound hired, not hopeful.",
    eta: "~45 sec",
    languages: ["English"],
    rating: 4.9,
    jobsDone: 1280,
  },
  {
    id: "pixel",
    name: "Pixel",
    kind: "ai",
    specialty: "Captions & social",
    blurb: "Turns rough notes into scroll-stopping captions with a clear CTA.",
    eta: "~30 sec",
    languages: ["English"],
    rating: 4.8,
    jobsDone: 2104,
  },
  {
    id: "quill",
    name: "Quill",
    kind: "ai",
    specialty: "Email & outreach",
    blurb: "Drafts cold emails and follow-ups that get replies, not deletes.",
    eta: "~40 sec",
    languages: ["English"],
    rating: 4.7,
    jobsDone: 946,
  },
  {
    id: "mira",
    name: "Mira",
    kind: "human",
    specialty: "Editor on call",
    blurb: "Human editor for when tone really matters — bios, landing copy, pitches.",
    eta: "usually < 1 hr",
    city: "Remote · SEA",
    languages: ["English", "Korean"],
    rating: 4.9,
    jobsDone: 312,
  },
  {
    id: "prem",
    name: "Prem",
    kind: "human",
    specialty: "Bangkok local tips",
    blurb: "Transit, visas, neighborhoods, and “how do locals actually do this?”",
    eta: "usually < 30 min",
    country: "thailand",
    city: "Bangkok",
    languages: ["Thai", "English"],
    rating: 4.9,
    jobsDone: 418,
  },
  {
    id: "nok",
    name: "Nok",
    kind: "human",
    specialty: "Chiang Mai nomad life",
    blurb: "Coworking, scooter rules, monthly rentals, and Nimman vs Old City.",
    eta: "usually < 45 min",
    country: "thailand",
    city: "Chiang Mai",
    languages: ["Thai", "English"],
    rating: 4.8,
    jobsDone: 267,
  },
  {
    id: "kitt",
    name: "Kitt",
    kind: "human",
    specialty: "Thailand travel logistics",
    blurb: "Islands, buses, 30-day stays, and what tourist blogs get wrong.",
    eta: "usually < 1 hr",
    country: "thailand",
    city: "Phuket",
    languages: ["Thai", "English"],
    rating: 4.7,
    jobsDone: 189,
  },
  {
    id: "an",
    name: "An",
    kind: "human",
    specialty: "Saigon street smarts",
    blurb: "District picks, Grab vs xe ôm, SIM cards, and coffee shop Wi‑Fi that works.",
    eta: "usually < 30 min",
    country: "vietnam",
    city: "Ho Chi Minh City",
    languages: ["Vietnamese", "English"],
    rating: 4.9,
    jobsDone: 503,
  },
  {
    id: "linh",
    name: "Linh",
    kind: "human",
    specialty: "Vietnam admin & visas",
    blurb: "E-visas, address registration, banking basics, and landlord quirks.",
    eta: "usually < 1 hr",
    country: "vietnam",
    city: "Da Nang",
    languages: ["Vietnamese", "English"],
    rating: 4.8,
    jobsDone: 221,
  },
  {
    id: "bao",
    name: "Bao",
    kind: "human",
    specialty: "Hanoi culture & language",
    blurb: "What to say at markets, polite phrases, and Old Quarter survival tips.",
    eta: "usually < 45 min",
    country: "vietnam",
    city: "Hanoi",
    languages: ["Vietnamese", "English", "French"],
    rating: 4.9,
    jobsDone: 174,
  },
  {
    id: "sam",
    name: "Sam",
    kind: "human",
    specialty: "Freelance ops",
    blurb: "Invoices, client chase scripts, and getting paid while hopping cities.",
    eta: "usually < 2 hr",
    city: "Remote · SEA",
    languages: ["English"],
    rating: 4.6,
    jobsDone: 98,
  },
];

/** Sentinel for “post to the open board” instead of hiring one person. */
export const OPEN_BOARD_ID = "open-board";

export const CATEGORIES: {
  id: TaskCategory;
  label: string;
  example: string;
  defaultBudget: number;
  suggestedHelperId: string;
  country?: SeaCountry;
  marketplaceDefault?: boolean;
}[] = [
  {
    id: "ask-thailand",
    label: "Ask a local · Thailand",
    example:
      "e.g. Best neighborhood in Chiang Mai for 1 month? Can I pay rent in USDC?",
    defaultBudget: 2,
    suggestedHelperId: OPEN_BOARD_ID,
    country: "thailand",
    marketplaceDefault: true,
  },
  {
    id: "ask-vietnam",
    label: "Ask a local · Vietnam",
    example:
      "e.g. Which Da Nang district for remote work? How does e-visa re-entry work?",
    defaultBudget: 2,
    suggestedHelperId: OPEN_BOARD_ID,
    country: "vietnam",
    marketplaceDefault: true,
  },
  {
    id: "resume",
    label: "Fix my resume",
    example: "Paste a bullet list or rough bio. Nova will return a cleaner version.",
    defaultBudget: 3,
    suggestedHelperId: "nova",
  },
  {
    id: "caption",
    label: "Edit this caption",
    example: "Drop a draft Instagram/TikTok caption. Pixel will punch it up.",
    defaultBudget: 1,
    suggestedHelperId: "pixel",
  },
  {
    id: "email",
    label: "Write an email",
    example: "Who are you emailing and what do you need? Quill drafts it.",
    defaultBudget: 2,
    suggestedHelperId: "quill",
  },
  {
    id: "rewrite",
    label: "Rewrite this",
    example: "Paste awkward copy. Get a clearer version back.",
    defaultBudget: 2,
    suggestedHelperId: "nova",
  },
  {
    id: "other",
    label: "Something else",
    example: "Describe the digital task. Hire AI, a human, or post to the board.",
    defaultBudget: 2,
    suggestedHelperId: "mira",
  },
];

export function getHelper(id: string): Helper {
  return HELPERS.find((h) => h.id === id) ?? HELPERS[0];
}

export function getHumanHelpers(): Helper[] {
  return HELPERS.filter((h) => h.kind === "human");
}

export function helpersForCategory(category: TaskCategory): Helper[] {
  const meta = CATEGORIES.find((c) => c.id === category);
  if (meta?.country) {
    return HELPERS.filter(
      (h) => h.kind === "human" && h.country === meta.country
    );
  }
  return HELPERS;
}

export function countryLabel(country?: SeaCountry): string {
  if (country === "thailand") return "Thailand";
  if (country === "vietnam") return "Vietnam";
  return "SEA";
}
