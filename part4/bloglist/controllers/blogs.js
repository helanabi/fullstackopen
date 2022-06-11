const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();

blogRouter.get("/", async (_, response) => {
  response.json(await Blog.find({}).populate("user", { blogs: 0 }));
});

blogRouter.post("/", async (request, response) => {
  const user = await User.findById(request.user);

  const blog = await new Blog({
    ...request.body,
    user: user._id,
  }).save();

  user.blogs.push(blog._id);
  await user.save();

  response.status(201).json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(404).end();

  if (request.user !== blog.user.toString())
    return response.status(401).json({
      error: "insufficient privileges",
    });

  await blog.remove();
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
