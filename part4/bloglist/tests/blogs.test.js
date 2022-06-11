const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const testList = require("./test-list");
const helpers = require("./helpers");
const blog = require("../models/blog");

const api = supertest(app);

afterAll(() => mongoose.connection.close());

beforeAll(async () => {
  await User.deleteMany({});
  await new User({
    username: "testuser",
    name: "Test User",
    passwordHash: await bcrypt.hash("testuserpassword", 10),
  }).save();
});

beforeEach(async () => {
  const user = await User.findOne({}, {});
  await Blog.deleteMany({});
  await Blog.insertMany(testList.map((blog) => ({ ...blog, user: user._id })));
});

test("Fetch all blogs", async () => {
  const blogsFromDB = await Blog.find({});

  const blogsFromApi = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogsFromApi.body).toHaveLength(blogsFromDB.length);
});

test("Blog posts have an 'id' property", async () => {
  const blogs = await api.get("/api/blogs").expect(200);
  expect(blogs.body[0].id).toBeDefined();
});

test("Create a new blog post", async () => {
  const blogsBefore = (await api.get("/api/blogs")).body;
  const title = "An example blog post";
  const token = await helpers.getToken();

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send({
      title,
      author: "No One",
      url: "https://www.example.com",
      likes: 0,
    })
    .expect(201);

  const blogsAfter = (await api.get("/api/blogs")).body;
  expect(blogsAfter).toHaveLength(blogsBefore.length + 1);
  expect(blogsAfter.map((b) => b.title)).toContain(title);
});

test("'likes' property defaults to 0", async () => {
  const token = await helpers.getToken();

  const blog = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send({
      title: "An example blog post",
      author: "No One",
      url: "https://www.example.com",
    })
    .expect(201);

  expect(blog.body.likes).toBe(0);
});

test("Respond with 400 to blogs missing title/url", async () => {
  const token = await helpers.getToken();

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send({
      author: "No One",
      likes: 0,
    })
    .expect(400);
});

test("Delete a blog post", async () => {
  const blogsBefore = await api.get("/api/blogs");
  const blogToDelete = blogsBefore.body[0];
  const token = await helpers.getToken();

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `bearer ${token}`)
    .expect(204);

  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body).toHaveLength(blogsBefore.body.length - 1);
  expect(blogsAfter.body.map((b) => b.title)).not.toContain(blogToDelete.title);
});

test("Increment a blog's number of likes", async () => {
  const blogToUpdate = (await Blog.findOne()).toJSON();
  const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id.toString()}`)
    .send(newBlog)
    .expect(200);

  expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1);
});

test("Fail to add blog if token is missing", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "Test blog",
      author: "Unknown",
      url: "http://example.com",
    })
    .expect(401);
});
