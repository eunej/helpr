# Helpr

**Hire a helper. Escrow the payment. Accept when it’s done.**

Helpr is a consumer app for everyday digital tasks and **Ask a local** questions in Thailand & Vietnam. AI agents or human helpers deliver; **USDC stays locked in escrow** until you accept.

Built for Superteam Thailand’s Chiang Mai Build Lab and Colosseum Crypto World’s Fair — aimed at **Best AI / Agent** and **Best Consumer / Real-World Application**.

## Why Solana is here

Crypto is the rail, not the brand. Escrow + receipts give trust without Patreon/Upwork middlemen taking a cut of tiny jobs. The UI speaks USD; the demo ledger mimics Solana USDC settlement.

## Two sides

- **Hire** (`/app`) — post tasks, ask locals, accept/refund
- **Earn as helper** (`/helper`) — claim open jobs, submit answers, track earnings

## Demo flow

1. Open the app with a **$50 USDC** demo balance.
2. Post **Ask a local · Thailand/Vietnam** to the open board (or hire an AI helper).
3. Switch to **Earn as helper**, pick Prem/Nok/An/etc., claim the job, submit an answer.
4. Back on Hire, **Accept** to release payment (or refund).

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
