"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  actions,
  breakEvenRoas,
  contributionProfit,
  formatWon,
  keywords,
  pct,
  roas,
  sampleShop,
  sampleTotals,
} from "@/data/sample-campaign"

export function WedgeDemo() {
  const [view, setView] = useState<"platform" | "truth">("platform")

  const be = breakEvenRoas()
  const reportedRoas = roas(sampleTotals.reportedSales, sampleTotals.spend)
  const directRoas = roas(sampleTotals.directSales, sampleTotals.spend)
  const profit = contributionProfit(sampleTotals.directSales, sampleTotals.spend)

  const rows = keywords
    .map((row) => {
      const shown = view === "platform" ? row.reportedSales : row.directSales
      return {
        ...row,
        shownRoas: roas(shown, row.spend),
        profit: contributionProfit(row.directSales, row.spend),
      }
    })
    .sort((a, b) => a.profit - b.profit)

  return (
    <section id="wedge" className="scroll-mt-24">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          The first product
        </p>
        <h2 className="font-heading mt-2 text-3xl tracking-tight text-pretty sm:text-4xl">
          A copilot that is loyal to the 사장님, not to Coupang ROAS.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Sample shop, anonymized from the pattern Coupang sellers actually
          live: the platform says ads are working. Contribution margin says
          they are not. Toggle the lens.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-2xl">{sampleShop.name}</CardTitle>
            <CardDescription>
              {sampleShop.category} · {sampleShop.month}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <dl className="grid grid-cols-2 gap-3">
              <Metric label="GMV" value={formatWon(sampleShop.gmv)} />
              <Metric label="Ad spend" value={formatWon(sampleShop.adSpend)} />
              <Metric
                label="Platform ROAS"
                value={`${reportedRoas.toFixed(1)}x`}
                hint="includes indirect conversions"
              />
              <Metric
                label="Direct ROAS"
                value={`${directRoas.toFixed(1)}x`}
                hint={`break-even ${be.toFixed(1)}x`}
              />
            </dl>
            <div
              className={`rounded-lg px-3 py-3 ${
                profit < 0
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <p className="text-xs tracking-wide uppercase">
                Contribution after fees, shipping, ads
              </p>
              <p className="font-heading mt-1 text-2xl">{formatWon(profit)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={view === "platform" ? "default" : "outline"}
                onClick={() => setView("platform")}
              >
                Platform report
              </Button>
              <Button
                size="sm"
                variant={view === "truth" ? "default" : "outline"}
                onClick={() => setView("truth")}
              >
                사장님 P&amp;L
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {view === "platform"
                ? "What the ads console celebrates"
                : "What actually keeps the shop alive"}
            </CardTitle>
            <CardDescription>
              {view === "platform"
                ? "Reported sales include 14-day indirect conversions. Average ROAS looks investable."
                : "Direct conversion only, minus Coupang fees and shipping. Red rows are teaching the algorithm the wrong products."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="text-xs tracking-wide text-muted-foreground uppercase">
                  <tr className="border-b">
                    <th className="py-2 pr-3 font-medium">Keyword</th>
                    <th className="py-2 pr-3 font-medium">Spend</th>
                    <th className="py-2 pr-3 font-medium">ROAS</th>
                    <th className="py-2 font-medium">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.keyword} className="border-b border-border/70">
                      <td className="py-2.5 pr-3">
                        <p className="font-medium">{row.keyword}</p>
                        <p className="text-xs text-muted-foreground">
                          {row.type} · {pct(row.impressionShare)} share
                        </p>
                      </td>
                      <td className="py-2.5 pr-3">{formatWon(row.spend)}</td>
                      <td className="py-2.5 pr-3">{row.shownRoas.toFixed(1)}x</td>
                      <td
                        className={`py-2.5 ${
                          row.profit < 0 ? "text-destructive" : "text-primary"
                        }`}
                      >
                        {formatWon(row.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Card key={action.title} size="sm">
            <CardHeader>
              <Badge
                variant={
                  action.tone === "kill"
                    ? "destructive"
                    : action.tone === "scale"
                      ? "default"
                      : "secondary"
                }
              >
                {action.tone}
              </Badge>
              <CardTitle className="pt-1">{action.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {action.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-heading mt-0.5 text-xl">{value}</dd>
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
