"use client";

import { createEscrowEvent, STARTING_BALANCE_USD } from "@/lib/escrow";
import { getHelper } from "@/lib/helpers";
import type { Task, TaskCategory, WalletState } from "@/lib/types";

const TASKS_KEY = "helpr.tasks.v1";
const WALLET_KEY = "helpr.wallet.v1";

export const EMPTY_TASKS: Task[] = [];
export const SERVER_WALLET: WalletState = {
  availableUsd: STARTING_BALANCE_USD,
  lockedUsd: 0,
};

let tasksCache: Task[] = EMPTY_TASKS;
let walletCache: WalletState = SERVER_WALLET;
let hydrated = false;

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  try {
    const rawTasks = localStorage.getItem(TASKS_KEY);
    tasksCache = rawTasks
      ? sortTasks(JSON.parse(rawTasks) as Task[])
      : EMPTY_TASKS;
  } catch {
    tasksCache = EMPTY_TASKS;
  }

  try {
    const rawWallet = localStorage.getItem(WALLET_KEY);
    walletCache = rawWallet
      ? (JSON.parse(rawWallet) as WalletState)
      : { ...SERVER_WALLET };
  } catch {
    walletCache = { ...SERVER_WALLET };
  }
}

function persistTasks(tasks: Task[]) {
  tasksCache = sortTasks(tasks);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasksCache));
  window.dispatchEvent(new Event("helpr:update"));
}

function persistWallet(wallet: WalletState) {
  walletCache = wallet;
  localStorage.setItem(WALLET_KEY, JSON.stringify(walletCache));
  window.dispatchEvent(new Event("helpr:update"));
}

/** Stable snapshot for useSyncExternalStore — same reference until data changes. */
export function getTasks(): Task[] {
  hydrate();
  return tasksCache;
}

export function getTask(id: string): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

/** Stable snapshot for useSyncExternalStore — same reference until data changes. */
export function getWallet(): WalletState {
  hydrate();
  return walletCache;
}

export function createTask(input: {
  title: string;
  brief: string;
  category: TaskCategory;
  budgetUsd: number;
  helperId: string;
}): Task {
  const wallet = getWallet();
  if (input.budgetUsd <= 0) {
    throw new Error("Budget must be greater than zero.");
  }
  if (wallet.availableUsd < input.budgetUsd) {
    throw new Error("Not enough USDC in your demo balance.");
  }

  const helper = getHelper(input.helperId);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const lockEvent = createEscrowEvent(
    "Escrow funded",
    input.budgetUsd,
    `${id}:fund:${input.budgetUsd}`
  );

  const task: Task = {
    id,
    title: input.title.trim(),
    brief: input.brief.trim(),
    category: input.category,
    budgetUsd: input.budgetUsd,
    status: "funded",
    helperId: helper.id,
    helperName: helper.name,
    helperKind: helper.kind,
    deliverable: null,
    createdAt: now,
    updatedAt: now,
    escrow: {
      lockedUsd: input.budgetUsd,
      events: [lockEvent],
    },
  };

  persistWallet({
    availableUsd: Number((wallet.availableUsd - input.budgetUsd).toFixed(2)),
    lockedUsd: Number((wallet.lockedUsd + input.budgetUsd).toFixed(2)),
  });
  persistTasks([task, ...getTasks()]);
  return task;
}

export function markWorking(id: string): Task {
  return updateTask(id, (task) => ({
    ...task,
    status: "working",
    updatedAt: new Date().toISOString(),
  }));
}

export function markDelivered(id: string, deliverable: string): Task {
  return updateTask(id, (task) => ({
    ...task,
    status: "delivered",
    deliverable,
    updatedAt: new Date().toISOString(),
    escrow: {
      ...task.escrow,
      events: [
        ...task.escrow.events,
        createEscrowEvent(
          "Deliverable submitted — funds still locked",
          0,
          `${id}:deliver`
        ),
      ],
    },
  }));
}

export function acceptTask(id: string): Task {
  const task = getTask(id);
  if (!task) throw new Error("Task not found.");
  if (task.status !== "delivered") {
    throw new Error("Only delivered tasks can be accepted.");
  }

  const wallet = getWallet();
  persistWallet({
    availableUsd: wallet.availableUsd,
    lockedUsd: Number((wallet.lockedUsd - task.budgetUsd).toFixed(2)),
  });

  return updateTask(id, (current) => ({
    ...current,
    status: "accepted",
    updatedAt: new Date().toISOString(),
    escrow: {
      lockedUsd: 0,
      events: [
        ...current.escrow.events,
        createEscrowEvent(
          `Released to ${current.helperName}`,
          current.budgetUsd,
          `${id}:release`
        ),
      ],
    },
  }));
}

export function refundTask(id: string): Task {
  const task = getTask(id);
  if (!task) throw new Error("Task not found.");
  if (task.status === "accepted" || task.status === "refunded") {
    throw new Error("This task is already settled.");
  }
  if (task.escrow.lockedUsd <= 0) {
    throw new Error("Nothing left to refund.");
  }

  const wallet = getWallet();
  persistWallet({
    availableUsd: Number((wallet.availableUsd + task.budgetUsd).toFixed(2)),
    lockedUsd: Number((wallet.lockedUsd - task.budgetUsd).toFixed(2)),
  });

  return updateTask(id, (current) => ({
    ...current,
    status: "refunded",
    updatedAt: new Date().toISOString(),
    escrow: {
      lockedUsd: 0,
      events: [
        ...current.escrow.events,
        createEscrowEvent(
          "Refunded to you",
          current.budgetUsd,
          `${id}:refund`
        ),
      ],
    },
  }));
}

export function resetDemo() {
  tasksCache = EMPTY_TASKS;
  walletCache = { ...SERVER_WALLET };
  localStorage.removeItem(TASKS_KEY);
  localStorage.setItem(WALLET_KEY, JSON.stringify(walletCache));
  hydrated = true;
  window.dispatchEvent(new Event("helpr:update"));
}

function updateTask(id: string, updater: (task: Task) => Task): Task {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) throw new Error("Task not found.");
  const next = updater(tasks[index]);
  const copy = [...tasks];
  copy[index] = next;
  persistTasks(copy);
  return next;
}
