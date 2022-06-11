const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const getToken = async () => {
  const user = await User.findOne({}, {});
  return jwt.sign({ id: user._id.toString() }, config.JWT_SECRET);
};

module.exports = { getToken };
