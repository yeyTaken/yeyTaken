import { createCodeService } from "./core/code-service";
import { generateCodeBody as internalGenerateCodeBody } from "./core/generate-code-body";
import { CodeStorageError } from "./errors";
import { isCodeStorageAdapter, type CodeStorageAdapter, withAdapterDbName } from "./storage/adapter";
import type { CodeInstance, CodeOptions, GenerateCodeBodyOptions } from "./types";

/**
 * Creates a new code service instance.
 *
 * Requires a storage adapter (MongoDB).
 * Use `mongodbAdapter(db, options)` from `@yeytaken/code/adapters/mongodb`.
 * Optional `dbName` customizes the collection name through adapter override.
 *
 * `options.generation` controls how automatic body generation behaves:
 * - `maxAttempts` (`default: 12`): retries when an auto-generated code collides.
 * - `body`: forwarded to `generateCodeBody` when `codeOptions.body` is omitted.
 *
 * @example
 * const code = Code({
 *   database: mongodbAdapter(db, { client }),
 *   dbName: "license_codes",
 * });
 *
 * @example
 * // tune auto-generation behavior globally for this instance
 * const code = Code({
 *   database: mongodbAdapter(db, { client }),
 *   generation: {
 *     maxAttempts: 20,
 *     body: {
 *       length: 10,
 *       charset: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
 *     },
 *   },
 * });
 *
 * @example
 * // `generation.body` is used only when `codeOptions.body` is not provided
 * const codeId = await code.generate({
 *   // id is optional
 *   type: "promotion",
 *   value: { tier: 1 },
 *   codeOptions: { prefix: "PREM-" }, // body auto-generated with `generation.body`
 * });
 */
export function Code<T = unknown>(options: CodeOptions): CodeInstance<T> {
  const adapter = resolveAdapter(options);
  return createCodeService<T>(adapter, {
    generation: options.generation,
  });
}

/**
 * Generates only the random body segment used inside a code.
 * Useful when you want full control of `prefix` / `suffix` but still
 * want a secure random body from the library.
 *
 * @example
 * const body = await generateCodeBody();
 *
 * @example
 * const body = await generateCodeBody({
 *   length: 12,
 *   charset: "ABCDEFGH12345678",
 * });
 */
export async function generateCodeBody(options: GenerateCodeBodyOptions = {}): Promise<string> {
  return internalGenerateCodeBody(options);
}

export type {
  CodeFormatOptions,
  CodeInstance,
  CodeOptions,
  CodeView,
  CodeViewFailureReason,
  CodeViewMetadata,
  CodeViewRedeemableState,
  GenerateCodeBodyOptions,
  GenerateInput,
  RedeemFailureReason,
  RedeemResult,
  RedeemableOptions,
} from "./types";

export type { CodeStorageAdapter, StoredCodeRecord } from "./storage/adapter";

export {
  CodeError,
  CodeConflictError,
  CodeDependencyError,
  CodeStateError,
  CodeStorageError,
  CodeValidationError,
} from "./errors";

function resolveAdapter(options: CodeOptions): CodeStorageAdapter {
  if (!options || !options.database) {
    throw new CodeStorageError(
      "MongoDB adapter is required. Provide `Code({ database: mongodbAdapter(db, options) })`.",
    );
  }

  if (isCodeStorageAdapter(options.database)) {
    return withAdapterDbName(options.database, options.dbName);
  }

  throw new CodeStorageError("Invalid `options.database` value. Provide a compatible storage adapter.");
}
