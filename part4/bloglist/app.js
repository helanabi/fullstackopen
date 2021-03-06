const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");

mongoose.connect(config.MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (config.NODE_ENV === "testing") app.use("/api/testing", testingRouter);

app.use(middleware.errorHandler);

module.exports = app;
