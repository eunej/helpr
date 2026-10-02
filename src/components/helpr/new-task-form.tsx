"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletPicker } from "@/components/solana/wallet-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORIES,
  OPEN_BOARD_ID,
  countryLabel,
  getHelper,
  helpersForCategory,
} from "@/lib/helpers";
import { lockUsdcToEscrow } from "@/lib/lock-usdc";
import {
  CIRCLE_USDC_FAUCET,
  SOLANA_SOL_FAUCET,
} from "@/lib/solana";
import { createTask, markDelivered, markWorking } from "@/lib/store";
import type { TaskCategory } from "@/lib/types";
import { useWallet as useDemoWallet } from "@/hooks/use-helpr";
import { useUsdcBalance } from "@/hooks/use-usdc-balance";
import { cn } from "@/lib/utils";

export function NewTaskForm() {
  const router = useRouter();
  const demoWallet = useDemoWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { setOpen: setWalletOpen } = useWalletPicker();
  const { balanceUsd, refresh } = useUsdcBalance();
  const [category, setCategory] = useState<TaskCategory>("ask-thailand");
  const meta = useMemo(
    () => CATEGORIES.find((c) => c.id === category)!,
    [category]
  );
  const availableHelpers = useMemo(
    () => helpersForCategory(category),
    [category]
  );
  const [title, setTitle] = useState("Ask a local · Thailand");
  const [brief, setBrief] = useState(
    "Staying in Chiang Mai for 4 weeks — Nimman or Old City for coworking + quiet nights? Also, can landlords take USDC or do I need PromptPay?"
  );
  const [budget, setBudget] = useState(String(meta.defaultBudget));
  const [helperId, setHelperId] = useState(meta.suggestedHelperId);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onCategoryChange(next: TaskCategory) {
    const cat = CATEGORIES.find((c) => c.id === next)!;
    setCategory(next);
    setBudget(String(cat.defaultBudget));
    setHelperId(cat.suggestedHelperId);
    setTitle(cat.label);
    if (next === "ask-thailand") {
      setBrief(
        "Staying in Chiang Mai for 4 weeks — Nimman or Old City for coworking + quiet nights? Also, can landlords take USDC or do I need PromptPay?"
      );
    } else if (next === "ask-vietnam") {
      setBrief(
        "Moving to Da Nang for 2 months remote work. Which area has good Wi‑Fi cafés and is safe on a scooter at night? Any e-visa gotchas?"
      );
    }
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const budgetUsd = Number(budget);
    const toBoard = helperId === OPEN_BOARD_ID;
    const helper = toBoard ? null : getHelper(helperId);
    const isMarketplace = toBoard || helper?.kind === "human";

    startTransition(async () => {
      try {
        let lockSignature: string | undefined;
        if (connected && publicKey) {
          lockSignature = await lockUsdcToEscrow({
            connection,
            owner: publicKey,
            amountUsd: budgetUsd,
            sendTransaction,
          });
          await refresh();
        }

        const task = createTask({
          title,
          brief,
          category,
          budgetUsd,
          helperId,
          country: meta.country,
          payerAddress: publicKey?.toBase58(),
          lockSignature,
        });

        if (isMarketplace) {
          router.push(`/app/tasks/${task.id}`);
          return;
        }

        markWorking(task.id);
        const res = await fetch("/api/helpers/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            title,
            brief,
            helperName: helper!.name,
          }),
        });
        const data = (await res.json()) as {
          deliverable?: string;
          error?: string;
        };
        if (!res.ok || !data.deliverable) {
          throw new Error(data.error || "Helper could not finish the task.");
        }
        markDelivered(task.id, data.deliverable);
        router.push(`/app/tasks/${task.id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  const ctaLabel = (() => {
    if (pending) return "Posting…";
    const amount = Number(budget) || 0;
    if (helperId === OPEN_BOARD_ID) {
      return `Lock $${amount} & post to board`;
    }
    const helper = getHelper(helperId);
    if (helper.kind === "human") {
      return `Lock $${amount} & request ${helper.name}`;
    }
    return `Lock $${amount} & hire`;
  })();

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-3">
        <Label className="text-muted-foreground">What do you need?</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition-all",
                category === cat.id
                  ? "border-primary bg-primary/10 shadow-[0_0_0_1px_var(--primary)]"
                  : "border-border/80 bg-background/50 hover:border-primary/40"
              )}
            >
              <div className="font-medium text-foreground">{cat.label}</div>
              <p className="mt-1 text-xs text-muted-foreground">{cat.example}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">
            {meta.country ? "Your question" : "Task title"}
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-11 rounded-xl px-3"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="brief">
            {meta.country ? "Details for a local" : "Your draft / notes"}
          </Label>
          <Textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            required
            rows={6}
            className="min-h-36 rounded-xl px-3 py-2.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USDC)</Label>
          <Input
            id="budget"
            type="number"
            min={0.5}
            step={0.5}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="h-11 rounded-xl px-3"
          />
          <p className="text-xs text-muted-foreground">
            {connected
              ? `Devnet wallet: $${(balanceUsd ?? 0).toFixed(2)} USDC`
              : `Demo ledger: $${demoWallet.availableUsd.toFixed(2)} USDC · connect a wallet to lock real Devnet USDC`}
          </p>
          {!connected && (
            <button
              type="button"
              onClick={() => setWalletOpen(true)}
              className="text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              Connect Phantom / Solflare (Devnet)
            </button>
          )}
        </div>
        <div className="space-y-2">
          <Label>
            {meta.country
              ? `Local helper · ${countryLabel(meta.country)}`
              : "Helper"}
          </Label>
          <div className="grid max-h-80 gap-2 overflow-y-auto pr-1">
            {(meta.marketplaceDefault || meta.country) && (
              <button
                key={OPEN_BOARD_ID}
                type="button"
                onClick={() => setHelperId(OPEN_BOARD_ID)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left transition-all",
                  helperId === OPEN_BOARD_ID
                    ? "border-primary bg-primary/10"
                    : "border-border/80 hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">Open local board</span>
                  <span className="text-xs text-muted-foreground">
                    any verified local
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Post once — helpers in{" "}
                  {countryLabel(meta.country)} can claim and answer.
                </p>
              </button>
            )}
            {availableHelpers.map((helper) => (
              <button
                key={helper.id}
                type="button"
                onClick={() => setHelperId(helper.id)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left transition-all",
                  helperId === helper.id
                    ? "border-primary bg-primary/10"
                    : "border-border/80 hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">
                    {helper.name}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      · {helper.kind === "ai" ? "AI agent" : "Human"}
                      {helper.city ? ` · ${helper.city}` : ""}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ★ {helper.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {helper.specialty} — {helper.blurb}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-muted-foreground">
          {connected
            ? "Your wallet will sign a Devnet USDC transfer into Helpr escrow. Approve in Phantom/Solflare."
            : "Connect a Solana wallet to lock real Devnet USDC — or post on the demo ledger."}{" "}
          <a
            href={CIRCLE_USDC_FAUCET}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            USDC faucet
          </a>
          {" · "}
          <a
            href={SOLANA_SOL_FAUCET}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            SOL faucet
          </a>
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 rounded-xl px-6"
        >
          {ctaLabel}
        </Button>
      </div>
    </form>
  );
}
