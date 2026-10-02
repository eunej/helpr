"use client";

import { createEscrowEvent, STARTING_BALANCE_USD } from "@/lib/escrow";
import { getHelper } from "@/lib/helpers";
import type { Task, TaskCategory, WalletState } from "@/lib/types";

const TASKS_KEY = "helpr.tasks.v1";
const WALLET_KEY = "helpr.wallet.v1";

function readTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  window.dispatchEvent(new Event("helpr:update"));
}

function readWallet(): WalletState {
  if (typeof window === "undefined") {
    return { availableUsd: STARTING_BALANCE_USD, lockedUsd: 0 };
  }
  try {
    const raw = localStorage.getItem(WALLET_KEY);
    if (!raw) {
      return { availableUsd: STARTING_BALANCE_USD, lockedUsd: 0 };
    }
    return JSON.parse(raw) as WalletState;
  } catch {
    return { availableUsd: STARTING_BALANCE_USD, lockedUsd: 0 };
  }
}

function writeWallet(wallet: WalletState) {
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  window.dispatchEvent(new Event("helpr:update"));
}

export function getTasks(): Task[] {
  return readTasks().sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export function getTask(id: string): Task | undefined {
  return readTasks().find((t) => t.id === id);
}

export function getWallet(): WalletState {
  return readWallet();
}

export function createTask(input: {
  title: string;
  brief: string;
  category: TaskCategory;
  budgetUsd: number;
  helperId: string;
}): Task {
  const wallet = readWallet();
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

  writeWallet({
    availableUsd: Number((wallet.availableUsd - input.budgetUsd).toFixed(2)),
    lockedUsd: Number((wallet.lockedUsd + input.budgetUsd).toFixed(2)),
  });
  writeTasks([task, ...readTasks()]);
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

  const wallet = readWallet();
  writeWallet({
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

  const wallet = readWallet();
  writeWallet({
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
  localStorage.removeItem(TASKS_KEY);
  localStorage.setItem(
    WALLET_KEY,
    JSON.stringify({
      availableUsd: STARTING_BALANCE_USD,
      lockedUsd: 0,
    } satisfies WalletState)
  );
  window.dispatchEvent(new Event("helpr:update"));
}

function updateTask(id: string, updater: (task: Task) => Task): Task {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) throw new Error("Task not found.");
  const next = updater(tasks[index]);
  tasks[index] = next;
  writeTasks(tasks);
  return next;
}
