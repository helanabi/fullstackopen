import { useState } from "react";

const Blog = ({ blog }) => {
  const [expand, setExpand] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "1px solid",
    marginBottom: 5,
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
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
