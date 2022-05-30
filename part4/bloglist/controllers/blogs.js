const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (_, response) => {
  response.json(await Blog.find({}));
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  response.status(201).json(await blog.save());
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
