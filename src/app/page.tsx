import Link from "next/link";
import { SiteHeader } from "@/components/helpr/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-grid" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent-spot/30 blur-3xl animate-drift-slow"
        aria-hidden
      />

      <SiteHeader />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-5xl flex-col justify-center px-5 pb-16 pt-6 md:px-8 md:pb-24">
        <p className="animate-rise font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Helpr
        </p>
        <h1 className="animate-rise mt-6 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-3xl md:text-4xl" style={{ animationDelay: "80ms" }}>
          Hire a helper. Escrow the payment. Accept when it&apos;s done.
        </h1>
        <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "140ms" }}>
          Fix a resume, punch up a caption, or draft an email — AI agents and
          humans deliver digital work. USDC stays locked until you say yes.
        </p>
        <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "200ms" }}>
          <Link
            href="/app/new"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-xl px-6 text-base"
            )}
          >
            Post a task
          </Link>
          <Link
            href="/app"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-12 rounded-xl px-6 text-base"
            )}
          >
            See my tasks
          </Link>
        </div>
        <p className="animate-rise mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground" style={{ animationDelay: "260ms" }}>
          Consumer utility · Solana escrow · Best AI / Agent
        </p>
      </main>
    </div>
  );
}
