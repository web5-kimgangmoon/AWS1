import { FC, useCallback, useMemo, useState } from "react";
import Comp from "./Comp";
import { Todo } from "../../hooks/todoList";
import { useLocation } from "react-router-dom";
export interface IProps {
  todo: Todo;
  idx: number;
  removeTodo: (todo: Todo) => void;
  completeTodo: (todo: Todo) => void;
}

const Item: FC<IProps> = ({ todo, idx, removeTodo, completeTodo }) => {
  const createdAt = useMemo(
    () => todo.createdAt.slice(2).replace(/-/g, ""),
    []
  );
  const limit = useMemo(() => todo.limit + "까지", []);
  //   const { list, addTodo, removeTodo } = { ...useTodoList() };
  return (
    <Comp
      todo={{ ...todo, createdAt, limit }}
      removeTodo={() => removeTodo(todo)}
      completeTodo={() => completeTodo(todo)}
      idx={idx}
    />
  );
};

export default Item;
