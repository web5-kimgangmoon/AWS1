import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("Test Todo List", () => {
  beforeEach(() => render(<TodoList />));
  test("render Todo List", () => {
    // render(<TodoList />);
    const titleElem = screen.getByText(/Todo List/i);
    expect(titleElem).toBeInTheDocument();
    expect(titleElem.tagName).toBe("H1");
  });
  test("include input Element", () => {
    // render(<TodoList />);
    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();
  });

  test("input text", () => {
    // render(<TodoList />);
    const inputElem: HTMLInputElement = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();
    fireEvent.change(inputElem, { target: { value: "input test" } });
    expect(inputElem.value).toEqual("input test");
  });

  test("Include Add Button", () => {
    const buttonElem: HTMLButtonElement = screen.getByRole("button", {
      name: "Add Todo",
    });
    expect(buttonElem).toBeInTheDocument();
  });

  test("Add New Todo", () => {
    const inputElem: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputElem, { target: { value: "input test" } });
    const buttonElem: HTMLButtonElement = screen.getByRole("button", {
      name: "Add Todo",
    });
    fireEvent.click(buttonElem);

    const listItemElem = screen.getByText("input test");
    expect(listItemElem).toBeInTheDocument();
    expect(listItemElem.tagName).toBe("LI");
    const listItemElem2 = screen.getByRole("listitem");
    expect(listItemElem2).toHaveTextContent("input test");
  });
});
