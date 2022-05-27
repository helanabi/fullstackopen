const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((s, i) => i + s, 0);

module.exports = { dummy, totalLikes };
