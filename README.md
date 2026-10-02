# Helpr

**Hire a helper. Escrow the payment. Accept when it’s done.**

Helpr is a consumer app for everyday digital tasks and **Ask a local** questions in Thailand & Vietnam. AI agents or human helpers deliver; **USDC stays locked in escrow** until you accept.

Built for Superteam Thailand’s Chiang Mai Build Lab and Colosseum Crypto World’s Fair — aimed at **Best AI / Agent** and **Best Consumer / Real-World Application**.

## Why Solana is here

Crypto is the rail, not the brand. Connect Phantom, Solflare, or any Wallet Standard wallet, read **USDC on Solana Devnet**, and lock the job budget on-chain when you post.

## Two sides

- **Hire** (`/app`) — post tasks, ask locals, accept/refund
- **Earn as helper** (`/helper`) — claim open jobs, submit answers, track earnings

## Demo flow

1. Connect a Solana wallet (header → **Connect wallet**). Switch the wallet to **Devnet**.
2. Get test SOL from [faucet.solana.com](https://faucet.solana.com/) and test USDC from [faucet.circle.com](https://faucet.circle.com/) (Solana Devnet).
3. Post **Ask a local · Thailand/Vietnam** (or hire an AI helper). Approve the USDC transfer into Helpr escrow.
4. Switch to **Earn as helper**, pick Prem/Nok/An/etc., claim the job, submit an answer.
5. Back on Hire, **Accept** to mark the job paid.

Without a wallet, posting still works on a local demo ledger.

Circle Devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43173](http://127.0.0.1:43173).

Optional custom RPC:

```bash
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com npm run dev
```

```bash
npm run build
npm start
```

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui (Base UI)
- Solana wallet adapter + SPL token (USDC Devnet)
- Local task board + helper agent API (`/api/helpers/run`)
