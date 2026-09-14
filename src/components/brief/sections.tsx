import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  marketSignals,
  ninetyDayPlan,
  passList,
  profile,
  researchedOn,
  sources,
} from "@/data/brief"

const nav = [
  { href: "#edge", label: "Your edge" },
  { href: "#markets", label: "Markets" },
  { href: "#bets", label: "Ranked bets" },
  { href: "#wedge", label: "First product" },
  { href: "#plan", label: "90 days" },
  { href: "#sources", label: "Sources" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="font-heading text-sm sm:text-base">
          Market brief
        </a>
        <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">{researchedOn}</p>
      </div>
      <div className="flex gap-3 overflow-x-auto border-t px-4 py-2 text-xs md:hidden">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full bg-secondary px-3 py-1 text-secondary-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
        Confidential working brief · not a generic trend report
      </p>
      <h1 className="font-heading mt-4 max-w-4xl text-4xl leading-[1.12] tracking-tight text-pretty sm:text-6xl">
        Growing markets with unsolved jobs — filtered through how you actually sell.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {profile.thesis}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Badge>Salesforce AE</Badge>
        <Badge variant="secondary">ex-Coupang Ads</Badge>
        <Badge variant="secondary">ex-Twitter Partnerships</Badge>
        <Badge variant="outline">Vietnam BD</Badge>
        <Badge variant="outline">{profile.location}</Badge>
      </div>
    </section>
  )
}

export function ProfileSection() {
  return (
    <section id="edge" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Why these markets, not those
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-tight sm:text-4xl">
            Your unfair advantage is not &ldquo;AI.&rdquo; It is the 사장님 conversation.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {profile.identityNote}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.strengths.map((item) => (
              <Card key={item.label} size="sm">
                <CardHeader>
                  <CardTitle>{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What you keep returning to</CardTitle>
              <CardDescription>
                Public posts, 2025–2026. These are product requirements, not vibes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {profile.passions.map((item) => (
                  <li key={item} className="border-l-2 border-primary/30 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {profile.quotes.map((quote) => (
              <blockquote
                key={quote.text}
                className="rounded-xl bg-card p-4 ring-1 ring-foreground/10"
              >
                <p className="text-sm leading-relaxed">{quote.text}</p>
                <footer className="mt-2 text-xs text-muted-foreground">
                  {quote.context}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function MarketsSection() {
  return (
    <section id="markets" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:px-6">
      <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
        The markets that are actually compounding
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Size without an unsolved job is a tourist brochure. These six numbers
        are the ones that collide with your experience.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marketSignals.map((signal) => (
          <Card key={signal.label} size="sm">
            <CardHeader>
              <CardDescription>{signal.label}</CardDescription>
              <CardTitle className="font-heading text-2xl">{signal.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {signal.detail}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function PlanSection() {
  return (
    <section id="plan" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            If you contribute this quarter
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-tight sm:text-4xl">
            Ninety days to a paid design partner — or a sharper Salesforce point of view.
          </h2>
          <ol className="mt-8 space-y-6">
            {ninetyDayPlan.map((phase) => (
              <li key={phase.days} className="grid gap-2 sm:grid-cols-[7rem_1fr]">
                <p className="text-sm font-medium text-primary">{phase.days}</p>
                <div>
                  <h3 className="font-heading text-xl">{phase.title}</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {phase.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Markets to walk past</CardTitle>
            <CardDescription>
              Attractive on Twitter. Wrong for this background.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {passList.map((item) => (
              <details
                key={item.title}
                className="group border-b py-2 last:border-b-0"
              >
                <summary className="cursor-pointer list-none text-sm font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    {item.title}
                    <span className="text-muted-foreground group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-muted-foreground group-open:inline">
                      –
                    </span>
                  </span>
                </summary>
                <p className="pt-2 pb-1 text-sm leading-relaxed text-muted-foreground">
                  {item.reason}
                </p>
              </details>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export function SourcesSection() {
  return (
    <section id="sources" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6">
      <h2 className="font-heading text-3xl tracking-tight">Sources</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Figures are from public 2025–2026 research and should be treated as
        directional, not as a fundraising model. Vendor blogs are used only
        where they document a seller behavior that first-party data also
        supports.
      </p>
      <Separator className="my-6" />
      <ol className="grid gap-4 sm:grid-cols-2">
        {sources.map((source, index) => (
          <li key={source.url} className="text-sm">
            <p className="text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {source.title}
            </a>
            <p className="mt-1 text-muted-foreground">{source.usedFor}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Working brief for {profile.name}. Built to decide what to make, not
          to admire a TAM slide.
        </p>
        <p>Researched {researchedOn}</p>
      </div>
    </footer>
  )
}
