import { SiteHeader } from "@/components/helpr/site-header";
import { TaskDetail } from "@/components/helpr/task-detail";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <SiteHeader compact />
      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-4 md:px-8">
        <TaskDetail id={id} />
      </main>
    </div>
  );
}
