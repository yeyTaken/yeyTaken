import type { RedeemFailureReason } from "../types";

/**
 * Internal symbol used to identify compatible storage adapters.
 */
export const CODE_STORAGE_ADAPTER_BRAND = Symbol.for("@yeytaken/code/storage-adapter");
/**
 * Optional internal hook used by `Code({ dbName })` to override storage naming.
 */
export const CODE_STORAGE_ADAPTER_SET_DB_NAME = Symbol.for("@yeytaken/code/storage-adapter/set-db-name");

export type StorageRedeemFailureReason = Exclude<RedeemFailureReason, "race_lost">;

export interface StoredCodeRecord {
  id: string;
  type: string;
  code: string;
  value: unknown;
  redeemableEnable: boolean;
  maxRedemptions: number | null;
  expiresAt: string | null;
  redemptionCount: number;
  createdAt: string;
  updatedAt: string;
  lastRedeemedAt: string | null;
}

export interface StorageCreateConflict {
  ok: false;
  reason: "conflict";
}

export interface StorageCreateSuccess {
  ok: true;
}

export type StorageCreateResult = StorageCreateSuccess | StorageCreateConflict;

export interface StorageRedeemFailure {
  ok: false;
  reason: StorageRedeemFailureReason;
  record: StoredCodeRecord | null;
}

export interface StorageRedeemSuccess {
  ok: true;
  record: StoredCodeRecord;
}

export type StorageRedeemResult = StorageRedeemSuccess | StorageRedeemFailure;

export interface CodeStorageAdapter {
  /**
   * Internal adapter marker.
   */
  readonly [CODE_STORAGE_ADAPTER_BRAND]: true;
  /**
   * Optional name override hook used by `Code({ dbName })`.
   */
  readonly [CODE_STORAGE_ADAPTER_SET_DB_NAME]?: (dbName: string) => CodeStorageAdapter;
  /**
   * Adapter name (e.g. `mongodb`).
   */
  readonly name: string;
  /**
   * Initializes adapter resources (schema/indexes, etc.).
   */
  init(): Promise<void>;
  /**
   * Creates a code record.
   */
  create(record: StoredCodeRecord): Promise<StorageCreateResult>;
  /**
   * Reads a record by final code string.
   */
  findByCode(code: string): Promise<StoredCodeRecord | null>;
  /**
   * Performs atomic redeem.
   */
  redeem(code: string, nowIso: string): Promise<StorageRedeemResult>;
  /**
   * Releases adapter resources.
   */
  close(): Promise<void>;
}

/**
 * Runtime guard for adapter compatibility.
 */
export function isCodeStorageAdapter(value: unknown): value is CodeStorageAdapter {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CodeStorageAdapter>;
  return (
    candidate[CODE_STORAGE_ADAPTER_BRAND] === true &&
    typeof candidate.init === "function" &&
    typeof candidate.create === "function" &&
    typeof candidate.findByCode === "function" &&
    typeof candidate.redeem === "function" &&
    typeof candidate.close === "function"
  );
}

/**
 * Applies `dbName` override when adapter supports name customization.
 * If unsupported, returns the original adapter unchanged.
 */
export function withAdapterDbName(adapter: CodeStorageAdapter, dbName: string | undefined): CodeStorageAdapter {
  if (dbName === undefined) {
    return adapter;
  }

  const setter = adapter[CODE_STORAGE_ADAPTER_SET_DB_NAME];
  if (typeof setter === "function") {
    return setter(dbName);
  }

  return adapter;
}
