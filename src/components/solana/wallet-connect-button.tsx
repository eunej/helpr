"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { buttonVariants } from "@/components/ui/button";
import { useWalletPicker } from "@/components/solana/wallet-picker";
import { useHasMounted } from "@/hooks/use-helpr";
import { CIRCLE_USDC_FAUCET, shortenAddress } from "@/lib/solana";
import { useUsdcBalance } from "@/hooks/use-usdc-balance";
import { cn } from "@/lib/utils";

export function WalletConnectButton() {
  const mounted = useHasMounted();
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setOpen } = useWalletPicker();
  const { balanceUsd, loading } = useUsdcBalance();

  if (!mounted) {
    return (
      <span
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          "rounded-full px-3 opacity-70"
        )}
      >
        Wallet
      </span>
    );
  }

  if (!connected || !publicKey) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          "rounded-full px-3"
        )}
      >
        {connecting ? "Connecting…" : "Connect wallet"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-left text-xs text-muted-foreground backdrop-blur-sm"
        title="Change wallet"
      >
        <span className="font-medium text-foreground">
          {loading || balanceUsd === null
            ? "USDC…"
            : `$${balanceUsd.toFixed(2)} USDC`}
        </span>
        <span className="ml-2 font-mono">{shortenAddress(publicKey.toBase58())}</span>
        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">
          devnet
        </span>
      </button>
      <button
        type="button"
        onClick={() => disconnect()}
        className={cn(
          buttonVariants({ size: "sm", variant: "ghost" }),
          "hidden rounded-full sm:inline-flex"
        )}
      >
        Disconnect
      </button>
      <a
        href={CIRCLE_USDC_FAUCET}
        target="_blank"
        rel="noreferrer"
        className="hidden text-[10px] uppercase tracking-wider text-muted-foreground underline-offset-2 hover:text-foreground hover:underline md:inline"
      >
        Faucet
      </a>
    </div>
  );
}
