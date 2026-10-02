"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  EMPTY_TASKS,
  SERVER_WALLET,
  getTasks,
  getWallet,
} from "@/lib/store";
import type { Task, WalletState } from "@/lib/types";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("helpr:update", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("helpr:update", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerWallet() {
  return SERVER_WALLET;
}

function getServerTasks() {
  return EMPTY_TASKS;
}

export function useWallet(): WalletState {
  return useSyncExternalStore(subscribe, getWallet, getServerWallet);
}

export function useTasks(): Task[] {
  return useSyncExternalStore(subscribe, getTasks, getServerTasks);
}

export function useTask(id: string): Task | undefined {
  const tasks = useTasks();
  return tasks.find((t) => t.id === id);
}

export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
