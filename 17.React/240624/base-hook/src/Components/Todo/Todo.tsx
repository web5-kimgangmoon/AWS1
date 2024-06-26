import { FC, FormEvent } from "react";
import List from "./List";
import { Todo as TodoItem } from "../../lib/Todo";
import { IProps as ITodoProps } from "../../Containers/Todo/Todo";
import Add from "../../Containers/Todo/add";

export interface IProps extends ITodoProps {}

const Todo: FC<IProps> = ({
  list,
  complete,
  add,
  addItem,
  deleteItem,
  removeItem,
}) => {
  return (
    <div>
      <List
        list={list}
        complete={complete}
        deleteItem={deleteItem}
        removeItem={removeItem}
      />
      <Add addItem={addItem} />
    </div>
  );
};

export default Todo;
