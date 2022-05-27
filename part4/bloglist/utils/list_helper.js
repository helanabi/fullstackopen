const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((s, i) => i + s, 0);

const favoriteBlog = (blogs) =>
  blogs.find((blog) => blog.likes === Math.max(...blogs.map((b) => b.likes))) ||
  null;

module.exports = { dummy, totalLikes, favoriteBlog };
