"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getTasks, getWallet } from "@/lib/store";
import type { Task, WalletState } from "@/lib/types";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("helpr:update", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("helpr:update", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useWallet(): WalletState {
  return useSyncExternalStore(
    subscribe,
    getWallet,
    () => ({ availableUsd: 50, lockedUsd: 0 })
  );
}

export function useTasks(): Task[] {
  return useSyncExternalStore(subscribe, getTasks, () => []);
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
