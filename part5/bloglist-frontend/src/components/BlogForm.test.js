import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("Call handler with form data upon submission", async () => {
  const handler = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<BlogForm createBlog={handler} />);

  const titleInput = container.querySelector('input[name="title"]');
  const authorInput = container.querySelector('input[name="author"]');
  const urlInput = container.querySelector('input[name="url"]');
  const saveButton = screen.getByRole("button");

  await user.type(titleInput, "Test blog");
  await user.type(authorInput, "Unknown");
  await user.type(urlInput, "https://www.example.com");
  await user.click(saveButton);

  expect(handler.mock.calls[0][0]).toEqual({
    title: "Test blog",
    author: "Unknown",
    url: "https://www.example.com",
  });
});
