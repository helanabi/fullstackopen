import { useState } from "react";

const Blog = ({ initialBlog, removable, handleRemove, update }) => {
  const [expand, setExpand] = useState(false);
  const [blog, setBlog] = useState(initialBlog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "1px solid",
    marginBottom: 5,
  };

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    await update(blog.id, {
      ...newBlog,
      user: blog.user.id,
    });

    setBlog(newBlog);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setExpand(!expand)}>
        {expand ? "hide" : "show"}
      </button>
      {expand && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {removable && (
            <div>
              <button onClick={() => handleRemove(blog)}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
