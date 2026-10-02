import type { EscrowEvent } from "@/lib/types";

/** Demo USDC escrow on Solana — signatures are deterministic demo hashes for the Build Lab. */
export function makeSignature(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const part = (n: number) => n.toString(16).padStart(8, "0");
  return `${part(hash)}${part(hash ^ 0x9e3779b9)}${part(~hash)}${part(hash * 2654435761)}`;
}

export function shortenSig(sig: string): string {
  if (sig.length < 12) return sig;
  return `${sig.slice(0, 6)}…${sig.slice(-6)}`;
}

export function createEscrowEvent(
  label: string,
  amountUsd: number,
  seed: string,
  signature?: string
): EscrowEvent {
  return {
    id: crypto.randomUUID(),
    label,
    amountUsd,
    signature: signature ?? makeSignature(seed),
    at: new Date().toISOString(),
    onchain: Boolean(signature),
  };
}

export const STARTING_BALANCE_USD = 50;
