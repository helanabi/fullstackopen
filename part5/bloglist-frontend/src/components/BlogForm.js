const BlogForm = ({ createBlog }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const controls = ["title", "author", "url"].map(
      (name) => event.target.elements[name]
    );

    const newBlog = Object.fromEntries(
      controls.map((control) => [control.name, control.value])
    );

    if (await createBlog(newBlog)) {
      controls.forEach((control) => {
        control.value = "";
      });
    }
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />

        <label>
          Author:
          <input type="text" name="author" />
        </label>
        <br />

        <label>
          URL:
          <input type="url" name="url" />
        </label>
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
