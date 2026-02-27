import { CodeValidationError } from "../errors";
import type { CodeFormatOptions, CodeOptions, GenerateCodeBodyOptions, GenerateInput, RedeemableOptions } from "../types";

export const DEFAULT_MAX_GENERATION_ATTEMPTS = 12;

export interface NormalizedRedeemableOptions {
  enable: boolean;
  maxRedemptions: number | null;
  expiresAt: Date | null;
}

export interface NormalizedCodeFormatOptions {
  prefix: string;
  body?: string;
  suffix: string;
}

export interface NormalizedGenerateInput<T> {
  id?: string;
  type: string;
  value: T;
  redeemable: NormalizedRedeemableOptions;
  codeOptions: NormalizedCodeFormatOptions;
}

export interface NormalizedGenerationOptions {
  maxAttempts: number;
  body: GenerateCodeBodyOptions;
}

export interface NormalizedGenerateCodeBodyOptions {
  length: number;
  charset: string;
}

const DEFAULT_CODE_BODY_LENGTH = 8;
const DEFAULT_CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeGenerateInput<T>(input: GenerateInput<T>): NormalizedGenerateInput<T> {
  if (!input || typeof input !== "object") {
    throw new CodeValidationError("`generate(input)` requires a valid object input.");
  }

  const id = normalizeOptionalNonEmptyString(input.id, "input.id");
  const type = normalizeNonEmptyString(input.type ?? "default", "input.type");
  const redeemable = normalizeRedeemableOptions(input.redeemable);
  const codeOptions = normalizeCodeFormatOptions(input.codeOptions);

  return {
    id,
    type,
    value: input.value,
    redeemable,
    codeOptions,
  };
}

export function normalizeLookupCode(code: string): string {
  return normalizeNonEmptyString(code, "code");
}

export function normalizeGenerationOptions(options?: CodeOptions["generation"]): NormalizedGenerationOptions {
  if (!options) {
    return {
      maxAttempts: DEFAULT_MAX_GENERATION_ATTEMPTS,
      body: {},
    };
  }

  const maxAttempts =
    options.maxAttempts === undefined
      ? DEFAULT_MAX_GENERATION_ATTEMPTS
      : normalizePositiveInteger(options.maxAttempts, "options.generation.maxAttempts");

  return {
    maxAttempts,
    body: options.body ?? {},
  };
}

export function normalizeGenerateCodeBodyOptions(options: GenerateCodeBodyOptions = {}): NormalizedGenerateCodeBodyOptions {
  const length =
    options.length === undefined ? DEFAULT_CODE_BODY_LENGTH : normalizePositiveInteger(options.length, "options.length");

  if (length > 512) {
    throw new CodeValidationError("`options.length` must be <= 512.");
  }

  const charset = options.charset ?? DEFAULT_CODE_CHARSET;
  if (typeof charset !== "string") {
    throw new CodeValidationError("`options.charset` must be a string.");
  }

  if (charset.length < 2) {
    throw new CodeValidationError("`options.charset` must contain at least 2 unique characters.");
  }

  const uniqueCharset = Array.from(new Set(charset.split("")).values()).join("");
  if (uniqueCharset.length < 2) {
    throw new CodeValidationError("`options.charset` must contain at least 2 unique characters.");
  }

  return {
    length,
    charset: uniqueCharset,
  };
}

function normalizeRedeemableOptions(redeemable: RedeemableOptions | undefined): NormalizedRedeemableOptions {
  if (!redeemable) {
    return {
      enable: false,
      maxRedemptions: null,
      expiresAt: null,
    };
  }

  const enable = redeemable.enable ?? false;
  if (typeof enable !== "boolean") {
    throw new CodeValidationError("`input.redeemable.enable` must be a boolean.");
  }

  let maxRedemptions: number | null = null;
  if (redeemable.maxRedemptions !== undefined) {
    if (redeemable.maxRedemptions === null) {
      maxRedemptions = null;
    } else {
      maxRedemptions = normalizePositiveInteger(redeemable.maxRedemptions, "input.redeemable.maxRedemptions");
    }
  }

  let expiresAt: Date | null = null;
  if (redeemable.expiresAt !== undefined) {
    if (redeemable.expiresAt === null) {
      expiresAt = null;
    } else if (redeemable.expiresAt instanceof Date && Number.isFinite(redeemable.expiresAt.getTime())) {
      expiresAt = redeemable.expiresAt;
    } else {
      throw new CodeValidationError("`input.redeemable.expiresAt` must be a valid Date or null.");
    }
  }

  return {
    enable,
    maxRedemptions,
    expiresAt,
  };
}

function normalizeCodeFormatOptions(codeOptions: CodeFormatOptions | undefined): NormalizedCodeFormatOptions {
  if (!codeOptions) {
    return {
      prefix: "",
      suffix: "",
    };
  }

  const prefix = codeOptions.prefix ?? "";
  const suffix = codeOptions.suffix ?? "";

  if (typeof prefix !== "string") {
    throw new CodeValidationError("`input.codeOptions.prefix` must be a string.");
  }

  if (typeof suffix !== "string") {
    throw new CodeValidationError("`input.codeOptions.suffix` must be a string.");
  }

  if (codeOptions.body !== undefined && typeof codeOptions.body !== "string") {
    throw new CodeValidationError("`input.codeOptions.body` must be a string when provided.");
  }

  return {
    prefix,
    body: codeOptions.body,
    suffix,
  };
}

function normalizePositiveInteger(value: number, fieldPath: string): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new CodeValidationError(`\`${fieldPath}\` must be a positive integer.`);
  }

  return value;
}

function normalizeNonEmptyString(value: string, fieldPath: string): string {
  if (typeof value !== "string") {
    throw new CodeValidationError(`\`${fieldPath}\` must be a string.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new CodeValidationError(`\`${fieldPath}\` must be a non-empty string.`);
  }

  return normalized;
}

function normalizeOptionalNonEmptyString(value: string | undefined, fieldPath: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return normalizeNonEmptyString(value, fieldPath);
}
