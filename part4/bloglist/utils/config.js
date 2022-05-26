require("dotenv").config();

module.exports = Object.fromEntries(
  ["PORT", "MONGODB_URI"].map((v) => [v, process.env[v]])
);
