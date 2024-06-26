import { useState, ChangeEvent, FormEvent } from "react";
import { Todo as ITodo } from "./todoList";

export interface Add {
  content: string;
  priority: number;
  limit: string;
}

// submitAddTodo: (e: FormEvent<HTMLFormElement>) => void;
// inputContent(e: FormEvent<HTMLInputElement>): void;
// inputPriority(e: FormEvent<HTMLInputElement>): void;
// inputLimit(e: FormEvent<HTMLInputElement>): void;

const useAdd = (addTodo: (Todo: ITodo) => void) => {
  const [add, setAdd] = useState<Add>({
    content: "",
    priority: 0,
    limit: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  });

  const submitAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      content: add.content,
      priority: add.priority,
      isComplete: false,
      createdAt: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      limit: add.limit,
    });
  };
  const inputContent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAdd((item: Add) => {
      item.content = e.target.value;
      return { ...item };
    });
  };
  const inputPriority = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAdd((item: Add) => {
      item.priority = Number(e.target.value);
      return { ...item };
    });
  };
  const inputLimit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAdd((item: Add) => {
      item.limit = e.target.value;
      return { ...item };
    });
  };
  return { add, submitAddTodo, inputContent, inputPriority, inputLimit };
};

export default useAdd;
