const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  mongoose.Schema(
    {
      username: {
        type: String,
        minLength: [3, "username must be at least 3 characters long"],
        required: [true, "username is required"],
        unique: true,
      },
      name: String,
      passwordHash: {
        type: String,
        required: true,
      },
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
