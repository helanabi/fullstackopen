import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = Object.fromEntries(
      ["username", "password"].map((attr) => [
        attr,
        event.target.elements[attr].value,
      ])
    );

    const loggedUser = await loginService.login(credentials);
    setUser(loggedUser);
    blogService.setToken(loggedUser.token);
    window.localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const createBlog = async (event) => {
    event.preventDefault();

    const controls = ["title", "author", "url"].map(
      (name) => event.target.elements[name]
    );

    const newBlog = Object.fromEntries(
      controls.map((control) => [control.name, control.value])
    );

    setBlogs(blogs.concat(await blogService.create(newBlog)));

    controls.forEach((control) => {
      control.value = "";
    });
  };

  return user ? (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logout}>Log out</button>
      </p>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
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
      <h2>Created blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  ) : (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default App;
