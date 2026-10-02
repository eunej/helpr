"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/helpr/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useHasMounted, useTask } from "@/hooks/use-helpr";
import { shortenSig } from "@/lib/escrow";
import { acceptTask, refundTask } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TaskDetail({ id }: { id: string }) {
  const task = useTask(id);
  const mounted = useHasMounted();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center text-sm text-muted-foreground">
        Loading task…
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center">
        <p className="font-display text-2xl">Task not found</p>
        <p className="text-sm text-muted-foreground">
          It may have been cleared from this browser’s demo data.
        </p>
        <Link href="/app" className={cn(buttonVariants(), "rounded-xl")}>
          Back to tasks
        </Link>
      </div>
    );
  }

  function onAccept() {
    setError(null);
    startTransition(() => {
      try {
        acceptTask(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not accept.");
      }
    });
  }

  function onRefund() {
    setError(null);
    startTransition(() => {
      try {
        refundTask(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not refund.");
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl tracking-tight md:text-4xl">
              {task.title}
            </h1>
            <StatusBadge status={task.status} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {task.helperName} ({task.helperKind === "ai" ? "AI agent" : "Human"})
            · ${task.budgetUsd.toFixed(2)} USDC
          </p>
        </div>
        <Link
          href="/app"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
        >
          All tasks
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
            <h2 className="text-sm font-medium text-muted-foreground">
              Your brief
            </h2>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {task.brief}
            </pre>
          </div>

          <div className="animate-rise rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <h2 className="text-sm font-medium text-primary">Deliverable</h2>
            {task.status === "working" ||
            (task.status === "funded" && !task.deliverable) ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Helper is working — escrow stays locked.
              </p>
            ) : task.deliverable ? (
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {task.deliverable}
              </pre>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No deliverable yet.
              </p>
            )}
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          {task.status === "delivered" && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-11 flex-1 rounded-xl"
                disabled={pending}
                onClick={onAccept}
              >
                Accept & release ${task.budgetUsd.toFixed(2)}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 flex-1 rounded-xl"
                disabled={pending}
                onClick={onRefund}
              >
                Reject & refund
              </Button>
            </div>
          )}

          {task.status === "accepted" && (
            <p className="rounded-xl border border-border/70 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
              Payment released to {task.helperName}. Nice — that’s Tuesday-test
              utility.
            </p>
          )}

          {task.status === "refunded" && (
            <p className="rounded-xl border border-border/70 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
              Escrow returned to your demo balance.
            </p>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
            <h2 className="font-display text-xl">Escrow</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              USDC on Solana (demo ledger). Crypto stays in the background —
              you see status and receipts.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Locked now</dt>
                <dd className="font-medium">
                  ${task.escrow.lockedUsd.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Budget</dt>
                <dd className="font-medium">${task.budgetUsd.toFixed(2)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/60 p-5">
            <h2 className="text-sm font-medium text-muted-foreground">
              Receipt trail
            </h2>
            <ol className="mt-3 space-y-3">
              {task.escrow.events.map((event) => (
                <li
                  key={event.id}
                  className="border-l-2 border-primary/40 pl-3 text-sm"
                >
                  <div className="font-medium text-foreground">
                    {event.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.amountUsd > 0
                      ? `$${event.amountUsd.toFixed(2)} USDC · `
                      : null}
                    {shortenSig(event.signature)} ·{" "}
                    {new Date(event.at).toLocaleTimeString()}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
