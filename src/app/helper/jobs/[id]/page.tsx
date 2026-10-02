import { HelperJob } from "@/components/helpr/helper-job";
import { SiteHeader } from "@/components/helpr/site-header";

export default async function HelperJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-4 md:px-8">
        <HelperJob id={id} />
      </main>
    </div>
  );
}
