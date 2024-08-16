import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TodoList from "../components/TodoList";
import instance from "../lib/axios";

const mock = new MockAdapter(instance);
const client = new QueryClient();
const data = [{ id: 1, title: "test todo list", isCompleted: false }];

describe("Test Todo List", () => {
  beforeEach(() => {
    mock.onGet("/todo").reply(200, data);
    render(
      <QueryClientProvider client={client}>
        <TodoList />
      </QueryClientProvider>
    );
  });
  test("render Todo List", async () => {
    // render(<TodoList />);
    const titleElem = screen.getByText(/now Loading/i);
    expect(titleElem).toBeInTheDocument();
    expect(titleElem.tagName).toBe("DIV");

    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
    expect(screen.getByText(/test todo list/i)).toBeInTheDocument();
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

  test("Add New Todo", async () => {
    const inputElem: HTMLInputElement = screen.getByRole("textbox");
    const buttonElem: HTMLButtonElement = screen.getByRole("button", {
      name: "Add Todo",
    });
    const sendAdd = (text: string) => {
      mock
        .onPost("/todo", { title: text })
        .reply(201, { title: text, id: data.length, isCompleted: false });
      data.push({ title: text, id: data.length, isCompleted: false });
      fireEvent.click(buttonElem);
    };
    fireEvent.change(inputElem, { target: { value: "tester" } });
    sendAdd(inputElem.value);
    fireEvent.change(inputElem, { target: { value: "tester2" } });
    sendAdd(inputElem.value);
    await waitFor(() => {
      const listItemElem = screen.getByText("tester");
      expect(listItemElem).toBeInTheDocument();
      expect(listItemElem.tagName).toBe("DIV");
      const listItemElem2 = screen.getByText("tester2");
      expect(listItemElem2).toBeInTheDocument();
      expect(listItemElem2.tagName).toBe("DIV");
    });
  });
  test("patch todo", async () => {
    let getData = [
      { id: 1, title: "test todo list", isCompleted: false },
      { id: 2, title: "tester", isCompleted: false },
      { id: 3, title: "tester2", isCompleted: false },
    ];
    mock.onGet("/todo").reply(200, getData);

    const listeItemElems = await screen.findAllByRole("button", {
      name: "진행중",
    });
    expect(listeItemElems[0]).toBeInTheDocument();

    const data1 = { id: 1, title: "test todo list", isCompleted: true };
    mock.onPatch("/todo", data1).reply(200, data1);

    getData = [
      { id: 1, title: "test todo list", isCompleted: true },
      { id: 2, title: "tester", isCompleted: false },
      { id: 3, title: "tester2", isCompleted: false },
    ];
    mock.onGet("/todo").reply(200, getData);

    fireEvent.click(listeItemElems[0]);

    await waitFor(async () => {
      const listeItemElems = await screen.findAllByRole("button", {
        name: "완료",
      });
      expect(listeItemElems[0]).toBeInTheDocument();
    });
  });
  test("delete todo", async () => {
    let getData = [
      { id: 1, title: "test todo list", isCompleted: false },
      { id: 2, title: "tester", isCompleted: false },
      { id: 3, title: "tester2", isCompleted: false },
    ];
    mock.onGet("/todo").reply(200, getData);
    const listeItemElems = await screen.findAllByRole("button", {
      name: "삭제",
    });
    expect(listeItemElems[0]).toBeInTheDocument();

    const data1 = { id: 1, title: "test todo list", isCompleted: true };
    mock.onDelete("/todo/1").reply(200, data1);

    getData = [
      { id: 2, title: "tester", isCompleted: false },
      { id: 3, title: "tester2", isCompleted: false },
    ];
    mock.onGet("/todo").reply(200, getData);

    fireEvent.click(listeItemElems[0]);
    await waitFor(async () => {
      const liCount = (await screen.findAllByRole("listitem")).length;
      expect(liCount).toBe(2);
    });
  });
});
