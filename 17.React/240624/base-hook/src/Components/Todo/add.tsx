import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Todo as TodoItem } from "../../lib/Todo";

export interface IProps {
  add(content: string, priority: number, limit: string): void;
}
interface IState {
  content: string;
  priority: number;
  limit: string;
}

const Add: FC<IProps> = ({ add }) => {
  //나중에 나눠주자
  const [state, setState] = useState<IState>({
    content: "",
    priority: -1,
    limit: "",
  });

  return (
    <form
      className="flex items-center gap-2 p-1 border-b-4 border-black border-double"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        add(state.content, state.priority, state.limit);
      }}
    >
      {/* <div className="flex p-1 border-b border-4 border-black border-double"> */}
      <label htmlFor="todo-content">Todo :</label>
      <input
        className="flex-1 border rounded border-gray-500"
        type="text"
        id="todo-content"
        value={state.content}
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setState({
            content: value,
            priority: state.priority,
            limit: state.limit,
          });
        }}
      />
      <input
        className="flex-1 border rounded border-gray-500"
        type="number"
        id="todo-priority"
        value={state.priority}
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setState((state: IState) => ({
            content: state.content,
            priority: Number(value),
            limit: state.limit,
          }));
        }}
      />
      <input
        className="flex-1 border rounded border-gray-500"
        type="date"
        id="todo-limit"
        value={state.limit}
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setState((state: IState) => ({
            content: state.content,
            priority: state.priority,
            limit: value,
          }));
        }}
        min={new Date().getDate()}
        itemScope={true}
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
