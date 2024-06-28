import { FC, FormEvent } from "react";
import { Add as inputSet } from "../../../hooks/add";

export interface IProps {
  todo: inputSet;
  submitAddTodo: (e: FormEvent<HTMLFormElement>) => void;
  inputContent(e: FormEvent<HTMLInputElement>): void;
  inputPriority(e: FormEvent<HTMLInputElement>): void;
  inputLimit(e: FormEvent<HTMLInputElement>): void;
}

const Add: FC<IProps> = ({
  todo,
  submitAddTodo,
  inputContent,
  inputPriority,
  inputLimit,
}) => {
  return (
    <form
      className="flex items-center gap-2 p-1 border-b-4 border-black border-double"
      onSubmit={(e) => submitAddTodo(e)}
    >
      {/* <div className="flex p-1 border-b border-4 border-black border-double"> */}
      <label htmlFor="todo-content">Todo :</label>
      <input
        className="flex-1 border rounded border-gray-500"
        type="text"
        id="todo-content"
        value={todo.content}
        onInput={inputContent}
      />
      <input
        className="flex-1 border rounded border-gray-500"
        type="number"
        id="todo-priority"
        value={todo.priority}
        onInput={(e) => inputPriority(e)}
      />
      <input
        className="flex-1 border rounded border-gray-500"
        type="date"
        id="todo-limit"
        value={todo.limit}
        // todo.limit.split("-").reduce((a, b, idx) => {
        //   a = idx == 0 ? a + b + "년" : a;
        //   a = idx == 1 ? a + b + "월" : a;
        //   a = idx == 2 ? a + b + "일" : a;
        //   return a;
        // }, "")
        min={todo.limit}
        onInput={(e) => inputLimit(e)}
      />
      <button
        className={[
          "border",
          "border-gray-400",
          "rounded",
          "p-1",
          "px-5",
          "select-none", // user-select: none;
        ].join(" ")}
      >
        추가
      </button>
    </form>
  );
};

export default Add;
