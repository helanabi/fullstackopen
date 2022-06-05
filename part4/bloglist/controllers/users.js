const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.get("/", async (_request, response) => {
  response.json(await User.find({}).populate("blogs", { user: 0, likes: 0 }));
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) throw Error("User validation failed: password is required");

  if (password.length < 3)
    throw Error(
      "User validation failed: password must be at least 3 characters long"
    );

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash });
  response.status(201).json(await user.save());
});

module.exports = userRouter;
