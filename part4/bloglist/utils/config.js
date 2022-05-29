require("dotenv").config();

const { env } = process;

if (env.NODE_ENV === "testing") env.MONGODB_URI = env.MONGODB_TEST_URI;

module.exports = Object.fromEntries(
  ["PORT", "MONGODB_URI"].map((v) => [v, process.env[v]])
);
