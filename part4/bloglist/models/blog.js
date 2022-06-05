const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
