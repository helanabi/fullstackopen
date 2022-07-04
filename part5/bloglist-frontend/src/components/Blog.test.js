import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Render title and author but not url nor likes", async () => {
  const blog = {
    title: "Test blog",
    author: "Unknown",
    url: "https://www.example.com",
    likes: 3,
  };

  render(
    <Blog initialBlog={blog} removable={false} handleRemove={() => null} />
  );

  screen.getByText("Test blog", { exact: false });
  screen.getByText("unknown", { exact: false });

  expect(screen.queryByText("https://www.example.com")).toBeNull();
  expect(screen.queryByText("likes")).toBeNull();
});
