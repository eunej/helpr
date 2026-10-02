"use client";

import { createEscrowEvent, STARTING_BALANCE_USD } from "@/lib/escrow";
import { OPEN_BOARD_ID, getHelper } from "@/lib/helpers";
import type {
  SeaCountry,
  Task,
  TaskCategory,
  WalletState,
} from "@/lib/types";

const TASKS_KEY = "helpr.tasks.v2";
const WALLET_KEY = "helpr.wallet.v2";
const EARNINGS_KEY = "helpr.earnings.v2";
const ACTIVE_HELPER_KEY = "helpr.activeHelper.v2";

export const EMPTY_TASKS: Task[] = [];
export const SERVER_WALLET: WalletState = {
  availableUsd: STARTING_BALANCE_USD,
  lockedUsd: 0,
};
export const EMPTY_EARNINGS: Record<string, number> = {};

let tasksCache: Task[] = EMPTY_TASKS;
let walletCache: WalletState = SERVER_WALLET;
let earningsCache: Record<string, number> = EMPTY_EARNINGS;
let activeHelperIdCache = "prem";
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

  try {
    const rawEarnings = localStorage.getItem(EARNINGS_KEY);
    earningsCache = rawEarnings
      ? (JSON.parse(rawEarnings) as Record<string, number>)
      : {};
  } catch {
    earningsCache = {};
  }

  activeHelperIdCache =
    localStorage.getItem(ACTIVE_HELPER_KEY) || "prem";
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

function persistEarnings(earnings: Record<string, number>) {
  earningsCache = earnings;
  localStorage.setItem(EARNINGS_KEY, JSON.stringify(earningsCache));
  window.dispatchEvent(new Event("helpr:update"));
}

export function getTasks(): Task[] {
  hydrate();
  return tasksCache;
}

export function getTask(id: string): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

export function getWallet(): WalletState {
  hydrate();
  return walletCache;
}

export function getEarnings(): Record<string, number> {
  hydrate();
  return earningsCache;
}

export function getActiveHelperId(): string {
  hydrate();
  return activeHelperIdCache;
}

export function setActiveHelperId(id: string) {
  hydrate();
  activeHelperIdCache = id;
  localStorage.setItem(ACTIVE_HELPER_KEY, id);
  window.dispatchEvent(new Event("helpr:update"));
}

export function getOpenTasks(): Task[] {
  return getTasks().filter((t) => t.status === "open");
}

export function getHelperQueue(helperId: string): Task[] {
  return getTasks().filter(
    (t) =>
      t.helperId === helperId &&
      (t.status === "working" || t.status === "delivered")
  );
}

export function createTask(input: {
  title: string;
  brief: string;
  category: TaskCategory;
  budgetUsd: number;
  helperId: string;
  country?: SeaCountry;
}): Task {
  const wallet = getWallet();
  if (input.budgetUsd <= 0) {
    throw new Error("Budget must be greater than zero.");
  }
  if (wallet.availableUsd < input.budgetUsd) {
    throw new Error("Not enough USDC in your demo balance.");
  }

  const toBoard = input.helperId === OPEN_BOARD_ID;
  const helper = toBoard ? null : getHelper(input.helperId);
  const marketplace =
    toBoard || helper?.kind === "human";
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
    country: input.country,
    budgetUsd: input.budgetUsd,
    status: marketplace ? "open" : "funded",
    helperId: toBoard ? "" : helper!.id,
    helperName: toBoard
      ? "Open to local helpers"
      : helper!.name,
    helperKind: toBoard ? "human" : helper!.kind,
    deliverable: null,
    createdAt: now,
    updatedAt: now,
    escrow: {
      lockedUsd: input.budgetUsd,
      events: [
        lockEvent,
        ...(marketplace
          ? [
              createEscrowEvent(
                toBoard
                  ? "Listed on helper board"
                  : `Offered to ${helper!.name}`,
                0,
                `${id}:list`
              ),
            ]
          : []),
      ],
    },
  };

  persistWallet({
    availableUsd: Number((wallet.availableUsd - input.budgetUsd).toFixed(2)),
    lockedUsd: Number((wallet.lockedUsd + input.budgetUsd).toFixed(2)),
  });
  persistTasks([task, ...getTasks()]);
  return task;
}

export function claimTask(taskId: string, helperId: string): Task {
  const helper = getHelper(helperId);
  if (helper.kind !== "human") {
    throw new Error("Only human helpers can claim board jobs.");
  }

  return updateTask(taskId, (task) => {
    if (task.status !== "open") {
      throw new Error("This job is no longer open.");
    }
    if (task.helperId && task.helperId !== helper.id) {
      throw new Error(`This job was offered to ${task.helperName}.`);
    }
    if (
      task.country &&
      helper.country &&
      task.country !== helper.country
    ) {
      throw new Error("This question is for a different country.");
    }
    return {
      ...task,
      status: "working",
      helperId: helper.id,
      helperName: helper.name,
      helperKind: "human",
      updatedAt: new Date().toISOString(),
      escrow: {
        ...task.escrow,
        events: [
          ...task.escrow.events,
          createEscrowEvent(
            `${helper.name} claimed the job`,
            0,
            `${taskId}:claim:${helper.id}`
          ),
        ],
      },
    };
  });
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

  if (task.helperId) {
    const earnings = { ...getEarnings() };
    earnings[task.helperId] = Number(
      ((earnings[task.helperId] ?? 0) + task.budgetUsd).toFixed(2)
    );
    persistEarnings(earnings);
  }

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
  earningsCache = {};
  localStorage.removeItem(TASKS_KEY);
  localStorage.removeItem(EARNINGS_KEY);
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
