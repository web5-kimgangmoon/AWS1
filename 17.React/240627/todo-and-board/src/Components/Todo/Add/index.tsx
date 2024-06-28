import { FC } from "react";
import Comp from "./Comp";
import { Todo } from "../../../hooks/todoList";
import useAdd from "../../../hooks/add";

export interface IProps {
  addTodo(todo: Todo): void;
}

const Add: FC<IProps> = ({ addTodo }) => {
  const { add, submitAddTodo, inputContent, inputPriority, inputLimit } = {
    ...useAdd(addTodo),
  };
  console.log("dsad");
  return (
    <Comp
      todo={add}
      submitAddTodo={submitAddTodo}
      inputContent={inputContent}
      inputPriority={inputPriority}
      inputLimit={inputLimit}
    />
  );
};

export default Add;
