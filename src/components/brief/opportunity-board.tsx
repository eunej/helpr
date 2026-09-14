"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { opportunities, type FitBand, type Opportunity } from "@/data/brief"

const bands: { id: "all" | FitBand; label: string }[] = [
  { id: "all", label: "All bets" },
  { id: "build first", label: "Build first" },
  { id: "strong fit", label: "Strong fit" },
  { id: "adjacent", label: "Adjacent" },
]

function bandVariant(band: FitBand) {
  if (band === "build first") return "default" as const
  if (band === "strong fit") return "secondary" as const
  if (band === "adjacent") return "outline" as const
  return "outline" as const
}

export function OpportunityBoard() {
  const [filter, setFilter] = useState<(typeof bands)[number]["id"]>("all")
  const [activeId, setActiveId] = useState(opportunities[0].id)

  const visible = useMemo(
    () =>
      opportunities.filter((item) =>
        filter === "all" ? item.band !== "pass" : item.band === filter,
      ),
    [filter],
  )

  const active = visible.find((item) => item.id === activeId) ?? visible[0]

  return (
    <section id="bets" className="scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Ranked against your edge
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-tight text-pretty sm:text-4xl">
            Five markets. One you should start this month.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fit is not market size. It is whether you can get the first ten
            customers, speak the unsolved job, and stay on the right side of
            Salesforce IP.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {bands.map((band) => (
          <Button
            key={band.id}
            size="sm"
            variant={filter === band.id ? "default" : "outline"}
            onClick={() => {
              setFilter(band.id)
              const next = opportunities.find((item) =>
                band.id === "all"
                  ? item.band !== "pass"
                  : item.band === band.id,
              )
              if (next) setActiveId(next.id)
            }}
          >
            {band.label}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Nothing in this filter</CardTitle>
            <CardDescription>
              Every live bet is either &ldquo;build first&rdquo; or
              &ldquo;strong fit.&rdquo; Switch back to All bets.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
          <div className="flex flex-col gap-3">
            {visible.map((item) => (
              <OpportunitySummary
                key={item.id}
                item={item}
                selected={active?.id === item.id}
                onSelect={() => setActiveId(item.id)}
              />
            ))}
          </div>
          {active ? <OpportunityDetail item={active} /> : null}
        </div>
      )}
    </section>
  )
}

function OpportunitySummary({
  item,
  selected,
  onSelect,
}: {
  item: Opportunity
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl p-4 text-left ring-1 transition-colors ${
        selected
          ? "bg-card ring-primary/40 shadow-sm"
          : "bg-card/60 ring-foreground/10 hover:bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">
            #{item.rank} · {item.market}
          </p>
          <h3 className="mt-1 font-heading text-lg leading-snug">
            {item.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl leading-none">{item.fit}</p>
          <p className="mt-1 text-[11px] tracking-wide text-muted-foreground uppercase">
            fit
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{item.oneLiner}</p>
      <Badge className="mt-3" variant={bandVariant(item.band)}>
        {item.band}
      </Badge>
    </button>
  )
}

function OpportunityDetail({ item }: { item: Opportunity }) {
  return (
    <Card className="h-fit">
      <CardHeader className="border-b">
        <CardTitle className="font-heading text-2xl leading-tight text-pretty">
          {item.title}
        </CardTitle>
        <CardDescription>{item.oneLiner}</CardDescription>
        <CardAction>
          <Badge variant={bandVariant(item.band)}>{item.band}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="problem">
          <TabsList className="w-full max-w-full flex-wrap">
            <TabsTrigger value="problem">Unsolved job</TabsTrigger>
            <TabsTrigger value="you">Why you</TabsTrigger>
            <TabsTrigger value="wedge">Wedge</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
          </TabsList>
          <TabsContent value="problem" className="pt-4">
            <p className="text-sm leading-relaxed">{item.whyNow}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {item.unsolved.map((point) => (
                <li
                  key={point}
                  className="border-l-2 border-primary/40 pl-3 text-foreground/90"
                >
                  {point}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="you" className="pt-4">
            <ul className="space-y-3 text-sm leading-relaxed">
              {item.whyYou.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="wedge" className="space-y-4 pt-4 text-sm leading-relaxed">
            <p>{item.wedge}</p>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Who pays
              </p>
              <p className="mt-1">{item.whoPays}</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Already in the room
              </p>
              <p className="mt-1">{item.crowdedWith}</p>
            </div>
          </TabsContent>
          <TabsContent value="risk" className="pt-4 text-sm leading-relaxed">
            <p>{item.risk}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
