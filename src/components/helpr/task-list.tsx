"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/helpr/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { useHasMounted, useTasks } from "@/hooks/use-helpr";
import { cn } from "@/lib/utils";

export function TaskList() {
  const tasks = useTasks();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center text-sm text-muted-foreground">
        Loading your tasks…
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/80 bg-background/40 px-6 py-16 text-center">
        <p className="font-display text-2xl text-foreground">No tasks yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Post something small — a resume polish, a caption, an email. Escrow
          holds payment until you accept.
        </p>
        <Link
          href="/app/new"
          className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl px-5")}
        >
          Hire a helper
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className="animate-rise"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <Link
            href={`/app/tasks/${task.id}`}
            className="block rounded-2xl border border-border/70 bg-background/60 px-4 py-4 transition-all hover:border-primary/50 hover:bg-background md:px-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-foreground">{task.title}</h3>
                  <StatusBadge status={task.status} />
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {task.helperName} · ${task.budgetUsd.toFixed(2)} USDC
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
