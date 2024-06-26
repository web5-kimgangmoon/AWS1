import { FC } from "react";
import { Todo as TodoItem } from "../../lib/Todo";
import Item from "./item";
import { ITodoProps } from "../../Containers/Todo/Todo";

export interface IProps extends ITodoProps {}

const List: FC<IProps> = ({ list, complete, deleteItem }) => {
  return (
    <div>
      {list
        // .filter((item) => !item.getIsComplete())
        .map((item: TodoItem, idx: number) => (
          <Item
            item={item}
            key={idx}
            idx={idx}
            complete={() => complete(idx)}
            deleteItem={() => deleteItem(idx)}
          ></Item>
        ))}
    </div>
  );
};

export default List;
