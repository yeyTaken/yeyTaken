const { Code, generateCodeBody } = require("../dist/index.cjs");
const { mongodbAdapter } = require("../dist/adapters/mongodb.cjs");
const { MongoClient } = require("mongodb");

require("dotenv/config");

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("db-name");

const license = Code({
  database: mongodbAdapter(db, { client }),
  dbName: "license"
});

// const license = Code();

(async () => {
  try {

    // const generateId = `license_${new Date(Date.now()).getDate()}.${new Date(Date.now()).getMonth()}.${new Date(Date.now()).getFullYear()}`;

    const id = await license.generate({
      // id: generateId,
      type: "license",
      value: {
        tier: 1,
      },
      codeOptions: {
        prefix: "tst_",
        body: await generateCodeBody({
          length: 20,
          charset: "abcdefghijklmnopqrstuvwxyz123567890",
        }),
        // suffix: `_${new Date(Date.now()).getTime()}`,
      },
    });

    console.log({
      codeID: id,
      content: await license.view(id),
      contentError: (await license.view("ErrorCode")),
      redeem: (await license.redeem(id)).check,
      redeemError: (await license.redeem("ErrorCode")).check,
    });
  } finally {
    await license.close();
    await client.close();
  }
})();
