import { useEffect, useMemo, useContext } from "react";
import List, { ITitle } from "../List";
import { Link } from "react-router-dom";
import { ITodoContext, TodoContext } from "../../context/todoList";

interface ITodo {
  num: number;
  content: string;
  priority: number;
  limit: string;
}

const Todo = (): JSX.Element => {
  // const [list, setList] = useState<ITodo[]>([
  //   { num: 1, content: "하하", priority: 4, limit: "2024-06-28" },
  // ]);
  const { list } = useContext(TodoContext) as ITodoContext;
  const titleList: ITitle<ITodo>[] = useMemo(
    () => [
      { key: "num" as keyof ITodo, name: "No." },
      { key: "content" as keyof ITodo, name: "할 일", isStretch: true },
      { key: "limit" as keyof ITodo, name: "기간제한" },
    ],
    []
  );
  // useEffect(() => {
  //   addList({ num: 1, content: "sdadasd", limit: "240630", priority: 1 });
  // }, []);
  return (
    <div>
      <List list={list} titleList={titleList} />
    </div>
  );
};

export default Todo;
