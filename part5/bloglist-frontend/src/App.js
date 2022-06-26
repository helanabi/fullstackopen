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

  const createBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog, user.token);

      returnedBlog.user = {
        id: returnedBlog.user,
        name: user.name,
        username: user.username,
      };

      setBlogs(blogs.concat(returnedBlog));
      showNotif(`Blog '${newBlog.title}' by ${newBlog.author} added`);
      blogFormRef.current.toggleVisibility();
      return true;
    } catch (err) {
      showNotif("An error occured while adding new blog", "error");
    }
  };

  const handleRemove = async (blogToDelete) => {
    if (window.confirm(`Remove blog '${blogToDelete.title}'?`)) {
      await blogService.remove(blogToDelete.id, user.token);
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
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
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <h2>Created blogs</h2>
          {blogs
            .sort((b1, b2) => b1.likes - b2.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                initialBlog={blog}
                removable={blog.user.username === user.username}
                handleRemove={handleRemove}
              />
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
