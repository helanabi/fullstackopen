const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password)
    return response.status(400).json({
      error: "username or password is missing",
    });

  const user = await User.findOne({ username });

  if (!user)
    return response.status(400).json({
      error: `user '${username}' does not exist`,
    });

  if (await bcrypt.compare(password, user.passwordHash))
    response.json({
      token: jwt.sign(
        {
          id: user._id,
        },
        config.JWT_SECRET
      ),
    });
  else
    response.status(401).json({
      error: "password is incorrect",
    });
});

module.exports = loginRouter;
