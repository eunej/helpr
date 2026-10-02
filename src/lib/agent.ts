import type { TaskCategory } from "@/lib/types";

type RunInput = {
  category: TaskCategory;
  title: string;
  brief: string;
  helperName: string;
};

function polishLines(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function runHelperAgent(input: RunInput): string {
  const lines = polishLines(input.brief);
  const raw = lines.join(" ");

  switch (input.category) {
    case "resume":
      return resumeDeliverable(input.title, lines, raw, input.helperName);
    case "caption":
      return captionDeliverable(lines, raw, input.helperName);
    case "email":
      return emailDeliverable(input.title, raw, input.helperName);
    case "rewrite":
      return rewriteDeliverable(raw, input.helperName);
    case "ask-thailand":
      return localDeliverable("Thailand", input.title, raw, input.helperName);
    case "ask-vietnam":
      return localDeliverable("Vietnam", input.title, raw, input.helperName);
    default:
      return generalDeliverable(input.title, raw, input.helperName);
  }
}

function localDeliverable(
  country: string,
  title: string,
  raw: string,
  helper: string
): string {
  const question =
    raw ||
    title ||
    "How do locals handle this day to day?";

  return [
    `Local answer · ${country} · ${helper}`,
    "",
    "DIRECT ANSWER",
    capitalize(question),
    "",
    "WHAT LOCALS ACTUALLY DO",
    `• Start with the practical option first — cards and apps locals already use in ${country}.`,
    "• Confirm prices/times the same day; tourist info goes stale fast.",
    "• If money is involved, ask for a PromptPay / bank transfer / QR receipt before you commit.",
    "",
    "WATCH OUTS",
    "• Avoid anyone who demands crypto first with no escrow.",
    "• Screenshot addresses and names — helpful if Grab/maps drop you nearby.",
    "",
    "NEXT STEP",
    "If you share your city + budget + dates, I can narrow this to a concrete neighborhood or office.",
  ].join("\n");
}

function resumeDeliverable(
  title: string,
  lines: string[],
  raw: string,
  helper: string
): string {
  const bullets =
    lines.length >= 2
      ? lines.slice(0, 6).map((line) => {
          const cleaned = line.replace(/^[-•*\d.)\s]+/, "");
          return `• ${capitalize(cleaned)} — quantified impact ready for your next edit.`;
        })
      : [
          `• Owned end-to-end delivery for ${title || "key initiatives"}, cutting cycle time and clarifying ownership.`,
          `• Turned ambiguous requests into shipped outcomes; partnered across product, growth, and ops.`,
          `• Communicated progress in plain language so stakeholders could decide faster.`,
        ];

  return [
    `Resume rewrite by ${helper}`,
    "",
    "PROFESSIONAL SUMMARY",
    `Operator who ships. ${truncate(raw, 160) || "Results-minded builder comfortable owning messy problems from brief to launch."}`,
    "",
    "SELECTED BULLETS",
    ...bullets,
    "",
    "NEXT EDIT",
    "Swap in real metrics (%, $, time saved) where the placeholders sit. Keep each bullet under two lines.",
  ].join("\n");
}

function captionDeliverable(
  lines: string[],
  raw: string,
  helper: string
): string {
  const hook = capitalize(
    lines[0]?.replace(/^[-•*\d.)\s]+/, "") ||
      "Stop scrolling — this is the part that matters."
  );
  const body =
    truncate(raw, 180) ||
    "A clearer way to say what you’re building, without the fluff.";

  return [
    `Captions by ${helper}`,
    "",
    "OPTION A — Punchy",
    `${hook}`,
    "",
    `${body}`,
    "",
    "Save this. Share it. Or tell me what to change.",
    "",
    "OPTION B — Soft sell",
    `${hook} Here’s the honest version: ${body}`,
    "",
    "#buildinpublic #solana #makers",
    "",
    "CTA",
    "Reply with ‘draft’ if you want a version for Stories.",
  ].join("\n");
}

function emailDeliverable(title: string, raw: string, helper: string): string {
  const subject =
    title.trim() ||
    "Quick note — can we unblock this week?";

  return [
    `Email draft by ${helper}`,
    "",
    `Subject: ${subject}`,
    "",
    "Hi {{name}},",
    "",
    truncate(raw, 280) ||
      "I’m reaching out with a short ask and a clear reason it might be useful for you.",
    "",
    "If now’s a bad time, a one-line no is perfect. If it’s a yes, I can send a 10-minute outline next.",
    "",
    "Thanks,",
    "{{your name}}",
  ].join("\n");
}

function rewriteDeliverable(raw: string, helper: string): string {
  const text =
    raw ||
    "Your original copy was thin — here’s a tighter pass with a clearer point of view.";

  return [
    `Rewrite by ${helper}`,
    "",
    "CLEAR VERSION",
    capitalize(text),
    "",
    "WHY THIS WORKS",
    "• Leads with the point",
    "• Cuts filler hedges",
    "• Leaves one obvious next step",
    "",
    "ONE-LINE VERSION",
    truncate(capitalize(text), 110),
  ].join("\n");
}

function generalDeliverable(
  title: string,
  raw: string,
  helper: string
): string {
  return [
    `Delivery from ${helper}`,
    "",
    `Task: ${title}`,
    "",
    "RESULT",
    truncate(raw, 400) ||
      "Here’s a concrete first pass you can edit. Tell me what to tighten and I’ll revise inside escrow.",
    "",
    "CHECKLIST",
    "• Goal stated in one sentence",
    "• Output you can copy-paste",
    "• Clear ask if you want a revision before accepting",
  ].join("\n");
}

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}
