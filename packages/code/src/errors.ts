/**
 * Stable error codes emitted by `@yeytaken/code`.
 */
export type CodeErrorCode =
  | "ERR_CODE_VALIDATION"
  | "ERR_CODE_CONFLICT"
  | "ERR_CODE_DEPENDENCY"
  | "ERR_CODE_STORAGE"
  | "ERR_CODE_STATE";

interface CodeErrorOptions {
  cause?: unknown;
  details?: unknown;
}

/**
 * Base error class for the library.
 *
 * Every custom error extends this class and exposes a stable `code`.
 */
export class CodeError extends Error {
  readonly code: CodeErrorCode;
  readonly details?: unknown;

  constructor(code: CodeErrorCode, message: string, options: CodeErrorOptions = {}) {
    super(message, options.cause ? { cause: options.cause } : undefined);
    this.name = "CodeError";
    this.code = code;
    this.details = options.details;
  }
}

/**
 * Input validation error.
 * Thrown when provided arguments are invalid or malformed.
 */
export class CodeValidationError extends CodeError {
  constructor(message: string, options: CodeErrorOptions = {}) {
    super("ERR_CODE_VALIDATION", message, options);
    this.name = "CodeValidationError";
  }
}

/**
 * Conflict error.
 * Commonly used for uniqueness collisions during code creation.
 */
export class CodeConflictError extends CodeError {
  constructor(message: string, options: CodeErrorOptions = {}) {
    super("ERR_CODE_CONFLICT", message, options);
    this.name = "CodeConflictError";
  }
}

/**
 * Dependency/runtime availability error.
 * Thrown when optional runtime dependencies are missing.
 */
export class CodeDependencyError extends CodeError {
  constructor(message: string, options: CodeErrorOptions = {}) {
    super("ERR_CODE_DEPENDENCY", message, options);
    this.name = "CodeDependencyError";
  }
}

/**
 * Storage/backend error.
 * Wraps adapter read/write failures.
 */
export class CodeStorageError extends CodeError {
  constructor(message: string, options: CodeErrorOptions = {}) {
    super("ERR_CODE_STORAGE", message, options);
    this.name = "CodeStorageError";
  }
}

/**
 * State error.
 * Thrown when an operation is called in an invalid lifecycle state
 * (for example after `close()`).
 */
export class CodeStateError extends CodeError {
  constructor(message: string, options: CodeErrorOptions = {}) {
    super("ERR_CODE_STATE", message, options);
    this.name = "CodeStateError";
  }
}
