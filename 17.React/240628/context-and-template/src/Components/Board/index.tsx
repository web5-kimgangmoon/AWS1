import { FC, useContext, useEffect } from "react";
import Comp from "./Comp";
import { ITodoContext, TodoContext } from "../../context/todoList";

const Board: FC = () => {
  // const { addList } = useContext(TodoContext) as ITodoContext;

  // useEffect(() => {
  //   addList({ num: 1, content: "sdadasd", limit: "240630", priority: 1 });
  // }, []);

  return <Comp />;
};

export default Board;
