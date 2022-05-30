const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
