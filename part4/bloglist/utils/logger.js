const config = require("./config");

const testing = config.NODE_ENV === "testing";

const info = (...params) => testing || console.log(...params);
const error = (...params) => testing || console.error(...params);

module.exports = { info, error };
