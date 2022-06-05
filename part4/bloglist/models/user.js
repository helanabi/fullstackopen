const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  mongoose.Schema(
    {
      username: String,
      name: String,
      passwordHash: String,
    },
    {
      toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret) => {
          delete ret._id;
          delete ret.passwordHash;
        },
      },
    }
  )
);
