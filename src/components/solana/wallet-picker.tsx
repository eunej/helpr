"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WalletReadyState, type WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CIRCLE_USDC_FAUCET, SOLANA_SOL_FAUCET } from "@/lib/solana";
import { cn } from "@/lib/utils";

type PickerContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const WalletPickerContext = createContext<PickerContext | null>(null);

export function useWalletPicker() {
  const ctx = useContext(WalletPickerContext);
  if (!ctx) {
    throw new Error("useWalletPicker must be used inside WalletPickerProvider");
  }
  return ctx;
}

const INSTALL: Record<string, string> = {
  Phantom: "https://phantom.app/download",
  Solflare: "https://solflare.com/download",
};

export function WalletPickerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <WalletPickerContext.Provider value={value}>
      {children}
      <WalletPickerDialog />
    </WalletPickerContext.Provider>
  );
}

function WalletPickerDialog() {
  const { open, setOpen } = useWalletPicker();
  const { wallets, select, connect, connecting, wallet } = useWallet();
  const [pendingName, setPendingName] = useState<WalletName | null>(null);

  const connectNamed = useCallback(
    (name: WalletName) => {
      setPendingName(name);
      select(name);
    },
    [select]
  );

  useEffect(() => {
    if (!pendingName) return;
    if (wallet?.adapter.name !== pendingName) return;
    let cancelled = false;
    void connect()
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setPendingName(null);
          setOpen(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [pendingName, wallet, connect, setOpen]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => setOpen(Boolean(next))}
    >
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Connect a Solana wallet
          </DialogTitle>
          <DialogDescription>
            Use Phantom or Solflare on <strong>Devnet</strong>. In this preview
            (no browser extension), pick the demo wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {wallets.map((item) => {
            const name = item.adapter.name;
            const detected =
              item.readyState === WalletReadyState.Installed ||
              item.readyState === WalletReadyState.Loadable;
            const installUrl = INSTALL[name];
            const isDemo = name.toLowerCase().includes("burner");

            return (
              <button
                key={name}
                type="button"
                disabled={connecting}
                onClick={() => {
                  if (detected || isDemo) {
                    void connectNamed(name);
                    return;
                  }
                  if (installUrl) {
                    window.open(installUrl, "_blank", "noreferrer");
                  }
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-3 text-left transition-colors",
                  "border-border/80 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <span>
                  <span className="block font-medium">
                    {isDemo ? "Demo Devnet wallet" : name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isDemo
                      ? "Works without an extension — for this preview"
                      : detected
                        ? "Detected in this browser"
                        : "Not installed — opens download page"}
                  </span>
                </span>
                <span className="text-xs text-primary">
                  {detected || isDemo ? "Connect" : "Install"}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Need funds?{" "}
          <a
            href={SOLANA_SOL_FAUCET}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            SOL faucet
          </a>
          {" · "}
          <a
            href={CIRCLE_USDC_FAUCET}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            USDC faucet
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
