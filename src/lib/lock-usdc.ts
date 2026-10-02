"use client";

import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  Transaction,
  type SendOptions,
} from "@solana/web3.js";
import {
  ESCROW_TREASURY,
  USDC_DECIMALS,
  USDC_MINT,
  usdToUsdcAmount,
} from "@/lib/solana";

type SendTransaction = (
  transaction: Transaction,
  connection: Connection,
  options?: SendOptions
) => Promise<string>;

export async function getUsdcBalanceUsd(
  connection: Connection,
  owner: PublicKey
): Promise<number> {
  const ata = getAssociatedTokenAddressSync(USDC_MINT, owner);
  try {
    const account = await getAccount(connection, ata);
    return Number(account.amount) / 10 ** USDC_DECIMALS;
  } catch {
    return 0;
  }
}

export async function lockUsdcToEscrow(input: {
  connection: Connection;
  owner: PublicKey;
  amountUsd: number;
  sendTransaction: SendTransaction;
}): Promise<string> {
  const amount = usdToUsdcAmount(input.amountUsd);
  if (amount <= BigInt(0)) {
    throw new Error("Budget must be greater than zero.");
  }

  const fromAta = getAssociatedTokenAddressSync(USDC_MINT, input.owner);
  const toAta = getAssociatedTokenAddressSync(USDC_MINT, ESCROW_TREASURY);

  let sourceBalance = BigInt(0);
  try {
    const account = await getAccount(input.connection, fromAta);
    sourceBalance = account.amount;
  } catch {
    throw new Error(
      "No USDC in this wallet on Solana Devnet. Airdrop test USDC from Circle’s faucet, then retry."
    );
  }

  if (sourceBalance < amount) {
    const have = Number(sourceBalance) / 10 ** USDC_DECIMALS;
    throw new Error(
      `Need $${input.amountUsd.toFixed(2)} USDC on Devnet; this wallet has $${have.toFixed(2)}.`
    );
  }

  const { blockhash, lastValidBlockHeight } =
    await input.connection.getLatestBlockhash("confirmed");

  const tx = new Transaction({
    feePayer: input.owner,
    blockhash,
    lastValidBlockHeight,
  }).add(
    createAssociatedTokenAccountIdempotentInstruction(
      input.owner,
      toAta,
      ESCROW_TREASURY,
      USDC_MINT
    ),
    createTransferCheckedInstruction(
      fromAta,
      USDC_MINT,
      toAta,
      input.owner,
      amount,
      USDC_DECIMALS
    )
  );

  const signature = await input.sendTransaction(tx, input.connection, {
    skipPreflight: false,
  });
  await input.connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );
  return signature;
}
