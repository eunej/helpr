"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useHasMounted, useWallet } from "@/hooks/use-helpr";
import { cn } from "@/lib/utils";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const wallet = useWallet();
  const mounted = useHasMounted();

  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-8">
      <Link href="/" className="group flex items-baseline gap-2">
        <span className="font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
          Helpr
        </span>
        {!compact && (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            hire · escrow · accept
          </span>
        )}
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        {mounted && (
          <div className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
            <span className="font-medium text-foreground">
              ${wallet.availableUsd.toFixed(2)}
            </span>{" "}
            USDC
            {wallet.lockedUsd > 0 && (
              <span className="ml-2 text-primary">
                · ${wallet.lockedUsd.toFixed(2)} locked
              </span>
            )}
          </div>
        )}
        <Link
          href="/app"
          className={cn(buttonVariants({ size: "sm" }), "no-underline")}
        >
          Open app
        </Link>
      </div>
    </header>
  );
}
