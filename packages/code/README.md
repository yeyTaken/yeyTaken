# @yeytaken/code

Code generation and redemption library for Node.js with MongoDB adapter.

## Installation

```bash
pnpm add @yeytaken/code mongodb
```

## Basic usage (MongoDB)

```ts
import { Code } from "@yeytaken/code";
import { mongodbAdapter } from "@yeytaken/code/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("my-db");
const code = Code({
  database: mongodbAdapter(db, { client }),
  dbName: "my_custom_codes",
});

const codeId = await code.generate({
  type: "promotion",
  value: { tier: 1 },
});

await code.close();
await client.close();
```

## Custom storage name (`dbName`)

```ts
import { Code } from "@yeytaken/code";
import { mongodbAdapter } from "@yeytaken/code/adapters/mongodb";

const code = Code({
  database: mongodbAdapter(db, { client }),
  dbName: "my_custom_codes",
});
```

- MongoDB: `dbName` = collection name (when using `mongodbAdapter`)

## MongoDB adapter

```ts
import { MongoClient } from "mongodb";
import { Code } from "@yeytaken/code";
import { mongodbAdapter } from "@yeytaken/code/adapters/mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("my-db");
const code = Code({
  database: mongodbAdapter(db, { client }),
});

await code.close();
await client.close();
```

## API summary

- `Code(options)`
- `generateCodeBody(options?)`
- `CodeInstance.generate(input)`
- `CodeInstance.view(code)`
- `CodeInstance.redeem(code)`
- `CodeInstance.close()`

## License

MIT
