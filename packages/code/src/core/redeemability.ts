import type { StorageRedeemFailureReason } from "../storage/adapter";

export type RedeemabilityFailureReason = Exclude<StorageRedeemFailureReason, "not_found">;

export interface RedeemabilityInput {
  redeemableEnable: boolean;
  maxRedemptions: number | null;
  expiresAt: string | null;
  redemptionCount: number;
}

export interface RedeemabilityEvaluation {
  check: boolean;
  reason: RedeemabilityFailureReason | null;
  remainingRedemptions: number | null;
}

export function evaluateRedeemability(input: RedeemabilityInput, now: Date): RedeemabilityEvaluation {
  const nowIso = now.toISOString();

  if (!input.redeemableEnable) {
    return {
      check: false,
      reason: "disabled",
      remainingRedemptions: getRemaining(input.maxRedemptions, input.redemptionCount),
    };
  }

  if (input.expiresAt !== null && input.expiresAt <= nowIso) {
    return {
      check: false,
      reason: "expired",
      remainingRedemptions: getRemaining(input.maxRedemptions, input.redemptionCount),
    };
  }

  if (input.maxRedemptions !== null && input.redemptionCount >= input.maxRedemptions) {
    return {
      check: false,
      reason: "max_redemptions_reached",
      remainingRedemptions: 0,
    };
  }

  return {
    check: true,
    reason: null,
    remainingRedemptions: getRemaining(input.maxRedemptions, input.redemptionCount),
  };
}

function getRemaining(maxRedemptions: number | null, redemptionCount: number): number | null {
  if (maxRedemptions === null) {
    return null;
  }

  const remaining = maxRedemptions - redemptionCount;
  return remaining > 0 ? remaining : 0;
}
