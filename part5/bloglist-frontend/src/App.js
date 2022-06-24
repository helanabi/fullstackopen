import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const showNotif = (msg, type = "success", ms = 5000) => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), ms);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = Object.fromEntries(
      ["username", "password"].map((attr) => [
        attr,
        event.target.elements[attr].value,
      ])
    );
    try {
      const loggedUser = await loginService.login(credentials);
      setUser(loggedUser);
      window.localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (err) {
      showNotif(err.response.data.error, "error");
    }
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

    try {
      setBlogs(blogs.concat(await blogService.create(newBlog, user.token)));

      controls.forEach((control) => {
        control.value = "";
      });

      showNotif(`Blog '${newBlog.title}' by ${newBlog.author} added`);

      blogFormRef.current.toggleVisibility();
    } catch (err) {
      showNotif("An error occured while adding new blog", "error");
    }
  };

  return (
    <>
      {notif && <Message notif={notif} />}
      {user ? (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in <button onClick={logout}>Log out</button>
          </p>

          <Togglable label="create new blog" ref={blogFormRef}>
            <BlogForm handleSubmit={createBlog} />
          </Togglable>

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
      )}
    </>
  );
};

export default App;
