import Link from "next/link";
import { HelpersDirectory } from "@/components/helpr/helpers-directory";
import { SiteHeader } from "@/components/helpr/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HelpersPage() {
  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              Helpers
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Locals in Thailand & Vietnam, plus AI agents for everyday writing
              tasks.
            </p>
          </div>
          <Link
            href="/helper"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-xl"
            )}
          >
            Switch to earn side
          </Link>
        </div>
        <HelpersDirectory />
      </main>
    </div>
  );
}
