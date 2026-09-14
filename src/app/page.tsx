import { OpportunityBoard } from "@/components/brief/opportunity-board"
import {
  Hero,
  MarketsSection,
  PlanSection,
  ProfileSection,
  SiteFooter,
  SiteHeader,
  SourcesSection,
} from "@/components/brief/sections"
import { WedgeDemo } from "@/components/brief/wedge-demo"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProfileSection />
        <MarketsSection />
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <OpportunityBoard />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <WedgeDemo />
        </div>
        <PlanSection />
        <SourcesSection />
      </main>
      <SiteFooter />
    </>
  )
}
