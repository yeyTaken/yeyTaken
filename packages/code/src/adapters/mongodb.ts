import {
  mongodbAdapter as createMongoAdapter,
  type MongoAdapterOptions,
  type MongoClientLike,
  type MongoCollectionLike,
  type MongoDbLike,
} from "../storage/mongodb";
import type { CodeStorageAdapter } from "../storage/adapter";

/**
 * MongoDB adapter factory for `@yeytaken/code`.
 *
 * @example
 * import { Code } from "@yeytaken/code";
 * import { mongodbAdapter } from "@yeytaken/code/adapters/mongodb";
 *
 * const code = Code({
 *   database: mongodbAdapter(db, { client }),
 * });
 *
 * @example
 * // custom collection name
 * const code = Code({
 *   database: mongodbAdapter(db),
 *   dbName: "license_codes",
 * });
 */
export function mongodbAdapter(db: MongoDbLike, options: MongoAdapterOptions = {}): CodeStorageAdapter {
  return createMongoAdapter(db, options);
}

export type { MongoAdapterOptions, MongoClientLike, MongoCollectionLike, MongoDbLike };
