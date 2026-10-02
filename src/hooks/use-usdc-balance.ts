"use client";

import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getUsdcBalanceUsd } from "@/lib/lock-usdc";

export function useUsdcBalance() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balanceUsd, setBalanceUsd] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!publicKey || !connected) {
      setBalanceUsd(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const usd = await getUsdcBalanceUsd(connection, publicKey);
      setBalanceUsd(usd);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load USDC balance."
      );
      setBalanceUsd(null);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, connected]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { balanceUsd, loading, error, refresh, connected, publicKey };
}
