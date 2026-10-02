"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/helpr/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useActiveHelperId,
  useHasMounted,
  useTask,
} from "@/hooks/use-helpr";
import { countryLabel, getHelper } from "@/lib/helpers";
import { claimTask, markDelivered } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HelperJob({ id }: { id: string }) {
  const task = useTask(id);
  const mounted = useHasMounted();
  const activeId = useActiveHelperId();
  const me = getHelper(activeId);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center text-sm text-muted-foreground">
        Loading job…
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center">
        <p className="font-display text-2xl">Job not found</p>
        <Link href="/helper" className={cn(buttonVariants(), "rounded-xl")}>
          Back to desk
        </Link>
      </div>
    );
  }

  const canClaim =
    task.status === "open" &&
    (!task.helperId || task.helperId === activeId) &&
    (!task.country || !me.country || task.country === me.country);
  const isMine = task.helperId === activeId;
  const canSubmit = isMine && task.status === "working";

  function onClaim() {
    setError(null);
    startTransition(() => {
      try {
        claimTask(id, activeId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not claim.");
      }
    });
  }

  function onSubmit() {
    setError(null);
    if (!answer.trim()) {
      setError("Write an answer before submitting.");
      return;
    }
    startTransition(() => {
      try {
        markDelivered(
          id,
          [
            `Answer from ${me.name}${me.city ? ` · ${me.city}` : ""}`,
            "",
            answer.trim(),
          ].join("\n")
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not submit.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl tracking-tight md:text-4xl">
              {task.title}
            </h1>
            <StatusBadge status={task.status} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            ${task.budgetUsd.toFixed(2)} USDC escrow
            {task.country ? ` · ${countryLabel(task.country)}` : ""}
            {" · "}acting as {me.name}
          </p>
        </div>
        <Link
          href="/helper"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
        >
          Helper desk
        </Link>
      </div>

      <section className="rounded-2xl border border-border/70 bg-background/60 p-5">
        <h2 className="text-sm font-medium text-muted-foreground">Question</h2>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">
          {task.brief}
        </pre>
      </section>

      {task.deliverable && (
        <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
          <h2 className="text-sm font-medium text-primary">Your submission</h2>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {task.deliverable}
          </pre>
        </section>
      )}

      {canClaim && (
        <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
          <p className="text-sm text-muted-foreground">
            Claim this job as <span className="text-foreground">{me.name}</span>.
            Escrow stays locked until the requester accepts your answer.
          </p>
          <Button
            className="mt-4 h-11 rounded-xl"
            size="lg"
            disabled={pending}
            onClick={onClaim}
          >
            Claim job
          </Button>
        </div>
      )}

      {task.status === "open" && !canClaim && (
        <p className="rounded-xl border border-border/70 px-4 py-3 text-sm text-muted-foreground">
          Switch to a helper in{" "}
          {task.country ? countryLabel(task.country) : "the right country"} to
          claim this job.
        </p>
      )}

      {canSubmit && (
        <div className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-5">
          <h2 className="font-display text-xl">Write your answer</h2>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Be specific — neighborhoods, apps, costs, and what you'd do tomorrow."
            className="min-h-40 rounded-xl px-3 py-2.5"
          />
          <Button
            size="lg"
            className="h-11 rounded-xl"
            disabled={pending}
            onClick={onSubmit}
          >
            Submit answer
          </Button>
        </div>
      )}

      {isMine && task.status === "delivered" && (
        <p className="rounded-xl border border-border/70 px-4 py-3 text-sm text-muted-foreground">
          Submitted. Waiting for the requester to accept and release escrow.
        </p>
      )}

      {isMine && task.status === "accepted" && (
        <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
          Paid — ${task.budgetUsd.toFixed(2)} USDC added to your helper
          earnings.
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
