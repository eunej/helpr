"use client";

import { useMemo, type ReactNode } from "react";
import { Buffer } from "buffer";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import type { Adapter } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-unsafe-burner";
import { SOLANA_RPC } from "@/lib/solana";
import { WalletPickerProvider } from "@/components/solana/wallet-picker";

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer ?? Buffer;
}

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo<Adapter[]>(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
      new UnsafeBurnerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={SOLANA_RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletPickerProvider>{children}</WalletPickerProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
