"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/helpr/site-header";
import { TaskList } from "@/components/helpr/task-list";
import { buttonVariants } from "@/components/ui/button";
import { resetDemo } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function AppHomePage() {
  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              Your tasks
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Escrow holds USDC until you accept the deliverable.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => resetDemo()}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-xl"
              )}
            >
              Reset demo
            </button>
            <Link
              href="/app/new"
              className={cn(
                buttonVariants({ size: "sm" }),
                "h-9 rounded-xl px-4"
              )}
            >
              New task
            </Link>
          </div>
        </div>
        <TaskList />
      </main>
    </div>
  );
}
