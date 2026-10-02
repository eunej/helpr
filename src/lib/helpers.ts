import type { Helper, TaskCategory } from "@/lib/types";

export const HELPERS: Helper[] = [
  {
    id: "nova",
    name: "Nova",
    kind: "ai",
    specialty: "Resumes & profiles",
    blurb: "Rewrites resumes and LinkedIn blurbs so they sound hired, not hopeful.",
    eta: "~45 sec",
  },
  {
    id: "pixel",
    name: "Pixel",
    kind: "ai",
    specialty: "Captions & social",
    blurb: "Turns rough notes into scroll-stopping captions with a clear CTA.",
    eta: "~30 sec",
  },
  {
    id: "quill",
    name: "Quill",
    kind: "ai",
    specialty: "Email & outreach",
    blurb: "Drafts cold emails and follow-ups that get replies, not deletes.",
    eta: "~40 sec",
  },
  {
    id: "mira",
    name: "Mira",
    kind: "human",
    specialty: "Editor on call",
    blurb: "Human editor for when tone really matters. Simulated for this demo.",
    eta: "~2 min",
  },
];

export const CATEGORIES: {
  id: TaskCategory;
  label: string;
  example: string;
  defaultBudget: number;
  suggestedHelperId: string;
}[] = [
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
    example: "Describe the digital task. Pick a helper you trust.",
    defaultBudget: 2,
    suggestedHelperId: "mira",
  },
];

export function getHelper(id: string): Helper {
  return HELPERS.find((h) => h.id === id) ?? HELPERS[0];
}
