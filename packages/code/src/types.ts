import type { CodeStorageAdapter } from "./storage/adapter";

/**
 * Reasons returned when a redeem flow cannot continue.
 *
 * - `not_found`: code does not exist.
 * - `disabled`: code exists but redeem is disabled.
 * - `expired`: expiration date has already passed.
 * - `max_redemptions_reached`: redeem limit has been exhausted.
 * - `race_lost`: pre-check passed, but another concurrent redeem won first.
 */
export type RedeemFailureReason =
  | "not_found"
  | "disabled"
  | "expired"
  | "max_redemptions_reached"
  | "race_lost";

/**
 * Failure reasons that can appear in `view(...).redeemable.reason`.
 * This excludes non-view states (`not_found`, `race_lost`).
 */
export type CodeViewFailureReason = Exclude<RedeemFailureReason, "not_found" | "race_lost">;

/**
 * Options for generating only the random body part of a code.
 *
 * @example
 * const body = await generateCodeBody();
 *
 * @example
 * const body = await generateCodeBody({
 *   length: 12,
 *   charset: "ABC123",
 * });
 */
export interface GenerateCodeBodyOptions {
  /**
   * Number of characters generated for the body.
   *
   * @default 8
   */
  length?: number;
  /**
   * Character set used by the generator.
   * Repeated characters are automatically de-duplicated.
   *
   * @default "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
   */
  charset?: string;
}

/**
 * Redeem behavior configuration.
 *
 * @example
 * redeemable: {
 *   enable: true,
 *   maxRedemptions: 1,
 *   expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
 * }
 */
export interface RedeemableOptions {
  /**
   * Enables or disables redeem for this specific code.
   *
   * @default false
   */
  enable?: boolean;
  /**
   * Maximum successful redemptions allowed.
   * Use `null` for unlimited redemptions.
   *
   * @default null
   */
  maxRedemptions?: number | null;
  /**
   * Expiration date in UTC.
   * Use `null` to never expire.
   *
   * @default null
   */
  expiresAt?: Date | null;
}

/**
 * Final code formatting options.
 *
 * @example
 * codeOptions: {
 *   prefix: "PREM-",
 *   suffix: "-2026",
 * }
 *
 * @example
 * codeOptions: {
 *   prefix: "VIP-",
 *   body: await generateCodeBody({ length: 10 }),
 * }
 */
export interface CodeFormatOptions {
  /**
   * Static prefix added before the generated body.
   *
   * @example "PREM-"
   */
  prefix?: string;
  /**
   * Custom body. If omitted, the library generates one automatically.
   */
  body?: string;
  /**
   * Static suffix added after the generated body.
   *
   * @example "-2026"
   */
  suffix?: string;
}

/**
 * Input payload for `CodeInstance.generate`.
 *
 * @example
 * const codeId = await code.generate({
 *   id: "premium",
 *   type: "promotion",
 *   value: { tier: 1 },
 *   redeemable: { enable: true, maxRedemptions: 1 },
 *   codeOptions: { prefix: "PREM-" },
 * });
 *
 * @example
 * // if `id` is omitted, the generated `code` string is used as `id`
 * const codeId = await code.generate({
 *   type: "license",
 *   value: { tier: 2 },
 * });
 */
export interface GenerateInput<T = unknown> {
  /**
   * Logical identifier saved with the code record.
   *
   * If omitted, the generated final `code` is used as `id`.
   *
   * Note: in MongoDB adapter this maps to `_id`, so it must be unique.
   */
  id?: string;
  /**
   * Classification of the code, such as `promotion`, `license`, `giftcard`.
   *
   * @default "default"
   */
  type?: string;
  /**
   * Arbitrary payload associated with this code.
   */
  value: T;
  /**
   * Redeem policy for the generated code.
   */
  redeemable?: RedeemableOptions;
  /**
   * Code formatting options.
   */
  codeOptions?: CodeFormatOptions;
}

/**
 * Construction options for `Code()`.
 *
 * @example
 * // MongoDB adapter
 * const code = Code({
 *   database: mongodbAdapter(db, { client }),
 *   dbName: "license_codes", // collection name in Mongo
 * });
 */
export interface CodeOptions {
  /**
   * Storage adapter.
   * Use `mongodbAdapter(db, options)` from `@yeytaken/code/adapters/mongodb`.
   */
  database: CodeStorageAdapter;
  /**
   * Collection name override.
   * When `database` supports name override, this value is applied by `Code()`.
   */
  dbName?: string;
  /**
   * Generation behavior tuning.
   *
   * This only affects cases where `codeOptions.body` is omitted.
   *
   * @example
   * generation: {
   *   maxAttempts: 20,
   *   body: { length: 10, charset: "ABC123XYZ" }
   * }
   */
  generation?: {
    /**
     * Maximum retries for auto-generated code collisions.
     *
     * @default 12
     *
     * Ignored when `codeOptions.body` is explicitly provided in `generate(...)`.
     */
    maxAttempts?: number;
    /**
     * Default options used when body is auto-generated.
     *
     * Ignored when `codeOptions.body` is explicitly provided in `generate(...)`.
     */
    body?: GenerateCodeBodyOptions;
  };
}

export interface CodeViewRedeemableState {
  /**
   * Current redeem enable flag.
   */
  enable: boolean;
  /**
   * Maximum allowed successful redemptions.
   * `null` means unlimited.
   */
  maxRedemptions: number | null;
  /**
   * Expiration date for this code.
   * `null` means no expiration.
   */
  expiresAt: Date | null;
  /**
   * Number of successful redemptions already performed.
   */
  redemptions: number;
  /**
   * Remaining successful redemptions.
   * `null` means unlimited.
   */
  remainingRedemptions: number | null;
  /**
   * Whether this code can be redeemed right now.
   */
  canRedeem: boolean;
  /**
   * Why redeem is currently blocked (if blocked).
   */
  reason: CodeViewFailureReason | null;
}

export interface CodeViewMetadata {
  /**
   * Creation timestamp.
   */
  createdAt: Date;
  /**
   * Last update timestamp.
   */
  updatedAt: Date;
  /**
   * Last successful redeem timestamp.
   */
  lastRedeemedAt: Date | null;
}

export interface CodeView<T = unknown> {
  /**
   * Logical identifier provided in `generate({ id })`.
   * When `id` was omitted at creation time, this value equals `code`.
   */
  id: string;
  /**
   * Classification provided in `generate({ type })`.
   */
  type: string;
  /**
   * Final code string (prefix + body + suffix).
   */
  code: string;
  /**
   * Original payload saved in `generate({ value })`.
   */
  value: T;
  /**
   * Redeem status snapshot at read time.
   */
  redeemable: CodeViewRedeemableState;
  /**
   * Record timestamps.
   */
  metadata: CodeViewMetadata;
}

/**
 * Result returned by `CodeInstance.redeem(code)`.
 *
 * @example
 * const result = await code.redeem(codeId);
 * if (!result.check) {
 *   console.log(result.reason);
 *   return;
 * }
 * const payload = await result.isRedeem();
 */
export interface RedeemResult<T = unknown> {
  /**
   * Pre-check status.
   *
   * - `true`: code looked redeemable at check time.
   * - `false`: code was not redeemable at check time.
   */
  check: boolean;
  /**
   * Failure reason.
   * When `check` is `true`, this may still become `"race_lost"` after `isRedeem()`
   * in high-concurrency scenarios.
   */
  reason: RedeemFailureReason | null;
  /**
   * Executes the atomic redeem operation.
   *
   * @returns Payload when redeem succeeds, otherwise `null`.
   */
  isRedeem(): Promise<T | null>;
}

/**
 * Main service returned by `Code()`.
 *
 * @example
 * const code = Code({
 *   database: mongodbAdapter(db, { client }),
 * });
 * const codeId = await code.generate({
 *   id: "premium",
 *   type: "promotion",
 *   value: { tier: 1 },
 *   redeemable: { enable: true, maxRedemptions: 1 },
 * });
 *
 * const view = await code.view(codeId);
 * const redeem = await code.redeem(codeId);
 * const payload = redeem.check ? await redeem.isRedeem() : null;
 *
 * await code.close();
 */
export interface CodeInstance<T = unknown> {
  /**
   * Generates and stores a new code.
   *
   * @returns Final code string to be used in `view()` and `redeem()`.
   *
   * @throws `CodeValidationError` for invalid input.
   * @throws `CodeConflictError` when uniqueness collisions cannot be resolved.
   */
  generate(input: GenerateInput<T>): Promise<string>;
  /**
   * Reads a stored code by its final string.
   *
   * @returns A full snapshot of the code record, or `null` if not found.
   *
   * @throws `CodeValidationError` for invalid code input.
   */
  view(code: string): Promise<CodeView<T> | null>;
  /**
   * Starts a redeem flow for the given code.
   * Call `result.isRedeem()` to perform the actual atomic redeem step.
   *
   * @throws `CodeValidationError` for invalid code input.
   */
  redeem(code: string): Promise<RedeemResult<T>>;
  /**
   * Closes internally owned resources.
   * Safe to call multiple times (idempotent).
   */
  close(): Promise<void>;
}
