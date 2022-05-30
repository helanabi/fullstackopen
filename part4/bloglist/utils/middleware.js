const logger = require("./logger");

const errorHandler = (err, _req, res, _next) => {
  logger.error(`${err.name}: ${err.message}`);

  if (err.name === "ValidationError") return res.status(400).end();
  else return res.status(500).end();
};

module.exports = { errorHandler };
