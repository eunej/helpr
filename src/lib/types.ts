export type TaskCategory =
  | "resume"
  | "caption"
  | "email"
  | "rewrite"
  | "ask-thailand"
  | "ask-vietnam"
  | "other";

export type SeaCountry = "thailand" | "vietnam";

export type TaskStatus =
  | "open"
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
  country?: SeaCountry;
  city?: string;
  languages: string[];
  rating: number;
  jobsDone: number;
};

export type EscrowEvent = {
  id: string;
  label: string;
  amountUsd: number;
  signature: string;
  at: string;
  onchain?: boolean;
};

export type Task = {
  id: string;
  title: string;
  brief: string;
  category: TaskCategory;
  country?: SeaCountry;
  budgetUsd: number;
  status: TaskStatus;
  /** Empty string when posted to the open helper board. */
  helperId: string;
  helperName: string;
  helperKind: HelperKind;
  deliverable: string | null;
  payerAddress?: string;
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
