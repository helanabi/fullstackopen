const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
