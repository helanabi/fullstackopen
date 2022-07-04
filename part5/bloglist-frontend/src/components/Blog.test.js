import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Test blog",
  author: "Unknown",
  url: "https://www.example.com",
  likes: 3,
  user: { name: "Some User" },
};

test("Render title and author but not url nor likes", () => {
  render(
    <Blog initialBlog={blog} removable={false} handleRemove={() => null} />
  );

  screen.getByText("Test blog", { exact: false });
  screen.getByText("unknown", { exact: false });

  expect(screen.queryByText("https://www.example.com")).toBeNull();
  expect(screen.queryByText("likes")).toBeNull();
});

test("Show url and likes when the button is clicked", async () => {
  render(
    <Blog initialBlog={blog} removable={false} handleRemove={() => null} />
  );

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  screen.getByText("https://www.example.com");
  screen.getByText("likes", { exact: false });
});

test("Call event handler twice, when like button is pressed twice", async () => {
  const handler = jest.fn();

  render(
    <Blog
      initialBlog={blog}
      removable={false}
      handleRemove={() => null}
      update={handler}
    />
  );

  const user = userEvent.setup();
  const showButton = screen.getByText("show");

  await user.click(showButton);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(handler.mock.calls).toHaveLength(2);
});
