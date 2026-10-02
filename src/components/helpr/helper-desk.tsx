"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/helpr/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  useActiveHelperId,
  useEarnings,
  useHasMounted,
  useTasks,
} from "@/hooks/use-helpr";
import {
  countryLabel,
  getHelper,
  getHumanHelpers,
} from "@/lib/helpers";
import { setActiveHelperId } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HelperDesk() {
  const mounted = useHasMounted();
  const tasks = useTasks();
  const activeId = useActiveHelperId();
  const earnings = useEarnings();
  const me = getHelper(activeId);
  const humans = getHumanHelpers();

  const openJobs = tasks.filter((t) => {
    if (t.status !== "open") return false;
    if (t.helperId && t.helperId !== activeId) return false;
    if (me.country && t.country && t.country !== me.country) return false;
    return true;
  });
  const myJobs = tasks.filter(
    (t) =>
      t.helperId === activeId &&
      (t.status === "working" ||
        t.status === "delivered" ||
        t.status === "accepted")
  );
  const earned = earnings[activeId] ?? 0;

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 px-6 py-16 text-center text-sm text-muted-foreground">
        Loading helper desk…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border/70 bg-background/70 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Signed in as helper
            </p>
            <h2 className="mt-1 font-display text-3xl tracking-tight">
              {me.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {me.specialty}
              {me.city ? ` · ${me.city}` : ""}
              {me.country ? ` · ${countryLabel(me.country)}` : ""}
              {" · "}
              {me.languages.join(", ")}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-right">
            <div className="text-xs text-muted-foreground">Lifetime earned</div>
            <div className="font-display text-2xl text-foreground">
              ${earned.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              ★ {me.rating.toFixed(1)} · {me.jobsDone}+ jobs
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Switch helper profile
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {humans.map((helper) => (
              <button
                key={helper.id}
                type="button"
                onClick={() => setActiveHelperId(helper.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
                  helper.id === activeId
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/80 bg-background hover:border-primary/40"
                )}
              >
                {helper.name}
                {helper.country
                  ? ` · ${helper.country === "thailand" ? "TH" : "VN"}`
                  : ""}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl tracking-tight">Open jobs</h3>
            <p className="text-sm text-muted-foreground">
              Local questions and human tasks waiting to be claimed.
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {openJobs.length} open
          </span>
        </div>

        {openJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 px-5 py-12 text-center text-sm text-muted-foreground">
            No open jobs for {me.name} right now. Post an “Ask a local” task from
            the Hire side to demo the board.
          </div>
        ) : (
          <ul className="space-y-3">
            {openJobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/helper/jobs/${job.id}`}
                  className="block rounded-2xl border border-border/70 bg-background/60 px-4 py-4 transition-all hover:border-primary/50 md:px-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <StatusBadge status={job.status} />
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {job.brief}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {job.country
                          ? countryLabel(job.country)
                          : "General"}{" "}
                        · ${job.budgetUsd.toFixed(2)} USDC escrow
                      </p>
                    </div>
                    <span
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "rounded-xl"
                      )}
                    >
                      Review & claim
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-2xl tracking-tight">Your jobs</h3>
        {myJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 px-5 py-10 text-center text-sm text-muted-foreground">
            Claim an open job to start earning. Payment releases when the
            requester accepts.
          </div>
        ) : (
          <ul className="space-y-3">
            {myJobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/helper/jobs/${job.id}`}
                  className="block rounded-2xl border border-border/70 bg-background/60 px-4 py-4 transition-all hover:border-primary/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{job.title}</span>
                        <StatusBadge status={job.status} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        ${job.budgetUsd.toFixed(2)} USDC
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {job.status === "working"
                        ? "Submit answer →"
                        : job.status === "delivered"
                          ? "Awaiting accept"
                          : "Paid"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
