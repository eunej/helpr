import { clusterApiUrl, PublicKey } from "@solana/web3.js";

export const SOLANA_CLUSTER = "devnet" as const;

export const SOLANA_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? clusterApiUrl(SOLANA_CLUSTER);

/** Circle USDC on Solana Devnet (6 decimals). */
export const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
);

export const USDC_DECIMALS = 6;

/** Helpr escrow treasury — USDC locks land here on hire. */
export const ESCROW_TREASURY = new PublicKey(
  "AtmcvMdb3gSjqMBBkjUVUcW6ADdAY3V3ZgW1P4PqewBA"
);

export const CIRCLE_USDC_FAUCET = "https://faucet.circle.com/";
export const SOLANA_SOL_FAUCET = "https://faucet.solana.com/";

export function explorerTx(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_CLUSTER}`;
}

export function explorerAddress(address: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=${SOLANA_CLUSTER}`;
}

export function shortenAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function usdToUsdcAmount(usd: number): bigint {
  return BigInt(Math.round(usd * 10 ** USDC_DECIMALS));
}

export function usdcAmountToUsd(amount: bigint | number): number {
  return Number(amount) / 10 ** USDC_DECIMALS;
}
