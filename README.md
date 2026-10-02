# Helpr

**Hire a helper. Escrow the payment. Accept when it’s done.**

Helpr is a consumer app for everyday digital tasks — fix a resume, edit a caption, draft an email. An AI agent (or human helper) delivers the work while **USDC stays locked in escrow** until you accept.

Built for Superteam Thailand’s Chiang Mai Build Lab and Colosseum Crypto World’s Fair — aimed at **Best AI / Agent** and **Best Consumer / Real-World Application**.

## Why Solana is here

Crypto is the rail, not the brand. Escrow + receipts give trust without Patreon/Upwork middlemen taking a cut of tiny jobs. The UI speaks USD; the demo ledger mimics Solana USDC settlement.

## Demo flow

1. Open the app with a **$50 USDC** demo balance.
2. Post a task and pick a helper (Nova, Pixel, Quill, or Mira).
3. Budget locks in escrow; the helper runs and returns a deliverable.
4. **Accept** to release payment, or **Reject** to refund.

Data lives in your browser (`localStorage`) so the demo works offline of any chain RPC.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43173](http://127.0.0.1:43173).

```bash
npm run build
npm start
```

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui (Base UI)
- Local escrow ledger + helper agent API (`/api/helpers/run`)

## Hackathon notes

- No API keys required — the helper agent uses a deterministic writing pipeline.
- Reset demo data anytime from the tasks screen.
- Next step for Colosseum: wire real Solana USDC escrow + optional LLM provider.
