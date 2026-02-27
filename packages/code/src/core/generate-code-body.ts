import { randomBytes } from "node:crypto";
import type { GenerateCodeBodyOptions } from "../types";
import { normalizeGenerateCodeBodyOptions } from "./validators";

export async function generateCodeBody(options: GenerateCodeBodyOptions = {}): Promise<string> {
  const normalized = normalizeGenerateCodeBodyOptions(options);
  return createRandomString(normalized.length, normalized.charset);
}

function createRandomString(length: number, charset: string): string {
  const charsetSize = charset.length;
  const maxUnbiasedValue = Math.floor(256 / charsetSize) * charsetSize;

  let output = "";
  while (output.length < length) {
    const randomChunk = randomBytes(Math.max(length * 2, 32));

    for (const byte of randomChunk) {
      if (byte >= maxUnbiasedValue) {
        continue;
      }

      output += charset[byte % charsetSize];
      if (output.length === length) {
        break;
      }
    }
  }

  return output;
}