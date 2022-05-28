const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((s, i) => i + s, 0);

const favoriteBlog = (blogs) =>
  blogs.find((blog) => blog.likes === Math.max(...blogs.map((b) => b.likes))) ||
  null;

const mostBlogs = (blogs) => {
  const authors = blogs.reduce(
    (authors, blog) => ({
      ...authors,
      [blog.author]: (authors[blog.author] || 0) + 1,
    }),
    []
  );

  return Object.entries(authors).reduce(
    (max, [author, blogs]) =>
      max && max.blogs >= blogs ? max : { author, blogs },
    null
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
