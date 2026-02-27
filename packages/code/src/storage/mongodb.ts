import { CodeStorageError, CodeValidationError } from "../errors";
import {
  CODE_STORAGE_ADAPTER_BRAND,
  CODE_STORAGE_ADAPTER_SET_DB_NAME,
  type CodeStorageAdapter,
  type StorageCreateResult,
  type StorageRedeemFailureReason,
  type StorageRedeemResult,
  type StoredCodeRecord,
} from "./adapter";

interface MongoStoredDocument {
  _id: string;
  type?: string;
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

export interface MongoCollectionLike<TDocument extends object> {
  /**
   * Creates an index for the collection.
   */
  createIndex(index: Record<string, 1 | -1>, options?: Record<string, unknown>): Promise<unknown>;
  /**
   * Inserts a single document.
   */
  insertOne(document: TDocument): Promise<unknown>;
  /**
   * Reads one document by filter.
   */
  findOne(filter: Record<string, unknown>): Promise<TDocument | null>;
  /**
   * Atomically updates and returns a document.
   */
  findOneAndUpdate(
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<TDocument | { value?: TDocument | null } | null>;
}

export interface MongoDbLike {
  /**
   * Gets a collection by name.
   */
  collection<TDocument extends object>(name: string): MongoCollectionLike<TDocument>;
}

export interface MongoClientLike {
  /**
   * Closes the client connection.
   */
  close(): Promise<void>;
}

/**
 * Mongo adapter configuration.
 */
export interface MongoAdapterOptions {
  /**
   * Explicit collection name.
   * Has higher priority than `dbName`.
   */
  collectionName?: string;
  /**
   * Alias for collection name.
   * Useful for parity with `Code({ dbName })`.
   */
  dbName?: string;
  /**
   * Optional client instance used only when `closeClientOnClose` is `true`.
   */
  client?: MongoClientLike;
  /**
   * If `true`, `adapter.close()` will also close the provided `client`.
   *
   * @default false
   */
  closeClientOnClose?: boolean;
}

const DEFAULT_COLLECTION = "codes";

/**
 * Creates a MongoDB adapter compatible with `Code({ database })`.
 *
 * @example
 * const adapter = mongodbAdapter(db);
 *
 * @example
 * const adapter = mongodbAdapter(db, {
 *   collectionName: "license_codes",
 * });
 *
 * @example
 * // close external client when service closes
 * const adapter = mongodbAdapter(db, {
 *   client,
 *   closeClientOnClose: true,
 * });
 */
export function mongodbAdapter(db: MongoDbLike, options: MongoAdapterOptions = {}): CodeStorageAdapter {
  assertMongoDbLike(db);

  const collectionName = normalizeCollectionName(options.collectionName ?? options.dbName ?? DEFAULT_COLLECTION);
  const closeClientOnClose = options.closeClientOnClose ?? false;

  let initialized = false;
  let closed = false;
  let collection: MongoCollectionLike<MongoStoredDocument> | null = null;

  return {
    [CODE_STORAGE_ADAPTER_BRAND]: true,
    [CODE_STORAGE_ADAPTER_SET_DB_NAME]: (dbName: string): CodeStorageAdapter =>
      mongodbAdapter(db, {
        ...options,
        collectionName: dbName,
      }),
    name: "mongodb",

    async init(): Promise<void> {
      if (initialized) {
        return;
      }

      try {
        collection = db.collection<MongoStoredDocument>(collectionName);

        await collection.createIndex({ code: 1 }, { unique: true, name: "code_unique" });
        await collection.createIndex({ type: 1 }, { name: "type_lookup" });
        await collection.createIndex({ expiresAt: 1 }, { name: "expires_lookup" });

        initialized = true;
      } catch (error) {
        throw new CodeStorageError("Failed to initialize MongoDB adapter.", { cause: error });
      }
    },

    async create(record: StoredCodeRecord): Promise<StorageCreateResult> {
      const currentCollection = ensureCollection(collection);

      try {
        await currentCollection.insertOne({
          _id: record.id,
          type: record.type,
          code: record.code,
          value: normalizeStoredValue(record.value),
          redeemableEnable: record.redeemableEnable,
          maxRedemptions: record.maxRedemptions,
          expiresAt: record.expiresAt,
          redemptionCount: record.redemptionCount,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          lastRedeemedAt: record.lastRedeemedAt,
        });

        return { ok: true };
      } catch (error) {
        if (isMongoDuplicateKeyError(error)) {
          return {
            ok: false,
            reason: "conflict",
          };
        }

        throw new CodeStorageError("Failed to persist code in MongoDB adapter.", { cause: error });
      }
    },

    async findByCode(code: string): Promise<StoredCodeRecord | null> {
      const currentCollection = ensureCollection(collection);

      try {
        const document = await currentCollection.findOne({ code });
        return document ? mapDocumentToRecord(document) : null;
      } catch (error) {
        throw new CodeStorageError("Failed to query code from MongoDB adapter.", { cause: error });
      }
    },

    async redeem(code: string, nowIso: string): Promise<StorageRedeemResult> {
      const currentCollection = ensureCollection(collection);

      try {
        const filter: Record<string, unknown> = {
          code,
          redeemableEnable: true,
          $expr: {
            $and: [
              {
                $or: [{ $eq: ["$maxRedemptions", null] }, { $lt: ["$redemptionCount", "$maxRedemptions"] }],
              },
              {
                $or: [{ $eq: ["$expiresAt", null] }, { $gt: ["$expiresAt", nowIso] }],
              },
            ],
          },
        };

        const update: Record<string, unknown> = {
          $inc: { redemptionCount: 1 },
          $set: {
            updatedAt: nowIso,
            lastRedeemedAt: nowIso,
          },
        };

        const rawResult = await currentCollection.findOneAndUpdate(filter, update, {
          returnDocument: "after",
        });

        const updatedDocument = unwrapFindOneAndUpdate(rawResult);
        if (updatedDocument) {
          return {
            ok: true,
            record: mapDocumentToRecord(updatedDocument),
          };
        }

        const latestDocument = await currentCollection.findOne({ code });
        if (!latestDocument) {
          return {
            ok: false,
            reason: "not_found",
            record: null,
          };
        }

        const latestRecord = mapDocumentToRecord(latestDocument);
        return {
          ok: false,
          reason: resolveFailureReason(latestRecord, nowIso) ?? "max_redemptions_reached",
          record: latestRecord,
        };
      } catch (error) {
        throw new CodeStorageError("Failed to redeem code in MongoDB adapter.", { cause: error });
      }
    },

    async close(): Promise<void> {
      if (closed) {
        return;
      }

      closed = true;
      if (!closeClientOnClose || !options.client) {
        return;
      }

      try {
        await options.client.close();
      } catch (error) {
        throw new CodeStorageError("Failed to close MongoDB adapter.", { cause: error });
      }
    },
  };
}

function normalizeCollectionName(collectionName: string): string {
  const normalized = collectionName.trim();
  if (!normalized) {
    throw new CodeValidationError("MongoDB collection name must be a non-empty string.");
  }

  if (normalized.includes("\0")) {
    throw new CodeValidationError("MongoDB collection name cannot contain null characters.");
  }

  return normalized;
}

function unwrapFindOneAndUpdate(input: unknown): MongoStoredDocument | null {
  if (!input) {
    return null;
  }

  if (typeof input === "object" && "value" in input) {
    const candidate = (input as { value?: unknown }).value;
    return isMongoStoredDocument(candidate) ? candidate : null;
  }

  return isMongoStoredDocument(input) ? input : null;
}

function ensureCollection(
  collection: MongoCollectionLike<MongoStoredDocument> | null,
): MongoCollectionLike<MongoStoredDocument> {
  if (!collection) {
    throw new CodeStorageError("MongoDB adapter has not been initialized. Call `init()` first.");
  }

  return collection;
}

function mapDocumentToRecord(document: MongoStoredDocument): StoredCodeRecord {
  return {
    id: document._id,
    type: normalizeStoredType(document.type),
    code: document.code,
    value: document.value,
    redeemableEnable: document.redeemableEnable,
    maxRedemptions: document.maxRedemptions,
    expiresAt: document.expiresAt,
    redemptionCount: document.redemptionCount,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    lastRedeemedAt: document.lastRedeemedAt,
  };
}

function isMongoStoredDocument(value: unknown): value is MongoStoredDocument {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<MongoStoredDocument>;
  return (
    typeof candidate._id === "string" &&
    (candidate.type === undefined || typeof candidate.type === "string") &&
    typeof candidate.code === "string" &&
    "value" in candidate &&
    typeof candidate.redeemableEnable === "boolean" &&
    (candidate.maxRedemptions === null || typeof candidate.maxRedemptions === "number") &&
    (candidate.expiresAt === null || typeof candidate.expiresAt === "string") &&
    typeof candidate.redemptionCount === "number" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string" &&
    (candidate.lastRedeemedAt === null || typeof candidate.lastRedeemedAt === "string")
  );
}

function resolveFailureReason(record: StoredCodeRecord, nowIso: string): StorageRedeemFailureReason | null {
  if (!record.redeemableEnable) {
    return "disabled";
  }

  if (record.expiresAt !== null && record.expiresAt <= nowIso) {
    return "expired";
  }

  if (record.maxRedemptions !== null && record.redemptionCount >= record.maxRedemptions) {
    return "max_redemptions_reached";
  }

  return null;
}

function normalizeStoredValue(value: unknown): unknown {
  return value === undefined ? null : value;
}

function normalizeStoredType(type: string | undefined): string {
  if (typeof type !== "string") {
    return "default";
  }

  const normalized = type.trim();
  return normalized || "default";
}

function isMongoDuplicateKeyError(error: unknown): boolean {
  return !!error && typeof error === "object" && "code" in error && (error as { code?: number }).code === 11000;
}

function assertMongoDbLike(value: unknown): asserts value is MongoDbLike {
  if (!value || typeof value !== "object") {
    throw new CodeStorageError("Invalid MongoDB database instance provided.");
  }

  const candidate = value as Partial<MongoDbLike>;
  if (typeof candidate.collection !== "function") {
    throw new CodeStorageError("Invalid MongoDB database instance provided.");
  }
}
