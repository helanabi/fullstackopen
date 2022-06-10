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
  else if (err.name === "JsonWebTokenError")
    return res.status(401).json({
      error: `token error: ${err.message}`,
    });

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth) {
    const [scheme, token] = auth.split(" ");

    if (scheme.toLocaleLowerCase() !== "bearer")
      return res.status(401).json({
        error: "Invalid authentication scheme",
      });
    else req.token = token;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
