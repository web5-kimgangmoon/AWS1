import { FC } from "react";
import Comp from "./Comp";
import useTodoList from "../../hooks/todoList";

const Todo: FC = () => {
  const { list, addTodo, removeTodo, completeTodo } = { ...useTodoList() };
  return (
    <Comp
      list={list}
      addTodo={addTodo}
      removeTodo={removeTodo}
      completeTodo={completeTodo}
    />
  );
};

export default Todo;
