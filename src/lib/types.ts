export type TaskCategory =
  | "resume"
  | "caption"
  | "email"
  | "rewrite"
  | "other";

export type TaskStatus =
  | "funded"
  | "working"
  | "delivered"
  | "accepted"
  | "refunded";

export type HelperKind = "ai" | "human";

export type Helper = {
  id: string;
  name: string;
  kind: HelperKind;
  specialty: string;
  blurb: string;
  eta: string;
};

export type EscrowEvent = {
  id: string;
  label: string;
  amountUsd: number;
  signature: string;
  at: string;
};

export type Task = {
  id: string;
  title: string;
  brief: string;
  category: TaskCategory;
  budgetUsd: number;
  status: TaskStatus;
  helperId: string;
  helperName: string;
  helperKind: HelperKind;
  deliverable: string | null;
  createdAt: string;
  updatedAt: string;
  escrow: {
    lockedUsd: number;
    events: EscrowEvent[];
  };
};

export type WalletState = {
  availableUsd: number;
  lockedUsd: number;
};
