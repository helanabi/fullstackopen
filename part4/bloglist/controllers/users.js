const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.get("/", async (_request, response) => {
  response.json(await User.find({}));
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  response.status(201).json(await user.save());
});

module.exports = userRouter;
