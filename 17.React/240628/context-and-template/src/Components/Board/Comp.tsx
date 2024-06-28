import { useState, useContext, useEffect } from "react";
import List, { ITitle } from "../List/index";
import { ITodoContext, TodoContext } from "../../context/todoList";

interface IBoard {
  title: string;
  num: number;
  user: string;
  createdAt: Date;
  //   titleList: string[];
}

const Board = (): JSX.Element => {
  const [titleList, setTitleList] = useState<ITitle<IBoard>[]>([
    { key: "num" as keyof IBoard, name: "No." },
    { key: "title" as keyof IBoard, name: "제목", isStretch: true },
    { key: "user" as keyof IBoard, name: "작성자" },
    { key: "createdAt" as keyof IBoard, name: "작성자" },
  ]);
  const [list, setList] = useState<IBoard[]>([
    { num: 1, title: "testing", user: "jkh", createdAt: new Date() },
    { num: 2, title: "testing2", user: "jkh", createdAt: new Date() },
    { num: 3, title: "testing3", user: "jkh", createdAt: new Date() },
  ]);

  const context = useContext(TodoContext) as ITodoContext;
  const addList = context.addList;
  const todoList = context.list;

  useEffect(() => {
    console.log(todoList);
  }, []);

  useEffect(() => {
    addList({ num: 1, content: "sdadasd", limit: "240630", priority: 1 });
  }, []);

  return (
    <div>
      <List<IBoard> list={list} titleList={titleList} />
    </div>
  );
};

export default Board;
