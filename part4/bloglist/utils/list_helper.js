const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((s, i) => i + s, 0);

const favoriteBlog = (blogs) =>
  blogs.find((blog) => blog.likes === Math.max(...blogs.map((b) => b.likes))) ||
  null;

const groupBy = (arr, prop, getter) =>
  arr.reduce(
    (props, item) => ({
      ...props,
      [item[prop]]: (props[item[prop]] || 0) + getter(item),
    }),
    {}
  );

const topEntry = (obj, keyLabel, valueLabel) =>
  Object.entries(obj).reduce(
    (max, [key, value]) =>
      max && max[valueLabel] >= value
        ? max
        : { [keyLabel]: key, [valueLabel]: value },
    null
  );

const mostBlogs = (blogs) =>
  topEntry(
    groupBy(blogs, "author", () => 1),
    "author",
    "blogs"
  );

const mostLikes = (blogs) =>
  topEntry(
    groupBy(blogs, "author", (blog) => blog.likes),
    "author",
    "likes"
  );

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
