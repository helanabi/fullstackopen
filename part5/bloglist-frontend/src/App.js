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
    window.localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return user ? (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logout}>Log out</button>
      </p>
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
