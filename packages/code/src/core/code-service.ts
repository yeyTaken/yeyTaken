import { CodeConflictError, CodeStateError, CodeStorageError } from "../errors";
import type { CodeInstance, CodeOptions, CodeView, RedeemFailureReason, RedeemResult } from "../types";
import type { CodeStorageAdapter, StorageRedeemFailureReason, StoredCodeRecord } from "../storage/adapter";
import { generateCodeBody } from "./generate-code-body";
import { evaluateRedeemability } from "./redeemability";
import { normalizeGenerateInput, normalizeGenerationOptions, normalizeLookupCode } from "./validators";

interface CreateCodeServiceOptions {
  generation?: CodeOptions["generation"];
}

export function createCodeService<T = unknown>(
  adapter: CodeStorageAdapter,
  options: CreateCodeServiceOptions = {},
): CodeInstance<T> {
  const generationOptions = normalizeGenerationOptions(options.generation);

  let initialization: Promise<void> | null = null;
  let closePromise: Promise<void> | null = null;
  let isClosed = false;

  return {
    generate,
    view,
    redeem,
    close,
  };

  async function generate(input: Parameters<CodeInstance<T>["generate"]>[0]): Promise<string> {
    ensureOpen();
    await ensureInitialized();

    const normalizedInput = normalizeGenerateInput(input);
    const manualBody = normalizedInput.codeOptions.body !== undefined;
    const attempts = manualBody ? 1 : generationOptions.maxAttempts;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      const body = manualBody ? normalizedInput.codeOptions.body ?? "" : await generateCodeBody(generationOptions.body);
      const code = `${normalizedInput.codeOptions.prefix}${body}${normalizedInput.codeOptions.suffix}`;

      const nowIso = new Date().toISOString();
      const record: StoredCodeRecord = {
        id: normalizedInput.id ?? code,
        type: normalizedInput.type,
        code,
        value: normalizedInput.value,
        redeemableEnable: normalizedInput.redeemable.enable,
        maxRedemptions: normalizedInput.redeemable.maxRedemptions,
        expiresAt: normalizedInput.redeemable.expiresAt ? normalizedInput.redeemable.expiresAt.toISOString() : null,
        redemptionCount: 0,
        createdAt: nowIso,
        updatedAt: nowIso,
        lastRedeemedAt: null,
      };

      const createResult = await adapter.create(record);
      if (createResult.ok) {
        return code;
      }

      if (manualBody) {
        throw new CodeConflictError(
          "Code collision detected for provided `codeOptions.body`. Provide a different body or omit `body` for auto-generation.",
        );
      }
    }

    throw new CodeConflictError("Failed to generate a unique code after maximum retry attempts.");
  }

  async function view(code: string): Promise<CodeView<T> | null> {
    ensureOpen();
    await ensureInitialized();

    const normalizedCode = normalizeLookupCode(code);
    const record = await adapter.findByCode(normalizedCode);
    if (!record) {
      return null;
    }

    return mapRecordToView(record, new Date());
  }

  async function redeem(code: string): Promise<RedeemResult<T>> {
    ensureOpen();
    await ensureInitialized();

    const normalizedCode = normalizeLookupCode(code);
    const precheckRecord = await adapter.findByCode(normalizedCode);
    if (!precheckRecord) {
      return createRedeemResult<T>(false, "not_found", async () => null);
    }

    const precheck = evaluateRedeemability(precheckRecord, new Date());
    if (!precheck.check) {
      return createRedeemResult<T>(false, precheck.reason, async () => null);
    }

    let redeemExecution: Promise<T | null> | null = null;
    let latestReason: RedeemFailureReason | null = null;

    return {
      check: true,
      get reason() {
        return latestReason;
      },
      async isRedeem(): Promise<T | null> {
        if (redeemExecution) {
          return redeemExecution;
        }

        redeemExecution = (async (): Promise<T | null> => {
          const result = await adapter.redeem(normalizedCode, new Date().toISOString());
          if (!result.ok) {
            latestReason = mapFailureAfterPrecheck(result.reason);
            return null;
          }

          latestReason = null;
          return result.record.value as T;
        })();

        return redeemExecution;
      },
    };
  }

  async function close(): Promise<void> {
    if (closePromise) {
      return closePromise;
    }

    isClosed = true;
    closePromise = adapter.close();
    return closePromise;
  }

  async function ensureInitialized(): Promise<void> {
    if (initialization) {
      await initialization;
      return;
    }

    initialization = adapter.init().catch((error: unknown) => {
      initialization = null;
      throw error;
    });

    await initialization;
  }

  function ensureOpen(): void {
    if (isClosed) {
      throw new CodeStateError("Code service instance has been closed.");
    }
  }
}

function createRedeemResult<T>(
  check: boolean,
  initialReason: RedeemFailureReason | null,
  onRedeem: () => Promise<T | null>,
): RedeemResult<T> {
  return {
    check,
    reason: initialReason,
    isRedeem: onRedeem,
  };
}

function mapFailureAfterPrecheck(reason: StorageRedeemFailureReason): RedeemFailureReason {
  if (reason === "expired") {
    return "expired";
  }

  if (reason === "max_redemptions_reached" || reason === "not_found" || reason === "disabled") {
    return "race_lost";
  }

  return "race_lost";
}

function mapRecordToView<T>(record: StoredCodeRecord, now: Date): CodeView<T> {
  const redeemability = evaluateRedeemability(record, now);

  return {
    id: record.id,
    type: record.type,
    code: record.code,
    value: record.value as T,
    redeemable: {
      enable: record.redeemableEnable,
      maxRedemptions: record.maxRedemptions,
      expiresAt: parseDateOrNull(record.expiresAt),
      redemptions: record.redemptionCount,
      remainingRedemptions: redeemability.remainingRedemptions,
      canRedeem: redeemability.check,
      reason: redeemability.reason,
    },
    metadata: {
      createdAt: parseDate(record.createdAt),
      updatedAt: parseDate(record.updatedAt),
      lastRedeemedAt: parseDateOrNull(record.lastRedeemedAt),
    },
  };
}

function parseDate(value: string): Date {
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) {
    throw new CodeStorageError("Invalid date value found in storage adapter.");
  }

  return parsed;
}

function parseDateOrNull(value: string | null): Date | null {
  if (value === null) {
    return null;
  }

  return parseDate(value);
}
