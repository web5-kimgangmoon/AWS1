import { FC, useState } from "react";
import Comp, { IBoard } from "./Component";

export interface IProps {}

const Board: FC<IProps> = ({}) => {
  const [list, setList] = useState<IBoard[]>([
    {
      id: 1,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
    {
      id: 2,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
    {
      id: 3,
      title: "오늘도 편점ssssssssssssssssssssssssssssssssssss?",
      user: "하하",
      createdAt: new Date(),
      likeCount: 10,
      disCount: 10,
    },
  ]);
  return <Comp list={list} />;
};

export default Board;
