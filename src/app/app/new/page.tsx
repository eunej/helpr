import Link from "next/link";
import { SiteHeader } from "@/components/helpr/site-header";
import { NewTaskForm } from "@/components/helpr/new-task-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NewTaskPage() {
  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              Hire a helper
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Describe the work, lock a USDC budget, and review before anyone
              gets paid.
            </p>
          </div>
          <Link
            href="/app"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-xl"
            )}
          >
            Cancel
          </Link>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/70 p-5 shadow-sm backdrop-blur-sm md:p-8">
          <NewTaskForm />
        </div>
      </main>
    </div>
  );
}
