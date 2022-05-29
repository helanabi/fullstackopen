const listHelper = require("../utils/list_helper");
const testList = require("./test-list");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("totalLikes", () => {
  test("of empty list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("of singleton blog list", () => {
    const blogList = [testList[0]];
    expect(listHelper.totalLikes(blogList)).toBe(7);
  });

  test("of multi-blog list", () => {
    expect(listHelper.totalLikes(testList)).toBe(36);
  });
});

describe("favoriteBlog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("of singletond list", () => {
    expect(listHelper.favoriteBlog([testList[0]])).toBe(testList[0]);
  });

  test("of multi-blog list", () => {
    expect(listHelper.favoriteBlog(testList)).toBe(testList[2]);
  });
});

describe("mostBlogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("of signleton list", () => {
    expect(listHelper.mostBlogs([testList[0]])).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });

  test("of multi-blog list", () => {
    expect(listHelper.mostBlogs(testList)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("mostLikes", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("of signleton list", () => {
    expect(listHelper.mostLikes([testList[0]])).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("of multi-blog list", () => {
    expect(listHelper.mostLikes(testList)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
