import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/lib/types";

const LABELS: Record<TaskStatus, string> = {
  open: "Open on board",
  funded: "Escrow locked",
  working: "Helper working",
  delivered: "Ready to review",
  accepted: "Paid",
  refunded: "Refunded",
};

const VARIANT: Record<
  TaskStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  open: "secondary",
  funded: "secondary",
  working: "default",
  delivered: "default",
  accepted: "outline",
  refunded: "destructive",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <Badge variant={VARIANT[status]}>{LABELS[status]}</Badge>;
}
