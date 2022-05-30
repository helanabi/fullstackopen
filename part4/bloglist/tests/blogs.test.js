const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const testList = require("./test-list");

const api = supertest(app);

afterAll(() => mongoose.connection.close());

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testList);
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

test("A new blog post can be created", async () => {
  const blogsBefore = (await api.get("/api/blogs")).body;
  const title = "An example blog post";

  await api
    .post("/api/blogs")
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
  const blog = await api
    .post("/api/blogs")
    .send({
      title: "An example blog post",
      author: "No One",
      url: "https://www.example.com",
    })
    .expect(201);

  expect(blog.body.likes).toBe(0);
});
