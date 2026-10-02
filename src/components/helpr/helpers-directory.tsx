"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HELPERS, countryLabel } from "@/lib/helpers";
import { cn } from "@/lib/utils";

export function HelpersDirectory() {
  const humans = HELPERS.filter((h) => h.kind === "human");
  const agents = HELPERS.filter((h) => h.kind === "ai");

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-display text-2xl tracking-tight">
          Local humans · SEA
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {humans.map((helper) => (
            <article
              key={helper.id}
              className="rounded-2xl border border-border/70 bg-background/60 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{helper.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {helper.city || "Remote"}
                    {helper.country ? ` · ${countryLabel(helper.country)}` : ""}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  ★ {helper.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {helper.specialty} — {helper.blurb}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {helper.languages.join(" · ")} · {helper.jobsDone}+ jobs ·{" "}
                {helper.eta}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl tracking-tight">AI agents</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {agents.map((helper) => (
            <article
              key={helper.id}
              className="rounded-2xl border border-border/70 bg-background/60 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">{helper.name}</h3>
                <span className="text-xs text-muted-foreground">AI</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {helper.specialty} — {helper.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Link
        href="/app/new"
        className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl px-5")}
      >
        Ask a local or hire a helper
      </Link>
    </div>
  );
}
