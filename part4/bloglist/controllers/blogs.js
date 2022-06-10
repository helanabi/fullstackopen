const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();

blogRouter.get("/", async (_, response) => {
  response.json(await Blog.find({}).populate("user", { blogs: 0 }));
});

blogRouter.post("/", async (request, response) => {
  const payload = jwt.verify(request.token, config.JWT_SECRET);
  const user = await User.findById(payload.id);

  const blog = await new Blog({
    ...request.body,
    user: user._id,
  }).save();

  user.blogs.push(blog._id);
  await user.save();

  response.status(201).json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  response.json(
    await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    })
  );
});

module.exports = blogRouter;
