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
