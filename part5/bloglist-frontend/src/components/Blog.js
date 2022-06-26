import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ initialBlog }) => {
  const [expand, setExpand] = useState(false);
  const [blog, setBlog] = useState(initialBlog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "1px solid",
    marginBottom: 5,
  };

  const handleLike = async () => {
    setBlog(
      await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    );
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setExpand(!expand)}>
        {expand ? "hide" : "show"}
      </button>
      {expand && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
