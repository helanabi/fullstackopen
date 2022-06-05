const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

describe("Invalid users are not created", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("username is required", async () => {
    const result = await api
      .post("/api/users")
      .send({
        // username is missing
        name: "Foo Bar",
        password: "secretpwd",
      })
      .expect(400);

    expect(result.body.error).toContain("username is required");
  });

  test("password is required", async () => {
    const result = await api
      .post("/api/users")
      .send({
        username: "foobar",
        name: "Foo Bar",
        // password is missing
      })
      .expect(400);

    expect(result.body.error).toContain("password is required");
  });

  test("username must be at least 3 characters long", async () => {
    const result = await api
      .post("/api/users")
      .send({
        username: "ab",
        name: "Foo Bar",
        password: "secretpwd",
      })
      .expect(400);

    expect(result.body.error).toContain(
      "username must be at least 3 characters long"
    );
  });

  test("password must be at least 3 characters long", async () => {
    const result = await api
      .post("/api/users")
      .send({
        username: "foobar",
        name: "Foo Bar",
        password: "x",
      })
      .expect(400);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );
  });

  test("username must be unique", async () => {
    await User.deleteMany({ username: "foobar" });

    const newUser = await new User({
      username: "foobar",
      passwordHash: "hashedsecretpwd",
    }).save();

    const result = await api
      .post("/api/users")
      .send({
        username: "foobar", // same username
        name: "Foo Bar",
        password: "secretpwd",
      })
      .expect(400);

    expect(result.body.error).toContain("username must be unique");

    await User.findByIdAndDelete(newUser._id); // Clean up db
  });

  test("No user was created", async () => {
    console.log(await User.find({}));
    const usersCount = await User.countDocuments();
    expect(usersCount).toBe(0);
  });
});
