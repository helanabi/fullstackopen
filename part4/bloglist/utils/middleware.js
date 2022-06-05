const logger = require("./logger");

const errorHandler = (err, _req, res, next) => {
  logger.error(`${err.name}: ${err.message}`);

  if (
    err.name === "ValidationError" ||
    err.message.startsWith("User validation failed")
  )
    return res.status(400).json({
      error: err.message,
    });
  else if (err.name === "MongoServerError" && err.message.startsWith("E11000"))
    return res.status(400).json({
      error: "username must be unique",
    });

  next(err);
};

module.exports = { errorHandler };
