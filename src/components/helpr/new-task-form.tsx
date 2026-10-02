"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, HELPERS, getHelper } from "@/lib/helpers";
import { createTask, markDelivered, markWorking } from "@/lib/store";
import type { TaskCategory } from "@/lib/types";
import { useWallet } from "@/hooks/use-helpr";
import { cn } from "@/lib/utils";

export function NewTaskForm() {
  const router = useRouter();
  const wallet = useWallet();
  const [category, setCategory] = useState<TaskCategory>("resume");
  const meta = useMemo(
    () => CATEGORIES.find((c) => c.id === category)!,
    [category]
  );
  const [title, setTitle] = useState("Fix my resume bullets");
  const [brief, setBrief] = useState(
    "Built growth campaigns for SEA sellers\nWorked with partners on ads ROAS\nWant something sharper for a product role"
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
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const budgetUsd = Number(budget);

    startTransition(async () => {
      try {
        const task = createTask({
          title,
          brief,
          category,
          budgetUsd,
          helperId,
        });
        markWorking(task.id);

        const helper = getHelper(helperId);
        const res = await fetch("/api/helpers/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            title,
            brief,
            helperName: helper.name,
            helperKind: helper.kind,
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
          <Label htmlFor="title">Task title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-11 rounded-xl px-3"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="brief">Your draft / notes</Label>
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
            Available: ${wallet.availableUsd.toFixed(2)} USDC demo balance
          </p>
        </div>
        <div className="space-y-2">
          <Label>Helper</Label>
          <div className="grid gap-2">
            {HELPERS.map((helper) => (
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
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {helper.eta}
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
          Funds lock in escrow the moment you post. You only release USDC when
          you accept the deliverable.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 rounded-xl px-6"
        >
          {pending ? "Helper is on it…" : `Lock $${Number(budget) || 0} & hire`}
        </Button>
      </div>
    </form>
  );
}
