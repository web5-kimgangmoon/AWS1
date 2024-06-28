import { FC } from "react";
import { Todo } from "../../../hooks/todoList";

export interface IProps {
  todo: Todo;
  idx: number;
  removeTodo: () => void;
  completeTodo: () => void;
}

const Item: FC<IProps> = ({ todo, idx, removeTodo, completeTodo }) => {
  // const isComplete: string = useMemo(
  //   () => (item.getIsComplete() ? "완료" : "진행중"),
  //   [item.getIsComplete()]
  // );
  return (
    <div className="flex justify-between items-center gap-2 p-1 border-b border-dashed border-black">
      <div>{todo.priority}</div>
      <div className="flex-1">{todo.content}</div>
      <div>{todo.createdAt}</div>
      <div>{todo.limit}</div>
      <div>
        <label
          htmlFor={`item=${idx}`}
          className="border 
          border-gray-400 
          has-[:checked]:bg-yellow-300 
          p-1 
          px-2 
          rounded 
          has-[:checked]:text-red-700 
          select-none"
        >
          {todo.isComplete ? "완료" : "진행중"}
          <input
            id={`item=${idx}`}
            className="hidden"
            type="checkbox"
            checked={todo.isComplete}
            onChange={completeTodo}
          />
        </label>
      </div>
      <button
        className="border border-gray-400 rounded bg-gray-200 p-1 px-2 select-none"
        type="submit"
        onClick={removeTodo}
      >
        삭제
      </button>
    </div>
  );
};

export default Item;
