import { HelperDesk } from "@/components/helpr/helper-desk";
import { SiteHeader } from "@/components/helpr/site-header";

export default function HelperHomePage() {
  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-4 md:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            Earn as a helper
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Claim local questions from Thailand & Vietnam, submit answers, and
            get paid when escrow releases.
          </p>
        </div>
        <HelperDesk />
      </main>
    </div>
  );
}
